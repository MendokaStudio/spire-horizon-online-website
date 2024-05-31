// src/stores/styleState.js
import { defineStore } from "pinia";

export const useUtilityStore = defineStore("utilityStore", {
  state: () => ({
    intervalState: 1,
    isAvailableState: true,
    contentOpacityState: 100,
    isShowCopyright: false,
  }),
  getters: {
    contentOpacity: (state) => state.contentOpacityState / 100,
  },
  actions: {
    SmoothChangeContent(router, pathName) {
      if (this.isAvailableState) {
        this.isAvailableState = false;
        const fadeoutInterval = setInterval(() => {
          if (this.contentOpacityState > 0) {
            this.contentOpacityState -= 3;
          } else {
            clearInterval(fadeoutInterval);
            this.isAvailableState = true;
            this.ContentReveal();
            router.push({ name: pathName });
            if (pathName == "Home") {
              console.log("set show");
              this.isShowCopyright = true;
            } else {
              this.isShowCopyright = false;
            }
          }
        }, this.intervalState);
      }
    },
    ContentReveal() {
      if (this.isAvailableState) {
        this.isAvailableState = false;
        this.contentOpacityState = 0;

        const fadeIntInterval = setInterval(() => {
          if (this.contentOpacityState < 100) {
            if (this.contentOpacityState < 100) {
              this.contentOpacityState += 3;
            }
          } else {
            clearInterval(fadeIntInterval);
            this.isAvailableState = true;
          }
        }, this.intervalState);
      }
    },
  },
});
