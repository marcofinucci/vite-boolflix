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
    <h1>Hai cercato: {{ store.search }}</h1>
    <ul>
      <Card v-for="movie in store.movies" :key="movie.id" :movie="movie" />
    </ul>
  </main>
</template>

<style scoped>
main {
  margin-top: 7rem;
  flex-grow: 1;
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
</style>
