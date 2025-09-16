<template>
  <footer class="footer1 bg-martin-darkBlue text-white">
    <div class="footer-widget-area p-8">
        <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                <WidgetAbout />
                <WidgetLinks />
                <WidgetBlog />
                <WidgetSocial />
            </div>
        </div>
    </div>
    <div class="footer-copyright-area p-8 border-t">
        <div class="container mx-auto">
            <div class="grid grid-cols-1">
              <div class="flex flex-col md:flex-row">
                  <div class="links mb-4">
                      <ul class="list-inline flex flex-row flex-wrap gap-4">
                          <li class="list-inline-item"><a href="#">Privacy &amp; Cookies</a></li>
                          <li class="list-inline-item"><a href="#">Terms &amp; Conditions</a></li>
                          <li class="list-inline-item"><a href="#">Legal Disclaimer</a></li>
                          <li class="list-inline-item"><a href="#">Community</a></li>
                      </ul>
                  </div>

                  <div class="copyright md:ml-auto">All Rights Reserved by <a href="#">Martin's Movie</a>.</div>

              </div>
            </div>
        </div>
    </div>
    <a
      href="#"
      :class="(isPageScroll)? 'visible' : ''"
      class="back-top-btn"
      @click.prevent="scrollToTop"
    >
      <i class="fa fa-angle-up"></i>
    </a>
</footer>


</template>

<script setup>
const isPageScroll = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  windowScroll()
  window.addEventListener('scroll', windowScroll)
})

const windowScroll = () => {
  const headerContainer = document.querySelector(".header");

  if((headerContainer.clientHeight) <= window.scrollY) {
    isPageScroll.value = true;
  } else {
    isPageScroll.value = false;
  }
}



</script>