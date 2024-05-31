<script setup>
import { ref, onMounted } from "vue";
import { useUtilityStore } from "../../stores/utilityStore";
import { useRouter } from "vue-router";

const router = useRouter();
const utilityStore = useUtilityStore();

const errMsg = ref("");

const openInNewTab = (path) => {
  const routeData = router.resolve({ path: path });
  window.open(routeData.href, "_blank");
};

onMounted(() => {
  utilityStore.ContentReveal();
});
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center lg:pt-[5%] md:pt-[10%] sm:pt-[8%] bg-black bg-opacity-80"
  >
    <div
      class="relative w-11/12 h-3/6 lg:w-11/12 lg:h-4/6 2xl:w-8/12 2xl:h-3/4 bg-[url('../image/elements/modal_empty_background.png')] bg-[length:100%_100%]"
    >
      <!-- Content -->
      <div
        class="flex justify-center items-center w-full h-full text-2xl md:text-4xl"
      >
        <div
          class="lg:w-7/12 w-11/12 mx-auto flex flex-col justify-center items-center space-y-4 lg:space-y-10 md:space-y-6 text-center"
        >
          <div>
            <img
              src="../../image/logos/mendoka_logo.png"
              alt=""
              class="w-6/12 mx-auto"
            />
          </div>
          <p class="text-sm lg:text-lg">&copy; 2024 Mendoka. All rights reserved.</p>
          <p class="text-sm lg:text-lg">
            Contact: contact@mendoka.com丨
            <a
              @click="openInNewTab('/privacy_policy')"
              class="text-yellow-300 hover:cursor-pointer"
              >Privacy Policy</a
            >丨
            <a
              @click="openInNewTab('/terms_of_service')"
              class="text-yellow-300 hover:cursor-pointer"
              >Terms of Service</a
            >
          </p>
          <p class="text-sm lg:text-lg">
            Epic, Epic Games, Epic Games Store, the Epic Games Store logo, and
            Epic Online Services are trademarks and/or registered trademarks of
            Epic Games. All other trademarks are the property of their
            respective owners.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
