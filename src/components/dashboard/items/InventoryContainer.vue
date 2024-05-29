<script setup>
import inventoryslot from "./InventorySlot.vue";
import { ref, onMounted } from "vue";
const props = defineProps({
  playerInventory: {
    type: Object,
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

const isLoading = ref(true);

onMounted(()=>{
  isLoading.value = true;

  if(props.playerInventory){
    isLoading.value = false;
  }
})

// Define emits
const emit = defineEmits(["callRefreshPlayerData"]);

const CallRefreshPlayerData = () => {
  emit("callRefreshPlayerData");
};
</script>

<template>
  <div v-if="!isLoading">
    <div
      v-if="
      false &&
        props.playerInventory &&
        Object.keys(props.playerInventory.InventorySlot).length > 36
      "
      class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-12 gap-4"
    >
      <inventoryslot
        v-for="(item, index) in props.playerInventory.InventorySlot"
        :key="index"
        :itemData="props.playerInventory"
        :itemSlotIndex="parseInt(index)"
        :inventoryType="props.inventoryType"
        :uid="props.uid"
        @callRefreshPlayerData="CallRefreshPlayerData"
      />
    </div>
    <div
      v-else
      class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-12 gap-4"
    >
      <inventoryslot
        v-for="n in 36"
        :key="n"
        :itemData="props.playerInventory"
        :itemSlotIndex="n - 1"
        :inventoryType="props.inventoryType"
        :uid="props.uid"
        @callRefreshPlayerData="CallRefreshPlayerData"
      />
    </div>
  </div>
</template>
