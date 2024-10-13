<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import { useAudioStore } from "../../stores/audio";

const utilityStore = useUtilityStore();

const audioStore = useAudioStore();
const isShowTrailer = ref(false);
const isCopying = ref(false);
const copyOpacity = ref(0);

onMounted(() => {
  utilityStore.ContentReveal();
  utilityStore.isShowCopyright = true;
});

const CopyUrl = () => {
  navigator.clipboard
    .writeText("https://sho.mendoka.com/")
    .then(function () {
      isCopying.value = true;
      const copyFadeIn = setInterval(() => {
        if (copyOpacity.value < 100) {
          copyOpacity.value += 10;
        } else {
          clearInterval(copyFadeIn);
          setTimeout(() => {
            const copyFadeOut = setInterval(() => {
              if (copyOpacity.value > 0) {
                copyOpacity.value -= 10;
              } else {
                clearInterval(copyFadeOut);
                isCopying.value = false;
              }
            }, 100);
          }, 1500);
        }
      }, 10);
    })
    .catch(function (error) {
      console.error("Error copying text: ", error);
    });
};

const openUrl = (url) => {
  window.open(url, "_blank");
};

const ToggleTrailer = () => {
  isShowTrailer.value = !isShowTrailer.value;

  if (isShowTrailer.value) {
    audioStore.pauseAudio();
  } else {
    audioStore.playAudio();
  }
};
</script>

<template>
  <div class="relative w-screen h-screen">
    <div class="flex h-full">
      <!-- Video Trailer -->
      <div
        v-if="isShowTrailer"
        @click="ToggleTrailer()"
        class="absolute z-20 w-full h-full bg-black bg-opacity-50"
      >
        <div class="flex items-center justify-center w-full h-full mx-auto">
          <div
            class="border-2 p-2 bg-gray-500 bg-opacity-30 border-gray-500 border-opacity-50 rounded-3xl shadow-2xl sm:mx-10 mx-5 2xl:w-[928px] 2xl:h-[530px] xl:w-[800px] xl:h-[460px] lg:w-[695px] lg:h-[400px] md:w-[570px] md:h-[330px] sm:w-[460px] sm:h-[270px] w-[370px] h-[215px]"
          >
            <iframe
              class="object-contain w-full h-full rounded-3xl"
              src="https://www.youtube.com/embed/POEOPQ56UKI"
              title="Spire Horizon Online - Official Cinematic Trailer"
              frameborder="0"
              allow="accelerometer; autoplay;  encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <!-- Middle Content -->
      <div
        class="flex flex-col items-center justify-between mx-auto my-auto space-y-10 h-fit pb-36 w-fit"
      >
        <!-- Play Icon -->
        <svg
          @click="ToggleTrailer()"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="transition-all duration-500 ease-in-out size-20 opacity-30 hover:opacity-80 hover:cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-0 left-0 w-full mb-40 lg:mb-0 md:mb-40">
      <div
        class="flex flex-col items-end justify-between w-full p-0 space-y-2 lg:flex-col xl:flex-row lg:p-10 lg:space-y-3 xl:space-y-0"
      >
        <div class="mx-auto lg:w-fit xl:w-fit xl:mx-0 opacity-90">
          <div
            class="flex items-center justify-center lg:space-x-5 2xl:space-x-8 xl:space-x-6 xl:ml-20"
          >
            <button class="relative" @click="CopyUrl()">
              <img
                src="../../image/socials/share.png"
                alt="X"
                class="scale-90 social-icon opacity-90"
              />
              <div
                id="copyUrl"
                v-if="isCopying"
                class="absolute transition-opacity duration-300 ease-in-out opacity-0 -top-10 -left-5 w-96 h-96 tooltip"
                :style="{ opacity: copyOpacity / 100 }"
              >
                <div
                  class="px-4 py-1 bg-gray-900 bg-opacity-90 w-fit rounded-xl"
                >
                  Copied
                </div>
              </div>
            </button>
            <a href="https://x.com/mendokasan" target="_blank">
              <img
                src="../../image/socials/twitter.png"
                alt="X"
                class="scale-90 social-icon"
              />
            </a>
            <a
              href="https://www.facebook.com/people/Mendoka/100088861612335/"
              target="_blank"
            >
              <img
                src="../../image/socials/facebook.png"
                alt="Facebook"
                class="scale-90 social-icon"
            /></a>
            <a href="https://www.youtube.com/@mendokasan" target="_blank">
              <img
                src="../../image/socials/youtube.png"
                alt="Youtube"
                class="social-icon"
            /></a>
            <a href="https://discord.gg/AmFFEHyHWq" target="_blank">
              <img
                src="../../image/socials/discord.png"
                alt="Discord"
                class="social-icon"
            /></a>
            <a href="https://www.reddit.com/r/Mendoka/" target="_blank">
              <img
                src="../../image/socials/reddit.png"
                alt="Reddit"
                class="pb-2 scale-105 social-icon"
            /></a>
            <a href="https://www.instagram.com/mendokasan/" target="_blank"
              ><img
                src="../../image/socials/instagram.png"
                alt="Instagram"
                class="social-icon"
            /></a>
            <a href="https://www.tiktok.com/@mendokasan" target="_blank"
              ><img
                src="../../image/socials/tiktok.png"
                alt="Tiktok"
                class="social-icon"
            /></a>
          </div>
        </div>
        <!-- Stores -->
        <div
          class="flex flex-col p-3 mx-auto mb-10 space-y-3 w-fit xl:mx-0 2xl:mr-32 xl:mr-0 bg-slate-300 bg-opacity-30 rounded-xl"
        >
          <!-- <div class="items-center justify-center hidden md:flex mr0 md:mr-3">
            <div class="w-fit">
              <img
                src="../../image/socials/qrcode.png"
                alt=""
                class="store-qr--button opacity-95"
              />
            </div>
          </div> -->
          <button
            type="button"
            @click="
              openUrl(
                'https://store.steampowered.com/app/2598020/Spire_Horizon_Online/'
              )
            "
            class="store-button disabled:opacity-30 opacity-95"
          >
            <img src="../../image/socials/windows.png" alt="" class="w-full" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
