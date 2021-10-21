import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import TasksIndex from "../pages/Task.vue";
const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/tasks", name: "Tasks", component: TasksIndex },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;