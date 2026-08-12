(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1);
  const A = './assets/products/';
  const products = {
    'raiz-de-concreto': {
      key: 'raiz', title: 'Raíz de concreto', artist: 'Alma Ríos', collection: 'Entre grietas', price: '$119.900', color: 'Marfil', origin: 'Artista de la Casa',
      cover: `${A}raiz/cover.svg`, front: `${A}raiz/front.svg`, back: `${A}raiz/back.svg`, detail: `${A}raiz/detail.svg`, context: `${A}raiz/context.svg`, crop: `${A}raiz/art-crop.svg`, spec: `${A}raiz/spec-card.svg`
    },
    'ola-hokusai': {
      key: 'ola', title: 'Ola', artist: 'Katsushika Hokusai', collection: 'La fuerza del agua', price: '$139.900', color: 'Navy', origin: 'Archivo Abierto',
      cover: `${A}ola/cover.svg`, front: `${A}ola/front.svg`, back: `${A}ola/back.svg`, detail: `${A}ola/detail.svg`, context: `${A}ola/context.svg`, crop: `${A}ola/art-crop.svg`, spec: `${A}ola/spec-card.svg`
    }
  };

  const image = (src, alt, cls = '') => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;
  const hide = el => { if (el) el.classList.add('v15-customer-hidden'); };
  const sectionWith = text => [...app.querySelectorAll('section')].find(s => s.textContent.includes(text));

  function removeLegacyNote() {
    document.querySelectorAll('.v5-route-note').forEach(el => el.remove());
  }

  function shopCard(handle) {
    const p = products[handle];
    const alternate = handle === 'raiz-de-concreto' ? p.front : p.back;
    return `<article class="v15-shop-card" data-v15-product="${handle}">
      <a class="v15-shop-card__media" href="#/producto/${handle}">
        ${image(p.cover, `Portada conceptual de ${p.title}`, 'v15-shop-cover')}
        ${image(alternate, `Vista conceptual de ${p.title}`, 'v15-shop-alt')}
        <span>Estudio conceptual</span>
      </a>
      <div class="v15-shop-card__copy">
        <div><small>${p.artist} · ${p.collection}</small><h2>${p.title}</h2></div>
        <strong>${p.price}</strong>
        <p>${p.color} · ${p.origin}</p>
        <a class="v15-shop-card__cta" href="#/producto/${handle}">Ver producto →</a>
      </div>
    </article>`;
  }

  function home() {
    if (route() !== '/') return;
    document.body.dataset.v15Route = 'home';

    hide(app.querySelector('.hero'));
    hide(app.querySelector('.intro-grid')?.closest('section'));
    hide(sectionWith('Cinco voces. Cinco universos.'));
    hide(app.querySelector('.archive-grid')?.closest('section'));
    hide(app.querySelector('.v14-launch-films'));
    hide(app.querySelector('.v5-launch-grid')?.closest('.v5-shell'));
    hide(app.querySelector('[data-v5-module] .v5-principles')?.closest('.v5-section'));

    const hero = app.querySelector('.v12-campaign-hero');
    if (hero && !document.querySelector('.v15-shop-window')) {
      hero.insertAdjacentHTML('afterend', `<section class="section v15-shop-window"><div class="wrap">
        <div class="v15-section-head"><div><p class="eyebrow">Lanzamiento 01</p><h2>Dos prendas. Ninguna distracción.</h2></div><p>Raíz y Ola concentran la compra inicial. Artistas, archivo e historias amplían el universo después.</p></div>
        <div class="v15-shop-grid">${shopCard('raiz-de-concreto')}${shopCard('ola-hokusai')}</div>
        <div class="v15-shop-proof"><span>2 productos en preview</span><span>Talla explícita</span><span>Precio hipótesis</span><span>Checkout deshabilitado en Pages</span></div>
      </div></section>`);
    }

    const universes = app.querySelector('.v12-home-universes');
    if (universes) {
      universes.classList.add('v15-universe-index');
      const h2 = universes.querySelector('h2');
      const copy = universes.querySelector('.v12-section-kicker > p:last-child');
      if (h2) h2.textContent = 'Diez universos. Dos productos hoy.';
      if (copy) copy.textContent = 'La marca puede crecer sin convertir cada idea en inventario. Explora el archivo creativo después de entrar por Raíz u Ola.';
      if (!document.querySelector('.v15-archive-feature')) {
        universes.insertAdjacentHTML('afterend', `<section class="section v15-archive-feature"><div class="wrap v15-archive-feature__grid">
          <div class="v15-archive-feature__visual">${image('./assets/universes/hokusai-la-fuerza-del-agua.svg','Master visual conceptual de La fuerza del agua')}</div>
          <div class="v15-archive-feature__copy"><p class="eyebrow">Archivo Abierto / Hokusai</p><h2>La fuente permanece visible.</h2><p>Ola parte de una obra histórica concreta y una procedencia documentada. La adaptación pertenece a MISCA; la obra original no se reemplaza.</p><p class="muted">The Met · JP1847 · Public Domain / Open Access</p><a class="button secondary" href="#/archivo">Entrar al archivo</a></div>
        </div></section>`);
      }
    }
  }

  function enhanceCards() {
    document.querySelectorAll('.product-card[data-product]').forEach(card => {
      const handle = card.dataset.product;
      const p = products[handle];
      if (!p || card.dataset.v15 === '1') return;
      const media = card.querySelector('.product-media');
      const main = media?.querySelector('.v14-card-image');
      if (!media || !main) return;
      card.dataset.v15 = '1';
      const altSrc = handle === 'raiz-de-concreto' ? p.front : p.back;
      main.classList.add('v15-card-main');
      main.insertAdjacentHTML('afterend', image(altSrc, `Vista alternativa conceptual de ${p.title}`, 'v15-card-alt'));
      const actions = card.querySelector('.v6-card-actions');
      if (actions) {
        const primary = actions.querySelector('.v6-card-link');
        const secondary = actions.querySelector('.v6-card-size');
        if (primary) primary.textContent = `Ver ${p.title}`;
        secondary?.remove();
      }
      const info = card.querySelector('.product-info');
      if (info && !info.querySelector('.v15-card-status')) {
        info.insertAdjacentHTML('beforeend', `<div class="v15-card-status"><span>${p.color}</span><span>${p.origin}</span></div>`);
      }
    });
  }

  function plp() {
    const r = route();
    if (r !== '/prendas' && r !== '/nuevo') return;
    document.body.dataset.v15Route = 'plp';
    hide(app.querySelector('.v7-assortment-note'));
    hide(app.querySelector('[data-v5-module]'));
    const hero = app.querySelector('.page-hero');
    const grid = app.querySelector('.collection-grid');
    if (hero && grid && !app.querySelector('.v15-plp-summary')) {
      hero.insertAdjacentHTML('afterend', `<div class="wrap v15-plp-summary"><div><strong>2 piezas</strong><span>lanzamiento inicial</span></div><div><strong>Raíz + Ola</strong><span>talla dentro del producto</span></div><div><strong>Precio visible</strong><span>hipótesis hasta Product Ready</span></div></div>`);
    }
  }

  function galleryHtml(p) {
    const frames = [
      ['Frente', p.front], ['Espalda', p.back], ['Detalle', p.detail], ['Contexto', p.context], ['Obra / crop', p.crop]
    ];
    return frames.map(([label, src], i) => `<figure class="gallery-cell v15-gallery-cell" data-v15-frame="${i + 1}">
      ${image(src, `${label} conceptual de ${p.title}`)}
      <figcaption><span>${String(i + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}</span><strong>${label}</strong></figcaption>
    </figure>`).join('');
  }

  function addDevelopmentDrawer(page, p) {
    if (app.querySelector('.v15-development-access')) return;
    const anchor = app.querySelector('[data-v10-workshop-spec]') || app.querySelector('.v9-direction-section');
    const insertion = app.querySelector('.page') || app;
    insertion.insertAdjacentHTML('beforeend', `<section class="section v15-development-access"><div class="wrap"><div class="v15-development-card">
      <div><p class="eyebrow">Vista de desarrollo</p><h2>Decisiones que no necesita ver el comprador.</h2><p>A/B de dirección, IDs de impresión, ficha de taller y evidencia Product Ready siguen disponibles para revisión del proyecto.</p></div>
      <button type="button" class="button secondary" data-v15-development-toggle>Ver decisiones de desarrollo</button>
    </div></div></section>`);
    const btn = document.querySelector('[data-v15-development-toggle]');
    btn?.addEventListener('click', () => {
      const open = document.body.classList.toggle('v15-development-open');
      btn.textContent = open ? 'Ocultar decisiones de desarrollo' : 'Ver decisiones de desarrollo';
      if (open && anchor) setTimeout(() => anchor.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    });
  }

  function pdp() {
    const m = route().match(/^\/producto\/(raiz-de-concreto|ola-hokusai)$/);
    if (!m) return;
    document.body.dataset.v15Route = 'pdp';
    const p = products[m[1]];
    const page = app.querySelector('.product-page');
    const gallery = page?.querySelector('.product-gallery');
    const buybox = page?.querySelector('.buybox');
    if (!page || !gallery || !buybox) return;

    if (gallery.dataset.v15 !== '1') {
      gallery.dataset.v15 = '1';
      gallery.innerHTML = galleryHtml(p);
      app.querySelector('.v6-gallery-summary')?.remove();
      app.querySelector('.v7-gallery-progress')?.remove();
    }

    hide(app.querySelector('.v14-product-chapter'));
    hide(app.querySelector('.v9-direction-section'));
    hide(app.querySelector('[data-v10-workshop-spec]'));
    hide(app.querySelector('[data-v5-module]'));
    hide(buybox.querySelector('.v6-buy-assurance'));
    hide(buybox.querySelector('.v7-purchase-note'));
    hide(buybox.querySelector('.v9-decision-flag'));

    const state = buybox.querySelector('.v6-pdp-meta > div:nth-child(3)');
    hide(state);
    const note = buybox.querySelector('.preview-note');
    if (note) note.textContent = 'Vista de desarrollo · precio hipótesis · datos físicos pendientes de Product Ready.';

    const add = buybox.querySelector('.add-cart');
    if (add && !buybox.querySelector('.v15-purchase-line')) {
      add.insertAdjacentHTML('afterend', `<div class="v15-purchase-line"><span>Talla requerida</span><span>Fit y entrega por validar</span><span>Checkout solo en Shopify Preview</span></div>`);
    }

    const boundary = app.querySelector('.v14-pdp-boundary');
    if (boundary) boundary.innerHTML = '<strong>Campaña conceptual.</strong> Las fotografías finales reemplazarán estas vistas después de blank, impresión, lavado y aprobación física.';

    addDevelopmentDrawer(page, p);
  }

  function secondaryRoutes() {
    const r = route();
    if (r === '/colecciones' || r === '/historias' || r === '/archivo' || r === '/artistas' || r.startsWith('/artista/')) {
      hide(app.querySelector('[data-v5-module]'));
    }
    if (r === '/colecciones') {
      const baseCollectionCards = sectionWith('Universos completos, no estampados sueltos.')?.nextElementSibling;
      if (baseCollectionCards?.querySelector('.product-grid')) hide(baseCollectionCards);
    }
  }

  function cart() {
    const drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    hide(drawer.querySelector('.v6-cart-intro'));
    hide(drawer.querySelector('.v6-cart-foot'));
    const footer = drawer.querySelector('.drawer-footer');
    if (footer && !footer.querySelector('.v15-cart-note')) {
      footer.insertAdjacentHTML('afterbegin', '<p class="v15-cart-note">Revisa prenda y talla. El checkout permanece deshabilitado en GitHub Pages.</p>');
    }
  }

  function resetRouteState() {
    document.body.classList.remove('v15-development-open');
    delete document.body.dataset.v15Route;
  }

  function enhance() {
    removeLegacyNote();
    home();
    enhanceCards();
    plp();
    pdp();
    secondaryRoutes();
    cart();
  }

  let previous = route();
  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app, { childList: true, subtree: true });
  const drawer = document.getElementById('cartDrawer');
  if (drawer) new MutationObserver(() => requestAnimationFrame(cart)).observe(drawer, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => {
    const current = route();
    if (current !== previous) { previous = current; resetRouteState(); }
    setTimeout(enhance, 0);
  });
  setTimeout(enhance, 0);
})();
