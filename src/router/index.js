import {createRouter, createWebHistory} from "vue-router";
// Front end routes
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Register from "../views/Register.vue";
import CompanyProfile from "../views/CompanyProfile.vue";
import ProfessionalProfile from "../views/ProfessionalProfile.vue";
import Search from "../views/Search.vue";

// Admin routes
import AdminLogin from "../views/admin/Login.vue";
import AdminLogout from "../views/admin/Logout.vue";
import AdminDashboard from "../views/admin/Dashboard.vue";
import AdminForms from "../views/admin/Forms.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Front end routes
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/logout",
            name: "logout",
            component: Logout,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/company_profile",
            name: "company_profile",
            component: CompanyProfile,
        },
        {
            path: "/professional_profile",
            name: "professional_profile",
            component: ProfessionalProfile,
        },
        {
            path: "/search",
            name: "search",
            component: Search,
            props: true,
        },
        // Admin routes
        {
            path: "/admin",
            name: "admin_login",
            component: AdminLogin,
        },
        {
            path: "/admin/logout",
            name: "admin_logout",
            component: AdminLogout,
        },
        {
            path: "/admin/dashboard",
            name: "admin_dashboard",
            component: AdminDashboard,
        },
        {
            path: "/admin/forms",
            name: "admin_forms",
            component: AdminForms,
        },
    ],
});
export default router;