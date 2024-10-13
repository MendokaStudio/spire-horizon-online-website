<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

const props = defineProps({
  cardIndex: {
    type: Number,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  attackSpeed: {
    type: String,
    required: true,
  },
  attackRange: {
    type: String,
    required: true,
  },
  classImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const imagePath = new URL(
  `../../image/classes/${props.classImage}.png`,
  import.meta.url
).href;
</script>

<template>
  <div
    :data-tooltip-target="'tooltip-card' + cardIndex"
    class="relative w-full duration-300 ease-in-out border-2 hover:scale-100 hover:z-10 border-amber-500 border-opacity-60 rounded-3xl bg-slate-800"
  >
    <div class="w-full h-full pr-2">
      <div class="flex items-start justify-start space-x-3">
        <div>
          <img
            :src="imagePath"
            alt="Class Image"
            class="w-36 rounded-tl-3xl rounded-br-xl"
          />
        </div>
        <div
          class="flex flex-col justify-between w-full h-full pt-2 my-auto space-y-1"
        >
          <div class="text-2xl font-bold text-white">{{ props.className }}</div>
          <div class="flex items-center justify-center w-full">
            <div class="text-lg text-gray-100 min-w-36">Attack Speed</div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-yellow-400 h-2.5 rounded-full"
                :style="{ width: props.attackSpeed }"
              ></div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="text-lg text-gray-100 min-w-36">Attack Range</div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-yellow-400 h-2.5 rounded-full"
                :style="{ width: props.attackRange }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 m-2 text-base text-center text-gray-300">
        {{ props.description }}
      </div>

      <div
        :id="'tooltip-card' + cardIndex"
        role="tooltip"
        class="absolute z-10 invisible inline-block transition-opacity duration-300 bg-gray-900 border border-white rounded-lg shadow-sm opacity-0 tooltip"
      >
        <!-- <img
          src="../../image/classes/gif/giphy.gif"
          alt="Class Gif"
          class="w-32 rounded-lg"
        /> -->
      </div>
    </div>
  </div>
</template>

<style>
/* You can add additional custom styles here if needed */
</style>
