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
    class="relative hover:scale-100 hover:z-10 duration-300 ease-in-out border-2 border-amber-500 border-opacity-60 rounded-3xl bg-slate-800 w-full"
  >
    <div class="w-full h-full pr-2">
      <div class="flex space-x-3 justify-start items-start">
        <div>
          <img
            :src="imagePath"
            alt="Class Image"
            class="w-36 rounded-tl-3xl rounded-br-xl"
          />
        </div>
        <div
          class="w-full h-full flex flex-col justify-between my-auto space-y-1 pt-2"
        >
          <div class="text-2xl font-bold text-white">{{ props.className }}</div>
          <div class="flex justify-center items-center w-full">
            <div class="min-w-36 text-lg text-gray-100">Attack Speed</div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-yellow-400 h-2.5 rounded-full"
                :style="{ width: props.attackSpeed }"
              ></div>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="min-w-36 text-lg text-gray-100">Attack Range</div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-yellow-400 h-2.5 rounded-full"
                :style="{ width: props.attackRange }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-2 text-center text-base px-6 text-gray-300">
        {{ props.description }}
      </div>

      <div
        :id="'tooltip-card' + cardIndex"
        role="tooltip"
        class="absolute z-10 invisible border border-white inline-block transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
      >
        <img
          src="../../image/classes/gif/giphy.gif"
          alt="Class Gif"
          class="w-32 rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* You can add additional custom styles here if needed */
</style>
