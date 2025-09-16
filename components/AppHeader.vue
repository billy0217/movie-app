<template>
  <header class="header bg-white">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg">
        <NuxtLink to="/" class="text-2xl text-black font-bold hover:text-martin-purple transition-colors">
          Martin's Movies
        </NuxtLink>

        <button
          @click="toggleHamburgerMenu"
          id="mobile-nav-toggler"
          :class="(activeMobileMenu)? 'active' : ''"
          class="hamburger block lg:hidden"
          type="button"
        >
           <span class="hamburger-box">
              <span class="hamburger-inner"></span>
           </span>
        </button>

        <HeaderMobileNav />

        <div class="navbar-collapse hidden lg:block" id="main-nav">
          <HeaderNav />

          <ul class="navbar-nav extra-nav">
              <li class="nav-item">
                  <a class="nav-link toggle-search" href="#">
                      <i class="fa fa-search"></i>
                  </a>
              </li>

              <li class="nav-item notification-wrapper">
                  <a class="nav-link notification" href="#">
                      <i class="fa fa-globe"></i>
                      <span class="notification-count">2</span>
                  </a>
              </li>

              <li class="nav-item m-auto">
                  <a href="#" class="btn btn-main btn-effect login-btn">
                      <i class="fa fa-user"></i> login
                  </a>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
  const route = useRoute()
  const activeMobileMenu = ref(false);
  const emit = defineEmits(['hamberger-nav'])

  // toggle Hamburger Menu to update activeMobileMenu state
  const toggleHamburgerMenu = () => {
    activeMobileMenu.value = !activeMobileMenu.value
    emit('hamberger-nav', activeMobileMenu.value)
  }

  watch( () => route.path, () => {
    activeMobileMenu.value = false;
    handleMobileMenu()
    window.addEventListener('resize', handleMobileMenu);
  })

  onMounted(() => {
    handleMobileMenu()
    window.addEventListener('resize', handleMobileMenu);
  })

  const handleMobileMenu = () => {
    let windowWidth = window.outerWidth;

    if(windowWidth > 1023) {
      activeMobileMenu.value = false;
      emit('hamberger-nav', activeMobileMenu.value)
    }
  }

</script>