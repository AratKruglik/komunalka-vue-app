<script setup>
import MainNavbar from "../navigation/MainNavbar.vue";
import MainSidebar from "../navigation/MainSidebar.vue";
import {process} from "std-env";

const version = 'v1.0.0';
</script>

<template>
  <main class="bg-gray-100 min-h-screen flex flex-col">
    <!-- Static sidebar for desktop -->
    <MainSidebar/>

    <div class="lg:pl-72 flex flex-col flex-grow">
      <MainNavbar/>

      <div class="py-10 flex-grow">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot/>
        </div>
      </div>

      <footer class="bg-white border-t border-gray-200 py-4">
        <div class="px-4 sm:px-6 lg:px-8">
          <p class="text-center text-sm text-gray-500">
            Build {{ process.env.VUE_APP_VERSION || version }}
          </p>
        </div>
      </footer>
    </div>
  </main>
  
</template>
