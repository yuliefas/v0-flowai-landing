# Setup Landing Page Flow AI

Panduan lengkap untuk setup landing page Flow AI dengan form registrasi email.

## 📋 Daftar Isi

1. [Setup Email Service](#setup-email-service)
2. [Konfigurasi Form](#konfigurasi-form)
3. [Deploy ke GitHub Pages](#deploy-ke-github-pages)
4. [Setup Custom Domain (flowai.xyz)](#setup-custom-domain-flowaixyz)
5. [Alternatif Hosting Gratis](#alternatif-hosting-gratis)

---

## 📧 Setup Email Service

Landing page ini mendukung 3 opsi untuk menyimpan email registrasi:

### Opsi 1: Formspree (Recommended - Paling Mudah & Gratis)

**Formspree** adalah solusi gratis yang paling mudah untuk form submission.

1. Kunjungi [https://formspree.io](https://formspree.io)
2. Buat akun gratis (gratis hingga 50 submission/bulan)
3. Buat form baru
4. Copy **Form ID** yang diberikan (format: `xxxxxxxxxx`)
5. Buka file `src/main.js`
6. Update konfigurasi:

```javascript
formspree: {
    enabled: true,
    formId: 'xxxxxxxxxx', // Ganti dengan Form ID Anda
},
mailchimp: {
    enabled: false,
},
emailjs: {
    enabled: false,
}
```

7. Formspree akan mengirimkan email ke alamat email yang Anda daftarkan di Formspree

### Opsi 2: Mailchimp (Untuk Email Marketing)

**Mailchimp** cocok jika Anda ingin mengelola email list untuk marketing.

1. Kunjungi [https://mailchimp.com](https://mailchimp.com)
2. Buat akun gratis (gratis hingga 2,000 kontak)
3. Buat **Audience/List** baru
4. Dapatkan **API Key**:
   - Buka Account → Extras → API keys
   - Buat API key baru
5. Dapatkan **List ID**:
   - Buka Audience → Settings → Audience name and defaults
   - Copy **Audience ID** (ini adalah List ID)
6. Dapatkan **Server Prefix**:
   - Lihat di akhir API key Anda (contoh: `us1`, `us2`, dll)
7. Buka file `src/main.js`
8. Update konfigurasi:

```javascript
mailchimp: {
    enabled: true,
    apiKey: 'your-api-key-here',
    listId: 'your-list-id-here',
    serverPrefix: 'us1', // Ganti sesuai server prefix Anda
},
formspree: {
    enabled: false,
},
emailjs: {
    enabled: false,
}
```

### Opsi 3: EmailJS (Alternatif Gratis)

**EmailJS** memungkinkan mengirim email langsung dari frontend.

1. Kunjungi [https://www.emailjs.com](https://www.emailjs.com)
2. Buat akun gratis
3. Buat **Email Service** (Gmail, Outlook, dll)
4. Buat **Email Template**
5. Dapatkan **Service ID**, **Template ID**, dan **Public Key**
6. Buka file `src/main.js`
7. Update konfigurasi:

```javascript
emailjs: {
    enabled: true,
    serviceId: 'your-service-id',
    templateId: 'your-template-id',
    publicKey: 'your-public-key',
},
mailchimp: {
    enabled: false,
},
formspree: {
    enabled: false,
}
```

---

## ⚙️ Konfigurasi Form

Setelah memilih email service, edit file `src/main.js` dan update bagian `CONFIG` sesuai dengan service yang Anda pilih.

**Penting:** Hanya aktifkan **satu** service pada satu waktu (set `enabled: true` hanya untuk satu service).

---

## 🚀 Deploy ke GitHub Pages

### Metode 1: GitHub Actions (Otomatis - Recommended)

1. **Push code ke GitHub:**
   ```bash
   git add .
   git commit -m "Add landing page with registration form"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Buka repository di GitHub
   - Pergi ke **Settings** → **Pages**
   - Di bagian **Source**, pilih **GitHub Actions**
   - Workflow akan otomatis berjalan setiap kali push ke branch `main`

3. **Akses landing page:**
   - URL akan tersedia di: `https://username.github.io/flowai-landing/`
   - Atau jika menggunakan custom domain: `https://flowai.xyz`

### Metode 2: Manual Deploy

1. **Build project:**
   ```bash
   pnpm install
   pnpm run build
   ```

2. **Deploy folder `dist/` ke GitHub Pages:**
   - Install `gh-pages`: `pnpm add -D gh-pages`
   - Tambahkan script di `package.json`:
     ```json
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
     ```
   - Jalankan: `pnpm run deploy`

---

## 🌐 Setup Custom Domain (flowai.xyz)

### 1. Setup di GitHub Pages

1. Buka repository → **Settings** → **Pages**
2. Di bagian **Custom domain**, masukkan: `flowai.xyz`
3. Centang **Enforce HTTPS**

### 2. Setup DNS di Domain Provider

Tambahkan record berikut di DNS provider Anda (contoh: Cloudflare, Namecheap, dll):

#### Opsi A: Menggunakan A Records (Recommended)

```
Type: A
Name: @
Value: 185.199.108.153
TTL: Auto

Type: A
Name: @
Value: 185.199.109.153
TTL: Auto

Type: A
Name: @
Value: 185.199.110.153
TTL: Auto

Type: A
Name: @
Value: 185.199.111.153
TTL: Auto
```

#### Opsi B: Menggunakan CNAME

```
Type: CNAME
Name: @
Value: username.github.io
TTL: Auto
```

**Catatan:** Beberapa provider tidak mendukung CNAME untuk root domain (@). Gunakan Opsi A jika CNAME tidak tersedia.

### 3. Verifikasi

- Tunggu beberapa menit hingga DNS propagate (bisa 5 menit - 48 jam)
- Akses `https://flowai.xyz` untuk memverifikasi
- GitHub akan otomatis membuat file `CNAME` di repository

---

## 💰 Alternatif Hosting Gratis

Jika tidak ingin menggunakan GitHub Pages, berikut alternatif gratis lainnya:

### 1. **Vercel** (Recommended)
- Gratis, cepat, mudah
- Auto-deploy dari GitHub
- Custom domain gratis
- Setup: `vercel --prod`

### 2. **Netlify**
- Gratis, drag & drop deploy
- Custom domain gratis
- Setup: Drag folder `dist/` ke Netlify

### 3. **Cloudflare Pages**
- Gratis, unlimited bandwidth
- Custom domain gratis
- Setup: Connect GitHub repository

---

## 📝 Checklist Sebelum Launch

- [ ] Email service sudah dikonfigurasi (Formspree/Mailchimp/EmailJS)
- [ ] Form sudah ditest dan berfungsi
- [ ] Landing page sudah di-deploy
- [ ] Custom domain sudah diarahkan (jika menggunakan)
- [ ] HTTPS sudah aktif
- [ ] Mobile responsive sudah ditest

---

## 🛠️ Development

### Menjalankan di Local

```bash
# Install dependencies
pnpm install

# Development mode
pnpm run dev

# Build untuk production
pnpm run build
```

### Struktur File

```
flowai-landing/
├── src/
│   ├── index.html      # HTML landing page
│   ├── index.js        # Entry point
│   ├── main.js         # Form handler & konfigurasi
│   └── index.css       # Styling dengan Tailwind
├── dist/               # Build output (untuk deploy)
├── webpack.config.js   # Webpack configuration
└── package.json        # Dependencies
```

---

## 🆘 Troubleshooting

### Form tidak mengirim email
- Pastikan hanya **satu** email service yang `enabled: true`
- Check console browser untuk error
- Verifikasi API key/Form ID sudah benar

### GitHub Pages tidak update
- Pastikan GitHub Actions workflow berjalan
- Check tab **Actions** di GitHub repository
- Pastikan build berhasil tanpa error

### Custom domain tidak bekerja
- Tunggu DNS propagate (bisa sampai 48 jam)
- Verifikasi DNS records sudah benar
- Pastikan HTTPS sudah aktif di GitHub Pages

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository GitHub.

---

**Selamat! Landing page Flow AI siap digunakan! 🎉**
