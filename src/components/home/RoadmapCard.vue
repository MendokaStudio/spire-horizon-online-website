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
  opacity: {
    type: Number,
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
      class="relative hover:scale-100 hover:z-10 duration-300 ease-in-out border-2 border-amber-500 border-opacity-60 rounded-3xl bg-slate-800 w-full"
    >
      <div class="w-full h-full relative">
        <!-- Black backdrop as a foreground -->
        <div
          :class="`absolute inset-0 bg-black rounded-3xl`"
          :style="{ opacity: computedOpacity }"
        ></div>
        <div class="flex justify-start items-start">
          <div class="w-full">
            <!-- Image -->
            <img
              :src="imagePath"
              alt="Class Image"
              class="w-full rounded-tl-3xl rounded-tr-3xl mx-auto h-fit"
            />
          </div>
        </div>
        <div class="p-2 text-center text-lg px-6 text-gray-300">
          {{ props.description }}
        </div>
        <div class="p-5 text-center text-lg px-6 text-yellow-400">
          {{ props.releaseDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* You can add additional custom styles here if needed */
</style>
