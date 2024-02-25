<script>
import { store } from "../store.js";
import Card from "./Card.vue";

export default {
  name: "Main",
  data() {
    return {
      store,
    };
  },
  components: {
    Card,
  },
};
</script>

<template>
  <main class="container">
    <!-- Welcome -->
    <h1 v-if="store.state === 'welcome'">Welcome to Boolflix<br />Use the search bar to find your favorite movies</h1>

    <!-- Loading -->
    <h1 v-if="store.state === 'loading'">Loading...</h1>

    <!-- Result -->
    <div v-if="store.state === 'result'">
      <h1>You searched: {{ store.search }}</h1>
      <ul>
        <Card v-for="movie in store.movies" :key="movie.id" :movie="movie" />
      </ul>
      <button v-if="store.loadMore" @click="store.loadmore">Load more</button>
    </div>

    <!-- No result -->
    <h1 v-if="store.state === 'noResult'">Your search returned no results, try again</h1>

    <!-- Error -->
    <h1 v-if="store.state === 'error'">Sorry, is there an error with results</h1>
  </main>
</template>

<style scoped>
main {
  margin-top: 7rem;
  flex-grow: 1;

  @media (max-width: 576px) {
    margin-top: 10rem;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
}

h1 {
  color: var(--extralight);
  font-size: 1.5rem;
}

button {
  background-color: var(--medium);
  padding: 0.5rem 1rem;
  transition: opacity 0.3s ease;
  cursor: pointer;
  border-radius: 0.25rem;
  color: var(--extralight);
  margin: 4rem auto 0;
  display: table;
  &:hover {
    opacity: 0.9;
  }
}
</style>
