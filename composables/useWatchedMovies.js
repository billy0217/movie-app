export const useWatchedMovies = () => {
  const STORAGE_KEY = 'martins-movies-watched'

  const getWatchedMovies = () => {
    // Only access localStorage on the client side
    if (process.client && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
      } catch (error) {
        console.error('Error reading watched movies from localStorage:', error)
        return []
      }
    }
    return []
  }

  const watchedMovies = ref(getWatchedMovies())

  // Update watched movies when hydrating on client
  onMounted(() => {
    if (process.client) {
      watchedMovies.value = getWatchedMovies()
    }
  })

  const isMovieWatched = (movieId) => {
    return watchedMovies.value.includes(movieId)
  }

  const toggleWatchedStatus = (movieId) => {
    if (!process.client) return

    const isCurrentlyWatched = isMovieWatched(movieId)

    if (isCurrentlyWatched) {
      watchedMovies.value = watchedMovies.value.filter(id => id !== movieId)
    } else {
      watchedMovies.value = [...watchedMovies.value, movieId]
    }

    // Save to localStorage only on client
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedMovies.value))
      } catch (error) {
        console.error('Error saving watched movies to localStorage:', error)
      }
    }
  }

  const getWatchedCount = () => {
    return watchedMovies.value.length
  }

  return {
    watchedMovies: readonly(watchedMovies),
    isMovieWatched,
    toggleWatchedStatus,
    getWatchedCount
  }
}