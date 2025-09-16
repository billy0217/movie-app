<template>
  <div
      :class="(grid)? 'grid-view' : 'list-view flex flex-col md:flex-row' "
      class="movie-card bg-white" :key="cardKey"
    >
    <!-- Movie Poster -->
    <div class="relative">
      <div
          class="movie-card-img-wrap"
      >
        <img
          :src="posterUrl"
          :alt="movie.title"
          class="movie-card-img"
          @error="handleImageError"
          :key="`poster-${movie.id}-${cardKey}`"
        />
      </div>

      <!-- Watched Badge -->
      <div v-if="isWatched" class="absolute top-3 left-3">
        <span class="watched-badge">
          Watched
        </span>
      </div>
      <!-- Play Button -->
      <div
        v-if="!grid"
        class="play-btn">
        <button
          @click="openTrailerModal"
          class="play-video"
          title="Watch Trailer"
        >
          <i class="fa fa-play"></i>
        </button>
      </div>
    </div>

    <!-- Movie Info -->
    <div class="movie-card-info p-7 relative w-full">
      <!-- Play Button -->
      <div
        v-if="grid"
        class="play-btn">
        <button
          @click="openTrailerModal"
          class="play-video"
          title="Watch Trailer"
        >
          <i class="fa fa-play"></i>
        </button>
      </div>

      <h3 class="text-3xl font-semibold" :key="`title-${movie.id}-${cardKey}`">
        {{ movie.title }}
      </h3>
      <div class="stars">
        <div class="rating flex flex-row justify-between text-martin-lightGray text-sm my-3.5">
          <div class="flex flex-row items-center justify-center gap-2">
            <i class="fa fa-star text-martin-yellow"></i>
            <span >{{formatRating(movie.vote_average)}}</span>
          </div>
          <div>
            <span>{{movieGenresList(movieGenres)}} <span>{{ (movieGenres.length > 3) ?  `+ ${movieGenres.length - 3}` : '' }}</span></span>
          </div>
        </div>
      </div>

      <div class="text-ellipsis mb-4">
        <p class="text-sm multi-line-ellipsis text-base" :key="`overview-${movie.id}-${cardKey}`">
          {{ movie.overview || 'No description available.' }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center md:justify-between gap-3 md:gap-6">
        <!-- Read More / IMDB/TMDB Link -->
        <a
          :href="readMoreUrl"
          class="btn-main text-sm bg-martin-purple py-2 px-4 font-semibold text-center inline-flex uppercase rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="fetchImdbId"
        >
          Details
        </a>

        <!-- Watch Status Toggle -->
        <button
          @click="toggleWatched"
          class="py-2 px-4 text-sm rounded-lg font-semibold transition-all duration-200"
          :class="isWatched
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gray-700 hover:bg-gray-600 text-white'"
        >
          {{ isWatched ? 'Watched' : 'Mark as Watched' }}
        </button>
      </div>
    </div>

    <!-- Video Modal -->
    <VideoModal
      :is-open="isModalOpen"
      :movie-id="movie.id"
      :movie-title="movie.title"
      @close="closeTrailerModal"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  grid: {
    type: Boolean,
    required: true
  },
})

const { getImageUrl, getImdbUrl, getTmdbUrl, getMovieImdbId, getGenreNames } = useMovies()
const { isMovieWatched, toggleWatchedStatus } = useWatchedMovies()

// Modal state
const isModalOpen = ref(false)

// IMDB ID state
const fetchedImdbId = ref(null)
const fetchingImdbId = ref(false)

// Genres state
const movieGenres = ref([])
const genresLoaded = ref(false)

// Create a unique key for this card to force re-renders
const cardKey = computed(() => {
  return props.movie._reactivityKey || props.movie._fetchTime || `${props.movie.id}-${Date.now()}`
})

// Computed values that will re-calculate when movie changes
const posterUrl = computed(() => getImageUrl(props.movie.poster_path))
const isWatched = computed(() => isMovieWatched(props.movie.id))

const readMoreUrl = computed(() => {
  // If movie has imdb_id from API, link to IMDB
  if (props.movie.imdb_id) {
    return getImdbUrl(props.movie.imdb_id)
  }
  // If we fetched an IMDB ID, use that
  if (fetchedImdbId.value) {
    return getImdbUrl(fetchedImdbId.value)
  }
  // Fallback to TMDB page
  return getTmdbUrl(props.movie.id)
})


const toggleWatched = () => {
  toggleWatchedStatus(props.movie.id)
}

const openTrailerModal = () => {
  isModalOpen.value = true
}

const closeTrailerModal = () => {
  isModalOpen.value = false
}

const fetchImdbId = async () => {
  if (props.movie.imdb_id || fetchedImdbId.value || fetchingImdbId.value) {
    return // Already have it or already fetching
  }

  try {
    fetchingImdbId.value = true

    const imdbId = await getMovieImdbId(props.movie.id)
    if (imdbId) {
      fetchedImdbId.value = imdbId
    } else {
      console.log('No IMDB ID found for:', props.movie.title)
    }
  } catch (error) {
    console.warn('Error fetching IMDB ID:', error)
  } finally {
    fetchingImdbId.value = false
  }
}

const loadGenres = async () => {
  if (genresLoaded.value || !props.movie.genre_ids) return

  try {
    console.log('🎭 Loading genres for:', props.movie.title, 'with IDs:', props.movie.genre_ids)

    const genres = await getGenreNames(props.movie.genre_ids)
    movieGenres.value = genres
    genresLoaded.value = true

  } catch (error) {
    console.warn('Error loading genres:', error)
    movieGenres.value = []
  }
}

// Load genres when component mounts
onMounted(() => {
  loadGenres()
})

const formatRating = (rating) => {
  if (!rating) return 'N/A'
  return parseFloat(rating).toFixed(1) + ' / 10'
}

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/500x350?text=No+Image'
}

const movieGenresList = (genresList) => {
  return genresList.slice(0, 3).join(', ');
}
</script>