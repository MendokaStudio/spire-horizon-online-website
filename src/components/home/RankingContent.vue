<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";

const utilityStore = useUtilityStore();

const errMsg = ref("");

onMounted(() => {
  utilityStore.ContentReveal();
});
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center lg:pt-[5%] md:pt-[10%] sm:pt-[8%] bg-black bg-opacity-80"
  >
    <div
      class="relative w-11/12 h-3/6 lg:w-11/12 lg:h-4/6 2xl:w-8/12 2xl:h-3/4 bg-[url('../image/elements/modal_empty_background.png')] bg-[length:100%_100%]"
    >
      <!-- Content -->
      <div
        class="flex justify-center items-center w-full h-full text-2xl md:text-4xl opacity-30"
      >
        No Ranking
      </div>
    </div>
  </div>
</template>
