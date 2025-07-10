<script setup>
import MainNavbar from "../navigation/MainNavbar.vue";
import MainSidebar from "../navigation/MainSidebar.vue";

</script>

<template>
  <main>
    <!-- Static sidebar for desktop -->
    <MainSidebar/>

    <div class="lg:pl-72">
      <MainNavbar/>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot/>
        </div>
      </main>
    </div>
  </main>
</template>
