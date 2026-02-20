# BrilliantPrompts

A curated library of 200+ expert-crafted AI prompts for ChatGPT, Claude, and Gemini.

## Quick Start

1. Read `SETUP-GUIDE.md` for step-by-step instructions
2. Set up Lemon Squeezy (payment provider)
3. Edit `js/config.js` with your Lemon Squeezy credentials
4. Run `deploy.bat` to deploy to Netlify

## Tech Stack

- Pure HTML/CSS/JS — no build tools needed
- Hosted on Netlify (free tier)
- Payments via Lemon Squeezy (Merchant of Record)
- Domain: rsx.ch

## Structure

```
P01/
├── index.html          — Landing page
├── activate.html       — License key activation
├── about.html          — About page
├── faq.html            — FAQ
├── privacy.html        — Privacy policy
├── terms.html          — Terms of service
├── css/style.css       — Complete stylesheet
├── js/
│   ├── config.js       — Lemon Squeezy configuration
│   ├── auth.js         — License key validation
│   ├── app.js          — Core application logic
│   ├── prompts-free.js — 32 free prompts
│   └── prompts-premium.js — 168 premium prompts
├── prompts/            — Category pages (8)
├── blog/               — SEO articles (3)
├── deploy.bat          — One-click deployment
└── SETUP-GUIDE.md      — Setup instructions
```

## Adding New Prompts

Edit `js/prompts-premium.js` and add new prompt objects to the array.
Push to GitHub and Netlify will auto-deploy.
