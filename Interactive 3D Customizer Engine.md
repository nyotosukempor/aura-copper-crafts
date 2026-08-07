# 🧪 Interactive 3D Customizer Engine

Kembali ke [[00 - Index Proyek Website Aura Copper Crafts|Index Memory]]

---

## 📌 Ringkasan Modul Customizer

Modul Customizer interaktif di `app.js` memungkinkan calon pelanggan memvisualisasikan produk kerajinan tembaga/kuningan secara *real-time* sebelum melakukan pemesanan custom.

---

## 🎛️ Matrix Pilihan Spesifikasi

1. **7 Kategori Produk Logam**:
   - Bak Mandi (Bathtub)
   - Lampu & Chandelier
   - Wastafel (Sink)
   - Relief & Dinding
   - Kubah Masjid
   - Meja Furniture
   - Vas & Decor
2. **4 Jenis Logam Base**:
   - Tembaga Murni 99.9%
   - Kuningan Impor Grade A
   - Perunggu (Bronze)
   - Dual-Tone (Copper + Brass)
3. **5 Finishing Warna Patina (CSS Filter Overlays)**:
   - `.filter-polished`: Mengkilap cermin (Polished Mirror)
   - `.filter-antique`: Antique Patina Hitam Tembaga
   - `.filter-green`: Verdigris Green Oxidation
   - `.filter-satin`: Satin Matt halus
   - `.filter-raw`: Warna asli alami tembaga
4. **4 Tekstur Tempaan**:
   - `Hammered Dot` (Tekstur bintik tempa tangan manual)
   - `Smooth Mirror` (Permukaan polos mengkilap)
   - `Etched Pattern` (Ukir pola pahatan batik/geometris)
   - `Chiseled Lines` (Garis pahatan tegas)

---

## 📷 Fallback & Asset Lookup Matrix

Engine customizer menggunakan sistem pemetaan berkas gambar di `assets/products/`:
- `bathtub_copper_antique.png`
- `chandelier_brass_shiny.png`
- `sink_copper_green.png`
- `relief_copper_etched.png`
- `dome_brass_polished.png`

Jika kombinasi spesifikasi khusus yang dipilih pengguna belum memiliki file spesifik, engine secara cerdas:
1. Menerapkan **CSS Filter Overlay** real-time pada foto base produk.
2. Menyertakan handler `onerror` fallback otomatis untuk mencegah kesalahan gambar rusak (404-proof).

---
#customizer #3d-visualizer #css-filters #material-matrix #obsidian-memory
