<script setup>
import { BoltIcon } from '@heroicons/vue/24/solid'

defineProps({
  size: {
    type: String,
    default: 'h-8'
  },
  color: {
    type: String,
    default: 'text-primary-500'
  }
})
</script>

<template>
  <BoltIcon class="w-auto" :class="[size, color]"></BoltIcon>
</template>
