import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
  apiKey: "255bcd2e5a8190208b4a4d94df9b6c53",
  movies: [],
  search: "",
  inputSearch: "",
  state: "welcome",
  moviePage: 1,
  moveTotalPage: 0,
  tvPage: 1,
  tvTotalPage: 0,
  loadMore: true,
  async getMovies() {
    store.state = "loading";
    store.loadMore = true;

    try {
      // Define the URLs for the requests
      const movie = "https://api.themoviedb.org/3/search/movie?api_key=" + store.apiKey + "&query=" + store.inputSearch;
      const tv = "https://api.themoviedb.org/3/search/tv?api_key=" + store.apiKey + "&query=" + store.inputSearch;

      // Make multiple requests using Promise.all
      const [responseMovie, responseTv] = await Promise.all([axios.get(movie), axios.get(tv)]);

      // Set total page
      store.moveTotalPage = responseMovie.data.total_pages;
      store.tvTotalPage = responseTv.data.total_pages;

      // Set load more
      if (store.moviePage === store.moveTotalPage && store.tvPage === store.tvTotalPage) {
        store.loadMore = false;
      }

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
  async loadmore() {
    store.moviePage += 1;
    store.tvPage += 1;

    try {
      // Define the URLs for the requests
      const movie = "https://api.themoviedb.org/3/search/movie?api_key=" + store.apiKey + "&query=" + store.search + "&page=" + store.moviePage;
      const tv = "https://api.themoviedb.org/3/search/tv?api_key=" + store.apiKey + "&query=" + store.search + "&page=" + store.tvPage;

      // Make multiple requests using Promise.all
      const [responseMovie, responseTv] = await Promise.all([axios.get(movie), axios.get(tv)]);

      // Set movies in store
      store.movies = store.movies.concat(responseMovie.data.results.concat(responseTv.data.results));
    } catch (error) {
      // Handle any errors
      console.log(error);
      store.state = "error";
    } finally {
      // Show the results
      if (store.moviePage >= store.moveTotalPage && store.tvPage >= store.tvTotalPage) {
        store.loadMore = false;
      }
    }
  },
});
