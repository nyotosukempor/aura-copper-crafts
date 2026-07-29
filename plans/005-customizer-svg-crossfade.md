# 005 — Add Smooth SVG Crossfade to Studio Customizer Visualizer

- **Status**: DONE
- **Commit**: 40f085f
- **Severity**: LOW
- **Category**: Missed Opportunities / Polish
- **Estimated scope**: 1 file (`style.css` & `app.js`), ~15 lines

## Problem

When changing material swatches (Tembaga, Kuningan) or finishing (Polished, Antique, Verdigris Green) in the Studio Customizer, `updateView()` immediately replaces `svg.innerHTML`, causing an instant SVG swap without visual feedback.

```javascript
/* app.js:201 — current */
svg.innerHTML = `...`;
```

## Target

Add a subtle CSS opacity transition on `#customizer-svg` (`transition: opacity 0.15s ease`) and trigger a quick opacity keying during `updateView()` so material changes feel like a fluid 3D preview update.

```css
/* target in style.css */
#customizer-svg {
    transition: opacity 0.15s ease-out;
}
#customizer-svg.updating {
    opacity: 0.3;
}
```

## Repo conventions to follow

- GPU-accelerated opacity transition (`opacity 0.15s ease-out`).
- Minimal JS class toggle (`.updating`).

## Steps

1. In `style.css`, add transition rules for `#customizer-svg` and `#customizer-svg.updating`.
2. In `app.js:updateView()`, briefly add `updating` class before replacing `svg.innerHTML`, then remove it on the next frame (`requestAnimationFrame`).

## Boundaries

- Do NOT change SVG vector shapes or color calculations.

## Verification

- **Mechanical**: Click material swatches and finish buttons in Studio Customizer.
- **Feel check**:
  - SVG preview transitions smoothly between materials and textures with a soft 150ms crossfade.
- **Done when**: Customizer SVG updates incorporate a subtle 150ms opacity transition.
