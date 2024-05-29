<script setup>
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import LoadingIcon from "../../utility/LoadingIcon.vue";
// Define Props
const props = defineProps({
  statName: {
    type: String,
    required: false,
  },
  statValue: {
    type: Number,
    required: false,
  },
  statImage: {
    type: String,
    required: false,
  },
});

const amountToUpdate = ref(0);

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

const iconUrl = ref(
  //   new URL(`../../../image/items/${props.currencyID}.png`, import.meta.url).href
  new URL(`../../../image/items/gold_coins.png`, import.meta.url).href
);
</script>
<template>
  <div class="w-full">
    <button
      :data-modal-target="'statModal' + props.statName"
      :data-modal-toggle="'statModal' + props.statName"
      :class="{
        'flex w-full justify-between  items-center p-2 border-2 rounded-xl bg-gray-300 shadow hover:cursor-pointer hover:bg-gray-50 hover:scale-105 duration-150 ease-linear':
          isLoading,
        'flex w-full justify-between  items-center p-2 border-2 rounded-xl shadow hover:cursor-pointer hover:bg-gray-50 hover:scale-105 duration-150 ease-linear':
          !isLoading,
      }"
    >
      <img class="w-12 h-12" :src="iconUrl" alt="Gold Coins" />
      <div class="flex flex-col justify-end items-end px-2 text-slate-600">
        <h1>{{ statName }}</h1>
        <h1 v-if="!isLoading">{{ statValue }}</h1>
        <LoadingIcon v-if="isLoading" />
      </div>
    </button>
  </div>

  <!-- Main modal -->
  <div
    :id="'statModal' + props.statName"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 max-h-full">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white overflow-auto max-h-[800px]">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-600 dark:text-white">
            {{ props.statName }} Ranking
          </h3>
          <button
            type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-hide="'statModal' + props.statName"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <div class="relative overflow-x-auto sm:rounded-lg border-2">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Product name</th>
                  <th scope="col" class="px-6 py-3">Color</th>
                  <th scope="col" class="px-6 py-3">Category</th>
                  <th scope="col" class="px-6 py-3">Price</th>
                  <th scope="col" class="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(n, index) in 100"
                  :key="index"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
