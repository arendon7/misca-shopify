(() => {
  function applyPreviewFixes() {
    const path = (location.hash.slice(1) || '/').split('?')[0];

    // NEW is a commercial surface, not a duplicate of Home.
    if (path === '/nuevo' && typeof prendas === 'function' && typeof products !== 'undefined') {
      app.innerHTML = prendas(
        'Nuevo',
        'Las primeras piezas que definen el lanzamiento de MISCA.',
        [products.raiz, products.ola]
      );
      if (typeof bindPage === 'function') bindPage();
      document.title = 'MISCA — Nuevo';
      window.scrollTo(0, 0);
    }

    // Historical creators live in Archivo Abierto, not under Artistas de la Casa.
    if (path === '/producto/ola-hokusai') {
      const creatorLink = document.querySelector('.buybox .eyebrow a');
      if (creatorLink) creatorLink.href = '#/archivo/hokusai';
    }
    if (path === '/producto/ladron-de-fresas') {
      const creatorLink = document.querySelector('.buybox .eyebrow a');
      if (creatorLink) creatorLink.href = '#/archivo/william-morris';
    }

    // Do not create broken collection links for artist universes still in development.
    if (path.startsWith('/artista/') && path !== '/artista/alma-rios') {
      const collectionLink = document.querySelector('.artist-bio .link-arrow');
      if (collectionLink) {
        collectionLink.removeAttribute('href');
        collectionLink.textContent = 'Colección en desarrollo';
        collectionLink.style.opacity = '.55';
        collectionLink.style.cursor = 'default';
        collectionLink.style.borderBottom = '0';
      }
    }
  }

  const v28Products = {
    'raiz-de-concreto': { title:'Raíz de concreto', origin:'Artista de la Casa', color:'Marfil', price:'$119.900' },
    'ola-hokusai': { title:'Ola', origin:'Archivo Abierto', color:'Navy', price:'$139.900' }
  };

  function v28Path() {
    return (location.hash.slice(1) || '/').split('?')[0];
  }

  function readV28Cart() {
    try { return JSON.parse(localStorage.getItem('misca-preview-cart') || '[]'); } catch { return []; }
  }

  function applyV28Shop() {
    const path = v28Path();
    if (path !== '/prendas' && path !== '/nuevo') return;
    document.querySelector('.filter-row')?.remove();
    const intro = app.querySelector('.v23-page-intro');
    const launch = app.querySelector('.v23-launch--shop');
    const duo = launch?.querySelector('.v23-product-duo');
    if (!launch || !duo) return;
    intro?.classList.add('v28-shop-intro');

    if (!launch.querySelector('.v28-shop-switcher')) {
      duo.insertAdjacentHTML('beforebegin', `<nav class="v28-shop-switcher" aria-label="Elegir pieza del lanzamiento">
        <div class="v28-shop-switcher__label">Lanzamiento 01<br>elige tu entrada</div>
        <a href="#/producto/raiz-de-concreto"><small>Artista de la Casa</small><strong>Raíz de concreto</strong><span>Marfil · $119.900</span></a>
        <a href="#/producto/ola-hokusai"><small>Archivo Abierto</small><strong>Ola</strong><span>Navy · $139.900</span></a>
      </nav>`);
    }

    duo.querySelectorAll('.v23-product-card').forEach(card => {
      const href = card.getAttribute('href') || '';
      const handle = href.includes('raiz-de-concreto') ? 'raiz-de-concreto' : href.includes('ola-hokusai') ? 'ola-hokusai' : '';
      const product = v28Products[handle];
      if (!product || card.dataset.v28 === '1') return;
      card.dataset.v28 = '1';
      const media = card.querySelector('.v23-product-card__media');
      if (media && !media.querySelector('.v28-card-origin')) media.insertAdjacentHTML('beforeend', `<span class="v28-card-origin">${product.origin}</span>`);
      if (!card.querySelector('.v28-card-cta')) card.insertAdjacentHTML('beforeend', '<span class="v28-card-cta"><span>Ver producto · elegir talla</span><b aria-hidden="true">→</b></span>');
    });

    const proof = launch.querySelector('.v23-shop-proof');
    if (proof && proof.dataset.v28 !== '1') {
      proof.dataset.v28 = '1';
      proof.innerHTML = '<span>2 piezas del lanzamiento</span><span>Tallas S–XL en producto</span><span>Visuales conceptuales identificados</span><span>Compra pública tras Product Ready</span>';
    }
  }

  function applyV28Cart() {
    const drawer = document.getElementById('cartDrawer');
    const footer = drawer?.querySelector('.drawer-footer');
    const items = document.getElementById('cartItems');
    if (!drawer || !footer || !items) return;
    drawer.classList.add('v28-cart');
    const heading = drawer.querySelector('.drawer-head h2');
    if (heading && heading.textContent !== 'Bolsa') heading.textContent = 'Bolsa';

    const cart = readV28Cart();
    const count = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    let intro = drawer.querySelector('.v28-cart-intro');
    if (!intro) {
      drawer.querySelector('.drawer-head')?.insertAdjacentHTML('afterend', '<div class="v28-cart-intro"><span>Resumen de pedido</span><strong data-v28-cart-count>0 piezas</strong></div>');
      intro = drawer.querySelector('.v28-cart-intro');
    }
    const countNode = intro?.querySelector('[data-v28-cart-count]');
    const countLabel = `${count} ${count === 1 ? 'pieza' : 'piezas'}`;
    if (countNode && countNode.textContent !== countLabel) countNode.textContent = countLabel;

    if (!footer.querySelector('.v28-cart-summary')) {
      const proof = footer.querySelector('.v19-cart-proof');
      const anchor = proof || footer.querySelector('.subtotal');
      anchor?.insertAdjacentHTML('afterend', '<div class="v28-cart-summary"><span>Checkout · vista de prueba</span><span>Pagos · no procesados en Pages</span></div>');
    }

    items.querySelectorAll('.cart-line').forEach(line => {
      line.querySelector('[data-dec]')?.setAttribute('aria-label', 'Reducir cantidad');
      line.querySelector('[data-inc]')?.setAttribute('aria-label', 'Aumentar cantidad');
      const remove = line.querySelector('.v16-remove-item');
      const title = line.querySelector('h4')?.textContent.trim() || 'producto';
      remove?.setAttribute('aria-label', `Eliminar ${title}`);
    });
  }

  function applyV28() {
    applyV28Shop();
    applyV28Cart();
  }

  const appNode = document.getElementById('app');
  if (appNode) new MutationObserver(() => requestAnimationFrame(applyV28)).observe(appNode, { childList:true, subtree:true });
  const cartNode = document.getElementById('cartDrawer');
  if (cartNode) new MutationObserver(() => requestAnimationFrame(applyV28Cart)).observe(cartNode, { childList:true, subtree:true });

  window.addEventListener('hashchange', () => {
    setTimeout(applyPreviewFixes, 0);
    setTimeout(applyV28, 260);
  });
  setTimeout(applyPreviewFixes, 0);
  setTimeout(applyV28, 260);
  setTimeout(applyV28, 620);
})();
