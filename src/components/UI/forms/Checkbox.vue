<script setup>
defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  value: {
    type: String
  },
  id: {
    type: String
  }
})
</script>

<template>
  <div class="flex h-6 shrink-0 items-center">
    <div class="group grid size-4 grid-cols-1">
      <input :id="id" :name="name" type="checkbox" class="h-4 w-4 accent-primary-500 rounded border-gray-300 text-primary-500 focus:ring-primary-500">
    </div>
  </div>
  <label :for="name" class="block text-sm/6 text-gray-900">{{ value }}</label>
</template>

<style scoped>

</style>