<script setup>
import { ref, onMounted } from "vue";
import { useServerStore } from "@/stores/server";

import StatusHandling from "../../utility/StatusHandling.vue";
import ServerList from "./ServerList.vue";
import { initFlowbite } from "flowbite";
import LoadingIcon from "../../utility/LoadingIcon.vue";
import {
  generateRandomString,
  errorFormat,
  formatItemDataToObject,
  downloadJson,
} from "../../../script/utilityFunction";

const serverStore = useServerStore();

const serverID = ref("");
const serverName = ref("");
const serverIP = ref("");
const serverPingIP = ref("");
const isPublic = ref(false);
const isOnlineStatus = ref(false);

const isLoading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");
const updatingMsg = ref("");

const serverList = ref(null);

const isBlockMultipleLogin = ref(false);
const maxChannelPerServer = ref(0);
const maxPlayerPerChannel = ref(0);
const SaveFrequency = ref(0);

// initialize components based on data attribute selectors
onMounted(async () => {
  await serverStore.getAllServers();
  await serverStore.getServerData();
  
  isBlockMultipleLogin.value = serverStore.serverData.BlockMultipleLogin;
  maxChannelPerServer.value = serverStore.serverData.MaxChannelPerServer;
  maxPlayerPerChannel.value = serverStore.serverData.MaxPlayerPerChannel;
  SaveFrequency.value = serverStore.serverData.SaveFrequency;
  
  initFlowbite();
});

const clearAllVariable = () => {
  serverID.value = "";
  serverName.value = "";
  serverIP.value = "";
  serverPingIP.value = "";
  isPublic.value = false;
  isOnlineStatus.value = false;
  document.getElementById("checkbox-isPublic").checked = false;
  document.getElementById("checkbox-isOnlineStatus").checked = false;
};

const handleUpdateServerData = async () => {
  const input = prompt("[ Adding Server ]\nEnter Private Key to Continue:");
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "Updating Server Data";

    const data = {
      BlockMultipleLogin: isBlockMultipleLogin.value,
      MaxChannelPerServer: maxChannelPerServer.value,
      MaxPlayerPerChannel: maxPlayerPerChannel.value,
      SaveFrequency: SaveFrequency.value,
    };
    try {
      await serverStore.changeServerData(data);
      setTimeout(() => {
        isLoading.value = false;
        updatingMsg.value = "";
        successMsg.value = "Success! Server Data Updated";
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

const handleAddServer = async () => {
  // Empty check
  const duplicateServer = serverList.value?.find(
    (server) => server.id == serverID.value
  );

  if (duplicateServer) {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The server ID is unavailable!";
    return;
  } else if (serverID.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The Server ID should not be empty!";
    return;
  } else if (serverName.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The Server Name should not be empty!";
    return;
  } else if (serverIP.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The Server IP should not be empty!";
    return;
  } else if (serverPingIP.value == "") {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The Server Ping IP should not be empty!";
    return;
  } else if (
    serverID.value == "BlockMultipleLogin" ||
    serverID.value == "MaxChannelPerServer" ||
    serverID.value == "MaxPlayerPerChannel" ||
    serverID.value == "SaveFrequency"
  ) {
    updatingMsg.value = "";
    successMsg.value = "";
    errorMsg.value = "The server ID is unavailable!";
    return;
  }

  const input = prompt("[ Adding Server ]\nEnter Private Key to Continue:");
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "Adding " + serverName.value + " to the server";

    const data = {
      Name: serverName.value,
      PingServerURL: serverPingIP.value,
      Public: isPublic.value,
      ServerIP: serverIP.value,
      Status: isOnlineStatus.value,
    };

    try {
      await serverStore.addServer(serverID.value, data);
      await serverStore.getAllServers();
      setTimeout(() => {
        isLoading.value = false;
        updatingMsg.value = "";
        successMsg.value =
          "Success! " + serverName.value + " has been added to the server";
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
const handleDeleteServer = async (serverID) => {
  const input = prompt("[ Deleting Server ]\nEnter Private Key to Continue:");
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "";
    await serverStore.deleteServer(serverID);
    await serverStore.getAllServers();
    isLoading.value = false;
  } else {
    alert("Private Key Mismatch!");
  }
};
const handleChangeServerStatus = async (serverID, status) => {
  const input = prompt(
    "[ Changing Server Status ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "";
    await serverStore.changeServerStatus(serverID, status);
    await serverStore.getAllServers();
    isLoading.value = false;
  } else {
    alert("Private Key Mismatch!");
  }
};
const handleChangeServerAccess = async (serverID, status) => {
  const input = prompt(
    "[ Changing Accessible ]\nEnter Private Key to Continue:"
  );
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    successMsg.value = "";
    errorMsg.value = "";
    updatingMsg.value = "";
    await serverStore.changeServerAccess(serverID, status);
    await serverStore.getAllServers();
    isLoading.value = false;
  } else {
    alert("Private Key Mismatch!");
  }
};
</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Content here -->
    <!-- First Section -->
    <div class="flex">
      <!-- Add Server -->
      <div
        class="p-4 border-2 mr-5 w-fit border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
      >
        <div>
          <form class="max-w-md" @submit.prevent="() => {}">
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_server_id"
                  id="floating_server_id"
                  v-model="serverID"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_server_id"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Server ID</label
                >
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_server_name"
                  id="floating_server_name"
                  v-model="serverName"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_server_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Server Name</label
                >
              </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_server_ip"
                id="floating_server_ip"
                v-model="serverIP"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_server_ip"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Server IP</label
              >
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_server_ping_url"
                id="floating_server_ping_url"
                v-model="serverPingIP"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_server_ping_url"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Server Ping URL</label
              >
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="flex items-center mb-4">
                <input
                  id="checkbox-isPublic"
                  type="checkbox"
                  :value="true"
                  v-model="isPublic"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="checkbox-isPublic"
                  class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                  >Is Public?</label
                >
              </div>

              <div class="flex items-center mb-4">
                <input
                  id="checkbox-isOnlineStatus"
                  type="checkbox"
                  :value="true"
                  v-model="isOnlineStatus"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="checkbox-isOnlineStatus"
                  class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                  >Is Online Status?</label
                >
              </div>
            </div>
            <StatusHandling
              :successMsg="successMsg"
              :dangerMsg="errorMsg"
              :warningMsg="updatingMsg"
              :isHide="false"
            />

            <button
              type="button"
              :disabled="isLoading"
              @click="handleAddServer"
              class="text-white min-w-36 bg-sky-700 hover:bg-sky-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <div v-if="!isLoading">Add Server</div>
              <LoadingIcon v-if="isLoading" />
            </button>
          </form>
        </div>
      </div>

      <!-- Change Servers Settings -->
      <div
        class="p-4 border-2 w-fit border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
      >
        <label class="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            :value="true"
            class="sr-only peer"
            v-model="isBlockMultipleLogin"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span
            class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Block Multiple Login</span
          >
        </label>
        <div class="mb-5">
          <label
            for="maxChannelPerServer"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Max Channel Per Server</label
          >
          <input
            type="number"
            id="maxChannelPerServer"
            v-model="maxChannelPerServer"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="maxPlayerPerChannel"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Max Player Per Channel</label
          >
          <input
            type="number"
            id="maxPlayerPerChannel"
            v-model="maxPlayerPerChannel"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="saveFrequency"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Save Frequency</label
          >
          <input
            type="number"
            id="saveFrequency"
            v-model="SaveFrequency"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          :disabled="isLoading"
          @click="handleUpdateServerData"
          class="text-white min-w-36 bg-sky-700 hover:bg-sky-800 w-full ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <div v-if="!isLoading">Update</div>
          <LoadingIcon v-if="isLoading" />
        </button>
      </div>
    </div>

    <!-- Server List -->
    <div
      v-if="true"
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5"
    >
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <div v-for="(server, index) in serverStore.servers" :key="index">
          <ServerList
            :serverName="server.Name"
            :serverID="server.id"
            :serverIP="server.ServerIP"
            :serverPingURL="server.PingServerURL"
            :publicAccess="server.Public"
            :serverStatus="server.Status"
            :isLoading="isLoading"
            @confirmDelete="() => handleDeleteServer(server.id)"
            @setPrivate="() => handleChangeServerAccess(server.id, false)"
            @setPublic="() => handleChangeServerAccess(server.id, true)"
            @launchServer="() => handleChangeServerStatus(server.id, true)"
            @terminateServer="() => handleChangeServerStatus(server.id, false)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
