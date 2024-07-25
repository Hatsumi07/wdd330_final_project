import{g as o,a as r,b as a,l as c}from"./utils-Cah9y1hN.js";function d(t){if(t.ok)return t.json();throw new Error("Bad Response")}class l{constructor(){}async getData(){try{const n=await fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes",{method:"GET",headers:{"x-rapidapi-key":"fbd67d2c6emsha591a205fd69c3bp1a4f1cjsn105a8f5193c6","x-rapidapi-host":"tasty.p.rapidapi.com"}});return(await d(n)).results}catch{console.log("Error fetching data: ",error)}}}function p(t){return t.map(i=>`<li>${i.raw_text}</li>`).join(" ")}function u(t){return t.map(i=>`<li>${i.display_text}</li>`).join(" ")}function m(t){const e=[];for(const i in t)i!=="updated_at"&&e.push(`<li>${i}: ${t[i]}</li>`);return e.join("")}function h(t){return`<h1 class="name">${t.name}</h1>
        <img class="main-img" src=${t.thumbnail_url}>
        <section id="info">
                <div id="cook-time">
                    <img src="../images/cooking_time.png">
                    <span>${t.total_time_tier.display_tier}</span>
                </div>
                <div id="servings">
                    <img src="../images/servings_icon.png">
                    <span>${t.num_servings} servings</span>
                </div>
        </section>
        <section id="ingredients">
                <h2>Ingredients</h2>
                <ul>${p(t.sections[0].components)}</ul>
        </section>
          <section id="preparation">
          <h2>Preparation</h2>
          <ol>${u(t.instructions)}</ol>
        </section>
        <section id="nutrition">
          <h2>Nutritional Facts</h2>
          <ul>${m(t.nutrition)}</ul>
        </section>`}class g{constructor(e,i){this.recipeId=e,this.recipe={},this.dataSource=i}async init(){const e=await this.dataSource.getData(),i=e.filter(n=>n.id==this.recipeId);this.recipe=i[0],console.log("recipe: ",e),this.renderRecipeDetails()}addProductToCart(){let e=o("so-cart")||[];const i={...this.product,uniqueId:Date.now().toString()};e.push(i),r("so-cart",e)}renderRecipeDetails(){document.querySelector("#recipe-details").insertAdjacentHTML("afterBegin",h(this.recipe))}}const f=new l,s=a("recipe");console.log("Recipe: ",s);const _=new g(s,f);c();_.init();
