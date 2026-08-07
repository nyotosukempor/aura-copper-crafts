# 🎨 Design System & Visual Tokens

Kembali ke [[00 - Index Proyek Website Aura Copper Crafts|Index Memory]]

---

## 💎 Konsep Estetika: Luxury Dark Metallic

Website Aura Copper & Brass Crafts menerapkan tema **Dark-first Luxury Glassmorphic** dengan nuansa kilau logam tembaga dan kuningan yang elegan.

---

## 🎨 Palet Warna Brand (CSS Custom Properties)

```css
:root {
  /* Surface & Background */
  --bg-primary: #0B0B0E;         /* Deep Obsidian Onyx */
  --bg-secondary: #14151D;       /* Slate Obsidian */
  --bg-glass: rgba(20, 21, 29, 0.82); /* Glassmorphism card surface */

  /* Metallic Accents */
  --color-copper: #D97736;        /* Burnished Copper */
  --color-copper-light: #F09A59;  /* Light Copper Glow */
  --color-gold: #E5A93C;          /* Polished Brass Gold */
  --color-amber: #F59E0B;         /* Warm Amber */
  --color-bronze: #8D5B2C;        /* Sculptural Bronze */

  /* Borders & Shadows */
  --border-copper: rgba(217, 119, 54, 0.22); /* Metallic Hairline Border */
  --shadow-copper-glow: 0 0 35px rgba(217, 119, 54, 0.25);
}
```

---

## 🖋️ Tipografi

- **Display & Headlines**: `Cormorant Garamond` & `Playfair Display` (Memberikan kesan artistik ala galeri barang seni premium & mewah).
- **Body Text & UI**: `Plus Jakarta Sans` & `Outfit` (Keterbacaan tinggi, bersih, dan modern).

```css
h1, h2, h3, .serif-font {
  font-family: 'Playfair Display', 'Cormorant Garamond', serif;
}

body, button, input, select {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
```

---

## ✨ Komponen Visual Utama

1. **Glassmorphism Multi-layer**: Kartu produk & form menggunakan `backdrop-filter: blur(20px)` dipadukan dengan hairline border tembaga transparan.
2. **Metallic Glow Hover**: Efek glowing saat kursor melayang di atas kartu produk atau tombol utama.
3. **Interactive 3D Tilt**: Kartu produk miring secara proporsional mengikuti pergerakan kursor mouse pengguna via VanillaTilt.js.

---
#design-system #colors #typography #glassmorphic #copper-theme #obsidian-memory
