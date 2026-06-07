/* Catálogo de alta fidelidad — datos reales (precios orientativos EUR) */

function steamGallery(appId) {
  const b = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}`;
  return [
    `${b}/library_600x900.jpg`,
    `${b}/library_hero.jpg`,
    `${b}/capsule_616x353.jpg`,
    `${b}/header.jpg`,
  ];
}

const KEY_TYPE_MAP = {
  steam: 'steam-gift',
  xbox: 'xbox-key',
  playstation: 'psn-key',
  nintendo: 'nintendo-key',
  global: 'digital-topup',
  windows: 'license-key',
  mac: 'license-key',
  android: 'license-key',
  linux: 'license-key',
};

const DEVICE_MAP = {
  steam: ['PC'],
  xbox: ['Xbox Series X|S', 'Xbox One'],
  playstation: ['PS5', 'PS4'],
  nintendo: ['Nintendo Switch'],
  global: ['Mobile', 'Multiplataforma'],
  windows: ['PC'],
  mac: ['Mac'],
  android: ['Android'],
  linux: ['Linux'],
};

const COMPAT_MAP = {
  steam: ['Windows', 'Mac', 'Linux'],
  xbox: ['Xbox'],
  playstation: ['PlayStation'],
  nintendo: ['Nintendo Switch'],
  global: ['iOS', 'Android'],
};

function buildSellers(basePrice, primaryName) {
  return [
    { id: 's1', name: primaryName || 'Eneba Official', rating: 9.92, price: basePrice, cashbackPct: 1, verified: true },
    { id: 's2', name: 'DigitalKeys', rating: 9.75, price: +(basePrice * 0.97).toFixed(2), cashbackPct: 14, verified: true },
    { id: 's3', name: 'GameVault LATAM', rating: 9.41, price: +(basePrice * 1.03).toFixed(2), cashbackPct: 8, verified: false },
    { id: 's4', name: 'KeyExpress', rating: 9.18, price: +(basePrice * 0.95).toFixed(2), cashbackPct: 5, verified: true },
  ].sort((a, b) => a.price - b.price);
}

function buildReviews(product) {
  const samples = [
    { author: 'Carlos_M', rating: 5, text: 'Entrega instantánea, la clave funcionó sin problemas en mi cuenta.', daysAgo: 2 },
    { author: 'AnaGamer', rating: 4, text: 'Buen precio para la región. Activación rápida y soporte respondió en minutos.', daysAgo: 5 },
    { author: 'Diego_R', rating: 5, text: 'Proceso claro: compra, email, activar. Todo como se describe en la ficha.', daysAgo: 11 },
    { author: 'MarianaP', rating: 4, text: 'Cashback aplicado correctamente. Recomendado para compras digitales.', daysAgo: 18 },
  ];
  return samples.map((r, i) => ({ ...r, id: `${product.id}-r${i}` }));
}

function formatDenomination(eurAmount) {
  const cur = getActiveCurrency();
  const rate = FX_RATES[cur] || 1;
  const val = eurAmount * rate;
  if (cur === 'COP') {
    const rounded = Math.round(val / 1000) * 1000;
    return '$' + rounded.toLocaleString('es-CO');
  }
  if (cur === 'MXN') return '$' + (Math.round(val * 100) / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (cur === 'USD') return 'US$' + val.toFixed(2);
  return val.toFixed(0).replace('.', ',') + ' €';
}

function localizeProductTitle(item) {
  let base = item.titleBase || item.title || '';
  if (item.titleKey && typeof t === 'function') {
    base = t('products.' + item.titleKey);
  } else {
    base = base.replace(/\s*—?\s*Tarjeta regalo\s*\d+€/gi, '').replace(/\s*\d+€/g, '').replace(/\s*Gift Card\s*\d+€/gi, '').trim();
  }

  if (item.faceValue != null) {
    return `${base} — ${formatDenomination(item.faceValue)}`;
  }
  if (typeof t === 'function') {
    if (item.periodKey && item.platformSuffix) {
      return `${base} — ${t('products.period.' + item.periodKey)} (${t('products.platform.' + item.platformSuffix)})`;
    }
    if (item.periodKey) return `${base} — ${t('products.period.' + item.periodKey)}`;
    if (item.platformSuffix) return `${base} (${t('products.platform.' + item.platformSuffix)})`;
  }
  return base;
}

function enrichGame(g) {
  const pk = g.platformKey || 'global';
  const keyType = g.keyType || KEY_TYPE_MAP[pk] || 'digital-key';
  const images = g.images?.length ? g.images : (g.image ? [g.image] : []);
  const displayTitle = g.title;
  return {
    ...g,
    kind: 'game',
    displayTitle,
    title: displayTitle,
    images,
    coverImage: images[0] || g.image,
    keyType,
    region: g.region || 'GLOBAL',
    device: g.device || DEVICE_MAP[pk]?.[0] || 'PC',
    devices: g.devices || DEVICE_MAP[pk] || ['PC'],
    compatibility: g.compatibility || COMPAT_MAP[pk] || ['Windows'],
    format: g.format || 'digital-code',
    viewers: g.viewers || Math.floor(8 + (g.id.length * 3.7) % 40),
    wishlistCount: g.wishlistCount || Math.floor(1200 + (g.reviews ? parseInt(String(g.reviews), 10) || 0 : 0) / 10),
    sellers: g.sellers || buildSellers(g.price, g.seller),
    userReviews: g.userReviews || buildReviews(g),
    showGiftNotice: keyType === 'steam-gift',
  };
}

function enrichService(s) {
  const pk = s.platformKey || 'global';
  const typeLabels = {
    'gift-card': 'gift-card',
    subscription: 'subscription',
    vpn: 'license-key',
    'sistemas-operativos': 'license-key',
    antivirus: 'license-key',
    monedas: 'digital-topup',
    streaming: 'subscription',
    musica: 'subscription',
    dinero: 'gift-card',
  };
  const keyType = s.keyType || typeLabels[s.type] || 'digital-key';
  const displayTitle = localizeProductTitle(s);
  return {
    ...s,
    kind: 'service',
    displayTitle,
    title: displayTitle,
    images: s.images || [s.image],
    coverImage: s.image,
    keyType,
    region: s.region || 'GLOBAL',
    device: DEVICE_MAP[pk]?.[0] || 'PC',
    devices: DEVICE_MAP[pk] || ['PC'],
    compatibility: COMPAT_MAP[pk] || ['Windows'],
    format: 'digital-code',
    viewers: Math.floor(5 + s.id.length * 2.3),
    wishlistCount: 420,
    rating: 4.6,
    reviews: '8k',
    cashback: true,
    cashbackPct: '2%',
    sellers: buildSellers(s.price, 'Eneba Official'),
    userReviews: buildReviews(s),
    showGiftNotice: false,
    relatedNodes: s.type === 'vpn' ? [{ key: 'software', route: 'software/vpn' }] : [],
  };
}

const PLATFORM_META = {
  steam: { label: 'Steam', icon: 'steam', color: '#1b2838' },
  'pc-steam': { label: 'PC / Steam', icon: 'steam', color: '#1b2838' },
  xbox: { label: 'Xbox', icon: 'xbox', color: '#107C10' },
  playstation: { label: 'PlayStation', icon: 'playstation', color: '#003791' },
  nintendo: { label: 'Nintendo', icon: 'nintendo', color: '#E60012' },
  global: { label: 'GLOBAL', icon: 'globe', color: '#6B7280' },
  'xbox-live': { label: 'Xbox Live', icon: 'xbox', color: '#107C10' },
  windows: { label: 'Windows', icon: 'windows', color: '#0078D4' },
  mac: { label: 'macOS', icon: 'apple', color: '#A2AAAD' },
  apple: { label: 'Apple', icon: 'apple', color: '#A2AAAD' },
  android: { label: 'Android', icon: 'android', color: '#3DDC84' },
  linux: { label: 'Linux', icon: 'linux', color: '#FCC624' },
};

const CATALOG = {
  games: [
    {
      id: 'juego-x',
      title: 'Cyberpunk 2077',
      subtitle: 'Ultimate Edition',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 29.99,
      originalPrice: 49.99,
      discount: '-40%',
      genre: 'Acción',
      modo: 'Un solo jugador',
      mecanica: 'RPG',
      perspectiva: 'Primera persona',
      rating: 4.2,
      reviews: '128k',
      seller: 'Eneba Official',
      cashback: true,
      cashbackPct: '1%',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg',
    images: steamGallery(1091500),
    steamAppId: 1091500,
      hero: true,
      tags: ['RPG', 'Open World', 'Cyberpunk'],
      relatedNodes: [
        { key: 'wallet', route: 'recharges/gift-card/juegos' },
        { key: 'dlc', route: 'games/adiciones/dlc' },
        { key: 'membership', route: 'recharges/entretenimiento/streaming' },
      ],
    },
    {
      id: 'batman-origins',
      title: 'Batman: Arkham Origins',
      platform: 'Steam',
      platformKey: 'steam',
      price: 0.88,
      originalPrice: 7.99,
      discount: '-89%',
      genre: 'Acción',
      modo: 'Un solo jugador',
      mecanica: 'Hack Slash',
      perspectiva: 'Tercera persona',
      rating: 4.5,
      reviews: '42k',
      seller: 'GameVault LATAM',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/209000/header.jpg',
      images: steamGallery(209000),
      tags: ['Acción', 'Stealth'],
      relatedNodes: [{ key: 'wallet', route: 'recharges/gift-card/juegos' }],
    },
    {
      id: 'gothic-remake',
      title: 'Gothic 1 Remake',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 49.99,
      originalPrice: 59.99,
      discount: '-15%',
      genre: 'Aventuras',
      modo: 'Un solo jugador',
      mecanica: 'RPG',
      perspectiva: 'Tercera persona',
      rating: 4.8,
      reviews: '2.1k',
      seller: 'PreOrder Store',
      cashback: false,
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1290000/header.jpg',
      images: steamGallery(1290000),
      tags: ['RPG', 'Remake'],
      relatedNodes: [{ key: 'wallet', route: 'recharges/gift-card/juegos' }, { key: 'dlc', route: 'games/adiciones/dlc' }],
    },
    {
      id: 'elden-ring',
      title: 'Elden Ring',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 34.99,
      originalPrice: 59.99,
      discount: '-42%',
      genre: 'Acción',
      modo: 'Un solo jugador',
      mecanica: 'RPG',
      perspectiva: 'Tercera persona',
      rating: 4.9,
      reviews: '512k',
      seller: 'FromSoft Deals',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
      images: steamGallery(1245620),
      tags: ['Soulslike', 'Open World'],
      relatedNodes: [{ key: 'wallet', route: 'recharges/gift-card/juegos' }],
    },
    {
      id: 'forza-horizon',
      title: 'Forza Horizon 5',
      platform: 'Xbox',
      platformKey: 'xbox',
      price: 27.49,
      originalPrice: 59.99,
      discount: '-54%',
      genre: 'Carreras',
      modo: 'Multijugador',
      mecanica: 'Arcade',
      perspectiva: 'Tercera persona',
      rating: 4.7,
      reviews: '89k',
      seller: 'Xbox Keys Pro',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
      images: steamGallery(1551360),
      tags: ['Racing', 'Open World'],
      relatedNodes: [
        { key: 'membership', route: 'recharges/entretenimiento/streaming' },
        { key: 'giftCard', route: 'recharges/gift-card/juegos' },
      ],
    },
    {
      id: 'god-of-war',
      title: 'God of War Ragnarök',
      platform: 'PlayStation',
      platformKey: 'playstation',
      price: 44.99,
      originalPrice: 69.99,
      discount: '-36%',
      genre: 'Aventuras',
      modo: 'Un solo jugador',
      mecanica: 'Hack Slash',
      perspectiva: 'Tercera persona',
      rating: 4.9,
      reviews: '76k',
      seller: 'PSN Deals',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg',
      images: steamGallery(1593500),
      tags: ['Action', 'Story Rich'],
      relatedNodes: [{ key: 'giftCard', route: 'recharges/gift-card/juegos' }],
    },
    {
      id: 'pubg-mobile',
      title: 'PUBG Mobile — 1200 G-Coin',
      platform: 'GLOBAL',
      platformKey: 'global',
      price: 11.19,
      genre: 'Acción',
      modo: 'Battle Royale',
      mecanica: 'Arcade',
      perspectiva: 'Tercera persona',
      rating: 4.3,
      reviews: '18k',
      seller: 'Mobile Top-Up',
      cashback: true,
      cashbackPct: '2%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg',
      images: steamGallery(578080),
      tags: ['Mobile', 'Battle Royale'],
      relatedNodes: [{ key: 'monedas', route: 'recharges/monedas' }],
    },
    {
      id: 'free-fire',
      title: 'Free Fire — 530 + 53 Diamantes',
      platform: 'GLOBAL',
      platformKey: 'global',
      price: 4.99,
      genre: 'Acción',
      modo: 'Battle Royale',
      mecanica: 'Arcade',
      perspectiva: 'Tercera persona',
      rating: 4.1,
      reviews: '31k',
      seller: 'LATAM Recargas',
      cashback: true,
      cashbackPct: '2%',
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/header.jpg',
      images: steamGallery(1517290),
      tags: ['Mobile', 'Free-to-play'],
      relatedNodes: [{ key: 'monedas', route: 'recharges/monedas' }],
    },
    {
      id: 'it-takes-two',
      title: 'It Takes Two',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 19.99,
      originalPrice: 39.99,
      discount: '-50%',
      genre: 'Aventuras',
      modo: 'Co-Op',
      mecanica: 'Arcade',
      perspectiva: 'Tercera persona',
      rating: 4.9,
      reviews: '98k',
      seller: 'Eneba Official',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg',
      images: steamGallery(1426210),
      tags: ['Co-op', 'Aventura'],
    },
    {
      id: 'counter-strike-2',
      title: 'Counter-Strike 2',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 0,
      genre: 'Acción',
      modo: 'FPS/TPS',
      mecanica: 'Arcade',
      perspectiva: 'Primera persona',
      rating: 4.6,
      reviews: '2.1M',
      seller: 'Valve Store',
      cashback: false,
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
      images: steamGallery(730),
      tags: ['FPS', 'Competitivo'],
    },
    {
      id: 'civilization-vi',
      title: 'Sid Meier\'s Civilization VI',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 14.99,
      originalPrice: 59.99,
      discount: '-75%',
      genre: 'Simulación',
      modo: 'Estrategia',
      mecanica: 'RPG',
      perspectiva: 'Vista de pájaro',
      rating: 4.7,
      reviews: '156k',
      seller: 'Strategy Deals',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg',
      images: steamGallery(289070),
      tags: ['Estrategia', 'Por turnos'],
    },
    {
      id: 'fc-24',
      title: 'EA SPORTS FC 24',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 24.99,
      originalPrice: 69.99,
      discount: '-64%',
      genre: 'Deportes',
      modo: 'Multijugador',
      mecanica: 'Arcade',
      perspectiva: 'Tercera persona',
      rating: 4.0,
      reviews: '45k',
      seller: 'Sports Keys',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg',
      images: steamGallery(2195250),
      tags: ['Fútbol', 'Deportes'],
    },
    {
      id: 'resident-evil-4',
      title: 'Resident Evil 4',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 29.99,
      originalPrice: 59.99,
      discount: '-50%',
      genre: 'Horror',
      modo: 'Un solo jugador',
      mecanica: 'Hack Slash',
      perspectiva: 'Tercera persona',
      rating: 4.9,
      reviews: '112k',
      seller: 'Horror Vault',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
      images: steamGallery(2050650),
      tags: ['Survival Horror', 'Acción'],
    },
    {
      id: 'mortal-kombat-1',
      title: 'Mortal Kombat 1',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 39.99,
      originalPrice: 69.99,
      discount: '-43%',
      genre: 'Lucha',
      modo: 'Multijugador',
      mecanica: 'Hack Slash',
      perspectiva: 'Tercera persona',
      rating: 4.5,
      reviews: '28k',
      seller: 'Fight Club Keys',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg',
      images: steamGallery(1971870),
      tags: ['Lucha', 'Competitivo'],
    },
    {
      id: 'portal-2',
      title: 'Portal 2',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 4.99,
      originalPrice: 19.99,
      discount: '-75%',
      genre: 'Puzzles',
      modo: 'Co-Op',
      mecanica: 'Arcade',
      perspectiva: 'Primera persona',
      rating: 4.9,
      reviews: '320k',
      seller: 'Valve Store',
      cashback: false,
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg',
      images: steamGallery(620),
      tags: ['Puzzle', 'Co-op'],
    },
    {
      id: 'lost-ark',
      title: 'Lost Ark',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 0,
      genre: 'MMO',
      modo: 'Multijugador',
      mecanica: 'RPG',
      perspectiva: 'Vista de pájaro',
      rating: 4.4,
      reviews: '89k',
      seller: 'MMO Portal',
      cashback: false,
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/header.jpg',
      images: steamGallery(1599340),
      tags: ['MMO', 'Free-to-play'],
    },
    {
      id: 'cities-skylines',
      title: 'Cities: Skylines',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 9.99,
      originalPrice: 29.99,
      discount: '-67%',
      genre: 'Simulación',
      modo: 'Un solo jugador',
      mecanica: 'RPG',
      perspectiva: 'Vista de pájaro',
      rating: 4.6,
      reviews: '198k',
      seller: 'Sim World',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg',
      images: steamGallery(255710),
      tags: ['Ciudad', 'Simulación'],
    },
    {
      id: 'halo-infinite',
      title: 'Halo Infinite',
      platform: 'Xbox',
      platformKey: 'xbox',
      price: 34.99,
      originalPrice: 59.99,
      discount: '-42%',
      genre: 'Acción',
      modo: 'FPS/TPS',
      mecanica: 'Arcade',
      perspectiva: 'Primera persona',
      rating: 4.3,
      reviews: '67k',
      seller: 'Xbox Keys Pro',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg',
      images: steamGallery(1240440),
      tags: ['FPS', 'Sci-fi'],
    },
    {
      id: 'mario-kart-8',
      title: 'Mario Kart 8 Deluxe',
      platform: 'Nintendo',
      platformKey: 'nintendo',
      price: 49.99,
      originalPrice: 59.99,
      discount: '-17%',
      genre: 'Carreras',
      modo: 'Multijugador',
      mecanica: 'Arcade',
      perspectiva: 'Tercera persona',
      rating: 4.8,
      reviews: '210k',
      seller: 'Nintendo Store LATAM',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
      images: steamGallery(1551360),
      tags: ['Carreras', 'Familiar'],
    },
    {
      id: 'zelda-totk',
      title: 'The Legend of Zelda: Tears of the Kingdom',
      platform: 'Nintendo',
      platformKey: 'nintendo',
      price: 54.99,
      originalPrice: 69.99,
      discount: '-21%',
      genre: 'Aventuras',
      modo: 'Un solo jugador',
      mecanica: 'RPG',
      perspectiva: 'Tercera persona',
      rating: 4.9,
      reviews: '145k',
      seller: 'Nintendo Store LATAM',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
      images: steamGallery(1245620),
      tags: ['Aventura', 'Open World'],
    },
    {
      id: 'horizon-forbidden',
      title: 'Horizon Forbidden West',
      platform: 'PlayStation',
      platformKey: 'playstation',
      price: 39.99,
      originalPrice: 69.99,
      discount: '-43%',
      genre: 'Aventuras',
      modo: 'Un solo jugador',
      mecanica: 'RPG',
      perspectiva: 'Tercera persona',
      rating: 4.8,
      reviews: '54k',
      seller: 'PSN Deals',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/header.jpg',
      images: steamGallery(2420110),
      tags: ['Open World', 'Acción'],
    },
    {
      id: 'age-of-empires-iv',
      title: 'Age of Empires IV',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 19.99,
      originalPrice: 39.99,
      discount: '-50%',
      genre: 'Simulación',
      modo: 'Estrategia',
      mecanica: 'RPG',
      perspectiva: 'Vista de pájaro',
      rating: 4.5,
      reviews: '34k',
      seller: 'RTS Market',
      cashback: true,
      cashbackPct: '1%',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg',
      images: steamGallery(1466860),
      tags: ['RTS', 'Estrategia'],
    },
    {
      id: 'left-4-dead-2',
      title: 'Left 4 Dead 2',
      platform: 'PC/Steam',
      platformKey: 'steam',
      price: 3.99,
      originalPrice: 19.99,
      discount: '-80%',
      genre: 'Acción',
      modo: 'Co-Op',
      mecanica: 'Hack Slash',
      perspectiva: 'Primera persona',
      rating: 4.8,
      reviews: '480k',
      seller: 'Valve Store',
      cashback: false,
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg',
      images: steamGallery(550),
      tags: ['Zombies', 'Co-op'],
    },
  ],
  services: [
    {
      id: 'steam-wallet-20',
      titleKey: 'steamWallet',
      faceValue: 20,
      price: 20.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'steam',
    },
    {
      id: 'steam-wallet-50',
      titleKey: 'steamWallet',
      faceValue: 50,
      price: 50.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'steam',
    },
    {
      id: 'steam-wallet-100',
      titleKey: 'steamWallet',
      faceValue: 100,
      price: 100.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'steam',
    },
    {
      id: 'psn-card-50',
      titleKey: 'psnStore',
      faceValue: 50,
      price: 50.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'playstation',
    },
    {
      id: 'psn-card-20',
      titleKey: 'psnStore',
      faceValue: 20,
      price: 20.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'playstation',
    },
    {
      id: 'nintendo-eshop-35',
      titleKey: 'nintendoEshop',
      faceValue: 35,
      price: 35.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'nintendo',
    },
    {
      id: 'xbox-gift-25',
      titleKey: 'xboxGift',
      faceValue: 25,
      price: 25.0,
      type: 'gift-card',
      subCategory: 'juegos',
      platformKey: 'xbox',
    },
    {
      id: 'uber-gift-25',
      titleKey: 'uberGift',
      faceValue: 25,
      price: 25.0,
      type: 'gift-card',
      subCategory: 'transporte',
      platformKey: 'global',
    },
    {
      id: 'airbnb-gift-50',
      titleKey: 'airbnbGift',
      faceValue: 50,
      price: 50.0,
      type: 'gift-card',
      subCategory: 'viajes',
      platformKey: 'global',
    },
    {
      id: 'xbox-game-pass',
      titleKey: 'xboxGamePass',
      periodKey: '1month',
      price: 12.99,
      type: 'subscription',
      platformKey: 'xbox',
    },
    {
      id: 'netflix-1m',
      titleKey: 'netflix',
      periodKey: '1month',
      price: 8.99,
      type: 'streaming',
      platformKey: 'global',
    },
    {
      id: 'disney-plus-1m',
      titleKey: 'disneyPlus',
      periodKey: '1month',
      price: 7.99,
      type: 'streaming',
      platformKey: 'global',
    },
    {
      id: 'spotify-premium',
      titleKey: 'spotifyPremium',
      periodKey: '3months',
      price: 9.99,
      type: 'musica',
      platformKey: 'global',
    },
    {
      id: 'apple-music-3m',
      titleKey: 'appleMusic',
      periodKey: '3months',
      price: 10.99,
      type: 'musica',
      platformKey: 'apple',
    },
    {
      id: 'crypto-voucher-50',
      titleKey: 'cryptoGift',
      faceValue: 50,
      price: 50.0,
      type: 'dinero',
      subCategory: 'crypto',
      platformKey: 'global',
    },
    {
      id: 'amazon-gift-30',
      titleKey: 'amazonGift',
      faceValue: 30,
      price: 30.0,
      type: 'dinero',
      subCategory: 'tiendas',
      platformKey: 'global',
    },
    {
      id: 'nordvpn-win',
      titleKey: 'nordvpn',
      periodKey: '1year',
      platformSuffix: 'windows',
      price: 45.0,
      type: 'vpn',
      platformKey: 'windows',
    },
    {
      id: 'nordvpn-mac',
      titleKey: 'nordvpn',
      periodKey: '1year',
      platformSuffix: 'mac',
      price: 45.0,
      type: 'vpn',
      platformKey: 'mac',
    },
    {
      id: 'nordvpn-android',
      titleKey: 'nordvpn',
      periodKey: '1year',
      platformSuffix: 'android',
      price: 39.0,
      type: 'vpn',
      platformKey: 'android',
    },
    {
      id: 'nordvpn-linux',
      titleKey: 'nordvpn',
      periodKey: '1year',
      platformSuffix: 'linux',
      price: 39.0,
      type: 'vpn',
      platformKey: 'linux',
    },
    {
      id: 'win11-pro',
      titleKey: 'win11Pro',
      price: 29.99,
      type: 'sistemas-operativos',
      platformKey: 'windows',
    },
    {
      id: 'win11-home',
      titleKey: 'win11Home',
      price: 24.99,
      type: 'sistemas-operativos',
      platformKey: 'windows',
    },
    {
      id: 'kaspersky-mac',
      titleKey: 'kaspersky',
      platformSuffix: 'mac',
      price: 19.99,
      type: 'antivirus',
      platformKey: 'mac',
    },
    {
      id: 'kaspersky-win',
      titleKey: 'kaspersky',
      platformSuffix: 'windows',
      price: 19.99,
      type: 'antivirus',
      platformKey: 'windows',
    },
    {
      id: 'eset-android',
      titleKey: 'esetMobile',
      platformSuffix: 'android',
      price: 14.99,
      type: 'antivirus',
      platformKey: 'android',
    },
    {
      id: 'monedas-vbucks',
      titleKey: 'fortniteVbucks',
      price: 7.99,
      type: 'monedas',
      platformKey: 'global',
    },
    {
      id: 'monedas-robux',
      titleKey: 'robloxRobux',
      price: 9.99,
      type: 'monedas',
      platformKey: 'global',
    },
  ],
};

const SEARCH_INDEX_HI = [
  { q: 'Cyberpunk 2077', route: 'product/juego-x', label: 'Cyberpunk 2077', type: 'game' },
  { q: 'Steam Wallet', route: 'recharges/gift-card/juegos', label: 'Tarjetas de regalo', type: 'service' },
  { q: 'Xbox Game Pass', route: 'recharges/entretenimiento/streaming', label: 'Streaming', type: 'service' },
  { q: 'Gothic 1 Remake', route: 'product/gothic-remake', label: 'Gothic 1 Remake', type: 'game' },
  { q: 'Forza Horizon 5', route: 'product/forza-horizon', label: 'Forza Horizon 5', type: 'game' },
  { q: 'NordVPN', route: 'recharges/licencias/vpn/windows', label: 'VPN — Windows', type: 'license' },
  { q: 'Elden Ring', route: 'product/elden-ring', label: 'Elden Ring', type: 'game' },
  { q: 'Claves Steam aleatorias', route: 'games/adiciones/claves', label: 'Claves de juego', type: 'category' },
];

const QUICK_CATEGORIES = [
  { labelKey: 'nav.games', icon: 'gamepad', route: 'games' },
  { labelKey: 'nav.software', icon: 'windows', route: 'software' },
  { labelKey: 'related.giftCard', icon: 'gift', route: 'recharges/gift-card/juegos' },
  { label: 'Steam', icon: 'steam', route: 'devices/pc-steam' },
  { label: 'Xbox', icon: 'xbox', route: 'devices/xbox' },
  { label: 'PSN', icon: 'playstation', route: 'devices/playstation' },
];

const HERO_SLIDES = [
  {
    title: 'Claves de Steam aleatorias',
    desc: 'Descubre títulos sorpresa para tu biblioteca',
    cta: 'COMPRA AHORA',
    route: 'games/adiciones/claves',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg',
    accent: '#00FF7F',
  },
  {
    title: 'Xbox Game Pass Ultimate',
    desc: 'Cientos de juegos por una suscripción',
    cta: 'Ver oferta',
    route: 'recharges/entretenimiento/streaming',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg',
    accent: '#107C10',
  },
];

const FX_RATES = { EUR: 1, COP: 4300, USD: 1.08, MXN: 18.5 };

const LOCALE_PRESETS = [
  { id: 'co', country: 'Colombia', flag: 'colombia', currency: 'COP', language: 'Español', lang: 'es', symbol: '$' },
  { id: 'mx', country: 'México', flag: 'mexico', currency: 'MXN', language: 'Español', lang: 'es', symbol: '$' },
  { id: 'es', country: 'España', flag: 'spain', currency: 'EUR', language: 'Español', lang: 'es', symbol: '€' },
  { id: 'us', country: 'Estados Unidos', flag: 'usa', currency: 'USD', language: 'English', lang: 'en', symbol: 'US$' },
  { id: 'br', country: 'Brasil', flag: 'brazil', currency: 'USD', language: 'Português', lang: 'pt', symbol: 'US$' },
];

function getActiveCurrency() {
  if (typeof window !== 'undefined' && window.__enebaCurrency) return window.__enebaCurrency;
  return 'COP';
}

function formatPrice(n, currency) {
  const cur = currency || getActiveCurrency();
  const rate = FX_RATES[cur] || 1;
  const val = n * rate;
  if (cur === 'COP') return '$' + Math.round(val).toLocaleString('es-CO');
  if (cur === 'MXN') return '$' + val.toFixed(2).replace('.', ',');
  if (cur === 'USD') return 'US$' + val.toFixed(2);
  return val.toFixed(2).replace('.', ',') + ' €';
}

function getGame(id) {
  return enrichGame(CATALOG.games.find((g) => g.id === id) || CATALOG.games[0]);
}

function getService(id) {
  const s = CATALOG.services.find((x) => x.id === id);
  return s ? enrichService(s) : null;
}

function getProduct(id) {
  const game = CATALOG.games.find((g) => g.id === id);
  if (game) return enrichGame(game);
  const svc = CATALOG.services.find((s) => s.id === id);
  if (svc) return enrichService(svc);
  return enrichGame(CATALOG.games[0]);
}

function getAllGames() {
  return CATALOG.games.map(enrichGame);
}

function getRelatedProducts(id, limit = 4) {
  const current = getProduct(id);
  const pool = CATALOG.games.filter((g) => g.id !== id);
  const sameGenre = pool.filter((g) => g.genre === current.genre);
  const picks = (sameGenre.length ? sameGenre : pool).slice(0, limit);
  return picks.map(enrichGame);
}

function getServices(type) {
  if (!type) return CATALOG.services;
  return CATALOG.services.filter((s) => s.type === type || s.type?.startsWith(type));
}

function getAllProducts() {
  return [...CATALOG.games.map(enrichGame), ...CATALOG.services.map(enrichService)];
}
