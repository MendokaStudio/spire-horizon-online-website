<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import { initFlowbite } from "flowbite";
import FooterContent from "@/components/home/FooterContent.vue";

const utilityStore = useUtilityStore();

const videoOpacity = ref(100);
const isCompleteOpening = ref(false);

onMounted(() => {
  initFlowbite();
  setTimeout(() => {
    const opacityInterval = setInterval(() => {
      if (videoOpacity.value > 0) {
        videoOpacity.value -= 0.5;
      } else {
        clearInterval(opacityInterval);
        isCompleteOpening.value = true;
      }
    }, 5);
  }, 1);
});
</script>

<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Opening Video -->
    <!-- <video
      v-if="!isCompleteOpening"
      class="absolute top-0 left-0 z-50 object-cover w-full h-full"
      :style="{ opacity: videoOpacity / 100 }"
      autoplay
      muted
    >
      <source src="../../videos/Intro.mp4" type="video/mp4" />
    </video> -->
    <!-- Background Video -->
    <video
      class="absolute top-0 left-0 w-full h-full object-cover object-[-280px] xl:object-center"
      autoplay
      muted
      loop
    >
      <source src="../../videos/video-menu.mp4" type="video/mp4" />
    </video>

    <!-- Main Content -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full text-white"
    >
      <router-view
        :style="{
          opacity: utilityStore.contentOpacity,
        }"
      />
      <FooterContent
        v-if="utilityStore.isShowCopyright"
        :style="{
          opacity: utilityStore.contentOpacity,
        }"
      />
    </div>
  </div>
</template>
