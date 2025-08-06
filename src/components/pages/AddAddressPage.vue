<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import TextInput from '../UI/forms/TextInput.vue'
import PrimaryButton from '../UI/buttons/PrimaryButton.vue'
import { 
  HomeIcon, 
  MapPinIcon, 
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { 
  BuildingOffice2Icon,
  CheckCircleIcon 
} from '@heroicons/vue/24/solid'

const router = useRouter()

// Step management
const currentStep = ref(1)
const totalSteps = 3
const completedSteps = ref(new Set())
const stepErrors = ref(new Set())

// Form data
const propertyType = ref('')
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

// Step definitions
const steps = ref([
  {
    id: 1,
    title: 'Тип нерухомості',
    description: 'Оберіть тип вашої нерухомості',
    icon: HomeIcon,
    fields: ['propertyType']
  },
  {
    id: 2,
    title: 'Адреса',
    description: 'Введіть детальну адресу',
    icon: MapPinIcon,
    fields: ['region', 'city', 'street', 'houseNumber', 'apartmentNumber', 'postalCode']
  },
  {
    id: 3,
    title: 'Підтвердження',
    description: 'Перевірте та збережіть',
    icon: CheckIcon,
    fields: []
  }
])

// Computed properties
const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === totalSteps)
const canProceed = computed(() => validateCurrentStep())
const progressPercentage = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100)

// Step status computed
const getStepStatus = computed(() => (stepId) => {
  if (completedSteps.value.has(stepId)) return 'completed'
  if (currentStep.value === stepId) return 'current'
  if (stepErrors.value.has(stepId)) return 'error'
  return 'pending'
})

// Watch for step changes to validate
watch(currentStep, (newStep, oldStep) => {
  if (oldStep && validateStep(oldStep)) {
    completedSteps.value.add(oldStep)
    stepErrors.value.delete(oldStep)
  }
}, { immediate: false })

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
  clearFieldError('region')
}

// Enhanced validation functions
const validateStep = (stepId) => {
  const step = steps.value.find(s => s.id === stepId)
  if (!step) return true
  
  errors.value = {}
  let isValid = true
  
  step.fields.forEach(field => {
    const value = eval(field + '.value')
    if (!value) {
      isValid = false
      switch (field) {
        case 'propertyType':
          errors.value[field] = "Оберіть тип нерухомості"
          break
        case 'region':
          errors.value[field] = "Оберіть область"
          break
        case 'city':
          errors.value[field] = "Введіть назву міста"
          break
        case 'street':
          errors.value[field] = "Введіть назву вулиці"
          break
        case 'houseNumber':
          errors.value[field] = "Введіть номер будинку"
          break
        case 'apartmentNumber':
          errors.value[field] = "Введіть номер квартири/офісу"
          break
        case 'postalCode':
          errors.value[field] = "Введіть поштовий індекс"
          break
      }
    }
  })
  
  // Special validation for postal code
  if (stepId === 2 && postalCode.value && !/^\d{5}$/.test(postalCode.value)) {
    errors.value.postalCode = "Поштовий індекс повинен містити 5 цифр"
    isValid = false
  }
  
  if (!isValid) {
    stepErrors.value.add(stepId)
  } else {
    stepErrors.value.delete(stepId)
  }
  
  return isValid
}

const validateCurrentStep = () => {
  return validateStep(currentStep.value)
}

const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// Step navigation functions
const nextStep = () => {
  if (validateCurrentStep() && !isLastStep.value) {
    completedSteps.value.add(currentStep.value)
    currentStep.value++
  }
}

const prevStep = () => {
  if (!isFirstStep.value) {
    currentStep.value--
  }
}

const goToStep = (stepId) => {
  // Allow going to previous steps or current step
  if (stepId <= currentStep.value || completedSteps.value.has(stepId - 1)) {
    currentStep.value = stepId
  }
}

const handleSubmit = () => {
  if (validateStep(1) && validateStep(2)) {
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

// Property type options
const propertyTypes = [
  { value: 'apartment', label: 'Квартира', icon: BuildingOffice2Icon },
  { value: 'house', label: 'Приватний будинок', icon: HomeIcon },
  { value: 'office', label: 'Офіс', icon: BuildingOfficeIcon }
]
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

      <!-- Enhanced Progress Stepper -->
      <div class="px-6 py-8 border-b border-gray-200">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="relative max-w-full overflow-hidden">
            <div class="flex items-center justify-between mb-4 space-x-2 sm:space-x-4">
              <div 
                v-for="(step, index) in steps" 
                :key="step.id"
                class="flex flex-col items-center relative min-w-0 flex-1"
              >
                <!-- Step Circle -->
                <button
                  @click="goToStep(step.id)"
                  :disabled="step.id > currentStep && !completedSteps.has(step.id - 1)"
                  class="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                  :class="{
                    // Current step
                    'bg-yellow-400 border-yellow-400 text-gray-900 shadow-lg': getStepStatus(step.id) === 'current',
                    // Completed step
                    'bg-green-500 border-green-500 text-white shadow-lg': getStepStatus(step.id) === 'completed',
                    // Error step
                    'bg-red-500 border-red-500 text-white shadow-lg': getStepStatus(step.id) === 'error',
                    // Pending step
                    'bg-gray-100 border-gray-300 text-gray-500': getStepStatus(step.id) === 'pending',
                    // Clickable
                    'cursor-pointer': step.id <= currentStep || completedSteps.has(step.id - 1),
                    // Disabled
                    'cursor-not-allowed opacity-50': step.id > currentStep && !completedSteps.has(step.id - 1)
                  }"
                >
                  <!-- Step Icon -->
                  <CheckCircleIcon 
                    v-if="getStepStatus(step.id) === 'completed'" 
                    class="h-6 w-6" 
                  />
                  <ExclamationTriangleIcon 
                    v-else-if="getStepStatus(step.id) === 'error'" 
                    class="h-6 w-6" 
                  />
                  <component 
                    v-else 
                    :is="step.icon" 
                    class="h-6 w-6" 
                  />
                </button>

                <!-- Step Info -->
                <div class="mt-3 text-center w-full">
                  <div 
                    class="text-xs sm:text-sm font-semibold truncate px-1"
                    :class="{
                      'text-yellow-600': getStepStatus(step.id) === 'current',
                      'text-green-600': getStepStatus(step.id) === 'completed',
                      'text-red-600': getStepStatus(step.id) === 'error',
                      'text-gray-600': getStepStatus(step.id) === 'pending'
                    }"
                  >
                    {{ step.title }}
                  </div>
                  <div 
                    class="text-xs mt-1 truncate px-1 hidden sm:block"
                    :class="{
                      'text-yellow-500': getStepStatus(step.id) === 'current',
                      'text-green-500': getStepStatus(step.id) === 'completed',
                      'text-red-500': getStepStatus(step.id) === 'error',
                      'text-gray-400': getStepStatus(step.id) === 'pending'
                    }"
                  >
                    {{ step.description }}
                  </div>
                </div>

                <!-- Progress Line -->
                <div 
                  v-if="index < steps.length - 1"
                  class="absolute top-6 left-1/2 h-1 transform -translate-y-1/2 hidden sm:block"
                  :class="{
                    'bg-green-400': completedSteps.has(step.id),
                    'bg-yellow-400': currentStep === step.id + 1,
                    'bg-gray-200': currentStep <= step.id && !completedSteps.has(step.id)
                  }"
                  style="margin-left: 1.5rem; width: calc(100% - 1.5rem);"
                />
              </div>
            </div>

            <!-- Overall Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-2 mt-6">
                          <div 
              class="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full"
              :style="{ width: `${progressPercentage}%` }"
            />
            </div>
          </div>
        </div>

        <!-- Step Status Indicators -->
        <div class="flex justify-center flex-wrap gap-4 sm:gap-8 text-sm">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span class="text-gray-600">Завершено</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span class="text-gray-600">Поточний</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span class="text-gray-600">Очікує</span>
          </div>
        </div>
      </div>

      <!-- Form Steps -->
      <form @submit.prevent="handleSubmit" class="px-6 py-6">
        <div class="relative min-h-[500px]">
          <!-- Step 1: Property Type Selection -->
          <Transition
            name="slide-fade"
            mode="out-in"
            appear
          >
            <div v-if="currentStep === 1" class="space-y-8">
              <div class="text-center mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Оберіть тип нерухомості</h3>
                <p class="text-gray-600">Виберіть тип вашої нерухомості для точного розрахунку комунальних послуг</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label 
                  v-for="type in propertyTypes" 
                  :key="type.value"
                  class="relative cursor-pointer group"
                >
                  <input 
                    type="radio" 
                    name="propertyType" 
                    :value="type.value" 
                    v-model="propertyType"
                    @change="clearFieldError('propertyType')"
                    class="sr-only"
                  />
                  <div :class="[
                    'h-32 rounded-xl border-2 p-6 flex flex-col items-center justify-center',
                    propertyType === type.value 
                      ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md ring-2 ring-yellow-200' 
                      : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                  ]">
                    <component 
                      :is="type.icon" 
                      :class="[
                        'h-10 w-10 mb-3',
                        propertyType === type.value ? 'text-yellow-600' : 'text-gray-700'
                      ]" 
                    />
                    <span :class="[
                      'text-base font-medium',
                      propertyType === type.value ? 'text-yellow-800' : 'text-gray-900'
                    ]">
                      {{ type.label }}
                    </span>
                    
                    <!-- Selection checkmark -->
                    <div 
                      v-if="propertyType === type.value"
                      class="absolute top-3 right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <CheckIcon class="h-4 w-4 text-white" />
                    </div>
                  </div>
                </label>
              </div>
              
              <div v-if="errors.propertyType" class="flex items-center justify-center">
                <p class="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                  <ExclamationTriangleIcon class="h-4 w-4 inline mr-2" />
                  {{ errors.propertyType }}
                </p>
              </div>
            </div>
          </Transition>

          <!-- Step 2: Address Details -->
          <Transition
            name="slide-fade"
            mode="out-in"
            appear
          >
            <div v-if="currentStep === 2" class="space-y-6">
              <div class="text-center mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Введіть адресу</h3>
                <p class="text-gray-600">Заповніть детальну інформацію про місцезнаходження вашої нерухомості</p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Region -->
                <div class="lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Область <span class="text-red-600">*</span>
                  </label>
                  <div class="relative">
                    <button
                      type="button"
                      @click="isRegionDropdownOpen = !isRegionDropdownOpen"
                      class="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    >
                      <span :class="region ? 'text-gray-900' : 'text-gray-400'">
                        {{ region || 'Оберіть область' }}
                      </span>
                      <ChevronDownIcon class="h-4 w-4 text-gray-700" />
                    </button>
                    
                    <!-- Dropdown -->
                    <div v-if="isRegionDropdownOpen" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div class="py-1 max-h-48 overflow-y-auto">
                        <button
                          v-for="regionOption in regions"
                          :key="regionOption"
                          type="button"
                          @click="selectRegion(regionOption)"
                          class="w-full px-4 py-2 text-left hover:bg-yellow-50 text-gray-900"
                        >
                          {{ regionOption }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p v-if="errors.region" class="mt-2 text-sm text-red-600">{{ errors.region }}</p>
                </div>

                <!-- City -->
                <div class="lg:col-span-2">
                  <TextInput
                    v-model="city"
                    label="Місто/Населений пункт"
                    placeholder="Введіть назву міста або населеного пункту"
                    required
                    :error="errors.city"
                    @input="clearFieldError('city')"
                  />
                </div>

                <!-- Street -->
                <div class="lg:col-span-2">
                  <TextInput
                    v-model="street"
                    label="Вулиця"
                    placeholder="Введіть назву вулиці"
                    required
                    :error="errors.street"
                    @input="clearFieldError('street')"
                  />
                </div>

                <!-- House Number -->
                <div>
                  <TextInput
                    v-model="houseNumber"
                    label="Номер будинку"
                    placeholder="Введіть номер будинку"
                    required
                    :error="errors.houseNumber"
                    @input="clearFieldError('houseNumber')"
                  />
                </div>

                <!-- Apartment/Office Number -->
                <div>
                  <TextInput
                    v-model="apartmentNumber"
                    label="Номер квартири/офісу"
                    placeholder="Введіть номер квартири або офісу"
                    required
                    :error="errors.apartmentNumber"
                    @input="clearFieldError('apartmentNumber')"
                  />
                </div>

                <!-- Postal Code -->
                <div class="lg:col-span-2">
                  <TextInput
                    v-model="postalCode"
                    label="Поштовий індекс"
                    placeholder="Введіть поштовий індекс (5 цифр)"
                    required
                    :error="errors.postalCode"
                    @input="clearFieldError('postalCode')"
                  />
                </div>

                <!-- Additional Notes -->
                <div class="lg:col-span-2">
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
                <div class="lg:col-span-2">
                  <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                      type="checkbox"
                      id="primaryAddress"
                      v-model="isPrimaryAddress"
                      class="h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 focus:ring-2"
                    />
                    <label for="primaryAddress" class="text-base text-gray-700 font-medium">
                      Встановити як основну адресу
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Step 3: Confirmation -->
          <Transition
            name="slide-fade"
            mode="out-in"
            appear
          >
            <div v-if="currentStep === 3" class="space-y-8">
              <div class="text-center mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Підтвердження</h3>
                <p class="text-gray-600">Перевірте введені дані перед збереженням</p>
              </div>

              <!-- Summary Card -->
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
                  Резюме адреси
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-3">
                    <div>
                      <span class="text-sm font-medium text-gray-600">Тип нерухомості:</span>
                      <p class="text-gray-900">{{ propertyTypes.find(t => t.value === propertyType)?.label || 'Не вибрано' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-600">Область:</span>
                      <p class="text-gray-900">{{ region || 'Не вибрано' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-600">Місто:</span>
                      <p class="text-gray-900">{{ city || 'Не вказано' }}</p>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <div>
                      <span class="text-sm font-medium text-gray-600">Адреса:</span>
                      <p class="text-gray-900">
                        {{ street || 'Не вказано' }}{{ houseNumber ? `, ${houseNumber}` : '' }}{{ apartmentNumber ? `, кв. ${apartmentNumber}` : '' }}
                      </p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-600">Поштовий індекс:</span>
                      <p class="text-gray-900">{{ postalCode || 'Не вказано' }}</p>
                    </div>
                    <div v-if="additionalNotes">
                      <span class="text-sm font-medium text-gray-600">Примітки:</span>
                      <p class="text-gray-900">{{ additionalNotes }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="isPrimaryAddress" class="mt-4 p-3 bg-yellow-200 rounded-lg">
                  <p class="text-sm text-yellow-800 font-medium flex items-center">
                    <CheckIcon class="h-4 w-4 mr-2" />
                    Буде встановлено як основна адреса
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation Buttons -->
        <div class="border-t border-gray-200 pt-6 px-6">
          <div class="flex justify-between items-center">
            <!-- Previous Button -->
            <button
              v-if="!isFirstStep"
              type="button"
              @click="prevStep"
              class="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              <ChevronLeftIcon class="h-4 w-4 mr-2" />
              Назад
            </button>
            <div v-else></div>

            <div class="flex space-x-4">
              <!-- Cancel Button -->
              <button
                type="button"
                @click="handleCancel"
                class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Скасувати
              </button>

              <!-- Next/Submit Button -->
              <PrimaryButton
                v-if="!isLastStep"
                type="button"
                @click="nextStep"
                :disabled="!canProceed"
                class="!w-auto flex items-center px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Далі
                <ChevronRightIcon class="h-4 w-4 ml-2" />
              </PrimaryButton>
              
              <button
                v-else
                type="submit"
                class="flex items-center px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
              >
                <CheckIcon class="h-4 w-4 mr-2" />
                Зберегти адресу
              </button>
            </div>
          </div>

          <!-- Required fields note -->
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-500">
              <span class="text-red-600">*</span> Обов'язкові поля
            </p>
          </div>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Slide fade transitions for step content only */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>