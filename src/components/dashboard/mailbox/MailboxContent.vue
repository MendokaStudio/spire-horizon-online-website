<script setup>
import {
  generateRandomString,
  errorFormat,
  formatItemDataToObject,
  downloadJson,
} from "../../../script/utilityFunction.js";

import { useMailboxStore } from "../../../stores/mailbox.js";
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";

import LoadingIcon from "@/components/utility/LoadingIcon.vue";
import StatusHandling from "@/components/utility/StatusHandling.vue";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

const mailboxStore = useMailboxStore();

const uid = ref("");
const uids = ref(null);
const itemID = ref("");
const quantity = ref(0);
const mailTitle = ref("");

const isLoading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");
const updatingMsg = ref("");

// Item Data
const itemData = ref("");
const selectedItemData = ref("");
const itemDataValue = ref("");

const clearAllVariable = () => {
  uid.value = "";
  uids.value = null;
  itemID.value = "";
  quantity.value = 0;
  mailTitle.value = "";
  itemData.value = "";
  selectedItemData.value = "";
  itemDataValue.value = "";
  document.getElementById("uids").value = "";
};

const handleUIDFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        uids.value = JSON.parse(e.target.result);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid JSON file.");
  }
};

const handleAddItemData = () => {
  if (selectedItemData.value && itemDataValue.value) {
    if (itemData.value) {
      itemData.value =
        itemData.value +
        "," +
        selectedItemData.value +
        ":" +
        itemDataValue.value;
    } else {
      itemData.value =
        itemData.value + selectedItemData.value + ":" + itemDataValue.value;
    }
    itemDataValue.value = "";
  }
};

const handleSendItemToUID = async () => {
  //Empty check
  if (uid.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The UID should not be empty!";
    return;
  } else if (itemID.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The item ID should not be empty!";
    return;
  } else if (quantity.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The quantity should not be 0!";
    return;
  }

  const input = prompt(
    "[ Sending Item to Single Player ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.SECRET_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "Sending item to " + uid.value;

    const randomMailID = generateRandomString();
    const formatedItemData = formatItemDataToObject(itemData.value);

    const data = {
      [randomMailID]: {
        ItemID: itemID.value,
        Quantity: quantity.value,
        Title: mailTitle.value == "" ? "System Mail" : mailTitle.value,
        ItemData: formatedItemData,
      },
    };

    try {
      await mailboxStore.sendItemToUID(uid.value, data);
      setTimeout(() => {
        isLoading.value = false;
        updatingMsg.value = "";
        successMsg.value = "Success! item has been sent to " + uid.value;
        clearAllVariable();
      }, 1000);
    } catch (error) {
      isLoading.value = false;
      updatingMsg.value = "";
      errorMsg.value = errorFormat(error.message);
    }
  } else {
    alert("Private Key Mismatch!");
  }
};

const handleSendItemToMultiplePlayer = async () => {
  //Empty check
  if (uids.value == null) {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The UIDs file should not be empty!";
    return;
  } else if (itemID.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The item ID should not be empty!";
    return;
  } else if (quantity.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The quantity should not be 0!";
    return;
  }

  const input = prompt(
    "[ Sending Item to Multiple Player ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.SECRET_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "Sending item to all UIDs in file";

    const randomMailID = generateRandomString();
    const formatedItemData = formatItemDataToObject(itemData.value);

    const data = {
      [randomMailID]: {
        ItemID: itemID.value,
        Quantity: quantity.value,
        Title: mailTitle.value == "" ? "System Mail" : mailTitle.value,
        ItemData: formatedItemData,
      },
    };

    try {
      await mailboxStore.sendItemToMultiplePlayers(uids.value, data);
      setTimeout(() => {
        isLoading.value = false;
        updatingMsg.value = "";
        successMsg.value = "Success! item has been sent to all UIDs in file";
        clearAllVariable();
      }, 1000);
    } catch (error) {
      isLoading.value = false;
      updatingMsg.value = "";
      errorMsg.value = errorFormat(error.message);
    }
  } else {
    alert("Private Key Mismatch!");
  }
};

const handleSendItemToAllPlayer = async () => {
  //Empty check
  if (itemID.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The item ID should not be empty!";
    return;
  } else if (quantity.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The quantity should not be 0!";
    return;
  }

  const input = prompt(
    "[ Sending Item to All Player ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.SECRET_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "Sending item to all player";

    const randomMailID = generateRandomString();
    const formatedItemData = formatItemDataToObject(itemData.value);

    const data = {
      [randomMailID]: {
        ItemID: itemID.value,
        Quantity: quantity.value,
        Title: mailTitle.value == "" ? "System Mail" : mailTitle.value,
        ItemData: formatedItemData,
      },
    };

    try {
      await mailboxStore.sendItemToAllPlayers(data);
      setTimeout(() => {
        isLoading.value = false;
        updatingMsg.value = "";
        successMsg.value = "Success! item has been sent to all player";
        clearAllVariable();
      }, 1000);
    } catch (error) {
      isLoading.value = false;
      updatingMsg.value = "";
      errorMsg.value = errorFormat(error.message);
    }
  } else {
    alert("Private Key Mismatch!");
  }
};
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div
      class="p-4 border-2 border-gray-200 w-fit border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <!-- Content here -->

      <form class="w-fit">
        <!-- UID -->
        <div class="mb-5">
          <label
            for="uid"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >User (UID)</label
          >
          <input
            type="text"
            id="uid"
            v-model="uid"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="WvgUTKLaJYPSPYv5VGDYwhvSWMG2"
          />
        </div>
        <!-- UIDs -->
        <div class="mb-5">
          <label
            for="uids"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Users (UIDs) (<button
              type="button"
              class="underline"
              @click="downloadJson('../../../public/uids.json', 'uids.json')"
            >
              example file</button
            >)</label
          >
          <input
            v-on:change="handleUIDFileChange"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="uids"
            type="file"
          />
        </div>
        <!-- Flexer Form -->
        <div class="flex space-x-10 justify-center items-center">
          <!-- Left Form -->
          <div class="w-1/2">
            <div class="mb-5">
              <label
                for="itemID"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Item ID</label
              >
              <input
                type="text"
                id="itemID"
                v-model="itemID"
                placeholder="novice_sword"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            <div class="mb-5">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Quantity</label
              >
              <input
                type="number"
                id="quantity"
                v-model="quantity"
                placeholder="1"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            <div class="mb-5">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mail Title (Optional)</label
              >
              <input
                type="text"
                id="title"
                v-model="mailTitle"
                placeholder="Hello Player"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
          </div>
          <!-- Right Form -->
          <div class="w-1/2">
            <div class="mb-5">
              <label
                for="itemData"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Item Data</label
              >
              <textarea
                type="text"
                id="itemData"
                v-model="itemData"
                placeholder="Damage:100, Health:100"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              ></textarea>
            </div>

            <div class="mb-5">
              <label
                for="selectableItemData"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select Item Data</label
              >
              <select
                v-model="selectedItemData"
                id="selectableItemData"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="level">Level</option>
                <option value="ItemQuality">
                  Item Quality (Common, Rare, Epic, Legendary)
                </option>
                <option value="Damage">Damage</option>
                <option value="Attack Speed">Attack Speed</option>
                <option value="Critical Rate">Critical Rate</option>
                <option value="Critical Damage">Critical Damage</option>
                <option value="Skill Recovery">Skill Recovery</option>
                <option value="Effectiveness">Effectiveness</option>
                <option value="Health">Health</option>
                <option value="Health Regen">Health Regen</option>
                <option value="Defense">Defense</option>
                <option value="Block Chance">Block Chance</option>
                <option value="Block Severity">Block Severity</option>
                <option value="Resistance">Resistance</option>
                <option value="Mana">Mana</option>
                <option value="Mana Regen">Mana Regen</option>
                <option value="Stamina">Stamina</option>
                <option value="Stamina Regen">Stamina Regen</option>
                <option value="Mobility">Mobility</option>
                <option value="Flying Speed">Flying Speed</option>
                <option value="Exp Gain">Exp Gain</option>
                <option value="Gold Gain">Gold Gain</option>
              </select>
            </div>
            <div class="mb-5">
              <label
                for="itemDataValue"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Item Data Value</label
              >
              <div class="flex">
                <input
                  type="text"
                  id="itemDataValue"
                  v-model="itemDataValue"
                  placeholder="10"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 max-h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                <button
                  type="button"
                  v-on:click="handleAddItemData()"
                  class="ml-1 text-black border shadow-sm bg-white w-2/5 hover:bg-white hover:ring-1 ease-in-out duration-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-h-10 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <StatusHandling
          :successMsg="successMsg"
          :dangerMsg="errorMsg"
          :warningMsg="updatingMsg"
          :isHide="false"
        />
        <!-- Submit Button -->
        <div
          class="flex flex-col md:flex-row space-x-3 md:space-y-0 space-y-2 justify-center items-center"
        >
          <button
            type="button"
            :disabled="isLoading"
            @click="handleSendItemToUID"
            class="text-white min-w-36 w-full bg-green-700 hover:bg-green-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-green-300 font-medium rounded-lg text-sm py-2.5 text-center"
          >
            <div v-if="!isLoading">To Single Player</div>
            <LoadingIcon v-if="isLoading" />
          </button>
          <button
            type="button"
            :disabled="isLoading"
            @click="handleSendItemToMultiplePlayer"
            class="text-white min-w-36 w-full bg-yellow-700 hover:bg-yellow-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-yellow-300 font-medium rounded-lg text-sm py-2.5 text-center"
          >
            <div v-if="!isLoading">To Multiple Player</div>
            <LoadingIcon v-if="isLoading" />
          </button>
          <button
            type="button"
            :disabled="isLoading"
            @click="handleSendItemToAllPlayer"
            class="text-white min-w-36 w-full bg-rose-700 hover:bg-rose-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-rose-300 font-medium rounded-lg text-sm py-2.5 text-center"
          >
            <div v-if="!isLoading">To All player</div>
            <LoadingIcon v-if="isLoading" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
