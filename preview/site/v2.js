(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const modules = {
    home: `
      <section class="v2-editorial">
        <div class="wrap">
          <div class="v2-poster" aria-hidden="true"></div>
          <div class="v2-editorial-copy">
            <p class="v2-kicker">Colección 01 · Alma Ríos</p>
            <h2>Una colección empieza mucho antes de la prenda.</h2>
            <p>Entre grietas parte de una observación sencilla: incluso en superficies duras aparecen formas de vida que encuentran por dónde pasar. La colección traduce esa tensión a escala, vacío, ubicación y ritmo sobre la camiseta.</p>
            <p class="muted">La intención no es llenar una prenda con una imagen, sino construir una pieza donde diseño y soporte se necesiten mutuamente.</p>
            <a class="button" href="#/coleccion/entre-grietas">Entrar a Entre grietas</a>
          </div>
        </div>
      </section>
      <section class="v2-proof">
        <div class="wrap">
          <div class="section-heading"><div><p class="v2-kicker">Qué sostiene una prenda MISCA</p><h2>La historia no sustituye al producto.</h2></div></div>
          <div class="v2-proof-grid">
            <article class="v2-proof-item"><strong>01</strong><h3>Producto</h3><p>Una pieza debe funcionar por tela, fit, impresión y acabado antes de pedir atención por su relato.</p></article>
            <article class="v2-proof-item"><strong>02</strong><h3>Procedencia</h3><p>Cuando una obra viene de Archivo Abierto mostramos fuente, institución, derechos y adaptación.</p></article>
            <article class="v2-proof-item"><strong>03</strong><h3>Escala pequeña</h3><p>Pocas colecciones, pocas prendas y suficiente espacio para que cada lanzamiento tenga contexto.</p></article>
          </div>
        </div>
      </section>
      <section class="v2-archive-strip">
        <div class="v2-archive-art" aria-hidden="true"></div>
        <div class="v2-archive-copy">
          <p class="v2-kicker">Archivo Abierto</p>
          <h2>No inventamos otra obra. Trabajamos desde la original.</h2>
          <p>Archivo Abierto convierte obras históricas de dominio público o acceso abierto en prendas a través de adaptación documentada: fuente institucional, derechos, recorte, escala, posición y continuidad.</p>
          <a class="button secondary" style="color:#eee;border-color:#eee" href="#/archivo">Explorar Archivo Abierto</a>
        </div>
      </section>`,
    product: `
      <section class="v2-chapter"><div class="wrap"><h2>Lo que todavía estamos validando.</h2><p>Esta vista enseña cómo debería sentirse la experiencia de compra. Las especificaciones físicas finales se publican solo cuando existan muestras, mediciones y pruebas reales.</p></div></section>
      <section class="v2-product-notes">
        <article class="v2-product-note"><small>Fit</small><strong>Por validar</strong><p>Medidas y caída se cerrarán con fitting sobre la prenda seleccionada.</p></article>
        <article class="v2-product-note"><small>Impresión</small><strong>Prueba comparativa</strong><p>La técnica final depende de fidelidad, tacto, lavado, color y costo sobre la pieza real.</p></article>
        <article class="v2-product-note"><small>Producto Ready</small><strong>Antes de publicar</strong><p>Wash test, COGS, fotos reales, inventario y promesa logística deben estar aprobados.</p></article>
      </section>`,
    archive: `
      <section class="v2-proof"><div class="wrap"><div class="section-heading"><div><p class="v2-kicker">Método</p><h2>Una obra histórica entra con expediente.</h2></div></div><div class="v2-proof-grid">
        <article class="v2-proof-item"><strong>01</strong><h3>Fuente</h3><p>Archivo institucional y ficha de objeto antes de diseñar la prenda.</p></article>
        <article class="v2-proof-item"><strong>02</strong><h3>Derechos</h3><p>Estado de derechos documentado; no usamos Google o Pinterest como fuente de producción.</p></article>
        <article class="v2-proof-item"><strong>03</strong><h3>Adaptación</h3><p>Recorte, escala, continuidad y ubicación se registran como decisiones de diseño.</p></article>
      </div></div></section>`,
    stories: `
      <section class="v2-editorial"><div class="wrap"><div class="v2-poster" aria-hidden="true"></div><div class="v2-editorial-copy"><p class="v2-kicker">Cuaderno del estudio</p><h2>Las historias también muestran decisiones.</h2><p>No queremos usar “contenido” como decoración alrededor de la tienda. Historias sirve para enseñar por qué una colección existe, cómo una obra cambia al pasar a una prenda y qué aprendemos al producirla.</p><p class="muted">Más adelante esta sección integrará pruebas físicas, notas de taller, conversaciones con artistas y documentación de lanzamientos.</p></div></div></section>`
  };

  function route() {
    return (location.hash || '#/').slice(1);
  }

  function addMobileRail() {
    if (document.querySelector('.v2-mobile-rail')) return;
    const header = document.getElementById('siteHeader');
    if (!header) return;
    header.insertAdjacentHTML('afterend', `<nav class="v2-mobile-rail" aria-label="Accesos rápidos"><a href="#/nuevo">Nuevo</a><a href="#/prendas">Prendas</a><a href="#/artistas">Artistas</a><a href="#/archivo">Archivo Abierto</a><a href="#/creadores">Creadores</a></nav>`);
  }

  function enhance() {
    const r = route();
    document.body.dataset.previewRoute = r;
    document.querySelectorAll('[data-v2-module]').forEach(el => el.remove());
    let html = '';
    if (r === '/' || r === '') html = modules.home;
    else if (r.startsWith('/producto/')) html = modules.product;
    else if (r === '/archivo' || r.startsWith('/archivo/')) html = modules.archive;
    else if (r === '/historias') html = modules.stories;
    if (html) app.insertAdjacentHTML('beforeend', `<div data-v2-module>${html}</div>`);
    addMobileRail();
  }

  const observer = new MutationObserver(() => {
    if (!app.querySelector('[data-v2-enhanced]')) {
      const marker = document.createElement('i');
      marker.hidden = true;
      marker.dataset.v2Enhanced = 'true';
      app.appendChild(marker);
      enhance();
    }
  });

  window.addEventListener('hashchange', () => setTimeout(enhance, 0));
  observer.observe(app, {childList:true});
  setTimeout(enhance, 0);
})();
