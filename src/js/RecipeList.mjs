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
      const loadingIndicator = document.querySelector("#placeholder-recipes-list");
      loadingIndicator.style.display = 'grid';
      this.recipes = await this.dataSource.getData();
      loadingIndicator.style.display = 'none';
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
  e.target.classList.add("btn-clicked");
  const recipe = this.recipes.find(recipe => recipe.id == e.target.dataset.id);
  const favRecipes = getLocalStorage("favorite-recipes") || [];
  const recipesId = favRecipes.flatMap(item => item.id);
  const alreadyFav = recipesId.includes(recipe.id);
  console.log(alreadyFav);
  if(recipesId.includes(recipe.id)) {
    setTimeout(() => {
      e.target.classList.remove("btn-clicked");
      alert("Recipe already saved!");
    }, 250);
  } else {
    setTimeout(() => {
      e.target.classList.remove("btn-clicked");
      favRecipes.push(recipe);
      setLocalStorage("favorite-recipes", favRecipes);
    }, 250);
  }
}

 getCategories(list) {
  const topics = list.flatMap(item => item.topics);
  const Slugs = topics.flatMap(item => item.slug);
  return [...new Set(Slugs)];
  }

  renderRecipes() {
    renderListWithTemplate(recipeCardTemplate, this.listElement, this.recipes);
  }
}