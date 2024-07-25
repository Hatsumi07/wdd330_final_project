import { renderListWithTemplate, setClick, setClickAll, getLocalStorage, setLocalStorage } from "./utils.mjs";
function limitDescription(description) {
  const words = description.split(" ");
  const wrdLimit = 9;
  if(words.length > wrdLimit) {
    const newWrds = words.slice(0, wrdLimit);
    return newWrds.join(" ");
  } else {
    return description;
  }
 }

function isLowCarb(topics) {
  const regex = /low.*carb|carb.*low/i;
  const slugs = topics.map(topic => topic.slug);
  const islowcarb = slugs.find(slug => regex.test(slug));
  // const splitString = myString.split(/[\s,-]/);
  if (islowcarb === undefined) {
    return false;
  }
  return true;
 }

function recipeCardTemplate(recipe) {
    return `
    <li class="recipe" data-id=${recipe.id}>
        <a href="/recipe_pages/index.html?recipe=${recipe.id}">
        <span class=${isLowCarb(recipe.topics) ? "low-carb" : "hidden"}>
          ${isLowCarb(recipe.topics) ? "low-carb" : ""}
        </span>
        <img src=${recipe.thumbnail_url}>
        <h2>${recipe.name}</h2>
        <p>${limitDescription(recipe.description)}...</p>
        </a>
        <button data-id=${recipe.id} class="green-btn add-recipe-btn">
           <!-- <img src="/images/add-recipe-icon.png"> -->
        </button>
    </li>`;
}

export default class RecipeList {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.recipes;
  }
  async init() {
    try {
      this.recipes = await this.dataSource.getData();
      this.renderRecipes();

      setClickAll(".add-recipe-btn", e => {
        e.stopPropagation();
        this.addToFavorites(e);
      });

    } catch (error) {
      console.log("Error fetching data: ", error);
    }
 }

 addToFavorites(e) {
  const favRecipe = this.recipes.find(recipe => recipe.id == e.target.dataset.id);
  const favRecipes = getLocalStorage("favorite-recipes") || [];
  favRecipes.push(favRecipe);
  setLocalStorage("favorite-recipes", favRecipes);
}

 loadMoreProducts() {
  setClick("#load-more", function(e) {

  });
 }

 getCategories(list) {
  const topics = list.flatMap(item => item.topics);
  const Slugs = topics.flatMap(item => item.slug);
  // return Slugs;
  return [...new Set(Slugs)];
  }

 filterProducts(list) {
   // Array of IDs of the four products we want to display
   const productIdsToShow = ["880RR", "985RF", "985PR", "344YJ"];
   // Filter the list to include only those products with matching IDs
   return list.filter(product => productIdsToShow.includes(product.Id));
 }
  // render after doing the first stretch
  renderRecipes() {
    renderListWithTemplate(recipeCardTemplate, this.listElement, this.recipes);
  }
}