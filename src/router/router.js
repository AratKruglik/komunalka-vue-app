import {createWebHistory, createRouter} from 'vue-router'

import LoginPage from '../components/pages/LoginPage.vue'
import HomePage from "../components/pages/HomePage.vue";
import DashboardPage from "../components/pages/DashboardPage.vue";
import UtilitiesPage from "../components/pages/UtilitiesPage.vue";
import ResidentsPage from "../components/pages/ResidentsPage.vue";
import MaintenancePage from "../components/pages/MaintenancePage.vue";

const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/dashboard', component: DashboardPage},
    {path: '/utilities', component: UtilitiesPage},
    {path: '/residents', component: ResidentsPage},
    {path: '/maintenance', component: MaintenancePage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
