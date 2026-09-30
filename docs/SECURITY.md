# Keamanan — SyncNote

## Autentikasi

Koneksi WebSocket harus diautentikasi.

Membuka koneksi WebSocket tidak serta-merta mengesahkan (*authorize*) akses ke sebuah dokumen.

## Otorisasi

Setiap koneksi dokumen harus diverifikasi keanggotaannya.

REST:
autentikasi -> otorisasi -> eksekusi

WebSocket:
koneksi -> autentikasi -> otorisasi dokumen -> bergabung ke ruang (*join room*)

## Validasi Masukan (*Input Validation*)

Jangan pernah mempercayai:

- ID dokumen;
- ID pengguna;
- *payload* operasi;
- posisi kursor;
- metadata yang dihasilkan oleh klien.

## Kata Sandi (*Passwords*)

Kata sandi tidak boleh disimpan secara langsung.

Gunakan algoritma *hashing* kata sandi yang sesuai seperti Argon2id atau bcrypt.

## Keamanan WebSocket

Terapkan:

- autentikasi;
- validasi asal (*origin validation*);
- batas ukuran pesan;
- validasi skema;
- pembatasan tingkat akses (*rate limiting*);
- batasan koneksi;
- otorisasi sebelum pendaftaran ruang.

## Pencatatan Log (*Logging*)

Jangan pernah mencatat:

- kata sandi;
- rahasia autentikasi;
- token sesi mentah.