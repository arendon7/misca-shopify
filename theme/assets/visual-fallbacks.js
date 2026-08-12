(() => {
  const registry = window.MiscaVisualAssets || {};
  const frames = [
    ['front', 'Frente'],
    ['back', 'Espalda'],
    ['detail', 'Detalle'],
    ['context', 'Contexto'],
    ['artCrop', 'Obra / crop'],
  ];

  function hydrateProductGallery() {
    const root = document.querySelector('[data-product-root]');
    if (!root) return;
    const gallery = root.querySelector('.product-gallery');
    if (!gallery || !gallery.querySelector('.media-placeholder')) return;
    if (gallery.querySelector('img, video, model-viewer, iframe')) return;

    const assets = registry.products?.[root.dataset.productHandle];
    if (!assets) return;

    gallery.innerHTML = frames.map(([key, label], index) => {
      const src = assets[key];
      if (!src) return '';
      return `<figure class="product-gallery__item product-gallery__item--concept" data-concept-frame="${key}">
        <img src="${src}" alt="${label} conceptual de ${root.dataset.productTitle || ''}" ${index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}>
        <figcaption><span>Estudio conceptual</span><strong>${label}</strong></figcaption>
      </figure>`;
    }).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrateProductGallery, { once: true });
  else hydrateProductGallery();
})();
