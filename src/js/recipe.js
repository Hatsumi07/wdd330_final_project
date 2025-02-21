import { getParam, loadHeaderFooter } from "./utils.mjs";
import RecipeData from "./RecipeData.mjs";
import RecipeDetails from "./RecipeDetails.mjs";

const dataSource = new RecipeData();
const recipeId = getParam("recipe");

const recipe = new RecipeDetails(recipeId, dataSource);
loadHeaderFooter();
recipe.init();