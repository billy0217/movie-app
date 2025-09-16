<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeModal"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <!-- Modal Container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh]"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute -top-8 right-4 z-10 text-white hover:text-gray-300"
          >
            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Video Container -->
          <div class="relative aspect-video bg-black">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
              <div class="text-white">
                <svg class="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>

            <div v-else-if="error" class="absolute inset-0 flex items-center justify-center text-center p-6">
              <div class="text-white">
                <svg class="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <h4 class="text-lg font-medium mb-2">No trailer available</h4>
                <p class="text-gray-300 text-sm">{{ error }}</p>
              </div>
            </div>

            <iframe
              v-else-if="videoUrl"
              ref="videoIframe"
              :src="videoUrl"
              class="w-full h-full"
              frameborder="0"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  movieId: {
    type: [Number, String],
    default: null
  },
  movieTitle: {
    type: String,
    default: 'Movie'
  }
})

const emit = defineEmits(['close'])

const { getMovieTrailer } = useMovies()

const videoUrl = ref('')
const loading = ref(false)
const error = ref(null)
const videoIframe = ref(null)

// Watch for modal open/close
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen && props.movieId) {
    await loadTrailer()
  } else if (!isOpen) {
    stopVideo()
  }
})

// Watch for movie ID changes
watch(() => props.movieId, async (newMovieId) => {
  if (newMovieId && props.isOpen) {
    await loadTrailer()
  }
})

const loadTrailer = async () => {
  try {
    loading.value = true
    error.value = null
    videoUrl.value = ''

    const trailerKey = await getMovieTrailer(props.movieId)

    if (trailerKey) {
      videoUrl.value = `https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`
    } else {
      throw new Error('No trailer found for this movie')
    }
  } catch (err) {
    error.value = err.message || 'Failed to load trailer'
  } finally {
    loading.value = false
  }
}

const stopVideo = () => {
  if (videoIframe.value) {
    // Stop the video by clearing the src completely
    videoIframe.value.src = 'about:blank'
  }
}

const closeModal = () => {
  stopVideo()
  emit('close')
}

// Handle escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>