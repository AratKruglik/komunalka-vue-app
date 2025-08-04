<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import PrimaryButton from "../UI/buttons/PrimaryButton.vue";
import { 
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  ArrowRightIcon
} from "@heroicons/vue/24/outline";

const quickStats = [
  { name: 'Активні мешканці', value: '24', icon: UsersIcon, color: 'bg-blue-500' },
  { name: 'Відкриті заявки', value: '3', icon: WrenchScrewdriverIcon, color: 'bg-red-500' },
  { name: 'Заборгованість', value: '₴2,847', icon: BanknotesIcon, color: 'bg-yellow-500' },
  { name: 'Оплачено цього місяця', value: '89%', icon: ChartBarIcon, color: 'bg-green-500' },
]

const quickActions = [
  {
    title: 'Панель управління',
    description: 'Переглянути загальну статистику та останні події',
    icon: HomeIcon,
    href: '/dashboard',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Мешканці',
    description: 'Управління мешканцями та їх контактною інформацією',
    icon: UsersIcon,
    href: '/residents',
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Комунальні послуги',
    description: 'Перегляд та управління рахунками за комунальні послуги',
    icon: BoltIcon,
    href: '/utilities',
    color: 'bg-yellow-50 text-yellow-600'
  },
  {
    title: 'Заявки на ремонт',
    description: 'Створення та відстеження заявок на технічне обслуговування',
    icon: WrenchScrewdriverIcon,
    href: '/maintenance',
    color: 'bg-purple-50 text-purple-600'
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

      <!-- Quick Actions -->
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Швидкі дії</h3>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div v-for="action in quickActions" :key="action.title" class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div>
                <span :class="[action.color, 'rounded-lg inline-flex p-3 ring-4 ring-white']">
                  <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div class="mt-8">
                <h3 class="text-lg font-medium">
                  <a :href="action.href" class="focus:outline-none">
                    <span class="absolute inset-0" aria-hidden="true" />
                    {{ action.title }}
                  </a>
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                  {{ action.description }}
                </p>
              </div>
              <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                <ArrowRightIcon class="h-6 w-6" />
              </span>
            </div>
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

      <!-- Getting Started -->
      <div class="bg-primary-50 rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-primary-900 mb-4">Початок роботи</h3>
          <p class="text-sm text-primary-700 mb-6">
            Почніть з перегляду панелі управління для отримання загального огляду стану будинку
          </p>
          <PrimaryButton class="flex items-center gap-2">
            <HomeIcon class="h-4 w-4" />
            Перейти до панелі управління
          </PrimaryButton>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
