# Flow AI Landing Page

Simple landing page with email registration form for Flow AI.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Email Service

Edit `src/main.js` and configure email service (Formspree/Mailchimp/EmailJS).

**Easiest: Use Formspree (free)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the Form ID
4. Update in `src/main.js`:
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
# Build for production
pnpm run build

# Deploy to GitHub Pages (manual deploy)
pnpm run deploy
```

## 📚 Complete Documentation

See [SETUP.md](./SETUP.md) for complete guide:
- Setup email service (Formspree, Mailchimp, EmailJS)
- Deploy to GitHub Pages
- Setup custom domain (flowai.xyz)
- Free hosting alternatives

## 🎨 Features

- ✅ Simple registration form (Name & Email)
- ✅ Integration with Formspree/Mailchimp/EmailJS
- ✅ Modern design with Tailwind CSS
- ✅ Mobile responsive
- ✅ Automatic deploy to GitHub Pages
- ✅ Custom domain support

## 📝 Tech Stack

- HTML/CSS/JavaScript
- Tailwind CSS
- Webpack
- Formspree/Mailchimp/EmailJS

## 📄 License

MIT
