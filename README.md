# Flow AI Landing Page

Landing page modern dan responsif untuk Flow AI yang dibangun dengan **Webpack** dan **Tailwind CSS**, siap di-deploy ke GitHub Pages.

## Tentang

Landing page ini dibuat berdasarkan konten dari [flowai.xyz](https://flowai.xyz/) dengan fokus pada:
- AI Agent Platform untuk Web2 dan Web3
- Fitur utama: Build Agents, Integration Ecosystem, dan Insights Collection
- Segmen untuk Protocols dan Enterprise
- Pricing plans yang fleksibel

## Tech Stack

- ⚡ **Webpack 5** - Module bundler
- 🎨 **Tailwind CSS 3** - Utility-first CSS framework
- 📦 **PostCSS** - CSS processing
- 🔧 **Babel** - JavaScript transpiler
- 🚀 **Webpack Dev Server** - Development server dengan hot reload

## Fitur

- ✅ Desain modern dengan Tailwind CSS
- ✅ Responsif di semua perangkat
- ✅ Hot Module Replacement (HMR) untuk development
- ✅ Optimized production build
- ✅ Mobile-friendly dengan navigation menu
- ✅ Smooth scrolling dan animasi
- ✅ SEO-friendly structure

## Struktur Project

```
.
├── src/
│   ├── index.html      # Template HTML
│   ├── index.js        # Entry point JavaScript
│   ├── index.css       # Tailwind CSS directives
│   └── main.js         # JavaScript utama
├── dist/               # Build output (generated)
├── package.json        # Dependencies dan scripts
├── webpack.config.js   # Webpack configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── .babelrc           # Babel configuration
└── README.md          # Dokumentasi
```

## Setup & Installation

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (recommended) atau npm

### Install pnpm (Recommended)

```bash
# Menggunakan npm
npm install -g pnpm

# Atau menggunakan corepack (built-in Node.js)
corepack enable
corepack prepare pnpm@latest --activate
```

### 1. Install Dependencies

**Menggunakan pnpm (Recommended):**
```bash
pnpm install
```

**Atau menggunakan npm:**
```bash
npm install
```

### 2. Development Mode

Jalankan development server dengan hot reload:

**Menggunakan pnpm:**
```bash
pnpm dev
```

**Atau menggunakan npm:**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000` dan otomatis terbuka di browser.

### 3. Build untuk Production

Generate optimized build untuk production:

**Menggunakan pnpm:**
```bash
pnpm build
```

**Atau menggunakan npm:**
```bash
npm run build
```

File hasil build akan ada di folder `dist/`.

### 4. Build Development (tanpa minify)

**Menggunakan pnpm:**
```bash
pnpm build:dev
```

**Atau menggunakan npm:**
```bash
npm run build:dev
```

## Deploy ke GitHub Pages

### Opsi 1: Deploy dari folder `dist/`

1. Build project:
   ```bash
   # Menggunakan pnpm
   pnpm build
   
   # Atau menggunakan npm
   npm run build
   ```

2. Copy isi folder `dist/` ke root repository atau branch `gh-pages`

3. Atau gunakan GitHub Actions untuk auto-deploy

### Opsi 2: Setup GitHub Actions (Recommended)

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build
        run: pnpm build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Opsi 3: Manual Deploy

1. Build project:
   ```bash
   # Menggunakan pnpm
   pnpm build
   
   # Atau menggunakan npm
   npm run build
   ```

2. Inisialisasi Git (jika belum):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. Aktifkan GitHub Pages:
   - Buka repository di GitHub
   - Settings > Pages
   - Source: pilih branch `gh-pages` atau folder `dist/`
   - Save

## Kustomisasi

### Mengubah Warna & Theme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#6366f1',
        dark: '#4f46e5',
      },
      secondary: {
        DEFAULT: '#8b5cf6',
      },
    },
  },
}
```

### Menambah Custom CSS

Edit `src/index.css` dan tambahkan di `@layer components` atau `@layer utilities`:

```css
@layer components {
  .custom-class {
    @apply ...;
  }
}
```

### Mengubah Konten

Edit konten langsung di `src/index.html` sesuai kebutuhan.

## Scripts Available

**Menggunakan pnpm:**
- `pnpm dev` - Jalankan development server
- `pnpm build` - Build untuk production (optimized)
- `pnpm build:dev` - Build development (tanpa minify)

**Menggunakan npm:**
- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production (optimized)
- `npm run build:dev` - Build development (tanpa minify)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ✅ Code splitting dengan Webpack
- ✅ CSS purging dengan Tailwind
- ✅ Minified JavaScript & CSS di production
- ✅ Optimized assets
- ✅ Fast loading time

## Development Tips

1. **Hot Reload**: Perubahan di file akan otomatis reload di browser
2. **Tailwind IntelliSense**: Install extension di VS Code untuk autocomplete
3. **Debugging**: Gunakan browser DevTools untuk debugging
4. **Build Size**: Check size bundle di `dist/` setelah build

## Troubleshooting

### Port sudah digunakan
Jika port 3000 sudah digunakan, edit `webpack.config.js`:
```javascript
devServer: {
  port: 3001, // atau port lain
}
```

### Build error
Pastikan semua dependencies terinstall:

**Menggunakan pnpm:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Menggunakan npm:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

© 2024 Flow AI. All rights reserved.

## Credits

Desain berdasarkan [flowai.xyz](https://flowai.xyz/)
