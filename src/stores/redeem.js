import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useRedeemStore = defineStore("redeem", {
  state: () => ({
    redeems: null,
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

    // Add a new redeem code
    async addRedeemCode(codeData) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/redeem/add`,
          { codeData },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      return data;
    },

    // Get all redeem codes
    async getAllRedeemCodes() {
      const requestFn = () =>
        axios.get(`${API_BASE_URL}/api/redeem/all`, { withCredentials: true });
      const data = await this.handleRequest(requestFn);
      this.redeems = data;
      return data;
    },

    // Delete a redeem code
    async deleteRedeemCode(code) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/redeem/delete`,
          { code },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },
  },
});
