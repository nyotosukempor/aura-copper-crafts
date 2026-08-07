# 📲 Form Custom Order & Logic WhatsApp

Kembali ke [[00 - Index Proyek Website Aura Copper Crafts|Index Memory]]

---

## 💡 Filosofi Sistem Penawaran Harga

Pada perancangan ulang website Aura Copper & Brass Crafts, seluruh nominal harga IDR hardcoded ditiadakan secara total. Kerajinan tembaga dan kuningan kustom bersifat *Bespoke Architecture & Artistry* di mana harga sangat bergantung pada:
- Fluktuasi harga bahan mentah logam dunia
- Ketebalan plat tembaga/kuningan (0.8mm - 2.0mm)
- Tingkat kerumitan ukiran tempa tangan manual

Sebagai gantinya, dikembangkan **Sistem Estimasi Spesifikasi Teknis & Permintaan RAB WhatsApp Direct**.

---

## 🧮 Kalkulator Spesifikasi Teknis

Formulir kustomizer menghitung variabel berikut secara otomatis via JS:
1. **Estimasi Luas Plat ($m^2$)**:
   $$\text{Luas Plat} = \frac{2 \times (P \times L + P \times T + L \times T)}{10000}$$
2. **Estimasi Berat Material ($kg$)**:
   $$\text{Berat} = \text{Luas Plat} \times \text{Ketebalan (mm)} \times \text{Massa Jenis Logam (8.96 untuk Tembaga / 8.53 untuk Kuningan)}$$

---

## 💬 WhatsApp Link Generator Engine

Saat pengguna menekan tombol **"Minta Penawaran RAB via WhatsApp"**, fungsi JS menyusun pesan terstruktur secara otomatis:

```text
Halo Aura Copper & Brass Crafts, saya ingin mengajukan Permintaan Penawaran Harga (RAB) Resmi untuk custom kerajinan tembaga/kuningan:

📋 *Spesifikasi Pesanan:*
- Produk: [Nama Produk]
- Material Logam: [Material]
- Finishing Patina: [Finishing]
- Tekstur Tempa: [Tekstur]
- Dimensi (P x L x T): [Panjang] cm x [Lebar] cm x [Tinggi] cm
- Ketebalan Plat: [Ketebalan] mm
- Est. Luas Plat: [Luas] m²
- Est. Berat Logam: [Berat] kg

Mohon dikirimkan estimasi harga resmi dan estimasi pengerjaan. Terima kasih!
```

Nomor WhatsApp tujuan yang digunakan di seluruh file: `+6281234567890` (Nomor resmi Customer Service Boyolali).

---
#whatsapp #custom-order #rab-calculator #bespoke-crafts #obsidian-memory
