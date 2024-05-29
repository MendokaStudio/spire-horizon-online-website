import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useSteamKeyStore = defineStore("steamkey", {
  state: () => ({
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
        this.error = error.response ? error.response.data : error.message;
        this.isLoading = false;
        this.success = null;
        throw error;
      }
    },

    // Get steamkey
    async getSteamkey(email) {
      // localStorage.setItem('lastRecievedTime', 'abc');
      console.log(localStorage.getItem('lastRecievedTime'));

    //   const requestFn = () =>
    //     axios.post(
    //       `${API_BASE_URL}/api/steam/getkey`,
    //       { email },
    //       { withCredentials: true }
    //     );
    //   const data = await this.handleRequest(requestFn);
    //   return data;
    },
  },
});
