<script>
export default {
  name: "Card",
  props: ["movie"],
  methods: {
    stars(vote) {
      return Math.round(vote / 2);
    },
  },
};
</script>

<template>
  <li>
    <div class="card">
      <!-- Display poster -->
      <div class="poster">
        <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w342/' + movie.poster_path" :alt="movie.title" />
        <div v-else class="poster-not-found">Poster not found</div>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Display title -->
        <div class="title">
          <div><strong>Title:</strong> {{ movie.title ? movie.title : movie.name }}</div>
          <div><strong>Original Title:</strong> {{ movie.original_title ? movie.original_title : movie.original_name }}</div>
        </div>

        <!-- Display original language -->
        <div class="language"><strong>Language:</strong> {{ movie.original_language }}</div>

        <!-- Display vote -->
        <div class="stars">
          <i v-for="i in this.stars(movie.vote_average)" class="fa-solid fa-star"></i>
          <i v-for="i in 5 - this.stars(movie.vote_average)" class="fa-regular fa-star"></i>
        </div>

        <!-- Display overview -->
        <div class="overview">Overview: {{ movie.overview }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
li {
  margin-top: 3rem;
  width: calc(100% / 5);
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
}

.card {
  position: relative;
  overflow: hidden;
  font-size: 0.875rem;
  background-color: var(--darkmedium);

  &:hover .content {
    opacity: 1;
  }
}

.poster {
  aspect-ratio: 2 / 3;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .poster-not-found {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--medium);
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
  }
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--extradark);
  padding: 1rem;
  overflow-y: auto;
  opacity: 0;
  transition: opacity 0.3s ease;

  &::-webkit-scrollbar {
    width: 0.375rem; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: var(--light);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--lightmedium);
  }
}

.language,
.stars,
.overview {
  margin-top: 0.5rem;
}

.stars i {
  color: var(--yellow);
}
</style>
