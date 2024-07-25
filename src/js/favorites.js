import { loadHeaderFooter } from "./utils.mjs";
import FavRecipes from "./FavRecipes.mjs";

const favorites = new FavRecipes;
loadHeaderFooter();
favorites.init();