# Flow AI Landing Page

Landing page sederhana dengan form registrasi email untuk Flow AI.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Email Service

Edit file `src/main.js` dan konfigurasi email service (Formspree/Mailchimp/EmailJS).

**Paling mudah: Gunakan Formspree (gratis)**
1. Daftar di [formspree.io](https://formspree.io)
2. Buat form baru
3. Copy Form ID
4. Update di `src/main.js`:
   ```javascript
   formspree: {
       enabled: true,
       formId: 'your-form-id-here',
   }
   ```

### 3. Development

```bash
pnpm run dev
```

### 4. Build & Deploy

```bash
# Build untuk production
pnpm run build

# Deploy ke GitHub Pages (otomatis via GitHub Actions)
git push origin main
```

## 📚 Dokumentasi Lengkap

Lihat [SETUP.md](./SETUP.md) untuk panduan lengkap:
- Setup email service (Formspree, Mailchimp, EmailJS)
- Deploy ke GitHub Pages
- Setup custom domain (flowai.xyz)
- Alternatif hosting gratis

## 🎨 Fitur

- ✅ Form registrasi sederhana (Nama & Email)
- ✅ Integrasi dengan Formspree/Mailchimp/EmailJS
- ✅ Desain modern dengan Tailwind CSS
- ✅ Mobile responsive
- ✅ Deploy otomatis ke GitHub Pages
- ✅ Support custom domain

## 📝 Tech Stack

- HTML/CSS/JavaScript
- Tailwind CSS
- Webpack
- Formspree/Mailchimp/EmailJS

## 📄 License

MIT
