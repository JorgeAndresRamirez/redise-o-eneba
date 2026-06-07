/* Eneba LATAM — Prototipo Arquitectura en Red */

const MOCK_GAMES = [
  { id: 'juego-x', title: 'Juego X', platform: 'PC/Steam', price: '29,99 €', discount: '-40%', genre: 'Acción', cashback: true },
  { id: 'batman-origins', title: 'Batman: Arkham Origins', platform: 'Steam', price: '0,88 €', discount: '-89%', cashback: true },
  { id: 'pubg-mobile', title: 'PUBG Mobile (1200 G-Coin)', platform: 'GLOBAL', price: '11,19 €', cashback: true },
  { id: 'free-fire', title: 'Free Fire (530 + 53 Diamantes)', platform: 'GLOBAL', price: '4,99 €', cashback: true },
  { id: 'xbox-game-pass', title: 'Xbox Game Pass Ultimate', platform: 'Xbox Live', price: '12,99 €', cashback: true },
  { id: 'gothic-remake', title: 'Gothic 1 Remake', platform: 'PC/Steam', price: '49,99 €', discount: '-15%', cashback: false },
];

const MOCK_SERVICES = [
  { id: 'steam-wallet-20', title: 'Steam Wallet 20€', price: '20,00 €', type: 'gift-card' },
  { id: 'steam-wallet-50', title: 'Steam Wallet 50€', price: '50,00 €', type: 'gift-card' },
  { id: 'nordvpn-win', title: 'NordVPN 1 año (Windows)', price: '45,00 €', type: 'vpn' },
  { id: 'monedas-vbucks', title: 'V-Bucks 1000', price: '7,99 €', type: 'monedas' },
];

const SEARCH_INDEX = [
  { q: 'Juego X', route: 'product/juego-x', label: 'Juego X' },
  { q: 'Steam Wallet', route: 'recharges/gift-card/juegos', label: 'Tarjetas de regalo (juegos)' },
  { q: 'Xbox Game Pass', route: 'recharges/entretenimiento/streaming', label: 'Streaming' },
  { q: 'Gothic 1 Remake', route: 'product/gothic-remake', label: 'Gothic 1 Remake' },
  { q: 'Forza 6', route: 'offers/nuevos-lanzamientos', label: 'Nuevos Lanzamientos' },
  { q: 'NordVPN', route: 'recharges/licencias/vpn/windows', label: 'VPN — Windows' },
  { q: 'Claves Steam aleatorias', route: 'games/adiciones/claves', label: 'Claves de juego' },
];

const L1_NODES = [
  { id: 'search', label: 'Búsqueda', route: 'search' },
  { id: 'auth', label: 'Iniciar sesión', route: 'auth' },
  { id: 'games', label: 'Juegos', route: 'games' },
  { id: 'offers', label: 'Ofertas', route: 'offers' },
  { id: 'recharges', label: 'Recargas', route: 'recharges' },
  { id: 'devices', label: 'Dispositivos', route: 'devices' },
  { id: 'support', label: 'Soporte', route: 'support', rootOnly: true },
];

const FILTER_TAXONOMY = {
  modo: ['Multijugador', 'Battle Royale', 'Un solo jugador', 'Co-Op', 'FPS/TPS', 'Estrategia'],
  genero: ['Acción', 'Simulación', 'Deportes', 'Aventuras', 'Carreras', 'Horror', 'Lucha', 'Puzzles', 'MMO'],
  mecanica: ['Hack Slash', 'RPG', 'Arcade'],
  perspectiva: ['Primera persona', 'Tercera persona', 'Vista de pájaro'],
  dispositivos: ['PC/Steam', 'Xbox', 'PlayStation', 'Nintendo'],
};

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
  { title: 'Descarga la app', links: [
    { label: 'App de Eneba', route: 'footer/app' },
  ]},
];

const DEFAULT_STATE = {
  route: 'home',
  breadcrumbs: [{ label: 'Eneba', route: 'home' }],
  cartOpen: false,
  cartStep: 'bolsa',
  cartItems: [],
  wishlist: [],
  isLoggedIn: false,
  authView: 'login',
  userLocale: { region: 'LATAM', language: 'Español', currency: 'EUR' },
  activeFilters: {},
  searchQuery: '',
  orders: [],
};

function loadState() {
  try {
    const saved = localStorage.getItem('eneba-mockup');
    if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch (_) {}
  return { ...DEFAULT_STATE };
}

function saveState() {
  const { cartOpen, ...persist } = state;
  localStorage.setItem('eneba-mockup', JSON.stringify(persist));
}

let state = loadState();

function navigate(route, crumbs) {
  if (route.startsWith('support') && state.route !== 'home' && !state.breadcrumbs.some(c => c.route === 'home')) {
    const onHome = state.route === 'home';
    if (!onHome && route === 'support') return;
  }
  if (route === 'support' && state.route !== 'home' && state.breadcrumbs[0]?.route !== 'home') {
    const lastHome = state.breadcrumbs.findIndex(c => c.route === 'home');
    if (lastHome === -1 && state.route !== 'home') return;
  }
  state.route = route;
  state.breadcrumbs = crumbs || [{ label: 'Eneba', route: 'home' }];
  saveState();
  render();
}

function pushCrumb(label, route) {
  const idx = state.breadcrumbs.findIndex(c => c.route === route);
  if (idx >= 0) {
    state.breadcrumbs = state.breadcrumbs.slice(0, idx + 1);
  } else {
    state.breadcrumbs.push({ label, route });
  }
  state.route = route;
  saveState();
  render();
}

function goBreadcrumb(index) {
  const crumb = state.breadcrumbs[index];
  state.breadcrumbs = state.breadcrumbs.slice(0, index + 1);
  state.route = crumb.route;
  saveState();
  render();
}

function isOnHome() {
  return state.route === 'home' || state.breadcrumbs.length === 1;
}

function addToCart(item) {
  const existing = state.cartItems.find(i => i.id === item.id);
  if (existing) existing.qty += 1;
  else state.cartItems.push({ ...item, qty: 1 });
  state.cartOpen = true;
  state.cartStep = 'bolsa';
  saveState();
  render();
}

function addToWishlist(id) {
  if (!state.wishlist.includes(id)) state.wishlist.push(id);
  saveState();
  render();
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function productCard(g) {
  return `<div class="product-card" data-route="product/${g.id}">
    <div class="h-32 bg-eneba-purple flex items-center justify-center text-4xl font-bold opacity-30">${esc(g.title.charAt(0))}</div>
    <div class="p-3">
      ${g.cashback ? '<span class="badge-cashback">DE CASHBACK</span>' : ''}
      <h3 class="font-medium text-sm mt-1 line-clamp-2">${esc(g.title)}</h3>
      <p class="text-xs text-white/50 mt-1">${esc(g.platform)}</p>
      <div class="flex items-center gap-2 mt-2">
        <span class="font-bold text-eneba-green">${esc(g.price)}</span>
        ${g.discount ? `<span class="text-xs text-eneba-orange">${esc(g.discount)}</span>` : ''}
      </div>
    </div>
  </div>`;
}

function renderL1Nav() {
  const nav = document.getElementById('l1-nav');
  nav.innerHTML = L1_NODES.map(n => {
    const disabled = n.rootOnly && !isOnHome() && state.route !== 'home';
    const active = state.route.startsWith(n.route) || (n.id === 'auth' && state.route.startsWith('auth'));
    return `<button class="l1-pill ${active ? 'active' : ''}" data-l1="${n.route}" ${disabled ? 'disabled' : ''}>${esc(n.label)}</button>`;
  }).join('');
  nav.querySelectorAll('[data-l1]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      const r = btn.dataset.l1;
      if (r === 'support' && state.route !== 'home') {
        if (!confirm('Soporte solo es accesible desde Home. ¿Ir a Home?')) return;
        navigate('home', [{ label: 'Eneba', route: 'home' }]);
        return;
      }
      pushCrumb(btn.textContent, r);
    });
  });
}

function renderBreadcrumbs() {
  const el = document.getElementById('breadcrumbs');
  el.innerHTML = state.breadcrumbs.map((c, i) => {
    const isLast = i === state.breadcrumbs.length - 1;
    return `${i > 0 ? '<span class="breadcrumb-sep">›</span>' : ''}<span class="${isLast ? 'text-white font-medium' : 'breadcrumb-link'}" data-bc="${i}">${esc(c.label)}</span>`;
  }).join('');
  el.querySelectorAll('[data-bc]').forEach(span => {
    if (span.classList.contains('breadcrumb-link')) {
      span.addEventListener('click', () => goBreadcrumb(Number(span.dataset.bc)));
    }
  });
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  el.innerHTML = `<div class="max-w-7xl mx-auto px-4 py-8">
    <div class="footer-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
      ${FOOTER.map(col => `<div class="footer-col">
        <h4>${esc(col.title)}</h4>
        ${col.links.map(l => `<button class="footer-link ${l.crossLink ? 'footer-cross-link' : ''}" data-route="${l.route}">${esc(l.label)}</button>`).join('')}
      </div>`).join('')}
    </div>
    <p class="text-center text-xs text-white/40 mt-8">Prototipo académico UNIR — No oficial</p>
  </div>`;
  el.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = btn.dataset.route;
      pushCrumb(btn.textContent, r);
    });
  });
}

function renderCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  const title = document.getElementById('cart-title');
  const count = document.getElementById('cart-count');
  const totalItems = state.cartItems.reduce((s, i) => s + i.qty, 0);

  if (totalItems > 0) {
    count.textContent = totalItems;
    count.classList.remove('hidden');
  } else {
    count.classList.add('hidden');
  }

  if (state.cartOpen) {
    drawer.classList.add('open');
    overlay.classList.remove('hidden');
  } else {
    drawer.classList.remove('open');
    overlay.classList.add('hidden');
  }

  const steps = { bolsa: 'Bolsa de compra', pago: 'Pago', confirmacion: 'Confirmación' };
  title.textContent = steps[state.cartStep] || 'Carrito';

  if (state.cartStep === 'bolsa') {
    body.innerHTML = state.cartItems.length === 0
      ? '<p class="text-white/50 text-sm">Tu bolsa está vacía.</p>'
      : state.cartItems.map(i => `<div class="flex justify-between items-center py-3 border-b border-white/10">
          <div><p class="font-medium text-sm">${esc(i.title)}</p><p class="text-xs text-white/50">×${i.qty}</p></div>
          <span class="text-eneba-green font-medium">${esc(i.price)}</span>
        </div>`).join('');
    const total = state.cartItems.reduce((s, i) => s + i.qty * parseFloat(i.price), 0).toFixed(2);
    footer.innerHTML = state.cartItems.length > 0
      ? `<div class="flex justify-between mb-3 font-semibold"><span>Total</span><span class="text-eneba-green">${total} €</span></div>
         <button id="cart-to-pago" class="btn-green w-full">Ir a pago</button>`
      : '';
    document.getElementById('cart-to-pago')?.addEventListener('click', () => { state.cartStep = 'pago'; renderCart(); });
  } else if (state.cartStep === 'pago') {
    body.innerHTML = `<p class="text-sm text-white/70 mb-4">Método de pago (simulado)</p>
      <select class="w-full bg-eneba-purple border border-white/30 rounded px-3 py-2 mb-4 text-sm">
        <option>Tarjeta de crédito</option><option>PayPal</option><option>Billetera Eneba</option>
      </select>
      ${state.cartItems.map(i => `<p class="text-sm py-1">${esc(i.title)} — ${esc(i.price)}</p>`).join('')}`;
    footer.innerHTML = `<button id="cart-confirm" class="btn-green w-full">Confirmar pedido</button>
      <button id="cart-back-bolsa" class="btn-ghost w-full mt-2">Volver</button>`;
    document.getElementById('cart-confirm')?.addEventListener('click', () => {
      state.orders.push({ id: 'ORD-' + Date.now(), items: [...state.cartItems], date: new Date().toLocaleDateString('es') });
      state.cartItems = [];
      state.cartStep = 'confirmacion';
      saveState();
      renderCart();
    });
    document.getElementById('cart-back-bolsa')?.addEventListener('click', () => { state.cartStep = 'bolsa'; renderCart(); });
  } else {
    body.innerHTML = `<div class="text-center py-8">
      <p class="text-2xl mb-2 text-eneba-green font-bold">¡Pedido confirmado!</p>
      <p class="text-sm text-white/60">Gracias por tu compra simulada.</p>
    </div>`;
    footer.innerHTML = `<button id="cart-done" class="btn-green w-full">Cerrar</button>`;
    document.getElementById('cart-done')?.addEventListener('click', () => {
      state.cartOpen = false;
      state.cartStep = 'bolsa';
      render();
    });
  }
}

function renderHome() {
  return `<section class="hero-banner p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
    <div class="flex-1">
      <h1 class="text-2xl md:text-3xl font-bold mb-2">CLAVES DE STEAM ALEATORIAS</h1>
      <p class="text-white/70 text-sm mb-4">Descubre juegos sorpresa para tu biblioteca de Steam.</p>
      <button class="btn-green" data-route="games/adiciones/claves">COMPRA AHORA</button>
    </div>
    <div class="w-32 h-32 bg-eneba-purple rounded-lg flex items-center justify-center text-2xl font-bold opacity-40">STEAM</div>
  </section>
  <div class="flex flex-wrap gap-3 mb-8 justify-center">
    ${['Juegos', 'eCards', 'eTarjetas', 'Steam', 'Xbox', 'PSN'].map(c => `<button class="filter-pill" data-route="games">${esc(c)}</button>`).join('')}
  </div>
  <h2 class="text-xl font-bold mb-4">Vistos recientemente</h2>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    ${MOCK_GAMES.map(productCard).join('')}
  </div>`;
}

function renderGames() {
  const parts = state.route.split('/');
  const sub = parts[1];
  const leaf = parts[2];

  if (sub === 'adiciones') {
    const items = { skins: 'Skins & bundles', dlc: "DLC's", claves: 'Claves de juego' };
    return `<h2 class="text-xl font-bold mb-4">Adiciones de juegos — ${esc(items[leaf] || 'Catálogo')}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${MOCK_GAMES.slice(0, 4).map(productCard).join('')}</div>
      <div class="mt-6 cross-link" data-route="games"><p class="text-sm text-eneba-orange font-medium">← Volver a Juegos</p></div>`;
  }

  if (sub === 'filtros' || Object.keys(state.activeFilters).length > 0) {
    const filtered = MOCK_GAMES.filter(g => {
      if (state.activeFilters.genero && g.genre !== state.activeFilters.genero) return false;
      if (state.activeFilters.dispositivos && g.platform !== state.activeFilters.dispositivos) return false;
      return true;
    });
    return `<h2 class="text-xl font-bold mb-2">Detalles del producto (Filtros)</h2>
      <p class="text-sm text-white/60 mb-4">Hub de filtros multidimensionales</p>
      <div class="flex flex-wrap gap-6 mb-6">
        ${Object.entries(FILTER_TAXONOMY).map(([axis, items]) => `
          <div><h3 class="text-xs font-semibold text-eneba-orange uppercase mb-2">${esc(axis)}</h3>
          <div class="flex flex-wrap gap-1">${items.map(it => {
            const key = axis;
            const active = state.activeFilters[key] === it;
            return `<button class="filter-pill ${active ? 'active' : ''}" data-filter="${key}" data-value="${esc(it)}">${esc(it)}</button>`;
          }).join('')}</div></div>`).join('')}
      </div>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="cross-link p-3 bg-white/5 rounded" data-route="offers/juegos-baratos"><p class="text-sm font-medium">Ofertas para estos filtros</p><p class="text-xs text-white/50">Cross-link → Ofertas</p></div>
        <div class="cross-link p-3 bg-white/5 rounded" data-route="recharges/monedas"><p class="text-sm font-medium">Monedas de juegos</p><p class="text-xs text-white/50">Cross-link → Recargas</p></div>
        <div class="cross-link p-3 bg-white/5 rounded" data-route="games/adiciones/dlc"><p class="text-sm font-medium">Adiciones de juegos</p><p class="text-xs text-white/50">DLCs y más</p></div>
      </div>
      <h3 class="font-semibold mb-3">Resultados (${filtered.length})</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${filtered.map(productCard).join('')}</div>`;
  }

  return `<h2 class="text-xl font-bold mb-4">Juegos</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="p-4 border border-white/15 rounded-lg cursor-pointer hover:border-eneba-orange transition" data-route="games/filtros">
        <h3 class="font-semibold text-eneba-orange">Detalles del producto (Filtros)</h3>
        <p class="text-sm text-white/60 mt-1">Modo, Género, Mecánica, Perspectiva, Dispositivos</p>
      </div>
      <div class="p-4 border border-white/15 rounded-lg cursor-pointer hover:border-eneba-orange transition" data-route="games/adiciones/skins">
        <h3 class="font-semibold">Adiciones de juegos</h3>
        <p class="text-sm text-white/60 mt-1">Skins, DLCs, Claves de juego</p>
      </div>
    </div>
    <h3 class="font-semibold mt-8 mb-3">Destacados</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${MOCK_GAMES.map(productCard).join('')}</div>
    <div class="flex gap-3 mt-6">
      <button class="btn-orange text-sm" data-route="offers">Ver Ofertas</button>
      <button class="btn-orange text-sm" data-route="recharges">Recargas</button>
    </div>`;
}

function renderOffers() {
  const sub = state.route.split('/')[1];
  const types = {
    'todas': 'Todas las ofertas', 'juegos-baratos': 'Juegos baratos', 'ofertas-dia': 'Ofertas del día',
    'nuevos-lanzamientos': 'Nuevos Lanzamientos', 'mas-vendidos': 'Más vendidos',
  };
  if (sub && types[sub]) {
    return `<h2 class="text-xl font-bold mb-4">${esc(types[sub])}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${MOCK_GAMES.map(productCard).join('')}</div>`;
  }
  return `<h2 class="text-xl font-bold mb-4">Ofertas</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      ${Object.entries(types).map(([k, v]) => `<button class="filter-pill" data-route="offers/${k}">${esc(v)}</button>`).join('')}
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${MOCK_GAMES.slice(0, 4).map(productCard).join('')}</div>`;
}

function renderRecharges() {
  const parts = state.route.split('/');
  const branches = {
    monedas: 'Monedas de juegos',
    'gift-card': 'Gift card', dinero: 'Dinero digital', entretenimiento: 'Suscripciones Entretenimiento',
    licencias: 'Licencias de Software',
  };

  if (parts[1] === 'licencias') {
    const tipo = parts[2];
    const plat = parts[3];
    const tipos = { vpn: 'VPN', 'sistemas-operativos': 'Sistemas Operativos', antivirus: 'Antivirus' };
    const plats = { windows: 'Windows', mac: 'Mac', android: 'Android', linux: 'Linux' };
    if (tipo && plat) {
      return `<h2 class="text-xl font-bold mb-4">Licencias — ${esc(tipos[tipo] || tipo)} — ${esc(plats[plat] || plat)}</h2>
        <div class="grid grid-cols-2 gap-4">${MOCK_SERVICES.filter(s => s.type === 'vpn' || s.type === 'gift-card').map(s => `
          <div class="product-card p-4" data-add-cart="${s.id}" data-title="${esc(s.title)}" data-price="${esc(s.price)}">
            <h3 class="font-medium">${esc(s.title)}</h3><p class="text-eneba-green font-bold mt-2">${esc(s.price)}</p>
          </div>`).join('')}</div>
        <div class="cross-link mt-4" data-route="devices"><p class="text-sm text-eneba-orange">← Cross-link desde Dispositivos/PC</p></div>`;
    }
    if (tipo) {
      return `<h2 class="text-xl font-bold mb-4">${esc(tipos[tipo] || tipo)}</h2>
        <p class="text-sm text-white/60 mb-4">Selecciona plataforma</p>
        <div class="flex flex-wrap gap-2">${Object.entries(plats).map(([k, v]) =>
          `<button class="filter-pill" data-route="recharges/licencias/${tipo}/${k}">${esc(v)}</button>`).join('')}</div>`;
    }
    return `<h2 class="text-xl font-bold mb-4">Licencias de Software</h2>
      <div class="flex flex-wrap gap-2">${Object.entries(tipos).map(([k, v]) =>
        `<button class="filter-pill" data-route="recharges/licencias/${k}">${esc(v)}</button>`).join('')}</div>`;
  }

  if (parts[1] === 'gift-card') {
    const subs = { transporte: 'Tarjetas regalo Transporte', viajes: 'Tarjetas regalo Viajes', juegos: 'Tarjetas de regalo (juegos)' };
    const sub = parts[2];
    if (sub) return `<h2 class="text-xl font-bold mb-4">${esc(subs[sub])}</h2>
      <div class="grid grid-cols-2 gap-4">${MOCK_SERVICES.filter(s => s.type === 'gift-card').map(s => productCard({ ...s, platform: 'Gift card', cashback: false })).join('')}</div>`;
    return `<h2 class="text-xl font-bold mb-4">Gift card</h2>
      <div class="flex flex-wrap gap-2">${Object.entries(subs).map(([k, v]) =>
        `<button class="filter-pill" data-route="recharges/gift-card/${k}">${esc(v)}</button>`).join('')}</div>`;
  }

  if (parts[1] === 'dinero') {
    const subs = { franquicias: 'Franquicias', crypto: 'Crypto' };
    const sub = parts[2];
    if (sub) return `<h2 class="text-xl font-bold mb-4">Dinero digital — ${esc(subs[sub])}</h2><p class="text-white/60 text-sm">Catálogo mock de ${esc(subs[sub])}.</p>`;
    return `<h2 class="text-xl font-bold mb-4">Dinero digital</h2>
      <div class="flex gap-2">${Object.entries(subs).map(([k, v]) =>
        `<button class="filter-pill" data-route="recharges/dinero/${k}">${esc(v)}</button>`).join('')}</div>`;
  }

  if (parts[1] === 'entretenimiento') {
    const subs = { streaming: 'Streaming', musica: 'Música' };
    const sub = parts[2];
    if (sub) return `<h2 class="text-xl font-bold mb-4">${esc(subs[sub])}</h2>
      <div class="grid grid-cols-2 gap-4">${productCard({ id: 'xbox-game-pass', title: 'Xbox Game Pass Ultimate', platform: 'Streaming', price: '12,99 €', cashback: true })}</div>`;
    return `<h2 class="text-xl font-bold mb-4">Suscripciones Entretenimiento</h2>
      <div class="flex gap-2">${Object.entries(subs).map(([k, v]) =>
        `<button class="filter-pill" data-route="recharges/entretenimiento/${k}">${esc(v)}</button>`).join('')}</div>`;
  }

  if (parts[1] === 'monedas') {
    return `<h2 class="text-xl font-bold mb-4">Monedas de juegos</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${MOCK_GAMES.filter(g => g.platform === 'GLOBAL').map(productCard).join('')}</div>`;
  }

  return `<h2 class="text-xl font-bold mb-4">Recargas y suscripciones</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${Object.entries(branches).map(([k, v]) => `<button class="p-4 border border-white/15 rounded-lg text-left hover:border-eneba-orange transition filter-pill" data-route="recharges/${k}">${esc(v)}</button>`).join('')}
    </div>`;
}

function renderDevices() {
  const plat = state.route.split('/')[1];
  const plats = ['PC/Steam', 'Xbox', 'PlayStation', 'Nintendo'];
  if (plat) {
    const filtered = MOCK_GAMES.filter(g => g.platform.includes(plat.replace('pc-steam', 'Steam').replace('pc-steam', 'PC')));
    return `<h2 class="text-xl font-bold mb-4">Dispositivos — ${esc(plat)}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">${(filtered.length ? filtered : MOCK_GAMES).map(productCard).join('')}</div>
      <div class="cross-link p-3 bg-white/5 rounded" data-route="recharges/gift-card/juegos">
        <p class="text-sm font-medium text-eneba-orange">Tarjetas de regalo (juegos)</p>
        <p class="text-xs text-white/50">Cross-link validado</p>
      </div>`;
  }
  return `<h2 class="text-xl font-bold mb-4">Dispositivos y Consolas</h2>
    <div class="flex flex-wrap gap-2 mb-6">${plats.map(p => {
      const slug = p.toLowerCase().replace(/\//g, '-').replace(/\s/g, '-');
      return `<button class="filter-pill" data-route="devices/${slug}">${esc(p)}</button>`;
    }).join('')}</div>`;
}

function renderSupport() {
  const items = [
    { id: 'claves', title: 'Problemas con Claves', desc: 'Ayuda con activación de claves digitales' },
    { id: 'reembolsos', title: 'Reembolsos', desc: 'Solicita un reembolso de tu compra' },
    { id: 'pagos', title: 'Métodos de Pago', desc: 'Información sobre formas de pago' },
  ];
  return `<h2 class="text-xl font-bold mb-4">Soporte</h2>
    <p class="text-sm text-white/60 mb-6">Accesible solo desde Home</p>
    <div class="grid md:grid-cols-3 gap-4">${items.map(it => `
      <div class="p-4 border border-white/15 rounded-lg" data-route="support/${it.id}">
        <h3 class="font-semibold">${esc(it.title)}</h3><p class="text-sm text-white/50 mt-1">${esc(it.desc)}</p>
      </div>`).join('')}</div>`;
}

function renderProduct() {
  const id = state.route.split('/')[1];
  const game = MOCK_GAMES.find(g => g.id === id) || MOCK_GAMES[0];
  const inWishlist = state.wishlist.includes(game.id);
  return `<div class="grid md:grid-cols-2 gap-8">
    <div>
      <div class="h-64 bg-eneba-purple rounded-lg flex items-center justify-center text-8xl opacity-20 mb-4">${esc(game.title.charAt(0))}</div>
      <h1 class="text-2xl font-bold">${esc(game.title)}</h1>
      <p class="text-white/60 mt-1">${esc(game.platform)}</p>
      <div class="flex items-center gap-3 mt-4">
        <span class="text-2xl font-bold text-eneba-green">${esc(game.price)}</span>
        ${game.discount ? `<span class="text-eneba-orange font-medium">${esc(game.discount)}</span>` : ''}
      </div>
      <div class="flex gap-3 mt-6">
        <button class="btn-green" data-add-cart="${game.id}" data-title="${esc(game.title)}" data-price="${esc(game.price)}">Comprar ahora</button>
        <button class="btn-ghost" id="wishlist-btn">${inWishlist ? '✓ En lista de deseos' : 'Añadir a Lista de deseos'}</button>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-eneba-orange mb-4">Conexiones de red</h2>
      <div class="space-y-3">
        <div class="cross-link p-3 bg-white/5 rounded" data-route="devices/pc-steam">
          <p class="text-sm font-medium">Plataforma: ${esc(game.platform)}</p>
          <p class="text-xs text-white/50">→ Filtrar catálogo por plataforma</p>
        </div>
        <div class="cross-link p-3 bg-white/5 rounded" data-route="recharges/gift-card/juegos">
          <p class="text-sm font-medium">Steam Wallet / Gift cards</p>
          <p class="text-xs text-white/50">→ Servicio directo del ecosistema</p>
        </div>
        <div class="cross-link p-3 bg-white/5 rounded" data-route="recharges/entretenimiento/streaming">
          <p class="text-sm font-medium">Suscripciones asociadas</p>
          <p class="text-xs text-white/50">→ Xbox Game Pass, Streaming</p>
        </div>
        <div class="cross-link p-3 bg-white/5 rounded" data-route="recharges/monedas">
          <p class="text-sm font-medium">Monedas de juegos</p>
          <p class="text-xs text-white/50">→ Cross-link desde filtros</p>
        </div>
        <div class="cross-link p-3 bg-white/5 rounded" data-route="offers/juegos-baratos">
          <p class="text-sm font-medium">Ofertas relacionadas</p>
          <p class="text-xs text-white/50">→ Juegos baratos</p>
        </div>
      </div>
    </div>
  </div>`;
}

function renderAuth() {
  if (!state.isLoggedIn) {
    if (state.authView === 'register') {
      return `<h2 class="text-xl font-bold mb-4">Registrarse</h2>
        <div class="max-w-sm space-y-3">
          <input class="w-full bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm" placeholder="Email" />
          <input class="w-full bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm" placeholder="Contraseña" type="password" />
          <button class="btn-green w-full" id="mock-register">Crear cuenta</button>
          <button class="text-sm text-eneba-orange" id="go-login">¿Ya tienes cuenta? Iniciar sesión</button>
        </div>`;
    }
    return `<h2 class="text-xl font-bold mb-4">Iniciar sesión con cuenta</h2>
      <div class="max-w-sm space-y-3">
        <input class="w-full bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm" placeholder="Email" value="usuario@demo.com" />
        <input class="w-full bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm" placeholder="Contraseña" type="password" value="demo" />
        <button class="btn-green w-full" id="mock-login">Entrar</button>
        <button class="text-sm text-eneba-orange" id="go-register">Registrarse</button>
      </div>`;
  }

  const view = state.route.split('/')[1] || 'menu';
  if (view === 'mi-cuenta' || view === 'config') {
    return `<h2 class="text-xl font-bold mb-4">Mi cuenta — Configuración</h2>
      <div class="max-w-md space-y-4">
        <div><label class="text-sm text-white/60">Región</label>
          <select id="locale-region" class="w-full mt-1 bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm">
            ${['LATAM', 'España', 'México', 'Colombia'].map(r => `<option ${state.userLocale.region === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select></div>
        <div><label class="text-sm text-white/60">Idioma</label>
          <select id="locale-lang" class="w-full mt-1 bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm">
            ${['Español', 'English', 'Português'].map(r => `<option ${state.userLocale.language === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select></div>
        <div><label class="text-sm text-white/60">Moneda</label>
          <select id="locale-currency" class="w-full mt-1 bg-eneba-purple border border-white/30 rounded px-3 py-2 text-sm">
            ${['EUR', 'USD', 'MXN'].map(r => `<option ${state.userLocale.currency === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select></div>
      </div>`;
  }
  if (view === 'favoritos' || view === 'wishlist') {
    const items = MOCK_GAMES.filter(g => state.wishlist.includes(g.id));
    return `<h2 class="text-xl font-bold mb-4">Favoritos — Lista de deseos</h2>
      ${items.length === 0 ? '<p class="text-white/50">No hay juegos en tu lista. Añade desde una ficha de producto.</p>' :
        `<div class="grid grid-cols-2 md:grid-cols-4 gap-4">${items.map(productCard).join('')}</div>`}`;
  }
  if (view === 'mis-compras') {
    return `<h2 class="text-xl font-bold mb-4">Mis compras</h2>
      ${state.orders.length === 0 ? '<p class="text-white/50">Aún no tienes compras. Completa el flujo del carrito.</p>' :
        state.orders.map(o => `<div class="p-3 border border-white/15 rounded mb-2"><p class="font-medium">${esc(o.id)}</p><p class="text-sm text-white/50">${esc(o.date)} — ${o.items.length} producto(s)</p></div>`).join('')}`;
  }
  return `<h2 class="text-xl font-bold mb-4">Mi cuenta</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <button class="p-4 border border-white/15 rounded-lg text-left hover:border-eneba-orange" data-route="auth/mi-cuenta">Mi cuenta<p class="text-xs text-white/50 mt-1">Configuración región, idioma, moneda</p></button>
      <button class="p-4 border border-white/15 rounded-lg text-left hover:border-eneba-orange" data-route="auth/favoritos">Favoritos<p class="text-xs text-white/50 mt-1">Lista de deseos (${state.wishlist.length})</p></button>
      <button class="p-4 border border-white/15 rounded-lg text-left hover:border-eneba-orange" data-route="auth/mis-compras">Mis compras<p class="text-xs text-white/50 mt-1">${state.orders.length} pedido(s)</p></button>
    </div>
    <button class="btn-ghost mt-6 text-sm" id="mock-logout">Cerrar sesión</button>`;
}

function renderSearch() {
  return `<h2 class="text-xl font-bold mb-4">Búsqueda</h2>
    <p class="text-white/60 text-sm mb-4">Usa la barra de búsqueda del header para explorar el grafo de nodos.</p>
    <h3 class="font-semibold mb-2">Historial</h3>
    <div class="space-y-1 mb-6">${['Juego X', 'Steam Wallet', 'Xbox Game Pass'].map(h => {
      const item = SEARCH_INDEX.find(s => s.q === h);
      return `<button class="search-item block w-full text-left rounded" data-route="${item?.route || 'home'}">${esc(h)}</button>`;
    }).join('')}</div>
    <h3 class="font-semibold mb-2">Sugerencias</h3>
    <div class="space-y-1">${SEARCH_INDEX.map(s => `<button class="search-item block w-full text-left rounded" data-route="${s.route}">${esc(s.q)} → ${esc(s.label)}</button>`).join('')}</div>`;
}

function renderFooterPage() {
  const page = state.route.replace('footer/', '');
  const titles = {
    'sobre-nosotros': 'Sobre nosotros', contactanos: 'Contáctanos', vacantes: 'Vacantes',
    resenas: 'Ve qué dijeron de nosotros', 'como-comprar': 'Cómo comprar', faq: 'Preguntas frecuentes',
    'activar-juegos': 'Cómo activar tus juegos', pqrs: 'PQRS', devoluciones: 'Política de devoluciones',
    noticias: 'Noticias de gaming', sorteos: 'Sorteos', snakzy: 'Snakzy: Juega y gana',
    afiliado: 'Conviértete en afiliado', vende: 'Vende en Eneba', anunciate: 'Anúnciate',
    social: 'Síguenos', app: 'Descarga la app de Eneba',
  };
  return `<h2 class="text-xl font-bold mb-4">${esc(titles[page] || page)}</h2>
    <p class="text-white/60 text-sm">Contenido informativo del footer (mockup académico).</p>
    ${page === 'contactanos' ? '<p class="mt-4 text-sm">Cross-link desde Ayuda → Contáctanos</p>' : ''}`;
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
  if (r.startsWith('support')) return renderSupport();
  if (r.startsWith('product')) return renderProduct();
  if (r.startsWith('footer')) return renderFooterPage();
  return renderHome();
}

function bindMainEvents() {
  const main = document.getElementById('main-content');
  main.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', () => {
      const r = el.dataset.route;
      pushCrumb(el.textContent?.trim().slice(0, 30) || r, r);
    });
  });
  main.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.filter;
      const val = btn.dataset.value;
      state.activeFilters[key] = state.activeFilters[key] === val ? undefined : val;
      if (!state.activeFilters[key]) delete state.activeFilters[key];
      if (!state.route.includes('filtros')) pushCrumb('Filtros', 'games/filtros');
      saveState();
      render();
    });
  });
  main.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart({ id: btn.dataset.addCart, title: btn.dataset.title, price: btn.dataset.price });
    });
  });
  document.getElementById('mock-login')?.addEventListener('click', () => {
    state.isLoggedIn = true;
    saveState();
    render();
  });
  document.getElementById('mock-register')?.addEventListener('click', () => {
    state.isLoggedIn = true;
    saveState();
    render();
  });
  document.getElementById('mock-logout')?.addEventListener('click', () => {
    state.isLoggedIn = false;
    state.authView = 'login';
    navigate('home', [{ label: 'Eneba', route: 'home' }]);
  });
  document.getElementById('go-register')?.addEventListener('click', () => { state.authView = 'register'; render(); });
  document.getElementById('go-login')?.addEventListener('click', () => { state.authView = 'login'; render(); });
  document.getElementById('wishlist-btn')?.addEventListener('click', () => {
    const id = state.route.split('/')[1];
    addToWishlist(id);
  });
  ['locale-region', 'locale-lang', 'locale-currency'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', (e) => {
      const key = id.replace('locale-', '');
      const map = { region: 'region', lang: 'language', currency: 'currency' };
      state.userLocale[map[key]] = e.target.value;
      saveState();
    });
  });
}

function renderSearchPanel() {
  const panel = document.getElementById('search-panel');
  const q = state.searchQuery.toLowerCase();
  if (!state.searchFocused) { panel.classList.add('hidden'); return; }
  const history = ['Juego X', 'Steam Wallet', 'Xbox Game Pass'];
  const results = SEARCH_INDEX.filter(s => !q || s.q.toLowerCase().includes(q));
  panel.innerHTML = `
    ${q ? '' : `<p class="px-3 py-2 text-xs text-white/40 uppercase">Historial</p>${history.map(h => {
      const item = SEARCH_INDEX.find(s => s.q === h);
      return `<div class="search-item" data-sroute="${item?.route || ''}">${esc(h)}</div>`;
    }).join('')}`}
    <p class="px-3 py-2 text-xs text-white/40 uppercase">Sugerencias</p>
    ${results.map(s => `<div class="search-item" data-sroute="${s.route}">${esc(s.q)} <span class="text-white/40">→ ${esc(s.label)}</span></div>`).join('')}
  `;
  panel.classList.remove('hidden');
  panel.querySelectorAll('[data-sroute]').forEach(el => {
    el.addEventListener('click', () => {
      const r = el.dataset.sroute;
      state.searchFocused = false;
      pushCrumb(el.textContent.split('→')[0].trim(), r);
    });
  });
}

function render() {
  renderL1Nav();
  renderBreadcrumbs();
  renderFooter();
  document.getElementById('main-content').innerHTML = renderMain();
  bindMainEvents();
  renderCart();
  renderSearchPanel();

  document.getElementById('auth-btn').textContent = state.isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión';
}

function init() {
  document.getElementById('logo-btn').addEventListener('click', () => navigate('home', [{ label: 'Eneba', route: 'home' }]));
  document.getElementById('auth-btn').addEventListener('click', () => pushCrumb(state.isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión', 'auth'));
  document.getElementById('cart-btn').addEventListener('click', () => { state.cartOpen = true; render(); });
  document.getElementById('cart-close').addEventListener('click', () => { state.cartOpen = false; render(); });
  document.getElementById('cart-overlay').addEventListener('click', () => { state.cartOpen = false; render(); });

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('focus', () => { state.searchFocused = true; renderSearchPanel(); });
  searchInput.addEventListener('blur', () => { setTimeout(() => { state.searchFocused = false; renderSearchPanel(); }, 200); });
  searchInput.addEventListener('input', (e) => { state.searchQuery = e.target.value; renderSearchPanel(); });

  if (state.route === 'home' && state.breadcrumbs.length === 1) {
    // default
  }
  render();
}

document.addEventListener('DOMContentLoaded', init);
