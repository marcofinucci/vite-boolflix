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
    <ul>
      <Card v-for="movie in store.movies" :key="movie.id" :movie="movie" />
    </ul>
  </main>
</template>

<style scoped>
main {
  margin-top: 5rem;
}

ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
