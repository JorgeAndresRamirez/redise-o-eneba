/* Iconografía SVG — plataformas y UI */

const ICONS = {
  steam: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.4c0-2.509 2.099-4.544 4.588-4.544 2.494 0 4.588 2.035 4.588 4.544s-2.094 4.544-4.588 4.544h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.387 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.973 20.11 6.567 24 11.979 24c6.624 0 11.999-5.373 11.999-12S18.603 0 11.979 0zM7.54 18.351l-1.793-.739c.388 1.127 1.413 1.94 2.633 1.94.282 0 .556-.042.811-.119l-.985-1.082h1.334v2.018zm7.075-9.612c-1.399 0-2.547 1.116-2.547 2.479s1.148 2.479 2.547 2.479c1.399 0 2.547-1.116 2.547-2.479s-1.148-2.479-2.547-2.479z"/></svg>`,
  xbox: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.116 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 5.484 7.969 3.782 9.255-1.015.823-3.102 1.617-5.94 1.617-2.84 0-4.93-.794-5.94-1.617-1.702-1.286 1.282-6.294 3.782-9.255C9.71 4.145 10.794 3.5 12 3.5s2.29.645 3.262 2.127z"/></svg>`,
  playstation: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M8.28 2.4v16.2l3.6 1.16V6.1c0-.64.28-1.06.73-1.06.5 0 .79.37.79 1.06v12.3l4.93 1.59V5.2c0-.64.26-1.06.73-1.06.5 0 .79.37.79 1.06v13.4l2.78.9V5.2C22.75 3.2 21.28 1.85 19.13 1.85c-1.5 0-2.81.91-3.46 2.21V2.4H8.28zM.67 11.45l3.56 1.14V7.86L.67 6.64v4.81z"/></svg>`,
  nintendo: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M0 1.964C0 1.432.432 1 1.001 1h8.23c.57 0 1.002.432 1.002.964v20.072c0 .532-.432.964-1.002.964H1.001C.432 23 0 22.568 0 22.036V1.964zm14.767 0c0-.532.432-.964 1.001-.964h8.23c.57 0 1.002.432 1.002.964v20.072c0 .532-.432.964-1.002.964h-8.23c-.57 0-1.002-.432-1.002-.964V1.964zM6.615 16.89h2.77V7.11h-2.77v9.78zm8.77 0h2.77V7.11h-2.77v9.78z"/></svg>`,
  windows: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.7L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
  android: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M17.523 15.341c-.5 0-.908.408-.908.908s.408.908.908.908.908-.408.908-.908-.408-.908-.908-.908zm-11.046 0c-.5 0-.908.408-.908.908s.408.908.908.908.908-.408.908-.908-.408-.908-.908-.908zm11.4-6.857l1.956-3.39a.416.416 0 00-.152-.567.416.416 0 00-.567.152l-1.98 3.43C14.9 7.84 13.508 7.4 12 7.4s-2.9.44-4.134 1.109L5.886 5.08a.416.416 0 00-.567-.152.416.416 0 00-.152.567l1.956 3.39C3.552 10.28 2.4 12.394 2.4 14.8h19.2c0-2.406-1.152-4.52-2.923-5.316z"/></svg>`,
  linux: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M12.5 2C9.2 2 6.5 4.2 6 7.2c-.4 2.5.5 4.8 2.2 6.1-.3.9-.5 1.9-.4 2.9.2 2.1 1.5 3.9 3.4 4.7-.2.6-.3 1.2-.2 1.8.3 1.5 1.6 2.6 3.2 2.8.3 0 .6.1.9.1 2.2 0 4-1.6 4.4-3.7.1-.6 0-1.2-.2-1.8 1.9-.8 3.2-2.6 3.4-4.7.1-1-.1-2-.4-2.9 1.7-1.3 2.6-3.6 2.2-6.1C18.5 4.2 15.8 2 12.5 2zm-1.1 4.5c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm2.2 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zM8.5 9.8c.8-.5 1.8-.7 2.8-.5 1.2.2 2.2.9 2.7 1.9-.9.4-1.9.5-2.9.3-1-.2-1.9-.7-2.6-1.7z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><circle cx="9" cy="20" r="1.25"/><circle cx="18" cy="20" r="1.25"/><path d="M2.5 2.5h2l2.4 12.2a1.5 1.5 0 001.47 1.2h7.34a1.5 1.5 0 001.47-1.2L21.5 7.5H6.2"/></svg>`,
  cartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><circle cx="9" cy="20" r="1.25"/><circle cx="18" cy="20" r="1.25"/><path d="M2.5 2.5h2l2.4 12.2a1.5 1.5 0 001.47 1.2h7.34a1.5 1.5 0 001.47-1.2L21.5 7.5H6.2" fill="currentColor" fill-opacity="0.22" stroke="currentColor"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,
  creditcard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg icon-star"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><polyline points="9 18 15 12 9 6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="icon-svg"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><polyline points="6 9 12 15 18 9"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>`,
  colombia: `<svg viewBox="0 0 24 16" class="flag-svg" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#FCD116"/><rect y="8" width="24" height="4" fill="#003893"/><rect y="12" width="24" height="4" fill="#CE1126"/></svg>`,
  mexico: `<svg viewBox="0 0 24 16" class="flag-svg" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#fff"/><rect width="8" height="16" fill="#006847"/><rect x="16" width="8" height="16" fill="#CE1126"/><circle cx="12" cy="8" r="2" fill="#8B4513" opacity="0.6"/></svg>`,
  spain: `<svg viewBox="0 0 24 16" class="flag-svg" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#AA151B"/><rect y="4" width="24" height="8" fill="#F1BF00"/></svg>`,
  usa: `<svg viewBox="0 0 24 16" class="flag-svg" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#B22234"/><g fill="#fff"><rect y="1.23" width="24" height="1.23"/><rect y="3.69" width="24" height="1.23"/><rect y="6.15" width="24" height="1.23"/><rect y="8.62" width="24" height="1.23"/><rect y="11.08" width="24" height="1.23"/><rect y="13.54" width="24" height="1.23"/></g><rect width="10" height="7" fill="#3C3B6E"/></svg>`,
  brazil: `<svg viewBox="0 0 24 16" class="flag-svg" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#009B3A"/><polygon points="12,2 22,8 12,14 2,8" fill="#FEDF00"/><circle cx="12" cy="8" r="3" fill="#002776"/></svg>`,
};

const ICON_ALIASES = { mac: 'apple' };

function icon(name, className = '') {
  const resolved = ICON_ALIASES[name] || name;
  const svg = ICONS[resolved] || ICONS.globe;
  return `<span class="icon-wrap ${className}" aria-hidden="true">${svg}</span>`;
}

function platformBadge(platformKey, size = 'sm') {
  return platformLogoBadge(platformKey, size);
}

function platformLogoBadge(platformKey, size = 'sm') {
  const meta = PLATFORM_META[platformKey] || PLATFORM_META.global;
  const iconName = meta.icon || platformKey;
  return `<span class="platform-logo-badge platform-logo-badge--${size}" style="--plat-bg:${meta.color}" title="${meta.label}">
    <span class="platform-logo-badge__icon">${icon(iconName)}</span>
    <span class="platform-logo-badge__label">${meta.label}</span>
  </span>`;
}
