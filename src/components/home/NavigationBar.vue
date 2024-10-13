<script setup>
import { useRouter } from "vue-router";
import { useUtilityStore } from "../../stores/utilityStore";
import { onMounted, ref } from "vue";
import { useAudioStore } from "../../stores/audio";

const router = useRouter();
const utilityStore = useUtilityStore();

// ใช้ Pinia store
const audioStore = useAudioStore();
const isInitialized = ref(false);
const isAudioOn = ref(false);

// ฟังก์ชันเพื่อเริ่มการเล่นเสียงหลังจากผู้ใช้โต้ตอบ
const initAudio = () => {
  if (!isInitialized.value) {
    audioStore.loadAudio();
    audioStore.playAudio();
    isAudioOn.value = true;
    isInitialized.value = true;
  }
};

// ฟังก์ชันเพื่อจับการโต้ตอบครั้งแรกของผู้ใช้
const handleUserInteraction = () => {
  initAudio();
  document.removeEventListener("click", handleUserInteraction);
};

// เพิ่ม Event Listener เมื่อ component ถูก mount
onMounted(() => {
  document.addEventListener("click", handleUserInteraction, { once: true });
});

const playAudio = () => {
  if (isInitialized.value) {
    audioStore.playAudio();
  }
};

const pauseAudio = () => {
  audioStore.pauseAudio();
};

const toggleAudio = () => {
  if (audioStore.isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
};
</script>

<template>
  <!-- Mobile Navbar -->
  <nav class="fixed bottom-0 z-20 w-full mb-16 lg:hidden md:mb-16">
    <div class="flex items-center justify-center w-full">
      <!-- Image -->
      <div class="absolute z-0 px-5 max-w-[500px]">
        <img src="../../image/elements/navbar_background.png" alt="" class="" />
      </div>

      <!-- Nav Links -->
      <div class="static z-10 flex items-center justify-center w-full">
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'Home')"
          class="mobile-navbar-button"
        >
          <img
            src="../../image/icons/Icon_Home.png"
            alt=""
            class="w-6 h-6 opacity-80"
          />
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div class="mobile-navbar-button">
          <a href="https://ko-fi.com/mendoka/tiers" target="_blank"
            ><img
              src="../../image/icons/T_Coins.png"
              alt=""
              class="w-10 h-10 opacity-80"
          /></a>
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'Classes')"
          class="mobile-navbar-button"
        >
          <img
            src="../../image/icons/F_Gloves-512.png"
            alt=""
            class="w-10 h-10 opacity-80"
          />
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'Cards')"
          class="mobile-navbar-button"
        >
          <img
            src="../../image/icons/C_MonsterCard-512.png"
            alt=""
            class="w-8 h-8 opacity-80"
          />
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'Roadmap')"
          class="mobile-navbar-button"
        >
          <img
            src="../../image/icons/W_Great-Sword-512.png"
            alt=""
            class="w-8 h-8 opacity-80"
          />
        </div>
      </div>
    </div>
  </nav>

  <!-- PC Navbar -->
  <nav class="fixed top-0 z-20 w-full start-0">
    <!-- Navbar -->
    <div class="flex flex-col items-center justify-between w-full lg:flex-row">
      <!-- Empty Div -->
      <div
        :class="
          audioStore.isPlaying
            ? 'w-full hidden lg:flex lg:w-4/12 animate-pulse opacity-90'
            : 'w-full hidden lg:flex lg:w-4/12 opacity-50'
        "
      >
        <div
          class="w-20 p-1 ml-20 shadow-2xl hover:cursor-pointer ring rounded-3xl ring-slate-100 ring-opacity-30"
          @click="toggleAudio()"
        >
          <img
            v-if="audioStore.isPlaying"
            src="../../image/icons/guitar_play.png"
            alt=""
          />
          <img
            v-if="!audioStore.isPlaying"
            src="../../image/icons/guitar_mute.png"
            alt=""
          />
        </div>
      </div>

      <!-- Nav Links -->
      <div class="items-center justify-center hidden w-full m-20 lg:flex">
        <!-- Navlink Background Image -->
        <div class="absolute z-0 w-fit lg:w-6/12 max-w-[800px]">
          <img
            src="../../image/elements/navbar_background.png"
            alt=""
            class="w-full h-24"
          />
        </div>
        <div class="static z-10 flex items-center justify-center w-full">
          <div class="navbar-vertical-left"></div>
          <div
            @click="utilityStore.SmoothChangeContent(router, 'Home')"
            class="navbar-button"
          >
            Home
          </div>
          <div class="navbar-vertical-right"></div>
          <div class="navbar-vertical-left"></div>
          <div class="navbar-button">
            <a href="https://ko-fi.com/mendoka/tiers" target="_blank">Shop</a>
          </div>
          <div class="navbar-vertical-right"></div>
          <div class="navbar-vertical-left"></div>
          <div
            @click="utilityStore.SmoothChangeContent(router, 'Classes')"
            class="navbar-button"
          >
            Classes
          </div>
          <div class="navbar-vertical-right"></div>
          <div class="navbar-vertical-left"></div>
          <div
            @click="utilityStore.SmoothChangeContent(router, 'Cards')"
            class="navbar-button"
          >
            Cards
          </div>
          <div class="navbar-vertical-right"></div>
          <div class="navbar-vertical-left"></div>
          <div
            @click="utilityStore.SmoothChangeContent(router, 'Roadmap')"
            class="navbar-button"
          >
            Roadmap
          </div>
        </div>
      </div>

      <!-- Images -->
      <div
        class="static flex justify-center w-8/12 mt-3 sm:w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 md:mt-10"
      >
        <div class="absolute top-5 left-5">
          <div
            :class="
              isAudioOn
                ? 'w-full lg:hidden  animate-pulse opacity-90 '
                : 'w-full lg:hidden opacity-50'
            "
          >
            <div
              class="w-12 p-1 shadow-2xl hover:cursor-pointer ring rounded-3xl ring-slate-100 ring-opacity-30"
              @click="toggleAudio()"
            >
              <img
                v-if="isAudioOn"
                src="../../image/icons/guitar_play.png"
                alt=""
              />
              <img
                v-if="!isAudioOn"
                src="../../image/icons/guitar_mute.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <img
          src="../../image/logos/logo_glow.png"
          alt=""
          class="w-full 2xl:w-8/12 2xl:mr-36 xl:mr-20 md:mb-10"
        />
      </div>
    </div>
  </nav>
</template>
