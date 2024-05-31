<script setup>
import { useRouter } from "vue-router";
import { useUtilityStore } from "../../stores/utilityStore";

const router = useRouter();
const utilityStore = useUtilityStore();
</script>

<template>
  <!-- Footer -->
  <footer
  @click="utilityStore.SmoothChangeContent(router, 'Copyright')"
    class="w-full z-30 text-center py-1 bg-opacity-50 bg-black text-white"
  >
    <button type="button" class="text-white">
      <p class="text-xs">&copy; 2024 Mendoka. All rights reserved.</p>
    </button>
  </footer>
</template>
