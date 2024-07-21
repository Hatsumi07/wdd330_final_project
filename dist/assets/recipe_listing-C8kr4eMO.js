import{r,s as n,l as a}from"./utils-C5dCPio-.js";import{R as o}from"./RecipeData-mkzlsgtG.js";function c(e){const t=e.split(" "),i=9;return t.length>i?t.slice(0,i).join(" "):e}function d(e){return`
    <li class="recipe" data-id=${e.id}>
        <a href="/recipe_pages/index.html?recipe=${e.id}"><img src=${e.thumbnail_url}>
        <h2>${e.name}</h2>
        <p>${c(e.description)}...</p>
        <button class="green-btn add-recipe-btn">
           <!-- <img src="/images/add-recipe-icon.png"> -->
        </button></a>
    </li>`}class l{constructor(t,i){this.dataSource=t,this.listElement=i}async init(){try{const t=await this.dataSource.getData();this.renderList(t),this.addEventsToList()}catch(t){console.log("Error fetching data: ",t)}}filterProducts(t){const i=["880RR","985RF","985PR","344YJ"];return t.filter(s=>i.includes(s.Id))}renderList(t){r(d,this.listElement,t)}addEventsToList(){n(".recipe",function(t){window.location.href=`/recipe_pages/index.html?id=${t.target.dataset.id}`})}}const u=new o,m=document.querySelector(".recipes-list ul"),p=new l(u,m);a();p.init();
