import { defineStore } from "pinia";
import axios from "axios";

export const useIpAddressStore = defineStore("ip-address", {
  state: () => ({
    myIP: "",
    isLoading: false,
    error: null,
  }),
  actions: {
    // Helper function to handle loading and errors
    async handleRequest(requestFn) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await requestFn();
        this.isLoading = false;
        return response.data;
      } catch (error) {
        this.error = error.response ? error.response.data : error.message;
        this.isLoading = false;
        throw error;
      }
    },

    // Get Ip Address
    async getMyIp() {
      const requestFn = () => axios.get(`https://api.ipify.org/?format=json`);
      const data = await this.handleRequest(requestFn);
      this.myIP = data.ip;
      return data;
    },
  },
});
