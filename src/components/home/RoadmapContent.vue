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
      <div class="flex justify-center items-center w-full h-full">
        <div class="w-full h-full px-1 sm:px-10 pt-[9px] pb-[3px]">
          <div
            class="no-scrollbar grid lg:grid-cols-3 md:grid-cols-1 gap-4 h-full overflow-auto"
          >
            <RoadmapCard
              classImage="Fighter_Profile"
              description="A versatile melee combatant, excelling in close-quarters combat with a mix of strength and agility."
              class="scale-90"
              releaseDate="1 November 2024"
              :isLock="false"
            />
            <RoadmapCard
              classImage="Fighter_Profile"
              description="A versatile melee combatant, excelling in close-quarters combat with a mix of strength and agility."
              class="scale-90"
              releaseDate="1 November 2024"
              :isLock="true"
            />
            <RoadmapCard
              classImage="Fighter_Profile"
              description="A versatile melee combatant, excelling in close-quarters combat with a mix of strength and agility."
              class="scale-90"
              releaseDate="1 November 2024"
              :isLock="true"
            />
            <RoadmapCard
              classImage="Fighter_Profile"
              description="A versatile melee combatant, excelling in close-quarters combat with a mix of strength and agility."
              class="scale-90"
              releaseDate="1 November 2024"
              :isLock="true"
            />
            <RoadmapCard
              classImage="Fighter_Profile"
              description="A versatile melee combatant, excelling in close-quarters combat with a mix of strength and agility."
              class="scale-90"
              releaseDate="1 November 2024"
              :isLock="true"
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
