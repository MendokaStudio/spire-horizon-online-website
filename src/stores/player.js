import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const usePlayerStore = defineStore("player", {
  state: () => ({
    player: null,
    players: null,
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

    // Get all players
    async getAllPlayers(limitAmount) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/player/all`,
          { limitAmount },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      this.players = data;
      return data;
    },

    // Search players
    async searchPlayers(searchBy, searchData) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/player/search`,
          { searchBy, searchData },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      this.players = data;
      return data;
    },

    // Get a single player
    async getPlayer(uid) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/player/get`,
          { uid },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      this.player = data;
      return data;
    },

    // Update player info
    async updatePlayerInfo(uid, data) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/player/update`,
          { uid, data },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },

    // Delete player data
    async deletePlayerData(uid) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/player/delete`,
          { uid },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },
  },
});
