(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1).split('?')[0];
  const products = {
    'raiz-de-concreto': { title:'Raíz de concreto', price:'$119.900', color:'Marfil', origin:'Artista de la Casa', collection:'Entre grietas' },
    'ola-hokusai': { title:'Ola', price:'$139.900', color:'Navy', origin:'Archivo Abierto', collection:'La fuerza del agua' }
  };
  const setText = (el, text) => { if (el && el.textContent !== text) el.textContent = text; };

  function ensureV27Styles() {
    if (document.querySelector('link[data-misca-v27]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './v27.css';
    link.dataset.miscaV27 = 'commerce-finish';
    document.head.appendChild(link);
  }

  function homeConversion() {
    if (route() !== '/') return;
    const shop = app.querySelector('.v15-shop-window');
    const grid = shop?.querySelector('.v15-shop-grid');
    if (!grid || shop.querySelector('.v19-choice-helper')) return;
    grid.insertAdjacentHTML('afterend', `<div class="v19-choice-helper">
      <div><span>Si vienes por una voz original</span><strong>Empieza por Raíz.</strong><p>Alma Ríos · Entre grietas · Marfil</p><a href="#/producto/raiz-de-concreto">Ver Raíz de concreto →</a></div>
      <div><span>Si vienes por una obra histórica</span><strong>Empieza por Ola.</strong><p>Hokusai · La fuerza del agua · Navy</p><a href="#/producto/ola-hokusai">Ver Ola →</a></div>
    </div>`);
  }

  function plpConversion() {
    const r = route();
    if (!['/prendas','/nuevo'].includes(r)) return;
    const summary = app.querySelector('.v15-plp-summary');
    if (!summary || app.querySelector('.v19-plp-compare')) return;
    summary.insertAdjacentHTML('afterend', `<div class="wrap v19-plp-compare">
      <div class="v19-plp-compare__intro"><p class="eyebrow">Elige por origen</p><strong>Dos piezas. Dos maneras de entrar.</strong></div>
      <a href="#/producto/raiz-de-concreto" class="v19-plp-compare__card"><span>Artista de la Casa</span><strong>Raíz de concreto</strong><small>Marfil · $119.900</small><em>Ver producto →</em></a>
      <a href="#/producto/ola-hokusai" class="v19-plp-compare__card"><span>Archivo Abierto</span><strong>Ola</strong><small>Navy · $139.900</small><em>Ver producto →</em></a>
    </div>`);
  }

  function pdpConversion() {
    const match = route().match(/^\/producto\/(raiz-de-concreto|ola-hokusai)$/);
    if (!match) return;
    const handle = match[1];
    const p = products[handle];
    const page = app.querySelector('.product-page');
    const buybox = page?.querySelector('.buybox');
    const gallery = page?.querySelector('.product-gallery');
    if (!page || !buybox) return;

    page.classList.add('v27-product-page');
    buybox.classList.add('v27-buybox');
    gallery?.classList.add('v27-product-gallery');

    const variantTitle = buybox.querySelector('.variant-title span:first-child');
    setText(variantTitle, 'Elige tu talla');

    buybox.querySelectorAll('.sizes .size').forEach(button => {
      const size = button.dataset.size || button.textContent.trim();
      if (!button.getAttribute('aria-label')) button.setAttribute('aria-label', `Talla ${size}`);
    });

    const selected = buybox.querySelector('.sizes .size.active,.sizes .size.is-v6-selected,.sizes .size[aria-pressed="true"]');
    const status = buybox.querySelector('.buy-status');
    if (status) status.setAttribute('aria-live', 'polite');
    if (!selected && status && /elige|selecciona/i.test(status.textContent)) setText(status, 'Selecciona una talla para agregar a la bolsa.');

    const price = buybox.querySelector('.price');
    if (price && !buybox.querySelector('.v27-product-options')) {
      const swatchClass = handle === 'raiz-de-concreto' ? 'is-marfil' : 'is-navy';
      price.insertAdjacentHTML('afterend', `<div class="v27-product-options">
        <div class="v27-option"><span>Color de esta edición</span><strong><i class="v27-swatch ${swatchClass}" aria-hidden="true"></i>${p.color}</strong></div>
        <div class="v27-option"><span>Origen</span><strong>${p.origin}</strong></div>
      </div><div class="v27-launch-state"><i aria-hidden="true"></i><div><strong>Lanzamiento en preparación</strong><span>Compra pública al aprobar muestra física y operación.</span></div></div>`);
    }

    if (gallery && !gallery.querySelector('.v27-gallery-hint')) {
      gallery.insertAdjacentHTML('afterbegin', '<div class="v27-gallery-hint"><span>01—05</span><strong>Cinco vistas</strong><small>Desliza en móvil</small></div>');
    }

    const add = buybox.querySelector('.add-cart');
    const purchaseLine = buybox.querySelector('.v15-purchase-line');
    let proof = buybox.querySelector('.v19-buy-proof');
    if (add && !proof) {
      const anchor = purchaseLine || add;
      anchor.insertAdjacentHTML('afterend', `<div class="v19-buy-proof">
        <span>Producción local</span><span>Colección pequeña</span><span>${handle === 'ola-hokusai' ? 'Fuente documentada' : 'Obra original'}</span>
      </div>`);
      proof = buybox.querySelector('.v19-buy-proof');
    }

    const preview = buybox.querySelector('.preview-note');
    if (preview) {
      preview.classList.add('v19-preview-note');
      setText(preview, 'Las imágenes son conceptuales. Material, fit, impresión y disponibilidad se confirmarán con la muestra física antes de habilitar compra.');
      if (proof && preview.dataset.v19Positioned !== '1') {
        proof.insertAdjacentElement('afterend', preview);
        preview.dataset.v19Positioned = '1';
      }
    }

    buybox.querySelector('.accordions')?.classList.add('v27-accordions');

    const origin = buybox.querySelector('.v18-product-origin');
    if (origin && !origin.querySelector('.v19-product-price-link')) {
      origin.insertAdjacentHTML('beforeend', `<a class="v19-product-price-link" href="#/coleccion/${handle === 'raiz-de-concreto' ? 'entre-grietas' : 'la-fuerza-del-agua'}">Ver ${p.collection} →</a>`);
    }

    const related = [...app.querySelectorAll('section')].find(section => section.textContent.includes('También en MISCA') && section.querySelector('.product-grid'));
    if (related) {
      related.classList.add('v27-related');
      if (related.dataset.v19 !== '1') {
        related.dataset.v19 = '1';
        setText(related.querySelector('.eyebrow'), 'La otra pieza del lanzamiento');
        setText(related.querySelector('h2'), handle === 'raiz-de-concreto' ? 'También puedes entrar por Ola.' : 'También puedes entrar por Raíz.');
      }
      const heading = related.querySelector('.section-heading');
      if (heading && !related.querySelector('.v27-related-note')) {
        heading.insertAdjacentHTML('afterend', `<p class="v27-related-note">${handle === 'raiz-de-concreto' ? 'Una entrada desde Archivo Abierto, con procedencia visible.' : 'Una entrada desde una voz original de la Casa.'}</p>`);
      }
    }
  }

  function cartConversion() {
    const drawer = document.getElementById('cartDrawer');
    const footer = drawer?.querySelector('.drawer-footer');
    if (!drawer || !footer) return;

    setText(footer.querySelector('.v15-cart-note'), 'Revisa talla y cantidad antes de continuar.');
    setText(footer.querySelector('.v7-cart-continuation span'), 'Puedes seguir explorando sin perder lo que ya agregaste.');

    if (!footer.querySelector('.v19-cart-proof')) {
      const subtotal = footer.querySelector('.subtotal');
      subtotal?.insertAdjacentHTML('afterend', '<div class="v19-cart-proof"><span>Cantidad editable</span><span>Eliminar cuando quieras</span></div>');
    }
  }

  function enhance() {
    ensureV27Styles();
    homeConversion();
    plpConversion();
    pdpConversion();
    cartConversion();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app, { childList:true, subtree:true });
  const cart = document.getElementById('cartDrawer');
  if (cart) new MutationObserver(() => requestAnimationFrame(cartConversion)).observe(cart, { childList:true, subtree:true });
  window.addEventListener('hashchange', () => setTimeout(enhance, 0));
  setTimeout(enhance, 0);
})();
