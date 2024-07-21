import{g as o,a as r,b as a,l as c}from"./utils-C5dCPio-.js";import{R as l}from"./RecipeData-mkzlsgtG.js";function d(t){return t.map(e=>`<li>${e.raw_text}</li>`).join(" ")}function u(t){return t.map(e=>`<li>${e.display_text}</li>`).join(" ")}function m(t){const i=[];for(const e in t)e!=="updated_at"&&i.push(`<li>${e}: ${t[e]}</li>`);return i.join("")}function p(t){return`<h1 class="name">${t.name}</h1>
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
                <ul>${d(t.sections[0].components)}</ul>
        </section>
          <section id="preparation">
          <h2>Preparation</h2>
          <ol>${u(t.instructions)}</ol>
        </section>
        <section id="nutrition">
          <h2>Nutritional Facts</h2>
          <ul>${m(t.nutrition)}</ul>
        </section>`}class g{constructor(i,e){this.recipeId=i,this.recipe={},this.dataSource=e}async init(){const i=await this.dataSource.getData(),e=i.filter(s=>s.id==this.recipeId);this.recipe=e[0],console.log("recipe: ",i),this.renderRecipeDetails()}addProductToCart(){let i=o("so-cart")||[];const e={...this.product,uniqueId:Date.now().toString()};i.push(e),r("so-cart",i)}renderRecipeDetails(){document.querySelector("#recipe-details").insertAdjacentHTML("afterBegin",p(this.recipe))}}const h=new l,n=a("recipe");console.log("Recipe: ",n);const f=new g(n,h);c();f.init();
