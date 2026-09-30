# SyncNote (PRD)

## 1. Gambaran Umum Produk

SyncNote adalah aplikasi pencatatan kolaboratif waktu nyata (*real-time*) yang memungkinkan banyak pengguna untuk membuat, mengedit, dan berkolaborasi pada dokumen bersama secara simultan.

Produk ini berfokus pada sinkronisasi waktu nyata yang andal, indikator kehadiran kolaborator, dan penyuntingan dokumen yang aman dari konflik.

## 2. Pernyataan Masalah

Aplikasi catatan tradisional umumnya mengasumsikan bahwa sebuah dokumen hanya diedit oleh satu pengguna dalam satu waktu.

Aplikasi kolaboratif menimbulkan masalah tambahan:

- beberapa pengguna dapat memodifikasi dokumen yang sama secara bersamaan;
- klien harus tetap tersinkronisasi;
- pengguna memerlukan visibilitas terhadap kolaborator aktif lainnya;
- kegagalan jaringan sementara tidak boleh merusak status dokumen;
- operasi konkuren tidak boleh saling menimpa secara diam-diam.

SyncNote dirancang untuk mengeksplorasi dan menyelesaikan masalah-masalah ini sekaligus memberikan pengalaman menulis kolaboratif yang sederhana.

## 3. Tujuan

### Tujuan Produk

- Memungkinkan pengguna untuk membuat dan mengelola catatan.
- Memungkinkan catatan dibagikan dengan pengguna lain.
- Mendukung penyuntingan secara simultan.
- Menampilkan kolaborator yang sedang aktif.
- Mensinkronkan perubahan dokumen secara waktu nyata.
- Menyimpan status dokumen secara andal.
- Pulih dengan baik dari gangguan koneksi sementara.

### Tujuan Teknik

- Merancang arsitektur ujung depan (*frontend*) dan ujung belakang (*backend*) yang mudah dipelihara.
- Mengimplementasikan komunikasi dua arah secara waktu nyata.
- Menangani koneksi WebSocket konkuren dengan aman.
- Memisahkan status persisten dari status kehadiran sementara (*transient*).
- Menentukan protokol komunikasi waktu nyata yang eksplisit.
- Mencegah kehilangan data secara diam-diam selama penyuntingan konkuren.
- Merancang sistem agar penskalaan horizontal (*horizontal scaling*) dapat diterapkan di kemudian hari.

## 4. Bukan Tujuan — Versi Awal

Versi awal tidak akan mencoba menyediakan:

- Kesetaraan fitur dengan Google Docs;
- Pemformatan dokumen yang kompleks;
- Lembar kerja (*spreadsheets*) atau presentasi;
- Kolaborasi video/audio;
- Fitur penulisan berbasis AI;
- Enkripsi ujung-ke-ujung (*end-to-end encryption*);
- Aplikasi seluler natif.

## 5. Target Pengguna

Pengguna utama:

- pelajar/mahasiswa;
- pengembang perangkat lunak (*developers*);
- tim kecil;
- pengguna yang membutuhkan catatan kolaboratif yang ringan.

## 6. Cerita Pengguna Utama (*Core User Stories*)

Sebagai seorang pengguna, saya dapat:

- mendaftar dan masuk (*sign in*);
- membuat dokumen;
- mengubah nama dokumen;
- mengedit isinya;
- menghapus dokumen;
- melihat dokumen yang dapat saya akses;
- membagikan dokumen kepada pengguna lain;
- membuka dokumen yang dibagikan;
- mengedit secara bersamaan dengan kolaborator;
- melihat siapa saja yang sedang online;
- melihat posisi kursor kolaborator;
- menyambungkan kembali koneksi tanpa kehilangan status dokumen secara tidak terduga.

## 7. Persyaratan Fungsional

### Autentikasi

FR-01 Pengguna dapat mendaftar.
FR-02 Pengguna dapat masuk (*sign in*).
FR-03 Pengguna dapat keluar (*sign out*).
FR-04 Sumber daya yang dilindungi memerlukan autentikasi.

### Dokumen

FR-05 Pengguna dapat membuat dokumen.
FR-06 Pengguna dapat mengambil daftar dokumen yang dapat diakses.
FR-07 Pengguna dapat mengambil satu dokumen tertentu.
FR-08 Pengguna dapat mengubah nama dokumen milik sendiri.
FR-09 Pengguna dapat menghapus dokumen milik sendiri.
FR-10 Perubahan dokumen disimpan secara permanen (*persisted*).

### Kolaborasi

FR-11 Pemilik dokumen dapat membagikan dokumen.
FR-12 Kolaborator yang berwenang dapat membuka dokumen yang dibagikan.
FR-13 Beberapa pengguna dapat mengedit dokumen secara bersamaan.
FR-14 Perubahan tersebar tanpa perlu penyegaran manual (*refresh*).
FR-15 Pengguna dapat melihat kolaborator yang aktif.
FR-16 Informasi kursor pengguna lain dapat ditampilkan.

### Keandalan

FR-17 Klien mendeteksi jika koneksi terputus.
FR-18 Klien mencoba melakukan penyambungan kembali (*reconnection*).
FR-19 Server memvalidasi pesan waktu nyata yang masuk.
FR-20 Modifikasi konkuren tidak boleh menimpa perubahan yang sah secara diam-diam.

## 8. Persyaratan Non-Fungsional

### Kinerja

Pembaruan kolaboratif normal harus terasa mendekati waktu nyata (*near-real-time*).

### Keandalan

Kegagalan koneksi sementara tidak boleh merusak status dokumen yang tersimpan.

### Keamanan

Pengguna hanya boleh mengakses dokumen yang memiliki izin akses bagi mereka.

### Kemudahan Pemeliharaan

Logika bisnis, penyimpanan persisten, transport HTTP, dan transport waktu nyata harus tetap terpisah.

### Skalabilitas

Arsitektur harus memungkinkan beberapa instans *backend* untuk berkomunikasi melalui lapisan perpesanan bersama (*shared messaging layer*) pada versi mendatang.

## 9. Kriteria Keberhasilan

MVP dianggap berhasil apabila:

1. Dua pengguna yang telah terautentikasi dapat membuka dokumen yang sama.
2. Kedua pengguna dapat mengedit dokumen tersebut secara bersamaan.
3. Perubahan muncul pada kedua klien tanpa perlu memuat ulang (*refresh*).
4. Informasi kehadiran (*presence*) tersinkronisasi.
5. Penyambungan kembali berhasil dilakukan setelah gangguan jaringan sementara.
6. Dokumen akhir tetap konsisten.
7. Pengguna yang tidak berwenang tidak dapat mengakses dokumen privat.