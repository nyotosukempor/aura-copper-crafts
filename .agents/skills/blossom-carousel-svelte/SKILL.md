---
name: blossom-carousel-svelte
description: Use for Blossom Carousel Svelte or SvelteKit installation, stylesheet setup, Svelte examples, Tailwind examples, accessibility or a11y guidance, navigation controls (BlossomPrev, BlossomNext, BlossomDots, BlossomDot), command events, overscroll events, and Svelte-specific integration.
---

# Blossom Carousel Svelte

Use this skill for Blossom Carousel Svelte or SvelteKit tasks involving installation, stylesheet setup, component usage, root element customization, controls, or overscroll handling.

Blossom Carousel Svelte wraps Blossom Carousel Core. For shared engine behavior, lifecycle, and direct DOM concepts, also consider the `blossom-carousel-core` skill.

For migration questions from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Package

Install the Svelte package:

```bash
npm install @blossom-carousel/svelte
```

Import the stylesheet exactly once per app, in the app entry file or root layout. Do not include it in individual component examples unless the user explicitly asks for a standalone example.

```js
import "@blossom-carousel/svelte/style.css";
```

## Svelte Setup

Import `BlossomCarousel` from `@blossom-carousel/svelte` and use it in a Svelte component:

```svelte
<script>
  import { BlossomCarousel } from "@blossom-carousel/svelte";
</script>

<BlossomCarousel>
  <!-- slides -->
</BlossomCarousel>
```

## Svelte Version

`@blossom-carousel/svelte` `2.x` requires Svelte 5 (runes + snippets) and drops Svelte 4 support. If the user is on Svelte 4, recommend `@blossom-carousel/svelte@1`.

Default to Svelte 5 syntax (runes, `onclick`, `$props`, snippets). For Svelte 4 projects, use `on:event` directives and `export let` props. Ask the user if unclear.

## SvelteKit Setup

In SvelteKit, import `@blossom-carousel/svelte/style.css` from a root layout or another global entry point:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "@blossom-carousel/svelte/style.css";

  let { children } = $props();
</script>

{@render children()}
```

Then import and use the component where the carousel is rendered:

```svelte
<script>
  import { BlossomCarousel } from "@blossom-carousel/svelte";

  const slides = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<BlossomCarousel>
  {#each slides as slide (slide)}
    <div>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

## Basic Usage

Use `<BlossomCarousel>` as the carousel root and pass slides as children:

```svelte
<script>
  const slides = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<BlossomCarousel>
  {#each slides as slide (slide)}
    <div>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

Each direct child becomes a slide. In Svelte examples, use a keyed `{#each}` block when rendering generated slide lists.

## Options

The Svelte wrapper currently exposes `as` for the carousel root element. For other carousel configuration options, refer to the `blossom-carousel-core` skill.

## Root Element

Use the `as` prop to define the HTML element rendered for the carousel root:

```svelte
<script>
  const slides = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<BlossomCarousel as="ul">
  {#each slides as slide (slide)}
    <li>Slide {slide}</li>
  {/each}
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

Place previous, next, and dot controls outside the carousel with `<BlossomPrev>`, `<BlossomNext>`, and `<BlossomDots>`. Link them to the carousel with an `id` on `<BlossomCarousel>`, and a matching `forId` prop on each control and mark slides with `data-blossom-slide`.

```svelte
<BlossomCarousel id="my-carousel">
  {#each slides as slide (slide)}
    <div data-blossom-slide>Slide {slide}</div>
  {/each}
</BlossomCarousel>

<BlossomPrev forId="my-carousel" />
<BlossomDots forId="my-carousel" />
<BlossomNext forId="my-carousel" />
```

Controls use native scroll and the Invoker Commands API. They do not require `bind:this` and work even when Blossom's drag engine is not loaded, such as on touch devices.

Place navigation components _after_ their carousel in the markup. `BlossomDots` renders one button per marked slide server-side, before any client JS runs, by reading the slide count that `BlossomCarousel` registers when it renders. Controls placed before the carousel start at zero dots and fill in on the client.

### Prev/Next Buttons

`<BlossomPrev>` and `<BlossomNext>` are aware of configured scroll-snap and will navigate between snap points. When no scroll-snap is configured, they will slide the carousel proportionally.

Slot your own content to replace the default button icon:

```svelte
<BlossomPrev forId="my-carousel">
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

```svelte
<BlossomDots forId="my-carousel">
  {#snippet children({ index, active })}
    <BlossomDot
      class="my-dot"
      data-active={active}
      aria-label="Photo {index + 1}"
    >
      {index + 1}
    </BlossomDot>
  {/snippet}
</BlossomDots>
```

### Listening for commands

Listen for `command` events on the carousel to know when any navigation control is triggered:

- previous (`--blossom-prev`)
- next (`--blossom-next`)
- dot (`--blossom-goto-{index}`)

These events are not fired by drag or free scrolling. Read `event.command` (or `event.detail.command` where the Invoker Commands polyfill applies):

```svelte
<script>
  function handleCommand(event) {
    const command = event?.command || event?.detail?.command;
  }
</script>

<BlossomCarousel oncommand={handleCommand}>
  {#each slides as slide (slide)}
    <div data-blossom-slide>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

See `/docs/examples/basic/buttons` and `/docs/examples/basic/dots` for live demos.

## Overscroll API

Tap into Blossom's drag engine overscroll behavior to create your own style. Prevent the event to replace Blossom's default rubberbanding effect:

```svelte
<script>
  function onOverscroll(event) {
    event.preventDefault();

    const overScroll = event.detail.left;

    Array.from(event.target.children).forEach((slide) => {
      slide.style.transform = `scale(${1 - overScroll * 0.1})`;
    });
  }
</script>

<BlossomCarousel onoverscroll={onOverscroll}>
  {#each Array.from({ length: 12 }, (_, index) => index + 1) as slide (slide)}
    <div>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

Read offsets from `event.detail.left` and apply custom visual effects to slides or the root element.
`BlossomCarousel` forwards unrecognized props to its root element, so `onoverscroll` attaches directly via `addEventListener`. Read slide children from `event.target` rather than binding a ref.

## Examples Reference

For visual layout recipes, consult `/docs/examples/` and adapt the selected example to Svelte or SvelteKit syntax.

When adapting docs examples, preserve Svelte syntax from this skill: use `<BlossomCarousel>`, `class`, keyed `{#each}` blocks, snippets, and Svelte event bindings. The docs examples often include both CSS and optional Tailwind versions; use Tailwind utility classes only when the user states their project uses Tailwind or explicitly requests a Tailwind example. Otherwise default to regular CSS classes.

## Accessibility Reference

When the user explicitly asks about carousel accessibility, a11y, ARIA, keyboard support, focus behavior, reduced motion, screen readers, or WCAG, consult `/docs/a11y/accessibility-guide.md` and adapt its patterns to Svelte or SvelteKit syntax.

Use the guide for deeper accessibility patterns and testing guidance.

## Implementation Guidance

- Prefer `@blossom-carousel/svelte` for Svelte and SvelteKit projects.
- Import the component as a named export: `import { BlossomCarousel } from "@blossom-carousel/svelte"`.
- Import styles from `@blossom-carousel/svelte/style.css`.
- Use `BlossomCarousel` as a Svelte component, not as a custom element.
- Preserve valid Svelte syntax: use keyed `{#each items as item (key)}` blocks, not React-style `key` props.
- For prev, next, and dot controls, use `BlossomPrev`, `BlossomNext`, and `BlossomDots` with matching `id` and `forId` props. Require `data-blossom-slide` on slides when using dots. Use `BlossomDot` inside the `<BlossomDots>` snippet for custom dot buttons with navigation wired up. Place navigation components after their carousel in the markup for correct SSR dot rendering.
- Listen for `oncommand` on `<BlossomCarousel>` to react to navigation control triggers. Read `event.command` or `event.detail.command`.
- For custom overscroll styling, listen for `onoverscroll`, call `event.preventDefault()` when replacing the default rubberbanding effect, read offsets from `event.detail.left`, and read slide children from `event.target`.
- For SvelteKit examples, place global stylesheet imports in `src/routes/+layout.svelte` or another app-level entry point.
- For core carousel behavior rather than Svelte integration, refer to the `blossom-carousel-core` skill when available.
- If asked about features not documented in this skill, such as autoplay, pagination, or vertical orientation, defer to the `blossom-carousel-core` skill or state that the feature is not documented here.

## Common Fixes

If the carousel is unstyled, check that this import exists in the app entry file, root layout, or component:

```js
import "@blossom-carousel/svelte/style.css";
```

If Svelte examples contain React-style keys, replace `key={value}` with a keyed each block:

```svelte
{#each slides as slide (slide)}
  <div>Slide {slide}</div>
{/each}
```

If the component import fails, check that the Svelte package is imported as a named export:

```js
import { BlossomCarousel } from "@blossom-carousel/svelte";
```

If list markup is invalid, use the `as` prop to align the carousel root with the slide elements, such as `as="ul"` for `li` slides.

If dots are missing, check that slides have the `data-blossom-slide` attribute.

If navigation controls do not respond, check that the `forId` prop matches the carousel `id` and that the carousel element exists in the DOM when controls mount.

If a custom overscroll effect runs in addition to the default rubberbanding, call `event.preventDefault()` in the `onoverscroll` handler.
