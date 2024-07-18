import { setClickAll } from "./utils.mjs";
async function getRecipe() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?from=-10&size=20&tags=under_30_minutes';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fbd67d2c6emsha591a205fd69c3bp1a4f1cjsn105a8f5193c6',
            'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getRecipe();
setClickAll(".top-recipe", function() {
    window.location.href = "/recipe_pages/index.html";
});
setClickAll(".find-recipes", function() {
    window.location.href = "/recipe_listing/index.html";
});
console.log("URL", window.location.href);