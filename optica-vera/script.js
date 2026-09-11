'use strict';

// PERSONALIZACIÓN: reemplaza estos datos por los del negocio real.
const CONFIG = Object.freeze({
  whatsapp: '593990000000',
  instagram: 'opticavera',
  phoneDisplay: '+593 99 000 0000',
});

// Catálogo: precios en USD. Las categorías permiten pertenecer a varios filtros.
const PRODUCTS = [
  { name: 'Urban Black', price: 49.99, image: 'black-rectangular.webp', category: ['Hombre', 'Unisex'], material: 'Acetato · Negro', tag: 'Favorito' },
  { name: 'Classic Gold', price: 59.99, image: 'gold-round.webp', category: ['Mujer', 'Unisex'], material: 'Metal · Dorado', tag: '' },
  { name: 'Nova Transparent', price: 44.99, image: 'crystal-angular.webp', category: ['Unisex'], material: 'Acetato · Cristal', tag: 'Nuevo' },
  { name: 'Executive Black', price: 69.99, image: 'executive-square.webp', category: ['Hombre'], material: 'Acetato · Negro', tag: '' },
  { name: 'Aura Rose', price: 54.99, image: 'rose-cat-eye.webp', category: ['Mujer'], material: 'Acetato · Rosa', tag: '' },
  { name: 'Midnight', price: 64.99, image: 'black-sunglasses.webp', category: ['Hombre', 'Unisex', 'Lentes de sol'], material: 'Sol · Negro', tag: 'Lentes de sol' },
  { name: 'Essential Clear', price: 39.99, image: 'crystal-round.webp', category: ['Mujer', 'Unisex'], material: 'Acetato · Cristal', tag: '' },
  { name: 'Vision Gold', price: 74.99, image: 'gold-aviator.webp', category: ['Hombre', 'Mujer', 'Unisex', 'Lentes de sol'], material: 'Sol · Dorado', tag: 'Lentes de sol' },
];

const ICONS = {
  whatsapp: '<path d="M20.2 3.8a10 10 0 0 0-15.8 12L3 22l6.3-1.5A10 10 0 0 0 20.2 3.8Z"/><path d="M8.2 6.5c-.6 0-1.4 1.1-1.3 2.3.3 3.2 4.8 7.5 7.8 7.9 1.2.1 2.7-1.1 2.7-1.7l-2.7-1.5-1.2 1c-1.8-.7-3.3-2.2-4-3.9l.9-1.1-1.1-2.9Z"/>',
  glasses: '<rect x="2" y="9" width="8" height="7" rx="3"/><rect x="14" y="9" width="8" height="7" rx="3"/><path d="M10 11c1.3-1 2.7-1 4 0M2 12l1-7h3m16 7-1-7h-3"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  adjust: '<path d="M3 6h8m6 0h4M3 18h4m6 0h8M3 12h3m6 0h9"/><circle cx="14" cy="6" r="3"/><circle cx="9" cy="12" r="3"/><circle cx="10" cy="18" r="3"/>',
  tool: '<path d="m14 7 3 3 4-4c1 5-2 8-6 7L6 22l-4-4 9-9c-1-4 2-7 7-6Z"/>',
  chat: '<path d="M21 11a9 9 0 0 1-9 9H3l1.5-4.5A9 9 0 1 1 21 11Z"/><path d="M8 9h8m-8 4h5"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  sparkle: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
  shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  pin: '<path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="m7 2 3 5-3 3c1.5 3 3 4.5 6 6l3-3 5 3c1 4-1 6-4 5C9 19 5 15 3 7 2 4 3 2 7 2Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
};

function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

function populateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    const paths = ICONS[el.dataset.icon];
    if (paths) el.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
  });
}

function renderProducts(category = 'Todos') {
  const filtered = PRODUCTS.filter(product => category === 'Todos' || product.category.includes(category));
  const fragment = document.createDocumentFragment();
  filtered.forEach((product, index) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 35}ms`;
    const picture = document.createElement('div');
    picture.className = 'product-image';
    const img = document.createElement('img');
    img.src = `images/${product.image}`;
    img.alt = `${product.name}: ${product.material.toLowerCase()}`;
    img.width = 444; img.height = 300; img.loading = 'lazy'; img.decoding = 'async';
    picture.append(img);
    if (product.tag) {
      const tag = document.createElement('span');
      tag.className = 'product-tag'; tag.textContent = product.tag; picture.append(tag);
    }
    const info = document.createElement('div'); info.className = 'product-info';
    const name = document.createElement('h3'); name.textContent = product.name;
    const price = document.createElement('span'); price.className = 'product-price'; price.textContent = `$${product.price.toFixed(2)}`;
    info.append(name, price);
    const meta = document.createElement('div'); meta.className = 'product-meta';
    const material = document.createElement('span'); material.textContent = product.material;
    const link = document.createElement('a');
    link.className = 'product-consult'; link.textContent = 'Consultar';
    link.setAttribute('aria-label', `Consultar disponibilidad de ${product.name} por WhatsApp`);
    const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); link.append(arrow);
    link.href = whatsappUrl(`Hola, me interesa el modelo ${product.name}. ¿Está disponible?`);
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    meta.append(material, link); card.append(picture, info, meta); fragment.append(card);
  });
  document.querySelector('#product-grid').replaceChildren(fragment);
  document.querySelector('#product-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'modelo' : 'modelos'}`;
}

document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(link.dataset.whatsapp); });
document.querySelectorAll('[data-social]').forEach(link => { link.href = `https://www.instagram.com/${encodeURIComponent(CONFIG.instagram)}/`; });
document.querySelectorAll('[data-phone]').forEach(link => { link.href = `tel:+${CONFIG.whatsapp}`; link.textContent = CONFIG.phoneDisplay; });

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    renderProducts(button.dataset.filter);
  });
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { setMenu(false); menuButton.focus(); }
  if (event.key === 'Tab') {
    // Contiene el foco en la navegación móvil y el botón de cierre.
    const links = [...navigation.querySelectorAll('a'), menuButton];
    const index = links.indexOf(document.activeElement);
    if (event.shiftKey && index === 0) { event.preventDefault(); menuButton.focus(); }
    else if (!event.shiftKey && index === links.length - 1) { event.preventDefault(); links[0].focus(); }
  }
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
const updateHeader = () => document.querySelector('#header').classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

populateIcons();
renderProducts();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
