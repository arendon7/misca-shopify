(() => {
  const formatMoney = (cents) => {
    try {
      return new Intl.NumberFormat(document.documentElement.lang || 'es-CO', {
        style: 'currency', currency: 'COP', maximumFractionDigits: 0
      }).format(cents / 100);
    } catch (_) {
      return `${Math.round(cents / 100).toLocaleString('es-CO')} COP`;
    }
  };

  const getProductState = (root) => {
    const variantsScript = root.querySelector('[data-product-json]');
    const idInput = root.querySelector('[data-variant-id]');
    if (!variantsScript || !idInput) return null;
    const variants = JSON.parse(variantsScript.textContent);
    const selectedInputs = [...root.querySelectorAll('[data-option-value]:checked')];
    const optionCount = root.querySelectorAll('.variant-fieldset').length;
    if (optionCount && selectedInputs.length !== optionCount) return { variant: null, idInput };
    const selected = selectedInputs.map((radio) => radio.value);
    const variant = variants.find((item) => item.options.length === selected.length && item.options.every((option, index) => option === selected[index]));
    return { variant, idInput };
  };

  const updateProductUI = (root, variant) => {
    const idInput = root.querySelector('[data-variant-id]');
    const price = root.querySelector('[data-product-price]');
    const mobilePrice = root.querySelector('[data-mobile-price]');
    const addButton = root.querySelector('[data-add-to-cart]');
    const mobileButton = root.querySelector('[data-mobile-add]');
    const status = root.querySelector('[data-product-status]');
    if (!variant) {
      if (idInput) idInput.value = '';
      if (addButton) { addButton.disabled = false; addButton.textContent = 'Elegir talla'; }
      if (mobileButton) { mobileButton.disabled = false; mobileButton.textContent = 'Elegir talla'; }
      if (status) status.textContent = '';
      return;
    }
    if (idInput) idInput.value = variant.id;
    const formatted = formatMoney(variant.price);
    if (price) price.textContent = formatted;
    if (mobilePrice) mobilePrice.textContent = formatted;
    if (addButton) { addButton.disabled = !variant.available; addButton.textContent = variant.available ? 'Agregar a la bolsa' : 'Agotado'; }
    if (mobileButton) { mobileButton.disabled = !variant.available; mobileButton.textContent = variant.available ? 'Agregar' : 'Agotado'; }
    if (status) status.textContent = variant.available ? '' : 'Esta talla no está disponible.';
    const url = new URL(window.location.href); url.searchParams.set('variant', variant.id); window.history.replaceState({}, '', url);
    document.dispatchEvent(new CustomEvent('misca:variant-change', { detail: { productUrl: root.dataset.productUrl, variant } }));
    const selectedSize = [...root.querySelectorAll('[data-option-value]:checked')].map((radio) => radio.value).join(' / ');
    document.dispatchEvent(new CustomEvent('misca:variant-selected', { detail: {
      productHandle: root.dataset.productHandle || '', productTitle: root.dataset.productTitle || '', variantId: String(variant.id || ''), variantTitle: variant.title || selectedSize, selectedOptions: variant.options || [], available: Boolean(variant.available),
    }}));
  };

  document.addEventListener('change', (event) => {
    const input = event.target.closest('[data-option-value]'); if (!input) return;
    const root = input.closest('[data-product-root]'); if (!root) return;
    const state = getProductState(root); if (!state) return; updateProductUI(root, state.variant);
  });

  document.addEventListener('click', (event) => {
    const sizeOpen = event.target.closest('[data-size-guide-open]');
    if (sizeOpen) { const dialog = sizeOpen.closest('[data-product-root]')?.querySelector('[data-size-guide]'); if (dialog?.showModal) dialog.showModal(); }
    const sizeClose = event.target.closest('[data-size-guide-close]'); if (sizeClose) sizeClose.closest('dialog')?.close();
    const mobileAdd = event.target.closest('[data-mobile-add]');
    if (mobileAdd) {
      const root = mobileAdd.closest('[data-product-root]'); if (!root) return;
      const idInput = root.querySelector('[data-variant-id]'); const form = root.querySelector('[data-product-form]');
      if (!idInput?.value) {
        const firstOption = root.querySelector('.variant-fieldset'); firstOption?.scrollIntoView({ behavior: 'smooth', block: 'center' }); firstOption?.querySelector('input:not(:disabled)')?.focus({ preventScroll: true }); return;
      }
      form?.requestSubmit();
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-product-form]'); if (!form) return;
    const idInput = form.querySelector('[data-variant-id]');
    if (!idInput?.value) {
      event.preventDefault(); const root = form.closest('[data-product-root]'); const status = root?.querySelector('[data-product-status]');
      if (status) status.textContent = 'Elige una talla antes de agregar.';
      const firstOption = root?.querySelector('.variant-fieldset'); firstOption?.scrollIntoView({ behavior: 'smooth', block: 'center' }); firstOption?.querySelector('input:not(:disabled)')?.focus({ preventScroll: true });
    }
  }, true);
})();
