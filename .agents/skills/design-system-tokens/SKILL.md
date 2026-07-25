---
name: design-system-tokens
description: >
  Skill referensi desain sistem lengkap (design tokens) untuk website Aura Copper & Brass Crafts.
  Gunakan skill ini saat diminta menambahkan komponen UI baru, memeriksa warna brand yang benar,
  menggunakan typography yang sesuai, mengatur spacing/radius/shadow, atau memastikan konsistensi
  visual antar section. Juga gunakan saat debugging CSS atau memastikan dark metallic theme.
---

# Design System Tokens – Aura Copper & Brass Crafts

Dokumen referensi desain token lengkap untuk menjaga konsistensi visual premium.

## Color Palette (CSS Custom Properties)

```css
:root {
  /* Background */
  --color-bg-primary:    #0D0D11;  /* Onyx Black - body background */
  --color-bg-secondary:  #16171F;  /* Deep Slate - cards, sections */
  --color-bg-tertiary:   #1E202B;  /* Elevated surface - inputs, modals */
  --color-bg-glass:      rgba(22, 23, 31, 0.85); /* Glassmorphism */

  /* Brand Copper/Gold */
  --color-copper:        #D97736;  /* Primary copper accent */
  --color-copper-light:  #E8914D;  /* Hover state copper */
  --color-copper-dark:   #C4652A;  /* Active/pressed copper */
  --color-amber:         #F59E0B;  /* Warm amber highlight */
  --color-gold:          #E5A93C;  /* Burnished gold accent */
  --color-gold-light:    #F0C060;  /* Light gold shimmer */

  /* Text */
  --color-text-primary:  #F5F0E8;  /* Warm white - main text */
  --color-text-secondary:#A89880;  /* Warm gray - subtitles, meta */
  --color-text-muted:    #6B6255;  /* Muted - placeholders */
  --color-text-inverse:  #0D0D11;  /* Dark text on light bg */

  /* Borders */
  --color-border:        rgba(217, 119, 54, 0.15); /* Subtle copper border */
  --color-border-hover:  rgba(217, 119, 54, 0.4);  /* Hover border */
  --color-border-strong: rgba(217, 119, 54, 0.6);  /* Active/focused border */

  /* Functional */
  --color-success:       #10B981;
  --color-warning:       #F59E0B;
  --color-error:         #EF4444;
  --color-wa-green:      #25D366;  /* WhatsApp green */
}
```

## Typography Scale

```css
:root {
  /* Font Families */
  --font-display:  'Playfair Display', Georgia, serif;
  --font-body:     'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif;

  /* Font Sizes (fluid scale) */
  --text-xs:    0.75rem;   /* 12px - badges, captions */
  --text-sm:    0.875rem;  /* 14px - meta, labels */
  --text-base:  1rem;      /* 16px - body text */
  --text-lg:    1.125rem;  /* 18px - lead text */
  --text-xl:    1.25rem;   /* 20px - card titles */
  --text-2xl:   1.5rem;    /* 24px - section subtitles */
  --text-3xl:   1.875rem;  /* 30px - section titles */
  --text-4xl:   2.25rem;   /* 36px - section headings */
  --text-5xl:   3rem;      /* 48px - hero subtitles */
  --text-6xl:   3.75rem;   /* 60px - hero title */
  --text-7xl:   4.5rem;    /* 72px - hero title large */

  /* Font Weights */
  --weight-light:    300;
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-extrabold:800;
  --weight-black:    900;

  /* Line Heights */
  --leading-tight:  1.15;
  --leading-snug:   1.3;
  --leading-normal: 1.6;
  --leading-relaxed:1.75;
}
```

## Spacing Scale

```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Section padding standard */
  --section-py: clamp(4rem, 8vw, 7rem);
}
```

## Border Radius & Shadows

```css
:root {
  /* Radius */
  --radius-sm:   0.375rem; /* 6px - buttons sm */
  --radius-md:   0.75rem;  /* 12px - cards, inputs */
  --radius-lg:   1rem;     /* 16px - large cards */
  --radius-xl:   1.5rem;   /* 24px - modals */
  --radius-2xl:  2rem;     /* 32px - hero cards */
  --radius-full: 9999px;   /* pills, badges */

  /* Shadows */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.3);
  --shadow-md:   0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg:   0 8px 32px rgba(0,0,0,0.5);
  --shadow-xl:   0 16px 48px rgba(0,0,0,0.6);
  --shadow-copper: 0 4px 24px rgba(217,119,54,0.25);
  --shadow-copper-lg: 0 8px 40px rgba(217,119,54,0.4);
  --shadow-gold:   0 4px 24px rgba(245,158,11,0.2);
  --shadow-glow:   0 0 60px rgba(217,119,54,0.15), 0 0 120px rgba(245,158,11,0.08);
}
```

## Component Classes

### Buttons
```html
<!-- Primary (Copper Gradient) -->
<button class="btn btn-primary">Primary CTA</button>

<!-- Secondary (Glass) -->
<button class="btn btn-secondary">Secondary</button>

<!-- Outline -->
<button class="btn btn-outline">Outline</button>

<!-- WhatsApp -->
<button class="btn btn-wa">WhatsApp</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards
```html
<article class="katalog-card">...</article>  <!-- Product card -->
<div class="stat-card">...</div>             <!-- Stats card -->
<div class="process-step">...</div>          <!-- Process timeline card -->
```

### Gradients
```css
/* Text gradient copper-gold */
.text-gradient {
  background: linear-gradient(135deg, #D97736 0%, #F59E0B 50%, #E5A93C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Copper gradient button */
background: linear-gradient(135deg, #D97736 0%, #F59E0B 100%);

/* Dark glass card */
background: rgba(22, 23, 31, 0.85);
backdrop-filter: blur(12px);
border: 1px solid rgba(217, 119, 54, 0.15);
```

## Breakpoints

```css
/* Mobile First */
--bp-sm:  640px;   /* Small tablet */
--bp-md:  768px;   /* Tablet */
--bp-lg:  1024px;  /* Desktop */
--bp-xl:  1280px;  /* Large desktop */
--bp-2xl: 1536px;  /* Ultra wide */
```

## Prinsip Visual Brand
1. **Dark First** — Semua komponen menggunakan dark background
2. **Copper Accent** — Highlight selalu copper/amber, bukan warna lain
3. **Glass Morphism** — Card dan overlay menggunakan `backdrop-filter: blur`
4. **Metallic Feel** — Gunakan gradient shimmer pada elemen premium
5. **Serif untuk Luxury** — Judul produk dan tagline pakai `Playfair Display`
6. **Micro-animation** — Setiap elemen interaktif punya hover state yang smooth
