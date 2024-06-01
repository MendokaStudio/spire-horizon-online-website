<script setup>
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { useRoute } from "vue-router";

import { usePlayerStore } from "@/stores/player";
import { useStatisticStore } from "@/stores/statistic";
import { useCurrencyStore } from "@/stores/currency";
import { useInventoryStore } from "@/stores/inventory";

import LoadingIcon from "../../utility/LoadingIcon.vue";
import CurrencyButton from "./CurrencyButton.vue";
import InventorySwitcher from "../items/InventorySwitcher.vue";
import router from "@/router";

const route = useRoute();

const playerStore = usePlayerStore();
const statisticStore = useStatisticStore();
const currencyStore = useCurrencyStore();
const inventoryStore = useInventoryStore();

const pressTimer = ref(null);
const pressDuration = ref(3000);
const progress = ref(0);
const interval = ref(null);

const isLoading = ref(false);
const banReason = ref("");

const ishideInventorySwitcherForRefresh = ref(false);

onMounted(async () => {
  initFlowbite();

  await playerStore.getPlayer(route.params.uid);
  await statisticStore.getStatistic(route.params.uid);
  await currencyStore.getCurrencies(route.params.uid);
  await inventoryStore.getPlayerInventory(route.params.uid);
  await inventoryStore.getPlayerEquipment(route.params.uid);
  await inventoryStore.getPlayerBank(route.params.uid);
});

const RefreshPlayerInventory = async () => {
  await inventoryStore.getPlayerInventory(route.params.uid);
  await inventoryStore.getPlayerEquipment(route.params.uid);
  await inventoryStore.getPlayerBank(route.params.uid);
  ishideInventorySwitcherForRefresh.value = true;
  setTimeout(() => {
    ishideInventorySwitcherForRefresh.value = false;
  }, 10);
};

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

const handleUpdateCurrency = async (data) => {
  const input = prompt("[ Update Currency ]\nEnter Private Key to Continue:");
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    await currencyStore.updateCurrency(
      playerStore.player.UID,
      data.currency,
      data.amount
    );
    await currencyStore.getCurrencies(route.params.uid);
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  } else {
    alert("Private Key Mismatch!");
  }
};

const handleBanPlayer = async (isBan) => {
  const input = prompt("[ Player Ban ]\nEnter Private Key to Continue:");
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    //Continue Function Here
    isLoading.value = true;
    await playerStore.updatePlayerInfo(playerStore.player.UID, {
      BanStatus: isBan,
      BanReason: isBan
        ? banReason.value == ""
          ? "Abnormal gameplay detected"
          : banReason.value
        : playerStore.player.BanReason,
    });
    await playerStore.getPlayer(route.params.uid);
    setTimeout(() => {
      isLoading.value = false;
      banReason.value = "";
      initFlowbite();
    }, 1000);
  } else {
    alert("Private Key Mismatch!");
  }
};

// Hold Press Function
const startPress = () => {
  resetProgress();
  interval.value = setInterval(() => {
    progress.value += 100 / (pressDuration.value / 10);
  }, 10);
  pressTimer.value = setTimeout(() => {
    handleDeletePlayerData();
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

const handleDeletePlayerData = async () => {
  const input = prompt("[ Delete Player ]\nEnter Private Key to Continue:");
  if (input === import.meta.env.VITE_APP_PRIVATE_KEY) {
    isLoading.value = true;
    await playerStore.deletePlayerData(playerStore.player.UID);
    isLoading.value = false;
    router.push("/dashboard/players");
  } else {
    alert("Private Key Mismatch!");
  }
};
</script>

<template>
  <div
    v-if="
      !playerStore.player &&
      !statisticStore.statistic &&
      !currencyStore.currencies &&
      !inventoryStore.inventory &&
      !inventoryStore.equipment &&
      !inventoryStore.bank
    "
    class="p-4 sm:ml-64"
  >
    <!-- Content here -->
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div
        class="flex w-full items-center justify-center p-6 mt-3 bg-white border-2 border-dashed border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        LOADING
      </div>
    </div>
  </div>

  <div
    v-if="
      playerStore.player &&
      statisticStore.statistic &&
      currencyStore.currencies &&
      inventoryStore.inventory &&
      inventoryStore.equipment &&
      inventoryStore.bank
    "
    class="p-4 sm:ml-64"
  >
    <!-- Content here -->
    <div class="p-4 border-gray-200 dark:border-gray-700 mt-14 w-full sm:w-fit">
      <!-- Player Info -->
      <div class="flex lg:space-x-3 space-x-0 flex-col lg:flex-row">
        <!-- Info -->
        <div
          class="w-full mb-5 sm:mb-0 flex justify-center items-center border-2 border-dashed border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex flex-col items-center pb-8 px-4 pt-8">
            <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://images.unsplash.com/photo-1459245330819-1b6d75fbaa35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bonnie image"
            />
            <h5
              class="mb-1 text-xl flex justify-center items-center space-x-1 font-medium text-gray-900 dark:text-white"
            >
              <div>
                {{
                  playerStore.player.PlayerName
                    ? playerStore.player.PlayerName
                    : "Anonymous"
                }}
              </div>
              <div class="">
                <div
                  :class="{
                    'h-3 w-3 rounded-full bg-green-500':
                      playerStore.player.OnlineStatus,
                    'h-3 w-3 rounded-full bg-red-500 ':
                      !playerStore.player.OnlineStatus,
                  }"
                ></div>
              </div>
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400 flex"
              ><div class="font-bold mr-2">UID:</div>
              {{ playerStore.player.UID }}</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400 flex"
              ><div class="font-bold mr-2">Email:</div>
              {{
                playerStore.player.Email
                  ? playerStore.player.Email
                  : "anonymous"
              }}</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400 flex"
              ><div class="font-bold mr-2">Last sign in:</div>
              {{ formatTimestamp(playerStore.player.LastSignIn) }}</span
            >
          </div>
        </div>

        <!-- Account Manage -->
        <div
          class="w-full bg-white border-2 border-dashed border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-5 h-full flex items-center justify-center">
            <!-- Ban Status -->
            <div
              class="flex flex-col border-2 rounded-2xl shadow w-full px-10 py-5 justify-center mr-3"
            >
              <div
                class="text-slate-600 font-bold dark:text-white text-xl pb-3 text-center"
              >
                Account Status
              </div>
              <!-- Account Status Content -->
              <div class="flex space-x-3 w-full justify-between items-center">
                <div class="flex flex-col">
                  <div
                    class="text-slate-600 p-1 dark:text-white flex font-bold border-2 border-dashed w-full px-8 rounded-lg justify-center mb-3"
                  >
                    Status:
                    <div
                      :class="{
                        'ml-1 text-red-600 font-bold':
                          playerStore.player.BanStatus,
                        'ml-1 text-green-600 font-bold':
                          !playerStore.player.BanStatus,
                      }"
                    >
                      {{ playerStore.player.BanStatus ? "Banned" : "Normal" }}
                    </div>
                  </div>
                  <div
                    class="text-slate-600 p-1 dark:text-white flex font-bold border-2 border-dashed w-full rounded-lg justify-center mb-3"
                  >
                    P.DMG:
                    <div
                      :class="{
                        'ml-1 text-red-600 font-bold':
                          playerStore.player.BanStatus,
                        'ml-1 text-green-600 font-bold':
                          !playerStore.player.BanStatus,
                      }"
                    >
                      {{ playerStore.player.HighestDamage }}
                    </div>
                  </div>
                </div>
                <div
                  class="text-slate-600 px-5 py-4 h-full dark:text-white w-full flex flex-col border-2 border-dashed rounded-lg mb-3"
                >
                  <div class="font-bold text-center w-full">Ban Reason:</div>
                  <div class="text-center">
                    {{
                      playerStore.player.BanReason
                        ? playerStore.player.BanReason
                        : "Never get ban"
                    }}
                  </div>
                </div>
              </div>
              <div class="flex space-x-3 w-full">
                <button
                  type="button"
                  v-if="!playerStore.player.BanStatus"
                  :disabled="isLoading"
                  data-modal-target="playerBanModal"
                  data-modal-toggle="playerBanModal"
                  class="text-white min-w-3 w-full bg-orange-700 hover:bg-orange-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:orange-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <div v-if="!isLoading">Ban Player</div>
                  <LoadingIcon v-if="isLoading" />
                </button>
                <button
                  type="button"
                  @click="handleBanPlayer(false)"
                  v-if="playerStore.player.BanStatus"
                  :disabled="isLoading"
                  class="text-white min-w-36 w-full bg-green-700 hover:bg-green-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <div v-if="!isLoading">Unban Player</div>
                  <LoadingIcon v-if="isLoading" />
                </button>
                <button
                  type="button"
                  :disabled="isLoading"
                  @mousedown="() => startPress()"
                  @mouseup="endPress"
                  @mouseleave="endPress"
                  class="text-white min-w-36 bg-rose-700 w-full hover:bg-rose-800 ease-in-out disabled:bg-gray-300 disabled:ring-0 duration-500 hover:ring-2 focus:outline-none hover:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <div v-if="!isLoading">Delete All Player Data</div>
                  <LoadingIcon v-if="isLoading" />
                </button>
              </div>

              <!-- Main modal -->
              <div
                v-if="!playerStore.player.BanStatus"
                id="playerBanModal"
                tabindex="-1"
                aria-hidden="true"
                class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div class="relative p-4 w-full max-w-md max-h-full">
                  <!-- Modal content -->
                  <div
                    class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <!-- Modal header -->
                    <div
                      class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                    >
                      <h3
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                      >
                        Player Ban Reason
                      </h3>
                      <button
                        type="button"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="playerBanModal"
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
                    <!-- PlayerBan Modal -->
                    <div class="p-4 md:p-5">
                      <form
                        class="space-y-4"
                        @submit.prevent="() => handleBanPlayer(true)"
                      >
                        <div>
                          <label
                            for="playerBanReason"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Reason</label
                          >
                          <input
                            type="text"
                            v-model="banReason"
                            id="playerBanReason"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Abnormal gameplay detected"
                          />
                        </div>
                        <button
                          type="submit"
                          data-modal-hide="playerBanModal"
                          class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Ban Player {{ playerStore.player.UID }}
                        </button>
                        <div
                          class="text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                          Bans prevent players from entering the game.
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Progressbar -->
              <div
                v-if="progress > 0"
                class="w-full h-2 bg-gray-300 mt-2 rounded-lg"
              >
                <div
                  :class="['h-2 rounded-lg', ' bg-red-600']"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Player Stats -->

      <div
        class="w-full mt-3 sm:mb-0 px-5 py-3 pb-5 border-2 border-dashed border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          class="text-slate-600 font-bold dark:text-white text-xl pb-3 text-center"
        >
          Statistic
        </div>
        <div
          class="w-full mx-auto sm:w-fit grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4"
        >
          <!-- Player Info -->
          <div
            class="border-2 px-5 py-3 justify-center items-center w-full sm:w-fit flex flex-col rounded-xl"
          >
            <div
              class="text-slate-600 font-bold dark:text-white text-md text-center"
            >
              Player Info
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Name:</div>
              <div>
                {{
                  playerStore.player.PlayerName
                    ? playerStore.player.PlayerName
                    : "Anonymous"
                }}
              </div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Level:</div>
              <div>{{ playerStore.player.PlayerLevel }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Player Slayed:</div>
              <div>{{ statisticStore.statistic.PlayerSlayed }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Monster Slayed:</div>
              <div>{{ statisticStore.statistic.MonsterSlayed }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Exp Gain:</div>
              <div>{{ statisticStore.statistic.ExpGain }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Gold Gain:</div>
              <div>{{ statisticStore.statistic.GoldGain }}</div>
            </div>
          </div>

          <!-- Offensive -->
          <div
            class="border-2 px-5 py-3 justify-center items-center w-full sm:w-fit flex flex-col rounded-xl"
          >
            <div
              class="text-slate-600 font-bold dark:text-white text-md text-center"
            >
              Offensive
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Damage:</div>
              <div>{{ statisticStore.statistic.Damage }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Attack Speed:</div>
              <div>{{ statisticStore.statistic.AttackSpeed }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Critical Rate:</div>
              <div>{{ statisticStore.statistic.CriticalRate }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Critical Damage:</div>
              <div>{{ statisticStore.statistic.CriticalDamage }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Skill Recovery:</div>
              <div>{{ statisticStore.statistic.SkillRecovery }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Effectiveness:</div>
              <div>{{ statisticStore.statistic.Effectiveness }}</div>
            </div>
          </div>

          <!-- Defensive -->
          <div
            class="border-2 px-5 py-3 justify-center items-center w-full sm:w-fit flex flex-col rounded-xl"
          >
            <div
              class="text-slate-600 font-bold dark:text-white text-md text-center"
            >
              Offensive
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Health:</div>
              <div>{{ statisticStore.statistic.Health }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Health Regen:</div>
              <div>{{ statisticStore.statistic.HealthRegen }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Defense:</div>
              <div>{{ statisticStore.statistic.Defense }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Block Chance:</div>
              <div>{{ statisticStore.statistic.BlockChance }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Block Severity:</div>
              <div>{{ statisticStore.statistic.BlockSeverity }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Resistance:</div>
              <div>{{ statisticStore.statistic.Resistance }}</div>
            </div>
          </div>

          <!-- Special -->
          <div
            class="border-2 px-5 py-3 justify-center items-center w-full sm:w-fit flex flex-col rounded-xl"
          >
            <div
              class="text-slate-600 font-bold dark:text-white text-md text-center"
            >
              Offensive
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Mana:</div>
              <div>{{ statisticStore.statistic.Mana }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Mana Regen:</div>
              <div>{{ statisticStore.statistic.ManaRegen }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Stamina:</div>
              <div>{{ statisticStore.statistic.Stamina }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Stamina Regen:</div>
              <div>{{ statisticStore.statistic.StaminaRegen }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Mobility:</div>
              <div>{{ statisticStore.statistic.Mobility }}</div>
            </div>
            <div class="flex justify-between w-full space-x-5">
              <div>Flying Speed:</div>
              <div>{{ statisticStore.statistic.FlyingSpeed }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Currencies -->
      <div
        class="flex flex-col w-full items-center justify-center p-6 mt-3 bg-white border-2 border-dashed border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div
          class="text-slate-600 font-bold dark:text-white text-xl pb-3 text-center"
        >
          Currencies
        </div>
        <div
          class="w-full sm:w-fit grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4"
        >
          <CurrencyButton
            currencyID="octagram"
            currencyName="Octagram"
            :amount="currencyStore.currencies.octagram"
            :isLoading="isLoading"
            @confirmUpdateCurrency="handleUpdateCurrency"
          />
          <CurrencyButton
            currencyID="octagram_shard"
            currencyName="Octagram Shard"
            :amount="currencyStore.currencies.octagram_shard"
            :isLoading="isLoading"
            @confirmUpdateCurrency="handleUpdateCurrency"
          />
          <CurrencyButton
            currencyID="gold_coins"
            currencyName="Gold Coins"
            :amount="currencyStore.currencies.gold_coins"
            :isLoading="isLoading"
            @confirmUpdateCurrency="handleUpdateCurrency"
          />
          <CurrencyButton
            currencyID="enhance_stone"
            currencyName="Enhance Stone"
            :amount="currencyStore.currencies.enhance_stone"
            :isLoading="isLoading"
            @confirmUpdateCurrency="handleUpdateCurrency"
          />
          <CurrencyButton
            currencyID="monster_stone"
            currencyName="Monster Stone"
            :amount="currencyStore.currencies.monster_stone"
            :isLoading="isLoading"
            @confirmUpdateCurrency="handleUpdateCurrency"
          />
        </div>
      </div>

      <!-- Inventory -->
      <div
        class="flex flex-col w-full items-center justify-center p-6 mt-3 bg-white border-2 border-dashed border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <InventorySwitcher
          v-if="!ishideInventorySwitcherForRefresh"
          :playerInventory="inventoryStore.inventory"
          :playerEquipment="inventoryStore.equipment"
          :playerBank="inventoryStore.bank"
          :uid="playerStore.player.UID"
          @callRefreshPlayerData="RefreshPlayerInventory"
        />
      </div>
    </div>
  </div>
</template>
