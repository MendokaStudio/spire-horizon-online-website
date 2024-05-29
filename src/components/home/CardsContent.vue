<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import MonsterCard from "./MonsterCard.vue";

const utilityStore = useUtilityStore();

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
      <div class="w-full h-full pt-3 pb-1 px-10">
        <div
          class="no-scrollbar grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 h-full overflow-auto"
        >
          <MonsterCard v-for="n in 24" :key="n" :cardIndex="n - 1" />
        </div>
      </div>
      <div class="absolute top-[5px] left-0 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
      <div class="absolute top-[-4px] right-[8px] transform rotate-90 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
      <div class="absolute bottom-0 -right-0.5 transform rotate-180 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
      <div class="absolute -bottom-[8px] left-[10px] transform -rotate-90 z-10">
        <img src="../../image/elements/window_corner.png" alt="" class="w-20" />
      </div>
    </div>
  </div>
</template>
