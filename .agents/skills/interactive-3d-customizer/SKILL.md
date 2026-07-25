---
name: interactive-3d-customizer
description: Skill untuk membangun logika komponen interaktif seperti preview tekstur/finishing tembaga, kalkulator estimasi ukuran dan biaya custom order, serta generator link pemesanan WhatsApp.
---

# Interactive 3D & Customizer Skill

Skill ini mengatur komponen interaktif web untuk kustomisasi produk kerajinan tembaga dan kuningan secara real-time di sisi browser.

## Modul Interaktif Utama

### 1. Material & Patina Finish Visualizer
Memungkinkan pelanggan mencoba berbagai kombinasi lapisan material dan tekstur pada kerajinan tembaga:
- **Material**: Copper (Tembaga Murni Warm Reddish Orange), Brass (Kuningan Gold Amber), Bronze (Perunggu Dark).
- **Finishing & Patina**:
  - `polished`: Kilau murni berkilau dengan proteksi clear coat.
  - `antique`: Oksidasi hitam/cokelat gelap pada celah tempaan (*Hand-rubbed antique patina*).
  - `green-patina`: Oksidasi verdigris alami hijau toska mewah.
  - `burnished-black`: Hitam legam eksklusif dengan aksen logam tempa.
- **Texture**:
  - `hammered-dot`: Bintik tempa manual palu bulat.
  - `smooth`: Halus mulus dipoles.
  - `etched-pattern`: Ukiran motif relief tradisional / ornamen.

### 2. Custom Order Price & Specs Estimator
Algoritma perhitungan matematis estimasi produk di JS:
- `Luas Permukaan (m²) = f(Dimensi P x L x T, Jenis Produk)`
- `Estimasi Berat Plat (kg) = Luas Permukaan x Ketebalan Plat (mm) x Densitas Logam (8.96 untuk Tembaga)`
- `Estimasi Harga (IDR) = Berat Plat x Harga per kg + Faktor Kesulitan Crafting + Finishing Bonus`
- Output otomatis menyajikan kisaran estimasi biaya + tombol "Kirim Spesifikasi ke WhatsApp Admin".

### 3. Generator Message WhatsApp
Format pesan otomatis yang dihasilkan oleh kalkulator:
```text
Halo Admin Crafting Tembaga, saya ingin konsultasi order custom:
- Jenis Produk: [Nama Produk]
- Dimensi: [P] x [L] x [T] cm
- Ketebalan Plat: [X] mm
- Material & Finishing: [Bahan] - [Finish]
- Tekstur Tempa: [Jenis Tekstur]
- Perkiraan Estimasi: Rp [Harga]

Mohon info penawaran resmi dan estimasi waktu pengerjaannya. Terima kasih!
```
