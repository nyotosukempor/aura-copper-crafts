# Review Report: AGENTS.md

### 1. What the file is about
This file (`AGENTS.md`) serves as a system prompt and instruction configuration for an automated review agent loop. It defines the operational scope, strict rules, and output format for performing content and code reviews.

### 2. What is good
- **Clear Scope**: Explicitly defines the input directory (`input/`) and output directory for review results.
- **Strict Guardrails**: Prevents direct modification of original files and creation of unauthorized project files.
- **Structured Output**: Standardizes feedback across 5 structured sections (summary, pros, cons, recommendations, and score).
- **Concise Phrasing**: Easy for LLM agents to parse and adhere to without ambiguity.

### 3. What is weak or unclear
- **Folder Name Alignment**: The prompt references `reviews/` folder, while the workspace folder structure created is `review/`.
- **File Naming Standards**: Does not specify naming conventions for generated review report files.

### 4. Specific improvements
- Align folder name references between instructions and directory structure.
- Add guidelines for output file naming (e.g., `[filename]-review.md` or `first-review.md`).

### 5. Final score out of 10
**9/10**
