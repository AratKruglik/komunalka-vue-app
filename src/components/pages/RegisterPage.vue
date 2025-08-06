<script setup>
import { ref, computed } from 'vue'
import { 
  BoltIcon,
  ChartBarIcon,
  BellIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CalculatorIcon
} from '@heroicons/vue/24/outline'
import FullLogo from '../UI/logo/FullLogo.vue'
import PrimaryButton from "../UI/buttons/PrimaryButton.vue"
import Checkbox from "../UI/forms/Checkbox.vue"
import TextInput from "../UI/forms/TextInput.vue"

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  language: 'Українська',
  receiveNews: false,
  agreeToTerms: false,
  agreeToPrivacy: false,
  captcha: false
})

// Password visibility is handled by TextInput component

// Password strength
const passwordStrength = computed(() => {
  const password = formData.value.password
  if (!password) return { strength: 'Не введено', percentage: 0, color: '#e0e0e0' }
  
  let score = 0
  let criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password)
  }
  
  if (criteria.length) score++
  if (criteria.uppercase) score++
  if (criteria.digit) score++
  
  const percentage = (score / 3) * 100
  
  if (score === 0) return { strength: 'Дуже слабкий', percentage, color: '#ff4d4d' }
  if (score === 1) return { strength: 'Слабкий', percentage, color: '#ff4d4d' }
  if (score === 2) return { strength: 'Середній', percentage, color: '#ffa500' }
  if (score === 3) return { strength: 'Сильний', percentage, color: '#4CAF50' }
  
  return { strength: 'Не введено', percentage: 0, color: '#e0e0e0' }
})

const passwordCriteria = computed(() => {
  const password = formData.value.password
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password)
  }
})

const handleSubmit = () => {
  console.log('Registration form submitted:', formData.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_10px_15px_0px_rgba(0,0,0,0.1)] w-[896px] min-h-[1470px] flex overflow-hidden">
      <!-- Left side - Registration Form -->
      <div class="w-[522.656px] bg-white flex flex-col">
        <div class="px-8 py-8 flex-1">
        <!-- Logo -->
        <div class="flex items-center gap-4 mb-16">
          <div class="w-[26px] h-[30px] flex items-center justify-center">
            <BoltIcon class="w-full h-full text-primary-500" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Комуналка</h1>
        </div>

        <!-- Main title -->
        <h2 class="text-2xl font-bold text-center text-black mb-16">Створити акаунт</h2>

        <!-- Social registration buttons -->
        <div class="space-y-3 mb-8">
          <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 16 16" class="w-4 h-4">
              <path d="M15.25 8.18125C15.25 12.6031 12.2219 15.75 7.75 15.75C3.4625 15.75 0 12.2875 0 8C0 3.7125 3.4625 0.25 7.75 0.25C9.8375 0.25 11.5937 1.01562 12.9469 2.27813L10.8375 4.30625C8.07812 1.64375 2.94688 3.64375 2.94688 8C2.94688 10.7031 5.10625 12.8938 7.75 12.8938C10.8187 12.8938 11.9687 10.6938 12.15 9.55313H7.75V6.8875H15.1281C15.2 7.28437 15.25 7.66562 15.25 8.18125Z" fill="#EF4444"/>
            </svg>
            <span class="text-black font-medium">Зареєструватися через Google</span>
          </button>

          <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 16 16" class="w-4 h-4">
              <path d="M15.75 8C15.75 3.71875 12.2812 0.25 8 0.25C3.71875 0.25 0.25 3.71875 0.25 8C0.25 11.8681 3.08406 15.0744 6.78906 15.6562V10.2403H4.82031V8H6.78906V6.2925C6.78906 4.35031 7.94531 3.2775 9.71625 3.2775C10.5644 3.2775 11.4513 3.42875 11.4513 3.42875V5.335H10.4738C9.51125 5.335 9.21094 5.9325 9.21094 6.54531V8H11.3603L11.0166 10.2403H9.21094V15.6562C12.9159 15.0744 15.75 11.8681 15.75 8Z" fill="#2563EB"/>
            </svg>
            <span class="text-black font-medium">Зареєструватися через Facebook</span>
          </button>

          <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 12 16" class="w-3 h-4">
              <path d="M9.95938 8.39688C9.95313 7.25 10.4719 6.38437 11.5219 5.74687C10.9344 4.90625 10.0469 4.44375 8.875 4.35313C7.76562 4.26563 6.55312 5 6.10938 5C5.64062 5 4.56562 4.38438 3.72187 4.38438C1.97812 4.4125 0.125 5.775 0.125 8.54688C0.125 9.36563 0.275 10.2115 0.575 11.0844C0.975 12.2313 2.41875 15.0437 3.925 14.9969C4.7125 14.9781 5.26875 14.4375 6.29375 14.4375C7.2875 14.4375 7.80312 14.9969 8.68125 14.9969C10.2 14.975 11.5062 12.4188 11.8875 11.2688C9.85 10.3094 9.95938 8.45625 9.95938 8.39688ZM8.19063 3.26562C9.04375 2.25312 8.96563 1.33125 8.94063 1C8.1875 1.04375 7.31562 1.5125 6.81875 2.09063C6.27187 2.70938 5.95 3.475 6.01875 4.3375C6.83438 4.4 7.57813 3.98125 8.19063 3.26562Z" fill="#1F2937"/>
            </svg>
            <span class="text-black font-medium">Зареєструватися через Apple</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="relative mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 text-sm text-gray-500">АБО</span>
          </div>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Personal Information Section -->
          <div>
            <h3 class="text-lg font-medium text-black mb-4">Особиста інформація</h3>
            
            <!-- First Name and Last Name -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <TextInput
                v-model="formData.firstName"
                type="text"
                label="Ім'я"
                required
              />
              <TextInput
                v-model="formData.lastName"
                type="text"
                label="Прізвище"
                required
              />
            </div>

            <!-- Email -->
            <div class="mb-4">
              <TextInput
                v-model="formData.email"
                type="email"
                label="Електронна пошта"
                placeholder="example@mail.com"
                required
              />
            </div>

            <!-- Phone -->
            <div class="mb-4">
              <TextInput
                v-model="formData.phone"
                type="tel"
                label="Номер телефону"
                placeholder="+380 XX XXX XX XX"
                required
              />
            </div>

            <!-- Password -->
            <div class="mb-4">
              <TextInput
                v-model="formData.password"
                type="password"
                label="Пароль"
                required
              />
              
              <!-- Password strength indicator -->
              <div class="mt-2">
                <div class="w-full bg-gray-200 rounded-sm h-1.5">
                  <div 
                    class="h-1.5 rounded-sm transition-all duration-300" 
                    :style="{ width: passwordStrength.percentage + '%', backgroundColor: passwordStrength.color }"
                  ></div>
                </div>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-xs text-gray-500">Надійність паролю:</span>
                  <span class="text-xs font-medium text-black">{{ passwordStrength.strength }}</span>
                </div>
              </div>
              
              <!-- Password criteria -->
              <ul class="mt-2 space-y-1">
                <li class="flex items-center text-xs text-gray-500">
                  <div 
                    class="w-3 h-3 rounded-full mr-2"
                    :class="passwordCriteria.length ? 'bg-green-500' : 'bg-gray-300'"
                  ></div>
                  Мінімум 8 символів
                </li>
                <li class="flex items-center text-xs text-gray-500">
                  <div 
                    class="w-3 h-3 rounded-full mr-2"
                    :class="passwordCriteria.uppercase ? 'bg-green-500' : 'bg-gray-300'"
                  ></div>
                  Мінімум 1 велика літера
                </li>
                <li class="flex items-center text-xs text-gray-500">
                  <div 
                    class="w-3 h-3 rounded-full mr-2"
                    :class="passwordCriteria.digit ? 'bg-green-500' : 'bg-gray-300'"
                  ></div>
                  Мінімум 1 цифра
                </li>
              </ul>
            </div>

            <!-- Confirm Password -->
            <div class="mb-6">
              <TextInput
                v-model="formData.confirmPassword"
                type="password"
                label="Підтвердити пароль"
                required
              />
            </div>
          </div>

          <!-- Account Settings Section -->
          <div>
            <h3 class="text-lg font-medium text-black mb-4">Налаштування облікового запису</h3>
            
            <!-- Language Selection -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Мова інтерфейсу</label>
              <select 
                v-model="formData.language"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option>Українська</option>
                <option>English</option>
                <option>Русский</option>
              </select>
            </div>

            <!-- Checkboxes -->
            <div class="space-y-4 mb-6">
              <label class="flex items-start gap-3">
                <input 
                  v-model="formData.receiveNews"
                  type="checkbox" 
                  class="mt-0.5 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                />
                <span class="text-sm text-gray-700 leading-5">
                  Отримувати новини та оновлення про комунальні послуги
                </span>
              </label>

              <label class="flex items-start gap-3">
                <input 
                  v-model="formData.agreeToTerms"
                  type="checkbox" 
                  required
                  class="mt-0.5 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                />
                <span class="text-sm leading-5">
                  <span class="text-gray-700">Я погоджуюся з</span>
                  <span class="text-primary-500"> умовами використання</span>
                  <span class="text-red-500"> *</span>
                </span>
              </label>

              <label class="flex items-start gap-3">
                <input 
                  v-model="formData.agreeToPrivacy"
                  type="checkbox" 
                  required
                  class="mt-0.5 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                />
                <span class="text-sm leading-5">
                  <span class="text-gray-700">Я погоджуюся з</span>
                  <span class="text-primary-500"> політикою конфіденційності</span>
                  <span class="text-red-500"> *</span>
                </span>
              </label>
            </div>
          </div>

          <!-- CAPTCHA -->
          <div class="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-700">Захист від роботів</span>
                        <button type="button" class="text-primary-500 hover:text-primary-600">
            <ArrowPathIcon class="w-4 h-4" />
          </button>
            </div>
            <div class="bg-white border border-gray-200 rounded p-4">
              <div class="flex items-center gap-3">
                <span class="text-sm text-gray-500">Я не робот</span>
                <input 
                  v-model="formData.captcha"
                  type="checkbox" 
                  required
                  class="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <PrimaryButton type="submit" class="w-full">
            Створити акаунт
          </PrimaryButton>

          <!-- Login Link -->
          <div class="text-center mt-4">
            <p class="text-sm">
              <span class="text-gray-600">Вже маєте акаунт?</span>
              <a href="/login" class="text-primary-500 font-medium hover:text-primary-600 ml-1">Увійти</a>
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- Right side - Benefits -->
    <div class="w-[373.328px] bg-[#fff2b2] px-8 py-8 flex flex-col justify-center">
      <div class="w-[309.328px] mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-12 text-center">Чому варто приєднатися?</h2>
        
        <ul class="space-y-8">
          <li class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <CalculatorIcon class="w-4 h-4 text-gray-800" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 text-base mb-2">Автоматичний розрахунок комунальних платежів</h3>
              <p class="text-sm text-gray-700 leading-5">Система автоматично розраховує ваші платежі на основі показників лічильників</p>
            </div>
          </li>

          <li class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <ChartBarIcon class="w-4 h-4 text-gray-800" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 text-base mb-2">Зручне відстеження споживання</h3>
              <p class="text-sm text-gray-700 leading-5">Відстежуйте своє споживання води, газу та електроенергії в режимі реального часу</p>
            </div>
          </li>

          <li class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <BellIcon class="w-4 h-4 text-gray-800" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 text-base mb-2">Нагадування про оплату</h3>
              <p class="text-sm text-gray-700 leading-5">Отримуйте своєчасні нагадування про необхідність оплати комунальних послуг</p>
            </div>
          </li>

          <li class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <ClockIcon class="w-4 h-4 text-gray-800" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 text-base mb-2">Детальна аналітика витрат</h3>
              <p class="text-sm text-gray-700 leading-5">Аналізуйте свої витрати за допомогою зручних графіків та діаграм</p>
            </div>
          </li>

          <li class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <ShieldCheckIcon class="w-4 h-4 text-gray-800" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 text-base mb-2">Безпечне зберігання даних</h3>
              <p class="text-sm text-gray-700 leading-5">Ваші особисті дані та історія платежів надійно захищені</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>