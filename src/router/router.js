import {createWebHistory, createRouter} from 'vue-router'

import LoginPage from '../components/pages/LoginPage.vue'
import RegisterPage from '../components/pages/RegisterPage.vue'
import AddUtilityPage from '../components/pages/AddUtilityPage.vue'
import AddAddressPage from '../components/pages/AddAddressPage.vue'
import HomePage from "../components/pages/HomePage/HomePage.vue";
import PersonalCabinetPage from "../components/pages/PersonalCabinetPage.vue";
import AddressUtilitiesPage from "../components/pages/AddressUtilitiesPage.vue";

import AddressUtilityBillsPage from '../components/pages/AddressUtilityBillsPage.vue'
import AIAssistantPage from '../components/pages/AIAssistantPage.vue'
 
 const routes = [
     {path: '/', component: HomePage},
     {path: '/login', component: LoginPage},
     {path: '/register', component: RegisterPage},
     {path: '/add-utility', component: AddUtilityPage},
     {path: '/add-address', component: AddAddressPage},
     {path: '/personal-cabinet', component: PersonalCabinetPage},
     {path: '/address-utilities', component: AddressUtilitiesPage},
     {path: '/address-utility-bills', name: 'AddressUtilityBills', component: AddressUtilityBillsPage},
    {path: '/ai-assistant', name: 'AIAssistant', component: AIAssistantPage}
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
