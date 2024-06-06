<script setup>
import { useRouter } from "vue-router";
import { useUtilityStore } from "../../stores/utilityStore";
import { onMounted, ref } from "vue";
import { useAudioStore } from "../../stores/audio";
import audioFile from "../../sound/IntroMusic.mp3";

const router = useRouter();
const utilityStore = useUtilityStore();

// ใช้ Pinia store
const audioStore = useAudioStore();
const isInitialized = ref(false);
const isAudioOn = ref(false);

// ฟังก์ชันเพื่อเริ่มการเล่นเสียงหลังจากผู้ใช้โต้ตอบ
const initAudio = () => {
  if (!isInitialized.value) {
    audioStore.loadAudio(audioFile);
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
    isAudioOn.value = true;
  }
};

const pauseAudio = () => {
  audioStore.pauseAudio();
  isAudioOn.value = false;
};

const toggleAudio = () => {
  if (isAudioOn.value) {
    pauseAudio();
  } else {
    playAudio();
  }
};
</script>

<template>
  <!-- Mobile Navbar -->
  <nav class="fixed lg:hidden w-full z-20 bottom-0 mb-16 md:mb-16">
    <div class="w-full flex justify-center items-center">
      <!-- Image -->
      <div class="absolute z-0 px-5 max-w-[500px]">
        <img src="../../image/elements/navbar_background.png" alt="" class="" />
      </div>

      <!-- Nav Links -->
      <div class="items-center flex justify-center w-full static z-10">
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
        <div
          @click="utilityStore.SmoothChangeContent(router, 'News')"
          class="mobile-navbar-button"
        >
          <img
            src="../../image/icons/T_Coins.png"
            alt=""
            class="w-10 h-10 opacity-80"
          />
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
          @click="utilityStore.SmoothChangeContent(router, 'Ranking')"
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
  <nav class="fixed w-full z-20 top-0 start-0">
    <!-- Navbar -->
    <div class="w-full flex flex-col lg:flex-row justify-between items-center">
      <!-- Empty Div -->
      <div
        :class="
          isAudioOn
            ? 'w-full hidden lg:flex lg:w-4/12 animate-pulse opacity-90'
            : 'w-full hidden lg:flex lg:w-4/12 opacity-50'
        "
      >
        <div
          class="hover:cursor-pointer w-20 ml-20 ring rounded-3xl p-1 ring-slate-100 ring-opacity-30 shadow-2xl"
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

      <!-- Nav Links -->
      <div class="w-full hidden lg:flex justify-center items-center m-20">
        <!-- Navlink Background Image -->
        <div class="absolute z-0 w-fit lg:w-6/12 max-w-[800px]">
          <img
            src="../../image/elements/navbar_background.png"
            alt=""
            class="h-24 w-full"
          />
        </div>
        <div class="items-center flex justify-center w-full static z-10">
          <div class="navbar-vertical-left"></div>
          <div
            @click="utilityStore.SmoothChangeContent(router, 'Home')"
            class="navbar-button"
          >
            Home
          </div>
          <div class="navbar-vertical-right"></div>
          <div class="navbar-vertical-left"></div>
          <div
            @click="utilityStore.SmoothChangeContent(router, 'News')"
            class="navbar-button"
          >
            Playtest
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
            @click="utilityStore.SmoothChangeContent(router, 'Ranking')"
            class="navbar-button"
          >
            Ranking
          </div>
        </div>
      </div>

      <!-- Images -->
      <div
        class="static w-8/12 sm:w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-3 md:mt-10 flex justify-center"
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
              class="hover:cursor-pointer w-12 ring rounded-3xl p-1 ring-slate-100 ring-opacity-30 shadow-2xl"
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
