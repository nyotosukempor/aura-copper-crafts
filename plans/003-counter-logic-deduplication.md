# 003 — Deduplicate Metric Counter JS & Migrate Entirely to CountUp.js

- **Status**: DONE
- **Commit**: 40f085f
- **Severity**: LOW
- **Category**: Performance & Interruptibility
- **Estimated scope**: 1 file (`app.js`), ~20 lines removed

## Problem

`app.js` contains a legacy `setInterval` step counter loop (`app.js:89-107`) alongside a dedicated `CountUp.js` IntersectionObserver initialization (`app.js:541-559`). Running `setInterval` every 30ms causes timer drift and bypasses hardware rAF frame synchronization.

```javascript
/* app.js:89-107 — current duplicate setInterval counter */
const numEls = document.querySelectorAll('.metric-number');
if (numEls.length) {
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.dataset.target, step = target / 50;
                let cur = 0;
                const timer = setInterval(() => {
                    cur += step;
                    if (cur >= target) { el.textContent = target; clearInterval(timer); }
                    else { el.textContent = Math.ceil(cur); }
                }, 30);
                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    numEls.forEach(el => counterObs.observe(el));
}
```

## Target

Remove the legacy `setInterval` counter block (lines 89-107) and let `CountUp.js` handle metric counters via `data-target` using smooth hardware-synced rAF easing.

```javascript
/* Target: clean CountUp.js observer in app.js Section 13 */
if (typeof CountUp !== 'undefined') {
    const counterOptions = { duration: 2.0, useEasing: true, useGrouping: true };
    const observeCounters = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                if (!isNaN(target)) {
                    const cu = new CountUp.CountUp(el, target, counterOptions);
                    if (!cu.error) cu.start();
                    observeCounters.unobserve(el);
                }
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => observeCounters.observe(el));
}
```

## Repo conventions to follow

- Single canonical observer for metric count-up animations.
- CountUp.js library integration.

## Steps

1. Delete lines 89-107 in `app.js` (legacy `setInterval` metric counter).
2. Verify that `.metric-number` elements in `index.html` have `data-target="..."` attributes.
3. Keep `CountUp.js` handler in `app.js:541-559`.

## Boundaries

- Do NOT touch `CountUp.js` library scripts in `index.html`.

## Verification

- **Mechanical**: Scroll down to the metrics section.
- **Feel check**:
  - Metric numbers count up smoothly over 2 seconds with standard CountUp easing.
  - No duplicated setInterval timers running in DevTools Performance profile.
- **Done when**: Metric counters update using CountUp.js rAF loop without legacy setInterval timers.
