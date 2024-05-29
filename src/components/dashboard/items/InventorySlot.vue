<script setup>
import { Modal, initFlowbite } from "flowbite";
import { useInventoryStore } from "../../../stores/inventory";
import { ref, onMounted } from "vue";
import _ from "lodash";

const inventoryStore = useInventoryStore();

const currentItemData = ref(null);
const currentInventoryData = ref(null);

const updateItemQuantity = ref(0);

const pressTimer = ref(null);
const pressDuration = ref(3000);
const progress = ref(0);
const interval = ref(null);
// Behaviour: 0 is Update, 1 is Delete
const behaviour = ref(0);

const props = defineProps({
  itemData: {
    type: Object,
    require: true,
  },
  itemSlotIndex: {
    type: Number,
    require: true,
  },
  inventoryType: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
});

// initialize components based on data attribute selectors
onMounted(() => {
  if (props.itemData.InventorySlot !== null) {
    currentItemData.value = _.cloneDeep(
      props.itemData.InventorySlot[props.itemSlotIndex]
    );
    currentInventoryData.value = _.cloneDeep(props.itemData);

    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
});

const resetAllData = () => {
  currentItemData.value = _.cloneDeep(
    props.itemData.InventorySlot[props.itemSlotIndex]
  );
  updateItemQuantity.value = currentItemData.value.Quantity;
};

// Hold Press Function
const startPress = (behaviourFromButton) => {
  behaviourFromButton == 0
    ? (pressDuration.value = 1000)
    : (pressDuration.value = 1500);
  behaviour.value = behaviourFromButton;
  resetProgress();
  interval.value = setInterval(() => {
    progress.value += 100 / (pressDuration.value / 10);
  }, 10);
  pressTimer.value = setTimeout(() => {
    handleUpdateOrDeleteItem();
    resetProgress();
  }, pressDuration.value);
};

const endPress = () => {
  clearTimeout(pressTimer.value);
  clearInterval(interval.value);
  resetProgress();
};

const resetProgress = () => {
  progress.value = 0;
};

const GetItemIcon = () => {
  if (currentItemData.value) {
    return new URL(
      `../../../image/items/${currentItemData.value.ItemRowName}.png`,
      import.meta.url
    ).href;
  }
};

// Update or Delete Item
const handleUpdateOrDeleteItem = async () => {
  const input = prompt(
    "[ Manage Player Item ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    endPress();
    const itemModal = new Modal(
      document.getElementById(
        props.inventoryType + props.itemSlotIndex + "modal"
      )
    );
    itemModal.hide();
    initFlowbite();

    if (behaviour.value == 0) {
      // Update Item Data
      console.log("object");

      currentInventoryData.value.InventorySlot[props.itemSlotIndex] =
        currentItemData.value;
      currentInventoryData.value.InventorySlot[props.itemSlotIndex].Quantity =
        updateItemQuantity.value;

      await inventoryStore.updatePlayerItem(
        props.inventoryType,
        props.uid,
        currentInventoryData.value
      );
      CallRefreshPlayerData();
    } else if (behaviour.value == 1) {
      // Delete Item Data
      currentInventoryData.value.Inventory[currentItemData.value.ItemRowName] -=
        currentItemData.value.Quantity;
      if (
        currentInventoryData.value.Inventory[
          currentItemData.value.ItemRowName
        ] <= 0
      ) {
        delete currentInventoryData.value.Inventory[
          currentItemData.value.ItemRowName
        ];
      }
      delete currentInventoryData.value.InventorySlot[props.itemSlotIndex];

      await inventoryStore.updatePlayerItem(
        props.inventoryType,
        props.uid,
        currentInventoryData.value
      );
      CallRefreshPlayerData();
    }
  } else {
    alert("Private Key Mismatch!");
  }
};

// Define emits
const emit = defineEmits(["callRefreshPlayerData"]);

const CallRefreshPlayerData = () => {
  emit("callRefreshPlayerData");
};
</script>
<template>
  <div
    class="border-2 w-fit border-dashed border-slate-300 hover:border-slate-500 rounded-xl p-0.5 ease-in-out duration-300"
  >
    <button
      type="button"
      :disabled="!currentItemData"
      v-if="currentItemData"
      :data-modal-target="inventoryType + itemSlotIndex + 'modal'"
      :data-modal-toggle="inventoryType + itemSlotIndex + 'modal'"
      :data-tooltip-target="inventoryType + itemSlotIndex"
      @click="
        () => {
          resetAllData();
          updateItemQuantity = currentItemData.Quantity;
        }
      "
      class="text-white p-2 bg-slate-50 focus:outline-none rounded-xl w-20 h-20"
    >
      <div class="relative w-full h-full">
        <div v-if="currentItemData">
          <img class="w-full h-full" :src="GetItemIcon()" alt="" />
        </div>

        <div
          v-if="currentItemData"
          class="absolute bottom-[-3px] right-[-3px] px-1.5 text-slate-500 rounded-md text-sm max-w-9/12 min-w-8 bg-slate-50 border-2 border-slate-300 shadow-inner"
        >
          {{ currentItemData ? currentItemData.Quantity : "0" }}
        </div>
      </div>
    </button>

    <button
      type="button"
      :disabled="!currentItemData"
      v-if="!currentItemData"
      class="text-white p-2 bg-slate-50 focus:outline-none rounded-xl w-20 h-20"
    >
      <div class="relative w-full h-full">
        <div v-if="!currentItemData">
          <img
            class="w-full h-full stroke-black"
            src="../../../image/items/empty_slot.png"
            alt=""
          />
        </div>
      </div>
    </button>

    <div
      v-if="currentItemData"
      :id="inventoryType + itemSlotIndex"
      role="tooltip"
      class="absolute z-50 invisible inline-block px-3 py-2 border-2 text-sm font-medium text-slate-600 transition-opacity border-slate-800 duration-300 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg shadow-sm opacity-0 tooltip"
    >
      <div class="p-2 text-white">
        <div class="flex justify-between space-x-3">
          <div>ItemID:</div>
          <div>{{ currentItemData.ItemRowName }}</div>
        </div>
        <div class="flex justify-between space-x-3">
          <div>Quantity:</div>
          <div>{{ currentItemData.Quantity }}</div>
        </div>
        <div
          v-for="(itemData, key) in currentItemData.Data"
          :key="key"
          class="flex justify-between space-x-3"
        >
          <div>{{ key }}</div>
          <div>{{ itemData }}</div>
        </div>
      </div>
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>

  <!-- Main modal -->
  <div
    v-if="currentItemData"
    :id="inventoryType + itemSlotIndex + 'modal'"
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ currentItemData.ItemRowName }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-toggle="inventoryType + itemSlotIndex + 'modal'"
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
        <form class="p-4 md:p-5">
          <div class="w-full">
            <!-- Modal Item Icon -->
            <div class="w-full">
              <div
                v-if="currentItemData"
                class="mx-auto w-56 h-56 border-2 rounded-lg shadow mb-5 p-3"
              >
                <img class="w-full h-full" :src="GetItemIcon()" alt="" />
              </div>
            </div>
            <div class="col-span-2 flex justify-between items-center space-x-3">
              <label
                for="quantity-modal"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Quantity:</label
              >
              <input
                type="number"
                name="name"
                id="quantity-modal"
                v-model="updateItemQuantity"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-8/12 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
              />
            </div>
          </div>

          <div v-for="(value, key) in currentItemData.Data" :key="key">
            <form>
              <div
                class="flex justify-between items-center space-x-3 space-y-2"
              >
                <label :for="key">{{ key }}:</label>
                <input
                  type="text"
                  :id="key"
                  v-model="currentItemData.Data[key]"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-8/12 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </form>
          </div>

          <!-- Buttons -->
          <div class="flex space-x-3 mt-4 pb-1">
            <button
              type="button"
              @mousedown="() => startPress(0)"
              @mouseup="endPress"
              @mouseleave="endPress"
              class="text-white w-full items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
            <button
              type="button"
              @click="() => resetAllData()"
              class="text-white w-full items-center bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset
            </button>
            <button
              type="button"
              @mousedown="startPress(1)"
              @mouseup="endPress"
              @mouseleave="endPress"
              class="text-white w-full items-center bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
            </button>
          </div>

          <!-- Progressbar -->
          <div
            v-if="progress > 0"
            class="w-full h-2 bg-gray-300 mt-2 rounded-lg"
          >
            <div
              :class="[
                'h-2 rounded-lg',
                behaviour == 0 ? ' bg-green-500' : ' bg-red-600',
              ]"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
