import {createWebHistory, createRouter} from 'vue-router'

import LoginPage from '../components/pages/LoginPage.vue'
import HomePage from "../components/pages/HomePage.vue";

const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
