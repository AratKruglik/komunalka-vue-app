<script setup>
import FaviconOnly from './FaviconOnly.vue'

defineProps({
  textSize: {
    type: String,
    default: 'text-2xl/9'
  },
  iconSize: {
    type: String,
    default: 'h-8'
  },
  gap: {
    type: String,
    default: 'gap-3'
  }
})
</script>

<template>
  <div class="flex items-center justify-center" :class="gap">
    <FaviconOnly :size="iconSize" />
    <h2 class="font-bold tracking-tight text-gray-900" :class="textSize">Komunalka</h2>
  </div>
</template>
