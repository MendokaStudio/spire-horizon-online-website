<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import NavigationBar from "./components/home/NavigationBar.vue";

const route = useRoute();

const showNavBar = computed(() => {
  return route.meta.showNavBar; // Default to true if meta field is not set
});
</script>

<template>
  <div class="font-marko-one">
    <!-- Indicator -->
    <!-- <div class="absolute z-50">
      <div class="sm:block hidden">SM</div>
      <div class="hidden md:block lg:hidden">MD</div>
      <div class="hidden lg:block xl:hidden">LG</div>
      <div class="hidden xl:block 2xl:hidden">XL</div>
      <div class="hidden 2xl:block xl:hidden">2XL</div>
    </div> -->

    <NavigationBar v-if="showNavBar" />
    <RouterView />
  </div>
</template>
