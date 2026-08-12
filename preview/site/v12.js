(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const universes = [
    {key:'alma-rios',name:'Alma Ríos',collection:'Entre grietas',kind:'Artista de la Casa',status:'Lanzamiento',motif:'root',tone:'#e9e0cf',ink:'#181714',accent:'#66704d',href:'#/artista/alma-rios'},
    {key:'tomas-muro',name:'Tomás Muro',collection:'Muros que hablan',kind:'Artista de la Casa',status:'Desarrollo',motif:'wall',tone:'#c9b7a0',ink:'#25201b',accent:'#9a3f31',href:'#/artista/tomas-muro'},
    {key:'nina-cobalto',name:'Nina Cobalto',collection:'Frecuencia',kind:'Artista de la Casa',status:'Desarrollo',motif:'geo',tone:'#d7d5cb',ink:'#17202c',accent:'#2d55a0',href:'#/artista/nina-cobalto'},
    {key:'simon-bestiario',name:'Simón Bestiario',collection:'Animales del ruido',kind:'Artista de la Casa',status:'Desarrollo',motif:'beast',tone:'#d7c5a3',ink:'#1c1712',accent:'#a34f2c',href:'#/artista/simon-bestiario'},
    {key:'vera-montana',name:'Vera Montaña',collection:'Ciudad vertical',kind:'Artista de la Casa',status:'Desarrollo',motif:'city',tone:'#c7c7bd',ink:'#252723',accent:'#63705e',href:'#/artista/vera-montana'},
    {key:'hokusai',name:'Katsushika Hokusai',collection:'La fuerza del agua',kind:'Archivo Abierto',status:'Lanzamiento',motif:'wave',tone:'#d9d5ca',ink:'#14273a',accent:'#7194aa',href:'#/archivo'},
    {key:'william-morris',name:'William Morris',collection:'Naturaleza repetida',kind:'Archivo Abierto',status:'Desarrollo',motif:'morris',tone:'#d9c6a3',ink:'#233329',accent:'#a14d3e',href:'#/archivo'},
    {key:'mucha',name:'Alphonse Mucha',collection:'Las estaciones',kind:'Archivo Abierto',status:'Desarrollo',motif:'mucha',tone:'#e4d8bd',ink:'#393329',accent:'#b98d4d',href:'#/archivo'},
    {key:'van-gogh',name:'Vincent van Gogh',collection:'El paisaje se mueve',kind:'Archivo Abierto',status:'Desarrollo',motif:'cypress',tone:'#d8c98f',ink:'#243528',accent:'#456a5a',href:'#/archivo'},
    {key:'monet',name:'Claude Monet',collection:'Jardines de luz',kind:'Archivo Abierto',status:'Desarrollo',motif:'water',tone:'#cbd6cf',ink:'#334c4c',accent:'#8e7f9a',href:'#/archivo'}
  ];

  const route = () => (location.hash || '#/').slice(1);
  const asset = name => `./assets/${name}`;

  const tile = u => `<a class="v12-universe-tile" data-asset-slot="${u.key}-campaign-cover" data-motif="${u.motif}" href="${u.href}" style="--tone:${u.tone};--ink:${u.ink};--accent:${u.accent}"><div class="v12-universe-tile__top"><span>${u.kind}</span><span>${u.status}</span></div><div class="v12-universe-tile__bottom"><h3>${u.collection}</h3><p>${u.name}</p></div></a>`;

  function homeHero() {
    if (route() !== '/' || document.querySelector('.v12-campaign-hero')) return;
    const oldHero = app.querySelector('.hero');
    if (!oldHero) return;
    oldHero.classList.add('v12-home-existing-hero-hidden');
    oldHero.insertAdjacentHTML('beforebegin', `<section class="v12-campaign-hero" data-v12-campaign-hero><div class="v12-campaign-hero__copy"><p class="eyebrow">MISCA / lanzamiento 01</p><h1>Arte que puedes llevar.</h1><p class="lede">Dos prendas abren la tienda: una obra original de la casa y una adaptación documentada desde Archivo Abierto. El resto del universo puede crecer sin diluir el lanzamiento.</p><div class="v12-campaign-hero__actions"><a class="button" href="#/prendas">Ver Raíz + Ola</a><a class="button secondary" href="#/artistas">Explorar universos</a></div></div><div class="v12-campaign-hero__visuals"><a class="v12-campaign-shot" href="#/producto/raiz-de-concreto" data-asset-slot="raiz-home-campaign"><img src="${asset('raiz-campaign-study.svg')}" alt="Estudio conceptual de campaña de Raíz de concreto"><div class="v12-campaign-shot__meta"><strong>Raíz de concreto</strong><span>Alma Ríos · Entre grietas</span></div></a><a class="v12-campaign-shot" href="#/producto/ola-hokusai" data-asset-slot="ola-home-campaign"><img src="${asset('ola-garment-study.svg')}" alt="Estudio conceptual de prenda de Ola"><div class="v12-campaign-shot__meta"><strong>Ola</strong><span>Hokusai · Archivo Abierto</span></div></a></div></section>`);
  }

  function homeUniverseIndex() {
    if (route() !== '/' || document.querySelector('.v12-home-universes')) return;
    const oldWall = app.querySelector('.v11-home-wall');
    if (!oldWall) return;
    oldWall.style.display = 'none';
    oldWall.insertAdjacentHTML('afterend', `<section class="section v12-home-universes"><div class="wrap"><div class="v12-section-kicker"><div><p class="eyebrow">10 universos / 2 en lanzamiento</p><h2>Una marca puede ser amplia sin convertir todo en inventario.</h2></div><p>Cada colección tiene una firma visual propia. Solo Raíz y Ola entran hoy al recorrido comercial; las demás construyen continuidad creativa.</p></div><div class="v12-editorial-index">${universes.map(tile).join('')}</div><p class="v12-asset-note"><strong>Dirección editorial provisional.</strong> Cada slot está preparado para reemplazarse por los archivos exactos de campaña ya desarrollados cuando se incorporen al repositorio.</p></div></section>`);
  }

  function collectionIndex() {
    if (route() !== '/colecciones' || document.querySelector('.v12-collections-index')) return;
    const old = app.querySelector('.v11-collection-visuals');
    const anchor = old || app.querySelector('.page-hero');
    if (!anchor) return;
    if (old) old.style.display = 'none';
    anchor.insertAdjacentHTML('afterend', `<section class="section v12-collections-index"><div class="wrap"><div class="v12-section-kicker"><div><p class="eyebrow">Colecciones / mapa visual</p><h2>Dos visibles. Ocho construyendo el archivo de marca.</h2></div><p>La colección organiza deseo y relato; la disponibilidad sigue dependiendo de Product Ready y del surtido activo.</p></div><div class="v12-editorial-index">${universes.map(tile).join('')}</div></div></section>`);
  }

  function collectionDetail() {
    const r = route();
    if (!['/coleccion/entre-grietas','/coleccion/la-fuerza-del-agua'].includes(r) || document.querySelector('.v12-campaign-spread')) return;
    const hero = app.querySelector('.page-hero') || app.firstElementChild;
    if (!hero) return;
    const raiz = r.includes('entre-grietas');
    const img = raiz ? 'raiz-campaign-study.svg' : 'ola-garment-study.svg';
    const eyebrow = raiz ? 'Entre grietas / Alma Ríos' : 'La fuerza del agua / Hokusai';
    const title = raiz ? 'Lo que crece también cuenta historias.' : 'Todo cambia alrededor de lo que permanece.';
    const body = raiz ? 'Raíces, concreto y espacio negativo forman una colección que debe seguir funcionando incluso cuando cambie la prenda.' : 'La obra histórica entra con procedencia visible. La adaptación decide escala, silencio frontal y presencia posterior sin borrar el origen.';
    hero.insertAdjacentHTML('afterend', `<section class="v12-campaign-spread"><div class="v12-campaign-spread__visual" data-asset-slot="${raiz?'alma-rios':'hokusai'}-collection-hero"><img src="${asset(img)}" alt="Estudio editorial conceptual de ${eyebrow}"></div><div class="v12-campaign-spread__copy"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p class="lede">${body}</p><p class="v12-asset-note" style="color:#aaa69c">Estudio conceptual: no sustituye fotografía real ni evidencia de Product Ready.</p></div></section>`);
  }

  function stories() {
    if (route() !== '/historias' || document.querySelector('.v12-story-editorial')) return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    hero.insertAdjacentHTML('afterend', `<section class="section v12-story-editorial"><div class="wrap"><div class="v12-section-kicker"><div><p class="eyebrow">Editorial MISCA</p><h2>Historias con portada, no notas sueltas.</h2></div><p>Las historias explican decisiones de obra, producto y taller; no compiten con la compra.</p></div><div class="v12-story-covers"><article class="v12-story-cover" data-asset-slot="story-image-is-not-enough"><small>Historia 01 · método</small><div><h3>Una imagen no basta.</h3><p>Cómo una idea pasa de universo visual a producto sin convertirse en un estampado suelto.</p></div></article><article class="v12-story-cover" data-asset-slot="story-hokusai"><small>Historia 02 · Archivo Abierto</small><div><h3>Cómo entra Hokusai.</h3><p>Obra, procedencia, adaptación y límites antes de imprimir.</p></div></article><article class="v12-story-cover" data-asset-slot="story-product-ready"><small>Historia 03 · producto</small><div><h3>Qué significa Product Ready.</h3><p>La diferencia entre que una camiseta exista y que esté lista para venderse.</p></div></article></div></div></section>`);
  }

  function archiveLedger() {
    if (route() !== '/archivo' || document.querySelector('.v12-archive-ledger-section')) return;
    const index = app.querySelector('.v11-archive-index');
    const anchor = index || app.querySelector('.page-hero');
    if (!anchor) return;
    const archive = [
      ['Hokusai','La fuerza del agua','The Met · JP1847','Producto visible · Ola'],
      ['William Morris','Naturaleza repetida','Fuente institucional / dossier','Desarrollo'],
      ['Alphonse Mucha','Las estaciones','AIC · CC0 · ref. 1982.435','Desarrollo'],
      ['Vincent van Gogh','El paisaje se mueve','The Met · Public Domain','Desarrollo'],
      ['Claude Monet','Jardines de luz','NGA / AIC · PD / CC0','Desarrollo']
    ];
    anchor.insertAdjacentHTML('afterend', `<section class="section archive-band v12-archive-ledger-section"><div class="wrap"><div class="v12-section-kicker"><div><p class="eyebrow muted">Archivo Abierto / cinco universos</p><h2>La fuente permanece visible.</h2></div><p style="color:#aaa69c">El archivo histórico no usa imágenes generadas como fuente de producción. Campaña y adaptación pertenecen a otra capa.</p></div><div class="v12-archive-ledger">${archive.map(x=>`<div><small>${x[0]}</small><strong>${x[1]}</strong><p>${x[2]}</p><p>${x[3]}</p></div>`).join('')}</div></div></section>`);
  }

  function artistPage() {
    const m = route().match(/^\/artista\/(.+)$/);
    if (!m || document.querySelector('.v12-artist-note')) return;
    const u = universes.find(x=>x.key===m[1]);
    if (!u) return;
    const campaign = app.querySelector('.v11-artist-campaign');
    if (!campaign) return;
    campaign.insertAdjacentHTML('afterbegin', `<div class="wrap v12-artist-note"><div class="v12-section-kicker"><div><p class="eyebrow">Sistema de campaña</p><h2>${u.collection}</h2></div><p>Retrato/gesto · obra/detalle · prenda/contexto. La estructura ya está preparada para recibir los archivos exactos del paquete visual.</p></div></div>`);
  }

  function enhance() {
    homeHero();
    homeUniverseIndex();
    collectionIndex();
    collectionDetail();
    stories();
    archiveLedger();
    artistPage();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>requestAnimationFrame(enhance));
  enhance();
})();