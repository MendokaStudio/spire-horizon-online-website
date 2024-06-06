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
        class="lg:w-[400px] lg:h-[400px] w-[400px] h-[380px] bg-[url('../image/elements/modal_background.png')] bg-[length:100%_100%]"
      >
        <div
          class="w-full h-full flex justify-center items-center flex-col rounded-xl shadow-xl space-y-8"
        >
          <div class="text-center text-gray-300">
            <div class="text-2xl max-w-96">Spire Horizon Online</div>
            <div class="text-2xl max-w-96">Pre Alpha Test</div>
          </div>

          <a
            href="https://gleam.io/vMBS0/spire-horizon-online"
            target="_blank"
            class="max-w-[600px] text-center text:sm lg:text-xl px-8 text-yellow-300 ring p-3 rounded-lg hover:cursor-pointer ring-yellow-300 ring-opacity-35 shadow-2xl hover:scale-125 ease-in-out duration-300"
          >
            Get Steam Key
          </a>
          <div class="w-80 text-center text-sm md:text-base text-gray-300">
            The playtest will start on June 7, 2024, and will end on June 20,
            2024.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 
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
          class="w-full h-full flex justify-center items-center flex-col rounded-xl shadow-xl space-y-8"
        >
          <div class="text-center text-gray-300">
            <div class="text-2xl max-w-96">Spire Horizon Online</div>
            <div class="text-2xl max-w-96">Pre Alpha Test</div>
          </div>

          <a
            href="https://gleam.io/vMBS0/spire-horizon-online"
            target="_blank"
            class="max-w-[600px] text-center text:sm lg:text-xl px-8 text-yellow-300 ring p-3 rounded-lg hover:cursor-pointer ring-yellow-300 ring-opacity-35 shadow-2xl hover:scale-125 ease-in-out duration-300"
          >
            Get Steam Key
          </a>
          <div class="w-72 text-center text-sm text-gray-300">
            The playtest will start on June 7, 2024, and will end on June 20,
            2024.
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
