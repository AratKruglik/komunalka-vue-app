<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import TextInput from '../UI/forms/TextInput.vue'
import PrimaryButton from '../UI/buttons/PrimaryButton.vue'
import { ref } from 'vue'
import { 
  CpuChipIcon, 
  EllipsisHorizontalIcon, 
  PaperClipIcon, 
  MicrophoneIcon, 
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  TrashIcon,
  BoltIcon,
  CreditCardIcon,
  ClockIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline'

const searchQuery = ref('')
const messageInput = ref('')
const messages = ref([
  {
    id: 1,
    type: 'ai',
    content: 'Вітаю! Я AI помічник Komunalka. Я можу допомогти вам з питаннями щодо комунальних послуг, тарифів, показань лічильників та оплат. Чим можу допомогти сьогодні?',
    time: '09:30'
  },
  {
    id: 2,
    type: 'user',
    content: 'Як мені внести показання лічильника води?',
    time: '09:31'
  },
  {
    id: 3,
    type: 'ai',
    content: 'Щоб внести показання лічильника води, вам потрібно:\n\n1. Перейти в розділ "Внести показання"\n2. Обрати вашу адресу\n3. Знайти блок "Холодна вода" або "Гаряча вода"\n4. Ввести поточні показання лічильника\n5. Завантажити фото лічильника (за бажанням)\n6. Натиснути "Зберегти показання"\n\nЧи хочете ви перейти до розділу "Внести показання" зараз?',
    time: '09:32',
    showButtons: true
  },
  {
    id: 4,
    type: 'user',
    content: 'Які тарифи на електроенергію зараз?',
    time: '09:33'
  },
  {
    id: 5,
    type: 'ai',
    content: '',
    time: '',
    isTyping: true
  }
])

const conversationHistory = ref([
  {
    id: 1,
    title: 'Питання про тарифи на газ',
    preview: 'Я запитував про актуальні тарифи на газ та умови оплати...',
    date: 'Вчора'
  },
  {
    id: 2,
    title: 'Проблема з оплатою',
    preview: 'У мене не проходить оплата за електроенергію, потрібна допомога...',
    date: '15.06.2023'
  },
  {
    id: 3,
    title: 'Консультація щодо субсидій',
    preview: 'Як оформити субсидію на комунальні послуги...',
    date: '10.06.2023'
  }
])

const knowledgeBase = ref([
  {
    id: 1,
    title: 'Тарифи на комунальні послуги',
    description: 'Актуальна інформація про тарифи на електроенергію, газ, воду та опалення'
  },
  {
    id: 2,
    title: 'Як правильно знімати показання лічильників',
    description: 'Інструкції та рекомендації щодо зняття показань різних типів лічильників'
  },
  {
    id: 3,
    title: 'Оплата комунальних послуг',
    description: 'Способи оплати, терміни та рекомендації щодо своєчасної оплати'
  }
])

const faqItems = ref([
  {
    id: 1,
    question: 'Як часто потрібно передавати показання лічильників?',
    isOpen: false
  },
  {
    id: 2,
    question: 'Що робити, якщо я забув передати показання?',
    isOpen: false
  },
  {
    id: 3,
    question: 'Як розрахувати споживання електроенергії?',
    isOpen: false
  },
  {
    id: 4,
    question: 'Як отримати субсидію на оплату комунальних послуг?',
    isOpen: false
  }
])

const quickResponses = ['Тарифи', 'Показання', 'Оплата', 'Субсидії']

const toggleFaq = (id) => {
  const item = faqItems.value.find(item => item.id === id)
  if (item) {
    item.isOpen = !item.isOpen
  }
}

const sendMessage = () => {
  if (messageInput.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      type: 'user',
      content: messageInput.value,
      time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    })
    messageInput.value = ''
  }
}

const handleQuickResponse = (response) => {
  messageInput.value = response
  sendMessage()
}
</script>

<template>
  <MainLayout>
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Main Chat Area -->
        <div class="xl:col-span-2 space-y-6">
          <!-- Chat Container -->
          <div class="bg-white rounded-lg shadow-sm">
            <!-- Chat Header -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <CpuChipIcon class="w-6 h-6 text-gray-800" />
                    </div>
                  <div>
                    <h1 class="text-xl font-bold text-gray-800">AI Помічник</h1>
                    <p class="text-sm text-gray-600">Задайте питання щодо комунальних послуг</p>
                  </div>
                </div>
                <button class="p-1">
                  <EllipsisHorizontalIcon class="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="p-6 h-[500px] overflow-y-auto">
              <div class="space-y-4">
                <div v-for="message in messages" :key="message.id" class="flex" :class="message.type === 'user' ? 'justify-end' : 'justify-start'">
                  <!-- AI Message -->
                  <div v-if="message.type === 'ai'" class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CpuChipIcon class="w-5 h-5 text-gray-800" />
                    </div>
                    <div class="max-w-lg">
                      <div class="bg-yellow-100 rounded-lg p-3">
                        <div v-if="message.isTyping" class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                          <div class="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
                          <div class="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
                        </div>
                        <div v-else>
                          <p class="text-gray-800 whitespace-pre-line">{{ message.content }}</p>
                          <!-- Action Buttons for specific messages -->
                          <div v-if="message.showButtons" class="mt-3 flex flex-wrap gap-2">
                            <button class="bg-primary-500 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-primary-400">
                              Перейти до внесення показань
                            </button>
                            <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300">
                              Ні, дякую
                            </button>
                          </div>
                        </div>
                      </div>
                      <span v-if="!message.isTyping" class="text-xs text-gray-500 mt-1 block">{{ message.time }}</span>
                    </div>
                  </div>

                  <!-- User Message -->
                  <div v-else class="flex items-start space-x-3 justify-end">
                    <div class="max-w-lg">
                      <div class="bg-gray-100 rounded-lg p-3">
                        <p class="text-gray-800">{{ message.content }}</p>
                      </div>
                      <span class="text-xs text-gray-500 mt-1 block text-right">{{ message.time }}</span>
                    </div>
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-sm font-medium">ОП</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="p-6 border-t border-gray-200">
              <div class="relative">
                <div class="flex items-center bg-white border border-gray-300 rounded-lg">
                  <button class="p-3 text-gray-400 hover:text-gray-600">
                    <PaperClipIcon class="w-5 h-5" />
                  </button>
                  <input 
                    v-model="messageInput"
                    type="text" 
                    placeholder="Задати питання..."
                    class="flex-1 p-3 border-0 focus:ring-0 focus:outline-none"
                    @keypress.enter="sendMessage"
                  />
                  <button class="p-3 text-gray-400 hover:text-gray-600">
                    <MicrophoneIcon class="w-5 h-5" />
                  </button>
                  <button 
                    @click="sendMessage"
                    class="bg-primary-500 p-3 rounded-r-lg hover:bg-primary-400"
                  >
                    <PaperAirplaneIcon class="w-5 h-5 text-gray-800" />
                  </button>
                </div>
              </div>
              
              <!-- Quick Responses -->
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xs text-gray-500">Швидкі відповіді:</span>
                <div class="flex space-x-4">
                  <button 
                    v-for="response in quickResponses" 
                    :key="response"
                    @click="handleQuickResponse(response)"
                    class="text-xs text-gray-500 hover:text-gray-700"
                  >
                    {{ response }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Conversation History -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-800">Історія розмов</h2>
                <button class="text-sm text-blue-600 hover:text-blue-800">Показати всі</button>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <div v-for="conversation in conversationHistory" :key="conversation.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-800">{{ conversation.title }}</h3>
                    <p class="text-sm text-gray-600 mt-1">{{ conversation.preview }}</p>
                  </div>
                  <span class="text-xs text-gray-500">{{ conversation.date }}</span>
                </div>
              </div>
            </div>
            <div class="p-6 border-t border-gray-200 text-center">
              <button class="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-800 mx-auto">
                <TrashIcon class="w-4 h-4" />
                <span>Очистити історію</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Search -->
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Пошук у базі знань..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <!-- Knowledge Base -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <BookOpenIcon class="w-5 h-5 text-gray-800" />
                </div>
                <h2 class="text-lg font-bold text-gray-800">База знань</h2>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <div v-for="article in knowledgeBase" :key="article.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 class="font-medium text-gray-800 mb-2">{{ article.title }}</h3>
                <p class="text-sm text-gray-600 mb-3">{{ article.description }}</p>
                <button class="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                  <span>Детальніше</span>
                  <ChevronRightIcon class="w-3 h-3" />
                </button>
              </div>
            </div>
            <div class="p-6 border-t border-gray-200 text-center">
              <button class="flex items-center justify-center space-x-1 text-sm text-blue-600 hover:text-blue-800 mx-auto">
                <span>Переглянути всі статті</span>
                <ChevronRightIcon class="w-3 h-3" />
              </button>
            </div>
          </div>

          <!-- FAQ -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <QuestionMarkCircleIcon class="w-5 h-5 text-gray-800" />
                </div>
                <h2 class="text-lg font-bold text-gray-800">Часті питання</h2>
              </div>
            </div>
            <div class="p-6 space-y-2">
              <div v-for="item in faqItems" :key="item.id" class="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  @click="toggleFaq(item.id)"
                  class="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span class="font-medium text-gray-800">{{ item.question }}</span>
                  <ChevronDownIcon class="w-5 h-5 text-gray-400" :class="{ 'transform rotate-180': item.isOpen }" />
                </button>
              </div>
            </div>
            <div class="p-6 border-t border-gray-200 text-center">
              <button class="flex items-center justify-center space-x-1 text-sm text-blue-600 hover:text-blue-800 mx-auto">
                <span>Переглянути всі питання</span>
                <ChevronRightIcon class="w-3 h-3" />
              </button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-bold text-gray-800">Швидкі дії</h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-4">
                <button class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 text-center">
                  <BoltIcon class="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <span class="text-sm text-gray-700">Внести показання</span>
                </button>
                <button class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 text-center">
                  <CreditCardIcon class="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <span class="text-sm text-gray-700">Оплатити рахунки</span>
                </button>
                <button class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 text-center">
                  <ClockIcon class="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <span class="text-sm text-gray-700">Історія платежів</span>
                </button>
                <button class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 text-center">
                  <DocumentIcon class="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <span class="text-sm text-gray-700">Мої рахунки</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Custom scrollbar for chat area */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>