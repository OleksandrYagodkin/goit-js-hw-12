/* empty css                      */import{a as S,S as M,i as l}from"./assets/vendor-BH9GyP-n.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const q="https://pixabay.com/api/",x="49742699-859ed69688f97e3fc464fd8bc";async function p(a,o){const n={key:x,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};try{const t=await S.get(q,{params:n});return console.log(t),t.data}catch(t){throw t}}const g=document.querySelector(".gallery"),h=document.querySelector(".loader"),b=document.querySelector(".load-more-hidden");console.dir(h);function v(a){return a.map(({webformatURL:o,largeImageURL:n,tags:t,likes:e,views:r,comments:i,downloads:C})=>`<li class="gallery-item">
            <a href="${n}" class="gallery-link">
                <img class="gallery-img" src="${o}" alt="${t}" />
            </a>
            <div class="info">
                <div class="info-colum">
                    <p class="info-title">Likes</p>
                    <p class="info-value">${e}</p>
                </div>
                <div class="info-colum">
                    <p class="info-title">Views</p>
                    <p class="info-value">${r}</p>
                </div>
                <div class="info-colum">
                    <p class="info-title">Comments</p>
                    <p class="info-value">${i}</p>
                </div>
                <div class="info-colum">
                    <p class="info-title">Downloads</p>
                    <p class="info-value">${C}</p>
                </div>
            </div>
        </li>`).join("")}function P(){g.innerHTML=""}function L(){h.style.display="block"}function y(){h.style.display="none"}function B(){b.style.display="block"}function f(){b.style.display="none"}const c=new URL("./img/icon-error.svg",import.meta.url).href,u=document.querySelector(".form"),m=document.querySelector(".js-load-more");m.addEventListener("click",W);let s=1,d="";console.dir(u);const w=new M(".gallery a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0});y();f();u.addEventListener("submit",U);async function U(a){if(a.preventDefault(),d=u.elements["search-text"].value.trim(),!!d){P(),s=1,L();try{const{hits:o,totalHits:n}=await p(d,s);if(o.length===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:" #ef4040",maxWidth:"434",messageColor:" #fafafb",iconColor:" #fafafb",iconUrl:c}),f();return}g.innerHTML=v(o),w.refresh();const t=Math.ceil(n/15);s<t?B():(f(),l.info({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4caf50",maxWidth:"434",messageColor:" #fafafb",iconColor:" #fafafb",iconUrl:c}))}catch{l.info({message:"Something went wrong!",backgroundColor:" #ef4040",maxWidth:"434",messageColor:" #fafafb",iconColor:" #fafafb",iconUrl:c})}finally{y()}u.reset()}}async function W(){s++,L(),m.disabled=!0;try{const{hits:a,totalHits:o}=await p(d,s);g.insertAdjacentHTML("beforeend",v(a)),w.refresh();const{height:n}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:n*2.5,behavior:"smooth"});const t=Math.ceil(o/15);s>=t&&(f(),l.info({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4caf50",maxWidth:"434",messageColor:" #fafafb",iconColor:" #fafafb",iconUrl:c})),m.disabled=!1}catch{f(),l.info({message:"Something went wrong while loading more images!",backgroundColor:" #ef4040",maxWidth:"434",messageColor:" #fafafb",iconColor:" #fafafb",iconUrl:c})}finally{y()}}
//# sourceMappingURL=index.js.map
