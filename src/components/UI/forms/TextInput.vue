<script setup>
import { computed, ref } from 'vue'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const showPassword = ref(false)
const inputRef = ref(null)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }
  return sizes[props.size]
})

const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6'
  
  if (props.error) {
    return `${baseClasses} ring-red-300 placeholder:text-red-300 focus:ring-red-500 ${sizeClasses.value}`
  }
  
  return `${baseClasses} ring-gray-300 placeholder:text-gray-400 focus:ring-primary-500 ${sizeClasses.value}`
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const focus = () => {
  inputRef.value?.focus()
}

defineExpose({
  focus
})
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium leading-6 text-gray-900 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <input
        ref="inputRef"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Password toggle button -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        @click="togglePasswordVisibility"
      >
        <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-500" />
        <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-500" />
      </button>
      
      <!-- Error icon -->
      <ExclamationCircleIcon
        v-if="error"
        class="absolute inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-red-500"
      />
    </div>
    
    <!-- Error message -->
    <p v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>