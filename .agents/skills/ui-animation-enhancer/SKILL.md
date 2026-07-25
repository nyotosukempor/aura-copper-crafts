---
name: ui-animation-enhancer
description: >
  Skill untuk mengintegrasikan dan mengoptimalkan library animasi UI premium (GSAP, Lenis, AOS,
  VanillaTilt, Swiper, Tippy, SplitType, CountUp) ke dalam website Aura Copper & Brass Crafts.
  Gunakan skill ini saat diminta menambahkan animasi, transisi, efek scroll, efek 3D kartu,
  slider galeri, smooth scroll, tooltip, atau counter angka animasi.
---

# UI Animation Enhancer Skill

Skill ini mengelola semua library animasi dan UI premium yang sudah terpasang via CDN di project ini.

## Library yang Sudah Terpasang (via CDN)

| Library | Versi | CDN |
|---|---|---|
| GSAP + ScrollTrigger + TextPlugin | 3.12.5 | jsdelivr |
| Lenis Smooth Scroll | 1.1.14 | unpkg |
| AOS Animate on Scroll | 2.3.4 | unpkg |
| Swiper.js | 11 | jsdelivr |
| VanillaTilt 3D | 1.8.1 | jsdelivr |
| Tippy.js + Popper.js | 6 | unpkg |
| SplitType | 0.3.4 | jsdelivr |
| CountUp.js | 2.8.0 | jsdelivr |

## Pola Penggunaan

### GSAP ScrollTrigger – Reveal Animasi
```js
gsap.from('.element', {
  opacity: 0, y: 60, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.element', start: 'top 85%' }
});
```

### Lenis Smooth Scroll – Sudah aktif di app.js (section 8)
- Durasi: 1.4s, easing exponential
- Sudah di-sync dengan GSAP ticker

### AOS – Atribut HTML
```html
<div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">...</div>
```
Nilai easing: `ease-out-cubic`, `ease-in-out-quart`

### VanillaTilt – Selector yang aktif
- `.katalog-card` — max tilt 8°, glare 15%
- `.stat-card` — max tilt 8°, glare 15%
- `.process-step` — max tilt 8°, glare 15%
- Tambah selector baru: `VanillaTilt.init(document.querySelectorAll('.new-class'), {...})`

### Swiper.js – Galeri Slider
```js
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});
```

### Tippy.js – Tooltip Baru
```js
tippy('.my-btn', {
  content: 'Tooltip teks di sini',
  theme: 'translucent',
  placement: 'top',
  animation: 'scale',
});
```

### SplitType + GSAP – Animasi Karakter Teks
```js
const split = new SplitType('.hero-title', { types: 'words,chars' });
gsap.from(split.chars, {
  opacity: 0, y: 30, rotateX: -40,
  stagger: 0.025, duration: 0.7, ease: 'back.out(2)', delay: 0.3
});
```

### CountUp.js – Counter Animasi
- Sudah aktif via IntersectionObserver di app.js (section 13)
- Trigger otomatis pada elemen dengan atribut `data-target="[angka]"`

## Panduan Menambah Animasi Baru
1. Identifikasi elemen HTML yang ingin dianimasikan
2. Pilih library yang sesuai (GSAP untuk kompleks, AOS untuk sederhana)
3. Tambahkan kode di `app.js` dalam blok `DOMContentLoaded`
4. Pastikan selector spesifik agar tidak mengganggu elemen lain
5. Gunakan `ease: 'power3.out'` atau `ease: 'back.out(1.7)'` sesuai tone luxury brand

## Warna & Token Animasi Brand
- Copper glow: `#D97736` / `rgba(217,119,54,0.3)`
- Gold shimmer: `#F59E0B`
- Background: `#0D0D11` (Onyx), `#16171F` (Slate)
- Duration standard: `0.7s – 1.2s`
- Delay stagger: `0.05s – 0.15s per item`
