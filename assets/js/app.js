/**
 * KaliVault - Advanced Features Module v2.0
 * ==========================================
 * Complete Kali Linux Tools Reference with 160+ tools
 */

const STORAGE_KEYS = {
  FAVORITES: 'kalivault_favorites',
  RECENTLY_VIEWED: 'kalivault_recent',
  EXPLORED: 'kalivault_explored',
  THEME: 'kalivault_theme'
};

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
}

function saveFavorite(toolId) {
  const favorites = getFavorites();
  if (!favorites.includes(toolId)) {
    favorites.push(toolId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
  return favorites;
}

function removeFavorite(toolId) {
  const favorites = getFavorites().filter(id => id !== toolId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  return favorites;
}

function toggleFavorite(toolId) {
  const favorites = getFavorites();
  if (favorites.includes(toolId)) {
    removeFavorite(toolId);
    return false;
  } else {
    saveFavorite(toolId);
    return true;
  }
}

function isFavorite(toolId) {
  return getFavorites().includes(toolId);
}

function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED) || '[]');
}

function addToRecentlyViewed(tool) {
  const recent = getRecentlyViewed().filter(t => t.id !== tool.id);
  recent.unshift({ id: tool.id, name: tool.name, category: tool.category, timestamp: Date.now() });
  const trimmed = recent.slice(0, 5);
  localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(trimmed));
  return trimmed;
}

function getExploredCount() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPLORED) || '[]').length;
}

function markAsExplored(toolId) {
  const explored = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPLORED) || '[]'));
  explored.add(toolId);
  localStorage.setItem(STORAGE_KEYS.EXPLORED, JSON.stringify([...explored]));
  return explored.size;
}

class KaliVaultApp {
  constructor() {
    this.tools = [];
    this.toolsData = null;
    this.flatTools = [];
    this.currentCategory = 'all';
    this.currentDifficulty = 'all';
    this.searchQuery = '';
    this.showFavoritesOnly = false;
    this.init();
  }

  async init() {
    await this.loadToolsData();
    this.initTheme();
    this.initMobileMenu();
    this.initGlobalSearch();
    this.initFilters();
    this.initModals();
    this.initQuickActions();
    this.initFeedbackForm();
    this.initChangelog();
    this.initFeaturedTool();
    this.initCategories();
    this.initRecentlyViewed();
    this.initProgressBar();
    this.updateStats();
    this.updateFavoritesCount();
  }

  async loadToolsData() {
    try {
      const response = await fetch('assets/data/tools-data.json');
      this.toolsData = await response.json();
      
      this.flatTools = [];
      for (const [category, tools] of Object.entries(this.toolsData.categories)) {
        tools.forEach(tool => {
          this.flatTools.push({
            ...tool,
            category: category,
            id: tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
          });
        });
      }
      this.tools = this.flatTools;
      
      this.renderToolsTable();
      this.initFilters();
      this.updateStats();
      this.updateFavoritesCount();
      
    } catch (error) {
      console.error('Failed to load tools:', error);
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }

    document.getElementById('themeToggle')?.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem(STORAGE_KEYS.THEME, isLight ? 'light' : 'dark');
      this.showToast(isLight ? 'Light mode activated' : 'Dark mode activated');
    });
  }

  initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn?.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinks?.classList.toggle('active');
    });

    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn?.classList.remove('active');
        navLinks?.classList.remove('active');
      });
    });
  }

  initGlobalSearch() {
    const searchInputs = document.querySelectorAll('.global-search-input, #searchInput');
    
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterAndRender();
      });

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && this.searchQuery) {
          window.location.href = `tools.html?search=${encodeURIComponent(this.searchQuery)}`;
        }
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      searchInputs.forEach(input => {
        input.value = searchParam;
        this.searchQuery = searchParam.toLowerCase();
      });
      this.filterAndRender();
    }
  }

  initFilters() {
    document.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        this.filterAndRender();
      });
    });

    document.querySelectorAll('.filter-btn[data-difficulty]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-difficulty]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentDifficulty = btn.dataset.difficulty;
        this.filterAndRender();
      });
    });

    const favoritesBtn = document.getElementById('favoritesOnlyBtn');
    if (favoritesBtn) {
      favoritesBtn.addEventListener('click', () => {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        favoritesBtn.classList.toggle('active', this.showFavoritesOnly);
        this.filterAndRender();
      });
    }
  }

  filterAndRender() {
    let filtered = [...this.flatTools];

    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(t => t.category === this.currentCategory);
    }

    if (this.currentDifficulty !== 'all') {
      filtered = filtered.filter(t => t.difficulty === this.currentDifficulty);
    }

    if (this.showFavoritesOnly) {
      const favorites = getFavorites();
      filtered = filtered.filter(t => favorites.includes(t.id));
    }

    if (this.searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(this.searchQuery) ||
        t.short_desc?.toLowerCase().includes(this.searchQuery) ||
        t.command?.toLowerCase().includes(this.searchQuery) ||
        t.category.toLowerCase().includes(this.searchQuery)
      );
    }

    this.renderToolsTable(filtered);
  }

  renderToolsTable(tools = this.flatTools) {
    const tbody = document.getElementById('toolsTableBody');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!tbody) return;

    if (tools.length === 0) {
      tbody.innerHTML = '';
      noResults.style.display = 'block';
      if (resultsCount) resultsCount.textContent = 'No tools found';
      return;
    }

    noResults.style.display = 'none';
    if (resultsCount) resultsCount.textContent = `Showing ${tools.length} tools`;

    tbody.innerHTML = tools.map(tool => {
      const isFav = isFavorite(tool.id);
      return `
        <tr data-tool-id="${tool.id}" class="tool-row">
          <td>
            <div class="tool-name-cell">
              <button class="favorite-btn ${isFav ? 'active' : ''}" data-tool-id="${tool.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                <svg viewBox="0 0 24 24"><path d="${isFav ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' : 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'}"/></svg>
              </button>
              <svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>
              <span class="tool-name">${tool.name}</span>
            </div>
          </td>
          <td class="command-cell">
            <code>${this.escapeHtml(tool.command)}</code>
          </td>
          <td class="desc-cell">${tool.short_desc || ''}</td>
          <td>
            <span class="difficulty-badge ${tool.difficulty.toLowerCase()}">${tool.difficulty}</span>
          </td>
          <td>
            <button class="copy-btn-table" data-command="${this.escapeHtml(tool.command)}">
              <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              Copy
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', (e) => {
        if (!e.target.closest('.copy-btn-table') && !e.target.closest('.favorite-btn')) {
          this.openToolModal(row.dataset.toolId);
        }
      });
    });

    tbody.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const toolId = btn.dataset.toolId;
        const added = toggleFavorite(toolId);
        btn.classList.toggle('active', added);
        this.showToast(added ? 'Added to favorites!' : 'Removed from favorites');
        this.updateFavoritesCount();
      });
    });

    tbody.querySelectorAll('.copy-btn-table').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.copyToClipboard(btn.dataset.command);
      });
    });
  }

  initModals() {
    const toolModal = document.getElementById('toolModal');
    
    document.getElementById('modalClose')?.addEventListener('click', () => {
      toolModal?.classList.remove('active');
      document.body.style.overflow = '';
    });

    toolModal?.addEventListener('click', (e) => {
      if (e.target === toolModal) {
        toolModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          modal.classList.remove('active');
        });
        document.body.style.overflow = '';
      }
    });
  }

  openToolModal(toolId) {
    const tool = this.flatTools.find(t => t.id === toolId);
    if (!tool) return;

    addToRecentlyViewed(tool);
    markAsExplored(toolId);
    this.initProgressBar();
    this.initRecentlyViewed();

    const modal = document.getElementById('toolModal');
    const modalBody = document.getElementById('modalBody');
    const isFav = isFavorite(tool.id);

    modalBody.innerHTML = `
      <div class="modal-tool-header">
        <div>
          <h2 class="modal-title">${tool.name}</h2>
          <p class="modal-category">${tool.category}</p>
        </div>
        <button class="favorite-btn large ${isFav ? 'active' : ''}" data-tool-id="${tool.id}">
          <svg viewBox="0 0 24 24"><path d="${isFav ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' : 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'}"/></svg>
          ${isFav ? 'Saved' : 'Save'}
        </button>
      </div>

      <p class="modal-description">${tool.full_description || tool.short_desc || ''}</p>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/></svg>
          Command
        </h3>
        <div class="modal-command">
          <code>${tool.command}</code>
          <button class="copy-btn" data-command="${this.escapeHtml(tool.command)}">
            <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            Copy
          </button>
        </div>
      </div>

      ${tool.example ? `
        <div class="modal-section">
          <h3 class="modal-section-title">
            <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
            Example
          </h3>
          <div class="example-block">
            <code class="example-command">${tool.example}</code>
          </div>
        </div>
      ` : ''}

      ${tool.flags && tool.flags.length > 0 ? `
        <div class="modal-section">
          <h3 class="modal-section-title">
            <svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
            Common Flags
          </h3>
          <div class="flags-list">
            ${tool.flags.slice(0, 8).map(flag => `
              <div class="flag-item">
                <span class="flag-syntax">${flag}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${tool.use_case ? `
        <div class="modal-section">
          <h3 class="modal-section-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Use Cases
          </h3>
          <p class="use-cases">${tool.use_case}</p>
        </div>
      ` : ''}

      ${tool.safety_note ? `
        <div class="safety-note">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <p><strong>Safety Note:</strong> ${tool.safety_note}</p>
        </div>
      ` : ''}

      <div class="modal-meta">
        <span class="difficulty-badge ${tool.difficulty.toLowerCase()}">${tool.difficulty}</span>
        <button class="btn-terminal" data-tool="${tool.name}">
          <svg viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          Try in Terminal
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modalBody.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.copyToClipboard(btn.dataset.command);
      });
    });

    const favBtn = modalBody.querySelector('.favorite-btn.large');
    favBtn?.addEventListener('click', () => {
      const added = toggleFavorite(tool.id);
      favBtn.classList.toggle('active', added);
      favBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="${added ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' : 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'}"/></svg>
        ${added ? 'Saved' : 'Save'}
      `;
      this.showToast(added ? 'Added to favorites!' : 'Removed from favorites');
      this.updateFavoritesCount();
      this.filterAndRender();
    });

    modalBody.querySelector('.btn-terminal')?.addEventListener('click', () => {
      this.openTerminalSimulator(tool);
    });
  }

  initQuickActions() {
    const randomBtn = document.getElementById('randomToolBtn') || document.getElementById('randomToolBtn2');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const randomTool = this.flatTools[Math.floor(Math.random() * this.flatTools.length)];
        this.openToolModal(randomTool.id);
      });
    }

    document.getElementById('exportPdfBtn')?.addEventListener('click', () => {
      this.exportToPDF();
    });

    document.getElementById('terminalSimBtn')?.addEventListener('click', () => {
      this.openTerminalSimulator();
    });

    document.getElementById('changelogBtn')?.addEventListener('click', () => {
      document.getElementById('changelogModal')?.classList.add('active');
    });

    document.getElementById('feedbackBtn')?.addEventListener('click', () => {
      document.getElementById('feedbackModal')?.classList.add('active');
    });

    document.getElementById('openFeedback')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('feedbackModal')?.classList.add('active');
    });

    document.getElementById('openFeedback2')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('feedbackModal')?.classList.add('active');
    });

    document.querySelectorAll('.changelog-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.dataset.modal || 'changelogModal';
        document.getElementById(modalId)?.classList.add('active');
      });
    });

    document.querySelectorAll('.modal-close, #feedbackClose, #changelogClose, #terminalClose').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay')?.classList.remove('active');
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    const modal = document.getElementById('feedbackModal');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = {
        name: formData.get('name') || formData.get('feedbackName'),
        email: formData.get('email') || formData.get('feedbackEmail'),
        type: formData.get('type') || formData.get('feedbackType'),
        message: formData.get('message') || formData.get('feedbackMessage'),
        timestamp: new Date().toISOString()
      };

      console.log('Feedback submitted:', data);
      
      form.innerHTML = `
        <div class="form-success" style="display: block;">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <h3>Thank You!</h3>
          <p>Your feedback has been sent successfully. We'll get back to you soon.</p>
        </div>
      `;

      this.showToast('Feedback sent successfully!');

      setTimeout(() => {
        modal?.classList.remove('active');
        form.innerHTML = `
          <div class="form-group">
            <label for="feedbackName">Your Name</label>
            <input type="text" id="feedbackName" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label for="feedbackEmail">Email Address</label>
            <input type="email" id="feedbackEmail" required placeholder="john@example.com">
          </div>
          <div class="form-group">
            <label for="feedbackType">Category</label>
            <select id="feedbackType" required>
              <option value="">Select a category...</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Suggestion">Suggestion</option>
              <option value="New Tool Request">New Tool Request</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="feedbackMessage">Message</label>
            <textarea id="feedbackMessage" rows="5" required placeholder="Tell us what's on your mind..."></textarea>
          </div>
          <button type="submit" class="btn-submit">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            Send Feedback
          </button>
        `;
      }, 2000);
    });
  }

  initChangelog() {
    const content = document.getElementById('changelogContent');
    if (content) {
      content.innerHTML = `
        <div class="changelog-version">
          <div class="version-header">
            <span class="version-tag">v2.0</span>
            <span class="version-date">April 2026</span>
          </div>
          <ul class="changelog-list">
            <li class="added">Expanded to 160+ tools across 13 categories</li>
            <li class="added">Added official Kali dragon branding</li>
            <li class="added">New hero section with animated watermark</li>
            <li class="added">Added contact section with social links</li>
            <li class="improved">Improved feedback form with email functionality</li>
            <li class="improved">Enhanced table design with better hover effects</li>
            <li class="improved">Added smooth modal animations</li>
            <li class="improved">Better responsive design</li>
          </ul>
        </div>
        <div class="changelog-version">
          <div class="version-header">
            <span class="version-tag">v1.0</span>
            <span class="version-date">March 2026</span>
          </div>
          <ul class="changelog-list">
            <li class="added">Initial release with 110 tools</li>
            <li class="added">Dark/Light theme support</li>
            <li class="added">Favorites system with localStorage</li>
            <li class="added">Recently viewed tools</li>
            <li class="added">Terminal simulator</li>
            <li class="added">PDF export</li>
            <li class="added">PWA support</li>
          </ul>
        </div>
      `;
    }
  }

  initFeaturedTool() {
    const container = document.getElementById('featuredTool');
    if (!container || this.flatTools.length === 0) return;

    const today = new Date();
    const index = (today.getDate() + today.getMonth()) % this.flatTools.length;
    const tool = this.flatTools[index];
    const isFav = isFavorite(tool.id);

    container.innerHTML = `
      <span class="featured-label">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Tool of the Day
      </span>
      <h3 class="featured-name">${tool.name}</h3>
      <p class="featured-description">${tool.short_desc || tool.full_description || ''}</p>
      <div class="command-block">
        <code>${tool.command}</code>
        <button class="copy-btn" data-command="${this.escapeHtml(tool.command)}">
          <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          Copy
        </button>
      </div>
      <a href="tools.html?tool=${tool.id}" class="view-more-btn" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: var(--accent-purple); border-radius: 12px; color: white; font-weight: 600; transition: all 0.3s;">
        View Full Details
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </a>
    `;

    container.querySelector('.copy-btn')?.addEventListener('click', () => {
      this.copyToClipboard(tool.command);
    });
  }

  initCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid || !this.toolsData) return;

    const icons = {
      'Information Gathering': '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
      'Vulnerability Analysis': '<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>',
      'Web Application Analysis': '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
      'Password Attacks': '<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
      'Wireless Attacks': '<svg viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',
      'Exploitation Tools': '<svg viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>',
      'Forensics': '<svg viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>',
      'Reverse Engineering': '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/></svg>',
      'Database Assessment': '<svg viewBox="0 0 24 24"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z"/></svg>',
      'Sniffing & Spoofing': '<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>',
      'Reporting Tools': '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',
      'Post Exploitation': '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'
    };

    grid.innerHTML = Object.entries(this.toolsData.categories).map(([category, tools]) => `
      <a href="tools.html?category=${encodeURIComponent(category)}" class="category-card">
        <div class="category-icon">
          ${icons[category] || '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'}
        </div>
        <h3 class="category-name">${category}</h3>
        <span class="category-count">${tools.length} tools</span>
      </a>
    `).join('');
  }

  initRecentlyViewed() {
    const container = document.getElementById('recentlyViewed');
    if (!container) return;

    const recent = getRecentlyViewed();
    
    if (recent.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted);">No tools viewed yet. Start exploring!</p>';
      return;
    }

    container.innerHTML = recent.map(tool => `
      <a href="tools.html?tool=${tool.id}" class="recent-tool-item">
        <span class="recent-name">${tool.name}</span>
        <span class="recent-category">${tool.category}</span>
      </a>
    `).join('');
  }

  initProgressBar() {
    const progressPercent = document.getElementById('progressPercent');
    const exploredCount = document.getElementById('exploredCount');
    const progressFill = document.getElementById('progressFill');
    const explorationProgress = document.getElementById('explorationProgress');

    const explored = getExploredCount();
    const total = this.flatTools.length;
    const percentage = Math.round((explored / total) * 100);

    if (progressPercent) progressPercent.textContent = `${percentage}%`;
    if (exploredCount) exploredCount.textContent = `${explored} / ${total} tools explored`;
    if (progressFill) progressFill.style.width = `${percentage}%`;
    
    if (explorationProgress) {
      explorationProgress.innerHTML = `
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
        <p class="progress-stats">${explored} / ${total} tools explored (${percentage}%)</p>
      `;
    }
  }

  updateStats() {
    const toolsCount = document.getElementById('toolsCount');
    const categoriesCount = document.getElementById('categoriesCount');

    if (toolsCount && this.toolsData) {
      toolsCount.textContent = this.flatTools.length;
    }
    if (categoriesCount && this.toolsData) {
      categoriesCount.textContent = Object.keys(this.toolsData.categories).length;
    }
  }

  updateFavoritesCount() {
    const favCount = document.getElementById('favoritesCount');
    if (favCount) {
      favCount.textContent = getFavorites().length;
    }
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Copied to clipboard!');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('Copied to clipboard!');
    }
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  openTerminalSimulator(tool = null) {
    const modal = document.getElementById('terminalModal');
    const output = document.getElementById('terminalOutput');
    const input = document.getElementById('terminalInput');

    if (!modal || !output) return;

    output.innerHTML = `
      <p class="terminal-line">Welcome to KaliVault Terminal Simulator</p>
      <p class="terminal-line">Type <span class="highlight">help</span> for available commands</p>
      <p class="terminal-line">Type <span class="highlight">tools</span> to see available tools</p>
      ${tool ? `<p class="terminal-line">Loaded: <span class="highlight">${tool.name}</span></p>` : ''}
    `;

    modal.classList.add('active');
    input?.focus();

    const handleCommand = (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
          this.executeTerminalCommand(cmd, output, tool);
          input.value = '';
        }
      }
    };

    input?.addEventListener('keypress', handleCommand);
  }

  executeTerminalCommand(cmd, output, tool) {
    const addLine = (text, type = '') => {
      const line = document.createElement('p');
      line.className = `terminal-line ${type}`;
      line.innerHTML = text;
      output.appendChild(line);
      output.parentElement.scrollTop = output.parentElement.scrollHeight;
    };

    addLine(`<span style="color: var(--accent-green);">root@kali:~#</span> ${this.escapeHtml(cmd)}`);

    const command = cmd.toLowerCase();

    if (command === 'help') {
      addLine('<span class="highlight">Available commands:</span>', 'success');
      addLine('  help     - Show this help message');
      addLine('  tools    - List all available tools');
      addLine('  search   - Search for a specific tool');
      addLine('  info     - Show info about current tool');
      addLine('  clear    - Clear the terminal');
      addLine('  exit     - Close terminal');
    } else if (command === 'tools') {
      addLine('<span class="highlight">Available tools:</span>', 'success');
      this.flatTools.slice(0, 15).forEach(t => {
        addLine(`  ${t.name} - ${t.category}`);
      });
      if (this.flatTools.length > 15) {
        addLine(`  ... and ${this.flatTools.length - 15} more`);
      }
    } else if (command === 'clear') {
      output.innerHTML = '<p class="terminal-line">Terminal cleared</p>';
    } else if (command === 'exit') {
      document.getElementById('terminalModal')?.classList.remove('active');
    } else if (command.startsWith('search ')) {
      const query = command.substring(7);
      const results = this.flatTools.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.category.toLowerCase().includes(query)
      );
      if (results.length > 0) {
        addLine(`<span class="highlight">Found ${results.length} tools:</span>`, 'success');
        results.slice(0, 10).forEach(t => {
          addLine(`  ${t.name} - ${t.command}`);
        });
      } else {
        addLine('No tools found matching your search', 'error');
      }
    } else if (command === 'info' && tool) {
      addLine(`<span class="highlight">${tool.name}</span>`, 'success');
      addLine(`Command: ${tool.command}`);
      addLine(`Category: ${tool.category}`);
      addLine(`Difficulty: ${tool.difficulty}`);
      addLine(`Description: ${tool.short_desc || 'N/A'}`);
    } else {
      const foundTool = this.flatTools.find(t => t.name.toLowerCase() === command);
      if (foundTool) {
        addLine(`<span class="highlight">${foundTool.name}</span>`, 'success');
        addLine(`Command: ${foundTool.command}`);
        addLine(`Category: ${foundTool.category}`);
        if (foundTool.example) {
          addLine(`Example: ${foundTool.example}`);
        }
      } else {
        addLine(`Command not found: ${cmd}`, 'error');
        addLine('Type <span class="highlight">help</span> for available commands');
      }
    }
  }

  exportToPDF() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>KaliVault - Complete Tools Reference</title>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; color: #333; }
          h1 { color: #9f00ff; border-bottom: 3px solid #9f00ff; padding-bottom: 10px; }
          h2 { color: #333; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .tool { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 8px; page-break-inside: avoid; }
          .tool-name { font-size: 18px; font-weight: bold; color: #9f00ff; }
          .command { font-family: 'Fira Code', monospace; background: #f5f5f5; padding: 8px; margin: 10px 0; border-radius: 4px; }
          .desc { color: #666; }
          .difficulty { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
          .easy { background: #d4edda; color: #155724; }
          .medium { background: #fff3cd; color: #856404; }
          .hard { background: #f8d7da; color: #721c24; }
          .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
          @media print { body { padding: 15px; } }
        </style>
      </head>
      <body>
        <h1>KaliVault - Complete Kali Linux Tools Reference</h1>
        <p><strong>Total Tools:</strong> ${this.flatTools.length} | <strong>Categories:</strong> ${Object.keys(this.toolsData.categories).length}</p>
        ${Object.entries(this.toolsData.categories).map(([category, tools]) => `
          <h2>${category} (${tools.length} tools)</h2>
          ${tools.map(tool => `
            <div class="tool">
              <div class="tool-name">${tool.name} <span class="difficulty ${tool.difficulty.toLowerCase()}">${tool.difficulty}</span></div>
              <div class="command">${tool.command}</div>
              <div class="desc">${tool.short_desc || ''}</div>
            </div>
          `).join('')}
        `).join('')}
        <div class="footer">
          <p>KaliVault - Kali Linux Tools Reference | Educational purposes only</p>
          <p>This website is created purely for educational and ethical cybersecurity learning purposes.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
    this.showToast('Opening print dialog...');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new KaliVaultApp();
});