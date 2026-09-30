# Arsitektur Sistem — SyncNote

## 1. Gambaran Umum Arsitektur

SyncNote menggunakan arsitektur klien-server dengan saluran komunikasi HTTP dan waktu nyata (*real-time*) yang terpisah.

Tumpukan teknologi (*technology stack*):

Ujung Depan (*Frontend*):
- Next.js
- React
- TypeScript

Ujung Belakang (*Backend*):
- Go

Penyimpanan Persisten (*Persistence*):
- PostgreSQL

Status Sementara / Terdistribusi (*Transient / Distributed State*):
- Redis

Komunikasi:
- REST API
- WebSocket

## 2. Arsitektur Tingkat Tinggi

                     ┌─────────────────────────┐
                     │       Next.js App       │
                     │                         │
                     │ React UI                │
                     │ Editor                  │
                     │ Client State            │
                     └───────────┬─────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                  HTTPS                     WebSocket
                    │                         │
                    ▼                         ▼
             ┌──────────────────────────────────┐
             │             Go API               │
             │                                  │
             │ HTTP Handlers                    │
             │ Authentication                   │
             │ Document Service                 │
             │ Collaboration Service            │
             │ WebSocket Hub                    │
             └───────────┬───────────┬──────────┘
                         │           │
                         ▼           ▼
                    PostgreSQL      Redis
                    Persistent      Presence
                    State           Pub/Sub

## 3. Tanggung Jawab Komunikasi

REST digunakan untuk operasi permintaan-tanggapan (*request-response*) seperti:

- autentikasi;
- pembuatan dokumen;
- pengambilan dokumen;
- penghapusan dokumen;
- pembagian dokumen (*sharing*);
- pembaruan metadata.

WebSocket digunakan untuk peristiwa yang bersifat sementara dan waktu nyata (*ephemeral and real-time*):

- operasi dokumen;
- kehadiran (*presence*);
- posisi kursor;
- peristiwa bergabung/keluar (*join/leave events*);
- peristiwa sinkronisasi.

## 4. Tanggung Jawab Ujung Depan (Frontend)

Ujung depan bertanggung jawab untuk:

- merender antarmuka pengguna (UI) aplikasi;
- mengelola status editor lokal;
- pembaruan UI secara optimis (*optimistic UI updates*);
- menetapkan koneksi WebSocket;
- mengirim operasi lokal;
- menerapkan operasi jarak jauh (*remote operations*);
- menampilkan status koneksi;
- menampilkan kehadiran kolaborator;
- menangani penyambungan kembali (*reconnection*).

Ujung depan tidak boleh dianggap sebagai sumber otoritatif untuk status dokumen yang persisten.

## 5. Tanggung Jawab Ujung Belakang (Backend)

Backend Go bertanggung jawab untuk:

- autentikasi;
- otorisasi;
- aturan akses dokumen;
- siklus hidup WebSocket;
- manajemen ruang (*room management*);
- validasi operasi;
- menyiarkan peristiwa waktu nyata (*broadcasting*);
- koordinasi penyimpanan persisten;
- sinkronisasi.

## 6. Tanggung Jawab PostgreSQL

PostgreSQL menyimpan status aplikasi yang tahan lama (*durable*):

- pengguna;
- dokumen;
- izin dokumen;
- rekam jepret dokumen (*document snapshots*);
- versi dokumen jika diperlukan.

PostgreSQL adalah sumber kebenaran yang tahan lama (*durable source of truth*).

## 7. Tanggung Jawab Redis

Redis tidak boleh diperlakukan sebagai basis data dokumen utama pada tahap awal.

Redis ditujukan untuk:

- kehadiran sementara (*ephemeral presence*);
- koordinasi WebSocket terdistribusi;
- Pub/Sub;
- status kolaborasi berumur pendek (*short-lived*);
- penelusuran singgah (*caching*) opsional.

Implementasi pertama dapat beroperasi tanpa Redis hingga koordinasi horizontal diperlukan.

## 8. Hub WebSocket

Setiap dokumen bertindak sebagai ruang kolaborasi logis.

Contoh:

document:550e8400
    ├── client A
    ├── client B
    └── client C

Hub WebSocket memelihara koneksi aktif dan menyiarkan peristiwa ke klien resmi yang terhubung ke dokumen yang sama.

## 9. Direktori Paket Backend

cmd/
  server/

internal/
  auth/
  document/
  collaboration/
  websocket/
  repository/
  platform/

Dependensi umumnya harus mengalir dari atas ke bawah:

transport
    ↓
service/domain
    ↓
repository
    ↓
infrastructure

Penanganan HTTP dan WebSocket tidak boleh mengandung logika persisten atau logika domain secara langsung.

## 10. Struktur Ujung Depan (Frontend)

src/
├── app/
├── components/
│   ├── ui/
│   └── layout/
├── features/
│   ├── auth/
│   ├── documents/
│   └── collaboration/
├── hooks/
├── lib/
├── services/
├── stores/
└── types/

Logika khusus fitur harus tetap berada di dalam foldernya masing-masing jika memungkinkan.

Komponen visual generik diletakkan di `components/ui`.

## 11. Kategori Status

Aplikasi membedakan tiga kategori status yang penting.

Status persisten server:
- metadata dokumen;
- izin akses;
- status dokumen yang disimpan.

Status klien:
- seleksi editor;
- status UI;
- operasi optimis yang tertunda.

Status terdistribusi sementara (*ephemeral*):
- pengguna yang terhubung;
- posisi kursor;
- informasi kolaborasi sementara.

Status-status ini tidak boleh dicampuradukkan secara sembarangan.