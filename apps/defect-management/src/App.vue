<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { AlertTriangle, ListFilter, PlusCircle } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const subNavItems = [
  { name: 'Defect Tracking', path: '/defects', icon: AlertTriangle },
  { name: 'Report Snag', path: '/defects/report', icon: PlusCircle },
  { name: 'Sign-off', path: '/defects/signoff', icon: ListFilter },
];

const isActive = (path: string) => {
  if (path === '/defects') return route.path === '/defects' || route.path === '/defects/';
  return route.path.startsWith(path);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="bg-white border-b border-gray-100 px-8 py-2 flex items-center space-x-6 overflow-x-auto">
      <router-link
        v-for="item in subNavItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center space-x-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
        :class="isActive(item.path) ? 'border-skyline-blue text-skyline-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span>{{ item.name }}</span>
      </router-link>
    </div>
    
    <div class="flex-1 bg-skyline-bg overflow-auto">
      <router-view />
    </div>
  </div>
</template>
