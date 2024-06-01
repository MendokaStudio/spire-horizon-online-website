<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import { useSteamKeyStore } from "../../stores/steamkey";
import { useRouter } from "vue-router";

const utilityStore = useUtilityStore();
const steamKeyStore = useSteamKeyStore();
const router = useRouter();

const email = ref("");

const handleGetSteamKey = async () => {
  await steamKeyStore.getSteamkey(email.value);
  email.value = "";
};

onMounted(async () => {
  utilityStore.ContentReveal();
  await steamKeyStore.getSteamKeyRemain();
});
</script>

<template>
  <div
    class="w-screen h-screen lg:pt-[5%] md:pt-[10%] sm:pt-[8%] bg-black bg-opacity-80"
  >
    <div class="w-full h-full flex items-center justify-center relative px-2">
      <div
        class="lg:w-[600px] lg:h-[600px] w-[500px] h-[470px] bg-[url('../image/elements/modal_background.png')] bg-[length:100%_100%]"
      >
        <div
          class="flex justify-center items-center mt-6 md:mt-7 lg:mt-8 flex-col space-y-6 w-fit mx-auto p-2 rounded-xl shadow-xl"
        >
          <div class="lg:text-2xl text-lg px-6 py-2 flex">
            Playtest Remaining Keys:
            <div class="ml-2 text-yellow-300 font-bold">
              {{ steamKeyStore.remainKey }}
            </div>
          </div>

          <form
            @submit.prevent="handleGetSteamKey()"
            class="flex flex-col justify-center items-center border p-5 rounded-2xl shadow-2xl border-yellow-300 border-opacity-60"
          >
            <div>
              <label
                v-if="steamKeyStore.success"
                for="base-input"
                class="block mb-2 text-sm font-medium text-green-500"
                >{{ steamKeyStore.success }}</label
              >
              <label
                v-if="steamKeyStore.error"
                for="base-input"
                class="block mb-2 text-sm font-medium text-red-500"
                >{{ steamKeyStore.error }}</label
              >
              <label
                v-if="!steamKeyStore.error && !steamKeyStore.success"
                for="base-input"
                class="block mb-2 text-sm font-medium text-white"
                >Enter your email to receive a Steam key.</label
              >
            </div>
            <input
              type="email"
              v-model="email"
              required
              id="base-input"
              :disabled="steamKeyStore.remainKey == 0"
              class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="
                steamKeyStore.remainKey == 0
                  ? 'There are no stream keys left.'
                  : 'Email Address'
              "
            />
            <div v-if="errMsg" class="mx-auto w-fit mt-2 text-red-600">
              {{ errMsg }}
            </div>
            <button
              type="submit"
              :disabled="steamKeyStore.remainKey == 0"
              class="text-white w-60 h-16 disabled:bg-[url('../image/elements/button_background.png')] disabled:opacity-50 bg-[url('../image/elements/button_background.png')] hover:bg-[url('../image/elements/button_hover_background.png')] bg-[length:100%_100%]"
            >
              <div v-if="!steamKeyStore.isLoading">Submit</div>
              <div v-if="steamKeyStore.isLoading">Loading</div>
            </button>
            <div class="text-xs max-w-72 text-center pt-2">
              Please read and agree to the
              <a
                href="https://www.mendoka.com/privacy-policy"
                target="_blank"
                class="text-yellow-300 hover:cursor-pointer"
                >Privacy Policy</a
              >
              and
              <a
                href="https://www.mendoka.com/terms-of-service"
                target="_blank"
                class="text-yellow-300 hover:cursor-pointer"
                >Terms of Service</a
              >
              before subscribe.
            </div>
          </form>

          <div class="max-w-96 text-center px-8 text-xs lg:text-lg">
            After the playtest concludes, all keys, including old and new ones,
            will be revoked.
          </div>
          <div
            class="max-w-[600px] text-center text:sm lg:text-xl px-8 text-yellow-300"
          >
            The playtest will end on June 18, 2024.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
