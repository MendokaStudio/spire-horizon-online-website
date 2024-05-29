import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useMailboxStore = defineStore("mailbox", {
  state: () => ({
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

    // Send item to a specific player by UID
    async sendItemToUID(uid, itemDetails) {
      const requestFn = () => axios.post(
        `${API_BASE_URL}/api/mailbox/send`,
        { uid, itemDetails },
        { withCredentials: true }
      );
      return await this.handleRequest(requestFn);
    },

    // Send item to multiple players
    async sendItemToMultiplePlayers(uids, itemDetails) {
      const requestFn = () => axios.post(
        `${API_BASE_URL}/api/mailbox/send-multiple`,
        { uids, itemDetails },
        { withCredentials: true }
      );
      return await this.handleRequest(requestFn);
    },

    // Send item to all players
    async sendItemToAllPlayers(itemDetails) {
      const requestFn = () => axios.post(
        `${API_BASE_URL}/api/mailbox/send-all`,
        { itemDetails },
        { withCredentials: true }
      );
      return await this.handleRequest(requestFn);
    },
  },
});
