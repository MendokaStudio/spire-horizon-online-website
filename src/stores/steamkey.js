import { defineStore } from "pinia";
import axios from "axios";
import { TimestampNow } from "@/script/utilityFunction";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useSteamKeyStore = defineStore("steamkey", {
  state: () => ({
    remainKey: 0,
    isLoading: false,
    error: null,
    success: null,
  }),
  actions: {
    // Helper function to handle loading and errors
    async handleRequest(requestFn) {
      this.isLoading = true;
      this.error = null;
      this.success = null;
      try {
        const response = await requestFn();
        this.isLoading = false;
        this.success = response.data.message;
        return response.data;
      } catch (error) {
        this.error = error.response.data.message;
        this.isLoading = false;
        this.success = null;
        throw error;
      }
    },

    async getSteamKeyRemain() {
      const requestFn = () => axios.get(`${API_BASE_URL}/api/steam/remain`);
      const data = await this.handleRequest(requestFn);
      this.remainKey = data.Remain;
    },

    // Get steamkey
    async getSteamkey(email) {
      const lastSteamKeyClaimTime = localStorage.getItem(
        "lastSteamKeyClaimTime"
      );
      // console.log(TimestampNow() - lastSteamKeyClaimTime);

      if (TimestampNow() - lastSteamKeyClaimTime > 86400) {
        const requestFn = () =>
          axios.post(
            `${API_BASE_URL}/api/steam/getkey`,
            { email },
            { withCredentials: true }
          );
        const data = await this.handleRequest(requestFn);
        localStorage.setItem("lastSteamKeyClaimTime", TimestampNow());
        this.remainKey -= 1;
        return data;
      } else {
        this.success = null;
        this.error = "You can receive it only once a day.";
      }
    },
  },
});
