<template>
	<div
	:style="{ backgroundImage: `url(${heroImg})` }"
	class="page-header hero-banner bg-martin-purple bg-blend-overlay relative">
		<div class="container mx-auto px-4">
			<div class="flex flex-col gap-4">
				<h1 class="title capitalize text-white text-4xl font-normal">{{title}}</h1>
				<ol
					v-if="breadcrumb"
					class="breadcrumb flex flex-wrap"
				>
					<li v-for="(b, index ) in breadcrumb"
						:key="index"
					>
						<NuxtLink
							v-if="b.link != ''"
							:to="b.link"
							class="text-white hover:text-martin-purple duration-300 ease-in-out "
						>
							{{b.name}}
						</NuxtLink>
						<span v-else
							class=""
						>
							{{b.name}}
						</span>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script setup>
	import bannerImage from "~/assets/img/movie-collection.jpg";

	const heroImg = ref('');
	const props = defineProps({
	  title: {
	    type: String,
	    required: true
	  },
	  bannerImg: {
	    type: String,
	    required: true
	  },
	  breadcrumb: {
	  	type: Object,
	  	required: false
	  }
	})

	if(props.bannerImg != '') {
		heroImg.value = props.bannerImg;
	}else {
		heroImg.value = bannerImage;
	}


</script>