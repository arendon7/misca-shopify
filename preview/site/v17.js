(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1).split('?')[0];
  const A = './assets/products/';
  const activeHandles = new Set(['raiz-de-concreto', 'ola-hokusai']);
  const developmentHandles = new Set(['guardian-del-silencio', 'ladron-de-fresas']);
  const knownHandles = new Set([...activeHandles, ...developmentHandles]);
  const commerce = {
    'raiz-de-concreto': { title:'Raíz de concreto', price:'$119.900', color:'Marfil', origin:'Artista de la Casa', thumb:`${A}raiz/front.svg` },
    'ola-hokusai': { title:'Ola', price:'$139.900', color:'Navy', origin:'Archivo Abierto', thumb:`${A}ola/front.svg` }
  };

  const setText = (el, text) => {
    if (el && el.textContent !== text) el.textContent = text;
  };

  function ensureSkipLink() {
    if (document.querySelector('.v16-skip-link')) return;
    const link = document.createElement('a');
    link.className = 'v16-skip-link';
    link.href = '#app';
    link.textContent = 'Saltar al contenido';
    document.body.prepend(link);
  }

  function repairNewRoute() {
    if (route() !== '/nuevo') return;
    if (app.querySelector('.collection-grid') || app.dataset.v17NewRoute === '1') return;
    if (typeof window.prendas !== 'function') return;
    app.dataset.v17NewRoute = '1';
    app.innerHTML = window.prendas('Nuevo', 'Lanzamiento 01. Raíz y Ola son las dos piezas activas de esta primera salida.');
    if (typeof window.bindPage === 'function') window.bindPage();
    window.scrollTo(0, 0);
    document.title = 'MISCA — Nuevo';
  }

  function guardProductRoute() {
    const match = route().match(/^\/producto\/([^/]+)$/);
    if (!match || knownHandles.has(match[1])) return;
    if (app.dataset.v17InvalidProduct === match[1] && app.querySelector('.v17-route-404')) return;
    app.dataset.v17InvalidProduct = match[1];
    app.innerHTML = `<div class="page v17-route-404"><section class="page-hero"><div class="wrap"><p class="eyebrow">404</p><h1>No encontramos esta pieza.</h1><p class="lede">Puedes volver a las prendas activas del lanzamiento.</p><a class="button" href="#/prendas">Ver prendas</a></div></section></div>`;
    document.title = 'MISCA — Página no encontrada';
  }

  function syncNavigation() {
    const r = route();
    document.querySelectorAll('.desktop-nav a,.mobile-menu nav a').forEach(link => {
      const href = (link.getAttribute('href') || '').replace('#','');
      const section = href === '/prendas' ? r === '/prendas' : href === '/nuevo' ? r === '/nuevo' : r === href || r.startsWith(`${href}/`);
      if (section) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
  }

  function polishHome() {
    if (route() !== '/') return;
    document.querySelectorAll('.v15-shop-card__media > span').forEach(el => setText(el, 'Lanzamiento 01'));
    const proof = document.querySelector('.v15-shop-proof');
    if (proof && proof.dataset.v17 !== '1') {
      proof.dataset.v17 = '1';
      proof.innerHTML = '<span>2 piezas</span><span>Tallas S–XL</span><span>Producción local</span><span>Colecciones pequeñas</span>';
    }
    setText(document.querySelector('.v15-section-head > p'), 'Dos piezas para comprar primero. Artistas, archivo e historias amplían el universo sin distraer del producto.');
  }

  function polishCards() {
    document.querySelectorAll('.product-card[data-product]').forEach(card => {
      const handle = card.dataset.product || '';
      if (!activeHandles.has(handle)) return;
      const labels = card.querySelectorAll('.v6-card-meta span');
      setText(labels[0], 'Lanzamiento 01');
      setText(labels[1], 'Ver producto');
    });
  }

  function polishPlp() {
    const r = route();
    if (r !== '/prendas' && r !== '/nuevo') return;
    const hero = app.querySelector('.page-hero');
    if (r === '/prendas') setText(hero?.querySelector('h1'), 'Prendas');
    setText(hero?.querySelector('.lede'), 'Dos piezas activas. Entra al producto para ver campaña, talla, historia y detalles de compra.');
    const summary = app.querySelector('.v15-plp-summary');
    if (summary && summary.dataset.v17 !== '1') {
      summary.dataset.v17 = '1';
      summary.innerHTML = '<div><strong>2 piezas</strong><span>lanzamiento 01</span></div><div><strong>S · M · L · XL</strong><span>elige dentro del producto</span></div><div><strong>Raíz + Ola</strong><span>dos universos, una tienda</span></div>';
    }
  }

  function polishPdp() {
    const match = route().match(/^\/producto\/(raiz-de-concreto|ola-hokusai)$/);
    if (!match) return;
    const page = app.querySelector('.product-page');
    const buybox = page?.querySelector('.buybox');
    if (!page || !buybox) return;

    page.querySelector('.buy-status')?.setAttribute('aria-live','polite');
    setText(buybox.querySelector('.preview-note'), 'Vista previa de lanzamiento. La venta pública se habilitará después de aprobar muestra, fit y operación.');

    const add = buybox.querySelector('.add-cart');
    const purchaseLine = buybox.querySelector('.v15-purchase-line');
    if (purchaseLine && purchaseLine.dataset.v17 !== '1') {
      purchaseLine.dataset.v17 = '1';
      purchaseLine.innerHTML = '<span>Elige talla</span><span>Revisa detalles</span><span>Agrega a tu bolsa</span>';
    }
    if (add) add.setAttribute('aria-describedby','buyStatus');

    const details = buybox.querySelectorAll('.accordions details');
    if (details.length >= 4 && buybox.dataset.v17Accordions !== '1') {
      buybox.dataset.v17Accordions = '1';
      setText(details[1].querySelector('.detail-body'), 'Tallas S, M, L y XL en esta vista. La tabla definitiva de medidas se publicará antes de habilitar la venta.');
      setText(details[2].querySelector('.detail-body'), 'Tiempos, cobertura y condiciones de cambio aparecerán antes de la compra pública y dentro del checkout.');
      setText(details[3].querySelector('.detail-body'), 'Las instrucciones definitivas de lavado y cuidado se publicarán con la ficha final de cada prenda.');
    }

    buybox.querySelectorAll('.sizes .size').forEach(button => {
      if (button.dataset.v17Bound === '1') return;
      button.dataset.v17Bound = '1';
      button.addEventListener('click', () => {
        setTimeout(() => {
          const selected = buybox.querySelector('.sizes .size.active,.sizes .size.is-v6-selected,[aria-pressed="true"]');
          buybox.classList.toggle('v16-size-ready', !!selected);
        }, 0);
      });
    });

    const dev = app.querySelector('.v15-development-card');
    if (dev && dev.dataset.v17 !== '1') {
      dev.dataset.v17 = '1';
      setText(dev.querySelector('p:not(.eyebrow)'), 'A/B de dirección, IDs de impresión, ficha de taller, supuestos físicos y evidencia Product Ready permanecen aquí para el equipo.');
    }
  }

  function searchDiscovery() {
    const results = document.getElementById('searchResults');
    const input = document.getElementById('searchInput');
    if (!results || !input || input.value.trim() || results.querySelector('.v16-search-discovery')) return;
    results.innerHTML = `<div class="v16-search-discovery">
      <p class="eyebrow">Explorar</p>
      <a href="#/producto/raiz-de-concreto"><span>Raíz de concreto</span><small>Alma Ríos · Entre grietas</small></a>
      <a href="#/producto/ola-hokusai"><span>Ola</span><small>Hokusai · Archivo Abierto</small></a>
      <a href="#/artistas"><span>Artistas</span><small>Universos y colecciones</small></a>
      <a href="#/archivo"><span>Archivo Abierto</span><small>Obras y procedencia</small></a>
    </div>`;
  }

  function polishSearchResults() {
    const results = document.getElementById('searchResults');
    const input = document.getElementById('searchInput');
    if (!results || !input) return;
    if (!input.value.trim()) { searchDiscovery(); return; }

    results.querySelectorAll('.search-result').forEach(link => {
      const href = link.getAttribute('href') || '';
      if ([...developmentHandles].some(handle => href.includes(`/producto/${handle}`))) link.remove();
    });

    const list = results.querySelector('.search-results');
    if (!list) return;
    const links = list.querySelectorAll('.search-result').length;
    const legacyEmpty = list.querySelector(':scope > p:not(.v16-search-count)');
    const count = list.querySelector('.v16-search-count');

    if (!links) {
      legacyEmpty?.remove();
      count?.remove();
      if (!list.querySelector('.v16-search-empty')) {
        list.innerHTML = '<div class="v16-search-empty"><strong>No encontramos coincidencias.</strong><p>Prueba con Raíz, Ola, Alma, Hokusai o explora las dos piezas activas.</p><a class="button secondary" href="#/prendas">Ver prendas</a></div>';
      }
      return;
    }

    legacyEmpty?.remove();
    const label = `${links} ${links === 1 ? 'resultado' : 'resultados'}`;
    if (count) setText(count, label);
    else list.insertAdjacentHTML('afterbegin', `<p class="v16-search-count">${label}</p>`);
  }

  function bindSearch() {
    const input = document.getElementById('searchInput');
    const button = document.getElementById('searchButton');
    const overlay = document.getElementById('searchOverlay');
    if (!input || !button || !overlay || input.dataset.v17Bound === '1') return;
    input.dataset.v17Bound = '1';
    button.addEventListener('click', () => setTimeout(searchDiscovery, 0));
    input.addEventListener('input', () => setTimeout(polishSearchResults, 0));
    overlay.addEventListener('click', e => {
      if (e.target.closest('a[href^="#/"]')) document.getElementById('searchClose')?.click();
    });
  }

  function readCart() {
    try { return JSON.parse(localStorage.getItem('misca-preview-cart') || '[]'); } catch { return []; }
  }

  function writeCart(cart) {
    localStorage.setItem('misca-preview-cart', JSON.stringify(cart));
    if (typeof window.updateCartCount === 'function') window.updateCartCount();
    if (typeof window.renderCart === 'function') window.renderCart();
  }

  function polishCart() {
    const drawer = document.getElementById('cartDrawer');
    const items = document.getElementById('cartItems');
    const checkout = document.getElementById('checkoutPreview');
    if (!drawer || !items || !checkout) return;
    const cart = readCart();
    drawer.classList.toggle('v16-cart-empty', cart.length === 0);
    checkout.disabled = cart.length === 0;
    setText(checkout, cart.length ? 'Continuar al checkout' : 'Tu bolsa está vacía');

    if (!cart.length) {
      if (!items.querySelector('.v16-cart-empty-state')) {
        items.innerHTML = `<div class="v16-cart-empty-state"><p class="eyebrow">Tu bolsa</p><h3>Empieza por una de dos.</h3><p>Raíz y Ola concentran el lanzamiento inicial.</p><a class="button full" href="#/prendas" data-v17-close-cart>Ver prendas</a></div>`;
        items.querySelector('[data-v17-close-cart]')?.addEventListener('click', () => document.getElementById('cartClose')?.click());
      }
      return;
    }

    items.querySelectorAll('.cart-line').forEach((line, index) => {
      const title = line.querySelector('h4')?.textContent.trim();
      const product = Object.values(commerce).find(p => p.title === title);
      const thumb = line.querySelector('.cart-thumb');
      if (product && thumb && thumb.dataset.v17 !== '1') {
        thumb.dataset.v17 = '1';
        thumb.innerHTML = `<img src="${product.thumb}" alt="${product.title}" loading="lazy">`;
      }
      if (!line.querySelector('.v16-remove-item')) {
        const qty = line.querySelector('.qty');
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'v16-remove-item';
        remove.textContent = 'Eliminar';
        remove.addEventListener('click', () => {
          const next = readCart();
          next.splice(index, 1);
          writeCart(next);
        });
        qty?.insertAdjacentElement('afterend', remove);
      }
    });
  }

  function polishNotFound() {
    const eyebrow = app.querySelector('.page-hero .eyebrow');
    if (!eyebrow || eyebrow.textContent.trim() !== '404') return;
    const hero = eyebrow.closest('.page-hero');
    setText(hero?.querySelector('h1'), 'No encontramos esta página.');
    setText(hero?.querySelector('.lede'), 'Puedes volver al inicio o entrar directamente a las piezas del lanzamiento.');
    const link = hero?.querySelector('.button');
    if (link) {
      if (link.getAttribute('href') !== '#/prendas') link.href = '#/prendas';
      setText(link, 'Ver prendas');
    }
  }

  function syncOverlays() {
    const menu = document.getElementById('mobileMenu');
    const search = document.getElementById('searchOverlay');
    const cart = document.getElementById('cartDrawer');
    const open = menu?.classList.contains('open') || search?.classList.contains('open') || cart?.classList.contains('open');
    document.body.classList.toggle('v16-overlay-open', !!open);
  }

  function bindOverlayState() {
    if (document.body.dataset.v17OverlayBound === '1') return;
    document.body.dataset.v17OverlayBound = '1';
    ['menuButton','menuClose','searchButton','searchClose','cartButton','cartClose','drawerBackdrop'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => setTimeout(syncOverlays, 0));
    });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      document.getElementById('mobileMenu')?.setAttribute('aria-hidden','true');
      setTimeout(syncOverlays, 0);
    });
    document.getElementById('mobileMenu')?.addEventListener('click', e => {
      if (e.target.closest('a')) document.getElementById('mobileMenu')?.setAttribute('aria-hidden','true');
    });
  }

  function enhance() {
    ensureSkipLink();
    repairNewRoute();
    guardProductRoute();
    syncNavigation();
    polishHome();
    polishCards();
    polishPlp();
    polishPdp();
    bindSearch();
    polishSearchResults();
    polishCart();
    polishNotFound();
    bindOverlayState();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app, { childList:true, subtree:true });
  const cartDrawer = document.getElementById('cartDrawer');
  if (cartDrawer) new MutationObserver(() => requestAnimationFrame(polishCart)).observe(cartDrawer, { childList:true, subtree:true });
  const searchResults = document.getElementById('searchResults');
  if (searchResults) new MutationObserver(() => requestAnimationFrame(polishSearchResults)).observe(searchResults, { childList:true, subtree:true });
  window.addEventListener('hashchange', () => {
    delete app.dataset.v17NewRoute;
    delete app.dataset.v17InvalidProduct;
    setTimeout(enhance, 0);
  });
  setTimeout(enhance, 0);
})();
