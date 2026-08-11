(() => {
  const publishedViews = new WeakSet();

  function publish(name, data = {}) {
    try {
      if (!window.Shopify?.analytics?.publish) return;
      const safeData = JSON.parse(JSON.stringify(data));
      Promise.resolve(window.Shopify.analytics.publish(`misca:${name}`, safeData)).catch(() => {});
    } catch (_) {
      // Analytics must never block commerce or throw into the storefront.
    }
  }

  window.MiscaAnalytics = Object.freeze({ publish });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-analytics-product-card]');
    if (card) {
      publish('product_card_selected', {
        productHandle: card.dataset.productHandle || '',
        productTitle: card.dataset.productTitle || '',
        artistHandle: card.dataset.artistHandle || '',
        collectionHandle: card.dataset.collectionHandle || '',
        surface: card.dataset.surface || '',
      });
    }

    if (event.target.closest('[data-size-guide-open]')) {
      const root = event.target.closest('[data-product-root]');
      publish('size_guide_opened', { productHandle: root?.dataset.productHandle || '' });
    }

    if (event.target.closest('[data-cart-open]')) publish('cart_drawer_opened', {});

    const mobileAdd = event.target.closest('[data-mobile-add]');
    if (mobileAdd && mobileAdd.textContent.trim() === 'Elegir talla') {
      const root = mobileAdd.closest('[data-product-root]');
      publish('size_required_prompted', { productHandle: root?.dataset.productHandle || '', surface: 'mobile_buybar' });
    }
  });

  document.addEventListener('misca:variant-selected', (event) => publish('size_selected', event.detail || {}));

  const viewTargets = document.querySelectorAll('[data-misca-view-event]');
  if ('IntersectionObserver' in window && viewTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || publishedViews.has(entry.target)) return;
        publishedViews.add(entry.target);
        const el = entry.target;
        publish(el.dataset.miscaViewEvent, {
          handle: el.dataset.handle || '', title: el.dataset.title || '', productHandle: el.dataset.productHandle || '', artistHandle: el.dataset.artistHandle || '', artworkHandle: el.dataset.artworkHandle || '',
        });
      });
    }, { threshold: 0.35 });
    viewTargets.forEach((el) => observer.observe(el));
  }
})();
