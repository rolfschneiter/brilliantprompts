// ============================================================
// BrilliantPrompts Configuration
// ============================================================
// ANLEITUNG: Ersetze die Platzhalter unten mit deinen
// Lemon Squeezy Werten. Siehe SETUP-GUIDE.md für Details.
// ============================================================

const CONFIG = {
    // ----------------------------------------------------------
    // Lemon Squeezy Store & Product IDs
    // Finde diese im Lemon Squeezy Dashboard unter Settings > Store
    // ----------------------------------------------------------
    STORE_ID: '297352',

    // Product IDs findest du unter Products > [Produkt] > General
    PRODUCT_ID_MONTHLY: '857384',
    PRODUCT_ID_ANNUAL: '857397',

    // ----------------------------------------------------------
    // Checkout URLs
    // Findest du unter Products > [Produkt] > Share
    // ----------------------------------------------------------
    CHECKOUT_URL_MONTHLY: 'https://rsxch.lemonsqueezy.com/checkout/buy/7809e322-100f-43a8-8d93-f5fc816ca5ec',
    CHECKOUT_URL_ANNUAL: 'https://rsxch.lemonsqueezy.com/checkout/buy/ba8668c9-8bfd-4e72-b779-65e0843bd401',

    // ----------------------------------------------------------
    // Customer Portal URL
    // Kunden können ihr Abo über Lemon Squeezy verwalten
    // ----------------------------------------------------------
    CUSTOMER_PORTAL_URL: 'https://app.lemonsqueezy.com/my-orders',

    // ----------------------------------------------------------
    // Site Settings (kannst du anpassen)
    // ----------------------------------------------------------
    SITE_NAME: 'BrilliantPrompts',
    SITE_URL: 'https://rsx.ch',
    SITE_DESCRIPTION: 'Expert-crafted AI prompts that actually work. Save hours with our curated prompt library.',

    // Pricing display
    PRICE_MONTHLY: 7,
    PRICE_ANNUAL: 49,

    // License key re-validation interval (milliseconds)
    // Default: 24 hours
    REVALIDATION_INTERVAL: 24 * 60 * 60 * 1000,
};
