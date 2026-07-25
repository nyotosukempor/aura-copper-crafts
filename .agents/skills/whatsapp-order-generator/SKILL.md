---
name: whatsapp-order-generator
description: >
  Skill untuk membangun, mengoptimalkan, dan men-debug sistem pemesanan via WhatsApp pada website
  Aura Copper & Brass Crafts. Gunakan saat diminta memperbaiki format pesan WA, generator link WA,
  integrasi form kalkulator ke WA, atau menambahkan tombol quick-order WhatsApp baru.
---

# WhatsApp Order Generator Skill

Skill ini mengelola semua aspek sistem pemesanan dan konsultasi via WhatsApp yang terintegrasi
dengan kalkulator estimasi harga custom order.

## Nomor WhatsApp Bisnis
```
Default: +6281234567890
Format URL: https://wa.me/6281234567890
```
> ⚠️ Ganti nomor di semua lokasi sebelum go-live produksi.

## Template Pesan WhatsApp

### Template 1 – Custom Order dari Kalkulator
```text
Halo Admin Aura Copper 👋

Saya ingin konsultasi *Custom Order* kerajinan tembaga:

📦 *Detail Pesanan:*
• Jenis Produk  : [NAMA_PRODUK]
• Dimensi       : [P] x [L] x [T] cm
• Ketebalan Plat: [X] mm
• Material      : [Tembaga Murni / Kuningan / Perunggu]
• Finishing     : [Polished / Antique / Green Patina / Raw]
• Tekstur Tempa : [Hammered / Smooth / Etched]

💰 *Estimasi Harga:* Rp [MIN] – Rp [MAX]
⚖️  *Estimasi Berat:* ~[BERAT] kg

Mohon info penawaran resmi, estimasi waktu pengerjaan,
dan opsi pengiriman. Terima kasih! 🙏
```

### Template 2 – Konsultasi Umum
```text
Halo Admin Aura Copper & Brass Crafts 👋

Saya tertarik dengan produk kerajinan tembaga/kuningan Anda.
Boleh saya konsultasi lebih lanjut?

Nama  : [NAMA]
Kota  : [KOTA]
Produk: [PRODUK YANG DIMINATI]

Terima kasih! 🙏
```

### Template 3 – Request Katalog / Price List
```text
Halo Admin Aura Copper 👋

Saya ingin meminta *katalog lengkap* dan *price list* 
produk kerajinan tembaga & kuningan Anda.

Terima kasih! 🙏
```

## Fungsi JavaScript – Generator Link WA

```javascript
/**
 * Generate WhatsApp order link dari data kalkulator
 * @param {Object} orderData - Data dari form kalkulator
 * @returns {string} URL WhatsApp yang sudah di-encode
 */
function generateWhatsAppLink(orderData) {
    const { product, length, width, height, thickness, material, finishing, texture, minPrice, maxPrice, weight } = orderData;
    
    const message = `Halo Admin Aura Copper 👋

Saya ingin konsultasi *Custom Order* kerajinan tembaga:

📦 *Detail Pesanan:*
• Jenis Produk  : ${product}
• Dimensi       : ${length} x ${width} x ${height} cm
• Ketebalan Plat: ${thickness} mm
• Material      : ${material}
• Finishing     : ${finishing}
• Tekstur Tempa : ${texture}

💰 *Estimasi Harga:* Rp ${minPrice.toLocaleString('id-ID')} – Rp ${maxPrice.toLocaleString('id-ID')}
⚖️  *Estimasi Berat:* ~${weight} kg

Mohon info penawaran resmi dan estimasi waktu pengerjaan. Terima kasih! 🙏`;

    const phone = '6281234567890';
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

## Tombol WA – HTML Standar

```html
<!-- Tombol utama WA -->
<a href="https://wa.me/6281234567890?text=Halo%20Admin%20Aura%20Copper"
   target="_blank" rel="noopener noreferrer"
   class="btn btn-primary btn-wa"
   aria-label="Chat via WhatsApp">
  <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
</a>

<!-- Floating WA Button -->
<a href="https://wa.me/6281234567890" 
   target="_blank" rel="noopener noreferrer"
   id="wa-float-btn" class="wa-float"
   aria-label="Hubungi kami via WhatsApp">
  <i class="fa-brands fa-whatsapp"></i>
</a>
```

## CSS Floating WA Button

```css
.wa-float {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  z-index: 999;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.wa-float:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
}
```

## Validasi Form Sebelum Generate Link WA

```javascript
function validateAndSendToWA(formData) {
    const required = ['product', 'length', 'width', 'height'];
    const missing = required.filter(f => !formData[f] || formData[f] <= 0);
    
    if (missing.length > 0) {
        alert(`Mohon lengkapi: ${missing.join(', ')}`);
        return;
    }
    
    const link = generateWhatsAppLink(formData);
    window.open(link, '_blank', 'noopener,noreferrer');
}
```
