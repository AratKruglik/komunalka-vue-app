<script setup>
import { ref, computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import TextInput from '../UI/forms/TextInput.vue'
import { 
  ChevronDownIcon, 
  BoltIcon, 
  FireIcon, 
  BeakerIcon,
  CalendarIcon,
  CameraIcon,
  XMarkIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

// Form data
const selectedUtilityType = ref('electricity')
const serialNumber = ref('')
const model = ref('')
const installationDate = ref('')
const initialReading = ref('')
const currentTariff = ref('')
const location = ref('')
const photo = ref(null)
const notes = ref('')
const selectedAddress = ref('вул. Хрещатик, 22, кв. 15, м. Київ')

// Utility types configuration
const utilityTypes = [
  {
    id: 'electricity',
    name: 'Електролічильник',
    icon: BoltIcon,
    unit: 'кВт⋅год',
    color: 'bg-yellow-100 border-yellow-400'
  },
  {
    id: 'gas',
    name: 'Газовий лічильник',
    icon: FireIcon,
    unit: 'м³',
    color: 'bg-gray-100 border-gray-200'
  },
  {
    id: 'cold-water',
    name: 'Лічильник холодної води',
    icon: BeakerIcon,
    unit: 'м³',
    color: 'bg-gray-100 border-gray-200'
  },
  {
    id: 'hot-water',
    name: 'Лічильник гарячої води',
    icon: BeakerIcon,
    unit: 'м³',
    color: 'bg-gray-100 border-gray-200'
  }
]

// Computed properties
const selectedUtility = computed(() => {
  return utilityTypes.find(type => type.id === selectedUtilityType.value)
})

const formProgress = computed(() => {
  const fields = [selectedAddress.value, selectedUtilityType.value, serialNumber.value, installationDate.value, initialReading.value, currentTariff.value]
  const filledFields = fields.filter(field => field && field.trim() !== '').length
  return Math.round((filledFields / fields.length) * 100)
})

// Methods
const selectUtilityType = (typeId) => {
  selectedUtilityType.value = typeId
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    photo.value = file
  }
}

const clearForm = () => {
  selectedUtilityType.value = 'electricity'
  serialNumber.value = ''
  model.value = ''
  installationDate.value = ''
  initialReading.value = ''
  currentTariff.value = ''
  location.value = ''
  photo.value = null
  notes.value = ''
}

const cancel = () => {
  // Navigate back or show confirmation dialog
  console.log('Cancel form')
}

const saveDraft = () => {
  // Save form as draft
  console.log('Save draft')
}

const saveUtility = () => {
  // Save utility meter
  console.log('Save utility meter')
}
</script>

<template>
  <MainLayout>
    <div class="w-full">
      <!-- Breadcrumbs -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" class="text-gray-500 hover:text-gray-700">Головна</a>
          </li>
          <li class="text-gray-400">&gt;</li>
          <li>
            <a href="/utilities" class="text-gray-500 hover:text-gray-700">Лічильники</a>
          </li>
          <li class="text-gray-400">&gt;</li>
          <li>
            <span class="font-medium text-gray-700">Додати лічильник</span>
          </li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="mb-8">
        <div class="border-l-4 border-yellow-400 pl-4">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            Додати новий лічильник
          </h1>
        </div>
        <p class="text-gray-600 mt-4">
          Заповніть форму, щоб додати новий лічильник для обліку комунальних послуг
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <!-- Address Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Оберіть адресу
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative">
            <select 
              v-model="selectedAddress"
              class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="вул. Хрещатик, 22, кв. 15, м. Київ">вул. Хрещатик, 22, кв. 15, м. Київ</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Utility Type Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-6">
            Тип лічильника
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              v-for="utilityType in utilityTypes" 
              :key="utilityType.id"
              @click="selectUtilityType(utilityType.id)"
              :class="[
                'relative rounded-lg border-2 p-6 cursor-pointer hover:border-gray-300 transition-colors',
                selectedUtilityType === utilityType.id 
                  ? 'bg-yellow-50 border-yellow-400' 
                  : 'bg-white border-gray-200'
              ]"
            >
              <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <component :is="utilityType.icon" class="w-8 h-8 text-gray-600" />
                </div>
                <span class="text-base font-medium text-gray-800">
                  {{ utilityType.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Fields Grid -->
        <div class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Serial Number -->
              <div>
                <TextInput
                  v-model="serialNumber"
                  label="Серійний номер"
                  placeholder="Введіть серійний номер лічильника"
                  required
                />
                <p class="mt-1 text-xs text-gray-500">Приклад: AE123456789</p>
              </div>

              <!-- Model/Manufacturer -->
              <div>
                <TextInput
                  v-model="model"
                  label="Модель/Виробник"
                  placeholder="Введіть модель або виробника лічильника"
                />
              </div>

              <!-- Installation Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Дата встановлення
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="installationDate"
                    type="date"
                    class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <CalendarIcon class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <!-- Initial Reading -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Початкові показання
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="flex">
                  <input
                    v-model="initialReading"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="block w-full rounded-l-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span class="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-600 text-base">
                    {{ selectedUtility?.unit }}
                  </span>
                </div>
              </div>

              <!-- Current Tariff -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Поточний тариф (грн за одиницю)
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="flex">
                  <input
                    v-model="currentTariff"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="block w-full rounded-l-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span class="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-600 text-base">
                    грн
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Location -->
              <div>
                <TextInput
                  v-model="location"
                  label="Розташування лічильника"
                  placeholder="Наприклад: На кухні біля вхідних дверей"
                />
              </div>

              <!-- Photo Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Фото лічильника
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div class="text-center">
                    <CameraIcon class="mx-auto h-8 w-8 text-gray-400 mb-4" />
                    <p class="text-sm text-gray-500 mb-2">
                      Перетягніть фото сюди або натисніть для вибору
                    </p>
                    <p class="text-xs text-gray-400 mb-4">
                      Підтримувані формати: JPG, PNG, HEIC. Макс. розмір: 5MB
                    </p>
                    <label class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      <CameraIcon class="w-4 h-4 mr-2" />
                      Завантажити фото
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handlePhotoUpload"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Додаткові примітки
                </label>
                <textarea
                  v-model="notes"
                  rows="4"
                  placeholder="Будь-які додаткові деталі про лічильник"
                  class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <!-- Progress -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600">Заповнення форми</span>
                  <span class="text-sm text-gray-600">{{ formProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${formProgress}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="border-t border-gray-200 pt-6 mt-8">
          <div class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
            <!-- Left Actions -->
            <div class="flex gap-3">
              <button
                @click="cancel"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <XMarkIcon class="w-4 h-4 mr-2" />
                Скасувати
              </button>
              <button
                @click="clearForm"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowPathIcon class="w-4 h-4 mr-2" />
                Очистити форму
              </button>
            </div>

            <!-- Right Actions -->
            <div class="flex gap-3">
              <button
                @click="saveDraft"
                type="button"
                class="inline-flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <DocumentTextIcon class="w-4 h-4 mr-2" />
                Зберегти чернетку
              </button>
              <button
                @click="saveUtility"
                type="button"
                class="inline-flex items-center px-6 py-2.5 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <CheckIcon class="w-4 h-4 mr-2" />
                Зберегти лічильник
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>