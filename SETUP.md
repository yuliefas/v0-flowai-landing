# Setup Landing Page Flow AI

Complete guide for setting up Flow AI landing page with email registration form.

## 📋 Table of Contents

1. [Setup Email Service](#setup-email-service)
2. [Form Configuration](#form-configuration)
3. [Deploy to GitHub Pages](#deploy-to-github-pages)
4. [Setup Custom Domain (flowai.xyz)](#setup-custom-domain-flowaixyz)
5. [Free Hosting Alternatives](#free-hosting-alternatives)

---

## 📧 Setup Email Service

This landing page supports 3 options for storing registration emails:

### Option 1: Formspree (Recommended - Easiest & Free)

**Formspree** is the easiest free solution for form submission.

1. Visit [https://formspree.io](https://formspree.io)
2. Create a free account (free up to 50 submissions/month)
3. Create a new form
4. Copy the **Form ID** provided (format: `xxxxxxxxxx`)
5. Open `src/main.js`
6. Update configuration:

```javascript
formspree: {
    enabled: true,
    formId: 'xxxxxxxxxx', // Replace with your Form ID
},
mailchimp: {
    enabled: false,
},
emailjs: {
    enabled: false,
}
```

7. Formspree will send emails to the email address you registered in Formspree

### Option 2: Mailchimp (For Email Marketing)

**Mailchimp** is suitable if you want to manage email lists for marketing.

1. Visit [https://mailchimp.com](https://mailchimp.com)
2. Create a free account (free up to 2,000 contacts)
3. Create a new **Audience/List**
4. Get **API Key**:
   - Go to Account → Extras → API keys
   - Create a new API key
5. Get **List ID**:
   - Go to Audience → Settings → Audience name and defaults
   - Copy **Audience ID** (this is the List ID)
6. Get **Server Prefix**:
   - Check at the end of your API key (example: `us1`, `us2`, etc.)
7. Open `src/main.js`
8. Update configuration:

```javascript
mailchimp: {
    enabled: true,
    apiKey: 'your-api-key-here',
    listId: 'your-list-id-here',
    serverPrefix: 'us1', // Replace with your server prefix
},
formspree: {
    enabled: false,
},
emailjs: {
    enabled: false,
}
```

### Option 3: EmailJS (Free Alternative)

**EmailJS** allows sending emails directly from the frontend.

1. Visit [https://www.emailjs.com](https://www.emailjs.com)
2. Create a free account
3. Create **Email Service** (Gmail, Outlook, etc.)
4. Create **Email Template**
5. Get **Service ID**, **Template ID**, and **Public Key**
6. Open `src/main.js`
7. Update configuration:

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

## ⚙️ Form Configuration

After choosing an email service, edit `src/main.js` and update the `CONFIG` section according to the service you chose.

**Important:** Only enable **one** service at a time (set `enabled: true` for only one service).

---

## 🚀 Deploy to GitHub Pages

### Method 1: Manual Deploy (Recommended)

1. **Build project:**
   ```bash
   pnpm install
   pnpm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   pnpm run deploy
   ```
   This will automatically build and deploy to the `gh-pages` branch.

3. **Enable GitHub Pages:**
   - Open repository on GitHub
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select branch: `gh-pages` / folder: `/ (root)`
   - Click **Save**

4. **Access landing page:**
   - URL will be available at: `https://username.github.io/v0-flowai-landing/`
   - Or if using custom domain: `https://flowai.xyz`

### Method 2: GitHub Actions (Automatic)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add landing page with registration form"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Open repository on GitHub
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Workflow will automatically run every time you push to `main` branch

---

## 🌐 Setup Custom Domain (flowai.xyz)

### 1. Setup in GitHub Pages

1. Open repository → **Settings** → **Pages**
2. Under **Custom domain**, enter: `flowai.xyz`
3. Check **Enforce HTTPS**

### 2. Setup DNS at Domain Provider

Add the following records in your DNS provider (example: Cloudflare, Namecheap, etc.):

#### Option A: Using A Records (Recommended)

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

#### Option B: Using CNAME

```
Type: CNAME
Name: @
Value: username.github.io
TTL: Auto
```

**Note:** Some providers don't support CNAME for root domain (@). Use Option A if CNAME is not available.

### 3. Verify

- Wait a few minutes for DNS propagation (can take 5 minutes - 48 hours)
- Access `https://flowai.xyz` to verify
- GitHub will automatically create a `CNAME` file in the repository

---

## 💰 Free Hosting Alternatives

If you don't want to use GitHub Pages, here are other free alternatives:

### 1. **Vercel** (Recommended)
- Free, fast, easy
- Auto-deploy from GitHub
- Free custom domain
- Setup: `vercel --prod`

### 2. **Netlify**
- Free, drag & drop deploy
- Free custom domain
- Setup: Drag `dist/` folder to Netlify

### 3. **Cloudflare Pages**
- Free, unlimited bandwidth
- Free custom domain
- Setup: Connect GitHub repository

---

## 📝 Pre-Launch Checklist

- [ ] Email service is configured (Formspree/Mailchimp/EmailJS)
- [ ] Form is tested and working
- [ ] Landing page is deployed
- [ ] Custom domain is configured (if using)
- [ ] HTTPS is enabled
- [ ] Mobile responsive is tested

---

## 🛠️ Development

### Running Locally

```bash
# Install dependencies
pnpm install

# Development mode
pnpm run dev

# Build for production
pnpm run build
```

### File Structure

```
flowai-landing/
├── src/
│   ├── index.html      # HTML landing page
│   ├── index.js        # Entry point
│   ├── main.js         # Form handler & configuration
│   └── index.css       # Styling with Tailwind
├── dist/               # Build output (for deploy)
├── webpack.config.js   # Webpack configuration
└── package.json        # Dependencies
```

---

## 🆘 Troubleshooting

### Form not sending emails
- Make sure only **one** email service has `enabled: true`
- Check browser console for errors
- Verify API key/Form ID is correct

### GitHub Pages not updating
- Make sure GitHub Actions workflow is running
- Check **Actions** tab in GitHub repository
- Make sure build succeeds without errors

### Custom domain not working
- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records are correct
- Make sure HTTPS is enabled in GitHub Pages

---

## 📞 Support

If you have questions or issues, please create an issue in the GitHub repository.

---

**Congratulations! Flow AI landing page is ready to use! 🎉**
