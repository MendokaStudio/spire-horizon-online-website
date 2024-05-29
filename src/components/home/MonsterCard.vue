<script setup>
const props = defineProps({
  cardIndex: {
    type: Number,
    required: true,
  },
});

const imagePath = new URL(
  `../../image/cards/Card_Fit_${props.cardIndex}.png`,
  import.meta.url
).href;
</script>

<template>
  <div
    class="relative hover:scale-150 hover:z-10 duration-300 ease-in-out hover:rotate-6"
  >
    <img :src="imagePath" alt="Card Image" />
  </div>
</template>

<style>
/* You can add additional custom styles here if needed */
</style>
