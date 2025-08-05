<script setup>
import MainLayout from "../../layouts/MainLayout.vue";
import PrimaryButton from "../../UI/buttons/PrimaryButton.vue";
import { 
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  ArrowRightIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FireIcon
} from "@heroicons/vue/24/outline";
import AddressCard from "./AddressCard.vue";

const quickStats = [
  { name: 'Активні мешканці', value: '24', icon: UsersIcon, color: 'bg-blue-500' },
  { name: 'Відкриті заявки', value: '3', icon: WrenchScrewdriverIcon, color: 'bg-red-500' },
  { name: 'Заборгованість', value: '₴2,847', icon: BanknotesIcon, color: 'bg-yellow-500' },
  { name: 'Оплачено цього місяця', value: '89%', icon: ChartBarIcon, color: 'bg-green-500' },
]

const userAddresses = [
  {
    id: 1,
    address: 'вул. Хрещатик, 22, кв. 15',
    district: 'м. Київ, Шевченківський район',
    isPrimary: true,
    meterCount: 4,
    utilities: [
      { type: 'electricity', name: 'Електроенергія', icon: BoltIcon },
      { type: 'gas', name: 'Газ', icon: FireIcon },
      { type: 'coldWater', name: 'Холодна вода', icon: 'water-drop' },
      { type: 'hotWater', name: 'Гаряча вода', icon: 'thermometer' }
    ]
  },
  {
    id: 2,
    address: 'вул. Дарницька, 5, кв. 42',
    district: 'м. Київ, Дарницький район',
    isPrimary: false,
    meterCount: 2,
    utilities: [
      { type: 'electricity', name: 'Електроенергія', icon: BoltIcon },
      { type: 'gas', name: 'Газ', icon: FireIcon }
    ]
  },
  {
    id: 3,
    address: 'вул. Незалежності, 10, кв. 7',
    district: 'м. Львів, Шевченківський район',
    isPrimary: false,
    meterCount: 3,
    utilities: [
      { type: 'electricity', name: 'Електроенергія', icon: BoltIcon },
      { type: 'coldWater', name: 'Холодна вода', icon: 'water-drop' },
      { type: 'hotWater', name: 'Гаряча вода', icon: 'thermometer' }
    ]
  }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900">Ласкаво просимо до Komunalka</h1>
        <p class="mt-4 text-xl text-gray-600">
          Система управління комунальним господарством
        </p>
        <p class="mt-2 text-lg text-gray-500">
          Ефективне управління мешканцями, рахунками та технічним обслуговуванням
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in quickStats" :key="stat.name" class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:px-6">
          <dt>
            <div :class="[stat.color, 'absolute rounded-md p-3']">
              <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ stat.name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline">
            <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
          </dd>
        </div>
      </div>

      <!-- My Addresses Block -->
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-6 py-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Мої адреси</h2>
              <p class="text-gray-600 mt-1">Керуйте адресами для комунальних послуг</p>
            </div>
            <button class="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-800 text-sm font-medium rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
              <PlusIcon class="h-4 w-4 mr-2" />
              Додати адресу
            </button>
          </div>

          <!-- Address Cards -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AddressCard
                v-for="address in userAddresses"
                :key="address.id"
                :id="address.id"
                :address="address.address"
                :district="address.district"
                :isPrimary="address.isPrimary"
                :meterCount="address.meterCount"
                :utilities="address.utilities"
            />
          </div>
        </div>
      </div>

      <!-- Features Overview -->
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Можливості системи</h3>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <UsersIcon class="h-6 w-6" />
              </div>
              <h4 class="mt-4 text-lg font-medium text-gray-900">Управління мешканцями</h4>
              <p class="mt-2 text-sm text-gray-500">
                Ведіть облік мешканців, їх контактної інформації та балансів
              </p>
            </div>
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <BoltIcon class="h-6 w-6" />
              </div>
              <h4 class="mt-4 text-lg font-medium text-gray-900">Комунальні послуги</h4>
              <p class="mt-2 text-sm text-gray-500">
                Управляйте рахунками за електроенергію, газ, воду та інші послуги
              </p>
            </div>
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <WrenchScrewdriverIcon class="h-6 w-6" />
              </div>
              <h4 class="mt-4 text-lg font-medium text-gray-900">Технічне обслуговування</h4>
              <p class="mt-2 text-sm text-gray-500">
                Створюйте та відстежуйте заявки на ремонт та обслуговування
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </MainLayout>
</template>
