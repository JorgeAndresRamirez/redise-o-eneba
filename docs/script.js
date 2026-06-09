/* Eneba LATAM — Vista previa del rediseño */

const L1_NODES = [
  { id: 'games', labelKey: 'nav.games', route: 'games' },
  { id: 'offers', labelKey: 'nav.offers', route: 'offers' },
  { id: 'recharges', labelKey: 'nav.recharges', route: 'recharges' },
  { id: 'devices', labelKey: 'nav.devices', route: 'devices' },
  { id: 'software', labelKey: 'nav.software', route: 'software' },
];

const FILTER_TAXONOMY = {
  modo: ['Multijugador', 'Battle Royale', 'Un solo jugador', 'Co-Op', 'FPS/TPS', 'Estrategia'],
  genero: ['Acción', 'Simulación', 'Deportes', 'Aventuras', 'Carreras', 'Horror', 'Lucha', 'Puzzles', 'MMO'],
  mecanica: ['Hack Slash', 'RPG', 'Arcade'],
  perspectiva: ['Primera persona', 'Tercera persona', 'Vista de pájaro'],
  dispositivos: ['PC/Steam', 'Xbox', 'PlayStation', 'Nintendo'],
};

const FILTER_DEVICE_KEYS = {
  'PC/Steam': ['steam'],
  Xbox: ['xbox'],
  PlayStation: ['playstation'],
  Nintendo: ['nintendo'],
};

const FILTER_AXIS_LABELS = {
  modo: 'Modo de juego',
  genero: 'Género',
  mecanica: 'Mecánica',
  perspectiva: 'Perspectiva',
  dispositivos: 'Plataforma',
};

const QUICK_GAME_FILTERS = {
  precio: {
    labelKey: 'filters.price',
    items: [
      { filter: 'orden', value: 'menor-precio', labelKey: 'filters.lowestPrice' },
      { filter: 'orden', value: 'mayor-precio', labelKey: 'filters.highestPrice' },
      { filter: 'oferta', value: 'con-descuento', labelKey: 'filters.onSale' },
    ],
  },
  popular: {
    labelKey: 'filters.popular',
    items: [
      { filter: 'genero', value: 'Acción' },
      { filter: 'modo', value: 'Multijugador' },
      { filter: 'dispositivos', value: 'PC/Steam' },
      { filter: 'mecanica', value: 'RPG' },
    ],
  },
};

const LANDING_QUICK_FILTERS = [
  { filter: 'orden', value: 'menor-precio', labelKey: 'filters.lowestPrice' },
  { filter: 'oferta', value: 'con-descuento', labelKey: 'filters.onSale' },
  { filter: 'genero', value: 'Acción' },
  { filter: 'dispositivos', value: 'PC/Steam' },
];

const FOOTER = [
  { title: 'Sobre Eneba', links: [
    { label: 'Sobre nosotros', route: 'footer/sobre-nosotros' },
    { label: 'Contáctanos', route: 'footer/contactanos' },
    { label: 'Vacantes', route: 'footer/vacantes' },
    { label: 'Ve qué dijeron de nosotros', route: 'footer/resenas' },
  ]},
  { title: 'Comprar', links: [
    { label: 'Colecciones', route: 'offers/todas' },
    { label: 'Descuentos', route: 'offers/juegos-baratos' },
  ]},
  { title: 'Ayuda', links: [
    { label: 'Cómo comprar', route: 'footer/como-comprar' },
    { label: 'Preguntas frecuentes', route: 'footer/faq' },
    { label: 'Cómo activar tus juegos', route: 'footer/activar-juegos' },
    { label: 'PQRS', route: 'footer/pqrs' },
    { label: 'Política de devoluciones', route: 'footer/devoluciones' },
    { label: 'Contáctanos', route: 'footer/contactanos', crossLink: true },
  ]},
  { title: 'Comunidad', links: [
    { label: 'Noticias de gaming', route: 'footer/noticias' },
    { label: 'Sorteos', route: 'footer/sorteos' },
    { label: 'Snakzy: Juega y gana', route: 'footer/snakzy' },
    { label: 'Conviértete en afiliado', route: 'footer/afiliado' },
  ]},
  { title: 'Negocio', links: [
    { label: 'Vende en Eneba', route: 'footer/vende' },
    { label: 'Anúnciate', route: 'footer/anunciate' },
  ]},
  { title: 'Síguenos', links: [
    { label: 'Twitter / X', route: 'footer/social' },
    { label: 'Discord', route: 'footer/social' },
  ]},
  { title: 'Descarga la app', links: [{ label: 'App de Eneba', route: 'footer/app' }] },
];

const DEFAULT_STATE = {
  route: 'home', breadcrumbs: [{ label: 'Eneba', route: 'home' }],
  cartOpen: false, cartStep: 'bolsa', cartItems: [], wishlist: [],
  isLoggedIn: false, authView: 'login',
  userLocale: { localeId: 'co', region: 'Colombia', language: 'Español', currency: 'COP', lang: 'es' },
  localeOpen: false,
  activeFilters: {}, rechargeFilters: {}, searchQuery: '', searchFocused: false, orders: [],
  heroIndex: 0,
  pdpSlide: 0,
};

function loadState() {
  try {
    const s = localStorage.getItem('eneba-mockup-v2');
    if (s) {
      const parsed = { ...DEFAULT_STATE, ...JSON.parse(s) };
      if (!parsed.userLocale?.localeId) {
        parsed.userLocale = { ...DEFAULT_STATE.userLocale, ...parsed.userLocale, localeId: 'co', currency: 'COP', region: 'Colombia', lang: 'es' };
      }
      if (!parsed.userLocale.lang) {
        const preset = LOCALE_PRESETS.find((l) => l.id === parsed.userLocale.localeId);
        parsed.userLocale.lang = preset?.lang || 'es';
      }
      return parsed;
    }
    const old = localStorage.getItem('eneba-mockup');
    if (old) return { ...DEFAULT_STATE, ...JSON.parse(old) };
  } catch (_) {}
  return { ...DEFAULT_STATE };
}

function saveState() {
  const { cartOpen, searchFocused, localeOpen, ...p } = state;
  localStorage.setItem('eneba-mockup-v2', JSON.stringify(p));
}

function syncCurrency() {
  window.__enebaCurrency = state.userLocale.currency;
}

function syncLanguage() {
  const preset = getLocalePreset();
  const lang = preset.lang || LANG_MAP[preset.language] || 'es';
  window.__enebaLang = lang;
  state.userLocale.lang = lang;
  applyDocumentLang(lang);
}

function getLocalePreset() {
  return LOCALE_PRESETS.find((l) => l.id === state.userLocale.localeId) || LOCALE_PRESETS[0];
}

function setLocale(preset) {
  state.userLocale = {
    localeId: preset.id,
    region: preset.country,
    language: preset.language,
    currency: preset.currency,
    lang: preset.lang || LANG_MAP[preset.language] || 'es',
  };
  state.localeOpen = false;
  syncCurrency();
  syncLanguage();
  saveState();
  showToast(`${preset.country} · ${preset.currency} · ${preset.language}`);
  render();
}

let state = loadState();

function esc(s) {
  const d = document.createElement('div');
  d.textContent = String(s ?? '');
  return d.innerHTML;
}

function showToast(message, type = 'success') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.innerHTML = `${icon('check')}<span>${esc(message)}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2800);
}

function resetGameFiltersIfNeeded(route) {
  if (route === 'games') state.activeFilters = {};
}

function resetRechargeFiltersIfNeeded(route) {
  if (!route.startsWith('recharges')) state.rechargeFilters = {};
}

function syncRechargeFiltersFromRoute(route) {
  const parts = route.split('/');
  if (parts[1] === 'gift-card' && parts[2]) state.rechargeFilters.giftSub = parts[2];
  if (parts[1] === 'entretenimiento' && parts[2]) state.rechargeFilters.entSub = parts[2];
  if (parts[1] === 'licencias') {
    if (parts[2]) state.rechargeFilters.licTipo = parts[2];
    if (parts[3]) state.rechargeFilters.licPlatform = parts[3];
  }
}

function navigate(route, crumbs) {
  state.route = route;
  state.breadcrumbs = crumbs || [{ label: 'Eneba', route: 'home' }];
  resetGameFiltersIfNeeded(route);
  resetRechargeFiltersIfNeeded(route);
  syncRechargeFiltersFromRoute(route);
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function pushCrumb(label, route) {
  const idx = state.breadcrumbs.findIndex((c) => c.route === route);
  state.breadcrumbs = idx >= 0 ? state.breadcrumbs.slice(0, idx + 1) : [...state.breadcrumbs, { label, route }];
  state.route = route;
  if (route.startsWith('product/')) state.pdpSlide = 0;
  resetGameFiltersIfNeeded(route);
  resetRechargeFiltersIfNeeded(route);
  syncRechargeFiltersFromRoute(route);
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBreadcrumb(i) {
  state.breadcrumbs = state.breadcrumbs.slice(0, i + 1);
  state.route = state.breadcrumbs[i].route;
  resetGameFiltersIfNeeded(state.route);
  resetRechargeFiltersIfNeeded(state.route);
  syncRechargeFiltersFromRoute(state.route);
  saveState();
  render();
}

function addToCart(item) {
  const priceEur = item.priceEur ?? (typeof item.price === 'number' ? item.price : 0);
  const product = getProduct(item.id);
  const title = product?.title || item.title;
  const image = item.image || product?.coverImage || product?.image;
  const ex = state.cartItems.find((i) => i.id === item.id);
  if (ex) ex.qty += 1;
  else state.cartItems.push({
    id: item.id,
    title,
    image,
    priceEur,
    price: formatPrice(priceEur),
    qty: 1,
  });
  state.cartOpen = true;
  state.cartStep = 'bolsa';
  saveState();
  showToast(`${item.title} ${t('toast.addedCart')}`);
  render();
}

function addToWishlist(id) {
  const g = getProduct(id);
  if (!state.wishlist.includes(id)) {
    state.wishlist.push(id);
    showToast(`${g.title} ${t('toast.addedWish')}`);
  } else {
    state.wishlist = state.wishlist.filter((w) => w !== id);
    showToast(t('toast.removedWish'));
  }
  saveState();
  render();
}

function getGameImages(g) {
  if (g.images?.length) return g.images;
  return g.image ? [g.image] : [];
}

function getPdpBackdrop(images) {
  return images.find((u) => u.includes('library_hero') || u.includes('capsule_616')) || images[0] || '';
}

function getPdpPoster(images) {
  return images.find((u) => u.includes('library_600x900')) || images[0] || '';
}

function productCard(g, idx = 0) {
  if (g.isLogo) return serviceCard(g, idx);

  const images = getGameImages(g);
  const slideCount = images.length;
  const inWish = state.wishlist.includes(g.id);
  const related = (g.relatedNodes || []).slice(0, 3);

  return `<article class="game-card" style="animation-delay:${idx * 0.05}s" data-route="product/${g.id}" data-game-id="${g.id}" role="link" tabindex="0" aria-label="${esc(g.title)}">
    <div class="game-card__media">
      <div class="game-card__carousel" data-carousel="${g.id}" data-slide="0" data-count="${slideCount}">
        <div class="game-card__track">
          ${images.map((src, si) => `<img class="game-card__slide" src="${esc(src)}" alt="${esc(g.title)}" loading="${si ? 'lazy' : 'eager'}" decoding="async" fetchpriority="${si === 0 ? 'high' : 'low'}" data-slide-idx="${si}" onerror="this.style.opacity='0.25'" />`).join('')}
        </div>
        ${slideCount > 1 ? `
          <button type="button" class="game-card__nav game-card__nav--prev" data-carousel-prev="${g.id}" aria-label="Previous">${icon('chevron')}</button>
          <button type="button" class="game-card__nav game-card__nav--next" data-carousel-next="${g.id}" aria-label="Next">${icon('chevron')}</button>
          <div class="game-card__dots">${images.map((_, si) => `<span class="game-card__dot ${si === 0 ? 'active' : ''}" data-carousel-dot="${g.id}" data-dot="${si}"></span>`).join('')}</div>` : ''}
      </div>
      <div class="game-card__badges">
        ${g.discount ? `<span class="badge-discount">${esc(g.discount)}</span>` : ''}
        ${g.cashback ? `<span class="badge-cashback">${t('card.cashback')} ${g.cashbackPct || ''}</span>` : ''}
      </div>
      <div class="game-card__platform">${platformLogoBadge(g.platformKey || 'global')}</div>
      <button type="button" class="game-card__wish ${inWish ? 'active' : ''}" data-wishlist-card="${g.id}" aria-label="${inWish ? t('card.removeWishlist') : t('card.addWishlist')}">${icon('heart')}</button>
    </div>
    <div class="game-card__body">
      <h3 class="game-card__title">${esc(g.title)}</h3>
      ${related.length ? `<div class="game-card__related" aria-label="${t('detail.alsoExplore')}">
        ${related.map((n) => `<button type="button" class="related-chip" data-route="${n.route}" title="${t('related.' + n.key)}">${t('related.' + n.key)}</button>`).join('')}
      </div>` : ''}
      <div class="game-card__price-row">
        <span class="price-current">${formatPrice(g.price)}</span>
        ${g.originalPrice ? `<span class="price-original">${formatPrice(g.originalPrice)}</span>` : ''}
      </div>
      ${g.rating ? `<div class="game-card__rating">${icon('star', 'icon-star')} ${g.rating} · ${g.reviews} ${t('card.reviews')}</div>` : ''}
      <div class="game-card__actions">
        <button type="button" class="btn-buy" data-add-cart="${g.id}" data-title="${esc(g.title)}" data-price-eur="${g.price}" data-image="${esc(images[0] || g.image)}">${t('card.buy')}</button>
      </div>
    </div>
  </article>`;
}

function serviceCard(s, idx = 0) {
  const item = s.kind ? s : enrichService(s);
  const inWish = state.wishlist.includes(item.id);
  const isGift = item.type === 'gift-card' || item.type === 'dinero';
  const platColor = PLATFORM_META[item.platformKey]?.color || '#4618ad';
  const faceLabel = item.faceValue != null ? formatDenomination(item.faceValue) : null;
  const mediaInner = isGift
    ? `<div class="service-card__gift" style="--gift-color:${platColor}">
        <div class="service-card__gift-badge">${platformLogoBadge(item.platformKey || 'global', 'md')}</div>
        ${faceLabel ? `<span class="service-card__gift-value">${esc(faceLabel)}</span>` : ''}
        <span class="service-card__gift-label">${t('products.giftCard')}</span>
      </div>`
    : `<img class="service-card__logo" src="${esc(item.image || '')}" alt="" loading="lazy" onerror="this.style.display='none'" />`;

  return `<article class="service-card ${isGift ? 'service-card--gift' : ''}" data-route="product/${item.id}" style="animation-delay:${idx * 0.05}s" role="link" tabindex="0">
    <div class="service-card__media">
      ${mediaInner}
      ${!isGift ? `<div class="game-card__platform">${platformLogoBadge(item.platformKey || 'global')}</div>` : ''}
      <button type="button" class="game-card__wish ${inWish ? 'active' : ''}" data-wishlist-card="${item.id}" aria-label="${t('card.addWishlist')}">${icon('heart')}</button>
    </div>
    <div class="service-card__body">
      <h3 class="service-card__title">${esc(item.title)}</h3>
      <p class="service-card__type">${t('detail.keyTypes.' + (item.keyType || 'digital-key'))}</p>
      <div class="game-card__price-row">
        <span class="price-current">${formatPrice(item.price)}</span>
      </div>
      <button type="button" class="btn-buy" data-add-cart="${item.id}" data-title="${esc(item.title)}" data-price-eur="${item.price}" data-image="${esc(item.image || '')}">${t('card.buy')}</button>
    </div>
  </article>`;
}

function crossLinkCard(title, sub, route) {
  return `<div class="cross-link-card" data-route="${route}" role="button" tabindex="0">
    <span class="cross-link-card__icon">${icon('link')}</span>
    <div><p class="cross-link-card__title">${esc(title)}</p><p class="cross-link-card__sub">${esc(sub)}</p></div>
  </div>`;
}

function filterGames() {
  let games = getAllGames().filter((g) => {
    if (state.activeFilters.oferta === 'con-descuento' && !g.discount && !g.originalPrice) return false;
    if (state.activeFilters.genero && g.genre !== state.activeFilters.genero) return false;
    if (state.activeFilters.modo && g.modo !== state.activeFilters.modo) return false;
    if (state.activeFilters.mecanica && g.mecanica !== state.activeFilters.mecanica) return false;
    if (state.activeFilters.perspectiva && g.perspectiva !== state.activeFilters.perspectiva) return false;
    if (state.activeFilters.dispositivos) {
      const keys = FILTER_DEVICE_KEYS[state.activeFilters.dispositivos];
      if (keys && !keys.includes(g.platformKey)) return false;
    }
    return true;
  });
  if (state.activeFilters.orden === 'menor-precio') games = [...games].sort((a, b) => a.price - b.price);
  else if (state.activeFilters.orden === 'mayor-precio') games = [...games].sort((a, b) => b.price - a.price);
  return games;
}

function renderFilterPillGroup(group, { compact = false, showActive = false, sidebar = false } = {}) {
  const groupLabel = group.labelKey ? t(group.labelKey) : esc(group.label || '');
  const pills = group.items.map((it) => {
    const label = it.labelKey ? t(it.labelKey) : esc(it.value);
    const active = showActive && state.activeFilters[it.filter] === it.value;
    let cls = 'filter-pill';
    if (compact) cls += ' filter-pill--compact';
    if (sidebar) cls += ' filter-pill--sidebar';
    return `<button type="button" class="${cls}${active ? ' active' : ''}" data-filter="${it.filter}" data-value="${esc(it.value)}">${label}</button>`;
  }).join('');
  const pillsWrap = sidebar
    ? `<div class="filter-sidebar__options">${pills}</div>`
    : `<div class="flex flex-wrap gap-2">${pills}</div>`;
  return `<div class="filter-group${compact ? ' filter-group--compact' : ''}${sidebar ? ' filter-sidebar__group' : ''}">
    <div class="filter-group__label">${groupLabel}</div>
    ${pillsWrap}
  </div>`;
}

function renderFilterQuickBar() {
  const pills = LANDING_QUICK_FILTERS.map((it) => {
    const label = it.labelKey ? t(it.labelKey) : esc(it.value);
    return `<button type="button" class="filter-pill filter-pill--inline" data-filter="${it.filter}" data-value="${esc(it.value)}">${label}</button>`;
  }).join('');
  return `<div class="games-quick-bar">
    <div class="games-quick-bar__row">
      <span class="games-quick-bar__label">${t('filters.quick')}</span>
      <div class="games-quick-bar__pills">${pills}</div>
      <button type="button" class="games-quick-bar__all" data-route="games/filtros">${t('filters.viewAll')} ${icon('chevron')}</button>
    </div>
    <button type="button" class="games-quick-bar__addon" data-route="games/adiciones/skins">${t('games.additions')}</button>
  </div>`;
}

function renderGamesFilterPage() {
  const filtered = filterGames();
  const activeCount = Object.keys(state.activeFilters).length;
  const sidebarGroups = [
    ...Object.values(QUICK_GAME_FILTERS).map((g) => renderFilterPillGroup(g, { showActive: true, sidebar: true })),
    ...Object.entries(FILTER_TAXONOMY).map(([axis, items]) => renderFilterPillGroup({
      label: FILTER_AXIS_LABELS[axis] || axis,
      items: items.map((v) => ({ filter: axis, value: v })),
    }, { showActive: true, sidebar: true })),
  ].join('');
  return `<div class="games-filter-layout">
    <aside class="filter-sidebar" aria-label="${t('filters.title')}">
      <div class="filter-sidebar__head">
        <h2 class="filter-sidebar__title">${t('filters.title')}</h2>
        ${activeCount ? `<button type="button" class="filter-sidebar__clear" data-clear-filters>${t('filters.clear')}</button>` : ''}
      </div>
      <div class="filter-sidebar__scroll">${sidebarGroups}</div>
    </aside>
    <div class="games-filter-main">
      <div class="games-filter-main__bar">
        <p class="games-filter-main__meta">${filtered.length} ${t('filters.resultsLabel')}</p>
        <button type="button" class="games-filter-main__back" data-route="games">${t('filters.backToGames')}</button>
      </div>
      ${filtered.length
        ? `<div class="products-grid products-grid--games stagger">${filtered.map((g, i) => productCard(g, i)).join('')}</div>`
        : `<p class="games-filter-empty">${t('filters.noResults')}</p>`}
    </div>
  </div>`;
}

function licenseServices(tipo, plat) {
  return getServices().filter((s) => s.type === tipo && (!plat || s.platformKey === plat));
}

/* ─── RENDER: Shell ─── */

function renderLocalePanel() {
  const panel = document.getElementById('locale-panel');
  const btn = document.getElementById('locale-btn');
  if (!panel || !btn) return;

  panel.innerHTML = `
    <div class="locale-panel__header">${t('locale.title')}</div>
    ${LOCALE_PRESETS.map((p) => {
      const active = state.userLocale.localeId === p.id;
      return `<button class="locale-option ${active ? 'active' : ''}" data-locale="${p.id}" role="option" aria-selected="${active}">
        <span class="locale-option__flag">${icon(p.flag)}</span>
        <span class="locale-option__info">
          <span class="locale-option__country">${esc(p.country)}</span>
          <span class="locale-option__meta">${esc(p.language)} · ${esc(p.currency)}</span>
        </span>
        ${active ? `<span class="locale-option__check">${icon('check')}</span>` : ''}
      </button>`;
    }).join('')}
    <button class="locale-panel__link" data-route="auth/mi-cuenta">${t('locale.advanced')}</button>`;

  panel.classList.toggle('hidden', !state.localeOpen);
  btn.setAttribute('aria-expanded', String(state.localeOpen));

  panel.querySelectorAll('[data-locale]').forEach((el) => {
    el.onclick = () => {
      const preset = LOCALE_PRESETS.find((l) => l.id === el.dataset.locale);
      if (preset) setLocale(preset);
    };
  });
  panel.querySelector('[data-route]')?.addEventListener('click', () => {
    state.localeOpen = false;
    pushCrumb('Mi cuenta', 'auth/mi-cuenta');
  });
}

function renderLocaleButton() {
  const preset = getLocalePreset();
  const flagSlot = document.getElementById('locale-flag-slot');
  const currencyLabel = document.getElementById('locale-currency-label');
  if (flagSlot) flagSlot.innerHTML = icon(preset.flag);
  if (currencyLabel) currencyLabel.textContent = preset.currency;
}

function renderL1Nav() {
  const nav = document.getElementById('l1-nav');
  nav.innerHTML = L1_NODES.map((n) => {
    const active = state.route === n.route || state.route.startsWith(n.route + '/');
    return `<button class="l1-link ${active ? 'active' : ''}" data-l1="${n.route}">${esc(t(n.labelKey))}</button>`;
  }).join('');
  nav.querySelectorAll('[data-l1]').forEach((btn) => {
    btn.onclick = () => pushCrumb(btn.textContent, btn.dataset.l1);
  });
}

function renderBreadcrumbs() {
  const el = document.getElementById('breadcrumbs');
  const hideOnHome = state.route === 'home' && state.breadcrumbs.length <= 1;
  if (hideOnHome) {
    el.innerHTML = '';
    el.classList.add('hidden');
    el.setAttribute('aria-hidden', 'true');
    return;
  }
  el.classList.remove('hidden');
  el.removeAttribute('aria-hidden');
  el.innerHTML = state.breadcrumbs.map((c, i) => {
    const last = i === state.breadcrumbs.length - 1;
    return `${i ? '<span class="breadcrumb-sep">›</span>' : ''}${last
      ? `<span class="breadcrumb-current">${esc(c.label)}</span>`
      : `<button class="breadcrumb-link" data-bc="${i}">${esc(c.label)}</button>`}`;
  }).join('');
  el.querySelectorAll('[data-bc]').forEach((b) => { b.onclick = () => goBreadcrumb(+b.dataset.bc); });
}

function renderFooter() {
  document.getElementById('site-footer').innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-10">
      <div class="footer-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
        ${FOOTER.map((col) => `<div class="footer-col"><h4>${esc(col.title)}</h4>
          ${col.links.map((l) => `<button class="footer-link ${l.crossLink ? 'footer-cross-link' : ''}" data-route="${l.route}">${esc(l.label)}</button>`).join('')}
        </div>`).join('')}
      </div>
      <p class="text-center text-xs mt-10" style="color:var(--text-dim)">© Eneba LATAM — Vista previa del rediseño</p>
    </div>`;
  document.getElementById('site-footer').querySelectorAll('[data-route]').forEach((b) => {
    b.onclick = () => pushCrumb(b.textContent, b.dataset.route);
  });
}

function updateHeaderCart() {
  const total = state.cartItems.reduce((s, i) => s + i.qty, 0);
  const hasItems = total > 0;
  const btn = document.getElementById('cart-btn');
  const slot = document.getElementById('cart-icon-slot');
  const countEl = document.getElementById('cart-count');

  if (slot) slot.innerHTML = icon(hasItems ? 'cartFilled' : 'cart');
  if (btn) {
    btn.classList.toggle('header-btn--cart-active', hasItems);
    btn.setAttribute('aria-label', hasItems ? `${t('cart.title')} (${total})` : t('cart.title'));
  }
  if (countEl) {
    if (hasItems) {
      countEl.textContent = total > 99 ? '99+' : String(total);
      countEl.classList.remove('hidden');
    } else {
      countEl.classList.add('hidden');
    }
  }
}

function renderCart() {
  state.cartItems.forEach((i) => {
    const p = getProduct(i.id);
    if (p?.title) i.title = p.title;
    if (i.priceEur != null) i.price = formatPrice(i.priceEur);
  });

  updateHeaderCart();

  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');

  drawer.classList.toggle('open', state.cartOpen);
  overlay.classList.toggle('hidden', !state.cartOpen);

  const steps = ['bolsa', 'pago', 'confirmacion'];
  const labels = ['Bolsa', 'Pago', 'Confirmación'];
  const si = steps.indexOf(state.cartStep);
  document.getElementById('cart-steps').innerHTML = labels.map((l, i) =>
    `<span class="cart-step ${i === si ? 'active' : i < si ? 'done' : ''}">${l}</span>`).join('');

  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');

  if (state.cartStep === 'bolsa') {
    body.innerHTML = state.cartItems.length === 0
      ? `<div class="text-center py-12" style="color:var(--text-muted)"><p>${t('cart.empty')}</p><p class="text-sm mt-2">${t('cart.emptyHint')}</p></div>`
      : state.cartItems.map((i) => `<div class="cart-item">
          <img class="cart-item__thumb" src="${esc(i.image || '')}" alt="" onerror="this.style.display='none'" />
          <div class="flex-1"><p class="font-medium text-sm">${esc(i.title)}</p><p class="text-xs" style="color:var(--text-muted)">Cantidad: ${i.qty}</p></div>
          <span class="price-current text-sm">${esc(i.price)}</span></div>`).join('');
    const sumEur = state.cartItems.reduce((s, i) => s + i.qty * (i.priceEur || 0), 0);
    footer.innerHTML = state.cartItems.length
      ? `<div class="flex justify-between mb-4 font-bold"><span>${t('cart.total')}</span><span class="price-current">${formatPrice(sumEur)}</span></div>
         <button id="cart-to-pago" class="btn-green w-full">${t('cart.checkout')}</button>` : '';
    document.getElementById('cart-to-pago')?.addEventListener('click', () => { state.cartStep = 'pago'; renderCart(); });
  } else if (state.cartStep === 'pago') {
    body.innerHTML = `<p class="text-sm mb-4" style="color:var(--text-muted)">Método de pago</p>
      <select class="form-input"><option>Tarjeta de crédito / débito</option><option>PayPal</option><option>Billetera Eneba</option></select>
      <div class="mt-4 p-3 rounded-lg" style="background:var(--glass);border:1px solid var(--border)">
        ${state.cartItems.map((i) => `<p class="text-sm py-1">${esc(i.title)} ×${i.qty}</p>`).join('') || '<p class="text-sm">Resumen del pedido</p>'}
      </div>`;
    footer.innerHTML = `<button id="cart-confirm" class="btn-green w-full">${t('cart.confirm')}</button>
      <button id="cart-back" class="btn-ghost w-full mt-2">${t('cart.back')}</button>`;
    document.getElementById('cart-confirm')?.addEventListener('click', () => {
      state.orders.push({ id: 'ORD-' + Date.now(), items: [...state.cartItems], date: new Date().toLocaleDateString('es') });
      state.cartItems = [];
      state.cartStep = 'confirmacion';
      saveState();
      showToast('¡Pedido confirmado!');
      renderCart();
    });
    document.getElementById('cart-back')?.addEventListener('click', () => { state.cartStep = 'bolsa'; renderCart(); });
  } else {
    body.innerHTML = `<div class="text-center py-12">
      <div class="text-4xl mb-4" style="color:var(--green)">${icon('check')}</div>
      <p class="font-display font-bold text-xl" style="color:var(--green)">${t('cart.success')}</p>
      <p class="text-sm mt-2" style="color:var(--text-muted)">${t('cart.successHint')}</p></div>`;
    footer.innerHTML = `<button id="cart-done" class="btn-green w-full">${t('cart.done')}</button>`;
    document.getElementById('cart-done')?.addEventListener('click', () => { state.cartOpen = false; state.cartStep = 'bolsa'; render(); });
  }
}

function buildSearchPanelHtml() {
  const q = state.searchQuery.toLowerCase();
  const results = SEARCH_INDEX_HI.filter((s) => !q || s.q.toLowerCase().includes(q) || s.label.toLowerCase().includes(q));
  const history = ['Cyberpunk 2077', 'Steam Wallet', 'Xbox Game Pass'];
  return `
    ${!q ? `<div class="search-panel-header">${t('search.recent')}</div>
      ${history.map((h) => { const it = SEARCH_INDEX_HI.find((s) => s.q === h); return it ? searchItem(it) : ''; }).join('')}` : ''}
    <div class="search-panel-header">${t('search.suggestions')}</div>
    ${results.map(searchItem).join('')}`;
}

function renderSearchPanel() {
  const panel = document.getElementById('search-panel');
  if (!panel) return;
  if (!state.searchFocused) { panel.classList.add('hidden'); return; }
  panel.innerHTML = buildSearchPanelHtml();
  panel.classList.remove('hidden');
  panel.querySelectorAll('[data-sroute]').forEach((el) => {
    el.onclick = () => { state.searchFocused = false; pushCrumb(el.dataset.label, el.dataset.sroute); };
  });
}

function bindSearchInput(input) {
  if (!input) return;
  input.placeholder = t('search.placeholder');
  input.value = state.searchQuery;
  input.onfocus = () => { state.searchFocused = true; renderSearchPanel(); };
  input.onblur = () => setTimeout(() => { state.searchFocused = false; renderSearchPanel(); }, 200);
  input.oninput = (e) => { state.searchQuery = e.target.value; renderSearchPanel(); };
  input.onkeydown = (e) => {
    if (e.key === 'Enter' && state.searchQuery.trim()) {
      const match = SEARCH_INDEX_HI.find((s) => s.q.toLowerCase().includes(state.searchQuery.toLowerCase()));
      if (match) pushCrumb(match.q, match.route);
    }
  };
}

function searchItem(s) {
  return `<button class="search-item" data-sroute="${s.route}" data-label="${esc(s.q)}">
    <span class="search-item-type">${esc(s.type || 'item')}</span>
    <span>${esc(s.q)}</span>
    <span style="color:var(--text-dim);margin-left:auto;font-size:0.75rem">→ ${esc(s.label)}</span>
  </button>`;
}

/* ─── RENDER: Views ─── */

function renderHome() {
  const slide = HERO_SLIDES[state.heroIndex % HERO_SLIDES.length];
  return `
    <section class="hero hero--full">
      <div class="hero__bg" style="background-image:url('${slide.image}')"></div>
      <div class="hero__overlay"></div>
      <div class="hero__inner">
        <div class="hero__content">
          <span class="hero__tag">${t('home.heroTag')}</span>
          <h1 class="hero__title">${esc(slide.title)}</h1>
          <p class="hero__desc">${esc(slide.desc)}</p>
          <button class="btn-green" data-route="${slide.route}">${esc(slide.cta)}</button>
        </div>
      </div>
    </section>
    <div class="home-content">
      <nav class="quick-cats" aria-label="Categorías rápidas">
        ${QUICK_CATEGORIES.map((c) => `<button class="quick-cat" data-route="${c.route}">${icon(c.icon)}<span>${esc(c.labelKey ? t(c.labelKey) : c.label)}</span></button>`).join('')}
      </nav>
      <div class="section-header"><h2 class="section-title">${t('home.recentlyViewed')}</h2></div>
      <div class="products-grid products-grid--games stagger">${getAllGames().map((g, i) => productCard(g, i)).join('')}</div>
    </div>`;
}

function renderSoftware() {
  const parts = state.route.split('/');
  const tipos = { vpn: t('software.vpn'), 'sistemas-operativos': t('software.os'), antivirus: t('software.antivirus') };
  const plats = { windows: 'windows', mac: 'mac', android: 'android', linux: 'linux' };

  if (parts[1] && parts[2] && tipos[parts[1]]) {
    const services = licenseServices(parts[1], parts[2]);
    return `<div class="section-header"><h2 class="section-title">${esc(tipos[parts[1]])} — ${esc(parts[2].charAt(0).toUpperCase() + parts[2].slice(1))}</h2></div>
      <div class="products-grid products-grid--games">${services.map((s, i) => serviceCard(s, i)).join('')}</div>
      <div class="mt-6">${crossLinkCard(t('nav.devices'), 'PC / Steam', 'devices/pc-steam')}</div>`;
  }
  if (parts[1] && tipos[parts[1]]) {
    return `<div class="section-header"><h2 class="section-title">${esc(tipos[parts[1]])}</h2></div>
      <p class="section-lead mb-6">${t('software.lead')}</p>
      <div class="os-grid">${Object.entries(plats).map(([k, pk]) => `
        <button class="os-card" data-route="software/${parts[1]}/${k}" style="--plat-color:${PLATFORM_META[pk]?.color || 'var(--orange)'}">
          ${icon(PLATFORM_META[pk]?.icon || pk)}<span>${esc(k.charAt(0).toUpperCase() + k.slice(1))}</span>
        </button>`).join('')}</div>`;
  }
  return `<div class="section-header"><h2 class="section-title">${t('software.title')}</h2></div>
    <p class="section-lead mb-8">${t('software.lead')}</p>
    <div class="grid md:grid-cols-3 gap-4 mb-8">${Object.entries(tipos).map(([k, v]) => `
      <div class="hub-card" data-route="software/${k}">${icon(k === 'vpn' ? 'globe' : k === 'antivirus' ? 'shield' : 'windows')}
        <p class="hub-card__title mt-3">${esc(v)}</p>
        <p class="hub-card__desc">Windows · Mac · Android · Linux</p>
      </div>`).join('')}</div>
    <div class="products-grid products-grid--games">${getServices('vpn').concat(getServices('sistemas-operativos'), getServices('antivirus')).map((s, i) => serviceCard(s, i)).join('')}</div>`;
}

function renderGames() {
  const [, sub, leaf] = state.route.split('/');
  if (sub === 'adiciones') {
    const labels = { skins: 'Skins & bundles', dlc: "DLC's", claves: 'Claves de juego' };
    return `<div class="section-header"><h2 class="section-title">Adiciones — ${esc(labels[leaf] || 'Catálogo')}</h2></div>
      <div class="products-grid products-grid--games stagger">${getAllGames().slice(0, 4).map((g, i) => productCard(g, i)).join('')}</div>
      <div class="mt-8">${crossLinkCard(t('filters.backToGames'), t('filters.backToGamesSub'), 'games')}</div>`;
  }
  if (sub === 'filtros') {
    return renderGamesFilterPage();
  }
  return `<div class="section-header"><h2 class="section-title">Juegos</h2></div>
    ${renderFilterQuickBar()}
    <div class="section-header"><h2 class="section-title">Destacados</h2>
      <div class="flex gap-2"><button class="btn-orange text-sm" data-route="offers">Ofertas</button><button class="btn-orange text-sm" data-route="recharges">Recargas</button></div>
    </div>
    <div class="products-grid products-grid--games stagger">${getAllGames().map((g, i) => productCard(g, i)).join('')}</div>`;
}

function renderOffers() {
  const sub = state.route.split('/')[1];
  const types = { todas: 'Todas las ofertas', 'juegos-baratos': 'Juegos baratos', 'ofertas-dia': 'Ofertas del día', 'nuevos-lanzamientos': 'Nuevos Lanzamientos', 'mas-vendidos': 'Más vendidos' };
  if (sub && types[sub]) {
    return `<div class="section-header"><h2 class="section-title">${esc(types[sub])}</h2></div>
      <div class="products-grid products-grid--games stagger">${getAllGames().map((g, i) => productCard(g, i)).join('')}</div>`;
  }
  return `<div class="section-header"><h2 class="section-title">Ofertas</h2></div>
    <div class="flex flex-wrap gap-2 mb-8">${Object.entries(types).map(([k, v]) => `<button class="filter-pill" data-route="offers/${k}">${esc(v)}</button>`).join('')}</div>
    <div class="products-grid products-grid--games stagger">${getAllGames().slice(0, 4).map((g, i) => productCard(g, i)).join('')}</div>`;
}

const RECHARGE_BRANCHES = [
  { key: 'monedas', titleKey: 'recharges.coins', subKey: 'recharges.coinsSub', icon: 'gamepad', route: 'recharges/monedas' },
  { key: 'gift-card', titleKey: 'recharges.giftCard', subKey: 'recharges.giftCardSub', icon: 'gift', route: 'recharges/gift-card' },
  { key: 'dinero', titleKey: 'recharges.money', subKey: 'recharges.moneySub', icon: 'creditcard', route: 'recharges/dinero' },
  { key: 'entretenimiento', titleKey: 'recharges.entertainment', subKey: 'recharges.entertainmentSub', icon: 'globe', route: 'recharges/entretenimiento' },
  { key: 'licencias', titleKey: 'recharges.licenses', subKey: 'recharges.licensesSub', icon: 'windows', route: 'recharges/licencias' },
];

function rechargeFilterActive(filterKey, value) {
  const current = state.rechargeFilters[filterKey] || 'all';
  return current === value;
}

function renderRechargeFilterRow(labelKey, filterKey, options) {
  const pills = options.map((opt) => {
    const label = opt.labelKey ? t(opt.labelKey) : esc(opt.label || opt.key);
    const active = rechargeFilterActive(filterKey, opt.key);
    return `<button type="button" class="filter-pill filter-pill--inline${active ? ' active' : ''}" data-recharge-filter="${filterKey}" data-value="${opt.key}">${label}</button>`;
  }).join('');
  return `<div class="recharge-filter-row">
    <span class="recharge-filter-row__label">${t(labelKey)}</span>
    <div class="recharge-filter-row__pills">${pills}</div>
  </div>`;
}

function renderRechargeSection({ title, lead, filterHtml, items }) {
  const grid = items.length
    ? `<div class="products-grid stagger">${items.map((s, i) => serviceCard(s, i)).join('')}</div>`
    : `<p class="section-lead">${t('recharges.noResults')}</p>`;
  return `<div class="section-header"><h2 class="section-title">${esc(title)}</h2></div>
    ${lead ? `<p class="section-lead mb-5">${lead}</p>` : ''}
    ${filterHtml ? `<div class="recharge-filters mb-6">${filterHtml}</div>` : ''}
    ${grid}`;
}

function getGiftCardServices() {
  const sub = state.rechargeFilters.giftSub || 'all';
  const all = getServices('gift-card');
  return sub === 'all' ? all : all.filter((s) => s.subCategory === sub);
}

function getEntertainmentServices() {
  const sub = state.rechargeFilters.entSub || 'all';
  if (sub === 'musica') return getServices('musica');
  if (sub === 'streaming') return getServices('streaming').concat(getServices('subscription'));
  return getServices('streaming').concat(getServices('subscription'), getServices('musica'));
}

function getLicenseServicesFiltered() {
  const tipo = state.rechargeFilters.licTipo || 'all';
  const plat = state.rechargeFilters.licPlatform || 'all';
  let items = getServices('vpn').concat(getServices('sistemas-operativos'), getServices('antivirus'));
  if (tipo !== 'all') items = items.filter((s) => s.type === tipo);
  if (plat !== 'all') items = items.filter((s) => s.platformKey === plat);
  return items;
}

function getMonedasServices() {
  const sub = state.rechargeFilters.monedasSub || 'all';
  const all = getServices('monedas');
  if (sub === 'fortnite') return all.filter((s) => s.titleKey === 'fortniteVbucks');
  if (sub === 'roblox') return all.filter((s) => s.titleKey === 'robloxRobux');
  return all;
}

function getDineroServices() {
  const sub = state.rechargeFilters.dineroSub || 'all';
  const all = getServices('dinero');
  return sub === 'all' ? all : all.filter((s) => s.subCategory === sub);
}

function renderRechargeBranches(activeKey) {
  return `<div class="recharge-branches">${RECHARGE_BRANCHES.map((b) => `
    <button type="button" class="recharge-branch-pill${activeKey === b.key ? ' active' : ''}" data-route="${b.route}">
      ${icon(b.icon)}<span>${t(b.titleKey)}</span>
    </button>`).join('')}</div>`;
}

function renderRecharges() {
  const parts = state.route.split('/');

  if (parts[1] === 'licencias') {
    const filters = [
      renderRechargeFilterRow('recharges.licenseType', 'licTipo', [
        { key: 'all', labelKey: 'recharges.all' },
        { key: 'vpn', labelKey: 'software.vpn' },
        { key: 'sistemas-operativos', labelKey: 'software.os' },
        { key: 'antivirus', labelKey: 'software.antivirus' },
      ]),
      renderRechargeFilterRow('recharges.licensePlatform', 'licPlatform', [
        { key: 'all', labelKey: 'recharges.all' },
        { key: 'windows', label: 'Windows' },
        { key: 'mac', label: 'Mac' },
        { key: 'android', label: 'Android' },
        { key: 'linux', label: 'Linux' },
      ]),
    ].join('');
    return `${renderRechargeBranches('licencias')}${renderRechargeSection({
      title: t('recharges.licenses'),
      lead: t('recharges.licensesLead'),
      filterHtml: filters,
      items: getLicenseServicesFiltered(),
    })}`;
  }

  if (parts[1] === 'gift-card') {
    const filters = renderRechargeFilterRow('recharges.giftCard', 'giftSub', [
      { key: 'all', labelKey: 'recharges.all' },
      { key: 'juegos', labelKey: 'recharges.giftGames' },
      { key: 'transporte', labelKey: 'recharges.giftTransport' },
      { key: 'viajes', labelKey: 'recharges.giftTravel' },
    ]);
    return `${renderRechargeBranches('gift-card')}${renderRechargeSection({
      title: t('recharges.giftCard'),
      lead: t('recharges.giftCardLead'),
      filterHtml: filters,
      items: getGiftCardServices(),
    })}`;
  }

  if (parts[1] === 'monedas') {
    const filters = renderRechargeFilterRow('recharges.coins', 'monedasSub', [
      { key: 'all', labelKey: 'recharges.all' },
      { key: 'fortnite', labelKey: 'recharges.fortnite' },
      { key: 'roblox', labelKey: 'recharges.roblox' },
    ]);
    return `${renderRechargeBranches('monedas')}${renderRechargeSection({
      title: t('recharges.coins'),
      lead: t('recharges.coinsLead'),
      filterHtml: filters,
      items: getMonedasServices(),
    })}`;
  }

  if (parts[1] === 'dinero') {
    const filters = renderRechargeFilterRow('recharges.money', 'dineroSub', [
      { key: 'all', labelKey: 'recharges.all' },
      { key: 'crypto', labelKey: 'recharges.crypto' },
      { key: 'tiendas', labelKey: 'recharges.stores' },
    ]);
    return `${renderRechargeBranches('dinero')}${renderRechargeSection({
      title: t('recharges.money'),
      lead: t('recharges.moneyLead'),
      filterHtml: filters,
      items: getDineroServices(),
    })}`;
  }

  if (parts[1] === 'entretenimiento') {
    const filters = renderRechargeFilterRow('recharges.entertainment', 'entSub', [
      { key: 'all', labelKey: 'recharges.all' },
      { key: 'streaming', labelKey: 'recharges.streaming' },
      { key: 'musica', labelKey: 'recharges.music' },
    ]);
    return `${renderRechargeBranches('entretenimiento')}${renderRechargeSection({
      title: t('recharges.entertainment'),
      lead: t('recharges.entertainmentLead'),
      filterHtml: filters,
      items: getEntertainmentServices(),
    })}`;
  }

  const featured = [
    ...getServices('gift-card').slice(0, 2),
    ...getServices('streaming').slice(0, 1),
    ...getServices('monedas').slice(0, 1),
    ...getServices('vpn').slice(0, 1),
  ];
  return `<div class="section-header"><h2 class="section-title">${t('recharges.title')}</h2></div>
    <p class="section-lead mb-5">${t('recharges.lead')}</p>
    ${renderRechargeBranches()}
    <div class="section-header mt-8"><h2 class="section-title">${t('recharges.featured')}</h2></div>
    <div class="products-grid stagger">${featured.map((s, i) => serviceCard(s, i)).join('')}</div>`;
}

function renderDevices() {
  const plat = state.route.split('/')[1];
  const map = { 'pc-steam': { label: 'PC / Steam', key: 'steam' }, xbox: { label: 'Xbox', key: 'xbox' }, playstation: { label: 'PlayStation', key: 'playstation' }, nintendo: { label: 'Nintendo', key: 'nintendo' } };
  if (plat && map[plat]) {
    const filtered = getAllGames().filter((g) => g.platformKey === map[plat].key || (plat === 'pc-steam' && g.platformKey === 'steam'));
    return `<div class="section-header"><h2 class="section-title">Dispositivos — ${esc(map[plat].label)}</h2>
      ${platformBadge(map[plat].key, 'md')}</div>
      <div class="products-grid products-grid--games mb-8">${(filtered.length ? filtered : getAllGames()).map((g, i) => productCard(g, i)).join('')}</div>
      ${crossLinkCard(t('related.giftCard'), t('explore.giftCardsSub'), 'recharges/gift-card/juegos')}`;
  }
  return `<div class="section-header"><h2 class="section-title">Dispositivos y Consolas</h2></div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">${Object.entries(map).map(([slug, m]) => `
      <button class="os-card" data-route="devices/${slug}" style="--plat-color:${PLATFORM_META[m.key].color}">
        ${icon(m.key)}<span>${esc(m.label)}</span>
      </button>`).join('')}</div>`;
}

function keyTypeLabel(keyType) {
  return t('detail.keyTypes.' + keyType) || keyType;
}

function deviceLabel(d) {
  return t('detail.devices.' + d) || d;
}

function renderPdpContextMenus(p) {
  if (p.kind !== 'game') return '';
  const coins = getServices('monedas').map(enrichService).slice(0, 2);
  const skinItems = getAllGames().filter((g) => g.id !== p.id).slice(0, 2);
  const skinLabels = [t('detail.skinLegendary'), t('detail.skinSeason')];
  const coinItems = coins.map((s) => `
    <button type="button" class="pdp-context-item" data-route="product/${s.id}">
      <span class="pdp-context-item__label">${esc(s.title)}</span>
      <span class="price-current">${formatPrice(s.price)}</span>
    </button>`).join('');
  const skinRows = skinItems.map((g, i) => `
    <button type="button" class="pdp-context-item" data-route="product/${g.id}">
      <span class="pdp-context-item__label">
        <strong>${esc(skinLabels[i] || t('detail.skinLegendary'))}</strong>
        <small>${esc(g.title)}</small>
      </span>
      <span class="price-current">${formatPrice(g.price)}</span>
    </button>`).join('');
  return `<section class="pdp-context" aria-label="${t('detail.contextNav')}">
    <div class="pdp-context__grid">
      <article class="pdp-context-card">
        <button type="button" class="pdp-context-card__head" data-route="recharges/monedas">
          <span class="pdp-context-card__icon">${icon('gamepad')}</span>
          <div class="pdp-context-card__text">
            <p class="pdp-context-card__title">${t('detail.getCoins')}</p>
            <p class="pdp-context-card__sub">${t('detail.getCoinsSub')}</p>
          </div>
          <span class="pdp-context-card__chevron">${icon('chevron')}</span>
        </button>
        <div class="pdp-context-card__items">
          ${coinItems}
          <button type="button" class="pdp-context-item pdp-context-item--more" data-route="recharges/monedas">
            <span>${t('detail.viewAllCoins')}</span>
            <span class="pdp-context-item__arrow">${icon('chevron')}</span>
          </button>
        </div>
      </article>
      <article class="pdp-context-card">
        <button type="button" class="pdp-context-card__head" data-route="games/adiciones/skins">
          <span class="pdp-context-card__icon">${icon('heart')}</span>
          <div class="pdp-context-card__text">
            <p class="pdp-context-card__title">${t('detail.buySkins')}</p>
            <p class="pdp-context-card__sub">${t('detail.buySkinsSub')}</p>
          </div>
          <span class="pdp-context-card__chevron">${icon('chevron')}</span>
        </button>
        <div class="pdp-context-card__items">
          ${skinRows}
          <button type="button" class="pdp-context-item pdp-context-item--more" data-route="games/adiciones/skins">
            <span>${t('detail.viewAllSkins')}</span>
            <span class="pdp-context-item__arrow">${icon('chevron')}</span>
          </button>
        </div>
      </article>
    </div>
  </section>`;
}

function renderProduct() {
  const id = state.route.split('/')[1];
  const p = getProduct(id);
  const images = getGameImages(p);
  const slide = state.pdpSlide % images.length;
  const inWish = state.wishlist.includes(p.id);
  const best = p.sellers[0];
  const keyLabel = keyTypeLabel(p.keyType);
  const fullTitle = `${p.title} ${keyLabel} ${p.region || 'GLOBAL'}`;
  const related = getRelatedProducts(p.id, 4);
  const compat = (p.compatibility || []).join(', ');
  const deviceList = (p.devices || [p.device]).map(deviceLabel).join(', ');

  const posterSrc = getPdpPoster(images);
  const backdropSrc = getPdpBackdrop(images);

  return `<div class="pdp">
    <section class="pdp-hero" aria-label="${esc(p.title)}">
      <div class="pdp-hero__backdrop" id="pdp-backdrop" style="background-image:url('${esc(backdropSrc)}')"></div>
      <div class="pdp-hero__shade"></div>
      <div class="pdp-hero__inner">
        <div class="pdp-hero__grid">
          <div class="pdp-hero__media">
            <div class="pdp-hero__poster">
              <img id="pdp-hero-img" class="pdp-hero__poster-img" src="${esc(images[slide] || posterSrc)}" alt="${esc(p.title)}" fetchpriority="high" decoding="async" />
            </div>
            <div class="pdp-hero__thumbs">
              ${images.map((src, i) => `
                <button type="button" class="pdp__thumb ${i === slide ? 'active' : ''}" data-pdp-thumb="${i}" aria-label="Media ${i + 1}">
                  <img src="${esc(src)}" alt="" loading="lazy" decoding="async" />
                </button>`).join('')}
            </div>
          </div>

          <div class="pdp-hero__info">
            <div class="pdp-hero__info-head">
              <div>
                ${p.cashback ? `<span class="pdp__tag">${t('detail.cashbackOffer')}</span>` : ''}
                <h1 class="pdp__title">${esc(fullTitle)}</h1>
                ${p.subtitle ? `<p class="pdp__subtitle">${esc(p.subtitle)}</p>` : ''}
                <p class="pdp__viewers">${p.viewers} ${t('detail.viewers')}</p>
              </div>
              <button type="button" class="pdp__wish ${inWish ? 'active' : ''}" id="wishlist-btn" aria-label="${t('card.addWishlist')}">
                ${icon('heart')} <span>${p.wishlistCount + (inWish ? 1 : 0)}</span>
              </button>
            </div>
            <div class="pdp__meta-grid">
              <div class="pdp__meta-cell">
                ${icon('checkCircle')}
                <div><strong>${t('detail.region')}</strong><span>${t('detail.regionGlobal')}</span><small>${t('detail.regionNote')}</small></div>
              </div>
              <div class="pdp__meta-cell">
                ${platformLogoBadge(p.platformKey, 'md')}
                <div><strong>${keyLabel}</strong><a href="#" class="pdp__link" data-route="footer/activar-juegos">${t('detail.activationGuide')}</a></div>
              </div>
              <div class="pdp__meta-cell">
                ${icon('key')}
                <div><strong>${t('detail.format')}</strong><span>${t('detail.formatDigital')}</span><small>${t('detail.formatInstant')}</small></div>
              </div>
              <div class="pdp__meta-cell">
                ${icon('refresh')}
                <div><strong>${t('detail.refunds')}</strong></div>
              </div>
            </div>
            <p class="pdp__compat"><strong>${t('detail.worksOn')}</strong> ${esc(compat)}</p>
            <p class="pdp__device"><strong>${t('detail.platform')}</strong> ${esc(deviceList)}</p>
            <div class="pdp__tags">${(p.tags || []).map((tag) => `<span class="tag-pill">${esc(tag)}</span>`).join('')}</div>
          </div>

          <aside class="pdp-hero__aside">
            <div class="pdp__trust">
              <span class="pdp__trust-label">Trustpilot</span>
              <span class="pdp__trust-stars">${icon('star', 'icon-star')} 4.5 · Excelente</span>
            </div>
            <div class="pdp__buybox">
              <div class="pdp__buybox-price price-current">${formatPrice(best.price)}</div>
              ${best.cashbackPct ? `<span class="pdp__buybox-cashback">${best.cashbackPct}% ${t('card.cashback')}</span>` : ''}
              <button type="button" class="btn-pdp-paypal">PayPal</button>
              <div class="pdp__buybox-actions">
                <button type="button" class="btn-pdp-cta" data-add-cart="${p.id}" data-title="${esc(p.title)}" data-price-eur="${best.price}" data-image="${esc(posterSrc)}">${t('detail.buyNow')}</button>
                <button type="button" class="btn-pdp-cart" data-add-cart="${p.id}" data-title="${esc(p.title)}" data-price-eur="${best.price}" data-image="${esc(posterSrc)}" aria-label="${t('cart.title')}">${icon('cart')}</button>
              </div>
              ${p.sellers.length > 1 ? `<button type="button" class="pdp__more-offers">+${p.sellers.length - 1} ${t('detail.moreOffers')} ${formatPrice(p.sellers[p.sellers.length - 1].price)}</button>` : ''}
            </div>
            <div class="pdp__payments">
              <p>${t('detail.securePay')}</p>
              <div class="pdp__pay-icons">
                <span>VISA</span><span>MC</span><span>PayPal</span><span>G Pay</span><span>Nequi</span><span>Efecty</span>
              </div>
              <p class="pdp__scam">${t('detail.trustScore')} <strong>100 / 100</strong></p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    ${renderPdpContextMenus(p)}

    <div class="pdp-content">
      ${p.showGiftNotice ? `<div class="pdp__notice">${icon('alert')}<p>${t('detail.giftNotice')}</p></div>` : ''}

      <section class="pdp__section">
        <h2 class="pdp__section-title">${t('detail.recommendedOffers')}</h2>
        <div class="pdp__offers">
          ${p.sellers.map((s, i) => `
            <div class="pdp__offer-row ${i === 0 ? 'pdp__offer-row--best' : ''}">
              <div class="pdp__seller">
                <span class="pdp__seller-avatar">${esc(s.name.charAt(0))}</span>
                <div>
                  <p class="pdp__seller-name">${esc(s.name)} ${s.verified ? icon('checkCircle') : ''}</p>
                  <p class="pdp__seller-rating">${s.rating} · ${t('detail.excellent')}</p>
                </div>
              </div>
              <div class="pdp__offer-price">
                <span class="price-current">${formatPrice(s.price)}</span>
                ${s.cashbackPct ? `<span class="badge-cashback">${s.cashbackPct}% ${t('card.cashback')}</span>` : ''}
              </div>
              <button type="button" class="btn-pdp-buy" data-add-cart="${p.id}" data-title="${esc(p.title)}" data-price-eur="${s.price}" data-image="${esc(images[0])}">${t('detail.buyNow')}</button>
            </div>`).join('')}
        </div>
      </section>

      <section class="pdp__section">
        <h2 class="pdp__section-title">${t('detail.reviews')} ${p.rating ? `· ${icon('star', 'icon-star')} ${p.rating}` : ''}</h2>
        <div class="pdp__reviews">
          ${p.userReviews.map((r) => `
            <article class="pdp__review">
              <div class="pdp__review-head">
                <strong>${esc(r.author)}</strong>
                <span class="pdp__review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                <span class="pdp__review-date">${r.daysAgo}d</span>
              </div>
              <p>${esc(r.text)}</p>
            </article>`).join('')}
        </div>
      </section>

      ${related.length ? `<section class="pdp__section">
        <h2 class="pdp__section-title">${t('detail.related')}</h2>
        <div class="products-grid products-grid--related">${related.map((g, i) => productCard(g, i)).join('')}</div>
      </section>` : ''}

      <section class="pdp__section">
        <h2 class="pdp__section-title">${t('detail.alsoExplore')}</h2>
        <div class="pdp__network flex flex-col gap-3">
          ${crossLinkCard(`${t('detail.platform')}: ${p.platform || deviceList}`, t('explore.platformSub'), 'devices/' + (p.platformKey === 'steam' ? 'pc-steam' : p.platformKey))}
          ${(p.relatedNodes || []).map((n) => crossLinkCard(t('related.' + n.key), t('explore.categorySub'), n.route)).join('')}
          ${crossLinkCard(t('sections.offers'), t('explore.offersSub'), 'offers/juegos-baratos')}
        </div>
      </section>
    </div>
  </div>`;
}

function renderAuth() {
  if (!state.isLoggedIn) {
    if (state.authView === 'register') {
      return `<div class="auth-card"><h2 class="section-title mb-6">Crear cuenta</h2>
        <input class="form-input" placeholder="Nombre" /><input class="form-input" placeholder="Email" type="email" />
        <input class="form-input" placeholder="Contraseña" type="password" />
        <button class="btn-green w-full" id="mock-register">Registrarse</button>
        <button class="text-sm mt-4" style="color:var(--orange)" id="go-login">¿Ya tienes cuenta? Iniciar sesión</button></div>`;
    }
    return `<div class="auth-card"><h2 class="section-title mb-6">Iniciar sesión</h2>
      <input class="form-input" placeholder="Email" value="demo@eneba.lat" />
      <input class="form-input" placeholder="Contraseña" type="password" value="demo" />
      <button class="btn-green w-full" id="mock-login">Entrar</button>
      <button class="text-sm mt-4" style="color:var(--orange)" id="go-register">Crear cuenta nueva</button></div>`;
  }
  const view = state.route.split('/')[1];
  if (view === 'mi-cuenta' || view === 'config') {
    return `<h2 class="section-title mb-6">Configuración regional</h2>
      <p class="section-lead mb-6">Personaliza tu experiencia según país, idioma y moneda de preferencia.</p>
      <div class="locale-settings-grid">
        ${LOCALE_PRESETS.map((p) => {
          const active = state.userLocale.localeId === p.id;
          return `<button class="locale-settings-card ${active ? 'active' : ''}" data-locale-setting="${p.id}">
            <span class="locale-settings-card__flag">${icon(p.flag)}</span>
            <span class="locale-settings-card__country">${esc(p.country)}</span>
            <span class="locale-settings-card__meta">${esc(p.language)} · ${esc(p.currency)}</span>
          </button>`;
        }).join('')}
      </div>`;
  }
  if (view === 'favoritos') {
    const items = getAllGames().filter((g) => state.wishlist.includes(g.id));
    return `<h2 class="section-title mb-6">Favoritos — Lista de deseos</h2>
      ${items.length ? `<div class="products-grid">${items.map((g, i) => productCard(g, i)).join('')}</div>` : '<p style="color:var(--text-muted)">Añade juegos desde su ficha de producto.</p>'}`;
  }
  if (view === 'mis-compras') {
    return `<h2 class="section-title mb-6">Mis compras</h2>
      ${state.orders.length ? state.orders.map((o) => `<div class="hub-card mb-3"><p class="font-bold">${esc(o.id)}</p><p class="hub-card__desc">${esc(o.date)}</p></div>`).join('') : '<p style="color:var(--text-muted)">Completa el flujo del carrito para ver pedidos.</p>'}`;
  }
  return `<h2 class="section-title mb-6">Mi cuenta</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <button class="account-card" data-route="auth/mi-cuenta"><p class="account-card__title">${icon('user')} Mi cuenta</p><p class="account-card__sub">Región, idioma, moneda</p></button>
      <button class="account-card" data-route="auth/favoritos"><p class="account-card__title">${icon('heart')} Favoritos</p><p class="account-card__sub">${state.wishlist.length} en lista de deseos</p></button>
      <button class="account-card" data-route="auth/mis-compras"><p class="account-card__title">${icon('cart')} Mis compras</p><p class="account-card__sub">${state.orders.length} pedido(s)</p></button>
    </div>
    <button class="btn-ghost mt-6" id="mock-logout">Cerrar sesión</button>`;
}

function renderSupport() {
  const items = [
    { id: 'claves', title: 'Problemas con Claves', desc: 'Activación y errores de claves digitales', icon: 'gamepad' },
    { id: 'reembolsos', title: 'Reembolsos', desc: 'Política y solicitud de devolución', icon: 'creditcard' },
    { id: 'pagos', title: 'Métodos de Pago', desc: 'Tarjetas, PayPal, billetera', icon: 'globe' },
  ];
  return `<div class="section-header"><h2 class="section-title">Centro de ayuda</h2></div>
    <p class="section-lead mb-6">${t('support.lead')}</p>
    <div class="grid md:grid-cols-3 gap-4">${items.map((it) => `
      <div class="hub-card" data-route="support/${it.id}">${icon(it.icon)}<p class="hub-card__title mt-3">${esc(it.title)}</p><p class="hub-card__desc">${esc(it.desc)}</p></div>`).join('')}</div>`;
}

function renderSearch() {
  return `<h2 class="section-title mb-2">Búsqueda</h2>
    <p class="section-lead mb-6">${t('search.pageLead')}</p>
    <div class="search-panel-header" style="padding:0.5rem 0">Sugerencias populares</div>
    ${SEARCH_INDEX_HI.map(searchItem).join('')}`;
}

function renderFooterPage() {
  const page = state.route.replace('footer/', '');
  const titles = { 'sobre-nosotros': 'Sobre nosotros', contactanos: 'Contáctanos', vacantes: 'Vacantes', resenas: 'Reseñas', 'como-comprar': 'Cómo comprar', faq: 'FAQ', 'activar-juegos': 'Activar juegos', pqrs: 'PQRS', devoluciones: 'Devoluciones', noticias: 'Noticias', sorteos: 'Sorteos', snakzy: 'Snakzy', afiliado: 'Afiliados', vende: 'Vende en Eneba', anunciate: 'Anunciate', social: 'Redes sociales', app: 'App Eneba' };
  return `<h2 class="section-title mb-4">${esc(titles[page] || page)}</h2>
    <div class="hub-card max-w-xl"><p style="color:var(--text-muted)">${t('footer.pageContent')}</p></div>`;
}

function renderMain() {
  const r = state.route;
  if (r === 'home') return renderHome();
  if (r === 'search') return renderSearch();
  if (r.startsWith('auth')) return renderAuth();
  if (r.startsWith('games')) return renderGames();
  if (r.startsWith('offers')) return renderOffers();
  if (r.startsWith('recharges')) return renderRecharges();
  if (r.startsWith('devices')) return renderDevices();
  if (r.startsWith('software')) return renderSoftware();
  if (r.startsWith('support')) return renderSupport();
  if (r.startsWith('product')) return renderProduct();
  if (r.startsWith('footer')) return renderFooterPage();
  return renderHome();
}

function setCarouselSlide(gameId, idx) {
  const root = document.querySelector(`[data-carousel="${gameId}"]`);
  if (!root) return;
  const count = parseInt(root.dataset.count, 10) || 1;
  const slide = ((idx % count) + count) % count;
  root.dataset.slide = slide;
  const track = root.querySelector('.game-card__track');
  if (track) track.style.transform = `translateX(-${slide * 100}%)`;
  root.querySelectorAll('.game-card__dot').forEach((d, i) => d.classList.toggle('active', i === slide));
}

function bindMainEvents() {
  const main = document.getElementById('main-content');
  main.querySelectorAll('[data-route]').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      const label = (el.querySelector('.hub-card__title, .branch-card__title, .game-card__title, .product-card__title')?.textContent || el.textContent || '').trim().slice(0, 40);
      pushCrumb(label, el.dataset.route);
    };
  });
  main.querySelectorAll('[data-carousel-prev]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.carouselPrev;
      const root = document.querySelector(`[data-carousel="${id}"]`);
      setCarouselSlide(id, parseInt(root?.dataset.slide || '0', 10) - 1);
    };
  });
  main.querySelectorAll('[data-carousel-next]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.carouselNext;
      const root = document.querySelector(`[data-carousel="${id}"]`);
      setCarouselSlide(id, parseInt(root?.dataset.slide || '0', 10) + 1);
    };
  });
  main.querySelectorAll('[data-carousel-dot]').forEach((dot) => {
    dot.onclick = (e) => {
      e.stopPropagation();
      setCarouselSlide(dot.dataset.carouselDot, parseInt(dot.dataset.dot, 10));
    };
  });
  main.querySelectorAll('[data-wishlist-card]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      addToWishlist(btn.dataset.wishlistCard);
    };
  });
  main.querySelectorAll('.related-chip[data-route]').forEach((chip) => {
    chip.onclick = (e) => {
      e.stopPropagation();
      pushCrumb(chip.textContent.trim(), chip.dataset.route);
    };
  });
  main.querySelectorAll('.game-card[data-route], .service-card[data-route]').forEach((card) => {
    const go = () => {
      const title = card.querySelector('.game-card__title, .service-card__title')?.textContent?.trim() || 'Producto';
      pushCrumb(title.slice(0, 48), card.dataset.route);
    };
    card.onclick = (e) => {
      if (e.target.closest('button, .related-chip, .game-card__nav, .game-card__dot, .btn-buy, .game-card__wish')) return;
      go();
    };
    card.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } };
  });
  main.querySelectorAll('[data-pdp-thumb]').forEach((btn) => {
    btn.onclick = () => {
      state.pdpSlide = parseInt(btn.dataset.pdpThumb, 10);
      const p = getProduct(state.route.split('/')[1]);
      const imgs = getGameImages(p);
      const hero = document.getElementById('pdp-hero-img');
      const backdrop = document.getElementById('pdp-backdrop');
      const src = imgs[state.pdpSlide];
      if (hero && src) hero.src = src;
      if (backdrop && src) backdrop.style.backgroundImage = `url('${src}')`;
      main.querySelectorAll('[data-pdp-thumb]').forEach((b) => b.classList.toggle('active', +b.dataset.pdpThumb === state.pdpSlide));
    };
  });
  document.querySelector('.pdp__more-offers')?.addEventListener('click', () => {
    document.querySelector('.pdp__offers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  main.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const { filter: key, value: val } = btn.dataset;
      if (state.activeFilters[key] === val) delete state.activeFilters[key];
      else state.activeFilters[key] = val;
      if (!state.route.includes('filtros')) state.breadcrumbs.push({ label: 'Filtros', route: 'games/filtros' });
      state.route = 'games/filtros';
      saveState();
      render();
    };
  });
  main.querySelector('[data-clear-filters]')?.addEventListener('click', () => {
    state.activeFilters = {};
    saveState();
    render();
  });
  main.querySelectorAll('[data-recharge-filter]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const { rechargeFilter: key, value: val } = btn.dataset;
      if (val === 'all' || state.rechargeFilters[key] === val) delete state.rechargeFilters[key];
      else state.rechargeFilters[key] = val;
      const branch = state.route.split('/')[1];
      if (['gift-card', 'entretenimiento', 'licencias', 'monedas', 'dinero'].includes(branch)) {
        state.route = `recharges/${branch}`;
      }
      saveState();
      render();
    };
  });
  main.querySelectorAll('[data-add-cart]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      addToCart({ id: btn.dataset.addCart, title: btn.dataset.title, priceEur: parseFloat(btn.dataset.priceEur), image: btn.dataset.image });
    };
  });
  document.getElementById('mock-login')?.addEventListener('click', () => { state.isLoggedIn = true; showToast('Sesión iniciada'); saveState(); render(); });
  document.getElementById('mock-register')?.addEventListener('click', () => { state.isLoggedIn = true; showToast('Cuenta creada'); saveState(); render(); });
  document.getElementById('mock-logout')?.addEventListener('click', () => { state.isLoggedIn = false; navigate('home', [{ label: 'Eneba', route: 'home' }]); });
  document.getElementById('go-register')?.addEventListener('click', () => { state.authView = 'register'; render(); });
  document.getElementById('go-login')?.addEventListener('click', () => { state.authView = 'login'; render(); });
  document.getElementById('wishlist-btn')?.addEventListener('click', () => addToWishlist(state.route.split('/')[1]));
  document.querySelectorAll('[data-locale-setting]').forEach((btn) => {
    btn.onclick = () => {
      const preset = LOCALE_PRESETS.find((l) => l.id === btn.dataset.localeSetting);
      if (preset) setLocale(preset);
    };
  });
}

function applyShellI18n() {
  const si = document.getElementById('search-input');
  if (si) si.placeholder = t('search.placeholder');
  const authLabel = document.getElementById('auth-label');
  if (authLabel) authLabel.textContent = state.isLoggedIn ? t('auth.account') : t('auth.login');
  const cartTitle = document.getElementById('cart-title');
  if (cartTitle) cartTitle.textContent = t('cart.title');
}

function render() {
  syncCurrency();
  syncLanguage();
  applyShellI18n();
  renderLocaleButton();
  renderLocalePanel();
  renderL1Nav();
  renderBreadcrumbs();
  renderFooter();
  const isPdp = state.route.startsWith('product/');
  const isHome = state.route === 'home';
  document.querySelector('.page-wrap')?.classList.toggle('page-wrap--pdp', isPdp);
  const showHomeSearch = isHome && !isPdp;
  document.querySelector('.page-wrap')?.classList.toggle('page-wrap--home', showHomeSearch);
  document.getElementById('main-content').classList.toggle('main-content--pdp', isPdp);
  document.getElementById('main-content').classList.toggle('main-content--home', showHomeSearch);
  document.getElementById('main-content').innerHTML = renderMain();
  bindMainEvents();
  renderCart();
  renderSearchPanel();
}

function init() {
  document.getElementById('search-icon-slot').innerHTML = icon('search');
  document.getElementById('auth-icon-slot').innerHTML = icon('user');
  updateHeaderCart();
  document.getElementById('cart-close-icon').innerHTML = icon('close');
  document.getElementById('mobile-nav-toggle').innerHTML = icon('menu');
  document.getElementById('locale-chevron').innerHTML = icon('chevronDown');

  document.getElementById('logo-btn').onclick = () => navigate('home', [{ label: 'Eneba', route: 'home' }]);
  document.getElementById('auth-btn').onclick = () => pushCrumb(state.isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión', 'auth');
  document.getElementById('cart-btn').onclick = () => { state.cartOpen = true; render(); };
  document.getElementById('cart-close').onclick = () => { state.cartOpen = false; render(); };
  document.getElementById('cart-overlay').onclick = () => { state.cartOpen = false; render(); };

  document.getElementById('locale-btn').onclick = (e) => {
    e.stopPropagation();
    state.localeOpen = !state.localeOpen;
    renderLocalePanel();
  };

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.locale-wrap') && state.localeOpen) {
      state.localeOpen = false;
      renderLocalePanel();
    }
  });

  document.getElementById('mobile-nav-toggle').onclick = () => {
    document.getElementById('l1-nav').classList.toggle('open');
  };

  bindSearchInput(document.getElementById('search-input'));

  setInterval(() => {
    if (state.route !== 'home') return;
    state.heroIndex++;
    const slide = HERO_SLIDES[state.heroIndex % HERO_SLIDES.length];
    const bg = document.querySelector('.hero__bg');
    const title = document.querySelector('.hero__title');
    const desc = document.querySelector('.hero__desc');
    const cta = document.querySelector('.hero .btn-green');
    if (bg) bg.style.backgroundImage = `url('${slide.image}')`;
    if (title) title.textContent = slide.title;
    if (desc) desc.textContent = slide.desc;
    if (cta) { cta.textContent = slide.cta; cta.dataset.route = slide.route; }
  }, 8000);

  syncLanguage();
  render();
}

document.addEventListener('DOMContentLoaded', init);
