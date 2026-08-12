(() => {
  const registry = window.MiscaVisualAssets || {};
  const frames = [
    ['front', 'Frente'],
    ['back', 'Espalda'],
    ['detail', 'Detalle'],
    ['context', 'Contexto'],
    ['artCrop', 'Obra / crop'],
  ];

  function buildFrame(src, key, label, productTitle, index) {
    const figure = document.createElement('figure');
    figure.className = 'product-gallery__item product-gallery__item--concept';
    figure.dataset.conceptFrame = key;

    const image = document.createElement('img');
    image.src = src;
    image.alt = `${label} conceptual de ${productTitle}`;
    image.loading = index === 0 ? 'eager' : 'lazy';
    if (index === 0) image.fetchPriority = 'high';

    const caption = document.createElement('figcaption');
    const status = document.createElement('span');
    status.textContent = 'Estudio conceptual';
    const title = document.createElement('strong');
    title.textContent = label;
    caption.append(status, title);
    figure.append(image, caption);
    return figure;
  }

  function hydrateProductGallery() {
    const root = document.querySelector('[data-product-root]');
    if (!root) return;
    const gallery = root.querySelector('.product-gallery');
    if (!gallery || !gallery.querySelector('.media-placeholder')) return;
    if (gallery.querySelector('img, video, model-viewer, iframe')) return;

    const assets = registry.products?.[root.dataset.productHandle];
    if (!assets) return;

    const fragment = document.createDocumentFragment();
    frames.forEach(([key, label], index) => {
      const src = assets[key];
      if (src) fragment.append(buildFrame(src, key, label, root.dataset.productTitle || '', index));
    });
    if (!fragment.childNodes.length) return;
    gallery.replaceChildren(fragment);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrateProductGallery, { once: true });
  else hydrateProductGallery();
})();
