# AutoSort · Flask IoT (Mushroom Sorter)

Dashboard dan REST API berbasis **Flask 3.1.2** untuk sistem **penyortiran jamur merang** (Grade A/B/C), dengan fitur:
- Upload untuk prediksi (TensorFlow **H5** atau **TFLite**)
- Live **MJPEG** kamera (USB / RTSP / HTTP stream / file video)
- Statistik jumlah tersortir, riwayat terbaru
- Manajemen & verifikasi **API Key**
- UI responsif (Tailwind **via CDN**)

> Catatan: Untuk pengembangan cepat UI, proyek ini menggunakan **Tailwind Play CDN** sehingga tidak perlu proses build CSS.

---

## Isi
- [Teknologi](#teknologi)
- [Prasyarat](#prasyarat)
- [Struktur Proyek](#struktur-proyek)
- [Konfigurasi `.env`](#konfigurasi-env)
- [Instalasi](#instalasi)
  - [Windows (host, webcam laptop)](#windows-host-webcam-laptop)
  - [WSL/Linux](#wsllinux)
  - [Raspberry-Pi](#raspberry-pi)
- [Inisialisasi Database](#inisialisasi-database)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Pengujian via Postman](#pengujian-via-postman)
- [Endpoint API](#endpoint-api)
- [Kamera: Tips & Troubleshooting](#kamera-tips--troubleshooting)
- [Model ML (Opsional)](#model-ml-opsional)
- [Troubleshooting Umum](#troubleshooting-umum)
- [Lisensi](#lisensi)

---

## Teknologi
- **Python** 3.11/3.12
- **Flask** 3.1.2, **Flask-SQLAlchemy**, **Flask-Migrate** (Alembic)
- **OpenCV** untuk kamera/gambar
- **Passlib (PBKDF2-SHA256)** untuk hash API key
- **TailwindCSS** via CDN (tanpa build)
- DB: **SQLite** (default) atau **MySQL/MariaDB**

---

## Prasyarat
- Python 3.11/3.12
- (Opsional) MySQL/MariaDB jika tidak ingin SQLite
- (Opsional) Git

---

## Struktur Proyek

```
autosort/
├─ server.py                 # entry point
├─ requirements.txt
├─ .env                      # konfigurasi lingkungan
├─ app/
│  ├─ __init__.py            # create_app(), registrasi blueprint
│  ├─ config.py              # Config (env, DB, kamera, model)
│  ├─ extensions.py          # db, migrate
│  ├─ models.py              # MushroomRecord, SystemStatus, ApiKey
│  ├─ ml.py                  # loader & inferensi H5/TFLite
│  ├─ camera.py              # VideoCapture & MJPEG generator
│  ├─ routes/
│  │  ├─ api.py              # /api/...
│  │  ├─ dashboard.py        # halaman dashboard
│  │  └─ stream.py           # /video_feed
│  ├─ templates/
│  │  ├─ base.html           # Tailwind CDN + tema soft-brown
│  │  └─ dashboard.html
│  └─ static/
│     ├─ css/                # (kosong, karena pakai CDN)
│     └─ captures/           # hasil simpan gambar prediksi
└─ migrations/               # (dibuat saat flask db init)
```

---

## Konfigurasi `.env`

Buat file `.env` di root proyek seperti berikut (ubah sesuai kebutuhan):

```env
FLASK_ENV=development
SECRET_KEY=super-secret-change-me

# --- Model (pilih salah satu) ---
MODEL_TYPE=h5
MODEL_PATH=./model/mushroom.h5
# MODEL_TYPE=tflite
# MODEL_PATH=./model/mushroom.tflite

# --- Kamera ---
# Windows / Linux bare-metal: gunakan index 0
CAMERA_INDEX=0
FRAME_WIDTH=640
FRAME_HEIGHT=480
# Jika di WSL/Server/IP Cam: gunakan SOURCE (override INDEX)
# CAMERA_SOURCE=rtsp://user:pass@IP:554/stream1
# CAMERA_SOURCE=http://IP_ESP32:81/stream
# CAMERA_SOURCE=/path/ke/video.mp4

# --- Database ---
DATABASE_URL=sqlite:///data.db
# DATABASE_URL=mysql+pymysql://root:password@127.0.0.1:3306/autosort?charset=utf8mb4

# --- Info perangkat ---
DEVICE_NAME=Raspberry Pi 3B
DEVICE_LOCATION=Politeknik Negeri Jember
```

> **WSL** tidak mengekspos webcam Windows sebagai `/dev/video0`. Gunakan `CAMERA_SOURCE` (RTSP/HTTP/file), atau jalankan server di Windows host untuk uji webcam laptop.

---

## Instalasi

### Windows (host, webcam laptop)
```powershell
# di PowerShell pada folder proyek
py -m venv .venv
.\.venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

### WSL/Linux
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Raspberry Pi
```bash
sudo apt update
sudo apt install -y python3-venv libatlas-base-dev
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

> **Headless server**: boleh ganti `opencv-python` → `opencv-python-headless` di `requirements.txt`.

---

## Inisialisasi Database
```bash
export FLASK_APP=server.py        # Windows: set FLASK_APP=server.py
flask db init                     # hanya pertama kali
flask db migrate -m "init"
flask db upgrade
```

**MySQL** (opsional): buat DB sebelum migrate:
```bash
mysql -u root -p -e "CREATE DATABASE autosort CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## Menjalankan Aplikasi
```bash
python server.py
# akses: http://127.0.0.1:5000
# stream kamera: http://127.0.0.1:5000/video_feed
```
> Jika halaman terus reload karena auto-reloader, jalankan non-reloader:
> - Edit `server.py`: `app.run(..., debug=False, use_reloader=False)`

---

## Pengujian via Postman

1) **Generate API Key**  
   - `POST /api/keys`  
   - Body (JSON): `{"name": "Laptop"}`  
   - Simpan `api_key` dari respons (ditampilkan **sekali**).

2) **Pakai API Key** untuk endpoint terlindung:  
   - Header: `X-API-Key: <api_key>`

3) **Kirim gambar untuk prediksi**  
   - `POST /api/predict`  
   - Header: `X-API-Key: <api_key>`  
   - Body: **form-data** → key `file` (type **File**)

**Contoh cURL:**
```bash
# generate key
curl -s -X POST http://127.0.0.1:5000/api/keys \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop"}'

# stats
curl -s http://127.0.0.1:5000/api/stats -H "X-API-Key: <API_KEY>"

# device
curl -s http://127.0.0.1:5000/api/device -H "X-API-Key: <API_KEY>"

# predict
curl -X POST "http://127.0.0.1:5000/api/predict" \
  -H "X-API-Key: <API_KEY>" \
  -F "file=@/path/ke/sample.jpg"
```

**Koleksi Postman (ringkas, variabel `baseUrl` & `apiKey`):**
```json
{
  "info": {
    "name": "AutoSort Flask IoT",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "[PUBLIC] Generate API Key",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "url": { "raw": "{{baseUrl}}/api/keys", "host": ["{{baseUrl}}"], "path": ["api","keys"] },
        "body": { "mode": "raw", "raw": "{\n  \"name\": \"Laptop\"\n}" }
      }
    },
    {
      "name": "[PROTECTED] Stats",
      "request": {
        "method": "GET",
        "header": [{ "key": "X-API-Key", "value": "{{apiKey}}" }],
        "url": { "raw": "{{baseUrl}}/api/stats", "host": ["{{baseUrl}}"], "path": ["api","stats"] }
      }
    },
    {
      "name": "[PROTECTED] Device Status",
      "request": {
        "method": "GET",
        "header": [{ "key": "X-API-Key", "value": "{{apiKey}}" }],
        "url": { "raw": "{{baseUrl}}/api/device", "host": ["{{baseUrl}}"], "path": ["api","device"] }
      }
    },
    {
      "name": "[PROTECTED] Predict (upload image)",
      "request": {
        "method": "POST",
        "header": [{ "key": "X-API-Key", "value": "{{apiKey}}" }],
        "body": { "mode": "formdata", "formdata": [{ "key": "file", "type": "file", "src": ["/absolute/path/ke/sample.jpg"] }] },
        "url": { "raw": "{{baseUrl}}/api/predict", "host": ["{{baseUrl}}"], "path": ["api","predict"] }
      }
    }
  ],
  "variable": [
    { "key": "baseUrl", "value": "http://127.0.0.1:5000" },
    { "key": "apiKey", "value": "" }
  ]
}
```

---

## Endpoint API

| Method | Endpoint        | Autentikasi   | Deskripsi                                   |
|-------:|-----------------|---------------|---------------------------------------------|
|  POST  | `/api/keys`     | ❌            | Generate API key baru                       |
|   GET  | `/api/keys`     | ❌            | Daftar kunci (tanpa raw key)                |
|   GET  | `/api/stats`    | ✅ X-API-Key  | Statistik total & 10 terbaru                 |
|   GET  | `/api/device`   | ✅ X-API-Key  | Info perangkat & status singkat             |
|  POST  | `/api/predict`  | ✅ X-API-Key  | Upload gambar → prediksi Grade A/B/C        |
|   GET  | `/video_feed`   | ❌ (browser)  | Stream MJPEG kamera                          |

> Catatan: Endpoint `predict` menyimpan salinan gambar ke `app/static/captures/` dan menambah record ke DB.

---

## Kamera: Tips & Troubleshooting
- **Windows (host)**: gunakan `CAMERA_INDEX=0` → `http://127.0.0.1:5000/video_feed`
- **WSL**: gunakan `CAMERA_SOURCE` (RTSP/HTTP/file) atau jalankan server di Windows host
- **Raspberry Pi**: USB cam seringnya index `0`. Kecilkan resolusi jika berat (640×480).

Cek cepat (Python REPL):
```python
import cv2
cap=cv2.VideoCapture(0); print("opened?", cap.isOpened())
ret,frame=cap.read(); print("read?", ret)
cap.release()
```

---

## Model ML (Opsional)

**TensorFlow (H5) – disarankan Python 3.11**
```bash
pip install "tensorflow==2.16.1"
# .env:
# MODEL_TYPE=h5
# MODEL_PATH=./model/mushroom.h5
```

**TFLite (Raspberry Pi/ARM)**
```bash
pip install --extra-index-url https://google-coral.github.io/py-repo/ tflite-runtime==2.14.0
# .env:
# MODEL_TYPE=tflite
# MODEL_PATH=./model/mushroom.tflite
```

---

## Troubleshooting Umum
- **Halaman reload terus**: matikan reloader → `app.run(debug=False, use_reloader=False)`
- **`Unknown database '...'`**: buat DB (MySQL) atau pakai SQLite default
- **`bcrypt` error**: pastikan `models.ApiKey` gunakan **PBKDF2-SHA256** (bukan bcrypt)
- **Kamera WSL tidak muncul**: normal; gunakan `CAMERA_SOURCE` atau jalankan di Windows host
- **UI tidak berwarna**: kita pakai **Tailwind CDN**; pastikan `<script src="https://cdn.tailwindcss.com"></script>` ada di `base.html`

---

## Lisensi
Hak Cipta © 2025 · AutoSort Flask IoT. Gunakan untuk kebutuhan riset/edukasi/prototipe. Produksi: tambahkan WSGI server (Gunicorn/Uvicorn+ASGI wrapper), reverse proxy (Nginx), dan hardening keamanan (rate limit, CORS, dsb.).
