import RecipeData from "./RecipeData.mjs";
import RecipeList from "./RecipeList.mjs";
import { loadHeaderFooter, setClickAll } from "./utils.mjs";

const dataSource = new RecipeData();
const element = document.querySelector(".recipes-list ul");
const listing = new RecipeList(dataSource, element);
loadHeaderFooter();
listing.init();