<template>
  <div class="pagination mt-10 flex items-center justify-center gap-3" v-if="totalPages > 1">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="pagination-btn arrow-btn"
    >
      <i class="fa fa-angle-left "></i>
    </button>

    <!-- First page -->
    <button
      v-if="showFirstPage"
      @click="goToPage(1)"
      :class="{ active: currentPage === 1 }"
      class="pagination-btn"
    >
      1
    </button>

    <!-- First ellipsis -->
    <span v-if="showFirstEllipsis" class="px-3 py-2">...</span>

    <!-- Page numbers around current page -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
      class="pagination-btn"
    >
      {{ page }}
    </button>

    <!-- Last ellipsis -->
    <span v-if="showLastEllipsis" class="px-3 py-2">...</span>

    <!-- Last page -->
    <button
      v-if="showLastPage"
      @click="goToPage(totalPages)"
      :class="{ active: currentPage === totalPages }"
      class="pagination-btn"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="pagination-btn arrow-btn"
    >
     <i class="fa fa-angle-right"></i>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

// Calculate which pages to show
const visiblePages = computed(() => {
  const delta = 2 // Number of pages to show around current page
  const range = []
  const rangeWithDots = []

  for (
    let i = Math.max(2, props.currentPage - delta);
    i <= Math.min(props.totalPages - 1, props.currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  return range
})

const showFirstPage = computed(() => {
  return props.totalPages > 1
})

const showLastPage = computed(() => {
  return props.totalPages > 1 && !visiblePages.value.includes(props.totalPages)
})

const showFirstEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

const showLastEllipsis = computed(() => {
  return visiblePages.value.length > 0 &&
         visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})

const goToPage = (page) => {
  console.log('🖱️ Pagination button clicked for page:', page)
  console.log('📋 Pagination state:', {
    currentPage: props.currentPage,
    totalPages: props.totalPages,
    requestedPage: page
  })

  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    console.log('✅ Emitting page-change event for page:', page)
    emit('page-change', page)
  } else {
    console.log('❌ Invalid page change attempt:', { page, currentPage: props.currentPage, totalPages: props.totalPages })
  }
}
</script>