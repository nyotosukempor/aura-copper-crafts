---
name: blossom-carousel-vue
description: Use when working with Blossom Carousel Vue or Nuxt integration, including installation, component registration, styling, usage examples, Tailwind examples, accessibility or a11y guidance, root element customization, navigation controls (BlossomPrev, BlossomNext, BlossomDots, BlossomDot), command events, overscroll events, and Vue-specific carousel implementation.
---

# Blossom Carousel Vue

Use this skill for Blossom Carousel Vue or Nuxt tasks involving package installation, component registration, stylesheet setup, `<BlossomCarousel>` usage examples, root element customization, controls, or overscroll handling.

Blossom Carousel Vue wraps Blossom Carousel Core. For shared carousel behavior, options, lifecycle concepts, events, and engine semantics, also consider the `blossom-carousel-core` skill.

## Package

Install the Vue package:

```bash
npm install @blossom-carousel/vue
```

The Vue package depends on the core package. Always include `@blossom-carousel/vue/style.css` in app setup unless the user has already imported it elsewhere:

```js
import "@blossom-carousel/vue/style.css";
```

## Vue Setup

Register `BlossomCarousel` globally in a Vue app when the user wants to use the component throughout the app:

```js
import { createApp } from "vue";
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/vue/style.css";

const app = createApp({});

app.component("BlossomCarousel", BlossomCarousel);
```

For local component usage, import the component in the Vue file instead of registering it globally:

```vue
<script setup>
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/vue/style.css";
</script>

<template>
  <BlossomCarousel>
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>
```

Use TypeScript syntax (`<script setup lang="ts">`, typed refs like `ref<InstanceType<typeof BlossomCarousel> | null>(null)`) when the user's project uses TypeScript; otherwise default to JavaScript.

## Nuxt Setup

In Nuxt, create a plugin that registers the component globally:

```ts
// plugins/blossom-carousel.ts
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/vue/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("BlossomCarousel", BlossomCarousel);
});
```

If the user prefers Nuxt auto-imported components, recommend creating a wrapper component in the app's components directory instead of global plugin registration.

If the user reports hydration mismatches or SSR issues, suggest wrapping `<BlossomCarousel>` in `<ClientOnly>` or setting the plugin to client-only via `plugins/blossom-carousel.client.ts`.

## Basic Usage

Use `<BlossomCarousel>` as the carousel root and pass slides as default slot children:

```vue
<template>
  <BlossomCarousel>
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>
```

Each direct child becomes a slide. In Vue examples, include `:key` on `v-for` slide elements.

## Root Element

Use the `as` prop to define the HTML element rendered for the carousel root:

```vue
<template>
  <BlossomCarousel as="ul">
    <li v-for="i in 12" :key="i">Slide {{ i }}</li>
  </BlossomCarousel>
</template>
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

```vue
<BlossomCarousel id="my-carousel">
  <div v-for="i in 12" :key="i" data-blossom-slide>Slide {{ i }}</div>
</BlossomCarousel>

<BlossomPrev for="my-carousel" />
<BlossomDots for="my-carousel" />
<BlossomNext for="my-carousel" />
```

Controls use native scroll and the Invoker Commands API. They do not require a template ref and work even when Blossom's drag engine is not loaded, such as on touch devices.

### Prev/Next Buttons

`<BlossomPrev>` and `<BlossomNext>` are aware of configured scroll-snap and will navigate between snap points. When no scroll-snap is configured, they will slide the carousel proportionally.

Slot your own content to replace the default button icon:

```vue
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

```vue
<BlossomDots for="my-carousel" v-slot="{ index, active }">
  <BlossomDot
    class="my-dot"
    :data-active="active"
    :aria-label="`Photo ${index + 1}`"
  >
    {{ index + 1 }}
  </BlossomDot>
</BlossomDots>
```

### Listening for commands

Listen for `command` events on the carousel to know when any navigation control is triggered:

- previous (`--blossom-prev`)
- next (`--blossom-next`)
- dot (`--blossom-goto-{index}`)

These events are not fired by drag or free scrolling. Read `event.command` (or `event.detail.command` where the Invoker Commands polyfill applies):

```vue
<BlossomCarousel @command="handleCommand">
  <div v-for="i in 12" :key="i" data-blossom-slide>Slide {{ i }}</div>
</BlossomCarousel>

<script setup lang="ts">
const handleCommand = (event: CustomEvent) => {
  const command = event?.command || event?.detail?.command;
};
</script>
```

### Global registration

Register navigation components alongside `BlossomCarousel` when using them globally:

```js
import {
  BlossomCarousel,
  BlossomPrev,
  BlossomNext,
  BlossomDots,
  BlossomDot,
} from "@blossom-carousel/vue";
import "@blossom-carousel/vue/style.css";

const app = createApp({});
app.component("BlossomCarousel", BlossomCarousel);
app.component("BlossomPrev", BlossomPrev);
app.component("BlossomNext", BlossomNext);
app.component("BlossomDots", BlossomDots);
app.component("BlossomDot", BlossomDot);
```

For Nuxt plugins, register the same components through `nuxtApp.vueApp.component`.

See `/docs/examples/basic/buttons` and `/docs/examples/basic/dots` for live demos.

## Overscroll API

Listen for the `overscroll` event when the user wants to customize Blossom's drag engine overscroll behavior. Prevent the event to replace Blossom's default rubberbanding effect:

```vue
<template>
  <!-- prevent and overwrite Blossom's default rubberbanding effect -->
  <BlossomCarousel ref="blossomCarousel" @overscroll.prevent="onOverscroll">
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>

<script setup>
const blossomCarousel = ref(null);

function onOverscroll(event) {
  const overScroll = event.detail.left;

  Array.from(blossomCarousel.value.children).forEach((slide) => {
    slide.style.transform = `scale(${1 - overScroll * 0.1})`;
  });
}
</script>
```

Read overscroll values from `event.detail`, such as `event.detail.left`, and apply custom visual effects to the carousel slides or root element.
Use a template ref on `<BlossomCarousel>` when you need the carousel root element, for example to read slide children in an overscroll handler.

## Examples Reference

For visual layout recipes, consult `/docs/examples/` and adapt the selected example to Vue or Nuxt syntax.

When adapting docs examples, preserve Vue syntax from this skill: use `<BlossomCarousel>`, `class`, `:key`, Vue refs, and Vue event bindings. The docs examples often include both CSS and optional Tailwind versions; use Tailwind utility classes only if the user explicitly mentions Tailwind usage in their project, otherwise default to regular CSS classes.

## Migration Reference

If the user is moving from another carousel library, use the `blossom-carousel-migration` skill first. It routes to the right guide by title and points to the hosted docs page or local source markdown file as needed.

## Accessibility Reference

When the user explicitly asks about carousel accessibility, a11y, ARIA, keyboard support, focus behavior, reduced motion, screen readers, or WCAG, consult `/docs/a11y/accessibility-guide.md` and adapt its patterns to Vue or Nuxt syntax.

Use the guide for deeper guidance on semantic slide structure, labelled regions, real previous and next buttons, unique control names, keyboard alternatives to dragging, focus visibility, inactive slides, auto-rotation, live regions, picker semantics, forced colors, and manual accessibility testing.

## Implementation Guidance

- Prefer `@blossom-carousel/vue` for Vue and Nuxt projects.
- Import styles from `@blossom-carousel/vue/style.css`.
- Use `BlossomCarousel` as a Vue component, not as a custom element.
- Preserve valid Vue syntax in examples: use `:key` with `v-for`, wrap examples in `<template>` when showing Vue single-file component snippets, and default to `script setup` unless the user's existing code or explicit request uses the Options API.
- For prev, next, and dot controls, use `BlossomPrev`, `BlossomNext`, and `BlossomDots` with matching `id` and `for` props. Require `data-blossom-slide` on slides when using dots. Use `BlossomDot` inside the `<BlossomDots>` slot for custom dot buttons with navigation wired up.
- Listen for `@command` on `<BlossomCarousel>` to react to navigation control triggers. Read `event.command` or `event.detail.command`.
- For custom overscroll styling, listen for `@overscroll`, use `.prevent` when replacing the default rubberbanding effect, and read offsets from `event.detail.left`.
- For Nuxt examples, use `defineNuxtPlugin` and register with `nuxtApp.vueApp.component`.
- When the user asks about core carousel behavior rather than Vue integration, refer to Blossom Carousel Core concepts and, when available, the `blossom-carousel-core` skill.

## Common Fixes

If the carousel is unstyled, check that this import exists in app setup or the local component:

```js
import "@blossom-carousel/vue/style.css";
```

If the component is unknown in Vue templates, check that either:

- `BlossomCarousel` is imported locally in the component, or
- `app.component('BlossomCarousel', BlossomCarousel)` is called during Vue app setup, or
- a Nuxt plugin registers the component through `nuxtApp.vueApp.component`.

If list markup is invalid, use the `as` prop to align the carousel root with the slide elements, such as `as="ul"` for `li` slides.

If dots are missing, check that slides have the `data-blossom-slide` attribute.

If navigation components are unknown in Vue templates, register `BlossomPrev`, `BlossomNext`, `BlossomDots`, and `BlossomDot` globally alongside `BlossomCarousel`, or import them locally in the component.

If navigation controls do not respond, check that the `for` prop matches the carousel `id` and that the carousel element exists in the DOM when controls mount.

If prev or next controls are inactive on touch devices while using imperative carousel methods, switch to `BlossomPrev` and `BlossomNext` — they work without the drag engine.

If a custom overscroll effect runs in addition to the default rubberbanding, use `@overscroll.prevent="onOverscroll"` or call `event.preventDefault()` in the handler.
