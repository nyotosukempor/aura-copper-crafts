# Workspace Rules: Kerajinan Tembaga & Kuningan Interactive Web Project

## Overview
Workspace ini berisi pengembangan website landing page interaktif dan sistem agent/skill khusus
untuk bisnis **Aura Copper & Brass Crafts** — produsen kerajinan tembaga dan kuningan premium
dari Boyolali, Jawa Tengah, Indonesia.

---

## Visual Design System & Aesthetics

- **Theme**: Luxury Dark Metallic Aesthetic
- **Background**: Onyx Black `#0D0D11`, Deep Slate `#16171F`
- **Accent Colors**: Copper `#D97736`, Warm Amber `#F59E0B`, Burnished Gold `#E5A93C`
- **Typography**:
  - Serif Display: `Playfair Display` — headline mewah, judul produk, tagline
  - Sans-Serif: `Plus Jakarta Sans` / `Outfit` — body text, UI, statistik
- **Prinsip**: Dark-first, copper accent, glassmorphism, micro-animations, metallic feel

---

## File Structure & Agent Architecture

```
PROJECT WEBSITE/
├── index.html          # Single-page landing page utama (695+ baris)
├── style.css           # Luxury dark metallic CSS (27KB+)
├── app.js              # Interactive JS + semua library init (500+ baris)
├── assets/
│   └── products/       # Gambar produk WebP
└── .agents/
    ├── AGENTS.md        # Workspace rules (file ini)
    └── skills/
        ├── kerajinan-tembaga-builder/   # Konten & struktur landing page
        ├── interactive-3d-customizer/   # Komponen interaktif & kalkulator
        ├── ui-animation-enhancer/       # Library animasi (GSAP, AOS, dll)
        ├── whatsapp-order-generator/    # Sistem pesan & order WA
        ├── product-catalog-manager/     # Katalog produk & data struktur
        ├── design-system-tokens/        # CSS tokens & design system
        ├── seo-meta-optimizer/          # SEO, meta tags, aksesibilitas
        ├── ponytail/                    # Minimal code approach
        ├── ponytail-audit/              # Audit over-engineering
        ├── ponytail-debt/               # Track technical debt
        ├── ponytail-gain/               # Measure ponytail impact
        ├── ponytail-help/               # Ponytail commands reference
        └── ponytail-review/             # Code review for over-engineering
```

---

## Library UI yang Sudah Terpasang (via CDN)

| Library | Versi | Fungsi |
|---|---|---|
| GSAP + ScrollTrigger | 3.12.5 | Animasi parallax, reveal, scroll |
| Lenis | 1.1.14 | Ultra smooth scroll |
| AOS | 2.3.4 | Animate on scroll |
| Swiper.js | 11 | Carousel/slider |
| VanillaTilt | 1.8.1 | 3D tilt card effect |
| Tippy.js | 6 | Smart tooltips |
| SplitType | 0.3.4 | Text character animation |
| CountUp.js | 2.8.0 | Animated number counters |
| Font Awesome | 6.5.1 | Icons |
| Playfair Display + Plus Jakarta Sans | — | Google Fonts |

---

## Skill yang Tersedia

Gunakan skill berikut sesuai tugas yang diminta:

| Skill | Kapan Digunakan |
|---|---|
| `kerajinan-tembaga-builder` | Konten, copywriting, struktur landing page |
| `interactive-3d-customizer` | Komponen interaktif, material visualizer, kalkulator |
| `ui-animation-enhancer` | Animasi UI, GSAP, AOS, VanillaTilt, Swiper |
| `whatsapp-order-generator` | Sistem WA, template pesan, floating button |
| `product-catalog-manager` | Tambah/edit produk, kategori, modal detail |
| `design-system-tokens` | Warna, tipografi, spacing, komponen baru |
| `seo-meta-optimizer` | SEO, meta tags, structured data, aksesibilitas |
| `ponytail` | Solusi minimal, hindari over-engineering |

---

## Aturan Coding Wajib

1. **CSS**: Vanilla CSS only — tidak menggunakan Tailwind kecuali diminta eksplisit
2. **JS**: Vanilla JS — tidak menggunakan framework (React/Vue) kecuali diminta eksplisit
3. **HTML**: Semantic HTML5 — gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
4. **Images**: Format WebP, always include `alt`, gunakan `loading="lazy" decoding="async"`
5. **Scripts**: Selalu letakkan `<script>` di bawah `</body>` bukan di `<head>`
6. **Colors**: Wajib gunakan CSS custom properties dari design system, bukan hardcode hex
7. **Animations**: Gunakan library yang sudah terpasang — jangan install library baru tanpa kebutuhan
8. **WhatsApp**: Nomor WA di semua file harus konsisten. Default: `+6281234567890`

---

## SEO & Accessibility Requirements

- Setiap `<img>` wajib memiliki `alt` yang deskriptif (contoh: `alt="Bak Mandi Tembaga Roll Top Tempa Manual Boyolali"`)
- Gunakan elemen semantik HTML5 yang tepat
- Sediakan meta tag OpenGraph dan Meta Description
- Satu `<h1>` per halaman, hierarchy heading harus benar: h1 → h2 → h3
- Semua tombol interaktif memiliki `aria-label`
- Kontras warna minimal 4.5:1 (WCAG AA)

---

## Kontak & Business Info

- **Brand**: Aura Copper & Brass Crafts
- **Lokasi**: Boyolali (Tumang), Jawa Tengah
- **WhatsApp**: +6281234567890
- **Spesialisasi**: Bak mandi tembaga, lampu chandelier, relief dinding, kubah masjid, luxury decor
- **Material**: Tembaga Murni 99.9%, Kuningan Impor Kelas A, Perunggu
- **Finishing**: Polished, Antique Patina, Green Oxidation, Burnished Black, Raw Copper
- **Texture**: Hammered Dot, Smooth Mirror, Etched Pattern
