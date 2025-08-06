<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import { 
  BoltIcon,
  FireIcon,
  HomeIcon,
  DocumentTextIcon,
  PlusIcon
} from "@heroicons/vue/24/outline";

// Utility expenses data
const monthlyExpenses = [
  {
    id: 'electricity',
    name: 'Електроенергія',
    amount: 423.50,
    usage: '145 кВт',
    rate: '₴2.92/кВт',
    change: -5,
    changeType: 'decrease',
    icon: BoltIcon,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 'gas',
    name: 'Газ',
    amount: 815.20,
    usage: '80 м³',
    rate: '₴10.19/м³',
    change: 8,
    changeType: 'increase',
    icon: FireIcon,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'water_supply',
    name: 'Водопостачання',
    amount: 215.75,
    usage: '15 м³',
    rate: '₴14.38/м³',
    change: -2,
    changeType: 'decrease',
    icon: 'water-drop',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'hot_water',
    name: 'Гаряча вода',
    amount: 350.00,
    usage: '5 м³',
    rate: '₴70.00/м³',
    change: 0,
    changeType: 'same',
    icon: 'thermometer',
    color: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 'cold_water',
    name: 'Холодна вода',
    amount: 120.00,
    usage: '10 м³',
    rate: '₴12.00/м³',
    change: -3,
    changeType: 'decrease',
    icon: 'water-drop',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }
];

// Recent readings data
const recentReadings = [
  {
    id: 1,
    service: 'Електроенергія',
    date: '20.05.2023',
    reading: '12458 кВт',
    difference: '+145 кВт',
    differenceColor: 'text-green-600',
    icon: BoltIcon,
    iconColor: 'text-yellow-600'
  },
  {
    id: 2,
    service: 'Газ',
    date: '18.05.2023',
    reading: '2340 м³',
    difference: '+80 м³',
    differenceColor: 'text-red-600',
    icon: FireIcon,
    iconColor: 'text-blue-600'
  },
  {
    id: 3,
    service: 'Холодна вода',
    date: '15.05.2023',
    reading: '432 м³',
    difference: '+10 м³',
    differenceColor: 'text-green-600',
    icon: 'water-drop',
    iconColor: 'text-blue-600'
  },
  {
    id: 4,
    service: 'Гаряча вода',
    date: '15.05.2023',
    reading: '185 м³',
    difference: '+5 м³',
    differenceColor: 'text-green-600',
    icon: 'thermometer',
    iconColor: 'text-red-600'
  }
];

// Payment reminders data
const paymentReminders = [
  {
    id: 1,
    service: 'Електроенергія',
    amount: 423.50,
    dueDate: '25.05.2023',
    daysLeft: 2,
    urgency: 'high',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
    iconColor: 'bg-red-100'
  },
  {
    id: 2,
    service: 'Газ',
    amount: 815.20,
    dueDate: '28.05.2023',
    daysLeft: 5,
    urgency: 'medium',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-100',
    iconColor: 'bg-yellow-100'
  },
  {
    id: 3,
    service: 'Водопостачання',
    amount: 215.75,
    dueDate: '01.06.2023',
    daysLeft: 9,
    urgency: 'medium',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-100',
    iconColor: 'bg-yellow-100'
  }
];

// Chart period selector
const selectedPeriod = 'year';
const periods = [
  { id: 'year', label: 'За рік', active: true },
  { id: 'half_year', label: 'За 6 місяців', active: false },
  { id: 'quarter', label: 'За 3 місяці', active: false }
];
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="px-6 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Вітаємо, Олена!</h1>
              <p class="text-gray-600 mt-1">Ось огляд ваших комунальних послуг за травень 2023</p>
            </div>
            <button class="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-800 text-sm font-medium rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
              <PlusIcon class="h-4 w-4 mr-2" />
              Додати показання
            </button>
          </div>
        </div>
      </div>

      <!-- Monthly Expenses Section -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Витрати цього місяця</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div v-for="expense in monthlyExpenses" :key="expense.id" class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div :class="[expense.color, 'rounded-full p-2.5 mr-3']">
                  <component v-if="expense.icon" :is="expense.icon" :class="[expense.iconColor, 'h-3.5 w-3.5']" />
                  <!-- Custom SVG icons for water-drop and thermometer -->
                  <svg v-else-if="expense.icon === 'water-drop'" :class="[expense.iconColor, 'h-3.5 w-3.5']" fill="currentColor" viewBox="0 0 12 16">
                    <path d="M6 16C2.6875 16 0 13.3125 0 10C0 7.15 4.06875 1.80312 5.20625 0.365625C5.39375 0.13125 5.67188 0 5.97188 0H6.02812C6.32812 0 6.60625 0.13125 6.79375 0.365625C7.93125 1.80312 12 7.15 12 10C12 13.3125 9.3125 16 6 16ZM3 10.5C3 10.225 2.775 10 2.5 10C2.225 10 2 10.225 2 10.5C2 12.4344 3.56562 14 5.5 14C5.775 14 6 13.775 6 13.5C6 13.225 5.775 13 5.5 13C4.11875 13 3 11.8813 3 10.5Z"/>
                  </svg>
                  <svg v-else-if="expense.icon === 'thermometer'" :class="[expense.iconColor, 'h-3.5 w-3.5']" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13 2C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3C14 3.26522 13.8946 3.51957 13.7071 3.70711C13.5196 3.89464 13.2652 4 13 4C12.7348 4 12.4804 3.89464 12.2929 3.70711C12.1054 3.51957 12 3.26522 12 3C12 2.73478 12.1054 2.48043 12.2929 2.29289C12.4804 2.10536 12.7348 2 13 2ZM13 6C13.7956 6 14.5587 5.68393 15.1213 5.12132C15.6839 4.55871 16 3.79565 16 3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.31607 13.7956 0 13 0C12.2044 0 11.4413 0.31607 10.8787 0.87868C10.3161 1.44129 10 2.20435 10 3C10 3.79565 10.3161 4.55871 10.8787 5.12132C11.4413 5.68393 12.2044 6 13 6ZM3 3.5C3 2.67188 3.67188 2 4.5 2C5.32812 2 6 2.67188 6 3.5V8.64062C6 9.18125 6.22188 9.6375 6.47813 9.96875C6.80625 10.3938 7 10.9219 7 11.5C7 12.8813 5.88125 14 4.5 14C3.11875 14 2 12.8813 2 11.5C2 10.9219 2.19375 10.3938 2.52187 9.97188C2.77812 9.6375 3 9.18125 3 8.64062V3.5ZM4.5 0C2.56562 0 1 1.56875 1 3.5V8.64062C1 8.64375 0.996875 8.65 0.99375 8.65938C0.9875 8.67813 0.96875 8.70937 0.940625 8.74687C0.35 9.50625 0 10.4625 0 11.5C0 13.9844 2.01562 16 4.5 16C6.98438 16 9 13.9844 9 11.5C9 10.4625 8.65 9.50625 8.05937 8.74687C8.03125 8.70937 8.0125 8.67813 8.00625 8.65938C8.00313 8.65 8 8.64375 8 8.64062V3.5C8 1.56875 6.43438 0 4.5 0ZM4.5 13C5.32812 13 6 12.3281 6 11.5C6 10.8469 5.58125 10.2906 5 10.0844V3.5C5 3.225 4.775 3 4.5 3C4.225 3 4 3.225 4 3.5V10.0844C3.41875 10.2906 3 10.8469 3 11.5C3 12.3281 3.67188 13 4.5 13Z"/>
                  </svg>
                </div>
                <div class="text-sm font-medium text-gray-700">{{ expense.name }}</div>
              </div>
              <span v-if="expense.change !== 0" :class="[
                expense.changeType === 'increase' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
                'inline-flex rounded-full px-2 text-xs font-normal'
              ]">
                {{ expense.changeType === 'increase' ? '+' : '' }}{{ expense.change }}%
              </span>
              <span v-else class="inline-flex rounded-full px-2 text-xs font-normal bg-gray-100 text-gray-600">
                0%
              </span>
            </div>
            <div class="mt-4">
              <div class="text-2xl font-bold text-gray-800">₴{{ expense.amount.toFixed(2) }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ expense.usage }} · {{ expense.rate }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Consumption Chart -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Графік споживання</h3>
              <div class="flex space-x-1">
                <button v-for="period in periods" :key="period.id" 
                        :class="[
                          period.active ? 'bg-yellow-200 text-gray-800' : 'bg-gray-100 text-gray-600',
                          'px-3 py-1 rounded-full text-xs font-medium'
                        ]">
                  {{ period.label }}
                </button>
              </div>
            </div>
            <div class="h-64 bg-gray-50 rounded flex items-center justify-center">
              <span class="text-gray-500">Графік споживання</span>
            </div>
          </div>
        </div>

        <!-- Cost Distribution Chart -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Розподіл витрат</h3>
            <div class="h-64 bg-gray-50 rounded flex items-center justify-center">
              <span class="text-gray-500">Кругова діаграма</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Recent Readings -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Останні показання</h3>
              <button class="text-sm font-medium text-yellow-600 hover:text-yellow-700">
                Переглянути всі
              </button>
            </div>
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="px-1 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Послуга</th>
                    <th class="px-1 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Дата</th>
                    <th class="px-1 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Показання</th>
                    <th class="px-1 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Різниця</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="reading in recentReadings" :key="reading.id">
                    <td class="px-1 py-3 text-sm">
                      <div class="flex items-center">
                        <component v-if="reading.icon" :is="reading.icon" :class="[reading.iconColor, 'h-3.5 w-3.5 mr-2']" />
                        <svg v-else-if="reading.icon === 'water-drop'" :class="[reading.iconColor, 'h-3.5 w-3.5 mr-2']" fill="currentColor" viewBox="0 0 12 16">
                          <path d="M6 16C2.6875 16 0 13.3125 0 10C0 7.15 4.06875 1.80312 5.20625 0.365625C5.39375 0.13125 5.67188 0 5.97188 0H6.02812C6.32812 0 6.60625 0.13125 6.79375 0.365625C7.93125 1.80312 12 7.15 12 10C12 13.3125 9.3125 16 6 16ZM3 10.5C3 10.225 2.775 10 2.5 10C2.225 10 2 10.225 2 10.5C2 12.4344 3.56562 14 5.5 14C5.775 14 6 13.775 6 13.5C6 13.225 5.775 13 5.5 13C4.11875 13 3 11.8813 3 10.5Z"/>
                        </svg>
                        <svg v-else-if="reading.icon === 'thermometer'" :class="[reading.iconColor, 'h-3.5 w-3.5 mr-2']" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13 2C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3C14 3.26522 13.8946 3.51957 13.7071 3.70711C13.5196 3.89464 13.2652 4 13 4C12.7348 4 12.4804 3.89464 12.2929 3.70711C12.1054 3.51957 12 3.26522 12 3C12 2.73478 12.1054 2.48043 12.2929 2.29289C12.4804 2.10536 12.7348 2 13 2ZM13 6C13.7956 6 14.5587 5.68393 15.1213 5.12132C15.6839 4.55871 16 3.79565 16 3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.31607 13.7956 0 13 0C12.2044 0 11.4413 0.31607 10.8787 0.87868C10.3161 1.44129 10 2.20435 10 3C10 3.79565 10.3161 4.55871 10.8787 5.12132C11.4413 5.68393 12.2044 6 13 6ZM3 3.5C3 2.67188 3.67188 2 4.5 2C5.32812 2 6 2.67188 6 3.5V8.64062C6 9.18125 6.22188 9.6375 6.47813 9.96875C6.80625 10.3938 7 10.9219 7 11.5C7 12.8813 5.88125 14 4.5 14C3.11875 14 2 12.8813 2 11.5C2 10.9219 2.19375 10.3938 2.52187 9.97188C2.77812 9.6375 3 9.18125 3 8.64062V3.5ZM4.5 0C2.56562 0 1 1.56875 1 3.5V8.64062C1 8.64375 0.996875 8.65 0.99375 8.65938C0.9875 8.67813 0.96875 8.70937 0.940625 8.74687C0.35 9.50625 0 10.4625 0 11.5C0 13.9844 2.01562 16 4.5 16C6.98438 16 9 13.9844 9 11.5C9 10.4625 8.65 9.50625 8.05937 8.74687C8.03125 8.70937 8.0125 8.67813 8.00625 8.65938C8.00313 8.65 8 8.64375 8 8.64062V3.5C8 1.56875 6.43438 0 4.5 0ZM4.5 13C5.32812 13 6 12.3281 6 11.5C6 10.8469 5.58125 10.2906 5 10.0844V3.5C5 3.225 4.775 3 4.5 3C4.225 3 4 3.225 4 3.5V10.0844C3.41875 10.2906 3 10.8469 3 11.5C3 12.3281 3.67188 13 4.5 13Z"/>
                        </svg>
                        <span class="text-gray-700 text-sm">{{ reading.service }}</span>
                      </div>
                    </td>
                    <td class="px-1 py-3 text-sm text-gray-700">{{ reading.date }}</td>
                    <td class="px-1 py-3 text-sm text-gray-700">{{ reading.reading }}</td>
                    <td class="px-1 py-3 text-sm" :class="reading.differenceColor">{{ reading.difference }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Payment Reminders -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Нагадування про оплату</h3>
              <button class="text-sm font-medium text-yellow-600 hover:text-yellow-700">
                Переглянути всі
              </button>
            </div>
            <div class="space-y-4">
              <div v-for="reminder in paymentReminders" :key="reminder.id" 
                   :class="[reminder.bgColor, reminder.borderColor, 'rounded-lg border p-4']">
                <div class="flex items-start justify-between">
                  <div class="flex items-start">
                    <div :class="[reminder.iconColor, 'rounded-full p-2 mr-3']">
                      <svg v-if="reminder.urgency === 'high'" class="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1C8.44375 1 8.85313 1.23437 9.07813 1.61875L15.8281 13.1187C16.0563 13.5062 16.0563 13.9844 15.8344 14.3719C15.6125 14.7594 15.1969 15 14.75 15H1.25C0.803125 15 0.3875 14.7594 0.165625 14.3719C-0.05625 13.9844 -0.053125 13.5031 0.171875 13.1187L6.92187 1.61875C7.14687 1.23437 7.55625 1 8 1ZM8 5C7.58437 5 7.25 5.33437 7.25 5.75V9.25C7.25 9.66563 7.58437 10 8 10C8.41562 10 8.75 9.66563 8.75 9.25V5.75C8.75 5.33437 8.41562 5 8 5ZM9 12C9 11.7348 8.89464 11.4804 8.70711 11.2929C8.51957 11.1054 8.26522 11 8 11C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13C8.26522 13 8.51957 12.8946 8.70711 12.7071C8.89464 12.5196 9 12.2652 9 12Z"/>
                      </svg>
                      <svg v-else class="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM7.25 3.75V8C7.25 8.25 7.375 8.48438 7.58437 8.625L10.5844 10.625C10.9281 10.8563 11.3937 10.7625 11.625 10.4156C11.8563 10.0687 11.7625 9.60625 11.4156 9.375L8.75 7.6V3.75C8.75 3.33437 8.41563 3 8 3C7.58437 3 7.25 3.33437 7.25 3.75Z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-800">{{ reminder.service }}</div>
                      <div class="text-xs text-gray-600 mt-1">
                        Термін оплати: {{ reminder.dueDate }} (через {{ reminder.daysLeft }} 
                        {{ reminder.daysLeft === 1 ? 'день' : reminder.daysLeft < 5 ? 'дні' : 'днів' }})
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-gray-800">₴{{ reminder.amount.toFixed(2) }}</div>
                    <button class="mt-1 px-3 py-1 bg-yellow-400 text-gray-800 text-xs rounded hover:bg-yellow-500">
                      Оплатити
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-6">Швидкі дії</h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button class="flex items-center justify-center px-4 py-3 bg-yellow-200 text-gray-800 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
              <PlusIcon class="h-4 w-4 mr-2" />
              Додати показання
            </button>
            <button class="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              <HomeIcon class="h-4 w-4 mr-2" />
              Додати адресу
            </button>
            <button class="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              <DocumentTextIcon class="h-4 w-4 mr-2" />
              Переглянути тарифи
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
