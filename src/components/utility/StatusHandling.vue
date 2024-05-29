<script setup>
defineProps({
  dangerMsg: {
    type: String,
    required: false,
  },
  warningMsg: {
    type: String,
    required: false,
  },
  successMsg: {
    type: String,
    required: false,
  },
  isHide: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <!-- Danger Alert -->
  <div
    v-if="dangerMsg && !isHide"
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    <span class="font-medium">{{ dangerMsg }}</span> 
  </div>

  <!-- Success Alert -->
  <div
    v-if="successMsg && !isHide"
    class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
    role="alert"
  >
    <span class="font-medium">{{ successMsg }}</span> 
  </div>

  <!-- Warning Alert -->
  <div
    v-if="warningMsg && !isHide"
    class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
    role="alert"
  >
    <span class="font-medium">{{ warningMsg }}</span> 
  </div>
</template>
