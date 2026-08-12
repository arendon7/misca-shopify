(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const registry = {
    'alma-rios': {name:'Alma Ríos', collection:'Entre grietas', type:'house', motif:'root', tone:'#e9e0cf', ink:'#181714', accent:'#66704d'},
    'tomas-muro': {name:'Tomás Muro', collection:'Muros que hablan', type:'house', motif:'wall', tone:'#c9b7a0', ink:'#25201b', accent:'#9a3f31'},
    'nina-cobalto': {name:'Nina Cobalto', collection:'Frecuencia', type:'house', motif:'geo', tone:'#d7d5cb', ink:'#17202c', accent:'#2d55a0'},
    'simon-bestiario': {name:'Simón Bestiario', collection:'Animales del ruido', type:'house', motif:'beast', tone:'#d7c5a3', ink:'#1c1712', accent:'#a34f2c'},
    'vera-montana': {name:'Vera Montaña', collection:'Ciudad vertical', type:'house', motif:'city', tone:'#c7c7bd', ink:'#252723', accent:'#63705e'},
    'hokusai': {name:'Katsushika Hokusai', collection:'La fuerza del agua', type:'archive', motif:'wave', tone:'#d9d5ca', ink:'#14273a', accent:'#7194aa'},
    'william-morris': {name:'William Morris', collection:'Naturaleza repetida', type:'archive', motif:'morris', tone:'#d9c6a3', ink:'#233329', accent:'#a14d3e'},
    'van-gogh': {name:'Vincent van Gogh', collection:'El paisaje se mueve', type:'archive', motif:'cypress', tone:'#d8c98f', ink:'#243528', accent:'#456a5a'},
    'monet': {name:'Claude Monet', collection:'Jardines de luz', type:'archive', motif:'water', tone:'#cbd6cf', ink:'#334c4c', accent:'#8e7f9a'}
  };

  const path = () => (location.hash || '#/').slice(1);

  function motifSVG(key, variant=1) {
    const d = registry[key];
    if (!d) return '';
    const label = d.type === 'house' ? 'DIRECCIÓN VISUAL DEL PROYECTO' : 'ARCHIVO / ADAPTACIÓN';
    const common = `<rect width="900" height="1100" fill="${d.tone}"/><text x="48" y="72" font-family="Arial" font-size="16" letter-spacing="3" fill="${d.ink}" opacity=".65">${label}</text><text x="48" y="1024" font-family="Arial" font-size="18" letter-spacing="2" fill="${d.ink}">${d.name.toUpperCase()}</text><text x="48" y="1056" font-family="Arial" font-size="13" letter-spacing="1.8" fill="${d.ink}" opacity=".7">${d.collection.toUpperCase()}</text>`;
    let art = '';
    if (d.motif === 'root') art = `<g fill="none" stroke-linecap="round"><path d="M-20 1030C150 870 175 700 290 560S420 350 422 130" stroke="${d.ink}" stroke-width="16"/><path d="M105 1100C200 900 335 840 405 680S520 430 690 310" stroke="${d.accent}" stroke-width="10"/><path d="M185 775C320 750 365 650 410 580M330 650C470 610 520 515 562 428M110 900C245 860 300 790 334 720" stroke="${d.ink}" stroke-width="7"/></g>`;
    if (d.motif === 'wall') art = `<g><rect x="70" y="170" width="610" height="690" fill="#8e7866"/><rect x="160" y="250" width="560" height="650" fill="#b69c82" opacity=".88"/><path d="M120 410h650M95 615h690M260 185v715M520 180v730" stroke="${d.ink}" stroke-width="7" opacity=".65"/><text x="285" y="565" font-family="Arial Black" font-size="130" fill="${d.accent}" opacity=".88">12</text><path d="M95 320c180 55 360 35 640-35" fill="none" stroke="#e1d4c2" stroke-width="28" opacity=".65"/></g>`;
    if (d.motif === 'geo') art = `<g fill="none" stroke="${d.ink}"><circle cx="300" cy="400" r="155" stroke-width="28"/><rect x="440" y="260" width="250" height="250" stroke="${d.accent}" stroke-width="32" transform="rotate(16 565 385)"/><path d="M120 760h620M180 825h500" stroke-width="22"/><circle cx="650" cy="720" r="70" fill="${d.accent}" stroke="none"/></g>`;
    if (d.motif === 'beast') art = `<g fill="${d.ink}"><path d="M225 760c-70-155-55-340 58-433 80-66 212-67 300-8 120 80 147 273 77 435-60 140-165 215-273 215S289 902 225 760Z"/><circle cx="340" cy="500" r="26" fill="${d.tone}"/><circle cx="535" cy="500" r="26" fill="${d.tone}"/><path d="M305 625c80 44 170 44 252 0" fill="none" stroke="${d.accent}" stroke-width="18" stroke-linecap="round"/><path d="M270 305 180 188 330 250M570 305l100-122-30 164"/></g>`;
    if (d.motif === 'city') art = `<g><path d="M0 820 180 550 305 665 455 420 610 590 900 300v800H0Z" fill="${d.accent}" opacity=".75"/><g fill="${d.ink}" opacity=".9"><rect x="100" y="650" width="75" height="255"/><rect x="205" y="590" width="95" height="315"/><rect x="335" y="710" width="70" height="195"/><rect x="455" y="620" width="110" height="285"/><rect x="605" y="535" width="85" height="370"/></g><path d="M0 470c230-90 450-75 900 5" fill="none" stroke="#f1efe8" stroke-width="70" opacity=".38"/></g>`;
    if (d.motif === 'wave') art = `<g fill="none" stroke-linecap="round"><path d="M65 650c165-290 340-400 510-260 105 86 190 73 300-34-50 130-144 214-275 232 100 26 180 94 235 203-160-104-319-102-475 0-105 69-205 67-295-141Z" stroke="${d.ink}" stroke-width="30"/><path d="M120 720c150-130 300-160 455-78 120 63 210 54 300 12" stroke="${d.accent}" stroke-width="16"/><path d="M300 290 360 230l60 60-60 14Z" fill="${d.ink}" stroke="none" opacity=".65"/></g>`;
    if (d.motif === 'morris') art = `<g fill="none" stroke="${d.ink}" stroke-width="11"><path d="M120 1030C100 680 230 410 480 165M350 1080C300 760 410 510 700 270M-30 720C200 730 390 630 505 455M230 520C430 560 620 500 820 330"/><g fill="${d.accent}" stroke="none"><circle cx="260" cy="555" r="42"/><circle cx="510" cy="420" r="48"/><circle cx="635" cy="650" r="40"/><circle cx="380" cy="800" r="44"/></g></g>`;
    if (d.motif === 'cypress') art = `<g><path d="M360 960c-70-210-45-470 35-710 35-105 105-105 142 5 62 185 80 460 15 705Z" fill="${d.ink}"/><path d="M0 790c170-130 330-145 485-65 145 75 280 55 415-30v405H0Z" fill="${d.accent}" opacity=".8"/><path d="M40 340c180-90 380-90 760 20" fill="none" stroke="#eee5ad" stroke-width="44" opacity=".8"/></g>`;
    if (d.motif === 'water') art = `<g><rect y="180" width="900" height="700" fill="${d.accent}" opacity=".28"/><g fill="#f4ede4" opacity=".82"><ellipse cx="180" cy="370" rx="90" ry="24"/><ellipse cx="410" cy="520" rx="115" ry="30"/><ellipse cx="690" cy="340" rx="86" ry="22"/><ellipse cx="650" cy="700" rx="125" ry="34"/></g><path d="M80 620c210-250 420-265 720-45" fill="none" stroke="${d.ink}" stroke-width="24"/><path d="M92 632c205-130 430-120 700 15" fill="none" stroke="#f0d5ca" stroke-width="18" opacity=".9"/></g>`;
    if (variant === 2) art = `<g transform="translate(900 0) scale(-1 1)">${art}</g>`;
    return `<svg viewBox="0 0 900 1100" role="img" aria-label="Estudio visual de ${d.name}">${common}${art}</svg>`;
  }

  function panel(key, variant=1, cls='') {
    const d = registry[key];
    return `<figure class="v11-visual ${cls}" data-asset-slot="${key}-${variant}">${motifSVG(key,variant)}<figcaption><span>${d.name}</span><small>${d.collection} · estudio editorial</small></figcaption></figure>`;
  }

  function enhanceArtistCards() {
    document.querySelectorAll('.artist-card').forEach(card => {
      if (card.dataset.v11 === '1') return;
      const href = card.getAttribute('href') || '';
      const key = href.split('/').pop();
      if (!registry[key]) return;
      card.dataset.v11 = '1';
      card.insertAdjacentHTML('afterbegin', panel(key,1,'v11-card-visual'));
    });
  }

  function homeVisualWall() {
    if (path() !== '/' || document.querySelector('.v11-home-wall')) return;
    const sections = [...app.querySelectorAll('.section')];
    const artistSection = sections.find(s => s.textContent.includes('Cinco voces'));
    if (!artistSection) return;
    const html = `<section class="section v11-home-wall"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Dirección visual</p><h2>Cada universo debe reconocerse antes de leer su nombre.</h2></div><p>La imagen no decora la marca: construye el sistema de descubrimiento.</p></div><div class="v11-mosaic">${panel('alma-rios',1,'v11-tall')}${panel('tomas-muro',1)}${panel('nina-cobalto',1)}${panel('simon-bestiario',1)}${panel('vera-montana',1,'v11-wide')}</div></div></section>`;
    artistSection.insertAdjacentHTML('afterend', html);
  }

  function artistCampaign() {
    const m = path().match(/^\/artista\/(.+)$/);
    if (!m || document.querySelector('.v11-artist-campaign')) return;
    const key = m[1];
    if (!registry[key]) return;
    const hero = app.querySelector('.artist-page-hero');
    if (!hero) return;
    hero.insertAdjacentHTML('afterend', `<section class="section v11-artist-campaign"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Universo visual</p><h2>${registry[key].collection}</h2></div><p>Secuencia editorial de referencia. Los archivos exactos de campaña podrán sustituir estas composiciones sin cambiar la estructura.</p></div><div class="v11-campaign-strip">${panel(key,1)}${panel(key,2)}${panel(key,1)}</div></div></section>`);
  }

  function archiveVisualIndex() {
    if (path() !== '/archivo' || document.querySelector('.v11-archive-index')) return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    const keys = ['hokusai','william-morris','van-gogh','monet'];
    hero.insertAdjacentHTML('afterend', `<section class="section v11-archive-index"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Archivo visual</p><h2>Obra → fuente → adaptación.</h2></div><p>La obra histórica conserva procedencia; la dirección de campaña pertenece a MISCA.</p></div><div class="v11-archive-grid">${keys.map(k=>panel(k,1)).join('')}</div></div></section>`);
  }

  function collectionVisuals() {
    if (path() !== '/colecciones' || document.querySelector('.v11-collection-visuals')) return;
    const hero = app.querySelector('.page-hero');
    if (!hero) return;
    hero.insertAdjacentHTML('afterend', `<section class="section v11-collection-visuals"><div class="wrap"><div class="v11-duo"><div>${panel('alma-rios',1)}<h3>Entre grietas</h3><p>Botánica, concreto y espacio negativo.</p></div><div>${panel('hokusai',1)}<h3>La fuerza del agua</h3><p>Fuente histórica, adaptación y prenda.</p></div></div></div></section>`);
  }

  function productCampaign() {
    const r = path();
    if (!r.startsWith('/producto/') || document.querySelector('.v11-product-campaign')) return;
    let key = '';
    if (r.endsWith('raiz-de-concreto')) key = 'alma-rios';
    if (r.endsWith('ola-hokusai')) key = 'hokusai';
    if (!key) return;
    const story = app.querySelector('.story-split');
    if (!story) return;
    story.insertAdjacentHTML('beforebegin', `<section class="section v11-product-campaign"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Campaña / contexto</p><h2>La prenda dentro de su universo.</h2></div><p>Estas superficies sirven para construir campaña, colección y producto como una sola experiencia visual.</p></div><div class="v11-product-triptych">${panel(key,1)}${panel(key,2)}${panel(key,1)}</div></div></section>`);
  }

  function enhance() {
    enhanceArtistCards();
    homeVisualWall();
    artistCampaign();
    archiveVisualIndex();
    collectionVisuals();
    productCampaign();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>requestAnimationFrame(enhance));
  enhance();
})();