// ============================================================
// BrilliantPrompts – Core Application Logic
// Navigation, Search, Filter, Clipboard, Prompt Rendering
// ============================================================

const App = (() => {
    // ---- Mobile Navigation ----
    function initMobileNav() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.classList.toggle('open');
            toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
        });

        // Close menu on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.classList.remove('open');
            });
        });
    }

    // ---- Copy to Clipboard ----
    function initCopyButtons() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-copy');
            if (!btn) return;

            const promptText = btn.closest('.prompt-card')?.querySelector('.prompt-text');
            if (!promptText) return;

            const text = promptText.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    // ---- Collapsible Sections ----
    function initCollapsibles() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.collapsible-trigger');
            if (!trigger) return;

            const content = trigger.nextElementSibling;
            if (!content) return;

            trigger.classList.toggle('open');
            content.classList.toggle('open');
        });
    }

    // ---- Search & Filter ----
    let searchTimeout = null;

    function initSearch() {
        const searchInput = document.getElementById('prompt-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => filterPrompts(), 200);
        });
    }

    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active state
                if (btn.dataset.filter === 'all') {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                } else {
                    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
                    if (allBtn) allBtn.classList.remove('active');
                    btn.classList.toggle('active');

                    // If no filters active, activate "all"
                    const activeFilters = document.querySelectorAll('.filter-btn.active');
                    if (activeFilters.length === 0 && allBtn) {
                        allBtn.classList.add('active');
                    }
                }
                filterPrompts();
            });
        });

        // Difficulty filter
        const difficultySelect = document.getElementById('difficulty-filter');
        if (difficultySelect) {
            difficultySelect.addEventListener('change', () => filterPrompts());
        }

        // AI Model filter
        const modelSelect = document.getElementById('model-filter');
        if (modelSelect) {
            modelSelect.addEventListener('change', () => filterPrompts());
        }
    }

    function filterPrompts() {
        const searchInput = document.getElementById('prompt-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const activeFilters = document.querySelectorAll('.filter-btn.active');
        const activeCategories = Array.from(activeFilters)
            .map(btn => btn.dataset.filter)
            .filter(f => f !== 'all');

        const difficultySelect = document.getElementById('difficulty-filter');
        const difficulty = difficultySelect ? difficultySelect.value : 'all';

        const modelSelect = document.getElementById('model-filter');
        const model = modelSelect ? modelSelect.value : 'all';

        const cards = document.querySelectorAll('.prompt-card');
        let visibleCount = 0;

        cards.forEach(card => {
            let show = true;

            // Search filter
            if (searchTerm) {
                const title = (card.dataset.title || '').toLowerCase();
                const tags = (card.dataset.tags || '').toLowerCase();
                const desc = (card.dataset.description || '').toLowerCase();
                if (!title.includes(searchTerm) && !tags.includes(searchTerm) && !desc.includes(searchTerm)) {
                    show = false;
                }
            }

            // Category filter
            if (activeCategories.length > 0 && show) {
                const cardCategory = card.dataset.category || '';
                if (!activeCategories.includes(cardCategory)) {
                    show = false;
                }
            }

            // Difficulty filter
            if (difficulty !== 'all' && show) {
                const cardDifficulty = card.dataset.difficulty || '';
                if (cardDifficulty !== difficulty) {
                    show = false;
                }
            }

            // Model filter
            if (model !== 'all' && show) {
                const cardModels = (card.dataset.models || '').toLowerCase();
                if (!cardModels.includes(model.toLowerCase())) {
                    show = false;
                }
            }

            card.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });

        // Update count display
        const countDisplay = document.getElementById('prompt-count');
        if (countDisplay) {
            countDisplay.textContent = `${visibleCount} prompt${visibleCount !== 1 ? 's' : ''} found`;
        }

        // Show/hide "no results" message
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? '' : 'none';
        }
    }

    // ---- Render Prompt Cards ----
    function renderPromptCard(prompt, isPremium) {
        const isAuthenticated = (typeof Auth !== 'undefined') ? Auth.isAuthenticated() : false;
        const isLocked = isPremium && !isAuthenticated;
        const checkoutUrl = (typeof CONFIG !== 'undefined') ? CONFIG.CHECKOUT_URL_MONTHLY : '#';
        const price = (typeof CONFIG !== 'undefined') ? CONFIG.PRICE_MONTHLY : 7;

        const modelBadges = (prompt.models || [])
            .map(m => `<span class="badge badge-model">${m}</span>`)
            .join('');

        const tagBadges = (prompt.tags || [])
            .map(t => `<span class="badge badge-tag">${t}</span>`)
            .join('');

        const difficultyClass = (prompt.difficulty || 'beginner').toLowerCase();

        return `
        <div class="prompt-card ${isPremium ? 'premium' : 'free'} ${isLocked ? 'locked' : 'unlocked'}"
             data-title="${(prompt.title || '').replace(/"/g, '&quot;')}"
             data-category="${prompt.category || ''}"
             data-difficulty="${difficultyClass}"
             data-models="${(prompt.models || []).join(',').toLowerCase()}"
             data-tags="${(prompt.tags || []).join(',').toLowerCase()}"
             data-description="${(prompt.description || '').replace(/"/g, '&quot;')}">
            <div class="prompt-card-header">
                <div class="prompt-badges">
                    <span class="badge badge-category">${prompt.category || ''}</span>
                    <span class="badge badge-difficulty badge-${difficultyClass}">${prompt.difficulty || ''}</span>
                    ${modelBadges}
                </div>
                ${isPremium ? '<span class="badge badge-pro">PRO</span>' : '<span class="badge badge-free-label">FREE</span>'}
            </div>
            <h3 class="prompt-title">${prompt.title || ''}</h3>
            <p class="prompt-description">${prompt.description || ''}</p>

            ${isLocked ? `
                <div class="prompt-locked-overlay">
                    <div class="lock-icon">🔒</div>
                    <p>Subscribe to unlock 168+ premium prompts</p>
                    <a href="${checkoutUrl}" class="btn btn-primary btn-sm lemonsqueezy-button">Subscribe — $${price}/mo</a>
                </div>
            ` : `
                <div class="prompt-text-wrapper">
                    <pre class="prompt-text">${(prompt.prompt || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                    <button class="btn-copy" title="Copy to clipboard">Copy</button>
                </div>

                ${prompt.example ? `
                <div class="collapsible">
                    <button class="collapsible-trigger">💡 Example Output</button>
                    <div class="collapsible-content">
                        <p>${prompt.example}</p>
                    </div>
                </div>
                ` : ''}

                ${prompt.tips ? `
                <div class="collapsible">
                    <button class="collapsible-trigger">🎯 Pro Tips</button>
                    <div class="collapsible-content">
                        <p>${prompt.tips}</p>
                    </div>
                </div>
                ` : ''}
            `}

            <div class="prompt-tags">${tagBadges}</div>
        </div>`;
    }

    // Render all prompts for a given category page
    function renderCategoryPrompts(category) {
        const container = document.getElementById('prompts-container');
        if (!container) return;

        const freePrompts = (typeof FREE_PROMPTS !== 'undefined' ? FREE_PROMPTS : [])
            .filter(p => p.category === category);
        const premiumPrompts = (typeof PREMIUM_PROMPTS !== 'undefined' ? PREMIUM_PROMPTS : [])
            .filter(p => p.category === category);

        // Always render free prompts first so they're visible even if premium fails
        let freeHtml = '';
        freePrompts.forEach(p => { freeHtml += renderPromptCard(p, false); });
        container.innerHTML = freeHtml;

        try {
            let premiumHtml = '';
            premiumPrompts.forEach(p => { premiumHtml += renderPromptCard(p, true); });
            container.innerHTML += premiumHtml;
        } catch (e) {
            console.warn('Premium prompts could not be rendered:', e);
        }

        // Update count
        const countDisplay = document.getElementById('prompt-count');
        if (countDisplay) {
            const total = freePrompts.length + premiumPrompts.length;
            countDisplay.textContent = `${total} prompt${total !== 1 ? 's' : ''}`;
        }
    }

    // Render all prompts (for the main prompts page)
    function renderAllPrompts() {
        const container = document.getElementById('prompts-container');
        if (!container) return;

        const freePrompts = typeof FREE_PROMPTS !== 'undefined' ? FREE_PROMPTS : [];
        const premiumPrompts = typeof PREMIUM_PROMPTS !== 'undefined' ? PREMIUM_PROMPTS : [];

        // Always render free prompts first so they're visible even if premium fails
        let freeHtml = '';
        freePrompts.forEach(p => { freeHtml += renderPromptCard(p, false); });
        container.innerHTML = freeHtml;

        try {
            let premiumHtml = '';
            premiumPrompts.forEach(p => { premiumHtml += renderPromptCard(p, true); });
            container.innerHTML += premiumHtml;
        } catch (e) {
            console.warn('Premium prompts could not be rendered:', e);
        }

        const countDisplay = document.getElementById('prompt-count');
        if (countDisplay) {
            const total = freePrompts.length + premiumPrompts.length;
            countDisplay.textContent = `${total} prompt${total !== 1 ? 's' : ''}`;
        }
    }

    // Render featured prompts on landing page
    function renderFeaturedPrompts() {
        const container = document.getElementById('featured-prompts');
        if (!container) return;

        const freePrompts = typeof FREE_PROMPTS !== 'undefined' ? FREE_PROMPTS : [];
        const featured = freePrompts.slice(0, 6);

        let html = '';
        featured.forEach(p => { html += renderPromptCard(p, false); });
        container.innerHTML = html;
    }

    // ---- Smooth Scroll for Anchor Links ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---- FAQ Accordion ----
    function initFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isOpen = item.classList.contains('open');

                // Close all
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

                // Toggle clicked
                if (!isOpen) item.classList.add('open');
            });
        });
    }

    // ---- Initialize ----
    function init() {
        initMobileNav();
        initCopyButtons();
        initCollapsibles();
        initSearch();
        initFilters();
        initSmoothScroll();
        initFAQ();
    }

    return {
        init,
        renderPromptCard,
        renderCategoryPrompts,
        renderAllPrompts,
        renderFeaturedPrompts,
        filterPrompts,
    };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
