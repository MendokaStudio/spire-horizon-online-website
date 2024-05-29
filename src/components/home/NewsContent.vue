<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";

const utilityStore = useUtilityStore();

const errMsg = ref("");

onMounted(() => {
  utilityStore.ContentReveal();
});
</script>

<template>
  <div
    class="w-screen h-screen lg:pt-[5%] md:pt-[10%] sm:pt-[8%] bg-black bg-opacity-80"
  >
    <div class="w-full h-full flex items-center justify-center relative px-2">
      <div
        class="md:w-[900px] md:h-[600px] w-[600px] h-[500px] bg-[url('../image/elements/modal_background.png')] bg-[length:100%_100%]"
      >
        <div
          class="flex justify-center items-center mt-8 md:mt-24 flex-col space-y-6"
        >
          <div class="text-3xl">Playtest</div>
          <div>
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-white"
              >Enter your email to receive a Steam key.</label
            >
            <input
              type="text"
              id="base-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email Address"
            />
            <div v-if="errMsg" class="mx-auto w-fit mt-2 text-red-600">
              {{ errMsg }}
            </div>
          </div>
          <button
            type="submit"
            class="text-white w-60 h-16 bg-[url('../image/elements/button_background.png')] hover:bg-[url('../image/elements/button_hover_background.png')] bg-[length:100%_100%]"
          >
            Submit
          </button>
          <div class="max-w-96 text-center px-8">
            To participate in the playtest, you must enter your email to receive
            a Steam key. After the playtest concludes, all keys, including old
            and new ones, will be revoked.
          </div>
          <div class="max-w-[600px] text-center text-2xl px-8">
            The playtest will end on June 18, 2024.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
