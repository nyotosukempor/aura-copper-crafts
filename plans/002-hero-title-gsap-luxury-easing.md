# 002 — Refine Hero Title SplitType GSAP Easing to Luxury Power Curve

- **Status**: DONE
- **Commit**: 40f085f
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`app.js`), ~10 lines

## Problem

Hero title character animation uses `ease: 'back.out(2)'` with `duration: 0.7` and `rotateX: -40`. The strong bounce effect (`back.out(2)`) feels slightly cartoonish for a high-end luxury copper & brass craftsmanship brand.

```javascript
/* app.js:473 — current */
gsap.from(split.chars, {
    opacity: 0,
    y: 30,
    rotateX: -40,
    stagger: 0.025,
    duration: 0.7,
    ease: 'back.out(2)',
    delay: 0.3,
});
```

## Target

Replace the cartoonish bounce ease with a sleek, premium `power3.out` curve, reducing initial `y` offset to `20px` and duration to `0.5s` for a crisp, luxury headline reveal.

```javascript
/* target in app.js */
gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.02,
    duration: 0.5,
    ease: 'power3.out',
    delay: 0.2,
});
```

## Repo conventions to follow

- GSAP ScrollTrigger & TextPlugin conventions in `app.js`.
- Clean character reveal without jarring spring oscillation.

## Steps

1. In `app.js` line 473, change `y: 30` to `y: 20`.
2. Remove `rotateX: -40`.
3. Change `stagger: 0.025` to `stagger: 0.02`.
4. Change `duration: 0.7` to `duration: 0.5`.
5. Change `ease: 'back.out(2)'` to `ease: 'power3.out'`.
6. Change `delay: 0.3` to `delay: 0.2`.

## Boundaries

- Do NOT touch SplitType initialization logic or DOM selector `.hero-title`.

## Verification

- **Mechanical**: Reload page in browser.
- **Feel check**:
  - Hero headline text characters cascade smoothly without overshoot bounce.
  - Total reveal duration stays crisp and premium.
- **Done when**: Hero title reveal plays with smooth `power3.out` easing.
