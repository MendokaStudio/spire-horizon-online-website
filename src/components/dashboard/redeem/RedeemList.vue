<script setup>
import { initFlowbite } from "flowbite";
import { ref, onMounted } from "vue";
import _ from "lodash";

import { useRedeemStore } from "@/stores/redeem";

const redeemStore = useRedeemStore();

const deleteHandlingCode = ref(null);
const searchRedeemCodeList = ref(null);
const searchQueryRedeemCodeList = ref("");

const handleSearchRedeemCode = () => {
  // Ensure redeemCodeList is defined
  if (!props.redeemCodeList) {
    searchRedeemCodeList.value = [];
    return;
  }

  // Trim whitespace from the search query
  const query = searchQueryRedeemCodeList.value.trim().toLowerCase();

  // If the search query is empty, reset the search results
  if (!query) {
    searchRedeemCodeList.value = props.redeemCodeList;
    return;
  }

  // Find all matching items
  searchRedeemCodeList.value = props.redeemCodeList.filter((item) =>
    item.Code.toLowerCase().includes(query)
  );
};

const props = defineProps({
  redeemCodeList: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["confirmDelete"]);

const handleConfirmDelete = () => {
  emit("confirmDelete");
};

// initialize components based on data attribute selectors
onMounted(async () => {
  searchRedeemCodeList.value = props.redeemCodeList;
  initFlowbite();
});

const findRemainExpireDay = (timestamp, expireIn) => {
  const currentTime = new Date();

  // Convert startDate to JavaScript Date object
  const startDate = new Date(
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
  );

  // Calculate the expiration date by adding expireIn days to the startDate
  const expireInMilliseconds = expireIn * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(startDate.getTime() + expireInMilliseconds);

  // Calculate the remaining time from today to the expiration date
  const remainingMilliseconds = expirationDate - currentTime;

  if (remainingMilliseconds > 0) {
    const remainingDays = Math.floor(
      remainingMilliseconds / (24 * 60 * 60 * 1000)
    );
    const remainingHours = Math.floor(
      (remainingMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const remainingMinutes = Math.floor(
      (remainingMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
    );
    const remainingSeconds = Math.floor(
      (remainingMilliseconds % (60 * 1000)) / 1000
    );

    return `${remainingDays} d ${remainingHours} h ${remainingMinutes} m`;
  } else {
    return "Expired";
  }
};

const formatExpireDate = (timestamp, expireIn) => {
  const date = new Date((timestamp._seconds + expireIn * 86400) * 1000);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");

  return day + "/" + month + "/" + year + " " + hour + ":" + minute;
};

const handleDeleteRedeemCode = async (code) => {
  deleteHandlingCode.value = code;
  const input = prompt(
    "[ Delete Redeem Code ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here

    await redeemStore.deleteRedeemCode(code);
    handleConfirmDelete();
  } else {
    alert("Private Key Mismatch!");
  }
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md p-3 sm:rounded-lg">
    <div class="pb-4 bg-white dark:bg-gray-900">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div
          class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          v-model="searchQueryRedeemCodeList"
          @input="handleSearchRedeemCode"
          class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Redeem Code"
        />
      </div>
    </div>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Code</th>
          <th scope="col" class="px-6 py-3">Item ID</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Item Data</th>
          <th scope="col" class="px-6 py-3">One Time Use</th>
          <th scope="col" class="px-6 py-3">Expire Day</th>
          <th scope="col" class="px-6 py-3">Expire In</th>
          <th scope="col" class="px-6 py-3">Expire Date</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <tr
          v-for="(code, index) in searchRedeemCodeList"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ code.Code }}
          </th>
          <td class="px-6 py-4">{{ code.ItemID }}</td>
          <td class="px-6 py-4">{{ code.Quantity }}</td>
          <td class="px-6 py-4">
            <div v-if="!Object.keys(code.ItemData)[0]">-</div>
            <div v-if="Object.keys(code.ItemData)[0]">
              <div v-for="(data, key) in code.ItemData" :key="key">
                {{ key }}: {{ data }}
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            {{ code.oneTimeUse ? "Yes" : "No" }}
          </td>
          <td class="px-6 py-4">
            {{ code.ExpireIn }}
          </td>
          <td class="px-6 py-4">
            {{ findRemainExpireDay(code.Date, code.ExpireIn) }}
          </td>
          <td class="px-6 py-4">
            {{ formatExpireDate(code.Date, code.ExpireIn) }}
          </td>
          <td class="px-6 py-4 flex space-x-3">
            <button
              type="button"
              @click="handleDeleteRedeemCode(code.Code)"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
