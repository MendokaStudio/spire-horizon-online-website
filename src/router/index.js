import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { AdminChecker, IpChecker } from "../script/utilityFunction";
import { useIpAddressStore } from "../stores/ip-address";

// Admin Route
const LoginView = () => import("../views/dashboard/LoginView.vue");
const DashboardView = () => import("../views/dashboard/DashboardView.vue");
const DashboardContent = () =>
  import("../components/dashboard/home/DashboardContent.vue");
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

// User Route
const HomeView = () => import("../views/home/HomeView.vue");
const HomeContent = () => import("../components/home/HomeContent.vue");
const NewsContent = () => import("../components/home/NewsContent.vue");
const ClassesContent = () => import("../components/home/ClassesContent.vue");
const CardsContent = () => import("../components/home/CardsContent.vue");
const RankingContent = () => import("../components/home/RankingContent.vue");
const CopyrightContent = () =>
  import("../components/home/CopyrightContent.vue");

const routes = [
  {
    path: "/dashboard",
    name: "",
    component: DashboardView,
    children: [
      { path: "", name: "Dashboard", component: DashboardContent },
      { path: "servers", component: ServersContent },
      { path: "players", component: PlayerContent },
      { path: "player/:uid", component: PlayerInfoContent },
      { path: "mailbox", component: MailboxContent },
      { path: "redeem", component: RedeemContent },
    ],
    meta: {
      requiresAuth: true,
      requiresAdminAuth: true,
      showNavBar: false,
      isProtected: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      requiresAuth: false,
      requiresAdminAuth: false,
      showNavBar: false,
      isProtected: true,
    },
  },
  {
    path: "/",
    name: "",
    component: HomeView,
    children: [
      {
        path: "",
        component: HomeContent,
        name: "Home",
      },
      {
        path: "news",
        component: NewsContent,
        name: "News",
      },
      {
        path: "classes",
        component: ClassesContent,
        name: "Classes",
      },
      {
        path: "cards",
        component: CardsContent,
        name: "Cards",
      },
      {
        path: "ranking",
        component: RankingContent,
        name: "Ranking",
      },
      {
        path: "copyright",
        component: CopyrightContent,
        name: "Copyright",
      },
    ],
    meta: {
      requiresAuth: false,
      requiresAdminAuth: false,
      showNavBar: true,
      isProtected: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const ipAddressStore = useIpAddressStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isProtected = to.matched.some((record) => record.meta.isProtected);
  const requiresAdminAuth = to.matched.some(
    (record) => record.meta.requiresAdminAuth
  );

  if (!requiresAuth && !requiresAdminAuth && !isProtected) {
    return next();
  }

  if (isProtected) {
    if (!ipAddressStore.myIP) {
      await ipAddressStore.getMyIp();
      if (!IpChecker(ipAddressStore.myIP)) {
        return next({ path: "/" });
      }
    } else {
      if (!IpChecker(ipAddressStore.myIP)) {
        return next({ path: "/" });
      }
    }
  }

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
