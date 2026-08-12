(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1).split('?')[0];
  const U = './assets/universes/';
  const P = './assets/products/';
  const studyUniverses = [
    ['Tomás Muro','Muros que hablan',`${U}tomas-muro-muros-que-hablan.svg`],
    ['Nina Cobalto','Frecuencia',`${U}nina-cobalto-frecuencia.svg`],
    ['Simón Bestiario','Animales del ruido',`${U}simon-bestiario-animales-del-ruido.svg`],
    ['Vera Montaña','Ciudad vertical',`${U}vera-montana-ciudad-vertical.svg`]
  ];
  const archiveStudies = [
    ['William Morris','Naturaleza repetida'],
    ['Alphonse Mucha','Las estaciones'],
    ['Vincent van Gogh','El paisaje se mueve'],
    ['Claude Monet','Jardines de luz']
  ];
  const setText = (el, value) => { if (el && el.textContent.trim() !== value) el.textContent = value; };
  const hide = el => el?.classList.add('v18-hidden');
  const img = (src, alt) => `<img src="${src}" alt="${alt}" loading="lazy">`;

  function setDevMode() {
    const enabled = new URLSearchParams(location.search).get('dev') === '1';
    document.body.classList.toggle('v18-dev-mode', enabled);
    const banner = document.querySelector('.dev-banner a');
    if (banner) setText(banner, enabled ? 'Vista de desarrollo · Modo QA activo · Estado técnico' : 'Vista de desarrollo · GitHub Pages · Estado técnico');
  }

  function cleanInternalCopy() {
    document.querySelectorAll('.v12-asset-note,.v13-library-note,.v12-artist-note').forEach(hide);
  }

  function home() {
    if (route() !== '/') return;
    const hero = app.querySelector('.v12-campaign-hero');
    if (hero) {
      setText(hero.querySelector('.lede'), 'MISCA convierte artistas, obras e historias en colecciones pequeñas. Raíz y Ola abren la tienda desde dos caminos distintos y una misma lógica de producto.');
      const actions = hero.querySelectorAll('.v12-campaign-hero__actions a');
      if (actions[0]) { actions[0].href = '#/prendas'; setText(actions[0], 'Comprar Raíz + Ola'); }
      if (actions[1]) { actions[1].href = '#/historias'; setText(actions[1], 'Leer las historias'); }
    }
    const shop = app.querySelector('.v15-shop-window');
    if (shop) {
      setText(shop.querySelector('.v15-section-head h2'), 'Dos piezas para empezar.');
      setText(shop.querySelector('.v15-section-head > p'), 'Raíz y Ola presentan dos formas de construir una colección: una voz original de la Casa y una obra histórica con procedencia visible.');
      if (!app.querySelector('.v18-brand-strip')) shop.insertAdjacentHTML('afterend', `<section class="v18-brand-strip"><div class="wrap v18-brand-strip__grid"><div><span>01</span><strong>Colecciones pequeñas</strong><p>Menos piezas, más intención por lanzamiento.</p></div><div><span>02</span><strong>Obra con contexto</strong><p>La historia y la fuente siguen visibles alrededor de la prenda.</p></div><div><span>03</span><strong>Producto antes de promesa</strong><p>La compra pública llega después de validar la prenda y la operación.</p></div></div></section>`);
    }
    const worlds = app.querySelector('.v12-home-universes');
    if (worlds) {
      worlds.classList.add('v18-home-worlds');
      setText(worlds.querySelector('.v12-section-kicker .eyebrow'), 'Próximos universos · en estudio');
      setText(worlds.querySelector('.v12-section-kicker h2'), 'Lo que puede venir después.');
      setText(worlds.querySelector('.v12-section-kicker > p'), 'No todo lo que imagina MISCA está a la venta. Estos universos muestran direcciones creativas futuras sin convertirlas todavía en inventario.');
      hide(worlds.querySelector('.v12-editorial-index'));
      if (!worlds.querySelector('.v18-study-grid')) worlds.querySelector('.wrap')?.insertAdjacentHTML('beforeend', `<div class="v18-study-grid">${studyUniverses.map(([name,collection,src]) => `<article class="v18-study-card">${img(src,`${collection} · ${name}`)}<div><small>En estudio</small><h3>${collection}</h3><p>${name}</p></div></article>`).join('')}</div>`);
    }
  }

  function plp() {
    const r = route();
    if (!['/prendas','/nuevo'].includes(r)) return;
    const hero = app.querySelector('.page-hero');
    if (hero) {
      setText(hero.querySelector('.eyebrow'), r === '/nuevo' ? 'Lanzamiento 01' : 'Tienda');
      setText(hero.querySelector('h1'), r === '/nuevo' ? 'Raíz + Ola' : 'Prendas');
      setText(hero.querySelector('.lede'), 'Dos piezas activas, dos universos claros. Entra a cada producto para elegir talla, recorrer la campaña y conocer la historia detrás de la prenda.');
    }
    const summary = app.querySelector('.v15-plp-summary');
    if (summary && summary.dataset.v18 !== '1') {
      summary.dataset.v18 = '1';
      summary.innerHTML = '<div><strong>2 piezas</strong><span>lanzamiento 01</span></div><div><strong>S · M · L · XL</strong><span>selección en producto</span></div><div><strong>Raíz + Ola</strong><span>dos colecciones activas</span></div>';
    }
  }

  function pdp() {
    const match = route().match(/^\/producto\/(raiz-de-concreto|ola-hokusai)$/);
    if (!match) return;
    const raiz = match[1] === 'raiz-de-concreto';
    const buybox = app.querySelector('.buybox');
    if (!buybox) return;
    setText(buybox.querySelector('.preview-note'), 'Vista previa de lanzamiento. La compra pública se habilitará cuando la muestra física y la operación estén aprobadas.');
    const meta = buybox.querySelector('.v6-pdp-meta');
    if (meta && !buybox.querySelector('.v18-product-origin')) meta.insertAdjacentHTML('afterend', `<div class="v18-product-origin"><span>${raiz ? 'Obra original de la Casa' : 'Archivo Abierto'}</span><p>${raiz ? 'Una colección construida alrededor de crecimiento, concreto y espacio negativo.' : 'Una adaptación desde Hokusai con fuente, derechos y procedencia documentados.'}</p></div>`);
    const purchase = buybox.querySelector('.v15-purchase-line');
    if (purchase && purchase.dataset.v18 !== '1') {
      purchase.dataset.v18 = '1';
      purchase.innerHTML = '<span>Elige talla</span><span>Revisa detalles</span><span>Agrega a tu bolsa</span>';
    }
    const details = buybox.querySelectorAll('.accordions details');
    if (details[1]) setText(details[1].querySelector('.detail-body'), 'Tallas S, M, L y XL en esta vista. La tabla final de medidas y fit se publicará antes de habilitar la compra pública.');
    if (details[2]) setText(details[2].querySelector('.detail-body'), 'Tiempos de entrega, cobertura y condiciones de cambio estarán visibles antes de pagar y dentro del checkout.');
    if (details[3]) setText(details[3].querySelector('.detail-body'), 'Las instrucciones definitivas de lavado y cuidado se publicarán con la ficha final de la prenda.');
    const story = app.querySelector('.story-split');
    if (story) { setText(story.querySelector('.eyebrow'), 'Detrás de la pieza'); setText(story.querySelector('h2'), raiz ? 'Entre grietas' : 'La fuerza del agua'); }
  }

  function artists() {
    if (route() !== '/artistas') return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    setText(hero.querySelector('h1'), 'Cada colección empieza con una voz.');
    setText(hero.querySelector('.lede'), 'Alma Ríos abre la línea original de MISCA. Los demás universos de la Casa permanecen en estudio hasta convertirse en colecciones realmente listas para salir.');
    hide(app.querySelector('.artist-grid')?.closest('section'));
    hide([...app.querySelectorAll('section.archive-band')].find(s => s.textContent.includes('Obras históricas')));
    if (!app.querySelector('.v18-artists-route')) hero.insertAdjacentHTML('afterend', `<div class="v18-artists-route"><section class="section v18-feature-artist"><div class="wrap v18-feature-grid"><div class="v18-feature-visual">${img(`${U}alma-rios-entre-grietas.svg`,'Entre grietas · Alma Ríos')}</div><div class="v18-feature-copy"><p class="eyebrow">Disponible ahora · Artista de la Casa</p><h2>Alma Ríos</h2><p class="lede">Lo que crece también cuenta historias.</p><p>Entre grietas convierte raíces, concreto y espacio negativo en un sistema visual pensado para seguir funcionando sobre la prenda.</p><div class="v18-actions"><a class="button" href="#/producto/raiz-de-concreto">Ver Raíz de concreto</a><a class="button secondary" href="#/coleccion/entre-grietas">Ver colección</a></div></div></div></section><section class="section compact"><div class="wrap"><div class="v18-section-head"><div><p class="eyebrow">Universos de la Casa</p><h2>En estudio.</h2></div><p>Estas direcciones creativas forman parte del archivo de marca, pero todavía no son surtido.</p></div><div class="v18-study-grid">${studyUniverses.map(([name,collection,src]) => `<article class="v18-study-card">${img(src,`${collection} · ${name}`)}<div><small>En estudio</small><h3>${collection}</h3><p>${name}</p></div></article>`).join('')}</div></div></section><section class="section v18-archive-callout"><div class="wrap v18-feature-grid"><div class="v18-feature-copy"><p class="eyebrow">Otra entrada · Archivo Abierto</p><h2>La obra también puede llegar desde la historia.</h2><p>Hokusai abre una segunda línea: trabajar desde una obra histórica con fuente y derechos documentados, sin borrar su procedencia.</p><div class="v18-actions"><a class="button" href="#/producto/ola-hokusai">Ver Ola</a><a class="button secondary" href="#/archivo">Entrar al Archivo</a></div></div><div class="v18-feature-visual">${img(`${U}hokusai-la-fuerza-del-agua.svg`,'La fuerza del agua · Hokusai')}</div></div></section></div>`);
  }

  function artistDetail() {
    const match = route().match(/^\/artista\/(alma-rios|tomas-muro|nina-cobalto|simon-bestiario|vera-montana)$/);
    if (!match) return;
    const active = match[1] === 'alma-rios';
    const hero = app.querySelector('.artist-page-hero');
    const bio = hero?.querySelector('.artist-bio');
    if (!hero || !bio) return;
    setText(bio.querySelector('.eyebrow'), active ? 'Artista de la Casa · lanzamiento 01' : 'Universo de la Casa · en estudio');
    if (!active) hide(bio.querySelector('.link-arrow'));
    const productSection = [...app.querySelectorAll('section')].find(s => s.textContent.includes('Colección') && (s.querySelector('.product-grid') || s.querySelector('.empty-state')));
    if (!active) hide(productSection);
    if (!hero.nextElementSibling?.classList.contains('v18-artist-status')) hero.insertAdjacentHTML('afterend', active ? '<section class="v18-artist-status"><div class="wrap"><span>Disponible ahora</span><strong>Entre grietas</strong><a href="#/producto/raiz-de-concreto">Ver Raíz de concreto →</a></div></section>' : '<section class="v18-artist-status"><div class="wrap"><span>En estudio</span><strong>Este universo todavía no forma parte del lanzamiento.</strong><a href="#/prendas">Ver las piezas disponibles →</a></div></section>');
  }

  function collections() {
    if (route() !== '/colecciones') return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    setText(hero.querySelector('h1'), 'Dos colecciones abren MISCA.');
    const hw = hero.querySelector('.wrap');
    if (!hero.querySelector('.lede')) hw?.insertAdjacentHTML('beforeend','<p class="lede">Entre grietas y La fuerza del agua muestran dos formas distintas de convertir una idea en prenda.</p>');
    else setText(hero.querySelector('.lede'), 'Entre grietas y La fuerza del agua muestran dos formas distintas de convertir una idea en prenda.');
    hide(app.querySelector('.v12-collections-index'));
    const base = [...app.querySelectorAll('section')].find(s => s.querySelector('.product-grid') && s.textContent.includes('Entre grietas') && s.textContent.includes('La fuerza del agua'));
    hide(base);
    if (!app.querySelector('.v18-collections-route')) hero.insertAdjacentHTML('afterend', `<section class="section v18-collections-route"><div class="wrap"><div class="v18-collection-grid"><article class="v18-collection-card"><a href="#/coleccion/entre-grietas" class="v18-collection-media">${img(`${U}alma-rios-entre-grietas.svg`,'Entre grietas · Alma Ríos')}</a><div><p class="eyebrow">Alma Ríos · Artista de la Casa</p><h2>Entre grietas</h2><p>Una colección sobre aquello que insiste en crecer incluso cuando el espacio parece cerrado.</p><a class="link-arrow" href="#/coleccion/entre-grietas">Entrar a la colección →</a></div></article><article class="v18-collection-card"><a href="#/coleccion/la-fuerza-del-agua" class="v18-collection-media">${img(`${U}hokusai-la-fuerza-del-agua.svg`,'La fuerza del agua · Hokusai')}</a><div><p class="eyebrow">Archivo Abierto · Hokusai</p><h2>La fuerza del agua</h2><p>Una obra histórica, una procedencia visible y una adaptación pensada para la prenda.</p><a class="link-arrow" href="#/coleccion/la-fuerza-del-agua">Entrar a la colección →</a></div></article></div><div class="v18-study-line"><p class="eyebrow">En estudio</p><p>Muros que hablan · Frecuencia · Animales del ruido · Ciudad vertical · Naturaleza repetida · Las estaciones · El paisaje se mueve · Jardines de luz.</p></div></div></section>`);
  }

  function collectionDetail() {
    const r = route();
    if (!['/coleccion/entre-grietas','/coleccion/la-fuerza-del-agua'].includes(r)) return;
    const raiz = r.endsWith('entre-grietas');
    const spread = app.querySelector('.v12-campaign-spread');
    if (spread && !spread.querySelector('.v18-collection-cta')) spread.querySelector('.v12-campaign-spread__copy')?.insertAdjacentHTML('beforeend', `<a class="button v18-collection-cta" href="#/producto/${raiz?'raiz-de-concreto':'ola-hokusai'}">Ver ${raiz?'Raíz de concreto':'Ola'}</a>`);
  }

  function stories() {
    if (route() !== '/historias') return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    setText(hero.querySelector('h1'), 'La prenda empieza antes de la prenda.');
    if (!hero.querySelector('.lede')) hero.querySelector('.wrap')?.insertAdjacentHTML('beforeend','<p class="lede">Aquí se entiende por qué existe cada pieza: la voz, la obra, la adaptación y las decisiones que sostienen el producto.</p>');
    hide(app.querySelector('.v12-story-editorial'));
    hide([...app.querySelectorAll('section')].find(s => s.querySelector('.product-grid') && s.textContent.includes('Entre grietas: antes')));
    if (!app.querySelector('.v18-stories-route')) hero.insertAdjacentHTML('afterend', `<section class="section v18-stories-route"><div class="wrap"><div class="v18-story-grid"><article class="v18-story-card">${img(`${P}raiz/art-crop.svg`,'Detalle artístico de Raíz de concreto')}<div><p class="eyebrow">Historia 01 · Entre grietas</p><h2>Una imagen no basta.</h2><p>Raíz no empieza con una camiseta vacía. Empieza con una idea sobre crecimiento, resistencia y espacio; después decide cómo esa idea vive sobre la prenda.</p><a class="link-arrow" href="#/producto/raiz-de-concreto">Ver la pieza →</a></div></article><article class="v18-story-card">${img(`${P}ola/art-crop.svg`,'Detalle de la obra vinculada a Ola')}<div><p class="eyebrow">Historia 02 · Archivo Abierto</p><h2>Cómo entra Hokusai.</h2><p>La obra original, su fuente y sus derechos aparecen antes de la adaptación. Ola no reemplaza la historia de la imagen: construye una prenda alrededor de ella.</p><a class="link-arrow" href="#/archivo/hokusai">Ver la procedencia →</a></div></article><article class="v18-story-card v18-story-card--text"><div><p class="eyebrow">Historia 03 · Producto</p><h2>La narrativa no compensa una mala camiseta.</h2><p>Fit, tela, impresión, lavado, empaque y entrega son parte de la experiencia. La historia crea deseo; el producto tiene que sostenerlo.</p><a class="link-arrow" href="#/calidad">Ver calidad y proceso →</a></div></article></div></div></section>`);
  }

  function archive() {
    if (route() !== '/archivo') return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    setText(hero.querySelector('h1'), 'La obra conserva su historia.');
    setText(hero.querySelector('.lede'), 'Archivo Abierto parte de fuentes institucionales y derechos documentados. La adaptación pertenece a MISCA; la procedencia de la obra permanece visible.');
    hide([...app.querySelectorAll('section')].find(s => s.querySelector('.product-grid') && s.textContent.includes('Katsushika Hokusai')));
    hide(app.querySelector('.v12-archive-ledger-section'));
    if (!app.querySelector('.v18-archive-route')) hero.insertAdjacentHTML('afterend', `<div class="v18-archive-route"><section class="section"><div class="wrap v18-feature-grid"><div class="v18-feature-visual">${img(`${U}hokusai-la-fuerza-del-agua.svg`,'La fuerza del agua · Hokusai')}</div><div class="v18-feature-copy"><p class="eyebrow">Archivo Abierto / 01 · disponible ahora</p><h2>Hokusai entra por la fuente.</h2><p>Ola parte de <em>Under the Wave off Kanagawa</em>, con referencia institucional y derechos visibles. La adaptación decide escala, posición y relación con la prenda.</p><div class="v18-actions"><a class="button" href="#/producto/ola-hokusai">Ver Ola</a><a class="button secondary" href="#/archivo/hokusai">Ver procedencia</a></div></div></div></section><section class="section compact v18-archive-studies"><div class="wrap"><div class="v18-section-head"><div><p class="eyebrow">Archivo en estudio</p><h2>Otras obras, todavía sin producto.</h2></div><p>Una fuente puede entrar al archivo antes de convertirse en colección.</p></div><div class="v18-archive-study-grid">${archiveStudies.map(([name,collection])=>`<div><small>En estudio</small><strong>${collection}</strong><span>${name}</span></div>`).join('')}</div></div></section></div>`);
  }

  function archiveDetail() {
    const match = route().match(/^\/archivo\/(hokusai|william-morris|van-gogh|monet)$/);
    if (!match) return;
    const active = match[1] === 'hokusai';
    const bio = app.querySelector('.artist-bio');
    if (bio) setText(bio.querySelector('.eyebrow'), active ? 'Archivo Abierto · producto vinculado' : 'Archivo Abierto · en estudio');
    const hero = app.querySelector('.artist-page-hero');
    if (hero && !hero.nextElementSibling?.classList.contains('v18-artist-status')) hero.insertAdjacentHTML('afterend', active ? '<section class="v18-artist-status"><div class="wrap"><span>Disponible ahora</span><strong>La fuerza del agua</strong><a href="#/producto/ola-hokusai">Ver Ola →</a></div></section>' : '<section class="v18-artist-status"><div class="wrap"><span>En estudio</span><strong>Esta fuente todavía no tiene una prenda activa.</strong><a href="#/archivo">Volver al Archivo →</a></div></section>');
  }

  function creators() {
    if (route() !== '/creadores') return;
    const copy = app.querySelector('.creator-copy');
    if (copy) {
      setText(copy.querySelector('h1'), 'Tu obra. Una colección. Nuestra operación.');
      setText(copy.querySelector('.lede'), 'El creador diseña y moviliza su comunidad; MISCA convierte esa idea en una colección vendible y se ocupa de la operación.');
      const paragraphs = copy.querySelectorAll('p');
      if (paragraphs[2]) setText(paragraphs[2], 'Trabajamos con colecciones pequeñas y una curaduría clara. Primero probamos una salida concreta; después decidimos si tiene sentido crecer.');
      const button = copy.querySelector('.button');
      if (button) {
        button.href = '#/creadores'; setText(button, 'Ver cómo funciona');
        if (button.dataset.v18Bound !== '1') { button.dataset.v18Bound = '1'; button.addEventListener('click', e => { e.preventDefault(); document.getElementById('como')?.scrollIntoView({behavior:'smooth',block:'start'}); }); }
      }
    }
    const steps = [...app.querySelectorAll('.process-grid')].find(g=>g.textContent.includes('Curamos') && g.textContent.includes('Liquidamos'));
    const anchor = steps?.closest('section') || app.querySelector('#como');
    if (anchor && !app.querySelector('.v18-creator-model')) anchor.insertAdjacentHTML('afterend', `<section class="section v18-creator-model"><div class="wrap"><div class="v18-section-head"><div><p class="eyebrow">Modelo de colaboración</p><h2>Una división simple del trabajo.</h2></div><p>La colección necesita una voz clara y una operación que no le quite tiempo creativo al autor.</p></div><div class="v18-role-grid"><div><span>Creador</span><h3>Diseña y activa la audiencia.</h3><p>Obra, criterio visual, aprobación de colección y comunicación con su comunidad.</p></div><div><span>MISCA</span><h3>Convierte la idea en operación.</h3><p>Desarrollo de producto, producción, tienda, cobro, empaque, envío, soporte y analítica.</p></div></div><div class="v18-creator-start"><div><p class="eyebrow">Cómo empezamos</p><h3>Una colección pequeña antes que una plataforma enorme.</h3></div><ul><li>1 concepto central.</li><li>1–3 prendas iniciales.</li><li>Producción bajo pedido, preventa o lote corto.</li><li>Comisión y base de liquidación definidas antes de lanzar.</li></ul></div><div class="v18-creator-proof"><p>¿Cómo se ve una colección cuando entra a MISCA?</p><a class="button secondary" href="#/coleccion/entre-grietas">Ver Entre grietas</a></div></div></section>`);
  }

  function quality() {
    if (route() !== '/calidad') return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    setText(hero.querySelector('.lede'), 'La capa editorial crea deseo. Tela, fit, impresión, cuidado y operación son lo que sostienen la compra.');
    const process = [...app.querySelectorAll('.process-grid')].find(g=>g.textContent.includes('Blank') && g.textContent.includes('Lavado'));
    const anchor = process?.closest('section') || hero;
    if (anchor && !app.querySelector('.v18-quality-proof')) anchor.insertAdjacentHTML('afterend', `<section class="section v18-quality-proof"><div class="wrap"><div class="v18-section-head"><div><p class="eyebrow">Antes de vender</p><h2>La ficha final tiene que responder lo importante.</h2></div><p>No activaremos compra pública con datos físicos incompletos.</p></div><div class="v18-quality-grid"><div><strong>Material</strong><span>Composición, peso y mano.</span></div><div><strong>Fit</strong><span>Medidas reales y guía de tallas.</span></div><div><strong>Técnica</strong><span>Impresión o bordado por pieza.</span></div><div><strong>Cuidado</strong><span>Instrucciones después de pruebas.</span></div><div><strong>Entrega</strong><span>Tiempos y cobertura visibles.</span></div><div><strong>Cambios</strong><span>Condiciones antes del checkout.</span></div></div><div class="v18-quality-cta"><p>La calidad se entiende mejor sobre una pieza concreta.</p><a class="button" href="#/prendas">Ver Raíz + Ola</a></div></div></section>`);
  }

  function footer() {
    const explore = document.querySelector('.site-footer > div:nth-child(2)');
    if (explore && !explore.querySelector('a[href="#/colecciones"]')) explore.querySelector('a[href="#/artistas"]')?.insertAdjacentHTML('afterend','<a href="#/colecciones">Colecciones</a>');
  }

  function enhance() {
    setDevMode(); cleanInternalCopy(); home(); plp(); pdp(); artists(); artistDetail(); collections(); collectionDetail(); stories(); archive(); archiveDetail(); creators(); quality(); footer();
  }
  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app, {childList:true, subtree:true});
  window.addEventListener('hashchange', () => setTimeout(enhance, 0));
  setTimeout(enhance, 0);
})();
