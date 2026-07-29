# 004 — Gate VanillaTilt 3D Card Tilt behind Pointer & Reduced Motion Checks

- **Status**: DONE
- **Commit**: 40f085f
- **Severity**: MEDIUM
- **Category**: Accessibility & Hardware Hover Gating
- **Estimated scope**: 1 file (`app.js`), ~10 lines

## Problem

`VanillaTilt.init` is called unconditionally on cards (`.katalog-card`, `.stat-card`, `.process-step`, `.product-card`). On mobile touchscreens or when users have `prefers-reduced-motion` enabled, 3D tilt causes unexpected card rotation on touch taps.

```javascript
/* app.js:313 & 487 — current */
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.product-card[data-tilt]'), {
        max: 6, speed: 400, glare: true, 'max-glare': 0.1, perspective: 1200, scale: 1.02,
    });
}
```

## Target

Wrap `VanillaTilt.init` in a helper function that checks `window.matchMedia('(hover: hover) and (pointer: fine)').matches` and `!window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

```javascript
/* target helper in app.js */
function initTilt(elements, options) {
    if (typeof VanillaTilt === 'undefined') return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (canHover && !reduceMotion) {
        VanillaTilt.init(elements, options);
    }
}
```

## Repo conventions to follow

- Pointer fine / mouse hover gating.
- Respecting OS accessibility settings (`prefers-reduced-motion`).

## Steps

1. In `app.js`, define helper function `initTilt(elements, options)`.
2. Replace `VanillaTilt.init(...)` calls at lines 313 and 487 with `initTilt(...)`.

## Boundaries

- Do NOT remove VanillaTilt script from `index.html`.
- Do NOT alter tilt parameters (`max: 6`, `glare: true`) for desktop mouse users.

## Verification

- **Mechanical**: Test card hovers on desktop vs mobile emulation in Chrome DevTools.
- **Feel check**:
  - Cards tilt smoothly when using a mouse on desktop.
  - Cards remain flat without erratic 3D rotation on touchscreen taps or when `prefers-reduced-motion` is enabled.
- **Done when**: 3D tilt effect runs strictly on fine-pointer devices with reduced motion disabled.
