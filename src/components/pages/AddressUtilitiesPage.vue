<script setup>
import { ref } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import TextInput from '../UI/forms/TextInput.vue'
import PrimaryButton from '../UI/buttons/PrimaryButton.vue'
import { 
  MapPinIcon, 
  ChevronDownIcon, 
  BoltIcon, 
  FireIcon, 
  BeakerIcon, 
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

// Reactive data
const selectedAddress = ref('вул. Хрещатик, 22, кв. 15')
const activeTab = ref('electricity')
const currentReading = ref('')
const readingDate = ref('2023-06-15')

const addresses = ref([
  'вул. Хрещатик, 22, кв. 15',
  'вул. Володимирська, 45, кв. 8',
  'пр. Перемоги, 12, кв. 23'
])

const utilityTypes = ref([
  { id: 'electricity', name: 'Електролічильник', icon: BoltIcon, color: 'text-yellow-600' },
  { id: 'gas', name: 'Газовий лічильник', icon: FireIcon, color: 'text-orange-600' },
  { id: 'hot-water', name: 'Лічільник гарячої води', icon: BeakerIcon, color: 'text-red-600' },
  { id: 'cold-water', name: 'Лічільник холодної води', icon: BeakerIcon, color: 'text-blue-600' }
])

const meters = ref([
  {
    id: 1,
    type: 'Електролічильник',
    subtype: 'Денний',
    number: 'EL-12345678',
    installDate: '15.03.2020',
    tariff: '1.68 грн/кВт·год',
    lastReading: '4572 кВт·год',
    readingDate: '01.06.2023',
    status: 'Актуально',
    nextReadingDate: '30.06.2023',
    icon: BoltIcon,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 2,
    type: 'Електролічильник',
    subtype: 'Нічний',
    number: 'EL-12345679',
    installDate: '15.03.2020',
    tariff: '0.84 грн/кВт·год',
    lastReading: '2145 кВт·год',
    readingDate: '01.06.2023',
    status: 'Актуально',
    nextReadingDate: '30.06.2023',
    icon: BoltIcon,
    color: 'bg-yellow-100 text-yellow-600'
  }
])

const readingsHistory = ref([
  {
    date: '01.06.2023',
    type: 'Електролічильник (денний)',
    number: 'EL-12345678',
    reading: '4572 кВт·год',
    difference: '124 кВт·год',
    tariff: '1.68 грн/кВт·год',
    amount: '208.32 грн',
    icon: BoltIcon
  },
  {
    date: '01.06.2023',
    type: 'Електролічильник (нічний)',
    number: 'EL-12345679',
    reading: '2145 кВт·год',
    difference: '78 кВт·год',
    tariff: '0.84 грн/кВт·год',
    amount: '65.52 грн',
    icon: BoltIcon
  },
  {
    date: '01.05.2023',
    type: 'Електролічильник (денний)',
    number: 'EL-12345678',
    reading: '4448 кВт·год',
    difference: '118 кВт·год',
    tariff: '1.68 грн/кВт·год',
    amount: '198.24 грн',
    icon: BoltIcon
  },
  {
    date: '01.05.2023',
    type: 'Електролічильник (нічний)',
    number: 'EL-12345679',
    reading: '2067 кВт·год',
    difference: '72 кВт·год',
    tariff: '0.84 грн/кВт·год',
    amount: '60.48 грн',
    icon: BoltIcon
  },
  {
    date: '01.04.2023',
    type: 'Електролічильник (денний)',
    number: 'EL-12345678',
    reading: '4330 кВт·год',
    difference: '130 кВт·год',
    tariff: '1.68 грн/кВт·год',
    amount: '218.40 грн',
    icon: BoltIcon
  }
])

const submitReading = () => {
  // Handle reading submission
  console.log('Submitting reading:', currentReading.value, readingDate.value)
}

const addMeter = () => {
  // Handle adding new meter
  console.log('Adding new meter')
}

const editMeter = (meterId) => {
  // Handle meter editing
  console.log('Editing meter:', meterId)
}

const deleteMeter = (meterId) => {
  // Handle meter deletion
  console.log('Deleting meter:', meterId)
}
</script>

<template>
  <MainLayout>
    <div class="max-w-full">
      <!-- Address Selector -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <MapPinIcon class="h-5 w-5 text-yellow-500" />
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ selectedAddress }}</h3>
              <p class="text-sm text-gray-600">м. Київ, Шевченківський район</p>
            </div>
          </div>
          <div class="relative">
            <select 
              v-model="selectedAddress"
              class="appearance-none bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option v-for="address in addresses" :key="address" :value="address">
                {{ address }}
              </option>
            </select>
            <ChevronDownIcon class="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Meters Section -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Лічільники</h2>
            <p class="text-gray-600">Керуйте лічільниками та показаннями</p>
          </div>
          <div style="width: 190px;">
            <PrimaryButton @click="addMeter" class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 h-10 flex items-center justify-center space-x-2 font-medium text-base">
              <PlusIcon class="h-4 w-4" />
              <span>Додати лічільник</span>
            </PrimaryButton>
          </div>
        </div>

        <!-- Meters Container -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <nav class="flex">
              <button
                v-for="utilityType in utilityTypes"
                :key="utilityType.id"
                @click="activeTab = utilityType.id"
                :class="[
                  'flex items-center space-x-2 px-4 py-3 text-sm font-medium',
                  activeTab === utilityType.id
                    ? 'bg-yellow-50 border-b-2 border-yellow-400 text-gray-800'
                    : 'text-gray-600 hover:text-gray-800'
                ]"
              >
                <component :is="utilityType.icon" :class="['h-3.5 w-3.5', utilityType.color]" />
                <span>{{ utilityType.name }}</span>
              </button>
            </nav>
          </div>

          <!-- Reading Form -->
          <div class="bg-gray-50 border-b border-gray-200 p-4">
            <div class="flex items-end space-x-4">
              <div class="flex-1">
                <TextInput
                  v-model="currentReading"
                  label="Поточні показання"
                  placeholder="Введіть поточні показання"
                  class="w-full"
                />
              </div>
              <div class="w-40">
                <TextInput
                  v-model="readingDate"
                  type="date"
                  label="Дата показань"
                  class="w-full"
                />
              </div>
              <div class="pb-2" style="width: 169px;">
                <PrimaryButton @click="submitReading" class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 h-10 font-medium text-base">
                  Внести показання
                </PrimaryButton>
              </div>
            </div>
          </div>

          <!-- Meters Cards -->
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="meter in meters" 
                :key="meter.id"
                class="bg-white border border-gray-200 rounded-lg p-4"
              >
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div :class="['rounded-full p-2', meter.color]">
                      <component :is="meter.icon" class="h-4 w-4" />
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-800">{{ meter.type }}</h4>
                      <p class="text-xs text-gray-500">{{ meter.subtype }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-1">
                    <button @click="editMeter(meter.id)" class="p-1 text-gray-400 hover:text-gray-600">
                      <PencilSquareIcon class="h-4 w-4" />
                    </button>
                    <button @click="deleteMeter(meter.id)" class="p-1 text-gray-400 hover:text-gray-600">
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <!-- Details -->
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Номер лічільника:</span>
                    <span class="font-medium">{{ meter.number }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Дата встановлення:</span>
                    <span>{{ meter.installDate }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Тариф:</span>
                    <span class="font-medium">{{ meter.tariff }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Останні показання:</span>
                    <span class="font-medium">{{ meter.lastReading }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Дата показань:</span>
                    <span>{{ meter.readingDate }}</span>
                  </div>
                </div>

                <!-- Status -->
                <div class="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-normal bg-green-100 text-green-800">
                    {{ meter.status }}
                  </span>
                  <span class="text-xs text-gray-600">
                    Наступні показання: до {{ meter.nextReadingDate }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- History Section -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Історія показань</h3>
          <p class="text-sm text-gray-600">Історія показань лічільників за останні 12 місяців</p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип лічільника</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Номер лічільника</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Показання</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Різниця</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тариф</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сума</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(record, index) in readingsHistory" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center space-x-2">
                    <component :is="record.icon" class="h-3.5 w-3.5 text-yellow-600" />
                    <span>{{ record.type }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.number }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ record.reading }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.difference }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.tariff }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ record.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainLayout>
</template>