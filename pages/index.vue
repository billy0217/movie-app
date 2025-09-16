<template>
  <div class="">
    <HeroBanner
      :title="title"
      :banner-img="bannerImg"
      :breadcrumb="breadcrumb"
    />
    <div class="container mx-auto px-4 py-8 mt-20">
      <!-- Page Title -->
      <div v-if="searchQuery"
          class="text-center mb-8">
        <h1 class="text-4xl font-bold  mb-4">
          Search Results
        </h1>
        <p class="text-gray-400 text-lg">
          {{ `Found ${totalResults} results for "${searchQuery}"` }}
        </p>
      </div>

      <!-- Search Bar and Filter -->
      <div class="flex flex-col md:flex-row gap-4 items-top justify-between mb-14">
        <div class="w-full md:w-auto">
          <div class="flex flex-row gap-4 layout-switcher">
              <button
                @click="handleChangeLayout(false)"
                :class="(isGridView)? 'bg-white text-martin-lightGray' : 'bg-martin-purple text-white'"
                class="btn-layout hover:bg-martin-purple hover:text-white"
              >
                <i class="fa fa-align-justify"></i>
              </button>
              <button
                @click="handleChangeLayout(true)"
                :class="(isGridView)? 'bg-martin-purple text-white': 'bg-white text-martin-lightGray'"
                class="btn-layout hover:bg-martin-purple hover:text-white"
              >
                <i class="fa fa-th"></i>
              </button>
          </div>
        </div>
        <div class="w-full md:flex-1 search-wrap">
          <SearchBar
            :loading="loading"
            @search="handleSearch"
            @clear="handleClearSearch"
          />
        </div>
        <div class="w-full filter-dropdown-wrap">
          <FilterDropdown
            v-model="selectedFilter"
            @filter-change="handleFilterChange"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
          <h3 class="text-red-300 font-semibold mb-2">Something went wrong</h3>
          <p class="text-red-200 text-sm mb-4">{{ error }}</p>
          <button @click="fetchMovies" class="btn-primary">
            Try Again
          </button>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="movies.length === 0 && !loading" class="text-center py-12">

        <div class="text-gray-400">
          <svg class="mx-auto h-16 w-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-xl font-medium mb-2">No movies found</h3>
          <p class="text-gray-500">
            {{ searchQuery ? 'Try adjusting your search terms' : 'Unable to load movies at this time' }}
          </p>
        </div>
      </div>

      <!-- Movies Grid -->
      <div v-else-if="movies.length > 0" class="space-y-8">
        <MovieGrid
          :grid="isGridView"
          :movies="movies"
        />

        <!-- Pagination -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { getMovies } = useMovies()
const route = useRoute()
const router = useRouter()

// Reactive data
const movies = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const totalResults = ref(0)
const searchQuery = ref('')
const selectedFilter = ref('popular')
const filterOptions = ref({})
const isGridView = ref(true);
const title = ref('Movie Grid 3');
const bannerImg = ref('');
const breadcrumb = ref([
  {
    'name': 'Home',
    'link': '/'
  },
  {
    'name': 'Movie Grid 3',
    'link': ''
  }
])

// Computed
const isSearchMode = computed(() => !!searchQuery.value)

// Initialize from URL params
onMounted(() => {
  const urlPage = parseInt(route.query.page) || 1
  const urlQuery = route.query.q || ''
  const urlFilter = route.query.filter || 'popular'

  currentPage.value = urlPage
  searchQuery.value = urlQuery
  selectedFilter.value = urlFilter

  // Initialize filter options based on selected filter
  initializeFilterOptions(urlFilter)

  nextTick(() => {
    fetchMovies()
  })
})

// Helper function to initialize filter options
const initializeFilterOptions = (filterValue) => {
  const filterMapping = {
    'popular': { endpoint: 'popular' },
    'now_playing': { endpoint: 'now_playing' },
    'top_rated': { endpoint: 'top_rated' },
    'upcoming': { endpoint: 'upcoming' },
    'release_date.asc': { endpoint: 'discover', sort: 'release_date.asc' },
    'vote_count.desc': { endpoint: 'discover', sort: 'vote_count.desc' }
  }

  filterOptions.value = filterMapping[filterValue] || { endpoint: 'popular' }
}

// Watch for route changes
watch(() => route.query, (newQuery, oldQuery) => {

  const urlPage = Math.max(1, parseInt(newQuery.page) || 1)
  const urlQuery = newQuery.q || ''
  const urlFilter = newQuery.filter || 'popular'

  // Check each condition individually
  const pageChanged = currentPage.value !== urlPage
  const queryChanged = searchQuery.value !== urlQuery
  const filterChanged = selectedFilter.value !== urlFilter

  // Only update if values actually changed
  if (pageChanged || queryChanged || filterChanged) {
    console.log('✅ Values changed, updating and fetching movies')
    currentPage.value = urlPage
    searchQuery.value = urlQuery
    selectedFilter.value = urlFilter
    initializeFilterOptions(urlFilter)
    fetchMovies()
  } else {
    console.log('Values unchanged, skipping fetch')
  }
})

// Methods
const fetchMovies = async () => {

  try {
    loading.value = true
    error.value = null

    console.log('📡 Calling getMovies API...')
    const result = await getMovies(currentPage.value, searchQuery.value, filterOptions.value)

    // Add a timestamp to force Vue reactivity
    const moviesWithTimestamp = result.movies.map(movie => ({
      ...movie,
      _fetchTime: Date.now(),
      _reactivityKey: `${movie.id}-${Date.now()}`
    }))

    movies.value = moviesWithTimestamp
    totalPages.value = result.totalPages
    totalResults.value = result.totalResults

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (err) {
    error.value = 'Failed to load movies. Please try again.'
    console.error('Error fetching movies:', err)
  } finally {
    loading.value = false
    console.log('fetchMovies completed')
  }
}

const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1

  // Update URL
  const queryParams = { page: 1 }
  if (query && query.trim()) {
    queryParams.q = query.trim()
  }
  if (selectedFilter.value !== 'popular') {
    queryParams.filter = selectedFilter.value
  }

  router.push({ query: queryParams })

  // Force fetch movies immediately
  fetchMovies()
}

const handleClearSearch = () => {

  searchQuery.value = ''
  currentPage.value = 1

  const queryParams = { page: 1 }
  if (selectedFilter.value !== 'popular') {
    queryParams.filter = selectedFilter.value
  }

  router.push({ query: queryParams })

  // Force fetch movies immediately
  fetchMovies()
}

const handleFilterChange = (filter) => {

  // Update state immediately
  selectedFilter.value = filter.value
  filterOptions.value = {
    endpoint: filter.endpoint,
    sort: filter.sort
  }
  currentPage.value = 1

  // Update URL
  const queryParams = { page: 1 }
  if (searchQuery.value) {
    queryParams.q = searchQuery.value
  }
  if (filter.value !== 'popular') {
    queryParams.filter = filter.value
  }
  router.push({ query: queryParams })

  // Call fetchMovies immediately
  fetchMovies()
}

const handlePageChange = (page) => {

  // Update page immediately and fetch movies directly
  // This prevents race conditions with the route watcher
  currentPage.value = page

  // Update URL
  const queryParams = { page }
  if (searchQuery.value) {
    queryParams.q = searchQuery.value
  }
  if (selectedFilter.value !== 'popular') {
    queryParams.filter = selectedFilter.value
  }

  router.push({ query: queryParams })

  // Force fetch movies immediately
  fetchMovies()
}

const handleChangeLayout = (layout) => {
  isGridView.value = layout
}
</script>