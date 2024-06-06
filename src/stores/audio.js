// stores/audioStore.js

import { defineStore } from "pinia";
import { ref, onUnmounted } from "vue";

export const useAudioStore = defineStore("audio", () => {
  const audio = ref(null);
  const isPlaying = ref(false);

  // โหลดไฟล์เสียงเมื่อ store ถูกสร้าง
  const loadAudio = (src) => {
    if (audio.value) {
      audio.value.pause();
    }
    audio.value = new Audio(src);
    audio.value.addEventListener("ended", () => {
      isPlaying.value = false;
    });
  };

  const playAudio = () => {
    if (audio.value) {
      audio.value.play();
      isPlaying.value = true;
    }
  };

  const pauseAudio = () => {
    if (audio.value) {
      audio.value.pause();
      isPlaying.value = false;
    }
  };

  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause();
      audio.value = null;
    }
  });

  return { audio, isPlaying, loadAudio, playAudio, pauseAudio };
});
