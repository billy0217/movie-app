export const useMovies = () => {
  const config = useRuntimeConfig()

  const getMovies = async (page = 1, query = '', filterOptions = {}) => {
    try {
      // Ensure page is a valid number
      const validPage = Math.max(1, Math.min(parseInt(page) || 1, 500))

      let endpoint = '/movie/popular'
      let params = {
        api_key: config.public.tmdbApiKey,
        page: validPage
      }

      // Handle search query first (overrides filter)
      if (query && query.trim()) {
        endpoint = '/search/movie'
        params.query = query.trim()
      } else if (filterOptions.endpoint) {
        // Handle different filter endpoints
        switch (filterOptions.endpoint) {
          case 'popular':
            endpoint = '/movie/popular'
            break
          case 'now_playing':
            endpoint = '/movie/now_playing'
            break
          case 'top_rated':
            endpoint = '/movie/top_rated'
            break
          case 'upcoming':
            endpoint = '/movie/upcoming'
            break
          case 'discover':
            endpoint = '/discover/movie'
            if (filterOptions.sort) {
              params.sort_by = filterOptions.sort
            }
            // Add additional filters for discover endpoint
            params.include_adult = false
            params.include_video = false
            params.language = 'en-US'
            break
          default:
            endpoint = '/movie/popular'
        }
      }

      const response = await $fetch(endpoint, {
        baseURL: config.public.tmdbBaseUrl,
        params,
        retry: 1,
        retryDelay: 500
      })

      return {
        movies: response.results || [],
        totalPages: Math.min(response.total_pages || 1, 500), // TMDB max pages
        totalResults: response.total_results || 0,
        currentPage: response.page || validPage
      }
    } catch (error) {
      console.error('API Error:', error)

      // More specific error messages
      if (error.status === 401) {
        throw new Error('Invalid API key. Please check your TMDB API key.')
      } else if (error.status === 404) {
        throw new Error('Movies not found.')
      } else if (error.status >= 500) {
        throw new Error('TMDB service is temporarily unavailable. Please try again later.')
      } else {
        throw new Error('Failed to fetch movies. Please check your internet connection.')
      }
    }
  }

  const getImageUrl = (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750/1a1d29/ffffff?text=No+Image'
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  const getImdbUrl = (imdbId) => {
    if (!imdbId) return null
    return `https://www.imdb.com/title/${imdbId}`
  }

  const getTmdbUrl = (movieId) => {
    if (!movieId) return null
    return `https://www.themoviedb.org/movie/${movieId}`
  }

  const getMovieImdbId = async (movieId) => {
    try {
      const response = await $fetch(`/movie/${movieId}/external_ids`, {
        baseURL: config.public.tmdbBaseUrl,
        params: {
          api_key: config.public.tmdbApiKey
        },
        retry: 1,
        retryDelay: 500
      })

      return response.imdb_id || null
    } catch (error) {
      console.warn('Failed to get IMDB ID for movie:', movieId, error)
      return null
    }
  }

  const getMovieTrailer = async (movieId) => {
    try {

      const response = await $fetch(`/movie/${movieId}/videos`, {
        baseURL: config.public.tmdbBaseUrl,
        params: {
          api_key: config.public.tmdbApiKey,
          language: 'en-US'
        },
        retry: 1,
        retryDelay: 500
      })

      // Find the best trailer
      const videos = response.results || []

      // Priority order: Official trailer, Trailer, Teaser
      const priorities = ['Trailer', 'Official Trailer', 'Teaser', 'Clip']

      for (const priority of priorities) {
        const video = videos.find(v =>
          v.site === 'YouTube' &&
          v.type.toLowerCase().includes(priority.toLowerCase()) &&
          v.official !== false
        )
        if (video) {
          return video.key
        }
      }

      // Fallback to any YouTube video
      const anyYouTubeVideo = videos.find(v => v.site === 'YouTube')
      if (anyYouTubeVideo) {
        return anyYouTubeVideo.key
      }

      console.log('No trailer found for movie:', movieId)
      return null

    } catch (error) {
      console.error('Error fetching movie trailer:', error)

      if (error.status === 401) {
        throw new Error('Invalid API key for trailer access')
      } else if (error.status === 404) {
        throw new Error('Movie not found')
      } else {
        throw new Error('Failed to load trailer')
      }
    }
  }

  // Store genres globally to avoid repeated API calls
  const genreMap = ref(new Map())
  const genresFetched = ref(false)

  const fetchGenres = async () => {
    if (genresFetched.value) return genreMap.value

    try {

      const response = await $fetch('/genre/movie/list', {
        baseURL: config.public.tmdbBaseUrl,
        params: {
          api_key: config.public.tmdbApiKey,
          language: 'en-US'
        },
        retry: 1,
        retryDelay: 500
      })

      // Create a map for quick lookups
      const genres = response.genres || []
      genres.forEach(genre => {
        genreMap.value.set(genre.id, genre.name)
      })

      genresFetched.value = true

      return genreMap.value

    } catch (error) {
      console.error('Error fetching genres:', error)
      throw new Error('Failed to fetch movie genres')
    }
  }

  const getGenreNames = async (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds)) return []

    // Ensure genres are loaded
    await fetchGenres()

    // Map genre IDs to names
    const genreNames = genreIds.map(id => genreMap.value.get(id)).filter(Boolean)

    return genreNames
  }

  return {
    getMovies,
    getImageUrl,
    getImdbUrl,
    getTmdbUrl,
    getMovieTrailer,
    getMovieImdbId,
    fetchGenres,
    getGenreNames
  }
}