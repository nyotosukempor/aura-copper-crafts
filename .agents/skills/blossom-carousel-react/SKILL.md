---
name: blossom-carousel-react
description: Use for Blossom Carousel React or Next.js installation, stylesheet setup, JSX examples, Tailwind examples, accessibility or a11y guidance, navigation controls (BlossomPrev, BlossomNext, BlossomDots, BlossomDot), command events, overscroll events, and React-specific integration.
---

# Blossom Carousel React

Use this skill for Blossom Carousel React or Next.js tasks involving installation, stylesheet setup, JSX usage, root element customization, controls, or overscroll handling.

Blossom Carousel React wraps Blossom Carousel Core. For shared engine behavior, lifecycle, and direct DOM concepts, also consider the `blossom-carousel-core` skill.

For migration questions from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Package

Install the React package:

```bash
npm install @blossom-carousel/react
```

Import `@blossom-carousel/react/style.css` once in app setup unless the user has already imported it elsewhere:

```js
import "@blossom-carousel/react/style.css";
```

## React Setup

Import `BlossomCarousel` from `@blossom-carousel/react` and use it as a React component:

```jsx
import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/react/style.css";

function App() {
  return <BlossomCarousel>{/* slides */}</BlossomCarousel>;
}
```

Include the stylesheet import in a component example only when the example is standalone (no App, layout, or `_app` file is shown). When showing a component alongside an App/layout file, import the stylesheet only in the App/layout file.

## Next.js Setup

In Next.js App Router projects, import the stylesheet from the root layout or another global CSS entry point:

```jsx
// app/layout.jsx
import "@blossom-carousel/react/style.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Then import and use the component where the carousel is rendered:

```jsx
import { BlossomCarousel } from "@blossom-carousel/react";

export function FeaturedCarousel() {
  return (
    <BlossomCarousel>
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index}>Slide {index + 1}</div>
      ))}
    </BlossomCarousel>
  );
}
```

If a Next.js App Router carousel component uses browser-only behavior, add `"use client"` at the top of that component file.

For Pages Router projects, import the stylesheet in `pages/_app.jsx` or `pages/_app.tsx` instead of `app/layout`.

## Basic Usage

Use `<BlossomCarousel>` as the carousel root and pass slides as children:

```jsx
<BlossomCarousel>
  {Array.from({ length: 12 }, (_, index) => (
    <div key={index}>Slide {index + 1}</div>
  ))}
</BlossomCarousel>
```

Each direct child becomes a slide. In React examples, include a stable `key` for mapped slide elements.

## Root Element

Use the `as` prop to define the HTML element rendered for the carousel root:

```jsx
<BlossomCarousel as="ul">
  {Array.from({ length: 12 }, (_, index) => (
    <li key={index}>Slide {index + 1}</li>
  ))}
</BlossomCarousel>
```

This renders the carousel root as a `ul` and keeps the slide elements as `li` children:

```html
<ul>
  <li>Slide 1</li>
  <li>Slide 2</li>
  <li>Slide 3</li>
  ...
</ul>
```

Match the root element to the slide markup; for list-like carousels, use `as="ul"` with `li` slides.

## Navigation Controls

Place previous, next, and dot controls outside the carousel with `<BlossomPrev>`, `<BlossomNext>`, and `<BlossomDots>`. Link them to the carousel with an `id` on `<BlossomCarousel>`, and a matching `for` prop on each control and mark slides with `data-blossom-slide`.

```tsx
<BlossomCarousel id="my-carousel">
  {Array.from({ length: 12 }, (_, index) => (
    <div key={index} data-blossom-slide>
      Slide {index + 1}
    </div>
  ))}
</BlossomCarousel>

<BlossomPrev for="my-carousel" />
<BlossomDots for="my-carousel" />
<BlossomNext for="my-carousel" />
```

Controls use native scroll and the Invoker Commands API. They do not require a ref and work even when Blossom's drag engine is not loaded, such as on touch devices.

### Prev/Next Buttons

`<BlossomPrev>` and `<BlossomNext>` are aware of configured scroll-snap and will navigate between snap points. When no scroll-snap is configured, they will slide the carousel proportionally.

Slot your own content to replace the default button icon:

```tsx
<BlossomPrev for="my-carousel">
  <span>Previous</span>
</BlossomPrev>
```

### Dots

`<BlossomDots>` renders one button per slide marked with `data-blossom-slide`.
Default styles can be themed with CSS custom properties on the component or any ancestor:

```css
/* defaults */
{
  --blossom-dot-size: 0.625rem;
  --blossom-dot-radius: 50%;
  --blossom-dot-color: currentColor;
  --blossom-dot-opacity: 0.35;
  --blossom-dot-hover-opacity: 0.6;
  --blossom-dot-active-opacity: 1;
}
```

To bring your own dots, provide a default slot and render `<BlossomDot>` inside it. This will configure the dot as a `<button>` with navigation wired up.
Now you can style the dot as you please and attach any button attributes you need.

```tsx
<BlossomDots for="my-carousel">
  {({ index, active }) => (
    <BlossomDot
      className="my-dot"
      data-active={active}
      aria-label={`Photo ${index + 1}`}
    >
      {index + 1}
    </BlossomDot>
  )}
</BlossomDots>
```

### Listening for commands

Listen for `command` events on the carousel to know when any navigation control is triggered:

- previous (`--blossom-prev`)
- next (`--blossom-next`)
- dot (`--blossom-goto-{index}`)

These events are not fired by drag or free scrolling. Read `event.command` (or `event.detail.command` where the Invoker Commands polyfill applies):

```tsx
<BlossomCarousel onCommand={handleCommand}>
  {Array.from({ length: 12 }, (_, index) => (
    <div key={index} data-blossom-slide>
      Slide {index + 1}
    </div>
  ))}
</BlossomCarousel>;

function handleCommand(event: CustomEvent) {
  const command = event?.command || event?.detail?.command;
}
```

See `/docs/examples/basic/buttons` and `/docs/examples/basic/dots` for live demos.

## Overscroll API

Use `onOverscroll` to customize Blossom's drag overscroll behavior. Prevent the event when replacing the default rubberbanding effect:

```tsx
import { useRef } from "react";
import { BlossomCarousel } from "@blossom-carousel/react";

export function App() {
  const blossomCarousel = useRef<HTMLElement | null>(null);

  function onOverscroll(event: CustomEvent<{ left: number }>) {
    event.preventDefault();

    const overScroll = event.detail.left;

    Array.from(blossomCarousel.current?.children ?? []).forEach((slide) => {
      (slide as HTMLElement).style.transform = `scale(${1 - overScroll * 0.1})`;
    });
  }

  return (
    <BlossomCarousel
      ref={blossomCarousel}
      onOverscroll={(event) => {
        onOverscroll(event as CustomEvent<{ left: number }>);
      }}
    >
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index}>Slide {index + 1}</div>
      ))}
    </BlossomCarousel>
  );
}
```

Read offsets from `event.detail.left` and apply custom visual effects to slides or the root element.

## Examples Reference

For visual layout recipes, consult `/docs/examples/` and adapt the selected example to React or Next.js syntax.
When adapting docs examples, preserve React syntax from this skill: use `<BlossomCarousel>`, `className`, stable `key` props, React refs, and React event handlers. The docs examples often include both CSS and optional Tailwind versions; use Tailwind utility classes only when the user's project uses Tailwind or asks for it, and otherwise use regular CSS classes.

## Accessibility Reference

When the user explicitly asks about carousel accessibility, a11y, ARIA, keyboard support, focus behavior, reduced motion, screen readers, or WCAG, consult `/docs/a11y/accessibility-guide.md` and adapt its patterns to React or Next.js syntax.

Use the guide for deeper guidance on semantic slide structure, labelled regions, real previous and next buttons, unique control names, keyboard alternatives to dragging, focus visibility, inactive slides, auto-rotation, live regions, picker semantics, forced colors, and manual accessibility testing.

## Implementation Guidance

- Prefer `@blossom-carousel/react` for React and Next.js projects.
- Import styles from `@blossom-carousel/react/style.css`.
- Use `BlossomCarousel` as a React component, not as a custom element.
- Preserve valid JSX syntax: use `className`, add `key` to mapped children, and when generating visible slide text like `Slide N`, start numbering at 1 with `index + 1` unless the user asks for zero-based numbering.
- For prev, next, and dot controls, use `BlossomPrev`, `BlossomNext`, and `BlossomDots` with matching `id` and `for` props. Require `data-blossom-slide` on slides when using dots. Use `BlossomDot` inside the `<BlossomDots>` render prop for custom dot buttons with navigation wired up.
- Listen for `onCommand` on `<BlossomCarousel>` to react to navigation control triggers. Read `event.command` or `event.detail.command`.
- For custom overscroll styling, use `onOverscroll`, call `event.preventDefault()` when replacing the default rubberbanding effect, and read offsets from `event.detail.left`.
- For Next.js examples, place global stylesheet imports in `app/layout.jsx`, `app/layout.tsx`, `pages/_app.jsx`, or `pages/_app.tsx`, depending on the user's router.
- Add `"use client"` when the carousel is rendered from a Next.js App Router component that must run on the client.
- For core carousel behavior rather than React integration, refer to the `blossom-carousel-core` skill when available.

## Common Fixes

If the carousel is unstyled, check that this import exists in the app entry file, root layout, or component:

```js
import "@blossom-carousel/react/style.css";
```

If React warns about missing keys, add a `key` prop to each mapped slide element:

```jsx
{
  Array.from({ length: 12 }, (_, index) => (
    <div key={index}>Slide {index + 1}</div>
  ));
}
```

If list markup is invalid, use the `as` prop to align the carousel root with the slide elements, such as `as="ul"` for `li` slides.

If a Next.js App Router component fails because it uses browser-only behavior, add `"use client"` to the top of the carousel component file.

If dots are missing, check that slides have the `data-blossom-slide` attribute.

If navigation controls do not respond, check that the `for` prop matches the carousel `id` and that the carousel element exists in the DOM when controls mount.

If a custom overscroll effect runs in addition to the default rubberbanding, call `event.preventDefault()` in the `onOverscroll` handler.
