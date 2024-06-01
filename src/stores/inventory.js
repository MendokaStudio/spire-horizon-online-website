import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.SECRET_API_BASE_URL;

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    inventory: null,
    equipment: null,
    bank: null,
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

    // Get player inventory
    async getPlayerInventory(uid) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/inventory/get`,
          { uid },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      this.inventory = data;
      return data;
    },

    // Get player equipment
    async getPlayerEquipment(uid) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/equipment/get`,
          { uid },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      this.equipment = data;
      return data;
    },

    // Get player bank
    async getPlayerBank(uid) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/bank/get`,
          { uid },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      this.bank = data;
      return data;
    },

    // Update player item
    async updatePlayerItem(inventoryType, uid, data) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/inventory/update`,
          { inventoryType, uid, data },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },
  },
});
