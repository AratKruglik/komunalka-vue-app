<script setup>
import MainLayout from "../../layouts/MainLayout.vue";
import PrimaryButton from "../../UI/buttons/PrimaryButton.vue";
import { 
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  ArrowRightIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FireIcon
} from "@heroicons/vue/24/outline";
import AddressCard from "./AddressCard.vue";

const userAddresses = [
  {
    id: 1,
    address: 'вул. Хрещатик, 22, кв. 15',
    district: 'м. Київ, Шевченківський район',
    isPrimary: true,
    meterCount: 4,
    utilities: [
      { type: 'electricity', name: 'Електроенергія', icon: BoltIcon },
      { type: 'gas', name: 'Газ', icon: FireIcon },
      { type: 'coldWater', name: 'Холодна вода', icon: 'water-drop' },
      { type: 'hotWater', name: 'Гаряча вода', icon: 'thermometer' }
    ]
  },
  {
    id: 2,
    address: 'вул. Дарницька, 5, кв. 42',
    district: 'м. Київ, Дарницький район',
    isPrimary: false,
    meterCount: 2,
    utilities: [
      { type: 'electricity', name: 'Електроенергія', icon: BoltIcon },
      { type: 'gas', name: 'Газ', icon: FireIcon }
    ]
  },
  {
    id: 3,
    address: 'вул. Незалежності, 10, кв. 7',
    district: 'м. Львів, Шевченківський район',
    isPrimary: false,
    meterCount: 3,
    utilities: [
      { type: 'electricity', name: 'Електроенергія', icon: BoltIcon },
      { type: 'coldWater', name: 'Холодна вода', icon: 'water-drop' },
      { type: 'hotWater', name: 'Гаряча вода', icon: 'thermometer' }
    ]
  }
]
</script>

<template>
  <MainLayout>
    <div class="space-y-8">
      <!-- My Addresses Block -->
      <div class="bg-white shadow-sm rounded-lg">
        <div class="px-6 py-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Мої адреси</h2>
              <p class="text-gray-600 mt-1">Керуйте адресами для комунальних послуг</p>
            </div>
            <div class="inline-flex items-center px-4 py-2">
              <PrimaryButton :type="'button'" class="inline-flex items-center px-4 py-2">
                <PlusIcon class="h-4 w-4 mr-2" />
                Додати адресу
              </PrimaryButton>
            </div>
          </div>

          <!-- Address Cards -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AddressCard
                v-for="address in userAddresses"
                :key="address.id"
                :id="address.id"
                :address="address.address"
                :district="address.district"
                :isPrimary="address.isPrimary"
                :meterCount="address.meterCount"
                :utilities="address.utilities"
            />
          </div>
        </div>
      </div>

    </div>
  </MainLayout>
</template>
