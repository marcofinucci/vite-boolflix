import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
  apiKey: "255bcd2e5a8190208b4a4d94df9b6c53",
  movies: [],
  search: "",
  inputSearch: "",
  state: "welcome",
  async getMovies() {
    store.state = "loading";

    try {
      // Define the URLs for the requests
      const movie = "https://api.themoviedb.org/3/search/movie?api_key=" + store.apiKey + "&query=" + store.inputSearch;
      const tv = "https://api.themoviedb.org/3/search/tv?api_key=" + store.apiKey + "&query=" + store.inputSearch;

      // Make multiple requests using Promise.all
      const [responseMovie, responseTv] = await Promise.all([axios.get(movie), axios.get(tv)]);

      console.log("Movie total page: " + responseMovie.data.total_pages);
      console.log("Movie total result: " + responseMovie.data.total_results);

      console.log("Tv total page: " + responseTv.data.total_pages);
      console.log("Tv total result: " + responseTv.data.total_results);

      // Set movies in store
      store.movies = responseMovie.data.results.concat(responseTv.data.results);
      store.search = store.inputSearch;

      // Reset input
      store.inputSearch = "";
    } catch (error) {
      // Handle any errors
      console.log(error);
      store.state = "error";
    } finally {
      // Show the results
      store.movies.length === 0 ? (store.state = "noResult") : (store.state = "result");
    }
  },
});
