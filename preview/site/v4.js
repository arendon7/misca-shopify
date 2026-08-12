(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const HOKUSAI_IMAGE = 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/45434/134438/main-image';
  const HOKUSAI_PAGE = 'https://www.metmuseum.org/art/collection/search/45434';
  const route = () => (location.hash || '#/').slice(1);

  const campaignHome = `
    <section class="v4-section">
      <div class="v4-wrap">
        <div class="v4-head">
          <div><p class="v4-kicker">Dirección visual / estudios</p><h2>Antes de fotografiar, definimos qué imagen necesita la colección.</h2></div>
          <p>Estas piezas son estudios de campaña y adaptación. Sirven para evaluar escala, paleta, encuadre y continuidad de marca mientras las fotografías reales siguen bloqueadas por Product Ready.</p>
        </div>
        <div class="v4-campaign-grid">
          <article class="v4-campaign"><img src="./assets/raiz-campaign-study.svg" alt="Estudio visual conceptual de Raíz de concreto" loading="lazy"><div class="v4-caption"><div><strong>Raíz de concreto</strong><div class="v4-chip">Estudio conceptual</div></div><span>Marfil · negro · musgo<br>Alma Ríos / Entre grietas</span></div></article>
          <article class="v4-campaign"><img src="./assets/ola-garment-study.svg" alt="Estudio conceptual de adaptación de Ola a camiseta navy" loading="lazy"><div class="v4-caption"><div><strong>Ola</strong><div class="v4-chip">Estudio de adaptación</div></div><span>Navy · azul · marfil<br>Archivo Abierto / Hokusai</span></div></article>
        </div>
      </div>
    </section>
    <section class="v4-section dark">
      <div class="v4-wrap">
        <div class="v4-head"><div><p class="v4-kicker">Lenguaje de campaña</p><h2>La colección también necesita una forma de ser mirada.</h2></div><p>El objetivo de esta capa es que la futura fotografía no sea un catálogo genérico: debe mostrar producto, textura y ubicación del arte, pero conservar espacio para el universo creativo.</p></div>
        <div class="v4-art-direction">
          <article><small>01 · Encuadre</small><h3>Producto completo primero.</h3><p>Una imagen debe explicar silueta y caída antes de entrar en detalles o escenas editoriales.</p></article>
          <article><small>02 · Detalle</small><h3>El arte vive sobre material.</h3><p>Costura, textura, borde de impresión y transición alrededor de la prenda deben poder verse de cerca.</p></article>
          <article><small>03 · Contexto</small><h3>Campaña sin disfraz.</h3><p>Escenarios simples, urbanos o de estudio; la dirección visual acompaña la prenda en lugar de competir con ella.</p></article>
          <article><small>04 · Evidencia</small><h3>La foto también prueba.</h3><p>Color real, fit real y acabado real deben desplazar gradualmente estos estudios conceptuales.</p></article>
        </div>
        <div class="v4-palette"><div class="v4-swatch marfil">Marfil</div><div class="v4-swatch ink">Negro</div><div class="v4-swatch moss">Musgo</div><div class="v4-swatch navy">Navy</div><div class="v4-swatch wave">Azul ola</div></div>
      </div>
    </section>`;

  const hokusaiSource = `
    <section class="v4-section">
      <div class="v4-wrap">
        <div class="v4-head"><div><p class="v4-kicker">Fuente institucional / JP1847</p><h2>La obra original entra antes que la adaptación.</h2></div><p>Para Ola mostramos la fuente que realmente debe sostener el proceso de diseño. La imagen aquí viene de la colección Open Access de The Metropolitan Museum of Art.</p></div>
        <div class="v4-source-board">
          <div class="v4-source-image"><img src="${HOKUSAI_IMAGE}" alt="Under the Wave off Kanagawa, Katsushika Hokusai, The Metropolitan Museum of Art" loading="lazy"></div>
          <div class="v4-source-copy"><div><span class="v4-provenance-mark">Public Domain / Open Access</span><h3>Under the Wave off Kanagawa.</h3><p>No usamos una recreación “al estilo de Hokusai” como fuente. La adaptación parte de una obra histórica concreta, de una ficha institucional concreta y de un archivo identificable.</p><div class="v4-facts"><div class="v4-fact"><small>Autor</small><strong>Katsushika Hokusai</strong></div><div class="v4-fact"><small>Fecha</small><strong>ca. 1830–32</strong></div><div class="v4-fact"><small>Institución</small><strong>The Met</strong></div><div class="v4-fact"><small>Objeto</small><strong>JP1847</strong></div><div class="v4-fact"><small>Medio</small><strong>Woodblock print</strong></div><div class="v4-fact"><small>Derechos</small><strong>Public Domain</strong></div></div></div><a class="v4-source-link" href="${HOKUSAI_PAGE}" target="_blank" rel="noopener">Ver ficha original en The Met ↗</a></div>
        </div>
      </div>
    </section>`;

  const olaCompare = `
    <section class="v4-section navy"><div class="v4-wrap"><div class="v4-head"><div><p class="v4-kicker">Obra → prenda</p><h2>La adaptación debe explicar qué cambió.</h2></div><p>Este tablero no es arte final. Hace visible la diferencia entre fuente histórica y una hipótesis de posición sobre la prenda.</p></div><div class="v4-compare"><article class="v4-panel"><div class="v4-panel-media"><img src="${HOKUSAI_IMAGE}" alt="Obra original de Hokusai en The Met" loading="lazy"></div><div class="v4-panel-copy"><small>01 · Fuente</small><h3>La obra completa.</h3><p>Referencia institucional, objeto JP1847. Conservamos esta capa separada del diseño de prenda.</p></div></article><article class="v4-panel"><div class="v4-panel-media"><img src="./assets/ola-garment-study.svg" alt="Estudio conceptual de adaptación de Ola" loading="lazy"></div><div class="v4-panel-copy"><small>02 · Hipótesis de adaptación</small><h3>Costado, espalda y un Fuji pequeño.</h3><p>Una propuesta de escala y continuidad que todavía debe probarse sobre blank e impresión reales.</p></div></article></div></div></section>`;

  const raizVisual = `
    <section class="v4-section"><div class="v4-wrap"><div class="v4-head"><div><p class="v4-kicker">Entre grietas / estudio de campaña</p><h2>Raíz necesita materia, vacío y borde.</h2></div><p>La dirección propuesta evita convertir la colección en “naturaleza tropical”. Trabaja con concreto, marfil, negro y musgo, y deja que la gráfica aparezca desde los límites de la composición.</p></div><div class="v4-source-board"><div class="v4-source-image"><img src="./assets/raiz-campaign-study.svg" alt="Estudio visual conceptual para Raíz de concreto" loading="lazy"></div><div class="v4-source-copy"><div><span class="v4-provenance-mark">Universo original del estudio</span><h3>Una campaña sobre insistir.</h3><p>Antes de fotografía real usamos este estudio para definir lenguaje: fondos minerales, contraste bajo, vegetación contenida y gráfica que entra desde el borde. No es una foto de producto ni sustituye el fitting o la muestra física.</p><div class="v4-facts"><div class="v4-fact"><small>Base</small><strong>Marfil</strong></div><div class="v4-fact"><small>Acento</small><strong>Musgo</strong></div><div class="v4-fact"><small>Gráfica</small><strong>Negro</strong></div><div class="v4-fact"><small>Estado</small><strong>Conceptual</strong></div></div></div></div></div></div></section>`;

  function moduleFor(r) {
    if (r === '/' || r === '') return campaignHome;
    if (r === '/archivo' || r.startsWith('/archivo/')) return hokusaiSource;
    if (r === '/producto/ola-hokusai' || r === '/coleccion/la-fuerza-del-agua') return hokusaiSource + olaCompare;
    if (r === '/producto/raiz-de-concreto' || r === '/coleccion/entre-grietas') return raizVisual;
    return '';
  }

  function enhance() {
    const r = route();
    app.querySelectorAll('[data-v4-module]').forEach(el => el.remove());
    const html = moduleFor(r);
    if (html) app.insertAdjacentHTML('beforeend', `<div data-v4-module>${html}</div>`);
    document.querySelectorAll('.v4-route-note').forEach(el => el.remove());
    if (html) {
      const note = document.createElement('div');
      note.className = 'v4-note v4-route-note';
      note.innerHTML = '<strong>V4 · Dirección visual</strong><span>Estudios conceptuales conviven con obra institucional; fotografía real de producto sigue pendiente de Product Ready.</span>';
      app.insertAdjacentElement('afterend', note);
    }
  }

  const observer = new MutationObserver(() => {
    const r = route();
    const expected = Boolean(moduleFor(r));
    const present = Boolean(app.querySelector('[data-v4-module]'));
    if (expected !== present) setTimeout(enhance, 0);
  });
  observer.observe(app, {childList:true});
  window.addEventListener('hashchange', () => setTimeout(enhance, 0));
  setTimeout(enhance, 0);
})();