import { setLocalStorage, getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
function renderIngredients(list) {
  const htmlList = list.map(item => `<li>${item.raw_text}</li>`);
  return htmlList.join(" ");
};

function renderPreparation(list) {
  const htmlList = list.map(item => `<li>${item.display_text}</li>`);
  return htmlList.join(" ");
};

function renderNutritionFacts(object) {
  const htmlList = [];
  for (const key in object) {
    if (key === "updated_at") {
      continue;
    }
    htmlList.push(`<li>${key}: ${object[key]}</li>`);
  }
  return htmlList.join("");
}
function recipeCommentsTemplate(comment) {
  return `
  <li class="recipe-comment">
    <img src="/images/user-icon.png">
    <h3>${comment.author_username}</h3>
    <p>${comment.tip_body}</p>
  </li>`;
}
function recipeDetailsTemplate(recipe) {
    return `<h1 class="name">${recipe.name}</h1>
        <img class="main-img" src=${recipe.thumbnail_url}>
        <section id="info">
                <div id="cook-time">
                    <img src="../images/cooking_time.png">
                    <span>${recipe.total_time_tier.display_tier}</span>
                </div>
                <div id="servings">
                    <img src="../images/servings_icon.png">
                    <span>${recipe.num_servings} servings</span>
                </div>
        </section>
        <section id="ingredients">
                <h2>Ingredients</h2>
                <ul>${renderIngredients(recipe.sections[0].components)}</ul>
        </section>
          <section id="preparation">
          <h2>Preparation</h2>
          <ol>${renderPreparation(recipe.instructions)}</ol>
        </section>
        <section id="nutrition">
          <h2>Nutritional Facts</h2>
          <ul>${renderNutritionFacts(recipe.nutrition)}</ul>
        </section>`;
  }

  function getDiscount(originalPrice, finalPrice) {
    const discount = (originalPrice - finalPrice) / (originalPrice / 100);
    return Math.round(discount);
  }
  
  export default class ProductDetails {
    constructor(id, dataSource) {
      this.recipeId = id;
      this.recipe = {};
      this.dataSource = dataSource;
    }
    async init() {
      const recipes = await this.dataSource.getData();
      const recipeById = recipes.filter(recipe => recipe.id == this.recipeId);
      this.recipe = recipeById[0];
      
      this.renderRecipeDetails();
      await this.displayComments(this.recipeId);
    }
    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        const itemWithUniqueId = { ...this.product, uniqueId: Date.now().toString() };
        cartItems.push(itemWithUniqueId);
        setLocalStorage("so-cart", cartItems);
    }
    renderRecipeDetails() {
      const element = document.querySelector("#recipe-details");
      element.insertAdjacentHTML(
        "afterBegin",
        recipeDetailsTemplate(this.recipe)
      );
    }
    async displayComments(id) {
      const element = document.querySelector("#recipe-comments");
      const url = `https://tasty.p.rapidapi.com/tips/list?from=0&size=3&id=${id}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '1aff26895cmsh06f0d822468b8efp1377bdjsn38be06299bd2',
          'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
        const data = await convertToJson(response);
        renderListWithTemplate(recipeCommentsTemplate, element, data.results);
      } catch (error) {
        console.error(error);
      }
    }
  }