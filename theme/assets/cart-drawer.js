(() => {
  let previouslyFocused = null;
  const drawer = () => document.querySelector('[data-cart-drawer]');

  function formatMoney(cents) {
    return new Intl.NumberFormat(document.documentElement.lang || 'es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(cents / 100);
  }

  function setStatus(message) {
    const el = document.querySelector('[data-cart-status]');
    if (el) el.textContent = message || '';
  }

  function commerceLocked() {
    return drawer()?.dataset.cartCommerceReady === 'false';
  }

  function openCart() {
    const el = drawer();
    if (!el) return;
    previouslyFocused = document.activeElement;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    el.querySelector('[data-cart-close]')?.focus();
  }

  function closeCart() {
    const el = drawer();
    if (!el) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
    previouslyFocused?.focus?.();
  }

  function renderCart(cart) {
    document.querySelectorAll('[data-cart-count]').forEach((el) => el.textContent = cart.item_count);
    document.querySelectorAll('[data-cart-total]').forEach((el) => el.textContent = formatMoney(cart.total_price));
    document.querySelectorAll('[data-cart-checkout]').forEach((el) => el.disabled = cart.item_count === 0 || commerceLocked());

    const list = document.querySelector('[data-cart-items]');
    if (!list) return;

    if (!cart.items.length) {
      list.innerHTML = '<p class="muted">Tu bolsa está vacía.</p>';
      return;
    }

    list.innerHTML = cart.items.map((item) => `
      <div class="cart-line" data-cart-line data-line-key="${item.key}">
        <a href="${item.url}" class="cart-line__image">
          ${item.image ? `<img src="${item.image}" alt="" loading="lazy">` : ''}
        </a>
        <div>
          <a href="${item.url}"><strong>${item.product_title}</strong></a>
          <p class="muted">${item.variant_title || ''}</p>
          <div class="cart-quantity" aria-label="Cantidad de ${item.product_title}">
            <button type="button" data-cart-quantity="${item.key}" data-quantity="${Math.max(0, item.quantity - 1)}" aria-label="Reducir cantidad">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-quantity="${item.key}" data-quantity="${item.quantity + 1}" aria-label="Aumentar cantidad">+</button>
          </div>
          <button type="button" class="text-button" data-cart-remove="${item.key}">Eliminar</button>
        </div>
        <span>${formatMoney(item.final_line_price)}</span>
      </div>
    `).join('');
  }

  async function getCart() {
    const response = await fetch(`${window.Shopify.routes.root}cart.js`, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('No pudimos leer la bolsa.');
    return response.json();
  }

  async function changeLine(id, quantity) {
    const response = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
      method: 'POST',
      headers: {'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({ id, quantity })
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.description || 'No pudimos actualizar la bolsa.');
    return body;
  }

  document.addEventListener('keydown', (event) => {
    const el = drawer();
    if (!el?.classList.contains('is-open')) return;
    if (event.key === 'Escape') { closeCart(); return; }
    if (event.key === 'Tab') {
      const focusable = [...el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((node) => node.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener('click', async (event) => {
    if (event.target.closest('[data-cart-open]')) {
      event.preventDefault();
      try { setStatus(''); renderCart(await getCart()); openCart(); } catch (error) { setStatus(error.message); }
      return;
    }
    if (event.target.closest('[data-cart-close]')) { event.preventDefault(); closeCart(); return; }
    const remove = event.target.closest('[data-cart-remove]');
    if (remove) {
      event.preventDefault();
      try { setStatus('Actualizando…'); renderCart(await changeLine(remove.dataset.cartRemove, 0)); setStatus('Producto eliminado.'); } catch (error) { setStatus(error.message); }
      return;
    }
    const quantity = event.target.closest('[data-cart-quantity]');
    if (quantity) {
      event.preventDefault();
      try { setStatus('Actualizando…'); renderCart(await changeLine(quantity.dataset.cartQuantity, Number(quantity.dataset.quantity))); setStatus('Bolsa actualizada.'); } catch (error) { setStatus(error.message); }
    }
  });

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-product-form]');
    if (!form) return;
    const root = form.closest('[data-product-root]');
    if (root?.dataset.commerceReady !== 'true') {
      event.preventDefault();
      const status = root?.querySelector('[data-product-status]');
      if (status) status.textContent = 'Esta pieza todavía no está habilitada para compra.';
      return;
    }
    const idInput = form.querySelector('[data-variant-id]');
    if (!idInput?.value) return;
    event.preventDefault();
    const button = form.querySelector('[data-add-to-cart]');
    if (button?.disabled) return;
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Agregando…';
    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.description || 'No pudimos agregar este producto.');
      setStatus(''); renderCart(await getCart()); openCart();
      document.dispatchEvent(new CustomEvent('misca:add-to-cart', { detail: { variantId: idInput.value, productHandle: root?.dataset.productHandle || '' } }));
    } catch (error) {
      const status = root?.querySelector('[data-product-status]');
      if (status) status.textContent = error.message;
    } finally {
      button.disabled = false;
      button.textContent = originalText === 'Elegir talla' ? 'Agregar a la bolsa' : originalText;
    }
  });
})();
