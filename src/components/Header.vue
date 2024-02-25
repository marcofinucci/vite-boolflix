<script>
import { store } from "../store.js";

export default {
  name: "Header",
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <header>
    <div class="container header-inner">
      <!-- Logo -->
      <div class="logo">Boolflix</div>

      <!-- Search -->
      <form @submit.prevent="store.getMovies" class="search">
        <input type="text" v-model="store.inputSearch" placeholder="Search films and series" />
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
