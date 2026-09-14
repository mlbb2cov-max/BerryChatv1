# Berrychat - AI Companion (PWA & GitHub Pages Ready)

An intimate AI companion chat & roleplay web app featuring Telegram-style messaging, bilingual Myanmar (Burmese) & English localization, chapter management, multiple Gemini AI model support, KBZPay donation support, and offline-ready Progressive Web App (PWA) installation.

---

## 🌟 Key Features

1. **AI Model Selection**:
   - Gemini 3.5 Flash
   - Gemini 3.6 Flash Lite
   - Gemini 3.7 Flash *(Default)*
   - Gemini 2.5 Flash / Pro
   - Gemini 2.0 Flash / Flash-Lite

2. **Telegram-Style Chat Order**:
   - Reverse column layout with automatic pinned auto-scroll to the bottom, keeping the latest messages right above the input bar just like in Telegram.

3. **Chapter Management & Deletion**:
   - Create separate conversation chapters / arcs.
   - Delete individual chapters with confirmation dialog to keep your chat history tidy.

4. **Bilingual Support (မြန်မာ / English)**:
   - Complete UI localization in Burmese (မြန်မာဘာသာ) and English.
   - Real-time language switching anytime from the top bar or settings.

5. **Progressive Web App (PWA)**:
   - Installable on Android, iOS, Windows, macOS, and Linux as a standalone native-feeling app.
   - Offline service worker caching with offline status connectivity indicator.

6. **GitHub Pages Deployment Ready**:
   - Pre-configured `.github/workflows/deploy.yml` for automated static CI/CD.
   - Relative asset routing (`base: './'`) and `404.html` SPA routing fallback.
   - Universal dual-mode API bridge (`geminiChatService.ts`): works on Cloud Run custom servers and runs purely client-side on GitHub Pages using your personal Gemini API key.

---

## 🚀 How to Deploy to GitHub & GitHub Pages

### Step 1: Initialize and Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial commit with PWA and GitHub Pages deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Step 2: Enable GitHub Pages with GitHub Actions
1. On GitHub, navigate to your repository.
2. Go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select:
   👉 **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will automatically build the app and deploy it to:
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

### Step 3: Using the App on GitHub Pages
1. Open your GitHub Pages URL in your browser.
2. Click the **Install** button to install it as an app on your phone or computer.
3. Open **Settings** (⚙️) and enter your Gemini API key. All chats and chapters will be safely stored in your browser's local storage.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## မြန်မာဘာသာဖြင့် လမ်းညွှန်ချက်

### GitHub Pages တွင် အခမဲ့ တင်နည်း
1. GitHub တွင် Repository အသစ်တစ်ခု ပြုလုပ်ပြီး ဤဖိုင်များကို `git push` လုပ်ပါ။
2. Repository ၏ **Settings** > **Pages** သို့သွားပါ။
3. Source နေရာတွင် **GitHub Actions** ကို ရွေးချယ်ပေးပါ။
4. ခဏအကြာတွင် သင့် Pages Website link တက်လာမည်ဖြစ်ပြီး ဖုန်းနှင့် ကွန်ပျူတာတို့တွင် PWA App အဖြစ် Install ပြုလုပ်ကာ တိုက်ရိုက်အသုံးပြုနိုင်ပါသည်။
5. Settings (⚙️) ထဲတွင် မိမိ၏ Gemini API Key ထည့်သွင်းပြီး AI Model (3.5 Flash, 3.6 Flash Lite, 3.7 Flash စသည်) တို့ကို လွတ်လပ်စွာ ရွေးချယ်စကားပြောနိုင်ပါသည်။
