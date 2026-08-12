(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1);
  const productData = {
    '/producto/raiz-de-concreto': { title:'Raíz de concreto', price:'$119.900', color:'Marfil', origin:'Artista de la Casa', state:'Precio hipótesis' },
    '/producto/ola-hokusai': { title:'Ola', price:'$139.900', color:'Navy', origin:'Archivo Abierto', state:'Precio hipótesis' }
  };

  function enhanceCards() {
    document.querySelectorAll('.product-card').forEach(card => {
      if (card.dataset.v6Enhanced === 'true') return;
      card.dataset.v6Enhanced = 'true';
      const anchor = card.querySelector('a[href*="#/producto/"]');
      const media = card.querySelector('.product-media');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (media) {
        const meta = document.createElement('div');
        meta.className = 'v6-card-meta';
        meta.innerHTML = '<span>Vista conceptual</span><span>Detalles en PDP</span>';
        media.appendChild(meta);
      }
      const actions = document.createElement('div');
      actions.className = 'v6-card-actions';
      actions.innerHTML = `<a class="v6-card-link" href="${href}">Ver producto</a><a class="v6-card-size" href="${href}">Elegir talla</a>`;
      card.appendChild(actions);
    });
  }

  function ensureSizeGuide() {
    if (document.querySelector('.v6-modal')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'v6-modal-backdrop';
    backdrop.dataset.v6SizeBackdrop = 'true';
    const modal = document.createElement('section');
    modal.className = 'v6-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-labelledby','v6-size-title');
    modal.innerHTML = `
      <div class="v6-modal-head"><div><p class="eyebrow">Talla y fit</p><h2 id="v6-size-title">Guía en validación.</h2></div><button class="v6-modal-close" type="button">Cerrar</button></div>
      <p>Las tallas disponibles para la prueba comercial son S, M, L y XL. Las medidas finales de pecho, largo, hombro y encogimiento se publicarán únicamente después del fit test y wash test sobre la prenda aprobada.</p>
      <div class="v6-size-grid"><div><strong>S</strong><span>medidas pendientes</span></div><div><strong>M</strong><span>medidas pendientes</span></div><div><strong>L</strong><span>medidas pendientes</span></div><div><strong>XL</strong><span>medidas pendientes</span></div></div>
      <p><strong>Regla de compra:</strong> la preview nunca preselecciona una talla. Debes elegirla de forma explícita antes de agregar a la bolsa.</p>`;
    document.body.append(backdrop, modal);
    const close = () => { backdrop.classList.remove('is-open'); modal.classList.remove('is-open'); document.body.style.overflow=''; };
    backdrop.addEventListener('click',close);
    modal.querySelector('.v6-modal-close').addEventListener('click',close);
    document.addEventListener('keydown',e => { if (e.key === 'Escape') close(); });
  }

  function openSizeGuide() {
    ensureSizeGuide();
    document.querySelector('.v6-modal-backdrop')?.classList.add('is-open');
    document.querySelector('.v6-modal')?.classList.add('is-open');
    document.body.style.overflow='hidden';
  }

  function selectedSize() {
    return document.querySelector('.sizes .size.is-v6-selected')?.dataset.size || document.querySelector('.sizes .size[aria-pressed="true"]')?.dataset.size || '';
  }

  function syncSticky() {
    const bar = document.querySelector('.v6-mobile-buybar');
    if (!bar) return;
    const size = selectedSize();
    const button = bar.querySelector('button');
    const sub = bar.querySelector('.v6-mobile-buybar-sub');
    if (size) {
      button.textContent = `Agregar · ${size}`;
      button.classList.add('is-ready');
      sub.textContent = `Talla ${size} seleccionada`;
    } else {
      button.textContent = 'Elegir talla';
      button.classList.remove('is-ready');
      sub.textContent = 'Selecciona una talla';
    }
  }

  function enhancePdp() {
    const data = productData[route()];
    const page = document.querySelector('.product-page');
    if (!data || !page) {
      document.querySelector('.v6-mobile-buybar')?.remove();
      return;
    }

    const gallery = page.querySelector('.product-gallery');
    if (gallery && gallery.dataset.v6Enhanced !== 'true') {
      gallery.dataset.v6Enhanced = 'true';
      const labels = ['Frente','Arte / composición','Idea / detalle','Vista alternativa'];
      gallery.querySelectorAll('.gallery-cell').forEach((cell,i) => {
        const label = document.createElement('span');
        label.className='v6-gallery-label';
        label.textContent=labels[i] || `Vista ${i+1}`;
        const index = document.createElement('span');
        index.className='v6-gallery-index';
        index.textContent=String(i+1).padStart(2,'0');
        cell.append(label,index);
      });
      const summary = document.createElement('div');
      summary.className='v6-gallery-summary';
      summary.innerHTML='<span>Galería de desarrollo</span><span>Fotografía real reemplazará estas vistas después de Product Ready</span>';
      gallery.insertAdjacentElement('afterend',summary);
    }

    const buybox = page.querySelector('.buybox');
    if (buybox && buybox.dataset.v6Enhanced !== 'true') {
      buybox.dataset.v6Enhanced='true';
      const price = buybox.querySelector('.price');
      if (price) {
        const meta = document.createElement('div');
        meta.className='v6-pdp-meta';
        meta.innerHTML=`<div><small>Color</small><strong>${data.color}</strong></div><div><small>Origen</small><strong>${data.origin}</strong></div><div><small>Estado</small><strong>${data.state}</strong></div>`;
        price.insertAdjacentElement('afterend',meta);
      }
      const variantTitle = buybox.querySelector('.variant-title');
      if (variantTitle) {
        const last = variantTitle.lastElementChild;
        if (last) {
          const button=document.createElement('button');
          button.type='button';
          button.className='v6-size-guide-trigger';
          button.textContent='Guía de tallas';
          button.addEventListener('click',openSizeGuide);
          last.replaceWith(button);
        }
      }
      const add = buybox.querySelector('.add-cart');
      if (add) {
        const assurance=document.createElement('div');
        assurance.className='v6-buy-assurance';
        assurance.innerHTML='<div><strong>Talla requerida</strong><span>Sin selección explícita no se agrega.</span></div><div><strong>Producto en validación</strong><span>Fit y técnica aún requieren muestra física.</span></div><div><strong>Checkout separado</strong><span>La compra real se probará en Shopify Preview.</span></div>';
        add.insertAdjacentElement('afterend',assurance);
      }
    }

    page.querySelectorAll('.sizes .size').forEach(btn => {
      if (btn.dataset.v6Bound === 'true') return;
      btn.dataset.v6Bound='true';
      btn.setAttribute('aria-pressed','false');
      btn.addEventListener('click',() => {
        page.querySelectorAll('.sizes .size').forEach(other => { other.classList.remove('is-v6-selected'); other.setAttribute('aria-pressed','false'); });
        btn.classList.add('is-v6-selected');
        btn.setAttribute('aria-pressed','true');
        setTimeout(syncSticky,0);
      });
    });

    if (!document.querySelector('.v6-mobile-buybar')) {
      const bar=document.createElement('div');
      bar.className='v6-mobile-buybar';
      bar.innerHTML=`<div class="v6-mobile-buybar-info"><div class="v6-mobile-buybar-title">${data.title} · ${data.price}</div><div class="v6-mobile-buybar-sub">Selecciona una talla</div></div><button type="button">Elegir talla</button>`;
      bar.querySelector('button').addEventListener('click',() => {
        const size=selectedSize();
        if (!size) {
          page.querySelector('.sizes')?.scrollIntoView({behavior:'smooth',block:'center'});
          return;
        }
        page.querySelector('.add-cart')?.click();
      });
      document.body.appendChild(bar);
    }
    syncSticky();
  }

  function enhanceCart() {
    const drawer=document.getElementById('cartDrawer');
    if (!drawer) return;
    if (!drawer.querySelector('.v6-cart-intro')) {
      const items=document.getElementById('cartItems');
      const intro=document.createElement('p');
      intro.className='v6-cart-intro';
      intro.textContent='Revisa prenda, talla y cantidad antes de continuar. En esta preview el checkout permanece deshabilitado.';
      items?.insertAdjacentElement('beforebegin',intro);
    }
    const footer=drawer.querySelector('.drawer-footer');
    if (footer && !footer.querySelector('.v6-cart-foot')) {
      const info=document.createElement('div');
      info.className='v6-cart-foot';
      info.innerHTML='<div><strong>Sin venta forzada</strong>La bolsa no añade productos extra ni interrumpe el checkout.</div><div><strong>Inventario real después</strong>ATP vendrá de Shopify cuando exista producto aprobado.</div>';
      footer.appendChild(info);
    }
  }

  function enhance() {
    enhanceCards();
    enhancePdp();
    enhanceCart();
  }

  const observer=new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  document.getElementById('cartDrawer') && new MutationObserver(() => requestAnimationFrame(enhanceCart)).observe(document.getElementById('cartDrawer'),{childList:true,subtree:true});
  window.addEventListener('hashchange',() => setTimeout(enhance,0));
  setTimeout(enhance,0);
})();
