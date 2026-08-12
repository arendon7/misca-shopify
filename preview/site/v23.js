(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const A = './assets/';
  const U = `${A}universes/`;
  const R = `${A}products/raiz/`;
  const O = `${A}products/ola/`;
  const route = () => (location.hash || '#/').slice(1).split('?')[0];
  const image = (src, alt, cls = '') => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;
  const button = (href, label, secondary = false) => `<a class="v23-button${secondary ? ' is-secondary' : ''}" href="${href}">${label}</a>`;
  const controlled = new Set(['/', '/prendas', '/nuevo', '/artistas', '/colecciones', '/historias', '/creadores', '/calidad', '/archivo']);

  const universes = {
    alma: [`${U}alma-rios-entre-grietas.svg`, 'Alma Ríos', 'Entre grietas'],
    tomas: [`${U}tomas-muro-muros-que-hablan.svg`, 'Tomás Muro', 'Muros que hablan'],
    nina: [`${U}nina-cobalto-frecuencia.svg`, 'Nina Cobalto', 'Frecuencia'],
    simon: [`${U}simon-bestiario-animales-del-ruido.svg`, 'Simón Bestiario', 'Animales del ruido'],
    vera: [`${U}vera-montana-ciudad-vertical.svg`, 'Vera Montaña', 'Ciudad vertical'],
    hokusai: [`${U}hokusai-la-fuerza-del-agua.svg`, 'Katsushika Hokusai', 'La fuerza del agua'],
    morris: [`${U}william-morris-naturaleza-repetida.svg`, 'William Morris', 'Naturaleza repetida'],
    mucha: [`${U}alphonse-mucha-las-estaciones.svg`, 'Alphonse Mucha', 'Las estaciones'],
    vangogh: [`${U}van-gogh-el-paisaje-se-mueve.svg`, 'Vincent van Gogh', 'El paisaje se mueve'],
    monet: [`${U}monet-jardines-de-luz.svg`, 'Claude Monet', 'Jardines de luz']
  };

  function setRouteState(name) {
    document.body.dataset.v23Route = name;
    document.body.classList.add('v23-live');
  }

  function home() {
    setRouteState('home');
    app.innerHTML = `<div class="v23-shell">
      <section class="v23-home-hero">
        <div class="v23-home-hero__copy">
          <p class="v23-kicker">MISCA · Medellín · Lanzamiento 01</p>
          <h1>Arte que<br>puedes llevar.</h1>
          <p class="v23-lede">Colecciones pequeñas construidas alrededor de artistas, obras e historias. Dos piezas abren la tienda: una voz original y una obra histórica con procedencia visible.</p>
          <div class="v23-actions">${button('#/prendas','Ver las prendas')}${button('#/historias','Entrar a las historias',true)}</div>
          <div class="v23-hero-index"><span>01 Raíz de concreto</span><span>02 Ola</span></div>
        </div>
        <div class="v23-hero-collage" aria-label="Campañas de Raíz de concreto y Ola">
          <figure class="v23-hero-frame v23-hero-frame--main">${image(`${R}cover.svg`,'Raíz de concreto · campaña conceptual','v23-img')}<figcaption>Raíz de concreto · Alma Ríos</figcaption></figure>
          <figure class="v23-hero-frame v23-hero-frame--top">${image(`${O}context.svg`,'Ola · contexto conceptual','v23-img')}<figcaption>Ola · Archivo Abierto</figcaption></figure>
          <figure class="v23-hero-frame v23-hero-frame--bottom">${image(`${R}art-crop.svg`,'Entre grietas · fragmento visual','v23-img')}<figcaption>Entre grietas · detalle</figcaption></figure>
        </div>
      </section>

      <section class="v23-marquee" aria-label="Principios de la marca"><span>COLECCIONES PEQUEÑAS</span><span>OBRA CON CONTEXTO</span><span>PRODUCTO ANTES DE PROMESA</span><span>HECHO DESDE MEDELLÍN</span></section>

      <section class="v23-section v23-launch">
        <header class="v23-section-head"><div><p class="v23-kicker">Lanzamiento 01</p><h2>Dos piezas.<br>Dos maneras de entrar.</h2></div><p>El catálogo inicial no intenta parecer grande. Cada prenda tiene una obra, una colección y una razón clara para existir.</p></header>
        <div class="v23-product-duo">
          <a class="v23-product-card" href="#/producto/raiz-de-concreto">
            <div class="v23-product-card__media">${image(`${R}cover.svg`,'Raíz de concreto · portada de campaña','v23-img v23-primary')}${image(`${R}context.svg`,'Raíz de concreto · contexto de campaña','v23-img v23-secondary')}</div>
            <div class="v23-product-card__body"><div><p class="v23-kicker">Artista de la Casa · Alma Ríos</p><h3>Raíz de concreto</h3><p>Entre grietas · Marfil</p></div><strong>$119.900</strong></div>
          </a>
          <a class="v23-product-card" href="#/producto/ola-hokusai">
            <div class="v23-product-card__media">${image(`${O}cover.svg`,'Ola · portada de campaña','v23-img v23-primary')}${image(`${O}context.svg`,'Ola · contexto de campaña','v23-img v23-secondary')}</div>
            <div class="v23-product-card__body"><div><p class="v23-kicker">Archivo Abierto · Hokusai</p><h3>Ola</h3><p>La fuerza del agua · Navy</p></div><strong>$139.900</strong></div>
          </a>
        </div>
      </section>

      <section class="v23-editorial-split">
        <div class="v23-editorial-split__visual">${image(`${U}alma-rios-entre-grietas.svg`,'Entre grietas · universo visual','v23-img')}</div>
        <div class="v23-editorial-split__copy"><p class="v23-kicker">Artista de la Casa</p><h2>Una colección empieza antes que una camiseta.</h2><p>Empieza con una voz, una obra y un lenguaje que pueda sostener varias decisiones: prenda, técnica, campaña y relato.</p>${button('#/artistas','Conocer a Alma Ríos')}</div>
      </section>

      <section class="v23-section v23-universe-section">
        <header class="v23-section-head"><div><p class="v23-kicker">Próximos universos · en estudio</p><h2>La marca puede crecer.<br>El surtido todavía no.</h2></div><p>Estas direcciones creativas existen como archivo visual, no como inventario disponible.</p></header>
        <div class="v23-universe-rail">
          ${['tomas','nina','simon','vera'].map(key => { const [src,name,title] = universes[key]; return `<article class="v23-universe-card"><div>${image(src,`${title} · ${name}`,'v23-img')}</div><span>En estudio</span><h3>${title}</h3><p>${name}</p></article>`; }).join('')}
        </div>
      </section>

      <section class="v23-dark-story">
        <div class="v23-dark-story__copy"><p class="v23-kicker">Archivo Abierto</p><h2>Una obra histórica no pierde su origen cuando llega a una prenda.</h2><p>Fuente, derechos y procedencia siguen visibles. La adaptación MISCA vive al lado de la obra, no encima de ella.</p>${button('#/archivo','Entrar al Archivo')}</div>
        <div class="v23-dark-story__visual"><figure>${image(`${O}art-crop.svg`,'Ola · fragmento de obra y adaptación','v23-img')}</figure><figure>${image(`${U}hokusai-la-fuerza-del-agua.svg`,'La fuerza del agua · Hokusai','v23-img')}</figure></div>
      </section>

      <section class="v23-creator-callout">
        <div><p class="v23-kicker">Para creadores</p><h2>Tu obra.<br>Nuestra operación.</h2></div>
        <div><p>El creador diseña, decide y mueve comunidad. MISCA desarrolla producto, produce, cobra, empaca, envía, atiende y liquida.</p>${button('#/creadores','Cómo funciona')}</div>
      </section>
    </div>`;
  }

  function productListing() {
    setRouteState('shop');
    app.innerHTML = `<div class="v23-shell"><section class="v23-page-intro"><p class="v23-kicker">Lanzamiento 01 · Tienda</p><h1>Dos prendas.<br>Ninguna distracción.</h1><p class="v23-lede">Elige por origen: una pieza desde una artista de la Casa o una adaptación desde Archivo Abierto.</p></section><section class="v23-section v23-launch v23-launch--shop"><div class="v23-product-duo">
      <a class="v23-product-card" href="#/producto/raiz-de-concreto"><div class="v23-product-card__media">${image(`${R}cover.svg`,'Raíz de concreto','v23-img v23-primary')}${image(`${R}front.svg`,'Raíz de concreto · frente','v23-img v23-secondary')}</div><div class="v23-product-card__body"><div><p class="v23-kicker">Artista de la Casa · Alma Ríos</p><h3>Raíz de concreto</h3><p>Entre grietas · Marfil · S–XL</p></div><strong>$119.900</strong></div></a>
      <a class="v23-product-card" href="#/producto/ola-hokusai"><div class="v23-product-card__media">${image(`${O}cover.svg`,'Ola','v23-img v23-primary')}${image(`${O}front.svg`,'Ola · frente','v23-img v23-secondary')}</div><div class="v23-product-card__body"><div><p class="v23-kicker">Archivo Abierto · Hokusai</p><h3>Ola</h3><p>La fuerza del agua · Navy · S–XL</p></div><strong>$139.900</strong></div></a>
    </div><div class="v23-shop-proof"><span>Producción local</span><span>Colecciones pequeñas</span><span>Talla se elige en producto</span><span>Compra pública tras Product Ready</span></div></section></div>`;
  }

  function artists() {
    setRouteState('artists');
    app.innerHTML = `<div class="v23-shell"><section class="v23-page-intro v23-page-intro--visual"><div><p class="v23-kicker">Artistas</p><h1>Cada colección empieza con una voz.</h1><p class="v23-lede">Una artista abre el lanzamiento. Los demás universos permanecen en estudio hasta que exista una colección realmente lista.</p></div><div>${image(`${U}alma-rios-entre-grietas.svg`,'Alma Ríos · Entre grietas','v23-img')}</div></section>
      <section class="v23-section"><header class="v23-section-head"><div><p class="v23-kicker">Disponible ahora</p><h2>Alma Ríos</h2></div><p>Entre grietas convierte raíces, concreto y espacio negativo en un sistema visual que continúa sobre la prenda.</p></header><div class="v23-artist-feature"><div>${image(`${R}context.svg`,'Raíz de concreto · contexto','v23-img')}</div><div><p class="v23-kicker">Artista de la Casa · Lanzamiento 01</p><h3>Lo que crece también cuenta historias.</h3><p>Una colección original desarrollada alrededor de una voz contemporánea.</p><div class="v23-actions">${button('#/producto/raiz-de-concreto','Ver Raíz')}${button('#/coleccion/entre-grietas','Ver colección',true)}</div></div></div></section>
      <section class="v23-section v23-section--soft"><header class="v23-section-head"><div><p class="v23-kicker">Universos de la Casa</p><h2>En estudio.</h2></div><p>No son producto disponible. Son direcciones creativas que podrían convertirse en colección después de validar el lanzamiento.</p></header><div class="v23-universe-rail">${['tomas','nina','simon','vera'].map(key => { const [src,name,title] = universes[key]; return `<a class="v23-universe-card" href="#/artista/${key === 'tomas' ? 'tomas-muro' : key === 'nina' ? 'nina-cobalto' : key === 'simon' ? 'simon-bestiario' : 'vera-montana'}"><div>${image(src,`${title} · ${name}`,'v23-img')}</div><span>En estudio</span><h3>${title}</h3><p>${name}</p></a>`; }).join('')}</div></section>
      <section class="v23-dark-story"><div class="v23-dark-story__copy"><p class="v23-kicker">Otra entrada</p><h2>Archivo Abierto.</h2><p>La segunda línea parte de obras históricas con procedencia y derechos documentados.</p>${button('#/archivo','Explorar Archivo')}</div><div class="v23-dark-story__visual">${image(`${O}context.svg`,'Ola · Archivo Abierto','v23-img')}${image(`${U}hokusai-la-fuerza-del-agua.svg`,'Hokusai · La fuerza del agua','v23-img')}</div></section></div>`;
  }

  function collections() {
    setRouteState('collections');
    app.innerHTML = `<div class="v23-shell"><section class="v23-page-intro"><p class="v23-kicker">Colecciones</p><h1>Dos universos abren MISCA.</h1><p class="v23-lede">Una colección original y una colección desde archivo histórico. Todo lo demás permanece claramente en estudio.</p></section>
      <section class="v23-collection-spread"><div class="v23-collection-spread__media">${image(`${U}alma-rios-entre-grietas.svg`,'Entre grietas · Alma Ríos','v23-img')}${image(`${R}context.svg`,'Raíz de concreto · contexto','v23-img')}</div><div class="v23-collection-spread__copy"><p class="v23-kicker">01 · Artista de la Casa</p><h2>Entre grietas</h2><p>Alma Ríos</p><p>Una colección sobre aquello que insiste en crecer incluso cuando el espacio parece cerrado.</p>${button('#/coleccion/entre-grietas','Entrar a la colección')}</div></section>
      <section class="v23-collection-spread is-reverse"><div class="v23-collection-spread__media">${image(`${O}context.svg`,'Ola · contexto','v23-img')}${image(`${U}hokusai-la-fuerza-del-agua.svg`,'La fuerza del agua · Hokusai','v23-img')}</div><div class="v23-collection-spread__copy"><p class="v23-kicker">02 · Archivo Abierto</p><h2>La fuerza del agua</h2><p>Katsushika Hokusai</p><p>Una obra histórica, una procedencia visible y una adaptación pensada para la prenda.</p>${button('#/coleccion/la-fuerza-del-agua','Entrar a la colección')}</div></section>
      <section class="v23-study-strip"><p class="v23-kicker">Después</p><p>Muros que hablan · Frecuencia · Animales del ruido · Ciudad vertical · Naturaleza repetida · Las estaciones · El paisaje se mueve · Jardines de luz.</p><span>En estudio · no disponibles</span></section></div>`;
  }

  function stories() {
    setRouteState('stories');
    app.innerHTML = `<div class="v23-shell"><section class="v23-page-intro v23-page-intro--visual"><div><p class="v23-kicker">Historias</p><h1>La prenda es el final visible de un proceso más largo.</h1><p class="v23-lede">Obra, decisiones, producto, procedencia y gente alrededor de cada colección.</p></div><div class="v23-story-hero-grid">${image(`${R}art-crop.svg`,'Entre grietas · detalle','v23-img')}${image(`${O}art-crop.svg`,'Ola · detalle','v23-img')}</div></section>
      <section class="v23-section"><div class="v23-story-grid"><article class="v23-story-card is-lead"><div>${image(`${R}context.svg`,'Raíz de concreto · contexto','v23-img')}</div><div><p class="v23-kicker">01 · Artista de la Casa</p><h2>La obra antes que la camiseta.</h2><p>Cómo una idea de crecimiento, concreto y espacio negativo se convierte en decisiones de producto sin perder su lenguaje.</p>${button('#/producto/raiz-de-concreto','Ver la pieza')}</div></article>
      <article class="v23-story-card"><div>${image(`${O}context.svg`,'Ola · procedencia y contexto','v23-img')}</div><div><p class="v23-kicker">02 · Archivo Abierto</p><h3>Adaptar sin borrar el origen.</h3><p>Una pieza puede entrar al presente sin fingir que la obra histórica nació aquí.</p>${button('#/archivo','Ver procedencia',true)}</div></article>
      <article class="v23-story-card"><div class="v23-story-card__mosaic">${image(`${U}tomas-muro-muros-que-hablan.svg`,'Tomás Muro','v23-img')}${image(`${U}nina-cobalto-frecuencia.svg`,'Nina Cobalto','v23-img')}</div><div><p class="v23-kicker">03 · Cómo trabaja MISCA</p><h3>Una colección pequeña también necesita sistema.</h3><p>Curaduría, producto, muestra, costos, campaña, venta y operación antes de hablar de escala.</p>${button('#/creadores','Para creadores',true)}</div></article></div></section></div>`;
  }

  function creators() {
    setRouteState('creators');
    app.innerHTML = `<div class="v23-shell"><section class="v23-creators-hero"><div class="v23-creators-hero__copy"><p class="v23-kicker">Para creadores</p><h1>Tu obra.<br>Nuestra operación.</h1><p class="v23-lede">Tú creas y mueves comunidad. MISCA convierte la idea en producto, tienda, cobro, empaque, envío y liquidación.</p></div><div class="v23-creators-collage">${['alma','tomas','nina','simon'].map(key => image(universes[key][0],`${universes[key][2]} · ${universes[key][1]}`,'v23-img')).join('')}</div></section>
      <section class="v23-role-split"><div><p class="v23-kicker">El creador</p><h2>Obra, criterio y comunidad.</h2><ul><li>Propone o selecciona el concepto.</li><li>Aprueba la adaptación.</li><li>Define la voz de la colección.</li><li>Participa en la promoción.</li></ul></div><div><p class="v23-kicker">MISCA</p><h2>Producto, comercio y operación.</h2><ul><li>Desarrollo de prenda y técnica.</li><li>Producción y control.</li><li>Shopify, pagos y soporte.</li><li>Empaque, envío, reporte y liquidación.</li></ul></div></section>
      <section class="v23-section"><header class="v23-section-head"><div><p class="v23-kicker">Cómo empezamos</p><h2>Pequeño a propósito.</h2></div><p>Antes de construir software o un catálogo enorme, probamos una colección que pueda venderse y operarse bien.</p></header><div class="v23-facts"><div><strong>1</strong><span>concepto central</span></div><div><strong>1–3</strong><span>prendas</span></div><div><strong>3</strong><span>formatos: preventa, bajo pedido o lote corto</span></div><div><strong>1</strong><span>acuerdo claro de comisión y responsabilidades</span></div></div></section></div>`;
  }

  function quality() {
    setRouteState('quality');
    app.innerHTML = `<div class="v23-shell"><section class="v23-quality-hero"><div><p class="v23-kicker">Calidad y proceso</p><h1>Un mockup no prueba una prenda.</h1><p class="v23-lede">Antes de habilitar la compra, la muestra física tiene que responder lo importante.</p></div><div class="v23-quality-visual">${image(`${R}detail.svg`,'Raíz de concreto · estudio conceptual de detalle','v23-img')}${image(`${O}detail.svg`,'Ola · estudio conceptual de detalle','v23-img')}</div></section>
      <section class="v23-section"><header class="v23-section-head"><div><p class="v23-kicker">Product Ready</p><h2>Seis cosas que deben dejar de ser hipótesis.</h2></div><p>Los SVG comunican dirección creativa. La evidencia física decide si una pieza está lista para venderse.</p></header><div class="v23-evidence-grid">${[['01','Material','Composición, peso, tacto y comportamiento real.'],['02','Fit','Medidas de la muestra y tabla de tallas aprobada.'],['03','Técnica','Estampado o bordado final, posición y definición.'],['04','Lavado','Prueba básica de estabilidad y durabilidad.'],['05','Entrega','Producción, empaque, transportadora y tiempos.'],['06','Cambios','Reglas claras antes del checkout.']].map(([n,h,p])=>`<article><span>${n}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>
      <section class="v23-truth-pair"><div><p class="v23-kicker">Lo que sí sabemos hoy</p><h2>Dirección visual.</h2><p>Obra, colección, color, narrativa, assets conceptuales y estructura comercial de lanzamiento.</p></div><div><p class="v23-kicker">Lo que no fingimos saber</p><h2>Evidencia física final.</h2><p>Gramaje, fit definitivo, lavado, lead time y cualquier especificación que todavía dependa de la muestra y del proveedor.</p></div></section></div>`;
  }

  function archive() {
    setRouteState('archive');
    app.innerHTML = `<div class="v23-shell"><section class="v23-archive-hero"><div class="v23-archive-hero__copy"><p class="v23-kicker">Archivo Abierto</p><h1>Obras que vuelven a circular sin perder su historia.</h1><p class="v23-lede">La procedencia forma parte de la experiencia. La obra fuente y la adaptación MISCA se muestran como cosas distintas.</p>${button('#/producto/ola-hokusai','Ver Ola')}</div><div class="v23-archive-hero__visual">${image(`${U}hokusai-la-fuerza-del-agua.svg`,'Hokusai · La fuerza del agua','v23-img')}${image(`${O}context.svg`,'Ola · adaptación conceptual','v23-img')}</div></section>
      <section class="v23-section"><header class="v23-section-head"><div><p class="v23-kicker">Lanzamiento</p><h2>Hokusai abre el Archivo.</h2></div><p>La fuente institucional, los derechos y el número de objeto deben acompañar a la adaptación. El contexto conceptual nunca sustituye a la obra fuente.</p></header><div class="v23-archive-proof"><div>${image(`${O}art-crop.svg`,'Ola · fragmento visual','v23-img')}</div><div><p class="v23-kicker">Procedencia documentada</p><h3>The Met · JP1847</h3><p>Public Domain / Open Access. La ficha completa se mantiene separada de la campaña conceptual.</p></div></div></section>
      <section class="v23-section v23-section--dark"><header class="v23-section-head"><div><p class="v23-kicker">En estudio</p><h2>Más archivos, todavía no surtido.</h2></div><p>Estas direcciones permanecen como investigación editorial hasta cerrar fuente y adaptación.</p></header><div class="v23-universe-rail">${['morris','mucha','vangogh','monet'].map(key=>{const [src,name,title]=universes[key];return `<article class="v23-universe-card">${image(src,`${title} · ${name}`,'v23-img')}<span>En estudio</span><h3>${title}</h3><p>${name}</p></article>`}).join('')}</div></section></div>`;
  }

  function collectionDetail(r) {
    const raiz = r === '/coleccion/entre-grietas';
    setRouteState('collection-detail');
    const src = raiz ? R : O;
    const universe = raiz ? universes.alma : universes.hokusai;
    const name = raiz ? 'Entre grietas' : 'La fuerza del agua';
    const artist = raiz ? 'Alma Ríos' : 'Katsushika Hokusai';
    const product = raiz ? 'Raíz de concreto' : 'Ola';
    app.innerHTML = `<div class="v23-shell"><section class="v23-collection-detail-hero"><div>${image(universe[0],`${name} · ${artist}`,'v23-img')}</div><div><p class="v23-kicker">${raiz ? 'Artista de la Casa' : 'Archivo Abierto'} · Lanzamiento 01</p><h1>${name}</h1><p class="v23-lede">${raiz ? 'Una colección sobre lo que insiste en crecer entre concreto, grietas y espacios cerrados.' : 'Una adaptación desde una obra histórica donde fuente, derechos y procedencia permanecen visibles.'}</p>${button(`#/producto/${raiz ? 'raiz-de-concreto' : 'ola-hokusai'}`,`Ver ${product}`)}</div></section><section class="v23-collection-gallery"><figure>${image(`${src}cover.svg`,`${product} · campaña`,'v23-img')}<figcaption>Campaña</figcaption></figure><figure>${image(`${src}context.svg`,`${product} · contexto`,'v23-img')}<figcaption>Contexto</figcaption></figure><figure>${image(`${src}art-crop.svg`,`${product} · obra`,'v23-img')}<figcaption>Obra / crop</figcaption></figure></section></div>`;
  }

  function artistDetail(r) {
    const handle = r.replace('/artista/','');
    const map = {
      'alma-rios':['alma','Entre grietas','raiz-de-concreto'],
      'tomas-muro':['tomas','Muros que hablan',null],
      'nina-cobalto':['nina','Frecuencia',null],
      'simon-bestiario':['simon','Animales del ruido',null],
      'vera-montana':['vera','Ciudad vertical',null]
    };
    if (!map[handle]) return false;
    setRouteState('artist-detail');
    const [key,collection,product] = map[handle];
    const [src,name] = universes[key];
    app.innerHTML = `<div class="v23-shell"><section class="v23-artist-detail"><div class="v23-artist-detail__visual">${image(src,`${collection} · ${name}`,'v23-img')}</div><div class="v23-artist-detail__copy"><p class="v23-kicker">${product ? 'Artista de la Casa · Lanzamiento 01' : 'Universo de la Casa · En estudio'}</p><h1>${name}</h1><p class="v23-lede">${collection}</p><p>${product ? 'Una voz original alrededor de la que MISCA construye obra, prenda, campaña y colección.' : 'Este universo forma parte del archivo creativo de MISCA, pero todavía no es una colección disponible.'}</p>${product ? button(`#/producto/${product}`,'Ver Raíz de concreto') : button('#/prendas','Ver piezas disponibles')}</div></section></div>`;
    return true;
  }

  function enhancePdp(r) {
    setRouteState('pdp');
    const raiz = r.endsWith('raiz-de-concreto');
    const productPage = app.querySelector('.product-page');
    if (!productPage) return;
    productPage.classList.add('v23-product-page');
    if (app.querySelector('.v23-pdp-editorial')) return;
    const src = raiz ? R : O;
    productPage.insertAdjacentHTML('afterend', `<section class="v23-pdp-editorial"><div><p class="v23-kicker">Detrás de la pieza</p><h2>${raiz ? 'Entre grietas' : 'La fuerza del agua'}</h2><p>${raiz ? 'Una voz original de la Casa convertida en colección pequeña.' : 'Una adaptación desde Archivo Abierto con procedencia documentada.'}</p></div><figure>${image(`${src}context.svg`,'Contexto de campaña','v23-img')}</figure><figure>${image(`${src}art-crop.svg`,'Obra y detalle','v23-img')}</figure></section>`);
  }

  function apply() {
    const r = route();
    if (r === '/') return home();
    if (r === '/prendas' || r === '/nuevo') return productListing();
    if (r === '/artistas') return artists();
    if (r === '/colecciones') return collections();
    if (r === '/historias') return stories();
    if (r === '/creadores') return creators();
    if (r === '/calidad') return quality();
    if (r === '/archivo') return archive();
    if (r === '/coleccion/entre-grietas' || r === '/coleccion/la-fuerza-del-agua') return collectionDetail(r);
    if (r.startsWith('/artista/') && artistDetail(r)) return;
    if (r === '/producto/raiz-de-concreto' || r === '/producto/ola-hokusai') return enhancePdp(r);
    delete document.body.dataset.v23Route;
  }

  function schedule() {
    window.setTimeout(apply, 30);
    window.setTimeout(apply, 180);
  }

  window.addEventListener('hashchange', schedule);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
})();
