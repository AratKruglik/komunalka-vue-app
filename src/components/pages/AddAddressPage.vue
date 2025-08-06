<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import TextInput from '../UI/forms/TextInput.vue'
import { 
  HomeIcon, 
  MapPinIcon, 
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline'
import { BuildingOffice2Icon } from '@heroicons/vue/24/solid'

const router = useRouter()

// Form data
const propertyType = ref('apartment')
const region = ref('')
const city = ref('')
const street = ref('')
const houseNumber = ref('')
const apartmentNumber = ref('')
const postalCode = ref('')
const additionalNotes = ref('')
const isPrimaryAddress = ref(false)

// Form validation
const errors = ref({})

// Region dropdown
const isRegionDropdownOpen = ref(false)
const regions = [
  'Київська область',
  'Львівська область',
  'Харківська область',
  'Одеська область',
  'Дніпропетровська область'
]

const selectRegion = (selectedRegion) => {
  region.value = selectedRegion
  isRegionDropdownOpen.value = false
}

const validateForm = () => {
  errors.value = {}
  
  if (!propertyType.value) errors.value.propertyType = "Оберіть тип нерухомості"
  if (!region.value) errors.value.region = "Оберіть область"
  if (!city.value) errors.value.city = "Введіть назву міста"
  if (!street.value) errors.value.street = "Введіть назву вулиці"
  if (!houseNumber.value) errors.value.houseNumber = "Введіть номер будинку"
  if (!apartmentNumber.value) errors.value.apartmentNumber = "Введіть номер квартири/офісу"
  if (!postalCode.value) errors.value.postalCode = "Введіть поштовий індекс"
  if (postalCode.value && !/^\d{5}$/.test(postalCode.value)) {
    errors.value.postalCode = "Поштовий індекс повинен містити 5 цифр"
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    // Handle form submission
    console.log('Form submitted', {
      propertyType: propertyType.value,
      region: region.value,
      city: city.value,
      street: street.value,
      houseNumber: houseNumber.value,
      apartmentNumber: apartmentNumber.value,
      postalCode: postalCode.value,
      additionalNotes: additionalNotes.value,
      isPrimaryAddress: isPrimaryAddress.value
    })
    
    // Navigate back or show success message
    router.push('/')
  }
}

const handleCancel = () => {
  router.back()
}
</script>

<template>
  <MainLayout>
    <!-- Breadcrumb -->
    <div class="mb-6">
      <nav class="flex items-center space-x-2 text-sm text-gray-500">
        <span>Головна</span>
        <ChevronRightIcon class="h-3 w-3" />
        <span>Мої адреси</span>
        <ChevronRightIcon class="h-3 w-3" />
        <span class="text-gray-700 font-medium">Додати адресу</span>
      </nav>
    </div>

    <!-- Main content card -->
    <div class="bg-white rounded-lg shadow-sm">
      <!-- Header -->
      <div class="px-6 py-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Додати нову адресу</h1>
        <p class="text-gray-600">
          Заповніть форму нижче, щоб додати нову адресу для обліку комунальних послуг
        </p>
      </div>

      <!-- Progress indicators -->
      <div class="px-6 py-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <!-- Property Type Step -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
              <HomeIcon class="h-6 w-6 text-gray-900" />
            </div>
            <span class="text-sm font-medium text-black">Тип нерухомості</span>
          </div>
          
          <!-- Progress line 1 -->
          <div class="flex-1 h-1 bg-yellow-400 mx-4"></div>
          
          <!-- Address Step -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
              <MapPinIcon class="h-6 w-6 text-gray-900" />
            </div>
            <span class="text-sm font-medium text-black">Адреса</span>
          </div>
          
          <!-- Progress line 2 -->
          <div class="flex-1 h-1 bg-gray-200 mx-4"></div>
          
          <!-- Confirmation Step -->
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <CheckIcon class="h-4 w-4 text-gray-500" />
            </div>
            <span class="text-sm font-medium text-black">Підтвердження</span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="px-6 py-6">
        <!-- Property Type Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Тип нерухомості <span class="text-red-600">*</span>
          </label>
          <div class="grid grid-cols-3 gap-4">
            <!-- Apartment -->
            <label class="relative">
              <input 
                type="radio" 
                name="propertyType" 
                value="apartment" 
                v-model="propertyType"
                class="sr-only"
              />
              <div :class="[
                'h-26 rounded-lg border-2 p-4 cursor-pointer transition-colors flex flex-col items-center justify-center',
                propertyType === 'apartment' 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              ]">
                <BuildingOffice2Icon class="h-8 w-8 text-gray-700 mb-3" />
                <span class="text-base font-medium text-black">Квартира</span>
              </div>
            </label>

            <!-- Private House -->
            <label class="relative">
              <input 
                type="radio" 
                name="propertyType" 
                value="house" 
                v-model="propertyType"
                class="sr-only"
              />
              <div :class="[
                'h-26 rounded-lg border-2 p-4 cursor-pointer transition-colors flex flex-col items-center justify-center',
                propertyType === 'house' 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              ]">
                <HomeIcon class="h-8 w-8 text-gray-700 mb-3" />
                <span class="text-base font-medium text-black">Приватний будинок</span>
              </div>
            </label>

            <!-- Office -->
            <label class="relative">
              <input 
                type="radio" 
                name="propertyType" 
                value="office" 
                v-model="propertyType"
                class="sr-only"
              />
              <div :class="[
                'h-26 rounded-lg border-2 p-4 cursor-pointer transition-colors flex flex-col items-center justify-center',
                propertyType === 'office' 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              ]">
                <BuildingOfficeIcon class="h-8 w-8 text-gray-700 mb-3" />
                <span class="text-base font-medium text-black">Офіс</span>
              </div>
            </label>
          </div>
          <p v-if="errors.propertyType" class="mt-2 text-sm text-red-600">{{ errors.propertyType }}</p>
        </div>

        <!-- Region -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Область <span class="text-red-600">*</span>
          </label>
          <div class="relative">
            <button
              type="button"
              @click="isRegionDropdownOpen = !isRegionDropdownOpen"
              class="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <span :class="region ? 'text-black' : 'text-gray-400'">
                {{ region || 'Оберіть область' }}
              </span>
              <ChevronDownIcon class="h-4 w-4 text-gray-700" />
            </button>
            
            <!-- Dropdown -->
            <div v-if="isRegionDropdownOpen" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div class="py-1">
                <button
                  v-for="regionOption in regions"
                  :key="regionOption"
                  type="button"
                  @click="selectRegion(regionOption)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-900"
                >
                  {{ regionOption }}
                </button>
              </div>
            </div>
          </div>
          <p v-if="errors.region" class="mt-2 text-sm text-red-600">{{ errors.region }}</p>
        </div>

        <!-- City -->
        <div class="mb-6">
          <TextInput
            v-model="city"
            label="Місто/Населений пункт"
            placeholder="Введіть назву міста або населеного пункту"
            required
            :error="errors.city"
          />
        </div>

        <!-- Street -->
        <div class="mb-6">
          <TextInput
            v-model="street"
            label="Вулиця"
            placeholder="Введіть назву вулиці"
            required
            :error="errors.street"
          />
        </div>

        <!-- House Number -->
        <div class="mb-6">
          <TextInput
            v-model="houseNumber"
            label="Номер будинку"
            placeholder="Введіть номер будинку"
            required
            :error="errors.houseNumber"
          />
        </div>

        <!-- Apartment/Office Number -->
        <div class="mb-6">
          <TextInput
            v-model="apartmentNumber"
            label="Номер квартири/офісу"
            placeholder="Введіть номер квартири або офісу"
            required
            :error="errors.apartmentNumber"
          />
        </div>

        <!-- Postal Code -->
        <div class="mb-6">
          <TextInput
            v-model="postalCode"
            label="Поштовий індекс"
            placeholder="Введіть поштовий індекс (5 цифр)"
            required
            :error="errors.postalCode"
          />
        </div>

        <!-- Additional Notes -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Додаткові примітки
          </label>
          <textarea
            v-model="additionalNotes"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
            placeholder="Додаткова інформація про адресу (необов'язково)"
          ></textarea>
        </div>

        <!-- Primary Address Checkbox -->
        <div class="mb-6">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="primaryAddress"
              v-model="isPrimaryAddress"
              class="h-5 w-5 text-yellow-400 border-black rounded focus:ring-yellow-400"
            />
            <label for="primaryAddress" class="ml-3 text-base text-gray-700">
              Встановити як основну адресу
            </label>
          </div>
        </div>

        <!-- Required fields note -->
        <div class="mb-8">
          <p class="text-sm text-gray-500">
            <span class="text-red-600">*</span> Обов'язкові поля
          </p>
        </div>

        <!-- Action buttons -->
        <div class="border-t border-gray-200 pt-6">
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="handleCancel"
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              class="px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            >
              Зберегти адресу
            </button>
          </div>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>