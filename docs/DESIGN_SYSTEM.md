# Sistem Desain — SyncNote

## 1. Prinsip Desain

Antarmuka harus bersifat:

- minimalis;
- mengutamakan konten (*content-first*);
- tenang (*calm*);
- ramah papan ketik (*keyboard-friendly*);
- responsif;
- aksesibel.

Editor adalah permukaan produk utama.

Dekorasi antarmuka tidak boleh bersaing dengan konten dokumen.

## 2. Arah Visual

Gaya:
Aplikasi produktivitas modern.

Karakteristik:
- permukaan netral;
- penggunaan warna aksen yang terbatas;
- batas tepi yang halus (*subtle borders*);
- bayangan minimal;
- ruang kosong (*whitespace*) yang lapang;
- navigasi aplikasi yang ringkas.

## 3. Token Warna

Gunakan token semantik alih-alih warna komponen yang dikodekan secara keras (*hard-coded*).

--background
--foreground

--surface
--surface-muted

--border
--border-strong

--primary
--primary-foreground

--muted
--muted-foreground

--success
--warning
--danger

## 4. Tipografi

Font utama:
Inter atau Geist.

Hierarki:

Display (Tampilan Utama)
Page title (Judul Halaman)
Section title (Judul Bagian)
Body (Teks Utama)
Small (Kecil)
Caption (Keterangan)

Tipografi dokumen harus dibedakan secara visual dari krom aplikasi (*application chrome*).

## 5. Spasi

Gunakan skala spasi yang konsisten.

4
8
12
16
24
32
48
64

Hindari nilai spasi yang arbitrer kecuali disyaratkan oleh batasan tata letak.

## 6. Kelengkungan Sudut (Radius)

Kecil: 6px
Sedang: 8px
Besar: 12px

Hindari pembulatan yang berlebihan.

## 7. Komponen UI Inti

Komponen primitif:

Button
IconButton
Input
Textarea
Avatar
AvatarGroup
Tooltip
DropdownMenu
Dialog
Popover
Badge
Separator
Skeleton
Toast

Komponen aplikasi:

Sidebar
DocumentList
DocumentListItem
EditorHeader
CollaboratorList
PresenceAvatar
ConnectionIndicator
ShareDialog
Editor
RemoteCursor

## 8. Varian Tombol

Primary
Secondary
Ghost
Danger

Ukuran:

sm
md
lg

## 9. Tata Letak Aplikasi

Desktop:

┌───────────────┬────────────────────────────────────┐
│               │ Judul dokumen       Kolaborator    │
│    Sidebar    ├────────────────────────────────────┤
│               │                                    │
│   Dokumen     │               Editor               │
│               │                                    │
│               │                                    │
└───────────────┴────────────────────────────────────┘

Editor harus mendapatkan sebagian besar ruang layar yang tersedia.

## 10. Indikator Kolaborasi

Kolaborator harus direpresentasikan secara konsisten melalui:

- avatar;
- nama tampilan (*display name*);
- status kehadiran;
- warna kolaborasi yang ditetapkan.

Kursor jarak jauh (*remote cursors*) harus menampilkan:

kursor
+
label pengguna kecil

tanpa menghalangi konten dokumen secara permanen.

## 11. Status Koneksi

Aplikasi harus membedakan secara visual antara:

Connected (Terhubung)
Connecting (Menghubungkan)
Reconnecting (Menyambungkan Kembali)
Offline (Luar Jaringan)

Kegagalan jaringan tidak boleh tampak secara diam-diam sebagai sesi kolaborasi yang sehat.

## 12. Aksesibilitas

Kontrol interaktif harus:

- mendukung navigasi papan ketik;
- mengekspos label yang aksesibel;
- mempertahankan status fokus yang terlihat;
- mempertahankan kontras yang memadai;
- tidak mengandalkan warna secara eksklusif untuk mengomunikasikan status.