import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchCurrentUser() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${API_BASE_URL}/get-user`, {
          withCredentials: true,
        });
        this.user = response.data.user;
        this.isLoading = false;
      } catch (error) {
        this.user = null;
        this.error = error.response.data.error;
        this.isLoading = false;
      }
    },
    async login(email, password) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(
          `${API_BASE_URL}/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        this.user = response.data;
        localStorage.setItem("accessToken", response.data.accessToken); // เก็บ accessToken
        this.isLoading = false;
      } catch (error) {
        this.error = error.response.data.error || "Login failed";
        this.isLoading = false;
      }
    },
    async logout() {
      this.isLoading = true;
      try {
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          { withCredentials: true }
        );
        this.user = null;
        localStorage.removeItem("accessToken"); // ลบ accessToken
        // หากใช้คุกกี้ในการจัดการโทเค็น:
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.isLoading = false;
      } catch (error) {
        this.error = error.response.data.error || "Logout failed";
        this.isLoading = false;
      }
    },
  },
});
