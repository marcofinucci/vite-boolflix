<script>
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "Header",
  data() {
    return {
      store,
      inputSearch: "",
    };
  },
  methods: {
    async getMovies() {
      store.state = "loading";

      try {
        // Define the URLs for the requests
        const movie = "https://api.themoviedb.org/3/search/movie?api_key=" + store.apiKey + "&query=" + this.inputSearch;
        const tv = "https://api.themoviedb.org/3/search/tv?api_key=" + store.apiKey + "&query=" + this.inputSearch;

        // Make multiple requests using Promise.all
        const [responseMovie, responseTv] = await Promise.all([axios.get(movie), axios.get(tv)]);

        // Handle the responses
        store.movies = responseMovie.data.results.concat(responseTv.data.results);
        store.search = this.inputSearch;
      } catch (error) {
        // Handle any errors
        console.log(error);
        store.state = "error";
      } finally {
        // Show the results
        store.movies.length === 0 ? (store.state = "noResult") : (store.state = "result");
      }
    },
  },
};
</script>

<template>
  <header>
    <div class="container header-inner">
      <!-- Logo -->
      <div class="logo">Boolflix</div>

      <!-- Search -->
      <form @submit.prevent="getMovies" class="search">
        <input type="text" v-model="this.inputSearch" placeholder="Search films and series" />
        <button type="submit">Search</button>
      </form>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: var(--extradark);
  z-index: 2;
}

.header-inner {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
  }
}

.logo {
  color: var(--primary);
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.search {
  display: flex;
  width: 100%;
  max-width: 37.5rem;
  margin-left: 1.5rem;

  @media (max-width: 576px) {
    margin-top: 0.75rem;
    margin-left: 0;
  }
}

input {
  border: 1px solid var(--lightmedium);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: var(--extralight);
  width: 100%;

  &::placeholder {
    color: var(--lightmedium);
  }

  &:focus {
    border-color: var(--extralight);
  }
}

button {
  background-color: var(--primary);
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary);
  margin-left: 0.75rem;
  transition: opacity 0.3s ease;
  cursor: pointer;
  border-radius: 0.25rem;
  color: var(--extralight);

  &:hover {
    opacity: 0.9;
  }
}
</style>
