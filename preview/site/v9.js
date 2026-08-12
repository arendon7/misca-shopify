(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const route = () => (location.hash || '#/').slice(1);
  const products = {
    '/producto/raiz-de-concreto': {
      kind: 'raiz',
      title: 'Raíz de concreto',
      a: {
        name: 'Dirección A', badge: 'Prioridad · primera muestra',
        title: 'Ascenso lateral contenido',
        body: 'Las raíces nacen desde el bajo izquierdo y suben de forma asimétrica por el frente. El arte permanece dentro de una sola superficie principal y deja aire alrededor de cuello, pecho y hombros.',
        test: 'Llevar a muestra con RC-SCR-01 y RC-DTF-01.',
        complexity: 'Menor', impact: 'Alto', purpose: 'Validar escala, tacto y lectura frontal.'
      },
      b: {
        name: 'Dirección B', badge: 'Challenger',
        title: 'Crecimiento envolvente',
        body: 'El sistema de raíces gana densidad y busca continuar hacia costado/espalda. Conserva la idea original más inmersiva, pero exige validar primero registro, continuidad y comportamiento real sobre la prenda.',
        test: 'Probar solo después de confirmar técnica y límites de taller.',
        complexity: 'Mayor', impact: 'Muy alto', purpose: 'Explorar la versión más distintiva.'
      }
    },
    '/producto/ola-hokusai': {
      kind: 'ola',
      title: 'Ola',
      a: {
        name: 'Dirección A', badge: 'Prioridad · primera muestra',
        title: 'Fuji al frente · ola contenida atrás',
        body: 'El frente queda casi silencioso con Fuji pequeño. La espalda concentra la ola como imagen dominante, contenida dentro del panel para poder juzgar color, detalle y escala antes de intentar continuidad lateral.',
        test: 'Llevar a muestra con OLA-DTG-01 y OLA-DTF-01.',
        complexity: 'Menor', impact: 'Alto', purpose: 'Validar reproducción, color y lectura espalda/frente.'
      },
      b: {
        name: 'Dirección B', badge: 'Challenger',
        title: 'La ola entra por el costado',
        body: 'La composición recupera la intención más ambiciosa: la ola nace lateralmente y continúa hacia la espalda. La prenda se lee como superficie completa, no como rectángulo estampado.',
        test: 'Probar después de que taller confirme una solución consistente para continuidad lateral.',
        complexity: 'Mayor', impact: 'Muy alto', purpose: 'Buscar la firma visual definitiva de Ola.'
      }
    }
  };

  const shirtPath = 'M220 132 150 174 72 130 18 240 107 286 129 590 471 590 493 286 582 240 528 130 450 174 380 132c-16 40-45 61-80 61s-64-21-80-61Z';

  function raizArt(direction) {
    if (direction === 'a') return `
      <g fill="none" stroke-linecap="round">
        <path d="M150 585c14-78 39-126 90-169 53-45 73-87 75-145" stroke="#191a16" stroke-width="9"/>
        <path d="M102 566c53-45 77-82 83-132 6-49 36-83 92-108" stroke="#5c6844" stroke-width="6"/>
        <path d="M195 576c9-62 39-94 77-125 34-28 52-60 55-98" stroke="#191a16" stroke-width="5"/>
        <path d="M139 478c52-12 86-34 111-69M191 432c43-10 71-29 88-58" stroke="#191a16" stroke-width="4"/>
        <path d="M114 518c37-16 63-39 81-71" stroke="#5c6844" stroke-width="4"/>
      </g>`;
    return `
      <g fill="none" stroke-linecap="round">
        <path d="M48 590c55-89 95-135 155-176 60-40 92-90 98-156" stroke="#191a16" stroke-width="10"/>
        <path d="M112 607c29-82 69-125 120-164 54-42 80-88 78-143" stroke="#5c6844" stroke-width="7"/>
        <path d="M237 595c22-78 62-117 115-153 47-32 83-76 97-130" stroke="#191a16" stroke-width="7"/>
        <path d="M315 582c37-66 78-98 130-124 38-19 66-50 89-92" stroke="#5c6844" stroke-width="6"/>
        <path d="M88 493c81-17 133-48 162-93M177 449c67-10 109-35 137-74M301 470c62-14 105-41 135-82" stroke="#191a16" stroke-width="4"/>
      </g>`;
  }

  function olaArt(direction) {
    if (direction === 'a') return `
      <g fill="none" stroke-linecap="round">
        <path d="M112 441c69-111 150-151 241-119 61 22 105 9 151-28-20 46-56 76-106 90 47 3 84 24 110 62-64-30-121-28-176 1-60 31-126 29-220-6Z" stroke="#e2ebef" stroke-width="16"/>
        <path d="M128 468c86-69 162-84 229-48 54 29 101 24 145-16M161 494c75-38 142-44 199-19 49 22 92 19 129-8" stroke="#7ea7bf" stroke-width="8"/>
      </g>`;
    return `
      <g fill="none" stroke-linecap="round">
        <path d="M-18 439c92-145 188-190 287-143 67 32 116 19 170-31-14 39-42 72-83 94 69-10 130 15 183 74-72-34-142-35-210-1-84 42-179 45-347 7Z" stroke="#e2ebef" stroke-width="18"/>
        <path d="M-8 472c118-86 214-101 288-50 61 43 119 37 174-9M43 506c105-50 190-54 258-18 55 29 107 28 157 2" stroke="#7ea7bf" stroke-width="9"/>
      </g>`;
  }

  function mockup(kind, direction, face='back') {
    const dark = kind === 'ola';
    const tone = dark ? '#172c40' : '#eee7d9';
    const bg = dark ? '#d7d5cf' : '#dcd4c7';
    const art = kind === 'raiz' ? raizArt(direction) : olaArt(direction);
    const frontFuji = dark && face === 'front' ? '<path d="M260 305 299 267l39 38-39 7Z" fill="#d9d8ca" opacity=".9"/><path d="M256 316h88" stroke="#8aa9bc" stroke-width="4"/>' : '';
    return `<svg class="v9-direction-svg" viewBox="0 0 600 680" role="img" aria-label="${direction === 'a' ? 'Dirección A' : 'Dirección B'} de ${kind === 'raiz' ? 'Raíz de concreto' : 'Ola'}">
      <defs><filter id="v9-${kind}-${direction}-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#000" flood-opacity=".18"/></filter><clipPath id="v9-${kind}-${direction}-clip"><path d="${shirtPath}"/></clipPath></defs>
      <rect width="600" height="680" fill="${bg}"/>
      <ellipse cx="300" cy="620" rx="188" ry="25" fill="#000" opacity=".08"/>
      <g filter="url(#v9-${kind}-${direction}-shadow)"><path d="${shirtPath}" fill="${tone}" stroke="${dark ? '#31475a' : '#c8bead'}" stroke-width="2"/><path d="M220 132c20 61 52 91 80 91s60-30 80-91" fill="none" stroke="${dark ? '#35506a' : '#c5baa8'}" stroke-width="5" opacity=".65"/><path d="M150 174 107 286M450 174l43 112M129 570h342" fill="none" stroke="${dark ? '#2c4358' : '#c5baa8'}" stroke-width="2" opacity=".7"/></g>
      <g clip-path="url(#v9-${kind}-${direction}-clip)">${face === 'front' ? frontFuji : art}</g>
      <g font-family="Arial,Helvetica,sans-serif"><text x="30" y="42" font-size="13" letter-spacing="2.2" fill="#5f5a53">${direction === 'a' ? 'DIRECCIÓN A · PRIMERA MUESTRA' : 'DIRECCIÓN B · CHALLENGER'}</text><text x="30" y="646" font-size="11" letter-spacing="1.4" fill="#69635c">HIPÓTESIS DE DISEÑO · NO PRODUCTO APROBADO</text></g>
    </svg>`;
  }

  function directionCard(product, key) {
    const d = product[key];
    const primaryFace = product.kind === 'ola' && key === 'a' ? 'back' : 'back';
    return `<article class="v9-direction-card ${key === 'a' ? 'is-priority' : ''}" data-direction="${key}">
      <div class="v9-direction-visual">${mockup(product.kind, key, primaryFace)}</div>
      <div class="v9-direction-copy">
        <div class="v9-direction-head"><span>${d.name}</span><strong>${d.badge}</strong></div>
        <h3>${d.title}</h3><p>${d.body}</p>
        <dl><div><dt>Complejidad relativa</dt><dd>${d.complexity}</dd></div><div><dt>Impacto visual</dt><dd>${d.impact}</dd></div><div><dt>Objetivo</dt><dd>${d.purpose}</dd></div></dl>
        <p class="v9-test-note">${d.test}</p>
        <button type="button" class="v9-preview-direction">Ver esta dirección arriba</button>
      </div>
    </article>`;
  }

  function addDirectionSection() {
    const product = products[route()];
    const page = app.querySelector('.product-page');
    if (!product || !page || app.querySelector('.v9-direction-section')) return;

    const section = document.createElement('section');
    section.className = 'v9-direction-section';
    section.innerHTML = `<div class="v9-direction-intro"><p class="eyebrow">Dirección de producto · antes de imprimir</p><h2>Una prioridad. Una challenger.</h2><p>No son dos SKUs. Son dos hipótesis para decidir qué merece muestra física. La Dirección A minimiza variables en el primer test; la B conserva la ambición visual para una segunda ronda.</p></div><div class="v9-direction-grid">${directionCard(product,'a')}${directionCard(product,'b')}</div><div class="v9-decision"><strong>Decisión V9</strong><span>${product.title}: producir primero Dirección A. Dirección B queda condicionada a evidencia del taller y resultado de la primera muestra.</span></div>`;
    page.insertAdjacentElement('afterend', section);

    section.querySelectorAll('.v9-preview-direction').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.v9-direction-card');
        const key = card?.dataset.direction || 'a';
        const first = page.querySelector('.product-gallery .gallery-cell');
        const visual = first?.querySelector('.v8-pdp-visual');
        if (visual) visual.innerHTML = mockup(product.kind, key, product.kind === 'ola' ? 'back' : 'back');
        section.querySelectorAll('.v9-direction-card').forEach(el => el.classList.toggle('is-selected', el === card));
        page.scrollIntoView({behavior:'smooth',block:'start'});
      });
    });
  }

  function addPdpDecisionFlag() {
    const product = products[route()];
    const buybox = app.querySelector('.product-page .buybox');
    if (!product || !buybox || buybox.querySelector('.v9-decision-flag')) return;
    const flag = document.createElement('div');
    flag.className = 'v9-decision-flag';
    flag.innerHTML = '<span>Diseño físico</span><strong>Dirección A priorizada para primera muestra</strong><a href="#v9-direction">Comparar A/B ↓</a>';
    const add = buybox.querySelector('.add-cart');
    (add || buybox.lastElementChild)?.insertAdjacentElement('afterend', flag);
    flag.querySelector('a')?.addEventListener('click', e => { e.preventDefault(); app.querySelector('.v9-direction-section')?.scrollIntoView({behavior:'smooth'}); });
  }

  function enhance() {
    addDirectionSection();
    addPdpDecisionFlag();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange', () => setTimeout(enhance,0));
  setTimeout(enhance,0);
})();
