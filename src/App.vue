<script setup>
const version = 'v1.0.0'
</script>

<template>
  <main>
    <RouterView />
    <div class="mt-8 text-center text-xs text-gray-500">
      Build {{ version }}
    </div>
  </main>
</template>
