<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  }
})
</script>

<template>
  <button :type="type"
          class="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-gray-900 shadow-xs hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 hover:cursor-pointer">
    <slot></slot>
  </button>
</template>
