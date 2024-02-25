<script>
import axios from "axios";

export default {
  data() {
    return {
      apiKey: "255bcd2e5a8190208b4a4d94df9b6c53",
      inputSearch: "Scrub",
      movies: [],
    };
  },
  methods: {
    getMovies() {
      // Define the URLs for the requests
      const movie = "https://api.themoviedb.org/3/search/movie?api_key=" + this.apiKey + "&query=" + this.inputSearch;
      const tv = "https://api.themoviedb.org/3/search/tv?api_key=" + this.apiKey + "&query=" + this.inputSearch;

      // Make multiple requests using Promise.all
      Promise.all([axios.get(movie), axios.get(tv)])
        .then((response) => {
          const responseMovie = response[0];
          const responseTv = response[1];
          // Handle the responses
          this.movies = responseMovie.data.results.concat(responseTv.data.results);
          console.log(this.movies);
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
    <input v-model="inputSearch" type="text" />
    <button @click="getMovies()">Search</button>
  </header>
  <main>
    <ul>
      <li style="margin-top: 3rem" v-for="movie in this.movies" :key="movie.id">
        <div>
          <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title" />
        </div>
        <div>Title: {{ movie.title ? movie.title : movie.name }}</div>
        <div>Original Title: {{ movie.original_title ? movie.original_title : movie.original_name }}</div>
        <div>Language: {{ movie.original_language }}</div>
        <div>Vote: {{ movie.vote_average }}</div>
      </li>
    </ul>
  </main>
  <footer>footer</footer>
</template>

<style scoped></style>
