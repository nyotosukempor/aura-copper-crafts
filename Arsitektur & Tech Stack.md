# 🏗️ Arsitektur & Tech Stack Proyek

Kembali ke [[00 - Index Proyek Website Aura Copper Crafts|Index Memory]]

---

## 📐 Arsitektur Utama

Website **Aura Copper & Brass Crafts** dibangun menggunakan arsitektur **Single-Page Application (SPA) / High-Performance Landing Page** murni tanpa framework JS (Vanilla Web Standard) untuk kecepatan muat maksimal dan kontrol performa terbaik.

```
PROJECT WEBSITE/
├── 📄 index.html                            # Landing page utama (HTML5 Semantik, SEO & Schema.org)
├── 🎨 style.css                             # Visual design system (27KB+ Vanilla CSS, CSS Variables)
├── ⚙️ app.js                                # Engine logika & library initiators (500+ baris Vanilla JS)
├── 🖼️ assets/
│   └── products/                            # Media produk WebP & studio preview
├── 🤖 .agents/
│   ├── AGENTS.md                            # Rulebook workspace & agen
│   └── skills/                              # 8 Modular agent skills
├── ⚙️ .obsidian/                            # Konfigurasi Vault Obsidian
└── 📋 plans/                                # Berkas refactoring & optimasi ponytail
```

---

## ⚡ Library CDN UI Stack

Website ini memanfaatkan kombinasi library CDN modern yang diinisialisasi secara sinkron di `app.js`:

| Library | Versi | Fungsi & Tugas |
|---|---|---|
| **GSAP + ScrollTrigger** | 3.12.5 | Animasi parallax hero, section reveal, & efek micro-animations |
| **Lenis** | 1.1.14 | Ultra-smooth inertia scrolling yang tersinkronisasi dengan GSAP ticker |
| **AOS (Animate On Scroll)** | 2.3.4 | Animasi kemunculan elemen kartu & galeri |
| **Swiper.js** | 11.0.0 | Carousel 3D galeri portfolio & testimoni |
| **VanillaTilt** | 1.8.1 | Efek kartu tilt 3D interaktif pada katalog produk & stepper |
| **Tippy.js + Popper** | 6.x | Smart tooltips untuk penjelasan material & spesifikasi |
| **SplitType** | 0.3.4 | Pembagian teks karakter/kata untuk efek pengetikan GSAP |
| **CountUp.js** | 2.8.0 | Counter animasi angka statistik pengrajin & proyek |
| **Font Awesome** | 6.5.1 | Ikonografi vektor |

---

## 🔒 Aturan Pengkodean (Coding Guidelines)

1. **Vanilla-First**: Dilarang menggunakan React/Vue atau Tailwind kecuali diminta secara eksplisit oleh pengguna.
2. **Standard Scripts Placement**: Tag `<script>` wajib berada di bagian paling bawah sebelum `</body>`.
3. **Optimasi Gambar**: Semua gambar menggunakan format `WebP`/`PNG high-res` dengan atribut `alt` deskriptif serta `loading="lazy" decoding="async"`.
4. **Semantik HTML5**: Penggunaan elemen `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`.
5. **No Static Hardcoded Offsets**: Semua perhitungan interaktif & layout dilakukan secara relatif/dinamis.

---
#arsitektur #tech-stack #vanilla-js #gsap #lenis #obsidian-memory
