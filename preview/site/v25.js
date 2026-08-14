(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const G25 = './assets/generated/v25/';
  const G37 = './assets/generated/v37/';
  const photos = {
    raiz: `${G37}raiz-campaign.webp`,
    raizPdp: `${G37}raiz-pdp.webp`,
    ola: `${G37}ola-editorial.webp`,
    alma: `${G25}alma-studio.webp`,
    creators: `${G25}creators-studio.webp`
  };
  const route = () => (location.hash || '#/').slice(1).split('?')[0];

  function swapImage(el, src, alt, eager = false) {
    if (!el) return;
    if (el.getAttribute('src') !== src) el.setAttribute('src', src);
    el.setAttribute('alt', alt);
    el.classList.add('v25-photo');
    el.dataset.v25Photo = 'concept';
    if (eager) {
      el.setAttribute('loading', 'eager');
      el.setAttribute('fetchpriority', 'high');
    }
  }

  function label(container, text = 'Visual conceptual · muestra física pendiente') {
    if (!container || container.querySelector(':scope > .v25-concept-label')) return;
    const span = document.createElement('span');
    span.className = 'v25-concept-label';
    span.textContent = text;
    container.appendChild(span);
  }

  function productCards() {
    const cards = [...app.querySelectorAll('.v23-product-card')];
    if (cards[0]) {
      const media = cards[0].querySelector('.v23-product-card__media');
      swapImage(media?.querySelector('.v23-primary'), photos.raiz, 'Raíz de concreto · visual conceptual de campaña');
      label(media);
    }
    if (cards[1]) {
      const media = cards[1].querySelector('.v23-product-card__media');
      swapImage(media?.querySelector('.v23-primary'), photos.ola, 'Ola · visual conceptual de campaña');
      label(media);
    }
  }

  function chromePhotos() {
    document.querySelectorAll('.v29-mobile-products a,.v29-search-feature a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const img = link.querySelector('img');
      if (href.includes('raiz-de-concreto')) swapImage(img, photos.raiz, 'Raíz de concreto · visual conceptual');
      if (href.includes('ola-hokusai')) swapImage(img, photos.ola, 'Ola · visual conceptual');
    });
  }

  function home() {
    const main = app.querySelector('.v23-hero-frame--main');
    const top = app.querySelector('.v23-hero-frame--top');
    swapImage(main?.querySelector('img'), photos.raiz, 'Raíz de concreto · visual conceptual de campaña', true);
    swapImage(top?.querySelector('img'), photos.ola, 'Ola · visual conceptual de campaña', true);
    if (main?.querySelector('figcaption')) main.querySelector('figcaption').textContent = 'Raíz de concreto · visual conceptual';
    if (top?.querySelector('figcaption')) top.querySelector('figcaption').textContent = 'Ola · visual conceptual';
    productCards();

    const editorial = app.querySelector('.v23-editorial-split__visual');
    swapImage(editorial?.querySelector('img'), photos.raiz, 'Raíz de concreto · campaña conceptual');
    label(editorial);

    const editorialSection = app.querySelector('.v23-editorial-split');
    if (editorialSection && !app.querySelector('.v25-home-process')) {
      editorialSection.insertAdjacentHTML('afterend', `<section class="v25-home-process"><figure><img src="${photos.alma}" alt="Alma Ríos · estudio creativo conceptual" loading="lazy"><span class="v25-concept-label">Escena editorial conceptual</span></figure><div><p class="v23-kicker">Detrás de la colección</p><h2>La obra también necesita mesa de trabajo.</h2><p>Antes de llegar a la prenda hay bocetos, decisiones, pruebas de composición y criterio. La artista no es un nombre junto al producto: es el origen de la colección.</p><a class="v23-button is-secondary" href="#/artistas">Conocer a Alma Ríos</a></div></section>`);
    }

    const archiveVisual = app.querySelector('.v23-dark-story__visual');
    if (archiveVisual) {
      const targets = archiveVisual.querySelectorAll('img');
      swapImage(targets[0], photos.ola, 'Ola · campaña conceptual de Archivo Abierto');
      label(archiveVisual, 'Campaña conceptual · la obra fuente se documenta por separado');
    }
  }

  function artists() {
    const intro = app.querySelector('.v23-page-intro--visual > div:last-child');
    swapImage(intro?.querySelector('img'), photos.raiz, 'Raíz de concreto · campaña conceptual de Alma Ríos');
    label(intro);
    const feature = app.querySelector('.v23-artist-feature > div:first-child');
    swapImage(feature?.querySelector('img'), photos.raiz, 'Raíz de concreto · campaña conceptual');
    label(feature);
    const featureBlock = app.querySelector('.v23-artist-feature');
    if (featureBlock && !app.querySelector('.v25-artist-process')) {
      featureBlock.insertAdjacentHTML('afterend', `<figure class="v25-artist-process"><img src="${photos.alma}" alt="Alma Ríos · proceso creativo conceptual" loading="lazy"><figcaption>Alma Ríos · escena editorial de proceso</figcaption><span class="v25-concept-label">Escena editorial conceptual</span></figure>`);
    }
  }

  function collections() {
    const spreads = app.querySelectorAll('.v23-collection-spread');
    if (spreads[0]) {
      const media = spreads[0].querySelector('.v23-collection-spread__media');
      const imgs = media?.querySelectorAll('img');
      swapImage(imgs?.[1], photos.raiz, 'Raíz de concreto · visual conceptual de campaña');
      label(media);
    }
    if (spreads[1]) {
      const media = spreads[1].querySelector('.v23-collection-spread__media');
      const imgs = media?.querySelectorAll('img');
      swapImage(imgs?.[0], photos.ola, 'Ola · visual conceptual de campaña');
      label(media);
    }
  }

  function stories() {
    const hero = app.querySelector('.v23-story-hero-grid');
    const heroImgs = hero?.querySelectorAll('img');
    swapImage(heroImgs?.[0], photos.raiz, 'Raíz de concreto · visual conceptual de campaña');
    swapImage(heroImgs?.[1], photos.ola, 'Ola · visual conceptual de campaña');
    label(hero);

    const cards = app.querySelectorAll('.v23-story-card');
    swapImage(cards[0]?.querySelector('img'), photos.raiz, 'Raíz de concreto · campaña conceptual');
    swapImage(cards[1]?.querySelector('img'), photos.ola, 'Ola · campaña conceptual');
    const systemMosaic = cards[2]?.querySelector('.v23-story-card__mosaic');
    if (systemMosaic) {
      const imgs = systemMosaic.querySelectorAll('img');
      swapImage(imgs[0], photos.creators, 'MISCA · escena conceptual de estudio y operación');
      systemMosaic.classList.add('v25-story-studio');
      label(systemMosaic, 'Escena editorial conceptual');
    }
  }

  function creators() {
    const collage = app.querySelector('.v23-creators-collage');
    if (!collage) return;
    const imgs = collage.querySelectorAll('img');
    swapImage(imgs[0], photos.creators, 'MISCA · estudio conceptual con creadores');
    collage.classList.add('v25-creators-studio');
    label(collage, 'Escena editorial conceptual · modelo de servicio');
  }

  function archive() {
    const visual = app.querySelector('.v23-archive-hero__visual');
    const imgs = visual?.querySelectorAll('img');
    swapImage(imgs?.[1], photos.ola, 'Ola · adaptación visual conceptual');
    label(visual, 'Adaptación conceptual · la obra fuente permanece separada');
  }

  function collectionDetail(r) {
    const gallery = app.querySelector('.v23-collection-gallery');
    const first = gallery?.querySelector('figure:first-child');
    swapImage(first?.querySelector('img'), r.endsWith('entre-grietas') ? photos.raiz : photos.ola, `${r.endsWith('entre-grietas') ? 'Raíz de concreto' : 'Ola'} · campaña conceptual`);
    if (first?.querySelector('figcaption')) first.querySelector('figcaption').textContent = 'Campaña conceptual';
    label(first);
  }

  function pdp(r) {
    const raiz = r.endsWith('raiz-de-concreto');
    const editorial = app.querySelector('.v23-pdp-editorial');
    if (!editorial) return;
    const firstFigure = editorial.querySelector('figure');
    swapImage(firstFigure?.querySelector('img'), raiz ? photos.raizPdp : photos.ola, `${raiz ? 'Raíz de concreto' : 'Ola'} · visual conceptual de campaña`);
    label(firstFigure);
    editorial.classList.add('v25-pdp-editorial');
  }

  function apply() {
    document.body.classList.add('v25-photo-live', 'v37-asset-live');
    const r = route();
    if (r === '/') home();
    else if (r === '/prendas' || r === '/nuevo') productCards();
    else if (r === '/artistas') artists();
    else if (r === '/colecciones') collections();
    else if (r === '/historias') stories();
    else if (r === '/creadores') creators();
    else if (r === '/archivo') archive();
    else if (r === '/coleccion/entre-grietas' || r === '/coleccion/la-fuerza-del-agua') collectionDetail(r);
    else if (r === '/producto/raiz-de-concreto' || r === '/producto/ola-hokusai') pdp(r);
    chromePhotos();
  }

  function schedule() {
    window.setTimeout(apply, 260);
    window.setTimeout(apply, 520);
    window.setTimeout(apply, 760);
  }

  const searchResults = document.getElementById('searchResults');
  if (searchResults) new MutationObserver(() => requestAnimationFrame(chromePhotos)).observe(searchResults, { childList:true, subtree:true });

  window.addEventListener('hashchange', schedule);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
})();