import {createWebHistory, createRouter} from 'vue-router'

import LoginPage from '../components/pages/LoginPage.vue'

const routes = [
    {path: '/login', component: LoginPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
