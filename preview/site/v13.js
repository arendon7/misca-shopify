(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const assets = {
    'alma-rios':'./assets/universes/alma-rios-entre-grietas.svg',
    'tomas-muro':'./assets/universes/tomas-muro-muros-que-hablan.svg',
    'nina-cobalto':'./assets/universes/nina-cobalto-frecuencia.svg',
    'simon-bestiario':'./assets/universes/simon-bestiario-animales-del-ruido.svg',
    'vera-montana':'./assets/universes/vera-montana-ciudad-vertical.svg',
    'hokusai':'./assets/universes/hokusai-la-fuerza-del-agua.svg',
    'william-morris':'./assets/universes/william-morris-naturaleza-repetida.svg',
    'mucha':'./assets/universes/alphonse-mucha-las-estaciones.svg',
    'van-gogh':'./assets/universes/van-gogh-el-paisaje-se-mueve.svg',
    'monet':'./assets/universes/monet-jardines-de-luz.svg'
  };

  const alt = {
    'alma-rios':'Dirección editorial de Alma Ríos para Entre grietas',
    'tomas-muro':'Dirección editorial de Tomás Muro para Muros que hablan',
    'nina-cobalto':'Dirección editorial de Nina Cobalto para Frecuencia',
    'simon-bestiario':'Dirección editorial de Simón Bestiario para Animales del ruido',
    'vera-montana':'Dirección editorial de Vera Montaña para Ciudad vertical',
    'hokusai':'Dirección editorial de Archivo Abierto para Hokusai y La fuerza del agua',
    'william-morris':'Dirección editorial de Archivo Abierto para William Morris y Naturaleza repetida',
    'mucha':'Dirección editorial de Archivo Abierto para Alphonse Mucha y Las estaciones',
    'van-gogh':'Dirección editorial de Archivo Abierto para Van Gogh y El paisaje se mueve',
    'monet':'Dirección editorial de Archivo Abierto para Monet y Jardines de luz'
  };

  const keys = Object.keys(assets).sort((a,b)=>b.length-a.length);
  const keyForSlot = slot => keys.find(k => slot === k || slot.startsWith(`${k}-`));

  function imageFor(key, slot) {
    const img = document.createElement('img');
    img.className = 'v13-static-asset';
    img.src = assets[key];
    img.alt = alt[key];
    img.loading = 'lazy';
    img.decoding = 'async';
    img.dataset.assetMaster = key;
    img.dataset.assetSlot = slot;
    if (/-(2|detail|crop|story)$/.test(slot)) img.classList.add('v13-crop-detail');
    if (/-(3|wide|collection-hero)$/.test(slot)) img.classList.add('v13-crop-wide');
    return img;
  }

  function bindSlots() {
    document.querySelectorAll('[data-asset-slot]').forEach(node => {
      if (node.dataset.v13Bound === '1') return;
      const slot = node.dataset.assetSlot || '';
      const key = keyForSlot(slot);
      if (!key) return;
      node.dataset.v13Bound = '1';
      node.dataset.assetSource = 'static-master-v1';

      if (node.matches('.v11-visual')) {
        const svg = node.querySelector(':scope > svg');
        if (svg) svg.replaceWith(imageFor(key, slot));
        return;
      }

      if (node.matches('.v12-universe-tile')) {
        node.prepend(imageFor(key, slot));
        return;
      }

      if (node.matches('.v12-story-cover')) {
        node.prepend(imageFor(key, slot));
        return;
      }

      const existing = node.querySelector('img');
      if (!existing && !node.matches('[data-v12-campaign-hero]')) node.prepend(imageFor(key, slot));
    });
  }

  function bindStoryCovers() {
    const mapping = {
      'story-image-is-not-enough':'alma-rios',
      'story-hokusai':'hokusai'
    };
    Object.entries(mapping).forEach(([slot,key]) => {
      const node = document.querySelector(`[data-asset-slot="${slot}"]`);
      if (!node || node.dataset.v13Bound === '1') return;
      node.dataset.v13Bound = '1';
      node.dataset.assetSource = 'static-master-v1';
      node.prepend(imageFor(key, slot));
    });

    const ready = document.querySelector('[data-asset-slot="story-product-ready"]');
    if (ready && ready.dataset.v13Bound !== '1') {
      ready.dataset.v13Bound = '1';
      ready.dataset.assetSource = 'product-study-v8';
      const img = document.createElement('img');
      img.className = 'v13-static-asset';
      img.src = './assets/raiz-campaign-study.svg';
      img.alt = 'Estudio conceptual de Raíz de concreto utilizado para explicar Product Ready';
      img.loading = 'lazy';
      ready.prepend(img);
    }
  }

  function addAssetLibraryNote() {
    const route = (location.hash || '#/').slice(1);
    if (route !== '/artistas' || document.querySelector('.v13-library-note')) return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    hero.insertAdjacentHTML('afterend', `<section class="v13-library-note"><div class="wrap"><span>Biblioteca visual V1</span><p>Diez masters de universo versionados. La estructura admite sustituir cada master por fotografía o campaña final sin modificar la arquitectura de la tienda.</p></div></section>`);
  }

  function enhance() {
    bindSlots();
    bindStoryCovers();
    addAssetLibraryNote();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>requestAnimationFrame(enhance));
  enhance();
})();