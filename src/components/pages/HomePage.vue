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
  ArrowRightIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FireIcon
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
            <div v-for="address in userAddresses" :key="address.id" 
                 :class="[
                   'relative rounded-lg p-6 border-2 transition-all duration-200',
                   address.isPrimary ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-200'
                 ]">
              
              <!-- Action Buttons -->
              <div class="absolute top-3 right-3 flex items-center space-x-2">
                <button class="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <PencilIcon class="h-4 w-4 text-gray-600" />
                </button>
                <button class="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <TrashIcon class="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <!-- Tags Section -->
              <div class="flex items-center space-x-3 mb-6">
                <span v-if="address.isPrimary" 
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-gray-800 bg-yellow-400">
                  Основна адреса
                </span>
                <button v-else 
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal text-gray-600 bg-white border border-gray-300 hover:bg-gray-50">
                  Зробити основною
                </button>
                
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal text-gray-600 bg-gray-100">
                  <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 21.7a2 2 0 0 1-1.5-.7l-.9-.9a2 2 0 0 1-.5-1.4v-.6a2 2 0 0 1 .5-1.4l.9-.9a2 2 0 0 1 3 0l.9.9a2 2 0 0 1 .5 1.4v.6a2 2 0 0 1-.5 1.4l-.9.9a2 2 0 0 1-1.5.7z"></path>
                  </svg>
                  {{ address.meterCount }} лічильники
                </span>
              </div>

              <!-- Address Info -->
              <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-1">{{ address.address }}</h3>
                <p class="text-sm text-gray-600">{{ address.district }}</p>
              </div>

              <!-- Utilities -->
              <div class="flex flex-wrap gap-2">
                <span v-for="utility in address.utilities" :key="utility.type"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal text-blue-800 bg-blue-100">
                  <!-- Electricity Icon -->
                  <svg v-if="utility.type === 'electricity'" class="h-3 w-3 mr-1.5" fill="currentColor" viewBox="0 0 11 12">
                    <path d="M8.18906 1.04531C8.32734 0.724219 8.22422 0.349219 7.94062 0.142969C7.65703 -0.0632813 7.27031 -0.0445313 7.00547 0.185156L1.00547 5.43516C0.771094 5.64141 0.686719 5.97187 0.796875 6.2625C0.907031 6.55312 1.18828 6.75 1.5 6.75H4.11328L2.31094 10.9547C2.17266 11.2758 2.27578 11.6508 2.55937 11.857C2.84297 12.0633 3.22969 12.0445 3.49453 11.8148L9.49453 6.56484C9.72891 6.35859 9.81328 6.02813 9.70312 5.7375C9.59297 5.44688 9.31406 5.25234 9 5.25234H6.38672L8.18906 1.04531Z"/>
                  </svg>
                  <!-- Gas Icon -->
                  <svg v-else-if="utility.type === 'gas'" class="h-3 w-3 mr-1.5" fill="currentColor" viewBox="0 0 9 12">
                    <path d="M8.73047 6.01172L8.71406 5.96719C7.91719 3.76875 6.60938 1.79297 4.90078 0.199219L4.82344 0.128906C4.73672 0.046875 4.61953 0 4.5 0C4.38047 0 4.26328 0.046875 4.17656 0.128906L4.09922 0.199219C2.39062 1.79297 1.08281 3.76875 0.285937 5.96719L0.269531 6.01172C0.0914063 6.49922 0 7.01719 0 7.5375C0 10.0008 2.03438 12 4.5 12C6.96562 12 9 10.0008 9 7.5375C9 7.01719 8.90859 6.50156 8.73047 6.01172ZM6.60234 7.17188C6.69844 7.38984 6.74766 7.62656 6.74766 7.86328C6.74766 9.10547 5.73984 10.125 4.49766 10.125C3.25547 10.125 2.24766 9.10547 2.24766 7.86328C2.24766 7.62656 2.29687 7.3875 2.39297 7.17188L2.4375 7.07109C2.80781 6.24141 3.32578 5.48438 3.96797 4.84219L4.17656 4.63359C4.26094 4.54922 4.37578 4.50234 4.49531 4.50234C4.61484 4.50234 4.72969 4.54922 4.81406 4.63359L5.02266 4.84219C5.66484 5.48438 6.18516 6.24141 6.55313 7.07109L6.59766 7.17188H6.60234Z"/>
                  </svg>
                  <!-- Cold Water Icon -->
                  <svg v-else-if="utility.type === 'coldWater'" class="h-3 w-3 mr-1.5" fill="currentColor" viewBox="0 0 9 12">
                    <path d="M4.5 12C2.01562 12 0 9.98438 0 7.5C0 5.3625 3.05156 1.35234 3.90469 0.274219C4.04531 0.0984375 4.25391 0 4.47891 0H4.52109C4.74609 0 4.95469 0.0984375 5.09531 0.274219C5.94844 1.35234 9 5.3625 9 7.5C9 9.98438 6.98438 12 4.5 12ZM2.25 7.875C2.25 7.66875 2.08125 7.5 1.875 7.5C1.66875 7.5 1.5 7.66875 1.5 7.875C1.5 9.32578 2.67422 10.5 4.125 10.5C4.33125 10.5 4.5 10.3313 4.5 10.125C4.5 9.91875 4.33125 9.75 4.125 9.75C3.08906 9.75 2.25 8.91094 2.25 7.875Z"/>
                  </svg>
                  <!-- Hot Water/Thermometer Icon -->
                  <svg v-else-if="utility.type === 'hotWater'" class="h-3 w-3 mr-1.5" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M9.75 1.5C9.94891 1.5 10.1397 1.57902 10.2803 1.71967C10.421 1.86032 10.5 2.05109 10.5 2.25C10.5 2.44891 10.421 2.63968 10.2803 2.78033C10.1397 2.92098 9.94891 3 9.75 3C9.55109 3 9.36032 2.92098 9.21967 2.78033C9.07902 2.63968 9 2.44891 9 2.25C9 2.05109 9.07902 1.86032 9.21967 1.71967C9.36032 1.57902 9.55109 1.5 9.75 1.5ZM9.75 4.5C10.3467 4.5 10.919 4.26295 11.341 3.84099C11.7629 3.41903 12 2.84674 12 2.25C12 1.65326 11.7629 1.08097 11.341 0.65901C10.919 0.237053 10.3467 0 9.75 0C9.15326 0 8.58097 0.237053 8.15901 0.65901C7.73705 1.08097 7.5 1.65326 7.5 2.25C7.5 2.84674 7.73705 3.41903 8.15901 3.84099C8.58097 4.26295 9.15326 4.5 9.75 4.5ZM2.25 2.625C2.25 2.00391 2.75391 1.5 3.375 1.5C3.99609 1.5 4.5 2.00391 4.5 2.625V6.48047C4.5 6.88594 4.66641 7.22812 4.85859 7.47656C5.10469 7.79531 5.25 8.19141 5.25 8.625C5.25 9.66094 4.41094 10.5 3.375 10.5C2.33906 10.5 1.5 9.66094 1.5 8.625C1.5 8.19141 1.64531 7.79531 1.89141 7.47891C2.08359 7.22813 2.25 6.88594 2.25 6.48047V2.625ZM3.375 0C1.92422 0 0.75 1.17656 0.75 2.625V6.48047C0.75 6.48281 0.747656 6.4875 0.745312 6.49453C0.740625 6.50859 0.726563 6.53203 0.705469 6.56016C0.2625 7.12969 0 7.84687 0 8.625C0 10.4883 1.51172 12 3.375 12C5.23828 12 6.75 10.4883 6.75 8.625C6.75 7.84687 6.4875 7.12969 6.04453 6.56016C6.02344 6.53203 6.00938 6.50859 6.00469 6.49453C6.00234 6.4875 6 6.48281 6 6.48047V2.625C6 1.17656 4.82578 0 3.375 0ZM3.375 9.75C3.99609 9.75 4.5 9.24609 4.5 8.625C4.5 8.13516 4.18594 7.71797 3.75 7.56328V2.625C3.75 2.41875 3.58125 2.25 3.375 2.25C3.16875 2.25 3 2.41875 3 2.625V7.56328C2.56406 7.71797 2.25 8.13516 2.25 8.625C2.25 9.24609 2.75391 9.75 3.375 9.75Z"/>
                  </svg>
                  {{ utility.name }}
                </span>
              </div>
            </div>
          </div>
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
