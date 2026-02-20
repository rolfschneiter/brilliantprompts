# BrilliantPrompts — Setup-Anleitung

Diese Anleitung führt dich Schritt für Schritt durch die Einrichtung.
Zeitaufwand: ca. 30 Minuten.

---

## Schritt 1: Lemon Squeezy Account erstellen (10 Min)

1. Gehe zu **https://www.lemonsqueezy.com** und erstelle einen Account
2. Klicke auf **"Create Store"** und nenne ihn z.B. "BrilliantPrompts"
3. Fülle die Angaben aus (Name, Adresse, etc.)
4. Lemon Squeezy ist dein **Merchant of Record** — sie kümmern sich um alle Steuern/VAT weltweit

## Schritt 2: Produkte anlegen (10 Min)

### Produkt 1: Monatliches Abo

1. Gehe zu **Products → Create Product**
2. Name: `BrilliantPrompts Pro — Monthly`
3. Pricing: **$7.00 / month** (Recurring, Monthly)
4. Unter **"License keys"**: Aktivieren, Unlimited Activations
5. Unter **"Confirmation"** → Redirect URL:
   ```
   https://rsx.ch/activate.html?license_key={license_key}
   ```
6. Speichern

### Produkt 2: Jährliches Abo

1. **Products → Create Product**
2. Name: `BrilliantPrompts Pro — Annual`
3. Pricing: **$49.00 / year** (Recurring, Yearly)
4. **License keys**: Aktivieren, Unlimited Activations
5. **Redirect URL**: gleich wie oben
   ```
   https://rsx.ch/activate.html?license_key={license_key}
   ```
6. Speichern

### Werte kopieren

Notiere dir folgende Werte (findest du im Lemon Squeezy Dashboard):

| Wert | Wo zu finden |
|------|-------------|
| **Store ID** | Settings → Store → Store ID |
| **Product ID Monthly** | Products → Monthly Abo → URL enthält die ID |
| **Product ID Annual** | Products → Annual Abo → URL enthält die ID |
| **Checkout URL Monthly** | Products → Monthly → Share → Checkout URL |
| **Checkout URL Annual** | Products → Annual → Share → Checkout URL |
| **Customer Portal URL** | Settings → Customer Portal → Portal URL |

## Schritt 3: Config-Datei anpassen (2 Min)

Öffne die Datei `js/config.js` in einem Texteditor (z.B. Notepad) und ersetze die Platzhalter:

```javascript
const CONFIG = {
    STORE_ID: 'DEINE_STORE_ID',
    PRODUCT_ID_MONTHLY: 'DEINE_MONTHLY_PRODUCT_ID',
    PRODUCT_ID_ANNUAL: 'DEINE_ANNUAL_PRODUCT_ID',
    CHECKOUT_URL_MONTHLY: 'https://DEIN-STORE.lemonsqueezy.com/checkout/buy/XXX',
    CHECKOUT_URL_ANNUAL: 'https://DEIN-STORE.lemonsqueezy.com/checkout/buy/YYY',
    CUSTOMER_PORTAL_URL: 'https://DEIN-STORE.lemonsqueezy.com/billing',
    // Rest bleibt unverändert
};
```

Speichern.

## Schritt 4: Deployment (5 Min)

### Option A: deploy.bat ausführen (empfohlen)

1. Doppelklicke auf `deploy.bat`
2. Erstelle ein GitHub Repository wenn gefragt (https://github.com/new)
3. Füge die Repository-URL ein
4. Das Skript pushed den Code automatisch

### Option B: Netlify Drag & Drop

1. Gehe zu **https://app.netlify.com/drop**
2. Ziehe den gesamten `P01` Ordner auf die Seite
3. Fertig — die Seite ist sofort live!

### Netlify einrichten

1. Gehe zu **https://app.netlify.com**
2. Registriere dich (am besten mit GitHub)
3. Klicke **"Add new site"** → **"Import an existing project"**
4. Wähle dein GitHub Repository
5. Build-Einstellungen leer lassen (kein Build nötig!)
6. Klicke **"Deploy site"**
7. Deine Seite ist in ~30 Sekunden live!

## Schritt 5: Domain rsx.ch konfigurieren (10 Min)

### In Netlify:

1. Gehe zu **Site settings → Domain management → Add custom domain**
2. Gib `rsx.ch` ein
3. Netlify zeigt dir die DNS-Einstellungen an

### Bei Metanet (DNS):

1. Logge dich bei **metanet.ch** ein
2. Gehe zu **DNS-Verwaltung** für rsx.ch
3. Ändere/erstelle folgende DNS-Einträge:

| Typ | Name | Wert |
|-----|------|------|
| **A** | @ | `75.2.60.5` |
| **CNAME** | www | `DEIN-SITE-NAME.netlify.app` |

(Die genaue Netlify-IP und den Site-Namen findest du in deinem Netlify Dashboard unter Domain settings)

4. **Alternative**: Du kannst auch Netlify DNS verwenden:
   - In Netlify: Domain settings → "Set up Netlify DNS"
   - Bei Metanet: Nameserver ändern auf die von Netlify angegebenen

5. Warte 5-30 Minuten bis die DNS-Änderungen aktiv sind
6. Netlify erstellt automatisch ein **SSL-Zertifikat** (HTTPS)

## Schritt 6: Testen

1. Öffne **https://rsx.ch** — die Landing Page sollte erscheinen
2. Klicke durch die Kategorien — freie Prompts sollten sichtbar sein
3. Premium-Prompts sollten gesperrt/geblurrt sein
4. Teste den Subscribe-Button — Lemon Squeezy Checkout sollte öffnen
5. Nach dem Kauf: Lizenzschlüssel auf der Activate-Seite eingeben
6. Premium-Prompts sollten jetzt freigeschaltet sein

---

## Fertig! 🎉

Deine Website ist live. Hier eine Zusammenfassung der laufenden Kosten:

| Posten | Kosten |
|--------|--------|
| Netlify Hosting | $0 (Free Tier) |
| Lemon Squeezy | 5% + $0.50 pro Transaktion |
| Domain rsx.ch | Bereits bezahlt |
| **Total fixe Kosten** | **$0/Monat** |

### Nächste Schritte für Wachstum:

1. **Social Media**: Teile einzelne kostenlose Prompts auf Twitter/LinkedIn/Reddit
2. **SEO**: Die Blog-Artikel ranken nach einigen Wochen in Google
3. **Content**: Füge wöchentlich neue Prompts hinzu (in `js/prompts-premium.js`)
4. **Email**: Optional einen Newsletter einrichten (z.B. Buttondown Free Tier)
