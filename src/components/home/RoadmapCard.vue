<script setup>
import { onMounted } from "vue";
import { computed } from "vue";
import { toRefs } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

const props = defineProps({
  classImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  isLock: {
    type: Boolean,
    required: true,
  },
});

const computedOpacity = computed(() => (props.isLock ? 50 / 100 : 0 / 100));

const imagePath = new URL(
  `../../image/classes/${props.classImage}.png`,
  import.meta.url
).href;
</script>

<template>
  <div class="relative">
    <div
      class="relative w-full duration-300 ease-in-out border-2 hover:scale-100 hover:z-10 border-amber-500 border-opacity-60 rounded-3xl bg-slate-800"
    >
      <div class="relative w-full h-full">
        <!-- Black backdrop as a foreground -->
        <div
          :class="`absolute inset-0 bg-black rounded-3xl`"
          :style="{ opacity: computedOpacity }"
        ></div>
        <div class="flex items-start justify-start">
          <div class="w-full">
            <!-- Image -->
            <img
              :src="imagePath"
              alt="Class Image"
              class="w-full mx-auto rounded-tl-3xl rounded-tr-3xl h-fit"
            />
          </div>
        </div>
        <div class="p-2 px-6 text-lg text-center text-gray-300">
          {{ props.description }}
        </div>
        <div class="p-5 px-6 text-lg text-center text-yellow-400">
          {{ props.releaseDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* You can add additional custom styles here if needed */
</style>
