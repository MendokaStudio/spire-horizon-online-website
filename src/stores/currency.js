import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currencies: null,
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

    // Get currencies
    async getCurrencies(uid) {
      const requestFn = () => axios.post(
        `${API_BASE_URL}/api/currency/get`,
        { uid },
        { withCredentials: true }
      );
      const data = await this.handleRequest(requestFn);
      this.currencies = data;
      return data;
    },

    // Update currency
    async updateCurrency(uid, currency, amount) {
      const requestFn = () => axios.post(
        `${API_BASE_URL}/api/currency/update`,
        { uid, currency, amount },
        { withCredentials: true }
      );
      return await this.handleRequest(requestFn);
    },
  },
});
