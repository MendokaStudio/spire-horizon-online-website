<script setup>
import InventoryContainer from "./InventoryContainer.vue";

const props = defineProps({
  playerInventory: {
    type: Object,
    require: true,
  },
  playerEquipment: {
    type: Object,
    require: true,
  },
  playerBank: {
    type: Object,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
});

// Define emits
const emit = defineEmits(["callRefreshPlayerData"]);

const CallRefreshPlayerData = () => {
  emit("callRefreshPlayerData");
};
</script>

<template>
  <div
    v-if="props.playerInventory && props.playerEquipment && props.playerBank"
    class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select tab</label>
      <select
        id="tabs"
        class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Inventory</option>
        <option>Equipment</option>
        <option>Storage</option>
      </select>
    </div>
    <ul
      class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
      id="fullWidthTab"
      data-tabs-toggle="#fullWidthTabContent"
      role="tablist"
    >
      <li class="w-full">
        <button
          id="inventory-tab"
          data-tabs-target="#inventory"
          type="button"
          role="tab"
          aria-controls="inventory"
          aria-selected="true"
          class="inline-block w-full p-4 text-lg font-bold hover:text-green-400  focus:text-green-400 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Inventory
        </button>
      </li>
      <li class="w-full">
        <button
          id="equipment-tab"
          data-tabs-target="#equipment"
          type="button"
          role="tab"
          aria-controls="equipment"
          aria-selected="false"
          class="inline-block w-full p-4 text-lg font-bold hover:text-yellow-400 focus:text-yellow-400 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Equipment
        </button>
      </li>
      <li class="w-full">
        <button
          id="storage-tab"
          data-tabs-target="#storage"
          type="button"
          role="tab"
          aria-controls="storage"
          aria-selected="false"
          class="inline-block w-full p-4 text-lg font-bold hover:text-cyan-400 focus:text-cyan-400 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Storage
        </button>
      </li>
    </ul>
    <div
      id="fullWidthTabContent"
      class="border-t border-gray-200 dark:border-gray-600"
    >
      <!-- Inventory -->
      <div
        class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        id="inventory"
        role="tabpanel"
        aria-labelledby="inventory-tab"
      >
        <InventoryContainer
          :playerInventory="props.playerInventory"
          :uid="props.uid"
          inventoryType="Inventory"
          class="w-full"
          @callRefreshPlayerData="CallRefreshPlayerData"
        />
      </div>

      <!-- Equipment -->
      <div
        class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        id="equipment"
        role="tabpanel"
        aria-labelledby="equipment-tab"
      >
        <InventoryContainer
          :playerInventory="props.playerEquipment"
          :uid="props.uid"
          inventoryType="Equipment"
          class="w-full"
          @callRefreshPlayerData="CallRefreshPlayerData"
        />
      </div>

      <!-- Storage -->
      <div
        class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        id="storage"
        role="tabpanel"
        aria-labelledby="storage-tab"
      >
        <InventoryContainer
          :playerInventory="props.playerBank"
          :uid="props.uid"
          inventoryType="Bank"
          class="w-full"
          @callRefreshPlayerData="CallRefreshPlayerData"
        />
      </div>
    </div>
  </div>
</template>
