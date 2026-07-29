# 001 — FAQ Accordion Smooth Height & Opacity Expansion

- **Status**: DONE
- **Commit**: 40f085f
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file (`style.css`), ~20 lines

## Problem

Expanding an FAQ item toggles `.faq-item.active`, which rotates `.faq-icon` smoothly via CSS, but `.faq-answer` pops open abruptly without height or opacity transition. This content jump breaks physical continuity.

```css
/* style.css:1176 — current */
.faq-icon { transition: transform 0.3s ease; color: var(--copper-primary); }
.faq-item.active .faq-icon { transform: rotate(180deg); }
```

## Target

Use a CSS Grid container (`grid-template-rows: 0fr` to `1fr`) combined with an inner wrapper opacity transition so that accordion answers slide open smoothly over 220ms with zero layout jank.

```css
/* target in style.css */
.faq-answer {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.22s cubic-bezier(0.23, 1, 0.32, 1);
}
.faq-item.active .faq-answer {
    grid-template-rows: 1fr;
}
.faq-answer-inner {
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.2s ease;
}
.faq-item.active .faq-answer-inner {
    opacity: 1;
}
.faq-icon {
    transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}
```

## Repo conventions to follow

- Easing curve: `cubic-bezier(0.23, 1, 0.32, 1)` matching `--transition-normal` token in `style.css`.
- Pure CSS transition driven by toggling `.active` class on `.faq-item`.

## Steps

1. In `style.css` near line 1170, update `.faq-answer` to use CSS Grid `grid-template-rows: 0fr` with `transition: grid-template-rows 0.22s cubic-bezier(0.23, 1, 0.32, 1)`.
2. Wrap content inside `.faq-answer` in an inner element or set `.faq-answer > *` to `overflow: hidden; opacity: 0; transition: opacity 0.2s ease;`.
3. Add `.faq-item.active .faq-answer { grid-template-rows: 1fr; }` and `.faq-item.active .faq-answer > * { opacity: 1; }`.
4. Update `.faq-icon` transition to `transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)`.

## Boundaries

- Do NOT alter JavaScript delegation logic in `app.js` (lines 378-389).
- Do NOT change structural HTML IDs or class names.

## Verification

- **Mechanical**: Open index.html in browser and click FAQ questions.
- **Feel check**:
  - The answer panel glides down smoothly without abrupt layout jumps.
  - Clicking an open question retracts the panel smoothly.
  - In DevTools 10% slow motion, confirms 220ms duration.
- **Done when**: FAQ accordion expands and collapses smoothly using CSS Grid 0fr/1fr transitions.
