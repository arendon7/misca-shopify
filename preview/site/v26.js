(() => {
  const app = document.getElementById('app');
  if (!app) return;
  const route = () => (location.hash || '#/').slice(1).split('?')[0];
  const P = './assets/products/';
  const V25 = './assets/generated/v25/';
  const V26 = './assets/generated/v26/';
  const sets = {
    '/producto/raiz-de-concreto': [[V26 + 'raiz-pdp-main.webp', 'Raíz de concreto · modelo conceptual'],[V25 + 'raiz-campaign.webp', 'Raíz de concreto · campaña conceptual'],[P + 'raiz/detail.svg', 'Raíz de concreto · detalle conceptual'],[P + 'raiz/context.svg', 'Raíz de concreto · contexto conceptual'],[P + 'raiz/art-crop.svg', 'Entre grietas · obra conceptual']],
    '/producto/ola-hokusai': [[V26 + 'ola-pdp-context.webp', 'Ola · modelo conceptual'],[V25 + 'ola-campaign.webp', 'Ola · campaña conceptual'],[P + 'ola/detail.svg', 'Ola · detalle conceptual'],[P + 'ola/context.svg', 'Ola · contexto conceptual'],[P + 'ola/art-crop.svg', 'Ola · obra conceptual']]
  };
  function put(cell, item) {
    cell.replaceChildren();
    const img = document.createElement('img');
    img.src = item[0]; img.alt = item[1]; img.loading = 'lazy';
    img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover';
    cell.appendChild(img);
  }
  function apply() {
    const data = sets[route()];
    const gallery = app.querySelector('.product-gallery');
    if (!data || !gallery || gallery.dataset.v26 === '1') return;
    const cells = Array.from(gallery.querySelectorAll('.gallery-cell'));
    if (!cells.length) return;
    while (cells.length < 5) { const cell = document.createElement('div'); cell.className = 'gallery-cell'; gallery.appendChild(cell); cells.push(cell); }
    data.forEach((item, i) => put(cells[i], item));
    cells[0].style.gridColumn = '1 / -1'; cells[0].style.aspectRatio = '1.25 / 1';
    gallery.dataset.v26 = '1';
  }
  function schedule(){ setTimeout(apply, 650); setTimeout(apply, 1000); }
  window.addEventListener('hashchange', schedule);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true}); else schedule();
})();