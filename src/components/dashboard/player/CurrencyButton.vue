<script setup>
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import LoadingIcon from "../../utility/LoadingIcon.vue";
// Define Props
const props = defineProps({
  currencyID: {
    type: String,
    required: false,
  },
  currencyName: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
  },
});

const amountToUpdate = ref(0);

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

const iconUrl = ref(
  new URL(`../../../image/items/${props.currencyID}.png`, import.meta.url).href
);

// Define emits
const emit = defineEmits(["confirmUpdateCurrency"]);

const handleChangeCurrency = () => {
  emit("confirmUpdateCurrency", {
    currency: props.currencyID,
    amount: amountToUpdate.value,
  });
  amountToUpdate.value = 0;
};
</script>
<template>
  <button
    :data-modal-target="'updateCurrencyModal' + props.currencyID"
    :data-modal-toggle="'updateCurrencyModal' + props.currencyID"
    @click="
      () => {
        amountToUpdate = amount;
      }
    "
    :class="{
      'flex w-full justify-between  items-center p-2 border-2 rounded-xl bg-gray-300 shadow hover:cursor-pointer hover:bg-gray-50 hover:scale-105 duration-150 ease-linear':
        isLoading,
      'flex w-full justify-between  items-center p-2 border-2 rounded-xl shadow hover:cursor-pointer hover:bg-gray-50 hover:scale-105 duration-150 ease-linear':
        !isLoading,
    }"
  >
    <img class="w-12 h-12" :src="iconUrl" alt="Gold Coins" />
    <div class="flex flex-col justify-end items-end px-2">
      <h1>{{ currencyName }}</h1>
      <h1 v-if="!isLoading">{{ amount }}</h1>
      <LoadingIcon v-if="isLoading" />
    </div>
  </button>

  <!-- Main modal -->
  <div
    :id="'updateCurrencyModal' + props.currencyID"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Update Player Currency
          </h3>
          <button
            type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-hide="'updateCurrencyModal' + props.currencyID"
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
          <form
            class="space-y-4"
            action="#"
            @submit.prevent="() => handleChangeCurrency()"
          >
            <div>
              <label
                :for="'currencyAmount' + props.currencyID"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Amount</label
              >
              <input
                type="number"
                name="currencyAmount"
                :id="'currencyAmount' + props.currencyID"
                v-model="amountToUpdate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>

            <button
              type="submit"
              :data-modal-hide="'updateCurrencyModal' + props.currencyID"
              class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Player {{ props.currencyName }}
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Ban Players Before Updating Currency!
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
