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
                'x-rapidapi-key': 'fbd67d2c6emsha591a205fd69c3bp1a4f1cjsn105a8f5193c6',
                'x-rapidapi-host': 'tasty.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const data = await convertToJson(response);
        return data.results;
    } catch {
      console.log("Error fetching data: ", error);
    }
  }
//   async findProductById(id) {
//     const response = await fetch(`${baseURL}product/${id}`)
//     const product = await convertToJson(response);
//     return product.Result;
//   }
}