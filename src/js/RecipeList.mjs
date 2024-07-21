import { renderListWithTemplate, setClickAll } from "./utils.mjs";
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

function recipeCardTemplate(recipe) {
    return `
    <li class="recipe" data-id=${recipe.id}>
        <a href="/recipe_pages/index.html?recipe=${recipe.id}"><img src=${recipe.thumbnail_url}>
        <h2>${recipe.name}</h2>
        <p>${limitDescription(recipe.description)}...</p>
        <button class="green-btn add-recipe-btn">
           <!-- <img src="/images/add-recipe-icon.png"> -->
        </button></a>
    </li>`;
}
export default class RecipeList {
  constructor(dataSource, listElement) {
    // this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    try {
      const list = await this.dataSource.getData();
      this.renderList(list);
      this.addEventsToList();
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
 }

 filterProducts(list) {
   // Array of IDs of the four products we want to display
   const productIdsToShow = ["880RR", "985RF", "985PR", "344YJ"];
   // Filter the list to include only those products with matching IDs
   return list.filter(product => productIdsToShow.includes(product.Id));
 }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(recipeCardTemplate, this.listElement, list);
  }
  addEventsToList() {
    setClickAll(".recipe", function(e) {
        window.location.href = `/recipe_pages/index.html?id=${e.target.dataset.id}`
    });
  }
}