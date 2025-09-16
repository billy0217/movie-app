<template>
  <div>
    <div>
      <div
        :class="(grid)? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7' : 'grid grid-cols-1 gap-7' "
        >
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          :grid="grid"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  grid: {
    type: Boolean,
    required: true
  },
  movies: {
    type: Object,
    required: true
  }

})
</script>