(() => {
  const app=document.getElementById('app'); if(!app)return;
  const route=()=> (location.hash||'#/').slice(1);
  const A='./assets/products/';
  const campaigns={
    'raiz-de-concreto':{key:'raiz',title:'Raíz de concreto',artist:'Alma Ríos',collection:'Entre grietas',cover:`${A}raiz/cover.svg`,assets:[['Frente',`${A}raiz/front.svg`],['Espalda',`${A}raiz/back.svg`],['Detalle',`${A}raiz/detail.svg`],['Contexto',`${A}raiz/context.svg`],['Obra / crop',`${A}raiz/art-crop.svg`],['Ficha visual',`${A}raiz/spec-card.svg`]]},
    'ola-hokusai':{key:'ola',title:'Ola',artist:'Katsushika Hokusai',collection:'La fuerza del agua',cover:`${A}ola/cover.svg`,assets:[['Frente',`${A}ola/front.svg`],['Espalda',`${A}ola/back.svg`],['Detalle',`${A}ola/detail.svg`],['Contexto',`${A}ola/context.svg`],['Obra / crop',`${A}ola/art-crop.svg`],['Ficha visual',`${A}ola/spec-card.svg`]]}
  };
  const img=(src,alt,cls='')=>`<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;

  function bindHomeHero(){
    if(route()!=='/')return;
    const hero=document.querySelector('.v12-campaign-hero'); if(!hero||hero.dataset.v14==='1')return;
    hero.dataset.v14='1';
    const shots=hero.querySelectorAll('.v12-campaign-shot');
    const pairs=[campaigns['raiz-de-concreto'],campaigns['ola-hokusai']];
    shots.forEach((shot,i)=>{const c=pairs[i]; if(!c)return; const im=shot.querySelector('img'); if(im){im.src=c.cover; im.alt=`Campaña conceptual de ${c.title}`; im.loading='eager';} shot.dataset.v14Campaign=c.key;});
    hero.insertAdjacentHTML('afterend',`<section class="section v14-launch-films"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Dos productos · dos campañas</p><h2>La misma prenda en toda la tienda.</h2></div><p>Portada, construcción, detalle y contexto comparten una dirección única. Son estudios conceptuales hasta fotografía y Product Ready.</p></div><div class="v14-film-grid">${Object.values(campaigns).map(c=>`<a href="#/producto/${Object.keys(campaigns).find(k=>campaigns[k]===c)}" class="v14-film"><div class="v14-film-strip">${c.assets.slice(0,3).map(([label,src])=>`<figure>${img(src,`${label} conceptual de ${c.title}`)}<figcaption>${label}</figcaption></figure>`).join('')}</div><div class="v14-film-copy"><small>${c.artist} · ${c.collection}</small><strong>${c.title}</strong><span>Ver campaña de producto →</span></div></a>`).join('')}</div></div></section>`);
  }

  function bindCards(){
    document.querySelectorAll('.product-card[data-product]').forEach(card=>{
      const handle=card.dataset.product; const c=campaigns[handle]; if(!c||card.dataset.v14==='1')return;
      const media=card.querySelector('.product-media'); if(!media)return;
      card.dataset.v14='1';
      const badge=media.querySelector('.badge')?.outerHTML||'';
      media.innerHTML=`${badge}${img(c.cover,`Campaña conceptual de ${c.title}`,'v14-card-image')}<span class="v14-card-caption">Estudio conceptual</span>`;
    });
  }

  function bindPdp(){
    const m=route().match(/^\/producto\/(.+)$/); if(!m)return;
    const c=campaigns[m[1]]; if(!c)return;
    const gallery=document.querySelector('.product-gallery'); if(!gallery||gallery.dataset.v14==='1')return;
    gallery.dataset.v14='1';
    gallery.innerHTML=c.assets.map(([label,src],i)=>`<figure class="gallery-cell v14-gallery-cell" data-v14-frame="${i+1}">${img(src,`${label} conceptual de ${c.title}`)}<figcaption><span>${String(i+1).padStart(2,'0')} / ${String(c.assets.length).padStart(2,'0')}</span><strong>${label}</strong></figcaption></figure>`).join('');
    const productPage=document.querySelector('.product-page');
    if(productPage&&!document.querySelector('.v14-pdp-boundary')) productPage.insertAdjacentHTML('afterend',`<div class="wrap v14-pdp-boundary"><strong>Campaña conceptual.</strong> Silueta, impresión, color y escala siguen sujetos a blank ganador, print test, wash test y fotografía real.</div>`);
    const oldCampaign=document.querySelector('.v11-product-campaign'); if(oldCampaign)oldCampaign.style.display='none';
    const story=document.querySelector('.story-split');
    if(story&&!document.querySelector('.v14-product-chapter')) story.insertAdjacentHTML('beforebegin',`<section class="section v14-product-chapter"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Sistema de producto</p><h2>${c.title}, de portada a taller.</h2></div><p>La campaña debe vender la misma decisión que después intentaremos fabricar. Ninguna pieza visual autoriza por sí sola una afirmación física.</p></div><div class="v14-chapter-grid"><figure class="v14-chapter-main">${img(c.cover,`Portada conceptual de ${c.title}`)}<figcaption>Portada de campaña</figcaption></figure><div class="v14-chapter-side"><figure>${img(c.assets[4][1],`Crop artístico de ${c.title}`)}<figcaption>Lenguaje visual</figcaption></figure><figure>${img(c.assets[5][1],`Ficha visual de ${c.title}`)}<figcaption>Puente a Product Ready</figcaption></figure></div></div></div></section>`);
  }

  function enhance(){bindHomeHero();bindCards();bindPdp();}
  const obs=new MutationObserver(()=>requestAnimationFrame(enhance)); obs.observe(app,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>requestAnimationFrame(enhance)); enhance();
})();