(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1);
  const activeHandles = new Set(['raiz-de-concreto','ola-hokusai']);
  const developmentRoutes = new Set(['/producto/guardian-del-silencio','/producto/ladron-de-fresas']);
  let lastSizeGuideTrigger = null;

  function cleanHome() {
    const r = route();
    document.body.dataset.v7Route = (r === '/' || r === '') ? 'home' : 'other';
    if (r !== '/' && r !== '') return;

    const hero = app.querySelector('.hero');
    const heroCopy = hero?.querySelector('.hero-copy');
    if (heroCopy && !heroCopy.querySelector('.v7-home-proof')) {
      const proof = document.createElement('div');
      proof.className = 'v7-home-proof';
      proof.innerHTML = '<span>Lanzamiento inicial · Raíz + Ola</span><span>Talla explícita</span><span>Precios provisionales</span><span>Checkout real en Shopify Preview</span>';
      heroCopy.appendChild(proof);
    }

    const v5Module = app.querySelector('[data-v5-module]');
    const launch = v5Module?.querySelector('.v5-shell.v5-section');
    if (hero && launch && launch.dataset.v7Moved !== 'true') {
      launch.dataset.v7Moved = 'true';
      hero.insertAdjacentElement('afterend', launch);
    }

    app.querySelectorAll('section').forEach(section => {
      if (section.textContent.includes('Comprar ahora')) section.classList.add('v7-cro-hidden');
    });
    app.querySelector('.process-grid')?.closest('section')?.classList.add('v7-cro-hidden');
  }

  function cleanCardsAndAssortment() {
    const r = route();
    const assortmentRoute = r === '/prendas' || r === '/nuevo';

    document.querySelectorAll('.product-card').forEach(card => {
      const handle = card.dataset.product || '';
      const active = activeHandles.has(handle);
      card.classList.toggle('v7-development-card', !active);
      if (assortmentRoute && !active) card.classList.add('v7-cro-hidden');

      const meta = card.querySelector('.v6-card-meta span:first-child');
      if (meta) meta.textContent = active ? 'Estudio conceptual' : 'En desarrollo';

      const primary = card.querySelector('.v6-card-link');
      const title = card.querySelector('.product-info h3')?.textContent?.trim();
      if (primary && title) primary.textContent = `Ver ${title}`;
    });

    if (assortmentRoute) {
      const grid = app.querySelector('.collection-grid,.product-grid');
      const filter = app.querySelector('.filter-row');
      filter?.classList.add('v7-cro-hidden');
      if (grid && !grid.previousElementSibling?.classList.contains('v7-assortment-note')) {
        const note = document.createElement('div');
        note.className = 'v7-assortment-note';
        note.innerHTML = '<strong>2 piezas en lanzamiento inicial</strong><span>Raíz de concreto · Ola</span><span>La talla se elige dentro del producto</span>';
        grid.insertAdjacentElement('beforebegin', note);
      }
    }
  }

  function setPdpCtaState(page) {
    const add = page?.querySelector('.add-cart');
    if (!add || page.classList.contains('v7-development-pdp')) return;
    const selected = page.querySelector('.sizes .size[aria-pressed="true"],.sizes .size.is-v6-selected')?.dataset.size || '';
    add.textContent = selected ? `Agregar a bolsa · ${selected}` : 'Elegir talla';
    const sticky = document.querySelector('.v6-mobile-buybar button');
    if (sticky) sticky.textContent = selected ? `Agregar a bolsa · ${selected}` : 'Elegir talla';
  }

  function addGalleryProgress(page) {
    const gallery = page?.querySelector('.product-gallery');
    if (!gallery || page.querySelector('.v7-gallery-progress')) return;
    const cells = [...gallery.querySelectorAll('.gallery-cell')];
    if (!cells.length) return;

    const progress = document.createElement('div');
    progress.className = 'v7-gallery-progress';
    progress.innerHTML = `<div class="v7-gallery-progress-track">${cells.map((_,i)=>`<span class="v7-gallery-dot${i===0?' is-active':''}"></span>`).join('')}</div><span class="v7-gallery-count">01 / ${String(cells.length).padStart(2,'0')}</span>`;
    const summary = page.querySelector('.v6-gallery-summary');
    (summary || gallery).insertAdjacentElement('afterend', progress);

    let ticking = false;
    const update = () => {
      ticking = false;
      const center = gallery.scrollLeft + gallery.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      cells.forEach((cell,i) => {
        const cellCenter = cell.offsetLeft + cell.offsetWidth / 2;
        const d = Math.abs(center - cellCenter);
        if (d < distance) { distance = d; best = i; }
      });
      progress.querySelectorAll('.v7-gallery-dot').forEach((dot,i)=>dot.classList.toggle('is-active',i===best));
      const count = progress.querySelector('.v7-gallery-count');
      if (count) count.textContent = `${String(best+1).padStart(2,'0')} / ${String(cells.length).padStart(2,'0')}`;
    };
    gallery.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, {passive:true});
  }

  function enhancePdp() {
    const r = route();
    const page = app.querySelector('.product-page');
    if (!page) return;
    const buybox = page.querySelector('.buybox');
    buybox?.classList.add('v7-buybox');

    if (developmentRoutes.has(r)) {
      page.classList.add('v7-development-pdp');
      const add = page.querySelector('.add-cart');
      if (add) {
        add.textContent = 'En desarrollo';
        add.disabled = true;
        add.setAttribute('aria-disabled','true');
      }
      if (buybox && !buybox.querySelector('.v7-development-notice')) {
        const notice = document.createElement('div');
        notice.className = 'v7-development-notice';
        notice.innerHTML = '<strong>No forma parte del lanzamiento inicial.</strong><br>Esta pieza permanece como concepto de colección. No se puede agregar a la bolsa ni asumir disponibilidad.';
        buybox.querySelector('.price')?.insertAdjacentElement('afterend', notice);
      }
      document.querySelector('.v6-mobile-buybar')?.remove();
      return;
    }

    if (!activeHandles.has(r.split('/').pop())) return;

    const add = page.querySelector('.add-cart');
    if (add && !buybox?.querySelector('.v7-purchase-note')) {
      const note = document.createElement('div');
      note.className = 'v7-purchase-note';
      note.innerHTML = '<span>Elige talla antes de agregar.</span><span>Fit, técnica y entrega siguen sujetos a Product Ready.</span>';
      add.insertAdjacentElement('afterend', note);
    }

    page.querySelectorAll('.sizes .size').forEach(button => {
      if (button.dataset.v7Bound === 'true') return;
      button.dataset.v7Bound = 'true';
      button.addEventListener('click', () => setTimeout(() => setPdpCtaState(page), 0));
    });
    setPdpCtaState(page);
    addGalleryProgress(page);
  }

  function refineCart() {
    const drawer = document.getElementById('cartDrawer');
    const footer = drawer?.querySelector('.drawer-footer');
    if (!drawer || !footer || footer.querySelector('.v7-cart-continuation')) return;
    const continuation = document.createElement('div');
    continuation.className = 'v7-cart-continuation';
    continuation.innerHTML = '<span>Una compra primero. Sin cross-sell forzado.</span><button type="button">Seguir comprando</button>';
    continuation.querySelector('button').addEventListener('click', () => document.getElementById('cartClose')?.click());
    footer.appendChild(continuation);
  }

  function improveSizeGuideFocus() {
    document.querySelectorAll('.v6-size-guide-trigger').forEach(trigger => {
      if (trigger.dataset.v7FocusBound === 'true') return;
      trigger.dataset.v7FocusBound = 'true';
      trigger.addEventListener('click', () => {
        lastSizeGuideTrigger = trigger;
        setTimeout(() => document.querySelector('.v6-modal.is-open .v6-modal-close')?.focus(), 30);
      });
    });
    document.querySelectorAll('.v6-modal-close,[data-v6-size-backdrop="true"]').forEach(el => {
      if (el.dataset.v7RestoreBound === 'true') return;
      el.dataset.v7RestoreBound = 'true';
      el.addEventListener('click', () => setTimeout(() => lastSizeGuideTrigger?.focus(), 30));
    });
  }

  function enhance() {
    cleanHome();
    cleanCardsAndAssortment();
    enhancePdp();
    refineCart();
    improveSizeGuideFocus();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  const cart = document.getElementById('cartDrawer');
  if (cart) new MutationObserver(() => requestAnimationFrame(refineCart)).observe(cart,{childList:true,subtree:true});
  window.addEventListener('hashchange', () => setTimeout(enhance,0));
  setTimeout(enhance,0);
})();
