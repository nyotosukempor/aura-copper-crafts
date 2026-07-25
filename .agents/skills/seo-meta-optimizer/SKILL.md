---
name: seo-meta-optimizer
description: >
  Skill untuk mengoptimasi SEO on-page, meta tag OpenGraph, structured data JSON-LD,
  dan aksesibilitas ARIA pada website Aura Copper & Brass Crafts. Gunakan skill ini saat
  diminta memperbaiki SEO, meta description, Open Graph, schema markup, sitemap, alt tag gambar,
  heading hierarchy, atau accessibility score.
---

# SEO & Meta Optimizer Skill

Skill ini memastikan setiap halaman website Aura Copper & Brass Crafts memenuhi standar SEO
premium dan aksesibilitas tinggi untuk mesin pencari dan pembaca layar.

## Meta Tags Standar Wajib

```html
<!-- Primary Meta -->
<title>Aura Copper & Brass Crafts | Mahakarya Kerajinan Tembaga & Kuningan Custom</title>
<meta name="description" content="Produsen Kerajinan Tembaga & Kuningan Premium Boyolali. Custom Order Bak Mandi Tembaga, Lampu Gantung Nabawi, Relief Dinding, Kubah Masjid. Kualitas Ekspor.">
<meta name="keywords" content="kerajinan tembaga, bak mandi tembaga, copper bathtub, kuningan boyolali, tumang craft, kubah masjid tembaga">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://auracoppercrafts.com/">

<!-- Open Graph (Facebook/LinkedIn) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Aura Copper & Brass Crafts | Premium Handcrafted Metal">
<meta property="og:description" content="Mahakarya tembaga & kuningan murni dari Boyolali. Custom order tersedia.">
<meta property="og:image" content="https://auracoppercrafts.com/assets/og-image.jpg">
<meta property="og:url" content="https://auracoppercrafts.com/">
<meta property="og:site_name" content="Aura Copper & Brass Crafts">
<meta property="og:locale" content="id_ID">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Aura Copper & Brass Crafts">
<meta name="twitter:description" content="Kerajinan Tembaga & Kuningan Premium Custom Order">
<meta name="twitter:image" content="https://auracoppercrafts.com/assets/og-image.jpg">
```

## JSON-LD Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aura Copper & Brass Crafts",
  "description": "Produsen kerajinan tembaga dan kuningan premium Boyolali",
  "url": "https://auracoppercrafts.com",
  "telephone": "+6281234567890",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Boyolali",
    "addressRegion": "Jawa Tengah",
    "addressCountry": "ID"
  },
  "priceRange": "Rp 5.000.000 – Rp 150.000.000",
  "openingHours": "Mo-Sa 08:00-17:00",
  "hasMap": "https://maps.google.com/?q=Boyolali",
  "@type": "Product",
  "category": "Kerajinan Logam"
}
</script>
```

## Checklist Aksesibilitas

- [ ] Setiap `<img>` memiliki atribut `alt` yang deskriptif (contoh: `alt="Bak Mandi Tembaga Roll Top Tempa Manual Boyolali"`)
- [ ] Satu `<h1>` per halaman; heading hierarchy: h1 → h2 → h3
- [ ] Semua tombol interaktif memiliki `aria-label` atau teks yang jelas
- [ ] Kontras warna teks minimal 4.5:1 (WCAG AA)
- [ ] Elemen fokus keyboard memiliki outline visible
- [ ] Form input memiliki `<label>` yang terhubung via `for`/`id`
- [ ] Modal memiliki `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

## Panduan Heading Hierarchy

```
<h1> — Nama Brand / Tagline Utama Hero
  <h2> — Nama Section (Studio Customizer, Katalog Produk, dst.)
    <h3> — Judul Produk Individual / Judul FAQ
      <h4> — Sub-detail produk (opsional)
```

## Optimasi Performance (Core Web Vitals)

- Lazy load gambar: `<img loading="lazy" decoding="async" ...>`
- Preload font: `<link rel="preload" href="..." as="font" crossorigin>`
- Minify CSS/JS sebelum deploy produksi
- Gunakan WebP untuk semua gambar produk
- Hindari render-blocking scripts — pastikan semua `<script>` ada di bawah `</body>`
