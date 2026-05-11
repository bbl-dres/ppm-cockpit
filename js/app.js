// HTML-escape any string interpolated into a template literal that will be assigned
// to .innerHTML / setHTML. Use for every value derived from data, labels, or URL params.
const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, c => HTML_ESCAPES[c]);
}

let properties = [];
let filteredProperties = [];
let dataReferences = {};
let searchQuery = '';
let currentView = 'gallery';
let map = null;
let mapLoaded = false;
let markers = [];
let markersMap = new Map();

// Advanced filter state
let advancedFilters = {
  status: new Set(),          // Status filter
  teilportfolio: new Set(),   // Teilportfolio filter
  siaPhase: new Set(),        // SIA Phase filter
  plbh: new Set(),            // PLBH (Project Manager) filter
  projektzielStatus: new Set(),  // Projektziele filter
  risikoStatus: new Set()     // Risiken filter
};

// Unique values from data (populated after load)
let filterOptions = {
  status: [],
  teilportfolio: [],
  siaPhase: [],
  plbh: [],
  projektzielStatus: [],
  risikoStatus: []
};

// Carousel state
let carouselImages = [];
let carouselIndex = 0;

const FILTER_KEYS = ['status', 'teilportfolio', 'siaPhase', 'plbh', 'projektzielStatus', 'risikoStatus'];

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {
    view: params.get('view'),
    id: params.get('id'),
    q: params.get('q'),
    tab: params.get('tab')
  };
  FILTER_KEYS.forEach(key => { result[key] = params.get(key); });
  return result;
}

// Build URLSearchParams reflecting current list-view state (view, search, filters).
// Used by both updateUrlParams (non-detail branch) and closeDetailView.
function buildListSearchParams() {
  const params = new URLSearchParams();
  if (currentView !== 'gallery') params.set('view', currentView);
  if (searchQuery) params.set('q', searchQuery);
  FILTER_KEYS.forEach(key => {
    if (advancedFilters[key].size > 0) {
      params.set(key, Array.from(advancedFilters[key]).join(','));
    }
  });
  return params;
}

function updateUrlParams() {
  let params;
  if (currentDetailProjectId) {
    params = new URLSearchParams();
    params.set('id', currentDetailProjectId);
    if (currentDetailTab && currentDetailTab !== 'uebersicht') {
      params.set('tab', currentDetailTab);
    }
  } else {
    params = buildListSearchParams();
  }
  const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
  window.history.replaceState({}, '', newUrl);
}

function loadFiltersFromUrl() {
  const params = getUrlParams();
  if (params.view && ['gallery', 'list', 'map'].includes(params.view)) currentView = params.view;
  if (params.q) {
    searchQuery = params.q;
    document.getElementById('searchInput').value = searchQuery;
  }
  FILTER_KEYS.forEach(key => {
    if (params[key]) {
      params[key].split(',').forEach(val => advancedFilters[key].add(val));
    }
  });
}

// Status helper functions
function getStatusClass(status) {
  if (!status) return 'status-unknown';
  const classMap = {
    'planned': 'status-pending',
    'active': 'status-active',
    'on_hold': 'status-inactive',
    'completed': 'status-sold',
    'cancelled': 'status-unknown'
  };
  return classMap[status.toLowerCase()] || 'status-unknown';
}
function getStatusLabel(status) {
  if (!status) return 'Unbekannt';
  const labels = {
    'planned': 'Geplant',
    'active': 'Aktiv',
    'on_hold': 'Sistiert',
    'completed': 'Abgeschlossen',
    'cancelled': 'Abgebrochen'
  };
  return labels[status.toLowerCase()] || status;
}
function getMarkerClass(status) {
  if (!status) return 'marker-unknown';
  const classMap = {
    'planned': 'marker-pending',
    'active': 'marker-active',
    'on_hold': 'marker-inactive',
    'completed': 'marker-sold',
    'cancelled': 'marker-unknown'
  };
  return classMap[status.toLowerCase()] || 'marker-unknown';
}

// Currency formatting helper
function formatCurrency(value) {
  if (value === null || value === undefined) return '-';
  return 'CHF ' + new Intl.NumberFormat('de-CH').format(value);
}

// Compact stat formatter for total-investment box: thousand- or million-grouped.
function formatTotalInvestment(value) {
  const v = value || 0;
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + ' Mio.';
  if (v >= 1_000)     return (v / 1_000).toFixed(0) + ' Tsd.';
  return new Intl.NumberFormat('de-CH').format(v);
}

// Calculate BKP 1-9 total costs (IST)
function calculateBkpTotal(kostenBkp) {
  if (!kostenBkp) return 0;
  let total = 0;
  for (let i = 1; i <= 9; i++) {
    const bkp = kostenBkp[`bkp${i}`];
    if (bkp && bkp.chfKosten) {
      total += bkp.chfKosten;
    }
  }
  return total;
}

// Calculate BKP 2 / m² GF (IST)
function calculateBkp2PerGf(project) {
  const bkp2 = project?.kostenBkp?.bkp2?.chfKosten;
  const gf = project?.grundgroessen?.gebaeudeflaechen?.gf;
  if (!bkp2 || !gf || gf === 0) return null;
  return bkp2 / gf;
}

// Calculate BKP 2 / m³ GV (IST)
function calculateBkp2PerGv(project) {
  const bkp2 = project?.kostenBkp?.bkp2?.chfKosten;
  const gv = project?.grundgroessen?.gebaeudevolumen?.gv;
  if (!bkp2 || !gv || gv === 0) return null;
  return bkp2 / gv;
}

// Render cost comparison visualization
function renderCostComparison(sollValue, istValue) {
  if (!sollValue || sollValue === 0) {
    return '<div class="cost-comparison"><div class="cost-comparison-header">Kosten (BKP 1-9)</div><div class="cost-comparison-empty">Keine SOLL-Werte vorhanden</div></div>';
  }

  const difference = istValue - sollValue;
  const percentDiff = ((istValue / sollValue) - 1) * 100;
  const displayPercent = Math.abs(percentDiff).toFixed(1);

  // Determine status class
  let statusClass = 'on-budget';
  let percentSign = '';
  if (percentDiff < -0.5) {
    statusClass = 'under-budget';
    percentSign = '-';
  } else if (percentDiff > 10) {
    statusClass = 'critical';
    percentSign = '+';
  } else if (percentDiff > 0.5) {
    statusClass = 'over-budget';
    percentSign = '+';
  }

  // Calculate bar width (cap at 120% for display)
  const barPercent = Math.min((istValue / sollValue) * 100, 120);
  // Target marker position (100% of SOLL = where target line sits)
  const targetPosition = Math.min(100 / (barPercent / 100), 100);

  return `
    <div class="cost-comparison">
      <div class="cost-comparison-header">Kosten (BKP 1-9)</div>
      <div class="cost-comparison-row">
        <span class="cost-comparison-label">SOLL</span>
        <span class="cost-comparison-value">${formatCurrency(sollValue)}</span>
      </div>
      <div class="cost-comparison-row">
        <span class="cost-comparison-label">IST</span>
        <span class="cost-comparison-value">${formatCurrency(istValue)}</span>
      </div>
      <div class="cost-comparison-bar">
        <div class="cost-comparison-bar-fill ${statusClass}" style="width: ${barPercent}%"></div>
        <div class="cost-comparison-bar-target" style="left: ${targetPosition}%"></div>
      </div>
      <div class="cost-comparison-footer">
        <span class="cost-comparison-percent ${statusClass}">${percentSign}${displayPercent}%</span>
      </div>
    </div>
  `;
}

// Render compact metric comparison (for BKP 2 / m² GF and BKP 2 / m³ GV)
function renderMetricComparison(label, sollValue, istValue, unit) {
  if (!sollValue || sollValue === 0 || !istValue) {
    return `
      <div class="metric-comparison-row">
        <span class="metric-label">${label}</span>
        <span class="metric-values">-</span>
      </div>
    `;
  }

  const percentDiff = ((istValue / sollValue) - 1) * 100;
  const displayPercent = Math.abs(percentDiff).toFixed(1);

  // Determine status class
  let statusClass = 'on-budget';
  let percentSign = '';
  if (percentDiff < -0.5) {
    statusClass = 'under-budget';
    percentSign = '-';
  } else if (percentDiff > 10) {
    statusClass = 'critical';
    percentSign = '+';
  } else if (percentDiff > 0.5) {
    statusClass = 'over-budget';
    percentSign = '+';
  }

  const formattedSoll = new Intl.NumberFormat('de-CH').format(Math.round(sollValue));
  const formattedIst = new Intl.NumberFormat('de-CH').format(Math.round(istValue));

  return `
    <div class="metric-comparison-row">
      <span class="metric-label">${label}</span>
      <div class="metric-values">
        <span class="metric-soll">${formattedSoll}</span>
        <span class="metric-separator">→</span>
        <span class="metric-ist">${formattedIst} ${unit}</span>
        <span class="cost-comparison-percent ${statusClass}">${percentSign}${displayPercent}%</span>
      </div>
    </div>
  `;
}

// SubPortfolio label helper
function getSubPortfolioLabel(subPortfolio, references) {
  if (!subPortfolio || !references?.subPortfolio) return '-';
  const ref = references.subPortfolio.find(r => r.id === subPortfolio);
  return ref ? ref.label : subPortfolio;
}

// Ampel status helper functions
function getAmpelStatusLabel(status, references) {
  if (!status || !references?.ampelStatus) return '-';
  const ref = references.ampelStatus.find(r => r.id === status);
  return ref ? ref.label : status;
}
function getAmpelStatusClass(status) {
  if (!status) return '';
  const classMap = {
    'auf-kurs': 'ampel-dot-auf-kurs',
    'gefaehrdet': 'ampel-dot-gefaehrdet',
    'kritisch': 'ampel-dot-kritisch'
  };
  return classMap[status] || '';
}
function getAmpelTagClass(status) {
  if (!status) return '';
  const classMap = {
    'auf-kurs': 'ampel-tag-auf-kurs',
    'gefaehrdet': 'ampel-tag-gefaehrdet',
    'kritisch': 'ampel-tag-kritisch'
  };
  return classMap[status] || '';
}

// Format full address from new fields
function formatAddress(prop) {
  const parts = [];
  if (prop.street) {
    parts.push(prop.street + (prop.streetnumber ? ' ' + prop.streetnumber : ''));
  }
  if (prop.zip || prop.city) {
    parts.push([prop.zip, prop.city].filter(Boolean).join(' '));
  }
  return parts.join(', ') || 'Keine Adresse';
}

// BBL-passende Bilder: Bürogebäude, Verwaltung, Fassaden, Sanierung, technische Anlagen
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', // Modernes Bürogebäude Glasfassade
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a',    // Verwaltungsgebäude Fassade
  'https://images.unsplash.com/photo-1497366216548-37526070297c', // Büro Innenausbau modern
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a', // Gebäudefassade Sanierung
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72'  // Bürogebäude Eingangsbereich
];
const PLACEHOLDER_IMAGE_QUERY = '?w=400&h=300&fit=crop';

function hashId(id) {
  return String(id).split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0) | 0, 0);
}

function getPlaceholderImage(id) {
  const index = Math.abs(hashId(id)) % PLACEHOLDER_IMAGES.length;
  return PLACEHOLDER_IMAGES[index] + PLACEHOLDER_IMAGE_QUERY;
}

function getProjectGalleryImages(id) {
  // Rotate array based on project ID so each project starts with a different image
  const startIndex = Math.abs(hashId(id)) % PLACEHOLDER_IMAGES.length;
  const rotated = [...PLACEHOLDER_IMAGES.slice(startIndex), ...PLACEHOLDER_IMAGES.slice(0, startIndex)];
  return rotated.map(img => img + PLACEHOLDER_IMAGE_QUERY);
}

// Extract unique filter options from data - only values that exist in projects
function extractFilterOptions() {
  const statuses = new Set();
  const teilportfolioValues = new Set();
  const siaPhaseValues = new Set();
  const plbhValues = new Set();
  const projektzielStatusValues = new Set();
  const risikoStatusValues = new Set();

  properties.forEach(prop => {
    if (prop.status) statuses.add(prop.status);
    if (prop.subPortfolio) teilportfolioValues.add(prop.subPortfolio);
    if (prop.siaPhase) siaPhaseValues.add(prop.siaPhase);
    if (prop.projectManager) plbhValues.add(prop.projectManager);
    if (prop.projektzielStatus) projektzielStatusValues.add(prop.projektzielStatus);
    if (prop.risikoStatus) risikoStatusValues.add(prop.risikoStatus);
  });

  // Sort status by reference order
  const statusOrder = (dataReferences.projectStatus || []).map(r => r.id);
  filterOptions.status = Array.from(statuses).sort((a, b) => statusOrder.indexOf(a) - statusOrder.indexOf(b));

  // Sort teilportfolio by reference order, only include values that exist in projects
  const teilportfolioOrder = (dataReferences.subPortfolio || []).map(r => r.id);
  filterOptions.teilportfolio = Array.from(teilportfolioValues).sort((a, b) => teilportfolioOrder.indexOf(a) - teilportfolioOrder.indexOf(b));

  // Sort siaPhase by reference order, only include values that exist in projects
  const siaPhaseOrder = (dataReferences.siaPhases || []).map(r => r.id);
  filterOptions.siaPhase = Array.from(siaPhaseValues).sort((a, b) => siaPhaseOrder.indexOf(a) - siaPhaseOrder.indexOf(b));

  // PLBH is extracted from actual data since there's no reference list
  filterOptions.plbh = Array.from(plbhValues).sort();

  // Sort projektzielStatus and risikoStatus by reference order
  const ampelStatusOrder = (dataReferences.ampelStatus || []).map(r => r.id);
  filterOptions.projektzielStatus = Array.from(projektzielStatusValues).sort((a, b) => ampelStatusOrder.indexOf(a) - ampelStatusOrder.indexOf(b));
  filterOptions.risikoStatus = Array.from(risikoStatusValues).sort((a, b) => ampelStatusOrder.indexOf(a) - ampelStatusOrder.indexOf(b));
}

// Check if any filters are active
function hasActiveFilters() {
  return advancedFilters.status.size > 0 ||
         advancedFilters.teilportfolio.size > 0 ||
         advancedFilters.siaPhase.size > 0 ||
         advancedFilters.plbh.size > 0 ||
         advancedFilters.projektzielStatus.size > 0 ||
         advancedFilters.risikoStatus.size > 0 ||
         searchQuery;
}

// Count total active filters (excluding search)
function getActiveFilterCount() {
  return advancedFilters.status.size +
         advancedFilters.teilportfolio.size +
         advancedFilters.siaPhase.size +
         advancedFilters.plbh.size +
         advancedFilters.projektzielStatus.size +
         advancedFilters.risikoStatus.size;
}

// Get status counts from all properties
function getStatusCounts() {
  const counts = {};
  properties.forEach(prop => {
    const status = prop.status || 'unknown';
    counts[status] = (counts[status] || 0) + 1;
  });
  return counts;
}

// Update the filter button appearance and count
function updateFilterButtonState() {
  const btn = document.getElementById('filterBtn');
  const countEl = document.getElementById('filterCount');
  const count = getActiveFilterCount();

  if (count > 0) {
    btn.classList.add('has-filters');
    countEl.textContent = count;
    countEl.style.display = 'inline';
  } else {
    btn.classList.remove('has-filters');
    countEl.style.display = 'none';
  }
}

// Render status pills and reset button
function renderStatusPills() {
  const container = document.getElementById('filterPills');
  const counts = getStatusCounts();

  // Build pills HTML for each status - use reference values to show all statuses even with count 0
  const allStatuses = (dataReferences.projectStatus || []).map(ref => ref.id);
  let html = allStatuses.map(status => {
    const isActive = advancedFilters.status.has(status);
    const count = counts[status] || 0;
    return `
      <button class="filter-pill ${isActive ? 'active' : ''}" data-status="${esc(status)}">
        ${esc(getStatusLabel(status))} (${count})
        <span class="material-icons-outlined close-icon">close</span>
      </button>
    `;
  }).join('');

  // Add reset button
  html += `
    <button class="reset-filters ${hasActiveFilters() ? 'visible' : ''}" id="resetFilters" title="Alle Filter zurücksetzen">
      <span class="material-icons-outlined">replay</span>
    </button>
  `;

  container.innerHTML = html;

  // Add click handlers for status pills
  container.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const status = pill.dataset.status;
      if (advancedFilters.status.has(status)) {
        advancedFilters.status.delete(status);
      } else {
        advancedFilters.status.add(status);
      }
      applyFilters();
      renderFilterModal();
    });
  });

  // Add click handler for reset button
  const resetBtn = container.querySelector('#resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }
}

// Reset all filters
function resetAllFilters() {
  Object.keys(advancedFilters).forEach(key => advancedFilters[key].clear());
  searchQuery = '';
  document.getElementById('searchInput').value = '';
  applyFilters();
  if (document.getElementById('filterModalOverlay').classList.contains('active')) {
    renderFilterModal();
  }
}

// Reset to home page (clear all filters, views, and URL params)
function resetToHome() {
  // Close detail view if open
  if (currentDetailProjectId) {
    closeDetailView(true);
  }
  // Reset all filters
  resetAllFilters();
  // Reset to default gallery view
  setView('gallery');
  // Clear URL parameters
  window.history.pushState({}, '', window.location.pathname);
}

// Apply all filters
function applyFilters() {
  filteredProperties = properties.filter(prop => {
    // Search query filter - search across project number, project name, city, region
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [prop.projectNumber, prop.projectName, prop.city, prop.region, prop.projectManager].map(f => (f || '').toString().toLowerCase());
      if (!searchFields.some(field => field.includes(query))) return false;
    }

    // Status filter
    if (advancedFilters.status.size > 0 && !advancedFilters.status.has(prop.status)) {
      return false;
    }

    // Teilportfolio filter
    if (advancedFilters.teilportfolio.size > 0 && !advancedFilters.teilportfolio.has(prop.subPortfolio)) {
      return false;
    }

    // SIA Phase filter
    if (advancedFilters.siaPhase.size > 0 && !advancedFilters.siaPhase.has(prop.siaPhase)) {
      return false;
    }

    // PLBH filter
    if (advancedFilters.plbh.size > 0 && !advancedFilters.plbh.has(prop.projectManager)) {
      return false;
    }

    // Projektziele filter
    if (advancedFilters.projektzielStatus.size > 0 && !advancedFilters.projektzielStatus.has(prop.projektzielStatus)) {
      return false;
    }

    // Risiken filter
    if (advancedFilters.risikoStatus.size > 0 && !advancedFilters.risikoStatus.has(prop.risikoStatus)) {
      return false;
    }

    return true;
  });

  if (currentView === 'gallery') renderCards();
  else if (currentView === 'list') renderListView();
  else if (currentView === 'map') renderMapView();

  updateUrlParams();
  updateFilterButtonState();
  renderStatusPills();
}

// Render filter modal options
function renderFilterModal() {
  // Helper to create option HTML with close icon
  const createOption = (isSelected, filterKey, value, label) => `
    <div class="filter-option ${isSelected ? 'selected' : ''}" data-filter="${esc(filterKey)}" data-value="${esc(value)}">
      <span>${esc(label)}</span>
      <span class="material-icons-outlined close-icon">close</span>
    </div>
  `;

  // Status filter - only show values that exist in projects
  const statusContainer = document.getElementById('filterStatus');
  if (statusContainer) {
    statusContainer.innerHTML = filterOptions.status.map(s =>
      createOption(advancedFilters.status.has(s), 'status', s, getStatusLabel(s))
    ).join('');
  }

  // Projektziele filter
  const projektzielStatusContainer = document.getElementById('filterProjektzielStatus');
  if (projektzielStatusContainer) {
    projektzielStatusContainer.innerHTML = filterOptions.projektzielStatus.map(s =>
      createOption(advancedFilters.projektzielStatus.has(s), 'projektzielStatus', s, getAmpelStatusLabel(s, dataReferences))
    ).join('');
  }

  // Risiken filter
  const risikoStatusContainer = document.getElementById('filterRisikoStatus');
  if (risikoStatusContainer) {
    risikoStatusContainer.innerHTML = filterOptions.risikoStatus.map(s =>
      createOption(advancedFilters.risikoStatus.has(s), 'risikoStatus', s, getAmpelStatusLabel(s, dataReferences))
    ).join('');
  }

  // Teilportfolio filter
  const teilportfolioContainer = document.getElementById('filterTeilportfolio');
  if (teilportfolioContainer) {
    teilportfolioContainer.innerHTML = filterOptions.teilportfolio.map(t =>
      createOption(advancedFilters.teilportfolio.has(t), 'teilportfolio', t, getSubPortfolioLabel(t, dataReferences))
    ).join('');
  }

  // SIA Phase filter
  const siaPhaseContainer = document.getElementById('filterSiaPhase');
  if (siaPhaseContainer) {
    siaPhaseContainer.innerHTML = filterOptions.siaPhase.map(s =>
      createOption(advancedFilters.siaPhase.has(s), 'siaPhase', s, getSiaPhaseLabel(s))
    ).join('');
  }

  // PLBH filter
  const plbhContainer = document.getElementById('filterPlbh');
  if (plbhContainer) {
    plbhContainer.innerHTML = filterOptions.plbh.map(p =>
      createOption(advancedFilters.plbh.has(p), 'plbh', p, p)
    ).join('');
  }

  // Add click handlers
  document.querySelectorAll('.filter-modal .filter-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const filterKey = opt.dataset.filter;
      const filterValue = opt.dataset.value;

      if (advancedFilters[filterKey].has(filterValue)) {
        advancedFilters[filterKey].delete(filterValue);
        opt.classList.remove('selected');
      } else {
        advancedFilters[filterKey].add(filterValue);
        opt.classList.add('selected');
      }

      applyFilters();
      // Update close icons visibility
      renderFilterModal();
    });
  });
}

// Filter Modal open/close
function openFilterModal() {
  renderFilterModal();
  document.getElementById('filterModalOverlay').classList.add('active');
  document.getElementById('filterBtn').classList.add('panel-open');
  document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
  document.getElementById('filterModalOverlay').classList.remove('active');
  document.getElementById('filterBtn').classList.remove('panel-open');
  document.body.style.overflow = '';
}

// --- Image Carousel Functions ---
function openCarousel(images, startIndex = 0) {
  carouselImages = images;
  carouselIndex = startIndex;
  updateCarouselView();
  document.getElementById('carouselOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCarousel() {
  document.getElementById('carouselOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateCarousel(direction) {
  const newIndex = carouselIndex + direction;
  if (newIndex >= 0 && newIndex < carouselImages.length) {
    carouselIndex = newIndex;
    updateCarouselView();
  }
}

function goToCarouselImage(index) {
  if (index >= 0 && index < carouselImages.length) {
    carouselIndex = index;
    updateCarouselView();
  }
}

function updateCarouselView() {
  // Update counter
  document.getElementById('carouselCounter').textContent = `${carouselIndex + 1} / ${carouselImages.length}`;

  // Update main image with higher resolution
  const currentImage = carouselImages[carouselIndex].replace('w=400&h=300', 'w=1200&h=900');
  document.getElementById('carouselImage').src = currentImage;

  // Update navigation buttons
  document.querySelector('.carousel-nav-btn.prev').disabled = carouselIndex === 0;
  document.querySelector('.carousel-nav-btn.next').disabled = carouselIndex === carouselImages.length - 1;

  // Update thumbnails
  const thumbsContainer = document.getElementById('carouselThumbnails');
  thumbsContainer.innerHTML = carouselImages.map((img, idx) => `
    <button type="button" class="carousel-thumb ${idx === carouselIndex ? 'active' : ''}"
         style="background-image: url('${esc(img)}')"
         data-action="carousel-go" data-index="${idx}"
         aria-label="Bild ${idx + 1} anzeigen"></button>
  `).join('');
}

function getDataToRender() { return filteredProperties; }

const EMPTY_STATE_HTML = '<div class="grid-empty">Keine Bauprojekte gefunden</div>';

function renderCards() {
  const grid = document.getElementById('objectGrid');
  const data = getDataToRender();
  document.getElementById('objectCount').textContent = data.length;
  if (data.length === 0) {
    grid.innerHTML = EMPTY_STATE_HTML;
    return;
  }
  grid.innerHTML = data.map(prop => `
    <div class="card" data-id="${esc(prop.id)}" tabindex="0" role="button" aria-label="${esc(prop.projectNumber || prop.projectName || 'Projekt')} öffnen">
      <div class="card-image" style="background-image: url('${getPlaceholderImage(prop.id)}')">
        <div class="image-tags">
          <span class="status-tag ${getStatusClass(prop.status)}" data-filter="status" data-value="${esc(prop.status)}">${esc(getStatusLabel(prop.status))}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-label">${esc(prop.projectNumber) || '-'}</div>
        <div class="card-location">${esc(prop.projectName) || '-'}</div>
        <div class="card-details">
          <span class="card-detail-label">Projektziele:</span><span class="card-detail-value ampel-value" data-filter="projektzielStatus" data-value="${esc(prop.projektzielStatus)}"><span class="ampel-dot ${getAmpelStatusClass(prop.projektzielStatus)}"></span>${esc(getAmpelStatusLabel(prop.projektzielStatus, dataReferences))}</span>
          <span class="card-detail-label">Risiken:</span><span class="card-detail-value ampel-value" data-filter="risikoStatus" data-value="${esc(prop.risikoStatus)}"><span class="ampel-dot ${getAmpelStatusClass(prop.risikoStatus)}"></span>${esc(getAmpelStatusLabel(prop.risikoStatus, dataReferences))}</span>
        </div>
        <div class="card-details card-details--bordered">
          <span class="card-detail-label">Teilportfolio:</span><span class="card-detail-value">${esc(getSubPortfolioLabel(prop.subPortfolio, dataReferences))}</span>
          <span class="card-detail-label">PLBH:</span><span class="card-detail-value">${esc(prop.projectManager) || '-'}</span>
          <span class="card-detail-label">Investition:</span><span class="card-detail-value">${formatCurrency(prop.plannedTotalCost)}</span>
          <span class="card-detail-label">Letzte Änderung:</span><span class="card-detail-value">${esc(prop.lastModified) || '-'}</span>
        </div>
      </div>
    </div>`).join('');
}

function renderListView() {
  const data = getDataToRender();
  document.getElementById('objectCount').textContent = data.length;

  // Update stats
  document.getElementById('statsTotalProjects').textContent = data.length;
  document.getElementById('statsOnHold').textContent = data.filter(p => p.status && p.status.toLowerCase() === 'on_hold').length;
  document.getElementById('statsPlanned').textContent = data.filter(p => p.status && p.status.toLowerCase() === 'planned').length;

  // Calculate total investment
  const totalInvestment = data.reduce((sum, p) => sum + (p.plannedTotalCost || 0), 0);
  document.getElementById('statsTotalInvestment').textContent = formatTotalInvestment(totalInvestment);

  const tbody = document.getElementById('listTableBody');
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="list-empty">Keine Bauprojekte gefunden</td></tr>';
    return;
  }
  tbody.innerHTML = data.map(prop => `
    <tr data-id="${esc(prop.id)}" tabindex="0" aria-label="${esc(prop.projectNumber || prop.projectName || 'Projekt')} öffnen">
      <td><span class="material-icons-outlined object-icon">fullscreen</span></td>
      <td>${esc(prop.projectNumber) || '-'}</td>
      <td>${esc(prop.projectName) || '-'}</td>
      <td>${esc(prop.projectManager) || '-'}</td>
      <td>${formatCurrency(prop.plannedTotalCost)}</td>
      <td>${prop.projektzielStatus ? `<span class="status-tag ${getAmpelTagClass(prop.projektzielStatus)}" data-filter="projektzielStatus" data-value="${esc(prop.projektzielStatus)}">${esc(getAmpelStatusLabel(prop.projektzielStatus, dataReferences))}</span>` : '-'}</td>
      <td>${prop.risikoStatus ? `<span class="status-tag ${getAmpelTagClass(prop.risikoStatus)}" data-filter="risikoStatus" data-value="${esc(prop.risikoStatus)}">${esc(getAmpelStatusLabel(prop.risikoStatus, dataReferences))}</span>` : '-'}</td>
      <td><span class="status-tag ${getStatusClass(prop.status)}" data-filter="status" data-value="${esc(prop.status)}">${esc(getStatusLabel(prop.status))}</span></td>
    </tr>`).join('');
}

// --- SIDEBAR RENDER FUNCTION ---
function renderMapView() {
  const data = getDataToRender();
  document.getElementById('objectCount').textContent = data.length;
  const sidebar = document.getElementById('mapSidebar');

  // Simplified structure with status tag
  sidebar.innerHTML = data.map(prop => `
    <div class="map-sidebar-item" data-id="${esc(prop.id)}" tabindex="0" role="button" aria-label="${esc(prop.projectNumber || prop.projectName || 'Projekt')} auf Karte zeigen">
      <div class="map-sidebar-image" style="background-image: url('${getPlaceholderImage(prop.id)}')">
        <div class="image-tags">
          <span class="status-tag ${getStatusClass(prop.status)}" data-filter="status" data-value="${esc(prop.status)}">${esc(getStatusLabel(prop.status))}</span>
        </div>
      </div>
      <div class="map-sidebar-content">
        <div class="map-sidebar-title">${esc(prop.projectNumber) || '-'}</div>
        <div class="map-sidebar-price">${esc(prop.projectName) || '-'}</div>
      </div>
    </div>`).join('');

  if (!map) {
    initializeMap();
  } else if (mapLoaded) {
    updateMapMarkers(data);
  }
  // Wenn map existiert aber noch nicht geladen ist,
  // werden die Marker automatisch beim 'load'-Event aktualisiert
}

function flyToProperty(id) {
  const prop = properties.find(p => p.id === id);
  if (!prop || !prop.lat || !prop.lng) return;
  document.querySelectorAll('.map-sidebar-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.id === id) item.classList.add('active');
  });
  document.querySelectorAll('.marker').forEach(m => m.classList.remove('selected'));
  const md = markersMap.get(id);
  if (md) {
    md.marker.getElement().classList.add('selected');
    map.flyTo({ center: [prop.lng, prop.lat], zoom: 13, duration: 1500 });
    setTimeout(() => {
      const popup = md.marker.getPopup();
      if (popup && !popup.isOpen()) {
        md.marker.togglePopup();
      }
    }, 1600);
  }
}

function initializeMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: [8.2275, 46.8182], zoom: 7
  });
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  map.on('load', () => {
    mapLoaded = true;
    updateMapMarkers(getDataToRender());
  });
}

function updateMapMarkers(data) {
  markers.forEach(marker => marker.remove());
  markers = []; markersMap.clear();
  const bounds = new maplibregl.LngLatBounds();
  data.forEach(prop => {
    if (prop.lat && prop.lng) {
      const el = document.createElement('div');
      el.className = `marker ${getMarkerClass(prop.status)}`;
      el.innerHTML = '<span class="material-icons-outlined">home</span>';
      el.addEventListener('click', () => {
        document.querySelectorAll('.marker').forEach(m => m.classList.remove('selected'));
        el.classList.add('selected');
        flyToProperty(prop.id);
      });

      const nextMs = getNextMilestone(prop.projektziele);
      const popup = new maplibregl.Popup({ offset: 25, maxWidth: '300px' }).setHTML(`
        <div class="popup-image" style="background-image: url('${getPlaceholderImage(prop.id)}')"></div>
        <div class="popup-content">
          <div class="popup-title">${esc(prop.projectNumber) || '-'}</div>
          <div class="popup-location">${esc(prop.projectName) || '-'}</div>
          <div class="popup-info">
            <div class="popup-info-row"><span class="material-icons-outlined">flag</span>${esc(getSiaPhaseShort(prop.siaPhase))}</div>
            <div class="popup-info-row"><span class="material-icons-outlined">payments</span>${formatCurrency(prop.plannedTotalCost)}</div>
            ${nextMs ? `<div class="popup-info-row"><span class="material-icons-outlined">event</span>${esc(nextMs.name)}: ${esc(nextMs.date)}</div>` : ''}
            <div class="popup-info-row"><span class="material-icons-outlined">person</span>${esc(prop.projectManager) || '-'}</div>
          </div>
          <div class="popup-status">${esc(getStatusLabel(prop.status))}</div>
          <button class="popup-link" data-id="${esc(prop.id)}">Details anzeigen</button>
        </div>`);

      const marker = new maplibregl.Marker({ element: el }).setLngLat([prop.lng, prop.lat]).setPopup(popup).addTo(map);
      markers.push(marker);
      markersMap.set(prop.id, { marker, prop });
      bounds.extend([prop.lng, prop.lat]);
    }
  });
  if (markers.length > 0) map.fitBounds(bounds, { padding: 80, maxZoom: 10 });
}

function setView(view) {
  currentView = view;
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.remove('active');
    const label = btn.querySelector('.view-btn-label');
    if (label) label.remove();
  });
  const activeBtn = document.querySelector(`.view-btn[data-view="${view}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    const label = document.createElement('span');
    label.className = 'view-btn-label';
    label.textContent = { gallery: 'Galerie', list: 'Liste', map: 'Karte' }[view];
    activeBtn.appendChild(label);
  }

  document.getElementById('galleryView').classList.remove('active');
  document.getElementById('listView').classList.remove('active');
  document.getElementById('mapView').classList.remove('active');

  if (view === 'gallery') {
    document.getElementById('galleryView').classList.add('active');
    renderCards();
  } else if (view === 'list') {
    document.getElementById('listView').classList.add('active');
    renderListView();
  } else if (view === 'map') {
    document.getElementById('mapView').classList.add('active');
    renderMapView();
    setTimeout(() => { if (map) map.resize(); }, 150);
  }
  updateUrlParams();
}

function setupViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view) setView(view);
    });
  });
}

function exportToExcel() { alert('Excel Export Placeholder'); }

function setupFilterModal() {
  // Open filter modal
  document.getElementById('filterBtn').addEventListener('click', openFilterModal);

  // Close filter modal
  document.getElementById('filterCloseBtn').addEventListener('click', closeFilterModal);
  document.getElementById('filterModalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeFilterModal();
  });

  // Reset filters button in modal
  document.getElementById('filterResetBtn').addEventListener('click', () => {
    resetAllFilters();
  });

  // Keyboard navigation (handles carousel, filter modal, and detail view)
  document.addEventListener('keydown', (e) => {
    const carouselActive = document.getElementById('carouselOverlay').classList.contains('active');

    // Carousel keyboard controls
    if (carouselActive) {
      if (e.key === 'Escape') {
        closeCarousel();
      } else if (e.key === 'ArrowLeft') {
        navigateCarousel(-1);
      } else if (e.key === 'ArrowRight') {
        navigateCarousel(1);
      }
      return;
    }

    // Other Escape handlers
    if (e.key === 'Escape') {
      // Close detail view first if open
      if (document.getElementById('detailView').classList.contains('active')) {
        closeDetailView();
        return;
      }
      if (document.getElementById('filterModalOverlay').classList.contains('active')) {
        closeFilterModal();
      }
    }
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value.trim();
      applyFilters();
    }, 300);
  });
}

// Open login dialog
function openLoginDialog() {
  const overlay = document.getElementById('loginDialogOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Clear form
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
}

// Close login dialog
function closeLoginDialog() {
  const overlay = document.getElementById('loginDialogOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Submit login (mockup - just closes dialog)
function submitLogin() {
  closeLoginDialog();
}

// --- Detail View State ---
let detailMap = null;
let currentDetailProjectId = null;
let currentDetailTab = 'uebersicht';

// Get SIA phase label (just the number like "32")
function getSiaPhaseNumber(siaPhase) {
  if (!siaPhase) return '-';
  // Extract just the number from 'sia_32' -> '32'
  const match = siaPhase.match(/sia_(\d+)/);
  return match ? match[1] : siaPhase;
}

// Get construction type label
function getConstructionTypeLabel(typeId) {
  if (!typeId || !dataReferences?.constructionTypes) return '-';
  const ref = dataReferences.constructionTypes.find(r => r.id === typeId);
  return ref ? ref.label : '-';
}

// Get SIA phase full label
function getSiaPhaseLabel(siaPhase) {
  if (!siaPhase || !dataReferences?.siaPhases) return '-';
  const ref = dataReferences.siaPhases.find(r => r.id === siaPhase);
  return ref ? ref.label : '-';
}

// Get SIA phase short label (e.g., "SIA 32")
function getSiaPhaseShort(siaPhase) {
  if (!siaPhase) return '-';
  return siaPhase.replace('sia_', 'SIA ').toUpperCase();
}

// Get next pending milestone
function getNextMilestone(projektziele) {
  if (!projektziele?.meilensteine) return null;
  const pending = projektziele.meilensteine.find(m => m.status === 'pending');
  return pending ? { name: pending.name, date: pending.plannedDate } : null;
}

// Get building status label
function getBuildingStatusLabel(statusId) {
  if (!statusId || !dataReferences?.buildingStatus) return '-';
  const ref = dataReferences.buildingStatus.find(r => r.id === statusId);
  return ref ? ref.label : '-';
}

// Get country label
function getCountryLabel(countryId) {
  if (!countryId || !dataReferences?.countries) return '-';
  const ref = dataReferences.countries.find(r => r.id === countryId);
  return ref ? ref.label : '-';
}

// Open detail view
function openDetailView(projectId, skipHistory = false, initialTab = null) {
  const project = properties.find(p => p.id === projectId);
  if (!project) return;

  currentDetailProjectId = projectId;

  // Get tab from: 1) initialTab parameter, 2) URL, 3) current tab, 4) default
  const urlParams = getUrlParams();
  const tabToShow = initialTab || urlParams.tab || currentDetailTab || 'uebersicht';

  // Render sidebar with all projects
  renderDetailSidebar();

  // Show detail view
  document.getElementById('detailView').classList.add('active');
  document.querySelector('.search-section').style.display = 'none';
  document.getElementById('main').style.display = 'none';

  // Render the appropriate tab content
  switchDetailTab(tabToShow);

  // Update URL with pushState for browser navigation
  if (!skipHistory) {
    const params = new URLSearchParams();
    params.set('id', projectId);
    if (tabToShow !== 'uebersicht') {
      params.set('tab', tabToShow);
    }
    window.history.pushState({ projectId, tab: tabToShow }, '', `${window.location.pathname}?${params.toString()}`);
  }

  // Initialize or update detail map if on uebersicht tab
  if (tabToShow === 'uebersicht') {
    setTimeout(() => {
      initializeDetailMap(project);
    }, 100);
  }
}

// Close detail view
function closeDetailView(skipHistory = false) {
  currentDetailProjectId = null;
  document.getElementById('detailView').classList.remove('active');
  document.querySelector('.search-section').style.display = '';
  document.getElementById('main').style.display = '';

  // Clean up detail map
  if (detailMap) {
    detailMap.remove();
    detailMap = null;
  }

  // Update URL with pushState for browser navigation
  if (!skipHistory) {
    const params = buildListSearchParams();
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }
}

// Render detail sidebar with project list
function renderDetailSidebar() {
  const data = getDataToRender();
  const container = document.getElementById('detailSidebarList');
  document.getElementById('detailProjectCount').textContent = data.length;

  container.innerHTML = data.map(prop => `
    <div class="detail-sidebar-item ${prop.id === currentDetailProjectId ? 'active' : ''}" data-detail-id="${esc(prop.id)}" tabindex="0" role="button" aria-label="${esc(prop.projectNumber || prop.projectName || 'Projekt')} öffnen">
      <span class="material-icons-outlined">fullscreen</span>
      <span class="detail-sidebar-item-text">${esc(prop.projectNumber) || '-'}</span>
    </div>
  `).join('');

  // Add click handlers
  container.querySelectorAll('.detail-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.detailId;
      if (id && id !== currentDetailProjectId) {
        openDetailView(id);
      }
    });
  });

  // Scroll to active item
  const activeItem = container.querySelector('.detail-sidebar-item.active');
  if (activeItem) {
    activeItem.scrollIntoView({ block: 'nearest' });
  }
}

// Render detail content (Übersicht tab)
function renderDetailContent(project) {
  // Update header
  const title = `${project.projectNumber || '-'} - ${project.city || ''} ${project.region || ''}, ${project.projectName || '-'}`;
  document.getElementById('detailHeaderTitle').textContent = title;

  // Get building data
  const building = project.building;

  // Render building section (unified components)
  const renderBuildingSection = () => {
    if (!building) {
      return `
        <div class="tab-section">
          <div class="tab-section-header">Gebäude</div>
          <div class="detail-info-message">
            <span class="material-icons-outlined">info</span>
            <span>Kein Gebäude gefunden</span>
          </div>
        </div>
      `;
    }

    // Format full address
    const addressLine = [building.street, building.streetNumber].filter(Boolean).join(' ') || '-';
    const cityLine = [building.zip, building.city].filter(Boolean).join(' ') || '-';

    return `
      <div class="tab-section">
        <div class="tab-section-header">Gebäude</div>
        <div class="detail-fields">
          <div class="detail-field">
            <span class="detail-field-label">Bezeichnung</span>
            <span class="detail-field-value">${esc(building.designation) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Gebäudenummer</span>
            <span class="detail-field-value">${esc(building.buildingNumber) || '-'}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">EGID</span>
            <span class="detail-field-value">${esc(building.egid) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Grundstücknummer</span>
            <span class="detail-field-value">${esc(building.plotNumber) || '-'}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Gebäudestatus</span>
            <span class="detail-field-value">${esc(getBuildingStatusLabel(building.buildingStatus))}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Subportfolio</span>
            <span class="detail-field-value">${esc(getSubPortfolioLabel(building.subPortfolio, dataReferences))}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Adresse</span>
            <span class="detail-field-value">${esc(addressLine)}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">PLZ / Ort</span>
            <span class="detail-field-value">${esc(cityLine)}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Region/Kanton</span>
            <span class="detail-field-value">${esc(building.region) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Land</span>
            <span class="detail-field-value">${esc(getCountryLabel(building.country))}</span>
          </div>
        </div>
      </div>
    `;
  };

  // Render content (unified components)
  const content = document.getElementById('detailContent');
  content.innerHTML = `
    <h2 class="tab-header">Übersicht</h2>
    <div class="tab-container">
      <div class="detail-media">
        <button type="button" class="detail-image" style="background-image: url('${getPlaceholderImage(project.id)}')" data-action="open-gallery" data-id="${esc(project.id)}" title="Galerie öffnen">
          <div class="detail-image__badge">
            <span class="material-icons-outlined">photo_library</span>
            <span>1 / 5</span>
          </div>
        </button>
        <div class="detail-map-container">
          <div id="detailMap"></div>
        </div>
      </div>

      <div class="tab-section">
        <div class="tab-section-header">Bauprojekt</div>
        <div class="detail-fields">
          <div class="detail-field">
            <span class="detail-field-label">Projektbezeichnung</span>
            <span class="detail-field-value">${esc(project.projectName) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">SIA Phase</span>
            <span class="detail-field-value">${esc(getSiaPhaseNumber(project.siaPhase))}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Projektnummer</span>
            <span class="detail-field-value highlight">${esc(project.projectNumber) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Projektstart</span>
            <span class="detail-field-value">${esc(project.projectStart) || '-'}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Teilportfolio</span>
            <span class="detail-field-value">${esc(getSubPortfolioLabel(project.subPortfolio, dataReferences))}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Bauart</span>
            <span class="detail-field-value">${esc(getConstructionTypeLabel(project.constructionType))}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Projektstatus</span>
            <span class="detail-field-value">${esc(getStatusLabel(project.status))}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Geplante Gesamtkosten</span>
            <span class="detail-field-value">${formatCurrency(project.plannedTotalCost)}</span>
          </div>

          <div class="detail-field">
            <span class="detail-field-label">Projektleiter BBL</span>
            <span class="detail-field-value">${esc(project.projectManager) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Letzte Änderung</span>
            <span class="detail-field-value">${esc(project.lastModified) || '-'}</span>
          </div>
        </div>
      </div>

      ${renderBuildingSection()}
    </div>
  `;
}

// Initialize detail map
function initializeDetailMap(project) {
  const container = document.getElementById('detailMap');
  if (!container) return;

  // Remove existing map if any
  if (detailMap) {
    detailMap.remove();
    detailMap = null;
  }

  // Check if we have coordinates
  if (!project.lat || !project.lng) {
    container.innerHTML = '<div class="detail-map-empty">Keine Standortdaten verfügbar</div>';
    return;
  }

  detailMap = new maplibregl.Map({
    container: 'detailMap',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: [project.lng, project.lat],
    zoom: 15,
    interactive: true
  });

  detailMap.addControl(new maplibregl.NavigationControl(), 'top-right');

  detailMap.on('load', () => {
    // Add marker
    const el = document.createElement('div');
    el.className = `marker ${getMarkerClass(project.status)}`;
    el.innerHTML = '<span class="material-icons-outlined">location_on</span>';

    new maplibregl.Marker({ element: el })
      .setLngLat([project.lng, project.lat])
      .addTo(detailMap);
  });
}

// Format number with thousands separator (Swiss format)
function formatNumber(value, decimals = 0) {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// Format percentage
function formatPercent(value) {
  if (value === null || value === undefined) return '-';
  return (value * 100).toFixed(1) + '%';
}

// Render BKP Cost section
function renderKostenBkpSection(project) {
  const kostenBkp = project.kostenBkp || {};
  const g = project.grundgroessen || {};
  const gsf = g.grundstueckflaechen || {};
  const gfl = g.gebaeudeflaechen || {};
  const gv = g.gebaeudevolumen || {};

  // Reference values
  const gsfValue = gsf.gsf;
  const gfValue = gfl.gf;
  const nfValue = gfl.nf;
  const gvValue = gv.gv;

  // BKP row definitions (hardcoded)
  const bkpRows = [
    { code: 0, name: 'Grundstück', bezugType: 'GSF', bezugValue: gsfValue },
    { code: 1, name: 'Vorbereitung', bezugType: '-', bezugValue: null },
    { code: 2, name: 'Gebäude', bezugType: 'GF', bezugValue: gfValue },
    { code: 3, name: 'Betriebseinrichtungen', bezugType: '-', bezugValue: null },
    { code: 4, name: 'Umgebung', bezugType: '-', bezugValue: null },
    { code: 5, name: 'Baunebenkosten', bezugType: '-', bezugValue: null },
    { code: 6, name: 'Reserve', bezugType: '-', bezugValue: null },
    { code: 7, name: 'Reserve', bezugType: '-', bezugValue: null },
    { code: 8, name: 'Honorar / Risiko', bezugType: '-', bezugValue: null },
    { code: 9, name: 'Ausstattung', bezugType: 'NF', bezugValue: nfValue }
  ];

  // Get costs for each BKP
  const getCosts = (code) => {
    const key = `bkp${code}`;
    return kostenBkp[key] || { kennwert: 0, chfKosten: 0 };
  };

  // Calculate sum of BKP 1-6
  const sumBkp16 = [1, 2, 3, 4, 5, 6].reduce((sum, code) => sum + (getCosts(code).chfKosten || 0), 0);

  // Calculate sum of BKP 1-9
  const sumBkp19 = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((sum, code) => sum + (getCosts(code).chfKosten || 0), 0);

  // Calculate total (0-9)
  const sumTotal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((sum, code) => sum + (getCosts(code).chfKosten || 0), 0);

  // Helper to calculate percentage of BKP 1-6
  const calcPercentBkp16 = (chfKosten) => {
    if (!chfKosten || !sumBkp16) return '-';
    return ((chfKosten / sumBkp16) * 100).toFixed(1) + '%';
  };

  // Helper to calculate CHF/m³ GV
  const calcChfPerGV = (chfKosten) => {
    if (!chfKosten || !gvValue) return '-';
    return formatNumber(Math.round(chfKosten / gvValue));
  };

  // Helper to calculate CHF/m² GF
  const calcChfPerGF = (chfKosten) => {
    if (!chfKosten || !gfValue) return '-';
    return formatNumber(Math.round(chfKosten / gfValue));
  };

  // Render a single BKP row
  const renderRow = (row) => {
    const costs = getCosts(row.code);
    const kennwert = costs.kennwert || 0;
    const chfKosten = costs.chfKosten || 0;
    const hasCost = chfKosten > 0;

    return `
      <tr>
        <td class="data-row__id">${row.code}</td>
        <td class="data-row__label">${row.name}</td>
        <td class="text-right ${!row.bezugValue ? 'text-muted' : ''}">${row.bezugValue ? formatNumber(row.bezugValue) : '-'}</td>
        <td class="text-muted">${row.bezugValue ? 'm²' : ''}</td>
        <td class="text-muted">${row.bezugType}</td>
        <td class="text-right ${!hasCost ? 'text-muted' : ''}">${hasCost ? formatNumber(kennwert) : '-'}</td>
        <td class="text-right ${!hasCost ? 'text-muted' : ''}">${hasCost ? formatNumber(chfKosten) : '-'}</td>
        <td class="text-right ${!hasCost ? 'text-muted' : ''}">${calcPercentBkp16(chfKosten)}</td>
        <td class="text-right ${!hasCost ? 'text-muted' : ''}">${calcChfPerGV(chfKosten)}</td>
        <td class="text-right ${!hasCost ? 'text-muted' : ''}">${calcChfPerGF(chfKosten)}</td>
      </tr>
    `;
  };

  return `
    <h2 class="tab-header">Kosten nach Hauptgruppen BKP</h2>
    <table class="bkp-table">
      <thead>
        <tr>
          <th>Code</th>
          <th></th>
          <th colspan="3">Bezugsmenge</th>
          <th class="text-right">Kennwert</th>
          <th class="text-right">CHF Kosten</th>
          <th class="text-right">%BKP 1 - 6</th>
          <th class="text-right">CHF / m³ GV</th>
          <th class="text-right">CHF / m² GF</th>
        </tr>
      </thead>
      <tbody>
        ${bkpRows.map(renderRow).join('')}
        <tr class="bkp-total">
          <td></td>
          <td>Total</td>
          <td colspan="3"></td>
          <td></td>
          <td class="text-right">${formatNumber(sumTotal)}</td>
          <td class="text-right">100.0%</td>
          <td></td>
          <td></td>
        </tr>
        <tr class="bkp-spacer"><td colspan="10"></td></tr>
        <tr class="bkp-summary">
          <td class="data-row__id">1 - 6</td>
          <td>Herstellungskosten</td>
          <td colspan="3"></td>
          <td></td>
          <td class="text-right">${formatNumber(sumBkp16)}</td>
          <td></td>
          <td class="text-right">${gvValue ? formatNumber(Math.round(sumBkp16 / gvValue)) : '-'}</td>
          <td class="text-right">${gfValue ? formatNumber(Math.round(sumBkp16 / gfValue)) : '-'}</td>
        </tr>
        <tr class="bkp-summary">
          <td class="data-row__id">1 - 9</td>
          <td>Anlagekosten</td>
          <td colspan="3"></td>
          <td></td>
          <td class="text-right">${formatNumber(sumBkp19)}</td>
          <td></td>
          <td class="text-right">${gvValue ? formatNumber(Math.round(sumBkp19 / gvValue)) : '-'}</td>
          <td class="text-right">${gfValue ? formatNumber(Math.round(sumBkp19 / gfValue)) : '-'}</td>
        </tr>
      </tbody>
    </table>
  `;
}

// Render Kennzahlen content (Grundgrössen und Kennzahlen tab)
function renderKennzahlenContent(project) {
  const content = document.getElementById('detailContent');
  const g = project.grundgroessen || {};

  // Calculate percentage relative to base value
  const calcPercent = (value, base, label) => {
    if (value === null || value === undefined || !base) return '-';
    const pct = ((value / base) * 100).toFixed(0);
    return `${pct}% ${label}`;
  };

  // Helper to create a data row (unified component)
  const row = (abbrev, desc, value, unit, percent) => `
    <div class="data-row">
      <span class="data-row__id">${abbrev}</span>
      <span class="data-row__label">${desc}</span>
      <span class="data-row__value">${value}</span>
      <span class="data-row__unit">${unit}</span>
      <span class="data-row__meta">${percent}</span>
    </div>
  `;

  // Helper for narrow rows (right column, unified component)
  const rowNarrow = (abbrev, desc, value, unit = '') => `
    <div class="data-row data-row--narrow">
      <span class="data-row__id">${abbrev}</span>
      <span class="data-row__label">${desc}</span>
      <span class="data-row__value">${value}</span>
      <span class="data-row__unit">${unit}</span>
    </div>
  `;

  const gv = g.gebaeudevolumen || {};
  const gsf = g.grundstueckflaechen || {};
  const gfl = g.gebaeudeflaechen || {};
  const din = g.flaechenDin277 || {};
  const allg = g.allgemeineAngaben || {};
  const kw = g.kennzahlenWirtschaftlichkeit || {};
  const ap = g.arbeitsplatzkennzahlen || {};
  const fq = g.formquotienten || {};

  // Base values for percentage calculations
  const baseGV = gv.gv;
  const baseGSF = gsf.gsf;
  const baseGF = gfl.gf;

  content.innerHTML = `
    ${renderKostenBkpSection(project)}
    <h2 class="tab-header">Volumen und Flächen nach SIA 416</h2>
    <div class="tab-container tab-container--two-column">
      <!-- Left Column: Volumen und Flächen nach SIA 416 -->
      <div class="tab-container">
        <!-- Gebäudevolumen -->
        <div class="tab-section">
          <div class="tab-section-header">Gebäudevolumen</div>
          <div class="data-rows">
            ${row('GV', 'Gebäudevolumen', formatNumber(gv.gv), 'm³', calcPercent(gv.gv, baseGV, 'GV'))}
            ${row('GV OG', 'Gebäudevolumen Obergeschosse', formatNumber(gv.gvOg), 'm³', calcPercent(gv.gvOg, baseGV, 'GV'))}
            ${row('GV UG', 'Gebäudevolumen Untergeschosse', formatNumber(gv.gvUg), 'm³', calcPercent(gv.gvUg, baseGV, 'GV'))}
          </div>
        </div>

        <!-- Grundstücksflächen -->
        <div class="tab-section">
          <div class="tab-section-header">Grundstücksflächen</div>
          <div class="data-rows">
            ${row('GSF', 'Grundstücksfläche', formatNumber(gsf.gsf), 'm²', calcPercent(gsf.gsf, baseGSF, 'GSF'))}
            ${row('GGF', 'Gebäudegrundfläche', formatNumber(gsf.ggf), 'm²', calcPercent(gsf.ggf, baseGSF, 'GSF'))}
            ${row('UF', 'Umgebungsfläche', formatNumber(gsf.uf), 'm²', calcPercent(gsf.uf, baseGSF, 'GSF'))}
          </div>
        </div>

        <!-- Gebäudeflächen -->
        <div class="tab-section">
          <div class="tab-section-header">Gebäudeflächen</div>
          <div class="data-rows">
            ${row('GF', 'Geschossfläche', formatNumber(gfl.gf), 'm²', calcPercent(gfl.gf, baseGF, 'GF'))}
            ${row('GF OG', 'Geschossfläche Obergeschosse', formatNumber(gfl.gfOg), 'm²', calcPercent(gfl.gfOg, baseGF, 'GF'))}
            ${row('GF UG', 'Geschossfläche Untergeschosse', formatNumber(gfl.gfUg), 'm²', calcPercent(gfl.gfUg, baseGF, 'GF'))}
            ${row('KF', 'Konstruktionsfläche', formatNumber(gfl.kf), 'm²', calcPercent(gfl.kf, baseGF, 'GF'))}
            ${row('NGF', 'Nettogeschossfläche', formatNumber(gfl.ngf), 'm²', calcPercent(gfl.ngf, baseGF, 'GF'))}
            ${row('NF', 'Nutzfläche', formatNumber(gfl.nf), 'm²', calcPercent(gfl.nf, baseGF, 'GF'))}
            ${row('HNF', 'Hauptnutzfläche', formatNumber(gfl.hnf), 'm²', calcPercent(gfl.hnf, baseGF, 'GF'))}
            ${row('NNF', 'Nebennutzfläche', formatNumber(gfl.nnf), 'm²', calcPercent(gfl.nnf, baseGF, 'GF'))}
            ${row('VF', 'Verkehrsfläche', formatNumber(gfl.vf), 'm²', calcPercent(gfl.vf, baseGF, 'GF'))}
            ${row('FF', 'Funktionsfläche', formatNumber(gfl.ff), 'm²', calcPercent(gfl.ff, baseGF, 'GF'))}
          </div>
        </div>

        <!-- Flächen DIN 277 -->
        <div class="tab-section">
          <div class="tab-section-header">Flächen DIN 277</div>
          <div class="data-rows">
            ${row('HNF 1', 'Wohnen und Aufenthalt', formatNumber(din.hnf1), 'm²', calcPercent(din.hnf1, baseGF, 'GF'))}
            ${row('HNF 2', 'Büroarbeit', formatNumber(din.hnf2), 'm²', calcPercent(din.hnf2, baseGF, 'GF'))}
            ${row('HNF 3', 'Produktion', formatNumber(din.hnf3), 'm²', calcPercent(din.hnf3, baseGF, 'GF'))}
            ${row('HNF 4', 'Lagern, Verteilen, Verkaufen', formatNumber(din.hnf4), 'm²', calcPercent(din.hnf4, baseGF, 'GF'))}
            ${row('HNF 5', 'Bildung, Unterricht, Kultur', formatNumber(din.hnf5), 'm²', calcPercent(din.hnf5, baseGF, 'GF'))}
            ${row('HNF 6', 'Heilen, Pflegen', formatNumber(din.hnf6), 'm²', calcPercent(din.hnf6, baseGF, 'GF'))}
            ${row('NNF 7', 'Nebennutzfläche', formatNumber(din.nnf7), 'm²', calcPercent(din.nnf7, baseGF, 'GF'))}
            ${row('FF 8', 'Betriebstechnische Anlagen', formatNumber(din.ff8), 'm²', calcPercent(din.ff8, baseGF, 'GF'))}
            ${row('VF 9', 'Verkehrserschliessung und -sicherung', formatNumber(din.vf9), 'm²', calcPercent(din.vf9, baseGF, 'GF'))}
            ${row('BUF 10', 'Verschiedene Nutzungen', formatNumber(din.buf10), 'm²', calcPercent(din.buf10, baseGF, 'GF'))}
          </div>
        </div>
      </div>

      <!-- Right Column: Kennzahlen -->
      <div class="tab-container">
        <!-- Allgemeine Angaben -->
        <div class="tab-section">
          <div class="tab-section-header">Allgemeine Angaben</div>
          <div class="data-rows">
            ${rowNarrow('', 'Anzahl Gebäude Stockwerke', formatNumber(allg.geschosse), '')}
            ${rowNarrow('', 'Anzahl Gebäude Stockwerke UG', formatNumber(allg.geschosseUg), '')}
          </div>
        </div>

        <!-- Kennzahlen Wirtschaftlichkeit der Grundrisse -->
        <div class="tab-section">
          <div class="tab-section-header">Kennzahlen Wirtschaftlichkeit der Grundrisse</div>
          <div class="data-rows">
            ${rowNarrow('HNF / GF', 'Hauptnutzfläche / Geschossfläche', formatPercent(kw.hnfGf), '')}
            ${rowNarrow('VMF / GF', 'Vermietbare Fläche / Geschossfläche', formatPercent(kw.vmfGf), '')}
          </div>
        </div>

        <!-- Arbeitsplatzkennzahlen -->
        <div class="tab-section">
          <div class="tab-section-header">Arbeitsplatzkennzahlen</div>
          <div class="data-rows">
            ${rowNarrow('AP', 'Anzahl Arbeitsplätze', formatNumber(ap.ap), '')}
            ${rowNarrow('GF / AP', 'Geschossfläche / Arbeitsplätze', formatNumber(ap.gfAp, 1), '')}
            ${rowNarrow('HNF 2 / AP', 'Hauptnutzfläche 2 / Arbeitsplätze', formatNumber(ap.hnf2Ap, 1), '')}
            ${rowNarrow('BKP 1 - 8 / AP', 'Baukosten BKP 1 - 8 / Arbeitsplätze', formatNumber(ap.bkp18Ap), '')}
            ${rowNarrow('BKP 2 / AP', 'Baukosten BKP 2 / Arbeitsplätze', formatNumber(ap.bkp2Ap), '')}
            ${rowNarrow('BKP 9 / AP', 'Baukosten BKP 9 / Arbeitsplätze', formatNumber(ap.bkp9Ap), '')}
          </div>
        </div>

        <!-- Formquotienten nach eBKP-H -->
        <div class="tab-section">
          <div class="tab-section-header">Formquotienten nach eBKP-H</div>
          <div class="data-rows">
            ${rowNarrow('AWF / GF', 'Aussenwandfläche / Geschossfläche', formatNumber(fq.awfGf, 2), '')}
            ${rowNarrow('DAF / GF', 'Dachfläche / Geschossfläche', formatNumber(fq.dafGf, 2), '')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Risiken content (Risiken tab)
function renderRisikenContent(project) {
  const content = document.getElementById('detailContent');
  const risiken = project.risiken || {};

  // Category labels for display
  const categoryLabels = {
    technisch: 'Technisch',
    terminlich: 'Terminlich',
    rechtlich: 'Rechtlich',
    sonstige: 'Sonstige'
  };

  // Helper to create status dots (1=green, 2=orange, 3=red) - using unified components
  const renderStatusDots = (status) => {
    const levels = [
      { class: 'status-dot--low', title: 'Geringes Risiko' },
      { class: 'status-dot--medium', title: 'Mittleres Risiko' },
      { class: 'status-dot--high', title: 'Hohes Risiko' }
    ];
    return levels.map((level, index) => {
      const isActive = status === (index + 1);
      return `<div class="status-dot${isActive ? ` ${level.class}` : ''}" title="${level.title}"></div>`;
    }).join('');
  };

  // Helper to create a risk table row
  const riskRow = (risk) => `
    <tr>
      <td>${esc(risk.id) || '-'}</td>
      <td>${esc(risk.name) || '-'}</td>
      <td>
        <div class="status-dots">
          ${renderStatusDots(risk.status)}
        </div>
      </td>
      <td>${esc(risk.kommentar) || '-'}</td>
    </tr>
  `;

  // Helper to create a section with table
  const renderSection = (categoryKey, risks) => {
    if (!risks || risks.length === 0) return '';
    return `
      <div class="tab-section">
        <div class="tab-section-header">${categoryLabels[categoryKey] || categoryKey}</div>
        <table class="data-table data-table--risks">
          <thead>
            <tr>
              <th>ID</th>
              <th>Risiko</th>
              <th>Status</th>
              <th>Kommentar</th>
            </tr>
          </thead>
          <tbody>
            ${risks.map(riskRow).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  content.innerHTML = `
    <h2 class="tab-header">Risiken</h2>
    <div class="tab-container">
      ${renderSection('technisch', risiken.technisch)}
      ${renderSection('terminlich', risiken.terminlich)}
      ${renderSection('rechtlich', risiken.rechtlich)}
      ${renderSection('sonstige', risiken.sonstige)}
    </div>
  `;
}

// Render Projektziele content (Projektziele tab)
function renderProjektzieleContent(project) {
  const content = document.getElementById('detailContent');
  const pz = project.projektziele || {};
  const meilensteine = pz.meilensteine || [];

  // Helper to create a milestone table row (unified components)
  const milestoneRow = (milestone, index) => {
    const isCompleted = milestone.status === 'completed';
    const statusClass = isCompleted ? 'table-status--completed' : 'table-status--pending';
    const statusLabel = isCompleted ? 'Erledigt' : 'Offen';
    const buttonClass = isCompleted ? 'table-action-btn--completed' : '';
    const buttonIcon = isCompleted ? 'check_circle' : 'radio_button_unchecked';

    return `
      <tr>
        <td>${esc(milestone.name) || '-'}</td>
        <td>${esc(milestone.plannedDate) || '-'}</td>
        <td>${esc(milestone.actualDate) || '-'}</td>
        <td>
          <span class="table-status ${statusClass}">${statusLabel}</span>
        </td>
        <td>
          <button class="table-action-btn ${buttonClass}" data-action="toggle-milestone" data-project-id="${esc(project.id)}" data-milestone-index="${index}" title="${isCompleted ? 'Als offen markieren' : 'Als erledigt markieren'}">
            <span class="material-icons-outlined">${buttonIcon}</span>
          </button>
        </td>
      </tr>
    `;
  };

  const milestoneTable = meilensteine.length > 0
    ? `
      <table class="data-table">
        <thead>
          <tr>
            <th>Meilenstein</th>
            <th>Geplant</th>
            <th>Effektiv</th>
            <th>Status</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          ${meilensteine.map((m, i) => milestoneRow(m, i)).join('')}
        </tbody>
      </table>
    `
    : '<div class="empty-state">Keine Meilensteine definiert</div>';

  content.innerHTML = `
    <h2 class="tab-header">Projektziele</h2>
    <div class="tab-container">
      <!-- Projektbeschrieb Section -->
      <div class="tab-section">
        <div class="tab-section-header">Projektbeschrieb</div>
        <div class="detail-fields">
          <div class="detail-field">
            <span class="detail-field-label">Ausgangslage</span>
            <span class="detail-field-value detail-field-value--prose">${esc(pz.ausgangslage) || '-'}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">Projektziele</span>
            <span class="detail-field-value detail-field-value--prose">${esc(pz.ziele) || '-'}</span>
          </div>
        </div>
      </div>

      <!-- Kosten Soll/Ist Vergleich Section -->
      <div class="tab-section">
        <div class="tab-section-header">Kostenvergleich</div>
        <div class="cost-comparison-wrapper">
          ${renderCostComparison(project.plannedTotalCost, calculateBkpTotal(project.kostenBkp))}
          <div class="metric-comparison-container">
            ${renderMetricComparison('BKP 2 / m² GF', project.sollBkp2Gf, calculateBkp2PerGf(project), 'CHF/m²')}
            ${renderMetricComparison('BKP 2 / m³ GV', project.sollBkp2Gv, calculateBkp2PerGv(project), 'CHF/m³')}
          </div>
        </div>
      </div>

      <!-- Meilensteine Section -->
      <div class="tab-section">
        <div class="tab-section-header">Meilensteine</div>
        ${milestoneTable}
      </div>
    </div>
  `;
}

// Toggle milestone status (for demo purposes - updates UI only)
function toggleMilestoneStatus(projectId, milestoneIndex) {
  const project = properties.find(p => p.id === projectId);
  if (!project || !project.projektziele?.meilensteine) return;

  const milestone = project.projektziele.meilensteine[milestoneIndex];
  if (!milestone) return;

  // Toggle status
  if (milestone.status === 'completed') {
    milestone.status = 'pending';
    milestone.actualDate = null;
  } else {
    milestone.status = 'completed';
    // Set actual date to today
    const today = new Date();
    milestone.actualDate = today.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
  }

  // Re-render the tab
  renderProjektzieleContent(project);
}

// Handle tab switching in detail view
function switchDetailTab(tabName) {
  // Track current tab
  currentDetailTab = tabName;

  // Update active tab button
  document.querySelectorAll('.detail-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  // Get current project
  const project = properties.find(p => p.id === currentDetailProjectId);
  if (!project) return;

  // Always update header title when switching tabs or projects
  const title = `${project.projectNumber || '-'} - ${project.city || ''} ${project.region || ''}, ${project.projectName || '-'}`;
  document.getElementById('detailHeaderTitle').textContent = title;

  // Render appropriate content
  if (tabName === 'kennzahlen') {
    renderKennzahlenContent(project);
  } else if (tabName === 'risiken') {
    renderRisikenContent(project);
  } else if (tabName === 'projektziele') {
    renderProjektzieleContent(project);
  } else if (tabName === 'uebersicht') {
    renderDetailContent(project);
    // Re-initialize detail map after rendering
    setTimeout(() => {
      initializeDetailMap(project);
    }, 100);
  }

  // Update URL with tab parameter
  updateUrlParams();
}

// Set up detail tab click handlers
function setupDetailTabs() {
  document.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (e.target.disabled) return;
      switchDetailTab(e.target.dataset.tab);
    });
  });
}

// Unified click handler (event delegation for tags and sidebar items)
function handleContentClick(event) {
  // First, check if clicked on a filter tag (status-tag or ampel-value)
  const tag = event.target.closest('.status-tag[data-filter], .ampel-value[data-filter]');
  if (tag) {
    event.stopPropagation();
    event.preventDefault();

    const filterType = tag.dataset.filter;
    const filterValue = tag.dataset.value;

    // Only add filter if there's a valid value
    if (filterValue) {
      advancedFilters[filterType].add(filterValue);

      applyFilters();

      // Update filter modal if it's open
      if (document.getElementById('filterModalOverlay').classList.contains('active')) {
        renderFilterModal();
      }
    }
    return;
  }

  // Check if clicked on a gallery card
  const card = event.target.closest('.card[data-id]');
  if (card) {
    openDetailView(card.dataset.id);
    return;
  }

  // Check if clicked on a list table row
  const tableRow = event.target.closest('.list-table tbody tr[data-id]');
  if (tableRow) {
    openDetailView(tableRow.dataset.id);
    return;
  }

  // Check if clicked on "Details anzeigen" button in map popup
  const popupLink = event.target.closest('.popup-link[data-id]');
  if (popupLink) {
    openDetailView(popupLink.dataset.id);
    return;
  }

  // Check if clicked on the detail-view gallery thumbnail
  const galleryBtn = event.target.closest('[data-action="open-gallery"]');
  if (galleryBtn) {
    openCarousel(getProjectGalleryImages(galleryBtn.dataset.id));
    return;
  }

  // Milestone toggle button
  const milestoneBtn = event.target.closest('[data-action="toggle-milestone"]');
  if (milestoneBtn) {
    toggleMilestoneStatus(milestoneBtn.dataset.projectId, parseInt(milestoneBtn.dataset.milestoneIndex, 10));
    return;
  }

  // Carousel thumbnail
  const thumb = event.target.closest('[data-action="carousel-go"]');
  if (thumb) {
    goToCarouselImage(parseInt(thumb.dataset.index, 10));
    return;
  }

  // Check if clicked on a map sidebar item
  const sidebarItem = event.target.closest('.map-sidebar-item[data-id]');
  if (sidebarItem) {
    flyToProperty(sidebarItem.dataset.id);
    return;
  }
}

// Set up unified event delegation
document.addEventListener('click', handleContentClick);

// Trigger click on Enter/Space for keyboard users on focusable clickable elements
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const el = event.target;
  if (!(el instanceof HTMLElement)) return;
  if (el.matches('.card[data-id], .list-table tbody tr[data-id], .map-sidebar-item[data-id], .detail-sidebar-item[data-detail-id]')) {
    event.preventDefault();
    el.click();
  }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const view = params.get('view');

  // Handle detail view navigation
  if (projectId) {
    const project = properties.find(p => p.id === projectId);
    if (project) {
      openDetailView(projectId, true); // skipHistory = true
    }
    return;
  }

  // Close detail view if navigating away from it
  if (document.getElementById('detailView').classList.contains('active')) {
    closeDetailView(true); // skipHistory = true
  }

  if (view && ['gallery', 'list', 'map'].includes(view)) {
    setView(view);
  }
});

// --- INIT ---
// Save initial URL params BEFORE any operations that might modify the URL
// (setView calls updateUrlParams which would overwrite id/tab params)
const initialUrlParams = getUrlParams();

setupFilterModal();
setupSearch();
setupViewToggle();
setupDetailTabs();
loadFiltersFromUrl();
setView(currentView);

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Store references for label lookups
    dataReferences = data.meta?.references || {};

    // Create a map of buildings by ID for quick lookup
    const buildingsMap = new Map();
    (data.buildings || []).forEach(b => buildingsMap.set(b.id, b));

    // Join projects with their buildings to get location data
    properties = (data.projects || []).map(project => {
      const building = buildingsMap.get(project.buildingId) || null;
      return {
        ...project,
        // Map projectStatus to status for filter compatibility
        status: project.projectStatus,
        // Inherit location data from building
        lat: building?.lat,
        lng: building?.lng,
        street: building?.street,
        streetNumber: building?.streetNumber,
        zip: building?.zip,
        city: building?.city,
        region: building?.region,
        country: building?.country,
        // Keep reference to building designation for backwards compatibility
        buildingDesignation: building?.designation,
        // Store full building object for Gebäude section
        building: building
      };
    });

    filteredProperties = [...properties];
    extractFilterOptions();
    applyFilters();

    // Check if initial URL had project ID and open detail view
    // Use saved params since applyFilters() may have modified the URL
    if (initialUrlParams.id) {
      const project = properties.find(p => p.id === initialUrlParams.id);
      if (project) {
        // Pass saved tab param since URL may have been modified by applyFilters()
        openDetailView(initialUrlParams.id, true, initialUrlParams.tab);
      }
    }
  })
  .catch(err => {
    console.error('Error loading data:', err);
    document.getElementById('objectGrid').innerHTML = `<div class="fetch-error">Fehler beim Laden. Starte via Live Server.</div>`;
  });
