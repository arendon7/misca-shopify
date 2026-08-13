(() => {
  function applyPreviewFixes() {
    const path = (location.hash.slice(1) || '/').split('?')[0];
    if (path === '/nuevo' && typeof prendas === 'function' && typeof products !== 'undefined') {
      app.innerHTML = prendas('Nuevo','Las primeras piezas que definen el lanzamiento de MISCA.',[products.raiz, products.ola]);
      if (typeof bindPage === 'function') bindPage();
      document.title = 'MISCA — Nuevo';
      window.scrollTo(0, 0);
    }
    if (path === '/producto/ola-hokusai') { const creatorLink = document.querySelector('.buybox .eyebrow a'); if (creatorLink) creatorLink.href = '#/archivo/hokusai'; }
    if (path === '/producto/ladron-de-fresas') { const creatorLink = document.querySelector('.buybox .eyebrow a'); if (creatorLink) creatorLink.href = '#/archivo/william-morris'; }
    if (path.startsWith('/artista/') && path !== '/artista/alma-rios') {
      const collectionLink = document.querySelector('.artist-bio .link-arrow');
      if (collectionLink) { collectionLink.removeAttribute('href'); collectionLink.textContent = 'Colección en desarrollo'; collectionLink.style.opacity = '.55'; collectionLink.style.cursor = 'default'; collectionLink.style.borderBottom = '0'; }
    }
  }

  const v28Products = {
    'raiz-de-concreto': { title:'Raíz de concreto', origin:'Artista de la Casa', color:'Marfil', price:'$119.900' },
    'ola-hokusai': { title:'Ola', origin:'Archivo Abierto', color:'Navy', price:'$139.900' }
  };
  function v28Path(){ return (location.hash.slice(1) || '/').split('?')[0]; }
  function readV28Cart(){ try { return JSON.parse(localStorage.getItem('misca-preview-cart') || '[]'); } catch { return []; } }
  function applyV28Shop(){
    const path=v28Path(); if(path!=='/prendas'&&path!=='/nuevo')return;
    document.querySelector('.filter-row')?.remove();
    const intro=app.querySelector('.v23-page-intro'); const launch=app.querySelector('.v23-launch--shop'); const duo=launch?.querySelector('.v23-product-duo'); if(!launch||!duo)return; intro?.classList.add('v28-shop-intro');
    if(!launch.querySelector('.v28-shop-switcher')) duo.insertAdjacentHTML('beforebegin',`<nav class="v28-shop-switcher" aria-label="Elegir pieza del lanzamiento"><div class="v28-shop-switcher__label">Lanzamiento 01<br>elige tu entrada</div><a href="#/producto/raiz-de-concreto"><small>Artista de la Casa</small><strong>Raíz de concreto</strong><span>Marfil · $119.900</span></a><a href="#/producto/ola-hokusai"><small>Archivo Abierto</small><strong>Ola</strong><span>Navy · $139.900</span></a></nav>`);
    duo.querySelectorAll('.v23-product-card').forEach(card=>{const href=card.getAttribute('href')||'';const handle=href.includes('raiz-de-concreto')?'raiz-de-concreto':href.includes('ola-hokusai')?'ola-hokusai':'';const product=v28Products[handle];if(!product||card.dataset.v28==='1')return;card.dataset.v28='1';const media=card.querySelector('.v23-product-card__media');if(media&&!media.querySelector('.v28-card-origin'))media.insertAdjacentHTML('beforeend',`<span class="v28-card-origin">${product.origin}</span>`);if(!card.querySelector('.v28-card-cta'))card.insertAdjacentHTML('beforeend','<span class="v28-card-cta"><span>Ver producto · elegir talla</span><b aria-hidden="true">→</b></span>');});
    const proof=launch.querySelector('.v23-shop-proof'); if(proof&&proof.dataset.v28!=='1'){proof.dataset.v28='1';proof.innerHTML='<span>2 piezas del lanzamiento</span><span>Tallas S–XL en producto</span><span>Visuales conceptuales identificados</span><span>Compra pública tras Product Ready</span>';}
  }
  function applyV28Cart(){
    const drawer=document.getElementById('cartDrawer');const footer=drawer?.querySelector('.drawer-footer');const items=document.getElementById('cartItems');if(!drawer||!footer||!items)return;drawer.classList.add('v28-cart');const heading=drawer.querySelector('.drawer-head h2');if(heading&&heading.textContent!=='Bolsa')heading.textContent='Bolsa';
    const cart=readV28Cart();const count=cart.reduce((sum,item)=>sum+(Number(item.qty)||0),0);let intro=drawer.querySelector('.v28-cart-intro');if(!intro){drawer.querySelector('.drawer-head')?.insertAdjacentHTML('afterend','<div class="v28-cart-intro"><span>Resumen de pedido</span><strong data-v28-cart-count>0 piezas</strong></div>');intro=drawer.querySelector('.v28-cart-intro');}const countNode=intro?.querySelector('[data-v28-cart-count]');const countLabel=`${count} ${count===1?'pieza':'piezas'}`;if(countNode&&countNode.textContent!==countLabel)countNode.textContent=countLabel;
    if(!footer.querySelector('.v28-cart-summary')){const proof=footer.querySelector('.v19-cart-proof');const anchor=proof||footer.querySelector('.subtotal');anchor?.insertAdjacentHTML('afterend','<div class="v28-cart-summary"><span>Checkout · vista de prueba</span><span>Pagos · no procesados en Pages</span></div>');}
    items.querySelectorAll('.cart-line').forEach(line=>{line.querySelector('[data-dec]')?.setAttribute('aria-label','Reducir cantidad');line.querySelector('[data-inc]')?.setAttribute('aria-label','Aumentar cantidad');const remove=line.querySelector('.v16-remove-item');const title=line.querySelector('h4')?.textContent.trim()||'producto';remove?.setAttribute('aria-label',`Eliminar ${title}`);});
  }
  function applyV28(){applyV28Shop();applyV28Cart();}

  const v29Order=['#/nuevo','#/prendas','#/artistas','#/colecciones','#/historias','#/creadores'];
  function applyV29Header(){
    const header=document.getElementById('siteHeader');const nav=header?.querySelector('.desktop-nav');const wordmark=header?.querySelector('.wordmark');if(!header||!nav)return;document.body.classList.add('v29-global');header.classList.add('v29-header');wordmark?.setAttribute('aria-label','MISCA · ir al inicio');document.getElementById('cartButton')?.setAttribute('aria-label','Abrir bolsa de compra');document.getElementById('searchButton')?.setAttribute('aria-label','Buscar en MISCA');
    if(nav.dataset.v29!=='1'){nav.dataset.v29='1';const links=[...nav.querySelectorAll('a')];v29Order.forEach(href=>{const link=links.find(item=>item.getAttribute('href')===href);if(link)nav.appendChild(link);});const creators=nav.querySelector('a[href="#/creadores"]');if(creators)creators.textContent='Creadores';}
    if(document.body.dataset.v29ScrollBound!=='1'){document.body.dataset.v29ScrollBound='1';const sync=()=>header.classList.toggle('is-scrolled',window.scrollY>20);window.addEventListener('scroll',sync,{passive:true});sync();}
  }
  function applyV29MobileMenu(){
    const menu=document.getElementById('mobileMenu');const head=menu?.querySelector('.mobile-menu-head');const nav=menu?.querySelector('nav');if(!menu||!head||!nav)return;menu.classList.add('v29-mobile-menu');menu.setAttribute('aria-label','Menú principal MISCA');if(menu.querySelector('.v29-mobile-feature'))return;
    head.insertAdjacentHTML('afterend',`<div class="v29-mobile-feature"><p>Lanzamiento 01 · comprar por pieza</p><div class="v29-mobile-products"><a href="#/producto/raiz-de-concreto"><img src="./assets/generated/v25/raiz-campaign.webp" alt="Raíz de concreto · visual conceptual"><span><small>Artista de la Casa</small><strong>Raíz de concreto</strong><em>Marfil · $119.900</em></span></a><a href="#/producto/ola-hokusai"><img src="./assets/generated/v25/ola-campaign.webp" alt="Ola · visual conceptual"><span><small>Archivo Abierto</small><strong>Ola</strong><em>Navy · $139.900</em></span></a></div></div>`);
    const links=[...nav.querySelectorAll('a')];v29Order.forEach(href=>{const link=links.find(item=>item.getAttribute('href')===href);if(link)nav.appendChild(link);});
  }
  function applyV29Search(){
    const overlay=document.getElementById('searchOverlay');const panel=overlay?.querySelector('.search-panel');const input=document.getElementById('searchInput');const results=document.getElementById('searchResults');if(!overlay||!panel||!input||!results)return;overlay.classList.add('v29-search');input.placeholder='Busca Raíz, Ola, Alma, Hokusai…';input.setAttribute('aria-label','Buscar prendas, artistas y colecciones');if(!panel.querySelector('.v29-search-intro'))panel.querySelector('.drawer-head')?.insertAdjacentHTML('afterend','<div class="v29-search-intro"><span>Descubrir MISCA</span><strong>Prendas, artistas, colecciones e historias.</strong></div>');
    const typed=input.value.trim().length>0;results.querySelector('.v29-search-feature')?.remove();if(!typed)results.insertAdjacentHTML('beforeend',`<div class="v29-search-feature"><a href="#/producto/raiz-de-concreto"><img src="./assets/generated/v25/raiz-campaign.webp" alt="Raíz de concreto · visual conceptual"><span><small>Artista de la Casa</small><strong>Raíz de concreto</strong><em>Ver producto →</em></span></a><a href="#/producto/ola-hokusai"><img src="./assets/generated/v25/ola-campaign.webp" alt="Ola · visual conceptual"><span><small>Archivo Abierto</small><strong>Ola</strong><em>Ver producto →</em></span></a></div>`);
  }
  function applyV29Home(){
    if(v28Path()!=='/')return;const hero=app.querySelector('.v23-home-hero');const copy=hero?.querySelector('.v23-home-hero__copy');const index=copy?.querySelector('.v23-hero-index');if(!hero||!copy)return;document.body.classList.add('v29-home');if(!copy.querySelector('.v29-home-shopbar')){const html=`<nav class="v29-home-shopbar" aria-label="Comprar lanzamiento 01"><span>Comprar lanzamiento 01</span><a href="#/producto/raiz-de-concreto"><small>01 · Alma Ríos</small><strong>Raíz de concreto</strong><em>$119.900</em></a><a href="#/producto/ola-hokusai"><small>02 · Hokusai</small><strong>Ola</strong><em>$139.900</em></a></nav>`;if(index)index.insertAdjacentHTML('beforebegin',html);else copy.insertAdjacentHTML('beforeend',html);}hero.querySelector('.v23-hero-collage')?.setAttribute('aria-label','Visuales conceptuales del lanzamiento Raíz de concreto y Ola');
  }
  function applyV29(){applyV29Header();applyV29MobileMenu();applyV29Search();applyV29Home();}

  const appNode=document.getElementById('app');if(appNode)new MutationObserver(()=>requestAnimationFrame(()=>{applyV28();applyV29();})).observe(appNode,{childList:true,subtree:true});const cartNode=document.getElementById('cartDrawer');if(cartNode)new MutationObserver(()=>requestAnimationFrame(applyV28Cart)).observe(cartNode,{childList:true,subtree:true});const searchNode=document.getElementById('searchResults');if(searchNode)new MutationObserver(()=>requestAnimationFrame(applyV29Search)).observe(searchNode,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>{document.body.classList.remove('v29-home');setTimeout(applyPreviewFixes,0);setTimeout(applyV28,260);setTimeout(applyV29,300);});setTimeout(applyPreviewFixes,0);setTimeout(applyV28,260);setTimeout(applyV29,320);setTimeout(applyV28,620);setTimeout(applyV29,680);
})();