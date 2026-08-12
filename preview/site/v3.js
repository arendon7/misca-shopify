(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1);

  const modules = {
    home: `
      <section class="v3-section"><div class="wrap">
        <div class="v3-head"><div><p class="v3-kicker">Curaduría actual</p><h2>Dos prendas. Dos formas de entrar.</h2></div><p>La tienda empieza pequeña para que producto, relato y operación puedan sostenerse. Raíz explora un universo original de la casa; Ola prueba cómo una obra histórica puede convertirse en prenda sin perder su procedencia.</p></div>
        <div class="v3-duo"><div class="v3-visual root" aria-hidden="true"></div><div class="v3-duo-copy"><p class="v3-kicker">Alma Ríos · Entre grietas</p><h2>Raíz de concreto.</h2><p>Una pieza sobre aquello que encuentra por dónde crecer. La gráfica nace desde el borde y busca trabajar con la camiseta, no encima de ella.</p><a class="button" href="#/producto/raiz-de-concreto">Ver Raíz</a></div></div>
        <div class="v3-duo"><div class="v3-duo-copy"><p class="v3-kicker">Archivo Abierto · Hokusai</p><h2>Ola.</h2><p>Una adaptación de <em>Under the Wave off Kanagawa</em> construida desde la fuente institucional, el dominio público y decisiones de posición, continuidad y escala.</p><a class="button" href="#/producto/ola-hokusai">Ver Ola</a></div><div class="v3-visual wave" aria-hidden="true"></div></div>
      </div></section>
      <section class="v3-section dark"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Cómo compramos nosotros mismos la idea</p><h2>Una marca que se puede recorrer.</h2></div><p>Prenda, artista, obra y contexto deben estar conectados, pero el comprador siempre debe poder volver al producto sin perderse en el relato.</p></div><div class="v3-chapters"><article class="v3-chapter"><span>01 · Descubrir</span><h3>La prenda llama primero.</h3><p>Imagen, nombre, precio y silueta deben ser suficientes para generar interés antes de abrir una historia.</p></article><article class="v3-chapter"><span>02 · Entender</span><h3>El universo explica.</h3><p>Artista, colección y procedencia agregan significado sin bloquear talla, compra o confianza.</p></article><article class="v3-chapter"><span>03 · Volver</span><h3>La tienda permanece.</h3><p>Cada universo cambia, pero navegación, compra y estándares de producto se mantienen reconocibles.</p></article></div></div></section>`,
    product: `
      <div class="v3-product-trust"><div><strong>Selección explícita</strong><span>La talla no se asume en esta experiencia.</span></div><div><strong>Información física</strong><span>Solo se publica cuando exista evidencia Product Ready.</span></div><div><strong>Compra real</strong><span>El checkout queda reservado para Shopify Preview.</span></div></div>
      <section class="v3-section"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Antes de convertirla en inventario</p><h2>La pieza tiene que sostener la idea.</h2></div><p>La web puede avanzar antes que la muestra física, pero no puede inventar especificaciones. Por eso fit, composición, gramaje, técnica, cuidados y fotos definitivas siguen separados del relato creativo.</p></div><div class="v3-ledger"><div><small>01 · Blank</small><strong>Prenda base</strong><p>Elegir por tacto, estructura, medidas y consistencia real.</p></div><div><small>02 · Print</small><strong>Técnica</strong><p>Comparar fidelidad, tacto, detalle y lavado sobre el blank ganador.</p></div><div><small>03 · Wear</small><strong>Fit + wash</strong><p>Medir caída, encogimiento y comportamiento después de uso/lavado.</p></div><div><small>04 · Sell</small><strong>COGS + fotos</strong><p>Solo entonces cerrar precio, claims, media e inventario.</p></div></div></div></section>`,
    artists: `
      <section class="v3-section dark"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Sistema creativo</p><h2>No todos los nombres significan lo mismo.</h2></div><p>MISCA separa universos originales desarrollados por el estudio de artistas históricos de Archivo Abierto. Esa diferencia debe ser visible y comprensible.</p></div><div class="v3-chapters"><article class="v3-chapter"><span>Artistas de la Casa</span><h3>Universos originales.</h3><p>Identidades creativas desarrolladas por el estudio con transparencia explícita y sin biografías inventadas.</p></article><article class="v3-chapter"><span>Archivo Abierto</span><h3>Autores históricos.</h3><p>Obras con procedencia, derechos y fuente institucional documentados.</p></article><article class="v3-chapter"><span>Artistas externos</span><h3>Más adelante.</h3><p>Se incorporan después de validar operación, ventas y liquidación del modelo propio.</p></article></div></div></section>`,
    artist: `
      <section class="v3-section"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Capítulos del universo</p><h2>Una voz no se reduce a una camiseta.</h2></div><p>La página del artista funciona como un sistema editorial: una idea visual, una colección, decisiones de adaptación y, cuando existe, una prenda lista para comprar.</p></div><div class="v3-grid-3"><article class="v3-card"><small>01 · Lenguaje</small><div><h3>Qué reconoce la mirada.</h3><p>Formas, ritmo, vacío, color y temas recurrentes que vuelven reconocible el universo.</p></div></article><article class="v3-card"><small>02 · Colección</small><div><h3>Una idea concreta.</h3><p>Cada lanzamiento toma una parte del universo y la convierte en una colección pequeña con nombre y lógica propia.</p></div></article><article class="v3-card"><small>03 · Producto</small><div><h3>Solo cuando funciona.</h3><p>La historia no autoriza una prenda: muestra física, técnica, costo y calidad siguen siendo el gate.</p></div></article></div></div></section>`,
    collections: `
      <section class="v3-section"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Mapa de colecciones</p><h2>Activo, desarrollo y archivo.</h2></div><p>Esta preview distingue lo que ya tiene una hipótesis de producto visible de los universos que todavía están en desarrollo. No todo lo que imaginamos debe parecer disponible.</p></div><div class="v3-ledger"><div><small>Entre grietas</small><strong>Alma Ríos</strong><div class="v3-collection-status"><span class="v3-status active">Visible</span><span class="v3-status">Raíz</span></div></div><div><small>La fuerza del agua</small><strong>Hokusai</strong><div class="v3-collection-status"><span class="v3-status active">Visible</span><span class="v3-status">Ola</span></div></div><div><small>Animales del ruido</small><strong>Simón Bestiario</strong><div class="v3-collection-status"><span class="v3-status">Desarrollo</span></div></div><div><small>Naturaleza repetida</small><strong>William Morris</strong><div class="v3-collection-status"><span class="v3-status">Desarrollo</span></div></div></div></div></section>`,
    archive: `
      <section class="v3-section"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Archivo Abierto</p><h2>Un archivo para diseñar, no para decorar.</h2></div><p>La obra histórica entra con fuente, derechos, expediente y una lógica de adaptación. La producción final debe partir del archivo institucional exacto, no de una imagen generada o encontrada al azar.</p></div><div class="v3-archive-index"><article class="v3-archive-card"><div class="v3-meta"><span class="v3-tag">The Met</span><span class="v3-tag">Public Domain</span></div><div><h3>Hokusai</h3><p>La fuerza del agua · Under the Wave off Kanagawa · JP1847. Es la primera prueba completa del método Archivo Abierto.</p></div></article><article class="v3-archive-card"><div class="v3-meta"><span class="v3-tag">Dominio público</span><span class="v3-tag">En desarrollo</span></div><div><h3>William Morris</h3><p>Naturaleza repetida. Motivos vegetales y repetición tratados como sistema de superficie, no como simple rectángulo frontal.</p></div></article><article class="v3-archive-card"><div class="v3-meta"><span class="v3-tag">The Met</span><span class="v3-tag">Public Domain</span></div><div><h3>Van Gogh</h3><p>El paisaje se mueve. Cipreses, campos y pinceladas como posibles estructuras de continuidad alrededor de la prenda.</p></div></article><article class="v3-archive-card"><div class="v3-meta"><span class="v3-tag">NGA / AIC</span><span class="v3-tag">PD / CC0</span></div><div><h3>Monet</h3><p>Jardines de luz. Agua, puente y vegetación pensados desde recorte, espacio negativo y escala.</p></div></article></div></div></section>`,
    stories: `
      <section class="v3-section"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Historias</p><h2>El cuaderno donde la marca enseña decisiones.</h2></div><p>Historias no es un blog genérico. Debe conectar directamente con producto, artista, obra, producción y aprendizaje operativo.</p></div><div class="v3-story-list"><article class="v3-story-row"><div class="num">01</div><h3>Una imagen no basta.</h3><p>Qué cambia cuando una ilustración deja de ser archivo plano y empieza a responder al cuerpo, costuras, caída y escala de una camiseta.</p></article><article class="v3-story-row"><div class="num">02</div><h3>Cómo entra Hokusai.</h3><p>Fuente institucional, derechos, adaptación y el límite explícito entre trabajar una obra histórica y fabricar una nueva “en su estilo”.</p></article><article class="v3-story-row"><div class="num">03</div><h3>Qué significa Product Ready.</h3><p>Por qué no publicamos gramaje, fit, técnica, cuidados o fotos definitivas antes de tener muestra, mediciones y pruebas reales.</p></article><article class="v3-story-row"><div class="num">04</div><h3>Del estudio al taller.</h3><p>La futura capa documental: pruebas de impresión, wash tests, errores, decisiones de costo y aprendizajes de producción local.</p></article></div></div></section>`,
    creators: `
      <section class="v3-section dark"><div class="wrap"><div class="v3-head"><div><p class="v3-kicker">Para creadores</p><h2>Tú construyes la obra. Nosotros sostenemos la operación.</h2></div><p>El modelo se mantiene simple hasta validarlo: colección curada, producción local, Shopify, pagos, empaque y envío. Nada de software propio antes de demostrar demanda.</p></div><div class="v3-creator-flow"><article><small>01</small><h3>Diseño</h3><p>El creador aporta obra, universo y participación promocional.</p></article><article><small>02</small><h3>Producto</h3><p>MISCA adapta, prueba, produce y controla calidad con proveedores locales.</p></article><article><small>03</small><h3>Comercio</h3><p>La plataforma vende, cobra y mantiene la experiencia de tienda.</p></article><article><small>04</small><h3>Liquidación</h3><p>La comisión se calcula sobre una base contractual clara y se liquida con evidencia.</p></article></div></div></section>`
  };

  function keyForRoute(r) {
    if (r === '/' || r === '') return 'home';
    if (r === '/artistas') return 'artists';
    if (r.startsWith('/artista/')) return 'artist';
    if (r === '/colecciones' || r.startsWith('/coleccion/')) return 'collections';
    if (r === '/archivo' || r.startsWith('/archivo/')) return 'archive';
    if (r === '/historias') return 'stories';
    if (r === '/creadores') return 'creators';
    if (r.startsWith('/producto/')) return 'product';
    return '';
  }

  function updateNav(r) {
    const matchers = [
      ['#/nuevo', r === '/nuevo'],['#/artistas', r === '/artistas' || r.startsWith('/artista/')],
      ['#/colecciones', r === '/colecciones' || r.startsWith('/coleccion/')],['#/prendas', r === '/prendas' || r.startsWith('/producto/')],
      ['#/historias', r === '/historias'],['#/creadores', r === '/creadores'],['#/archivo', r === '/archivo' || r.startsWith('/archivo/')]
    ];
    document.querySelectorAll('.desktop-nav a,.v2-mobile-rail a').forEach(a => a.removeAttribute('aria-current'));
    matchers.forEach(([href,active]) => { if (active) document.querySelectorAll(`a[href="${href}"]`).forEach(a => a.setAttribute('aria-current','page')); });
  }

  function routeLabel(r) {
    const labels = {
      '/':'Home editorial','/nuevo':'Nuevo','/prendas':'Prendas','/artistas':'Artistas','/colecciones':'Colecciones','/historias':'Historias','/creadores':'Para creadores','/archivo':'Archivo Abierto'
    };
    if (r.startsWith('/producto/')) return 'Producto';
    if (r.startsWith('/artista/')) return 'Universo de artista';
    if (r.startsWith('/coleccion/')) return 'Colección';
    return labels[r] || 'MISCA';
  }

  function mobileShop() {
    let rail = document.querySelector('.v3-mobile-shop');
    if (!rail) {
      rail = document.createElement('nav');
      rail.className = 'v3-mobile-shop';
      rail.setAttribute('aria-label','Acciones de tienda');
      rail.innerHTML = '<a href="#/prendas">Prendas</a><button type="button" data-v3-search>Buscar</button><button type="button" data-v3-cart>Bolsa</button>';
      document.body.appendChild(rail);
      rail.querySelector('[data-v3-search]').addEventListener('click', () => document.getElementById('searchButton')?.click());
      rail.querySelector('[data-v3-cart]').addEventListener('click', () => document.getElementById('cartButton')?.click());
    }
  }

  function enhance() {
    const r = route();
    if (app.dataset.v3Route === r && app.querySelector('[data-v3-module]')) return;
    app.dataset.v3Route = r;
    app.querySelectorAll('[data-v3-module]').forEach(el => el.remove());
    document.querySelector('.v3-route-note')?.remove();

    const key = keyForRoute(r);
    const html = modules[key];
    if (html) app.insertAdjacentHTML('beforeend', `<div data-v3-module>${html}</div>`);

    const note = document.createElement('div');
    note.className = 'v3-route-note';
    note.innerHTML = `<span>${routeLabel(r)}</span><span>Vista de desarrollo · contenido y claims físicos sujetos a validación</span>`;
    const header = document.getElementById('siteHeader');
    if (header) header.insertAdjacentElement('afterend', note);

    updateNav(r);
    mobileShop();
  }

  const observer = new MutationObserver(() => {
    const r = route();
    if (app.dataset.v3Route !== r || !app.querySelector('[data-v3-module]') && keyForRoute(r)) setTimeout(enhance,0);
  });
  observer.observe(app,{childList:true});
  window.addEventListener('hashchange',() => setTimeout(enhance,0));
  setTimeout(enhance,0);
})();
