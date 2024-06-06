<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";

const utilityStore = useUtilityStore();

onMounted(async () => {
  utilityStore.ContentReveal();
});
</script>

<template>
  <div
    class="w-screen h-screen lg:pt-[5%] md:pt-[10%] sm:pt-[8%] bg-black bg-opacity-80"
  >
    <div class="w-full h-full flex items-center justify-center relative px-2">
      <div
        class="lg:w-[600px] lg:h-[600px] w-[500px] h-[470px] bg-[url('../image/elements/modal_background.png')] bg-[length:100%_100%]"
      >
        <div
          class="flex justify-center items-center mt-6 md:mt-7 lg:mt-14 flex-col space-y-6 w-fit mx-auto p-2 rounded-xl shadow-xl"
        >
          <div
            class="max-w-[600px] text-center text:sm lg:text-xl px-8 text-yellow-300"
          >
            The playtest will start on June 7, 2024.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
