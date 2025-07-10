import {createWebHistory, createRouter} from 'vue-router'

import LoginPage from '../components/pages/auth/LoginPage.vue'
import ResetPassword from "../components/pages/auth/ResetPassword.vue";

const routes = [
    {path: '/login', component: LoginPage},
    {path: '/reset-password', component: ResetPassword},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
