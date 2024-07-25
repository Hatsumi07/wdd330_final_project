// const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class RecipeData {
  constructor() {
  }
  async getData() {
    try {
        const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '1aff26895cmsh06f0d822468b8efp1377bdjsn38be06299bd2',
		            'x-rapidapi-host': 'tasty.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const data = await convertToJson(response);
        const results = data.results;
        const endResults = [];

        results.map( recipe => {
          // Adds isFavorite attribute to recipe object
          endResults.push({...recipe, isFavorite: false}); 
        });
        
        return endResults;
    } 
    
    catch {
      console.log("Error fetching data: ", error);
    }
  }
}