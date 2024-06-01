import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const useServerStore = defineStore("server", {
  state: () => ({
    servers: null,
    serverData: null,
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

    // Add a new server
    async addServer(serverID, serverDetails) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/server/add`,
          { serverID, serverDetails },
          { withCredentials: true }
        );
      const data = await this.handleRequest(requestFn);
      return data;
    },

    // Get all servers
    async getAllServers() {
      const requestFn = () =>
        axios.get(`${API_BASE_URL}/api/server/all`, {
          withCredentials: true,
        });
      const data = await this.handleRequest(requestFn);
      this.servers = data;
      return data.servers;
    },

    // Delete a server
    async deleteServer(serverID) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/server/delete`,
          { serverID },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },

    // Change server status
    async changeServerStatus(serverID, status) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/server/change-status`,
          { serverID, status },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },

    // Change server access
    async changeServerAccess(serverID, status) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/server/change-access`,
          { serverID, status },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },

    // Get server data
    async getServerData() {
      const requestFn = () =>
        axios.get(`${API_BASE_URL}/api/server/data`, {
          withCredentials: true,
        });
      const data = await this.handleRequest(requestFn);
      this.serverData = data;
      return data;
    },

    // Change server data
    async changeServerData(serverData) {
      const requestFn = () =>
        axios.post(
          `${API_BASE_URL}/api/server/change-data`,
          { serverData },
          { withCredentials: true }
        );
      return await this.handleRequest(requestFn);
    },
  },
});
