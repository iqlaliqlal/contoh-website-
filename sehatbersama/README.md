# SehatBersama

Website edukasi kesehatan masyarakat — tugas mata kuliah Teknologi Kesehatan Digital.
Tagline: *"Langkah Kecil untuk Masyarakat yang Lebih Sehat."*

## Struktur Folder

```
sehatbersama/
├── index.html              # Struktur halaman (semantic HTML)
├── style.css               # Desain, layout responsif, animasi
├── script.js               # Seluruh fitur interaktif
├── README.md               # Panduan ini
└── assets/
    └── img/
        ├── logo.svg
        ├── artikel-lingkungan.svg
        ├── artikel-dbd.svg
        ├── artikel-gizi.svg
        └── artikel-olahraga.svg
```

## Cara Menjalankan

1. Ekstrak file ZIP sehingga folder `sehatbersama` utuh (jangan pindahkan `index.html` keluar dari folder).
2. Klik dua kali `index.html`, atau klik kanan → *Open with* → Chrome/Edge/Firefox.
3. Opsional (disarankan saat presentasi): di VS Code, pasang ekstensi **Live Server**, klik kanan `index.html` → *Open with Live Server*.

Catatan: font (Google Fonts) dan ikon (Bootstrap Icons) dimuat dari internet. Tanpa internet website tetap berjalan, tetapi font kembali ke font sistem dan ikon tidak tampil. Semua gambar bersifat lokal (SVG).

## Fungsi Setiap Fitur (untuk Presentasi)

| Fitur | Lokasi | Cara kerja |
|---|---|---|
| Navbar responsif | Atas halaman | Menu tautan ke tiap bagian; tautan aktif ditandai otomatis (IntersectionObserver); bayangan muncul saat digulir. |
| Menu mobile | Layar ≤ 900px | Tombol hamburger membuka/menutup menu; tertutup otomatis saat tautan dipilih, klik di luar menu, atau tombol Escape. |
| Hero section | Beranda | Judul, deskripsi, tombol "Jelajahi Informasi" (ke artikel) dan "Cek Kesehatan" (ke kalkulator IMT), ilustrasi SVG. |
| Kartu statistik | Bawah hero | Angka berjalan (count-up) saat terlihat. Diberi label **data ilustratif**, bukan data resmi. |
| Artikel + modal | Artikel Kesehatan | Tombol "Baca Selengkapnya" membuka modal `<dialog>` berisi artikel lengkap. Tutup lewat tombol ×, Escape, atau klik area gelap. |
| Checklist tips harian | Tips Sehat | Mencentang tips memperbarui jumlah, persentase, progress bar, dan pesan motivasi. Disimpan di `localStorage` dan otomatis dimulai ulang setiap hari. |
| Kalkulator IMT | Cek Kesehatan | IMT = berat ÷ (tinggi m)². Validasi: wajib diisi, berupa angka, berat 20–300 kg, tinggi 100–250 cm. Hasil: nilai, kategori (Kemenkes RI), penjelasan, dan penanda pada skala. |
| Edukasi pencegahan | Pencegahan | DBD (3M Plus), hipertensi, diabetes (CERDIK) dengan langkah pencegahan sehari-hari. |
| Tentang & disclaimer | Tentang Kami | Menegaskan proyek edukasi mahasiswa, bukan layanan diagnosis/konsultasi medis. |
| Tombol kembali ke atas | Kanan bawah | Muncul setelah digulir 600px, menggulir halus ke atas. |
| Animasi muncul | Seluruh halaman | Elemen `.reveal` muncul perlahan saat terlihat; dinonaktifkan bila pengguna memilih "kurangi animasi". |
| Tahun copyright | Footer | Diisi otomatis dengan tahun berjalan. |

## Klasifikasi IMT Dewasa (Kemenkes RI)

| IMT | Kategori |
|---|---|
| < 17,0 | Kurus (tingkat berat) |
| 17,0 – 18,4 | Kurus (tingkat ringan) |
| 18,5 – 25,0 | Normal |
| 25,1 – 27,0 | Gemuk (tingkat ringan) |
| > 27,0 | Gemuk (tingkat berat) |

IMT adalah alat skrining awal, bukan diagnosis. Tidak berlaku langsung untuk anak, remaja (memakai IMT menurut umur), ibu hamil, atlet, dan kondisi tertentu.

## Catatan Kualitas & Keamanan

- Tanpa backend, database, login, atau API berbayar.
- Isi artikel dirender dengan `textContent` (bukan `innerHTML`) → aman dari XSS.
- Tidak mengumpulkan data pribadi; hasil IMT tidak disimpan. Hanya status checklist yang disimpan di browser pengguna sendiri.
- Aksesibilitas: skip link, `aria-expanded`, `aria-live`, `role="progressbar"`, alt text, fokus keyboard terlihat, dukungan `prefers-reduced-motion`.
- Kontak di footer adalah data contoh (domain `.example`), tidak mengatasnamakan institusi kesehatan nyata.
- Rujukan konten: Kementerian Kesehatan RI (PHBS, 3M Plus, Isi Piringku, CERDIK, klasifikasi IMT) dan WHO Guidelines on Physical Activity (2020).
