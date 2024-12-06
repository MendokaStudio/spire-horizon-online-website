<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import RoadmapCard from "./RoadmapCard.vue";

const utilityStore = useUtilityStore();

onMounted(async () => {
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
      <div class="flex items-center justify-center w-full h-full">
        <div class="w-full h-full px-1 sm:px-10 pt-[9px] pb-[3px]">
          <div
            class="grid h-full gap-4 overflow-auto no-scrollbar lg:grid-cols-3 md:grid-cols-1"
          >
            <RoadmapCard
              classImage="HighresScreenshot00007"
              description="The game officially launches, inviting players to begin their epic journey in the world of adventure."
              class="scale-90"
              releaseDate="6 December 2024"
              :isLock="false"
            />
            <RoadmapCard
              classImage="HighresScreenshot00056"
              description="The Forest zone in the Mainland unlocks, introducing a new storyline."
              class="scale-90"
              releaseDate="20 December 2024"
              :isLock="false"
            />
            <RoadmapCard
              classImage="HighresScreenshot00069"
              description="The Desert zone in the Mainland unlocks, accompanied by a new storyline."
              class="scale-90"
              releaseDate="10 January 2025"
              :isLock="false"
            />
            <RoadmapCard
              classImage="HighresScreenshot00079"
              description="The Snow zone in the Mainland unlocks, accompanied by a new storyline."
              class="scale-90"
              releaseDate="31 January 2025"
              :isLock="false"
            />
            <RoadmapCard
              classImage="HighresScreenshot00060"
              description="The Heaven zone in the Mainland unlocks, concluding the final storyline."
              class="scale-90"
              releaseDate="21 February 2025"
              :isLock="false"
            />
            <RoadmapCard
              classImage="HighresScreenshot00059"
              description="The grand finale arrives with the full release, completing your epic journey!"
              class="scale-90"
              releaseDate="14 March 2025"
              :isLock="false"
            />
          </div>
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
