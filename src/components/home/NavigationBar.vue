<script setup>
import { useRouter } from "vue-router";
import { useUtilityStore } from "../../stores/utilityStore";

const router = useRouter();
const utilityStore = useUtilityStore();
</script>

<template>
  <!-- Mobile Navbar -->
  <nav class="fixed lg:hidden w-full z-20 bottom-0 mb-12 md:mb-16">
    <div class="w-full flex justify-center items-center">
      <!-- Image -->
      <div class="absolute z-0 px-5 max-w-[500px]">
        <img src="../../image/elements/navbar_background.png" alt="" class="" />
      </div>

      <!-- Nav Links -->
      <div class="items-center flex justify-center w-full static z-10">
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'homeContent')"
          class="mobile-navbar-button"
        >
          Home
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'preregister')"
          class="mobile-navbar-button"
        >
          Icon1
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'classes')"
          class="mobile-navbar-button"
        >
          Icon2
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'cards')"
          class="mobile-navbar-button"
        >
          Icon3
        </div>
        <div class="mobile-navbar-vertical-right"></div>
        <div class="mobile-navbar-vertical-left"></div>
        <div
          @click="utilityStore.SmoothChangeContent(router, 'ranking')"
          class="mobile-navbar-button"
        >
          Icon4
        </div>
      </div>
    </div>
  </nav>

  <!-- PC Navbar -->
  <nav class="fixed w-full z-20 top-0 start-0">
    <!-- Navbar -->
    <div class="w-full flex flex-col lg:flex-row justify-between items-center">
      <!-- Empty Div -->
      <div class="w-full hidden lg:flex lg:w-4/12"></div>

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
        class="static w-8/12 sm:w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mt-10 flex justify-center"
      >
        <img
          src="../../image/logos/logo_glow.png"
          alt=""
          class="w-full 2xl:w-8/12 2xl:mr-36 xl:mr-20 md:mb-10"
        />
      </div>
    </div>
  </nav>
</template>
