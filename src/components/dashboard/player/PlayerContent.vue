<script setup>
import { usePlayerStore } from "../../../stores/player";
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";

const playerStore = usePlayerStore();

const UIDSearchQuery = ref("");
const playerNameSearchQuery = ref("");
const emailSearchQuery = ref("");

onMounted(async () => {
  await playerStore.getAllPlayers(100);
  initFlowbite();
});

const formatTimestamp = (timestamp) => {
  const date = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
  );
  const dateString = date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeString = date?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `${dateString} ${timeString}`;
};

const handleSearchByUID = async () => {
  if (UIDSearchQuery.value == "") {
    await playerStore.getAllPlayers();
  } else {
    await playerStore.searchPlayers("UID", UIDSearchQuery.value);
  }
};
const handleSearchByPlayerName = async () => {
  if (playerNameSearchQuery.value == "") {
    await playerStore.getAllPlayers();
  } else {
    await playerStore.searchPlayers("PlayerName", playerNameSearchQuery.value);
  }
};
const handleSearchByEmail = async () => {
  if (emailSearchQuery.value == "") {
    await playerStore.getAllPlayers();
  } else {
    await playerStore.searchPlayers("Email", emailSearchQuery.value);
  }
};
</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Content here -->
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="relative overflow-x-auto sm:rounded-lg">
        <!-- Search -->
        <div class="flex space-x-2">
          <!-- Search By UID -->
          <div
            class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          >
            <label for="table-search-uid" class="sr-only">Search</label>
            <div class="relative">
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
                id="table-search-uid"
                @keyup.enter="handleSearchByUID"
                v-model="UIDSearchQuery"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by UID"
              />
            </div>
          </div>
          <!-- Search By Player Name -->
          <div
            class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          >
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
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
                id="table-search-users"
                @keyup.enter="handleSearchByPlayerName"
                v-model="playerNameSearchQuery"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Player Name"
              />
            </div>
          </div>
          <!-- Search By Email -->
          <div
            class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          >
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
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
                id="table-search-users"
                @keyup.enter="handleSearchByEmail"
                v-model="emailSearchQuery"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Email"
              />
            </div>
          </div>
        </div>
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">uid</th>
              <th scope="col" class="px-6 py-3">Level</th>
              <th scope="col" class="px-6 py-3">Last Sign In</th>
              <th scope="col" class="px-6 py-3">Online Status</th>
              <th scope="col" class="px-6 py-3">Ban Status</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, index) in playerStore.players"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <!-- Name And Email -->
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jese image"
                />
                <div class="ps-3">
                  <div class="text-base font-semibold">
                    {{ player.PlayerName ? player.PlayerName : "Anonymous" }}
                  </div>
                  <div class="font-normal text-gray-500">
                    {{ player.Email ? player.Email : "anonymous" }}
                  </div>
                </div>
              </th>
              <td class="px-6 py-4">{{ player.UID }}</td>
              <td class="px-6 py-4">LV. {{ player.PlayerLevel }}</td>
              <td class="px-6 py-4">
                {{ formatTimestamp(player.LastSignIn) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    :class="{
                      'h-2.5 w-2.5 rounded-full bg-green-500 me-2':
                        player.OnlineStatus,
                      'h-2.5 w-2.5 rounded-full bg-red-500 me-2':
                        !player.OnlineStatus,
                    }"
                  ></div>
                  {{ player.OnlineStatus ? "Online" : "Offline" }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    :class="{
                      'h-2.5 w-2.5 rounded-full bg-red-500 me-2':
                        player.BanStatus,
                      'h-2.5 w-2.5 rounded-full bg-yellow-500 me-2':
                        !player.BanStatus,
                    }"
                  ></div>
                  {{ player.BanStatus ? "Banned" : "Normal" }}
                </div>
              </td>
              <td class="px-6 py-4">
                <router-link
                  :to="'player/' + player.UID"
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit user</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
