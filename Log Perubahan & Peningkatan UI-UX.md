# 📜 Log Perubahan & Peningkatan UI-UX

Kembali ke [[00 - Index Proyek Website Aura Copper Crafts|Index Memory]]

---

## 🗓️ Catatan Histori Pekerjaan & Overhaul UI/UX

### 🌟 Phase 1: Overhaul Desain Glassmorphism & Logam Tembaga (1 Agustus 2026)
- **Transformasi Visual**: Mengubah landing page standar menjadi luxury dark metallic gallery theme (`#0B0B0E`).
- **Pembaruan Asset**: Membuat 5 gambar produk realistis ultra-high definition dengan AI studio lighting (`assets/products/`).
- **Integrasi Customizer**: Membangun visualizer 3D real-time dengan CSS filter overlays & tekstur tempa.
- **Transformasi Form Order**: Mengganti nominal IDR statis dengan Form Spesifikasi Teknis Plat ($m^2$ & $kg$) dan WhatsApp RAB Generator.
- **Library Modernization**: Memasang GSAP 3.12.5, Lenis Smooth Scroll 1.1.14, VanillaTilt 1.8.1, Swiper 11, Tippy.js 6, & CountUp.js.

### ⚙️ Phase 2: Perbaikan Ponytail & Optimasi Performa (Agustus 2026)
- **Refactoring Accordion FAQ**: Perbaikan ekspansi smooth accordion FAQ tanpa layout jank.
- **Pembersihan Logika Counter**: Deduping event listener untuk CountUp.js.
- **Peningkatan Responsivitas Mobile**: Menghilangkan efek 3D tilt berat pada layar sentuh/touch device & perangkat dengan `prefers-reduced-motion`.
- **Integrasi Vault Obsidian**: Penghubungan folder proyek ke Obsidian Vault dengan indeks memori terstruktur.

### 🚀 Phase 3: Pembaruan Galeri Blossom Carousel (Agustus 2026)
- **Pembaruan Asset**: Memindahkan dan mengimplementasikan 9 foto resolusi tinggi terbaru format `.png` ke folder `assets/products/`.
- **Pembaruan UI Galeri**: Merombak elemen struktur `<blossom-carousel>` di `index.html` menjadi 9 card slide presisi sesuai foto asli.
- **Penyesuaian Meta Produk**: Memperbarui Judul (h3), Badge Material (Tembaga Murni & Kuningan Class A), dan Deskripsi pada slide galeri.
- **Penyelarasan System WhatsApp**: Menyeragamkan semua pesan Generator Order WA baik pada Galeri maupun Customizer ke nomor default (`+6281234567890`) sesuai standarisasi `AGENTS.md`.
- **Logic Mapping Pembaruan**: Memperbarui struktur mapping `photoMatrix` dan fallback `categoryDefaults` dalam `app.js` agar state produk 3D Visualizer memanggil aset-aset png terbaru yang relevan.

---

## 📋 Rencana Peningkatan Mendatang (Backlog)

- [ ] Penambahan fitur 3D Canvas WebGL (Three.js light version) untuk rotasi 360° model bak mandi tembaga.
- [ ] Pengayaan galeri video proyek instalasi kubah masjid & chandelier kuningan di berbagai daerah Indonesia.
- [ ] Implementasi fitur Multi-Language (Bahasa Indonesia & English) untuk pasar ekspor Eropa/Middle-East.

---
#log #changelog #overhaul #ui-ux #history #obsidian-memory
