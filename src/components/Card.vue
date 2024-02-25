<script>
import ISO6391 from "iso-639-1";

export default {
  name: "Card",
  props: ["movie"],
  methods: {
    stars(vote) {
      return Math.round(vote / 2);
    },
    originalLanguage(lang) {
      return ISO6391.getName(lang);
    },
  },
};
</script>

<template>
  <li>
    <div class="card">
      <!-- Poster -->
      <div class="poster">
        <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w342/' + movie.poster_path" :alt="movie.title" />
        <div v-else class="poster-not-found">{{ movie.title ? movie.title : movie.name }}</div>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Title -->
        <div class="title"><strong>Title:</strong> {{ movie.title ? movie.title : movie.name }}</div>
        <div class="original-title"><strong>Original Title:</strong> {{ movie.original_title ? movie.original_title : movie.original_name }}</div>

        <!-- Original language -->
        <div v-if="originalLanguage(movie.original_language)" class="language">
          <img :src="'https://www.unknown.nu/flags/images/' + movie.original_language + '-100'" :alt="originalLanguage(movie.original_language)" />
          <div class="language-name"><strong>Language:</strong> {{ originalLanguage(movie.original_language) }}</div>
        </div>

        <!-- Stars -->
        <div class="stars">
          <i v-for="i in this.stars(movie.vote_average)" class="fa-solid fa-star"></i>
          <i v-for="i in 5 - this.stars(movie.vote_average)" class="fa-regular fa-star"></i>
        </div>

        <!-- Overview -->
        <div v-if="movie.overview" class="overview"><strong>Overview:</strong> {{ movie.overview }}</div>
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

  @media (max-width: 2000px) {
    width: calc(100% / 5);
  }

  @media (max-width: 1600px) {
    width: calc(100% / 4);
  }

  @media (max-width: 1200px) {
    width: calc(100% / 3);
  }

  @media (max-width: 768px) {
    width: calc(100% / 2);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
}

.card {
  position: relative;
  overflow: hidden;
  font-size: 0.875rem;
  background-color: var(--darkmedium);
  border-radius: 0.25rem;
  color: var(--extralight);

  &:hover .poster {
    opacity: 0;
  }

  &:hover .content {
    opacity: 1;
  }
}

.poster {
  aspect-ratio: 2 / 3;
  width: 100%;
  overflow: hidden;
  transition: opacity 0.3s ease;

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

.stars,
.overview,
.original-title {
  margin-top: 0.5rem;
}

.original-title {
  margin-bottom: 1rem;
}

.language {
  display: flex;
  align-items: center;

  img {
    max-width: 1.5rem;
    margin-right: 0.5rem;
  }
}

.stars i {
  color: var(--yellow);
}
</style>
