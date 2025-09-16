<template>
  <div class="filter-select-container">
    <div class="relative">
      <select
        :value="props.modelValue"
        @change="handleSelectChange"
        class="filter-select appearance-none"
      >
        <option
          v-for="option in filterOptions"
          :key="option.value"
          :value="option.value"
          class=""
        >
          {{ option.label }}
        </option>
      </select>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'popular'
  }
})

const emit = defineEmits(['update:modelValue', 'filter-change'])

const filterOptions = [
  {
    value: 'popular',
    label: 'Default Order',
    endpoint: 'popular'
  },
  {
    value: 'now_playing',
    label: 'Featured',
    endpoint: 'now_playing'
  },
  {
    value: 'top_rated',
    label: 'Top Rated',
    endpoint: 'top_rated'
  },
  {
    value: 'upcoming',
    label: 'Newest',
    endpoint: 'upcoming'
  },
  {
    value: 'release_date.asc',
    label: 'Oldest',
    endpoint: 'discover',
    sort: 'release_date.asc'
  },
  {
    value: 'vote_count.desc',
    label: 'Top Viewed',
    endpoint: 'discover',
    sort: 'vote_count.desc'
  }
]

const selectedFilter = computed(() => {
  return filterOptions.find(option => option.value === props.modelValue) || filterOptions[0]
})

const handleSelectChange = (event) => {
  const selectedValue = event.target.value
  const selectedOption = filterOptions.find(option => option.value === selectedValue)

  emit('update:modelValue', selectedValue)
  emit('filter-change', {
    value: selectedOption.value,
    label: selectedOption.label,
    endpoint: selectedOption.endpoint,
    sort: selectedOption.sort
  })
}
</script>