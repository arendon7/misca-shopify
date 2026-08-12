(() => {
  const app = document.getElementById('app');
  if (!app) return;
  const route = () => (location.hash || '#/').slice(1);

  const specs = {
    '/producto/raiz-de-concreto': {
      title:'Raíz de concreto', dossier:'AR-EC-RC', blank:'Blank ganador · TBD', color:'Marfil · hipótesis visual',
      direction:'Dirección A · Ascenso lateral contenido',
      tests:[
        ['RC-SCR-01','Serigrafía','Comparar fidelidad, tacto, opacidad, detalle y lavado.'],
        ['RC-DTF-01','DTF','Comparar fidelidad, tacto, integración con tela, bordes y lavado.']
      ],
      front:'Zona principal · bajo izquierdo → frente medio', back:'Sin gráfica prioritaria en primera muestra',
      seams:'No cruzar costuras en A. Challenger B queda condicionado a prueba de taller.',
      master:'Arte maestro vector/raster final · pendiente de preparación a escala real',
      evidence:['Foto blank preimpresión','Foto frente/espalda postimpresión','Detalle macro del borde','Medición real zona impresa','Costo real por unidad','Tiempo real de producción','Lavado 1 / 5 / 10','Golden sample si aprueba'],
      decision:'Aprobar técnica solo si la muestra mantiene lectura de raíces, tacto aceptable y consistencia después de lavado; ninguna decisión visual sustituye evidencia física.'
    },
    '/producto/ola-hokusai': {
      title:'Ola', dossier:'AA-HOK-OLA', blank:'Blank ganador · TBD', color:'Navy · hipótesis visual',
      direction:'Dirección A · Fuji al frente / ola contenida atrás',
      tests:[
        ['OLA-DTG-01','DTG','Comparar reproducción de color, detalle fino, tacto, cobertura y lavado.'],
        ['OLA-DTF-01','DTF','Comparar color, detalle, tacto, integración, bordes y lavado.']
      ],
      front:'Fuji pequeño · posición exacta TBD tras medir blank', back:'Ola dominante contenida dentro del panel trasero',
      seams:'Primera muestra sin continuidad lateral. Dirección B solo si taller demuestra solución consistente.',
      master:'Fuente institucional + archivo de adaptación de producción · escala final pendiente',
      evidence:['Archivo fuente institucional registrado','Foto blank preimpresión','Frente y espalda postimpresión','Detalle de línea/color','Medición real zonas impresas','Costo real por unidad','Lavado 1 / 5 / 10','Golden sample si aprueba'],
      decision:'Aprobar técnica solo si color, línea, tacto y lavado sostienen la obra sin convertirla en un parche visual. Continuidad lateral se evalúa después, no en la primera muestra.'
    }
  };

  function technicalSvg(kind, side, s) {
    const dark = kind === 'ola';
    const shirt = dark ? '#1b3044' : '#eee7d8';
    const stroke = dark ? '#6f8798' : '#8d8478';
    const active = dark ? '#dfe9ec' : '#20201c';
    const accent = dark ? '#8baec0' : '#617049';
    const isFront = side === 'front';
    const root = !dark && isFront ? `
      <path d="M116 366c45-55 68-105 72-164" stroke="${active}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M142 386c22-57 56-94 91-123" stroke="${accent}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M103 344c40-15 64-39 79-73" stroke="${active}" stroke-width="4" fill="none" stroke-linecap="round"/>` : '';
    const wave = dark ? (isFront ? `
      <path d="M205 210l14-14 14 14-14 3Z" fill="${active}"/><circle cx="219" cy="207" r="29" fill="none" stroke="${accent}" stroke-dasharray="3 6"/>` : `
      <path d="M80 282c55-80 116-103 183-62 38 23 73 18 111-14-15 37-43 62-83 72 37 1 69 17 93 50-52-22-100-19-143 8-51 32-102 22-161-54Z" fill="none" stroke="${active}" stroke-width="12"/><path d="M96 310c62-48 117-58 165-30 44 26 83 24 119 2" fill="none" stroke="${accent}" stroke-width="6"/>`) : '';
    const note = dark ? (isFront ? 'Fuji · posición TBD' : 'Ola · panel trasero') : (isFront ? 'Raíces · zona prioritaria' : 'Sin gráfica A');
    return `<svg viewBox="0 0 420 500" role="img" aria-label="Mapa técnico ${side} de ${s.title}">
      <rect width="420" height="500" fill="#ddd6ca"/>
      <path d="M150 78 102 105 51 75 18 148 79 178 92 435 328 435 341 178 402 148 369 75 318 105 270 78c-12 28-29 42-60 42s-48-14-60-42Z" fill="${shirt}" stroke="${stroke}" stroke-width="2"/>
      <path d="M150 78c13 40 33 60 60 60s47-20 60-60" fill="none" stroke="${stroke}" stroke-width="3" opacity=".8"/>
      <path d="M102 105 79 178M318 105l23 73M92 420h236" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="5 5" opacity=".8"/>
      ${root}${wave}
      <line x1="32" y1="455" x2="388" y2="455" stroke="#6d675f" stroke-width="1"/>
      <text x="32" y="478" font-size="11" font-family="Arial" fill="#625d56">${note} · medidas reales TBD</text>
    </svg>`;
  }

  function evidenceHtml(items) {
    return items.map((x,i)=>`<div><strong>${String(i+1).padStart(2,'0')} · ${x}</strong><span>PENDIENTE · adjuntar evidencia al dossier</span><span class="v10-status">No validado</span></div>`).join('');
  }

  function testHtml(tests) {
    return tests.map(t=>`<div class="v10-test"><span class="v10-test-id">${t[0]}</span><div><strong>${t[1]}</strong><span>${t[2]}</span></div></div>`).join('');
  }

  function moduleFor(s) {
    const kind = s.dossier.startsWith('AA-') ? 'ola' : 'raiz';
    return `<section class="v10-workshop" data-v10-workshop-spec>
      <div class="page-shell v10-workshop-head">
        <div><span class="v10-kicker">Product Ready · ficha para taller</span><h2>De mockup a muestra física.</h2><p>Esta ficha convierte la Dirección A en una orden de prueba verificable. Nada aquí autoriza producción final: medidas, blank, técnica, color y acabado deben cerrarse con evidencia física.</p></div>
        <div class="v10-gate"><strong>Gate actual · BLOQUEADO POR EVIDENCIA</strong><span>${s.direction}</span><span>Dossier ${s.dossier}</span><span>Medidas de impresión: TBD tras medir blank ganador.</span></div>
      </div>
      <div class="page-shell v10-board">
        <div class="v10-panel">
          <h3>01 · Mapa de prenda</h3><p class="v10-panel-copy">Zonas conceptuales para preparar la conversación con taller. Las líneas y proporciones no sustituyen una plantilla física ni medidas reales.</p>
          <div class="v10-techmap"><div class="v10-techview"><span class="v10-viewlabel">Frente</span>${technicalSvg(kind,'front',s)}</div><div class="v10-techview"><span class="v10-viewlabel">Espalda</span>${technicalSvg(kind,'back',s)}</div></div>
        </div>
        <div class="v10-panel">
          <h3>02 · Especificación provisional</h3>
          <div class="v10-specgrid">
            <div class="v10-spec"><small>Dossier</small><strong>${s.dossier}</strong><span>Identidad del producto</span></div>
            <div class="v10-spec"><small>Blank</small><strong>${s.blank}</strong><span>No comprar por referencia histórica</span></div>
            <div class="v10-spec"><small>Color</small><strong>${s.color}</strong><span>Debe confirmarse físicamente</span></div>
            <div class="v10-spec"><small>Dirección</small><strong>${s.direction}</strong><span>Primera muestra, no diseño aprobado</span></div>
            <div class="v10-spec"><small>Frente</small><strong>${s.front}</strong><span>Medida exacta TBD</span></div>
            <div class="v10-spec"><small>Espalda</small><strong>${s.back}</strong><span>Medida exacta TBD</span></div>
            <div class="v10-spec"><small>Costuras</small><strong>Restricción de primera muestra</strong><span>${s.seams}</span></div>
            <div class="v10-spec"><small>Arte maestro</small><strong>PENDIENTE</strong><span>${s.master}</span></div>
          </div>
          <button class="v10-print-btn" type="button">Imprimir / guardar ficha</button><div class="v10-print-note">Usa la impresión del navegador para llevar esta ficha a PDF. Sigue siendo una especificación provisional.</div>
        </div>
        <div class="v10-panel">
          <h3>03 · Orden de pruebas</h3><p class="v10-panel-copy">Misma prenda y arte equivalente entre técnicas. Cambiar una sola variable principal por comparación para que el resultado sea interpretable.</p>
          <div class="v10-test-list">${testHtml(s.tests)}</div>
          <div class="v10-decision"><small>Regla de decisión</small><strong>No elegir técnica por mockup.</strong><span>${s.decision}</span></div>
        </div>
        <div class="v10-panel">
          <h3>04 · Evidencia obligatoria</h3><p class="v10-panel-copy">Una muestra no pasa a READY porque “se vea bien”. La evidencia debe quedar trazable al dossier y a su ID de prueba.</p>
          <div class="v10-evidence">${evidenceHtml(s.evidence)}</div>
        </div>
      </div>
    </section>`;
  }

  function enhance() {
    const s = specs[route()];
    const page = app.querySelector('.product-page');
    if (!s || !page || page.querySelector('[data-v10-workshop-spec]')) return;
    const existing = page.querySelector('.v9-direction');
    if (existing) existing.insertAdjacentHTML('afterend', moduleFor(s));
    else page.insertAdjacentHTML('beforeend', moduleFor(s));
    page.querySelector('.v10-print-btn')?.addEventListener('click', () => window.print());
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhance));
  observer.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>setTimeout(enhance,0));
  setTimeout(enhance,0);
})();
