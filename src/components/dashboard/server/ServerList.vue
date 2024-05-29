<script setup>
import LoadingIcon from "../../utility/LoadingIcon.vue";
import ConfirmationModal from "../../utility/ConfirmationModal.vue";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";

defineProps({
  serverName: {
    type: String,
    required: true,
  },
  serverID: {
    type: String,
    required: true,
  },
  serverIP: {
    type: String,
    required: true,
  },
  serverPingURL: {
    type: String,
    required: true,
  },
  publicAccess: {
    type: Boolean,
    required: true,
  },
  serverStatus: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

// Define emits
const emit = defineEmits([
  "confirmDelete",
  "setPrivate",
  "setPublic",
  "launchServer",
  "terminateServer",
]);

const handleConfirmDelete = () => {
  emit("confirmDelete");
};
const handleLaunchServer = () => {
  emit("launchServer");
};
const handleTerminateServer = () => {
  emit("terminateServer");
};
const handleSetPublic = () => {
  emit("setPublic");
};
const handleSetPrivate = () => {
  emit("setPrivate");
};

// initialize components based on data attribute selectors
onMounted(async () => {
  initFlowbite();
});
</script>

<template>
  <div
    class="w-full p-6 bg-white border-2 border-slate-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center space-x-5 mb-2">
      <div
        class="text-2xl font-bold tracking-tight text-slate-600 dark:text-white"
      >
        {{ serverName }}
      </div>
      <div
        :class="{
          'bg-green-500 w-5 h-5 rounded-full': serverStatus,
          'bg-rose-800 w-5 h-5 rounded-full': !serverStatus,
        }"
      ></div>
    </div>
    <div class="border-2 p-5 rounded-lg my-3 border-dashed">
      <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Server ID: {{ serverID }}
      </div>
      <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Server IP: {{ serverIP }}
      </div>
      <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Server Ping URL: {{ serverPingURL }}
      </div>
      <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Public Access: {{ publicAccess ? "Public" : "Private" }}
      </div>

      <div class="flex space-x-1">
        <div>Server Status:</div>
        <div
          :class="{
            'mb-3 font-normal text-gray-50 bg-green-500 rounded-md px-2':
              serverStatus,
            'mb-3 font-normal text-gray-50 bg-rose-800 rounded-md px-2':
              !serverStatus,
          }"
        >
          {{ serverStatus ? "Online" : "Offline" }}
        </div>
      </div>
    </div>

    <div
      class="flex mx-auto flex-col space-x-2 p-2 pr-8 rounded-lg border-2 border-dashed"
    >
      <div
        class="p-3 text-lg font-bold tracking-tight text-slate-600 dark:text-white"
      >
        Manage Server
      </div>
      <div
        class="flex flex-col md:flex-row space-x-2 space-y-2 md:space-y-0 mb-3"
      >
        <button
          v-if="!serverStatus"
          type="button"
          :disabled="isLoading"
          @click="handleLaunchServer"
          class="text-white ml-2 w-full md:w-fit min-w-36 bg-green-700 hover:bg-green-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <div v-if="!isLoading">Launch Server</div>
          <LoadingIcon v-if="isLoading" />
        </button>
        <button
          v-if="serverStatus"
          type="button"
          :disabled="isLoading"
          @click="handleTerminateServer"
          class="text-white w-full ml-2 md:w-fit min-w-36 bg-rose-700 hover:bg-rose-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <div v-if="!isLoading">Terminate Server</div>
          <LoadingIcon v-if="isLoading" />
        </button>
        <button
          v-if="!publicAccess"
          type="button"
          :disabled="isLoading"
          @click="handleSetPublic"
          class="text-white w-full md:w-fit min-w-36 bg-yellow-700 hover:bg-yellow-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <div v-if="!isLoading">Set Public</div>
          <LoadingIcon v-if="isLoading" />
        </button>
        <button
          v-if="publicAccess"
          type="button"
          :disabled="isLoading"
          @click="handleSetPrivate"
          class="text-white w-full md:w-fit min-w-36 bg-teal-700 hover:bg-teal-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <div v-if="!isLoading">Set Private</div>
          <LoadingIcon v-if="isLoading" />
        </button>
        <button
          type="button"
          :disabled="isLoading"
          @click="handleConfirmDelete"
          class="text-white w-full md:w-fit min-w-36 bg-pink-700 hover:bg-pink-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <div v-if="!isLoading">Delete Server</div>
          <LoadingIcon v-if="isLoading" />
        </button>
      </div>
    </div>
  </div>
</template>
