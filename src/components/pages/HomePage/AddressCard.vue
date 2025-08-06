<script setup>
import {
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  BoltIcon,
  FireIcon,
  CloudIcon,
  BeakerIcon
} from "@heroicons/vue/24/outline/index.js";

defineProps({
  id: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false,
    required: true
  },
  meterCount: {
    type: Number,
    required: true
  },
  utilities: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(utility => {
        return utility.type && utility.name && utility.icon;
      });
    }
  }
});
</script>

<template>
  <div :class="[
                   'relative rounded-lg p-6 border-2 transition-all duration-200',
                   isPrimary ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-200'
                 ]">

    <!-- Action Buttons -->
    <div class="absolute top-3 right-3 flex items-center space-x-2">
      <button :class="[
          'p-2 rounded-full shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer',
          isPrimary ? 'bg-yellow-400' : 'bg-white'
          ]">
        <PencilIcon class="h-4 w-4 text-gray-600"/>
      </button>
      <button :class="[
          'p-2 rounded-full shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer',
          isPrimary ? 'bg-yellow-400' : 'bg-white'
          ]">
        <TrashIcon class="h-4 w-4 text-gray-600"/>
      </button>
    </div>

    <!-- Tags Section -->
    <div class="flex items-center space-x-3 mb-6">
                <span v-if="isPrimary"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-gray-800 bg-yellow-400">
                  Основна адреса
                </span>
      <button v-else
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 hover:cursor-pointer">
        Зробити основною
      </button>

      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal text-gray-600 bg-gray-100">
                  <MapPinIcon class="h-3 w-3 mr-1"/>
                  {{ meterCount }} лічильники
                </span>
    </div>

    <!-- Address Info -->
    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-800 mb-1">{{ address }}</h3>
      <p class="text-sm text-gray-600">{{ district }}</p>
    </div>

    <!-- Utilities -->
    <div class="flex flex-wrap gap-2">
                <span v-for="utility in utilities" :key="utility.type"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal text-blue-800 bg-blue-100">
                  <!-- Electricity Icon -->
                  <BoltIcon v-if="utility.type === 'electricity'" class="h-3 w-3 mr-1.5"/>
                  <!-- Gas Icon -->
                  <FireIcon v-else-if="utility.type === 'gas'" class="h-3 w-3 mr-1.5"/>
                  <!-- Cold Water Icon -->
                  <CloudIcon v-else-if="utility.type === 'coldWater'" class="h-3 w-3 mr-1.5"/>
                  <!-- Hot Water/Thermometer Icon -->
                  <BeakerIcon v-else-if="utility.type === 'hotWater'" class="h-3 w-3 mr-1.5"/>
                  {{ utility.name }}
                </span>
    </div>
  </div>
</template>
