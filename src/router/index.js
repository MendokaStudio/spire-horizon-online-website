import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import DashboardView from "../views/dashboard/DashboardView.vue";
import LoginView from "../views/dashboard/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "",
      component: DashboardView,
      children: [
        {
          path: "",
          name: "Dashboard", // Move the name here
          component: LoginView,
        },
        { path: "servers", component: LoginView },
        { path: "players", component: LoginView },
        { path: "player/:uid", component: LoginView },
        { path: "mailbox", component: LoginView },
        { path: "redeem", component: LoginView },
        { path: "*", redirect: "/" },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!userStore.user) {
    await userStore.fetchCurrentUser();
  }

  if (requiresAuth && !userStore.user) {
    next({ name: "Login" });
  } else if (to.name === "Login" && userStore.user) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
