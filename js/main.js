// ===========================
// NAVBAR SCROLL BEHAVIOR
// ===========================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===========================
// HERO SEARCH TABS
// ===========================
const searchTabs = document.querySelectorAll('.search-tab');
searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ===========================
// HERO SEARCH → PROPERTIES
// ===========================
const heroSearchForm = document.getElementById('heroSearchForm');
if (heroSearchForm) {
  heroSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const area = document.getElementById('heroArea')?.value || '';
    const type = document.getElementById('heroType')?.value || '';
    const budget = document.getElementById('heroBudget')?.value || '';
    const activeTab = document.querySelector('.search-tab.active')?.dataset.type || '';
    const params = new URLSearchParams();
    if (area) params.set('area', area);
    if (type) params.set('type', type);
    if (budget) params.set('budget', budget);
    if (activeTab) params.set('status', activeTab);
    window.location.href = `properties.html?${params.toString()}`;
  });
}

// ===========================
// WISHLIST TOGGLE
// ===========================
document.querySelectorAll('.card-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.innerHTML = btn.classList.contains('active') ? '❤️' : '🤍';
  });
});

// ===========================
// PROPERTIES FILTER LOGIC
// ===========================
function initFilters() {
  const filterForm = document.getElementById('filterForm');
  if (!filterForm) return;

  // Pre-fill from URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('area')) {
    const el = document.getElementById('filterArea');
    if (el) el.value = params.get('area');
  }
  if (params.get('type')) {
    const el = document.getElementById('filterType');
    if (el) el.value = params.get('type');
  }
  if (params.get('status')) {
    const el = document.getElementById('filterStatus');
    if (el) el.value = params.get('status');
  }
  if (params.get('budget')) {
    const el = document.getElementById('filterBudget');
    if (el) el.value = params.get('budget');
  }

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilters();
  });

  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filterForm.reset();
      applyFilters();
    });
  }

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => applyFilters());
  }

  applyFilters(); // run on load
}

function applyFilters() {
  const cards = document.querySelectorAll('.property-card[data-area]');
  const area = document.getElementById('filterArea')?.value?.toLowerCase() || '';
  const type = document.getElementById('filterType')?.value?.toLowerCase() || '';
  const status = document.getElementById('filterStatus')?.value?.toLowerCase() || '';
  const budget = document.getElementById('filterBudget')?.value || '';
  const beds = document.getElementById('filterBeds')?.value || '';
  const sort = document.getElementById('sortSelect')?.value || '';

  let visibleCount = 0;

  cards.forEach(card => {
    const cardArea = card.dataset.area?.toLowerCase() || '';
    const cardType = card.dataset.type?.toLowerCase() || '';
    const cardStatus = card.dataset.status?.toLowerCase() || '';
    const cardPrice = parseInt(card.dataset.price || '0');
    const cardBeds = parseInt(card.dataset.beds || '0');

    let show = true;

    if (area && !cardArea.includes(area)) show = false;
    if (type && cardType !== type) show = false;
    if (status && cardStatus !== status) show = false;
    if (beds && cardBeds < parseInt(beds)) show = false;

    if (budget) {
      const [min, max] = budget.split('-').map(Number);
      if (max) {
        if (cardPrice < min || cardPrice > max) show = false;
      } else {
        if (cardPrice < min) show = false;
      }
    }

    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    countEl.innerHTML = `<strong>${visibleCount}</strong> Properties Found`;
  }

  // Sort
  const grid = document.querySelector('.properties-grid');
  if (grid && sort) {
    const sortedCards = [...cards].filter(c => c.style.display !== 'none');
    if (sort === 'price-asc') {
      sortedCards.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
    } else if (sort === 'price-desc') {
      sortedCards.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
    }
    sortedCards.forEach(c => grid.appendChild(c));
  }
}

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    setTimeout(() => {
      const success = document.getElementById('formSuccess');
      if (success) { success.style.display = 'block'; }
      contactForm.reset();
      if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
    }, 1200);
  });
}

// ===========================
// AGENT CONTACT FORM (DETAIL)
// ===========================
const agentForm = document.getElementById('agentContactForm');
if (agentForm) {
  agentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = agentForm.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = 'Sent! ✓'; btn.style.background = '#10b981'; btn.disabled = true; }
    setTimeout(() => {
      agentForm.reset();
      if (btn) { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; }
    }, 3000);
  });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
const animEls = document.querySelectorAll('.property-card, .agent-card, .testimonial-card, .area-card, .why-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  observer.observe(el);
});

// ===========================
// ACTIVE NAV LINK
// ===========================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
});