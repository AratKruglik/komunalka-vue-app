import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../components/HomeView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/home', component: HomeView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
