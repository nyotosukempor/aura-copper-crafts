# Ringkasan Proyek & Dokumentasi Overhaul UI/UX: Aura Copper & Brass Crafts

---
**Tanggal**: 1 Agustus 2026  
**Brand**: Aura Copper & Brass Crafts (Tumang, Cepogo, Boyolali, Jawa Tengah)  
**Tema Utama**: Ultra-Modern Dark Glassmorphic Luxury  
**Repositori**: `nyotosukempor/aura-copper-crafts`  

---

## 🎨 1. Konsep Desain & Sistem Visual Baru

- **Palet Warna Luxury Dark Metallic**:
  - **Background Utama**: Deep Obsidian Onyx (`#0B0B0E`)
  - **Surface & Cards**: Glassmorphism Slate (`rgba(20, 21, 29, 0.82)`) dengan multi-layer `backdrop-filter: blur(20px)` dan hairline border tembaga (`rgba(217, 119, 54, 0.22)`).
  - **Aksen Logam**: Burnished Copper (`#D97736`), Warm Amber Gold (`#F59E0B`), Polished Brass (`#E5A93C`), dan Sculptural Bronze (`#8D5B2C`).
- **Tipografi Garamond & Jakarta Sans**:
  - **Headlines & Display**: Google Fonts `Cormorant Garamond` & `Playfair Display` (kemewahan tajam ala galeri arsitektur).
  - **Body & UI**: Google Fonts `Plus Jakarta Sans` & `Outfit`.

---

## 📸 2. Studio Customizer & Foto Produk Realistis AI

- **Simulation Preview Foto Asli Produk**:
  - Berhasil memproduksi dan mengintegrasikan 5 foto produk tembaga/kuningan super-realistis dengan pencahayaan luxury studio ke folder `assets/products/`:
    1. `bathtub_copper_antique.png` (Bak Mandi Tembaga Antique Patina)
    2. `chandelier_brass_shiny.png` (Chandelier Kuningan Polished Gold)
    3. `sink_copper_green.png` (Wastafel Tembaga Verdigris Green)
    4. `relief_copper_etched.png` (Relief Dinding Tembaga Ukir Etched)
    5. `dome_brass_polished.png` (Kubah Masjid Kuningan Mengkilap)
- **7 Kategori Produk Logam**: Bak Mandi, Lampu & Chandelier, Wastafel, Relief & Dinding, Kubah Masjid, Meja Furniture, Vas & Decor.
- **4 Jenis Logam Base**: Tembaga Murni 99.9%, Kuningan Impor Grade A, Perunggu (Bronze), & Dual-Tone (Copper + Brass).
- **5 Finishing Warna Patina**: Polished Shiny Mirror, Antique Patina Black, Green Oxidation Patina, Brushed Satin Matt, & Raw Natural Untreated.
- **4 Tekstur Tempa**: Hammered Dot (Bintik), Smooth Mirror (Polos), Etched Pattern (Ukir), & Chiseled Lines (Pahatan).
- **Dynamic CSS Overlay Filters**: 5 kelas filter CSS dinamis (`.filter-polished`, `.filter-antique`, `.filter-green`, `.filter-satin`, `.filter-raw`) dan overlay tekstur SVG (`.texture-hammered`, `.texture-etched`, `.texture-chiseled`) yang secara instan menyesuaikan warna & tekstur preview secara real-time.
- **Fallback 404-Proof**: Handler `onerror` otomatis memuat gambar fallback jika berkas kombinasi tertentu tidak ditemukan.

---

## 🛠️ 3. Form Spesifikasi Custom Order & Refactoring Harga

- **Eliminasi Tampilan Harga**: Seluruh badge harga, angka nominal IDR, dan logika perhitungan biaya telah dihapus secara bersih.
- **Form Kebutuhan Spesifikasi Teknis**: Menghitung estimasi Luas Plat ($m^2$) dan Estimasi Berat ($kg$) berdasarkan dimensi (Panjang, Lebar, Tinggi, Ketebalan Plat 0.8mm - 2.0mm).
- **Quotation Info Callout Box**: Mengarahkan pengguna untuk meminta Surat Penawaran Harga Resmi & RAB via WhatsApp.
- **Dynamic WhatsApp Link Generator**: Mengisi pesan WhatsApp otomatis dengan rincian spesifikasi kustom pengguna secara presisi.

---

## ⚙️ 4. Library Animasi & UI Stack

- **GSAP 3.12.5 + ScrollTrigger & TextPlugin**: Animasi parallax, reveal seksi, dan karakter reveal pada headline.
- **Lenis 1.1.14 Smooth Scroll**: Pengalaman scroll ultra-smooth diintegrasikan dengan GSAP ticker driver.
- **Swiper 11**: Carousel 3D galeri portfolio.
- **VanillaTilt 1.8.1**: Efek kartu tilt 3D pada katalog produk dan process stepper.
- **CountUp.js 2.8.0 & Tippy.js 6**: Animasi angka statistik dan tooltips informasi material.

---

## 🗂️ 5. Struktur Berkas Utama Proyek

- `index.html`: Single-page landing page utama dengan semantik HTML5, schema.org JSON-LD, dan meta tags SEO.
- `style.css`: Design system tokens, liquid glassmorphism, responsive grid (Mobile hingga 4K), dan CSS filter overlays.
- `app.js`: Engine interaktif customizer, photo matrix lookup, GSAP/Lenis smooth scroll, dan WhatsApp message generator.
- `assets/products/`: Berkas foto produk resolusi tinggi asli dan AI generated.
- `.agents/skills/kerajinan-tembaga-builder/SKILL.md`: Dokumentasi skill dan standar kustomizer yang diperbarui.

---

*Diperbarui dan disimpan ke repositori Git pada 1 Agustus 2026.*
