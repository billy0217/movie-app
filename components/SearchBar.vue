<template>
  <div class="search-container">
    <div class="flex flex-row gap-4 items-top items-center">
      <div class="flex-1 w-full">
        <div class="relative">
          <input
            v-model="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            placeholder="Search movies by keyword..."
            class="search-input w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:border-martin-purple text-martin-grayDark placeholder-martin-lightGray"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button 
          @click="performSearch"
          class="btn btn-main whitespace-nowrap"
          :disabled="loading"
        >
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
        
        <button 
          @click="clearSearch"
          class="btn btn-secondary bg-orange-700 text-white whitespace-nowrap"
          v-if="searchQuery || currentQuery"
        >
          Clear
        </button>
      </div>
    </div>
    
    <div v-if="currentQuery" class="mt-3">
      <span class="text-sm">Searching for: <span class="text-martin-purple font-medium">{{ currentQuery }}</span></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search', 'clear'])

const searchQuery = ref('')
const currentQuery = ref('')

const performSearch = () => {
  console.log('🔍 SearchBar: performSearch called with:', searchQuery.value)
  currentQuery.value = searchQuery.value
  console.log('🔍 SearchBar: Emitting search event with:', searchQuery.value)
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  console.log('🧹 SearchBar: clearSearch called')
  searchQuery.value = ''
  currentQuery.value = ''
  console.log('🧹 SearchBar: Emitting clear event')
  emit('clear')
}

// Watch for external query changes
const route = useRoute()
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery || ''
  currentQuery.value = newQuery || ''
}, { immediate: true })
</script>