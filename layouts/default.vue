<template>
  <div
    :class="(activeMobileMenu)? 'is_mobilemenu_open': ''"
    class="min-h-screen main-wrap">
    <!-- Header -->
    <AppHeader @hamberger-nav="handleMobileMenu" />

    <!-- Main Content -->
    <main class="bg-martin-light">
      <div class="">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
const { getWatchedCount } = useWatchedMovies()
const activeMobileMenu = ref(false);

const watchedCount = computed(() => {
  return getWatchedCount()
})

const handleMobileMenu = (value) => {
  activeMobileMenu.value = value;
  console.log(`value : ${value}`)
}


</script>