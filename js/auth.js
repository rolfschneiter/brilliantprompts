// ============================================================
// BrilliantPrompts – License Key Authentication
// Validates subscriptions via Lemon Squeezy License API
// ============================================================

const Auth = (() => {
    const STORAGE_KEY = 'bp_license_key';
    const STORAGE_TIMESTAMP = 'bp_license_validated';
    const STORAGE_STATUS = 'bp_license_status';

    // Check if user has a valid stored license
    function isAuthenticated() {
        const key = localStorage.getItem(STORAGE_KEY);
        const timestamp = localStorage.getItem(STORAGE_TIMESTAMP);
        if (!key || !timestamp) return false;

        const now = Date.now();
        const elapsed = now - parseInt(timestamp, 10);

        // If within revalidation interval, trust stored status
        if (elapsed < CONFIG.REVALIDATION_INTERVAL) {
            return localStorage.getItem(STORAGE_STATUS) === 'active';
        }

        // Otherwise, trigger background revalidation
        revalidateInBackground(key);
        // Still return true while revalidating (optimistic)
        return localStorage.getItem(STORAGE_STATUS) === 'active';
    }

    // Get the stored license key
    function getLicenseKey() {
        return localStorage.getItem(STORAGE_KEY);
    }

    // Validate a license key against Lemon Squeezy API
    async function validateKey(licenseKey) {
        try {
            const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    license_key: licenseKey.trim(),
                }),
            });

            const data = await response.json();

            if (data.valid) {
                // Store the key and validation info
                localStorage.setItem(STORAGE_KEY, licenseKey.trim());
                localStorage.setItem(STORAGE_TIMESTAMP, Date.now().toString());
                localStorage.setItem(STORAGE_STATUS, 'active');
                return { success: true, message: 'License key activated! Welcome to BrilliantPrompts Pro.' };
            } else {
                return {
                    success: false,
                    message: data.error || 'Invalid or expired license key. Please check and try again.',
                };
            }
        } catch (error) {
            console.error('License validation error:', error);
            return {
                success: false,
                message: 'Could not validate license key. Please check your internet connection and try again.',
            };
        }
    }

    // Background revalidation (silent)
    async function revalidateInBackground(licenseKey) {
        try {
            const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    license_key: licenseKey,
                }),
            });

            const data = await response.json();

            if (data.valid) {
                localStorage.setItem(STORAGE_TIMESTAMP, Date.now().toString());
                localStorage.setItem(STORAGE_STATUS, 'active');
            } else {
                // Subscription expired or key revoked
                localStorage.setItem(STORAGE_STATUS, 'expired');
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_TIMESTAMP);
                // Refresh page to show locked state
                window.location.reload();
            }
        } catch (error) {
            // Network error – keep current state, try again later
            console.warn('Background revalidation failed:', error);
        }
    }

    // Logout / clear stored license
    function logout() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TIMESTAMP);
        localStorage.removeItem(STORAGE_STATUS);
        window.location.reload();
    }

    // Update the UI based on auth state
    function updateUI() {
        const authenticated = isAuthenticated();
        const body = document.body;

        if (authenticated) {
            body.classList.add('is-pro');
            body.classList.remove('is-free');
        } else {
            body.classList.add('is-free');
            body.classList.remove('is-pro');
        }

        // Update navigation
        const loginLinks = document.querySelectorAll('.nav-login');
        const logoutLinks = document.querySelectorAll('.nav-logout');
        const portalLinks = document.querySelectorAll('.nav-portal');
        const subscribeButtons = document.querySelectorAll('.btn-subscribe');

        loginLinks.forEach(el => el.style.display = authenticated ? 'none' : '');
        logoutLinks.forEach(el => el.style.display = authenticated ? '' : 'none');
        portalLinks.forEach(el => el.style.display = authenticated ? '' : 'none');
        subscribeButtons.forEach(el => el.style.display = authenticated ? 'none' : '');

        // Unlock/lock premium content
        const premiumCards = document.querySelectorAll('.prompt-card.premium');
        premiumCards.forEach(card => {
            if (authenticated) {
                card.classList.add('unlocked');
                card.classList.remove('locked');
            } else {
                card.classList.add('locked');
                card.classList.remove('unlocked');
            }
        });
    }

    return {
        isAuthenticated,
        getLicenseKey,
        validateKey,
        logout,
        updateUI,
    };
})();

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateUI();
});
