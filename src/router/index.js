import { createRouter, createWebHistory } from "vue-router";

// User Route
const HomeView = () => import("../views/home/HomeView.vue");
const HomeContent = () => import("../components/home/HomeContent.vue");
const RoadmapContent = () => import("../components/home/RoadmapContent.vue");
const ClassesContent = () => import("../components/home/ClassesContent.vue");
const CardsContent = () => import("../components/home/CardsContent.vue");
const CopyrightContent = () =>
  import("../components/home/CopyrightContent.vue");

const routes = [
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
        path: "roadmap",
        component: RoadmapContent,
        name: "Roadmap",
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


export default router;
