<template>
	<div class="mobile-nav">
     	<div
     		:class="(openMobileMenu == 0) ? 'active' : '' "
          	class="mobile-nav-panel"
    	>
          	<div class="mobile-nav-panel-title">
            	<h4 class="text-white">Menu</h4>
          	</div>
          	<ul class="mobile-nav-panel-list">
            	<li
            		@click="handleOpenMobileMenu(1)"
            		class="mobile-nav-panel-item"
            	>
              		<span>Home</span>
              		<div class="mobile-nav-panel-item-icon-wrap">
                		<span class="mobile-nav-panel-item-counter">4</span>
            			<i class="fa fa-angle-right"></i>
              		</div>
            	</li>
            	<li
            		@click="handleOpenMobileMenu(2)"
            		class="mobile-nav-panel-item"
            	>
              		<span>Pages</span>
              		<div class="mobile-nav-panel-item-icon-wrap">
                		<span class="mobile-nav-panel-item-counter">11</span>
            			<i class="fa fa-angle-right"></i>
              		</div>
            	</li>
            	<li
            		@click="handleOpenMobileMenu(3)"
            		class="mobile-nav-panel-item"
            	>
              		<span>Movie & TV Shows</span>
              		<div class="mobile-nav-panel-item-icon-wrap">
                		<span class="mobile-nav-panel-item-counter">9</span>
            			<i class="fa fa-angle-right"></i>
              		</div>
            	</li>
            	<li
            		@click="handleOpenMobileMenu(4)"
            		class="mobile-nav-panel-item"
            	>
              		<span>Blog</span>
              		<div class="mobile-nav-panel-item-icon-wrap">
                		<span class="mobile-nav-panel-item-counter">4</span>
            			<i class="fa fa-angle-right"></i>
              		</div>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Contact Us</NuxtLink>
            	</li>
          </ul>
      </div>
      <div
        	:class="(openMobileMenu == 1) ? 'active' : '' "
        	class="mobile-nav-panel"
        >
        	<div
          		@click="handleOpenMobileMenu(0)"
          		class="mobile-nav-panel-title"
          	>
            		<h4>Home</h4>
            		<i class="fa fa-angle-left mobile-nav-panel-title-icon"></i>
      		</div>
          	<ul class="mobile-nav-panel-list">
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Home version 1</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Home version 2</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Home version 3</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Home version 4</NuxtLink>
            	</li>
          	</ul>
      </div>
      <div
        	:class="(openMobileMenu == 2) ? 'active' : '' "
        	class="mobile-nav-panel"
        >
        	<div
          		@click="handleOpenMobileMenu(0)"
          		class="mobile-nav-panel-title"
          	>
            		<h4>Pages</h4>
            		<i class="fa fa-angle-left mobile-nav-panel-title-icon"></i>
      		</div>
          	<ul class="mobile-nav-panel-list">
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">404 Page</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Celebrities List</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Celebrities Grid</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Celebrities Detail</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Contact Us</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Coming Soon</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Pricing Plan</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Login - Register</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Testimonials</NuxtLink>
            	</li>
          	</ul>
      </div>
      <div
        	:class="(openMobileMenu == 3) ? 'active' : '' "
        	class="mobile-nav-panel"
        >
        	<div
          		@click="handleOpenMobileMenu(0)"
          		class="mobile-nav-panel-title"
          	>
            		<h4>Movies & TV Show</h4>
            		<i class="fa fa-angle-left mobile-nav-panel-title-icon"></i>
      		</div>
          	<ul class="mobile-nav-panel-list">
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie List 1</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie List 2</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie Grid 1</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie Grid 2</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie Grid 3</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie Grid 4</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie Detail</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Movie Detail 2</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Watch Later</NuxtLink>
            	</li>
          	</ul>
      </div>
      <div
        	:class="(openMobileMenu == 4) ? 'active' : '' "
        	class="mobile-nav-panel"
        >
        	<div
          		@click="handleOpenMobileMenu(0)"
          		class="mobile-nav-panel-title"
          	>
            		<h4>Blog</h4>
            		<i class="fa fa-angle-left mobile-nav-panel-title-icon"></i>
      		</div>
          	<ul class="mobile-nav-panel-list">
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Blog List</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Blog List Fullwidth</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Blog Detail</NuxtLink>
            	</li>
            	<li class="mobile-nav-panel-item">
              		<NuxtLink to="#" class="mobile-nav-panel-item-link text-white">Blog Detail Fullwidth</NuxtLink>
            	</li>
          	</ul>
      </div>
    </div>
</template>
<script setup>
	const openMobileMenu = ref(0);

	const handleOpenMobileMenu = (index) => {
    	openMobileMenu.value = index;
  	}
</script>