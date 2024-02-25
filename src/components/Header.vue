<script>
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "Header",
  data() {
    return {
      store,
      inputSearch: "Scrub",
    };
  },
  methods: {
    getMovies() {
      // Define the URLs for the requests
      const movie = "https://api.themoviedb.org/3/search/movie?api_key=" + store.apiKey + "&query=" + this.inputSearch;
      const tv = "https://api.themoviedb.org/3/search/tv?api_key=" + store.apiKey + "&query=" + this.inputSearch;

      // Make multiple requests using Promise.all
      Promise.all([axios.get(movie), axios.get(tv)])
        .then((response) => {
          const responseMovie = response[0];
          const responseTv = response[1];
          // Handle the responses
          store.movies = responseMovie.data.results.concat(responseTv.data.results);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
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
      <div class="search">
        <input type="text" v-model="inputSearch" placeholder="Search films and series" />
        <button @click="getMovies()">Search</button>
      </div>
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
}

input {
  border: 1px solid var(--extralight);
  padding: 0.5rem;

  &::placeholder {
    color: var(--lightmedium);
  }
}

button {
  background-color: var(--primary);
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary);
  margin-left: 0.75rem;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
</style>
