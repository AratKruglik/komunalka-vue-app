<script setup>
import FullLogo from "../UI/logo/FullLogo.vue";
import {
  CalendarIcon, ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from "@heroicons/vue/24/outline/index.js";
import {process} from "std-env";

const navigation = [
  {name: 'Dashboard', href: '#', icon: HomeIcon, current: true},
  {name: 'Team', href: '#', icon: UsersIcon, current: false},
  {name: 'Projects', href: '#', icon: FolderIcon, current: false},
  {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
  {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
  {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
]

const version = 'v1.0.0'
</script>

<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div class="flex h-16 shrink-0 items-center">
        <FullLogo/>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a :href="item.href"
                   :class="[item.current ? 'bg-gray-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']">
                  <component :is="item.icon"
                             :class="[item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600', 'size-6 shrink-0']"
                             aria-hidden="true"/>
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>

          <li class="mt-auto">
            <p class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 text-gray-700">
              Build {{ process.env.VUE_APP_VERSION || version }}
            </p>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
