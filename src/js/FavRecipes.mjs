import { getLocalStorage, renderListWithTemplate, setClickAll, setLocalStorage } from "./utils.mjs";

function favRecipesTemplate(recipe) {
    return `
    <li class="recipe" data-id=${recipe.id}>
        <span id="remove-recipe" data-id="${recipe.id}"></span>
        <a href="/recipe_pages/index.html?recipe=${recipe.id}">
            <img src="${recipe.thumbnail_url}" alt="${recipe.name}"/>
            <h2>${recipe.name}</h2>
        </a>
    </li>`;
}

export default class FavRecipes {
    constructor() {
        //
    }
    init() {
        this.renderFavRecipes();
    }
    renderFavRecipes() {
        const favRecipes = getLocalStorage("favorite-recipes");
        const favoritesList = document.querySelector("#favorites-list");
      
        if (Array.isArray(favRecipes) && favRecipes.length > 0) {
            
            renderListWithTemplate(favRecipesTemplate, favoritesList, favRecipes, "afterbegin", true);

          setClickAll("#remove-recipe", this.removeFromFavs.bind(this));
        } else {
            favoritesList.innerHTML = "No Recipes Added Yet!";
        }
    }

    removeFromFavs(event) {
        console.log("remove item clicked");
        console.log(event.target.dataset.id);
        const recipeId = parseInt(event.target.dataset.id); 
        const favRecipes = getLocalStorage("favorite-recipes");
        const filteredFavRecipes = favRecipes.filter(item => parseInt(item.id) !== parseInt(recipeId));
        setLocalStorage("favorite-recipes", filteredFavRecipes);
        this.renderFavRecipes();
    }
}