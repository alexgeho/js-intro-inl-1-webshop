(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))b(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&b(g)}).observe(document,{childList:!0,subtree:!0});function s(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function b(r){if(r.ep)return;r.ep=!0;const c=s(r);fetch(r.href,c)}})();const k=[{id:1,name:"A-detalj",price:25,rating:4.2,category:"bockad-armering",images:["vara1.png","vara1-2.png"]},{id:2,name:"B-detalj",price:22,rating:3.8,category:"bockad-armering",images:["vara1.png","vara1-2.png"]},{id:3,name:"C-detalj",price:28,rating:4.7,category:"bockad-armering",images:["vara1.png","vara1-2.png"]},{id:4,name:"D-detalj",price:30,rating:4.3,category:"for-pelare",images:["vara3.png","vara3-2.png"]},{id:5,name:"E-detalj",price:29,rating:4.1,category:"for-pelare",images:["vara3.png","vara3-2.png"]},{id:6,name:"F-detalj",price:31,rating:4.5,category:"for-pelare",images:["vara3.png","vara3-2.png"]},{id:7,name:"G-detalj",price:35,rating:4.8,category:"for-fundament",images:["vara4.png","vara4-2.png"]},{id:8,name:"H-detalj",price:34,rating:4.4,category:"for-fundament",images:["vara4.png","vara4-2.png"]},{id:9,name:"I-detalj",price:36,rating:4.9,category:"for-fundament",images:["vara4.png","vara4-2.png"]},{id:10,name:"J-detalj",price:37,rating:4.6,category:"for-fundament",images:["vara4.png","vara4-2.png"]},{id:11,name:"K-detalj",price:30,rating:4,category:"for-vaggar",images:["vara5.png","vara5-2.png"]},{id:12,name:"L-detalj",price:32,rating:4.4,category:"for-vaggar",images:["vara5.png","vara5-2.png"]},{id:13,name:"M-detalj",price:25,rating:4.1,category:"for-vaggar",images:["vara5.png","vara5-2.png"]},{id:14,name:"N-detalj",price:20,rating:3.9,category:"for-vaggar",images:["vara5.png","vara5-2.png"]}];function q(n){return`${n.getFullYear()}-${S(n.getMonth()+1)}-${S(n.getDate())}`}function S(n){return String(n).padStart(2,"0")}function $(){const n=document.querySelector("#openCloseNavMenu"),o=document.querySelector("#navBugerJs");n.addEventListener("click",s),o.addEventListener("click",s);function s(){n.classList.toggle("open"),o.classList.toggle("open")}}const p=[];function N(n){const o=document.querySelector("#cart"),s=document.querySelector("#cartTotal");function b(t){const d=Number(t.target.dataset.id),y=n.find(a=>a.id===d);if(y===void 0)return;const i=document.querySelector(`#amount-${d}`),e=Number(i.value),v=e>0?e:1,L=p.findIndex(a=>a.id===d);L===-1?p.push({...y,amount:v}):p[L].amount+=v,r(),f()}function r(){const t=p.reduce((d,y)=>d+y.price*y.amount,0);s.textContent=`Totalt: ${t} kr`,c()}function c(){s.classList.add("highlight-price"),setTimeout(g,1e3*1.5)}function g(){s.classList.remove("highlight-price")}function f(){o.innerHTML="";for(let t=0;t<p.length;t++)o.innerHTML+=`
    <article>
      ${p[t].name}:
      <button data-id="${t}" class="decrease-cart-product">-</button>
      ${p[t].amount} st
      <button data-id="${t}" class="increase-cart-product">+</button>
      <button data-id="${t}" class="delete-product">Radera</button>
    </article> 
    `;o.innerHTML+=`
  <div class="cartOrder">
    <button class="orderCartBtn" type="button">Beställ</button>
    <button class="closeCheckoutBtn" type="button">X</button>
  </div>
`}document.addEventListener("click",t=>{t.target.classList.contains("buy")&&b(t)}),o.addEventListener("click",t=>{if(t.target.classList.contains("decrease-cart-product")){const d=Number(t.target.dataset.id);p[d].amount>1?p[d].amount-=1:p.splice(d,1),r(),f();return}if(t.target.classList.contains("increase-cart-product")){const d=Number(t.target.dataset.id);p[d].amount+=1,r(),f();return}if(t.target.classList.contains("delete-product")){const d=Number(t.target.dataset.id);p.splice(d,1),r(),f();return}}),o.addEventListener("click",t=>{if(t.target.closest(".orderCartBtn")){checkoutForm.style.display=checkoutForm.style.display==="block"?"none":"block";return}if(t.target.closest(".closeCheckoutBtn")){checkoutForm.style.display="none";return}})}function M(n){const o=document.querySelector("#productsList"),s=document.querySelector("#categoryFilter"),b=document.querySelector("#sortByNameBtn"),r=document.querySelector("#sortByPriceBtn"),c=document.querySelector("#sortByRatingBtn");let g=n;s.addEventListener("change",d),o.addEventListener("click",i),b.addEventListener("click",t),r.addEventListener("click",y),c.addEventListener("click",f);function f(){g.sort((a,m)=>m.rating-a.rating),e(s.value)}function t(){g.sort((a,m)=>a.name.localeCompare(m.name)),e()}function d(){g=n.filter(a=>!s.value||a.category===s.value),e()}function y(){g.sort((a,m)=>m.price-a.price),e(s.value)}function i(a){if(!a.target.classList.contains("dot"))return;const m=a.target.parentElement,h=[...m.children],l=h.indexOf(a.target),u=m.previousElementSibling,B=JSON.parse(u.dataset.images);u.src=`img/${B[l]}`,u.dataset.index=l,h.forEach((E,C)=>{E.classList.toggle("active",C===l)})}function e(){o.innerHTML="";let a="";for(let l=0;l<g.length;l++){const u=g[l];a+=`
    <article>
    <h3>${u.name}</h3>
    <p>ID: ${u.id}</p>
       <div class="img-wrap">

        <img
          src="img/${u.images[0]}"
           data-images='${JSON.stringify(u.images)}'
            data-index="0" class="product-img" 
          >

          <div class="img-dots">
            ${u.images.map((B,E)=>`<span class="dot ${E===0?"active":""}"></span>`).join("")}
          </div>

     </div>

      <div class="metadata">
          <p>Pris: ${u.price} kr</p>
          <p>Betyg: ${u.rating}/5</p>
        </div>
    <p>Categori: ${u.category}</p>

    <div class="buy-row">
    <div class="amount-row">
      <button class="decrease" min="0" data-id="${u.id}">-</button>
      <input id="amount-${u.id}" type="number" min="0" disabled>
      <button class="increase" data-id="${u.id}">+</button>
    </div>
      <button class="buy" data-id="${u.id}">Köp</button>
    </div>
    
    </article> 
    `}o.innerHTML=a,document.querySelectorAll("#productsList button.increase").forEach(l=>{l.addEventListener("click",v)}),document.querySelectorAll("#productsList button.decrease").forEach(l=>{l.addEventListener("click",L)}),document.querySelectorAll("#productsList button.buy")}function v(a){const m=a.target.dataset.id,h=document.querySelector(`#amount-${m}`);h.value=Number(h.value)+1}function L(a){const m=a.target.dataset.id,h=document.querySelector(`#amount-${m}`);let l=Number(h.value)-1;l<0&&(l=0),h.value=l}e()}function P(){const n=document.querySelector("#checkoutForm"),o=document.querySelector("#submitBtn");n.addEventListener("input",s),n.addEventListener("change",s);function s(){let i=n.checkValidity();const e=n.querySelector('input[name="payment"]:checked');e||(i=!1);const v=/^(\d{10}|\d{12}|\d{6}[- ]\d{4}|\d{8}[- ]\d{4})$/;function L(a){return v.test(a.trim())}e?.value==="invoice"&&(L(f.value)?f.setCustomValidity(""):(i=!1,f.setCustomValidity("Ogiltigt personnummer"))),o.disabled=!i}n.addEventListener("submit",i=>{if(!n.checkValidity()){i.preventDefault(),n.reportValidity();return}console.log("BESTÄLLNING OK")}),document.querySelector("#closeCheckoutBtn").addEventListener("click",()=>{n.style.display="none"});const b=document.querySelectorAll('input[name="payment"]'),r=document.querySelector("#invoiceFields"),c=document.querySelector("#cardFields"),g=c.querySelectorAll("input"),f=document.querySelector("#personnummer");b.forEach(i=>{i.addEventListener("change",()=>{const e=i.value==="card",v=i.value==="invoice";c.hidden=!e,r.hidden=!v,g.forEach(L=>{L.required=e}),f.required=v})}),n.addEventListener("input",i=>{const e=i.target;e instanceof HTMLInputElement&&e.id&&(e.dataset.touched="true",e.validity.valueMissing?t(e,"Detta fält är obligatoriskt"):e.validity.patternMismatch?t(e,y(e)):e.validity.typeMismatch?t(e,"Ogiltigt format"):d(e))});function t(i,e){const v=document.getElementById(i.id+"Error");v.textContent=e}function d(i){const e=document.getElementById(i.id+"Error");e.textContent=""}function y(i){switch(i.id){case"firstName":case"lastName":case"city":return"Endast bokstäver tillåtna";case"phone":return"Ange ett giltigt telefonnummer";case"email":return"Ange en giltig e-postadress";case"zip":return"Ange ett giltigt postnummer";default:return"Ogiltigt format"}}}const T=new Date;document.querySelector("#today").innerHTML=q(T);$();N(k);M(k);P();
