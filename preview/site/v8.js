(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1);
  const active = {
    'raiz-de-concreto': { kind:'raiz', title:'Raíz de concreto', tone:'#eee7d8', ink:'#171713', accent:'#5d6845' },
    'ola-hokusai': { kind:'ola', title:'Ola', tone:'#132437', ink:'#ece9df', accent:'#8aa9bc' }
  };

  const defs = (id, tone) => `
    <defs>
      <linearGradient id="${id}-shirt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tone}"/><stop offset=".55" stop-color="${tone}"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
      <linearGradient id="${id}-shade" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient>
      <filter id="${id}-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000" flood-opacity=".22"/></filter>
      <filter id="${id}-grain" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="8" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="mono"/><feComponentTransfer in="mono"><feFuncA type="table" tableValues="0 .07"/></feComponentTransfer></filter>
      <clipPath id="${id}-clip"><path d="M220 132 150 174 72 130 18 240 107 286 129 590 471 590 493 286 582 240 528 130 450 174 380 132c-16 40-45 61-80 61s-64-21-80-61Z"/></clipPath>
    </defs>`;

  const shirtBase = (id, tone, dark=false) => `
    <g filter="url(#${id}-shadow)">
      <path d="M220 132 150 174 72 130 18 240 107 286 129 590 471 590 493 286 582 240 528 130 450 174 380 132c-16 40-45 61-80 61s-64-21-80-61Z" fill="url(#${id}-shirt)" stroke="${dark?'#31485a':'#cfc5b4'}" stroke-width="2"/>
      <path d="M220 132c20 61 52 91 80 91s60-30 80-91" fill="none" stroke="${dark?'#30475b':'#c8beac'}" stroke-width="5" opacity=".7"/>
      <path d="M150 174 107 286M450 174l43 112M129 570h342" fill="none" stroke="${dark?'#21394c':'#c4baa8'}" stroke-width="2" opacity=".7"/>
      <path d="M220 132 150 174 72 130 18 240 107 286 129 590 471 590 493 286 582 240 528 130 450 174 380 132c-16 40-45 61-80 61s-64-21-80-61Z" fill="url(#${id}-shade)" opacity=".38"/>
      <path d="M220 132 150 174 72 130 18 240 107 286 129 590 471 590 493 286 582 240 528 130 450 174 380 132c-16 40-45 61-80 61s-64-21-80-61Z" filter="url(#${id}-grain)" fill="#fff" opacity=".5"/>
    </g>`;

  const rootArt = (view) => {
    const dense = view === 'back' || view === 'detail';
    return `<g fill="none" stroke-linecap="round" clip-path="url(#raiz-${view}-clip)">
      <path d="M155 575c32-82 54-130 111-176 54-43 63-88 64-150" stroke="#20201c" stroke-width="7"/>
      <path d="M188 560c3-80 45-111 74-143 36-39 40-85 22-129" stroke="#20201c" stroke-width="4"/>
      <path d="M119 545c46-41 70-78 74-128 3-43 33-76 83-102" stroke="#5d6845" stroke-width="5"/>
      <path d="M228 530c40-33 64-65 69-112 6-52 38-91 87-116" stroke="#5d6845" stroke-width="3"/>
      ${dense?`<path d="M278 585c-8-58 17-93 56-125 37-30 58-66 58-109" stroke="#20201c" stroke-width="5"/><path d="M327 560c13-61 43-88 84-114 31-20 48-49 57-92" stroke="#5d6845" stroke-width="4"/><path d="M151 472c57-15 89-38 108-76M193 430c42-7 68-26 88-58M310 466c39-10 67-29 89-57" stroke="#20201c" stroke-width="3"/>`:''}
    </g>`;
  };

  const waveArt = (view) => {
    if (view === 'front') return `<g clip-path="url(#ola-front-clip)"><path d="M336 288c34-29 70-34 106-13-29-6-45 7-59 28 30-8 54 2 72 30-41-14-73-2-98 37 7-30 0-57-21-82Z" fill="none" stroke="#dce5e7" stroke-width="8"/><path d="M208 280 238 248l29 32-30 6Z" fill="#d8d7c8" opacity=".85"/></g>`;
    return `<g clip-path="url(#ola-${view}-clip)" fill="none" stroke-linecap="round"><path d="M86 420c71-120 153-164 245-131 63 23 104 11 153-32-17 45-51 76-101 93 47-2 87 20 116 67-61-35-124-37-185-5-59 31-118 33-228 8Z" stroke="#dce5e7" stroke-width="15"/><path d="M96 447c92-78 170-96 239-58 54 30 103 24 148-18M121 472c82-44 152-53 211-27 55 24 101 20 139-10" stroke="#7fa6bd" stroke-width="7"/><path d="M151 360c24-45 57-75 97-89M205 340c22-31 49-50 83-59M347 324c29-14 57-17 85-7" stroke="#dce5e7" stroke-width="5"/></g>`;
  };

  function garmentSVG(kind, view='front') {
    const dark = kind === 'ola';
    const tone = dark ? '#172c40' : '#ede6d8';
    const id = `${kind}-${view}`;
    const art = kind === 'raiz' ? rootArt(view) : waveArt(view);
    const bg = dark ? '#d7d4cd' : '#d9d1c3';
    return `<svg class="v8-garment-svg" viewBox="0 0 600 680" role="img" aria-label="Estudio conceptual ${view} de ${kind==='raiz'?'Raíz de concreto':'Ola'}">
      ${defs(id,tone)}
      <rect width="600" height="680" fill="${bg}"/>
      <ellipse cx="300" cy="617" rx="190" ry="28" fill="#000" opacity=".09"/>
      ${shirtBase(id,tone,dark)}
      ${art}
      <g font-family="Arial,Helvetica,sans-serif" fill="${dark?'#56616c':'#5d5951'}"><text x="30" y="42" font-size="13" letter-spacing="2.2">ESTUDIO CONCEPTUAL · ${view.toUpperCase()}</text><text x="30" y="642" font-size="11" letter-spacing="1.5">NO FOTOGRAFÍA FINAL · PRODUCT READY PENDIENTE</text></g>
    </svg>`;
  }

  function detailSVG(kind) {
    const dark = kind === 'ola';
    const id = `${kind}-detail`;
    const base = dark ? '#172c40' : '#ede6d8';
    return `<svg class="v8-garment-svg" viewBox="0 0 600 680" role="img" aria-label="Detalle conceptual de ${kind==='raiz'?'Raíz de concreto':'Ola'}">
      <defs><filter id="${id}-grain"><feTurbulence baseFrequency=".65" numOctaves="3" seed="4"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .11"/></feComponentTransfer></filter></defs>
      <rect width="600" height="680" fill="${base}"/><rect width="600" height="680" fill="#fff" filter="url(#${id}-grain)" opacity=".75"/>
      ${kind==='raiz'?`<g fill="none" stroke-linecap="round"><path d="M-20 660c112-94 156-162 158-252 2-70 52-133 151-188" stroke="#20201c" stroke-width="18"/><path d="M72 700c71-101 125-157 194-198 72-43 120-98 144-178" stroke="#5d6845" stroke-width="12"/><path d="M123 475c81-24 134-62 161-117M235 528c93-19 154-55 187-108" stroke="#20201c" stroke-width="8"/></g>`:`<g fill="none" stroke-linecap="round"><path d="M-70 470c146-178 299-214 457-107 76 52 152 38 234-42" stroke="#e5edf0" stroke-width="28"/><path d="M-35 527c137-100 265-118 384-54 101 55 183 52 274 3" stroke="#7fa6bd" stroke-width="15"/><path d="M96 365c40-55 87-89 141-101M194 393c46-43 98-68 155-74" stroke="#e5edf0" stroke-width="10"/></g>`}
      <path d="M0 570c140-12 297-11 600 8" fill="none" stroke="${dark?'#31485b':'#c3b9a7'}" stroke-width="5" stroke-dasharray="6 8" opacity=".75"/>
      <g font-family="Arial,Helvetica,sans-serif" fill="${dark?'#cbd5d9':'#59554e'}"><text x="28" y="42" font-size="13" letter-spacing="2.2">DETALLE · ESTUDIO CONCEPTUAL</text><text x="28" y="642" font-size="11" letter-spacing="1.4">TEXTURA / BORDE / CONTINUIDAD · PENDIENTE DE MUESTRA FÍSICA</text></g>
    </svg>`;
  }

  function visual(kind, view) { return view === 'detail' ? detailSVG(kind) : garmentSVG(kind, view); }

  function replaceCard(card, kind) {
    if (card.dataset.v8Visual === 'true') return;
    const media = card.querySelector('.product-media');
    if (!media) return;
    card.dataset.v8Visual = 'true';
    media.querySelector('.shirt')?.remove();
    const old = media.querySelector('.v8-card-visual');
    if (!old) {
      const box = document.createElement('div');
      box.className = 'v8-card-visual';
      box.innerHTML = visual(kind,'front');
      media.prepend(box);
    }
  }

  function replaceLaunchCards() {
    document.querySelectorAll('.v5-launch-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const kind = title.includes('Raíz') ? 'raiz' : title === 'Ola' ? 'ola' : '';
      if (!kind || card.dataset.v8Visual === 'true') return;
      card.dataset.v8Visual = 'true';
      const img = card.querySelector('img');
      if (!img) return;
      const box = document.createElement('div');
      box.className = 'v8-launch-visual';
      box.innerHTML = visual(kind, kind==='ola'?'back':'front');
      img.replaceWith(box);
    });
  }

  function replacePdp() {
    const r = route();
    const handle = r.split('/').pop();
    const data = active[handle];
    const page = app.querySelector('.product-page');
    if (!data || !page || page.dataset.v8Visual === 'true') return;
    page.dataset.v8Visual = 'true';
    const cells = [...page.querySelectorAll('.product-gallery .gallery-cell')];
    const views = data.kind === 'raiz' ? ['front','back','detail','front'] : ['front','back','detail','back'];
    const names = data.kind === 'raiz' ? ['Frente','Espalda / gráfica','Detalle de arte','Frente / escala'] : ['Frente / Fuji','Espalda / ola','Detalle de línea','Espalda / continuidad'];
    cells.forEach((cell,i) => {
      [...cell.children].forEach(child => {
        if (!child.classList.contains('v6-gallery-label') && !child.classList.contains('v6-gallery-index')) child.remove();
      });
      cell.classList.remove('root-art');
      cell.style.background = '';
      const box = document.createElement('div');
      box.className='v8-pdp-visual';
      box.innerHTML = visual(data.kind, views[i] || 'front');
      cell.prepend(box);
      const label = cell.querySelector('.v6-gallery-label');
      if (label) label.textContent = names[i] || `Vista ${i+1}`;
    });
    const summary = page.querySelector('.v6-gallery-summary');
    if (summary) summary.innerHTML = '<span>Mockup de prenda · estudio conceptual</span><span>Silueta, arte y escala son hipótesis de diseño; foto, fit y acabado final esperan muestra física</span>';
  }

  function addVisualLegend() {
    const page = app.querySelector('.product-page');
    if (!page || page.querySelector('.v8-visual-legend')) return;
    const gallery = page.querySelector('.product-gallery');
    if (!gallery) return;
    const legend = document.createElement('div');
    legend.className='v8-visual-legend';
    legend.innerHTML='<strong>Cómo leer estos mockups</strong><span>Silueta y ubicación del arte sirven para revisar dirección de producto.</span><span>No representan todavía caída, textura, color ni impresión aprobados.</span>';
    gallery.insertAdjacentElement('afterend',legend);
  }

  function enhance() {
    document.querySelectorAll('.product-card').forEach(card => {
      const handle = card.dataset.product || '';
      if (active[handle]) replaceCard(card, active[handle].kind);
    });
    replaceLaunchCards();
    replacePdp();
    addVisualLegend();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',() => setTimeout(enhance,0));
  setTimeout(enhance,0);
})();
