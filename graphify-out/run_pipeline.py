import sys
import json
from pathlib import Path

root_dir = Path('.').resolve()
graphify_out = root_dir / 'graphify-out'
graphify_out.mkdir(exist_ok=True)

(graphify_out / '.graphify_python').write_text(sys.executable, encoding='utf-8')
(graphify_out / '.graphify_root').write_text(str(root_dir), encoding='utf-8')

# Step 2: Detect
from graphify.detect import detect
detection = detect(root_dir)
(graphify_out / '.graphify_detect.json').write_text(json.dumps(detection, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Detect complete: {detection.get('total_files', 0)} files detected.")

# Step 3: Part A - AST/Code Extraction
from graphify.extract import collect_files, extract
code_files = []
for f in detection.get('files', {}).get('code', []):
    p = Path(f)
    if p.is_dir():
        code_files.extend(collect_files(p))
    else:
        code_files.append(p)

if code_files:
    ast_result = extract(code_files, cache_root=root_dir)
else:
    ast_result = {'nodes': [], 'edges': [], 'input_tokens': 0, 'output_tokens': 0}

(graphify_out / '.graphify_ast.json').write_text(json.dumps(ast_result, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"AST: {len(ast_result.get('nodes', []))} nodes, {len(ast_result.get('edges', []))} edges")

# Semantic extraction empty file for code/docs merge fallback
semantic_result = {'nodes': [], 'edges': [], 'hyperedges': [], 'input_tokens': 0, 'output_tokens': 0}

# Combine doc nodes manually if any
for doc_path in detection.get('files', {}).get('document', []):
    doc_p = Path(doc_path)
    rel_path = doc_p.relative_to(root_dir) if doc_p.is_absolute() else doc_p
    node_id = f"doc:{rel_path.as_posix()}"
    semantic_result['nodes'].append({
        'id': node_id,
        'label': rel_path.name,
        'type': 'DOCUMENT',
        'source_location': rel_path.as_posix(),
        'description': f"Agent skill or documentation file {rel_path.name}"
    })

(graphify_out / '.graphify_semantic.json').write_text(json.dumps(semantic_result, indent=2, ensure_ascii=False), encoding='utf-8')

# Part C - Merge AST + Semantic
seen = {n['id'] for n in ast_result.get('nodes', [])}
merged_nodes = list(ast_result.get('nodes', []))
for n in semantic_result.get('nodes', []):
    if n['id'] not in seen:
        merged_nodes.append(n)
        seen.add(n['id'])

merged_edges = ast_result.get('edges', []) + semantic_result.get('edges', [])
merged_extraction = {
    'nodes': merged_nodes,
    'edges': merged_edges,
    'hyperedges': [],
    'input_tokens': 0,
    'output_tokens': 0
}
(graphify_out / '.graphify_extract.json').write_text(json.dumps(merged_extraction, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"Merged: {len(merged_nodes)} nodes, {len(merged_edges)} edges")

# Step 4: Build graph, cluster, report
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json

G = build_from_json(merged_extraction, root=str(root_dir), directed=False)
if G.number_of_nodes() > 0:
    communities = cluster(G)
    cohesion = score_all(G, communities)
    gods = god_nodes(G)
    surprises = surprising_connections(G, communities)
    labels = {cid: f"Community {cid}" for cid in communities}
    questions = suggest_questions(G, communities, labels)

    wrote = to_json(G, communities, str(graphify_out / 'graph.json'))
    report = generate(G, communities, cohesion, labels, gods, surprises, detection, {'input':0, 'output':0}, str(root_dir), suggested_questions=questions)
    (graphify_out / 'GRAPH_REPORT.md').write_text(report, encoding='utf-8')
    print(f"Graph built successfully: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(communities)} communities.")
else:
    print("Graph built with zero nodes.")
