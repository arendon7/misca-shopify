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

  window.addEventListener('hashchange', () => setTimeout(applyPreviewFixes, 0));
  setTimeout(applyPreviewFixes, 0);
})();
