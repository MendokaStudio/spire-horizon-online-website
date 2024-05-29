import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { AdminChecker } from "../script/utilityFunction";

const LoginView = () => import("../views/dashboard/LoginView.vue");
const DashboardView = () => import("../views/dashboard/DashboardView.vue");
const ServersContent = () =>
  import("../components/dashboard/server/ServersContent.vue");
const PlayerContent = () =>
  import("../components/dashboard/player/PlayerContent.vue");
const PlayerInfoContent = () =>
  import("../components/dashboard/player/PlayerInfoContent.vue");
const MailboxContent = () =>
  import("../components/dashboard/mailbox/MailboxContent.vue");
  const RedeemContent = () =>
  import("../components/dashboard/redeem/RedeemContent.vue");


const HomeView = () => import("../views/home/HomeView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: false, requiresAdminAuth: false },
  },
  {
    path: "/dashboard",
    name: "",
    component: DashboardView,
    children: [
      { path: "", name: "Dashboard", component: LoginView },
      { path: "servers", component: ServersContent },
      { path: "players", component: PlayerContent },
      { path: "player/:uid", component: PlayerInfoContent },
      { path: "mailbox", component: MailboxContent },
      { path: "redeem", component: RedeemContent },
    ],
    meta: { requiresAuth: true, requiresAdminAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false, requiresAdminAuth: false },
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for 404
    redirect: "/", // Redirect to home or any other route
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdminAuth = to.matched.some(
    (record) => record.meta.requiresAdminAuth
  );

  if (!userStore.user) {
    await userStore.fetchCurrentUser();
  }

  if (requiresAuth && !userStore.user) {
    return next({ name: "Login" });
  }

  if (
    requiresAdminAuth &&
    (!userStore.user || !AdminChecker(userStore.user.uid))
  ) {
    userStore.logout();
    return next({ path: "/" });
  }

  if (to.name === "Login" && userStore.user) {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
