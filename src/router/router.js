import {createWebHistory, createRouter} from 'vue-router'

import LoginPage from '../components/pages/LoginPage.vue'
import HomePage from "../components/pages/HomePage/HomePage.vue";
import PersonalCabinetPage from "../components/pages/PersonalCabinetPage.vue";

const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/personal-cabinet', component: PersonalCabinetPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
