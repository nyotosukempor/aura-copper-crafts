---
name: product-catalog-manager
description: >
  Skill untuk mengelola, menambah, mengedit, dan mengoptimalkan konten katalog produk di website
  Aura Copper & Brass Crafts. Gunakan saat diminta menambah produk baru ke katalog, mengubah
  harga, menambah kategori filter, memperbaiki modal detail produk, atau mengupdate galeri gambar.
---

# Product Catalog Manager Skill

Skill ini mengelola semua konten produk katalog, kategori filter, dan modal detail produk.

## Struktur Data Produk

Setiap produk di katalog memiliki struktur data berikut:

```javascript
const productData = {
  id: 'bathtub-rolltop-01',         // ID unik
  category: 'bathtub',               // 'bathtub' | 'lampu' | 'relief' | 'kubah' | 'decor'
  name: 'Bak Mandi Roll Top',
  subtitle: 'Copper Bathtub Classic',
  material: 'Tembaga Murni 99.9%',
  finishing: 'Polished Copper',
  thickness: '1.5mm',
  dimensions: '170 x 75 x 65 cm',
  weight: '45-55 kg',
  priceRange: 'Rp 35.000.000 – Rp 55.000.000',
  leadTime: '30-45 hari kerja',
  badge: 'Best Seller',             // '' | 'Best Seller' | 'New' | 'Premium' | 'Limited'
  features: [
    'Tempa tangan oleh pengrajin master',
    'Tahan karat dengan coating lacquer premium',
    'Custom ukuran tersedia',
    'Pengiriman aman seluruh Indonesia & ekspor',
  ],
  image: 'assets/products/bathtub-rolltop.webp',
  imageAlt: 'Bak Mandi Tembaga Roll Top Tempa Manual Boyolali',
  whatsappText: 'Halo, saya tertarik dengan Bak Mandi Roll Top Tembaga',
};
```

## Kategori Produk & Filter

```javascript
const categories = [
  { id: 'all',    label: 'Semua Produk',        icon: 'fa-grid-2' },
  { id: 'bathtub', label: 'Bak Mandi Tembaga',  icon: 'fa-bath' },
  { id: 'lampu',   label: 'Lampu & Chandelier', icon: 'fa-lightbulb' },
  { id: 'relief',  label: 'Relief & Wall Art',  icon: 'fa-image' },
  { id: 'kubah',   label: 'Kubah Masjid',       icon: 'fa-mosque' },
  { id: 'decor',   label: 'Home Decor',         icon: 'fa-gem' },
];
```

## Daftar Produk Lengkap per Kategori

### 🛁 Bak Mandi Tembaga (Copper Bathtub)
| Nama Produk | Tipe | Dimensi Std | Harga Mulai |
|---|---|---|---|
| Roll Top Classic | Clawfoot | 170×75×65 | Rp 35 jt |
| Single Slipper | Raised One End | 170×75×70 | Rp 38 jt |
| Oval Hammered | Double Slipper | 180×80×70 | Rp 45 jt |
| Vessel (Soaking Tub) | Freestanding | 165×80×60 | Rp 42 jt |

### 💡 Lampu Gantung & Chandelier
| Nama Produk | Gaya | Diameter | Harga Mulai |
|---|---|---|---|
| Chandelier Nabawi | Islamic | 80–200cm | Rp 15 jt |
| Geometric Brass Pendant | Modern | 40–80cm | Rp 8 jt |
| Industrial Copper Cage | Industrial | 30–60cm | Rp 5 jt |
| Moroccan Lantern | Moroccan | 25–50cm | Rp 4 jt |

### 🖼️ Relief & Wall Art
| Nama Produk | Teknik | Ukuran Std | Harga Mulai |
|---|---|---|---|
| Kaligrafi Arab Relief | Ukir + Tempa | Custom | Rp 3 jt/m² |
| Ornamen Bunga 3D | Tempa Relief | Custom | Rp 2.5 jt/m² |
| Panel Landscape | Ukir Manual | Custom | Rp 4 jt/m² |

### 🕌 Kubah & Ornamen Masjid
| Nama Produk | Material | Ukuran | Harga |
|---|---|---|---|
| Kubah Masjid Besar | Tembaga 2mm | Custom | Konsultasi |
| Kubah Kecil Mushola | Tembaga 1.5mm | Ø 1–3m | Rp 25 jt |
| Ornamen Gerbang | Kuningan | Custom | Konsultasi |

## Template HTML Kartu Produk

```html
<article class="katalog-card" data-category="bathtub" data-tilt>
  <div class="card-image-wrap">
    <img src="assets/products/bathtub-rolltop.webp" 
         alt="Bak Mandi Tembaga Roll Top Tempa Manual Boyolali"
         loading="lazy" decoding="async" width="400" height="300">
    <span class="card-badge badge-bestseller">Best Seller</span>
    <div class="card-overlay">
      <button class="btn-detail" data-product-id="bathtub-rolltop-01"
              aria-label="Lihat detail Bak Mandi Roll Top">
        <i class="fa-solid fa-eye"></i> Lihat Detail
      </button>
    </div>
  </div>
  <div class="card-body">
    <h3 class="card-title">Bak Mandi Roll Top</h3>
    <p class="card-subtitle">Copper Bathtub Classic</p>
    <div class="card-specs">
      <span><i class="fa-solid fa-ruler-combined"></i> 170×75×65 cm</span>
      <span><i class="fa-solid fa-weight-scale"></i> 45–55 kg</span>
    </div>
    <div class="card-price">Rp 35.000.000 – Rp 55.000.000</div>
    <a href="https://wa.me/6281234567890?text=Saya%20tertarik%20Bak%20Mandi%20Roll%20Top"
       target="_blank" class="btn btn-primary btn-sm card-cta">
      <i class="fa-brands fa-whatsapp"></i> Order Sekarang
    </a>
  </div>
</article>
```

## Cara Menambah Produk Baru

1. Tambahkan data produk ke array `products` di `app.js`
2. Tambahkan kartu HTML di `index.html` di dalam `#katalog-grid`
3. Pastikan `data-category` sesuai dengan kategori yang sudah ada
4. Gunakan format harga: `Rp X.000.000 – Rp Y.000.000`
5. Optimalkan gambar ke format WebP, simpan di `assets/products/`
6. Tambahkan atribut `alt` yang deskriptif dan spesifik

## Badge Warna

```css
.badge-bestseller { background: linear-gradient(135deg, #D97736, #F59E0B); }
.badge-new        { background: linear-gradient(135deg, #10B981, #059669); }
.badge-premium    { background: linear-gradient(135deg, #8B5CF6, #7C3AED); }
.badge-limited    { background: linear-gradient(135deg, #EF4444, #DC2626); }
```
