<script setup>

import { ref, computed } from 'vue'
import Sidebar from 'primevue/sidebar';
import Navbar from '../components/Navbar.vue';

const visibleLeft = ref(false);
const link = computed(() => {
  return 'decoration-none block w-full text-white px-6 py-4 rounded-md text-sm font-medium'
})

const linkActive = computed(() => {
  return 'bg-white text-black'
})
</script>



<template>
  <div class="flex items-start h-100vh">
    <div class="flex items-start h-100%">
      <div class="flex flex-col items-center justify-start bg-dark h-100%">
        <div class="p-sidebar-header p-[1rem]">
          <Button class="bg-[#060E28]" icon="pi pi-bars" @click="visibleLeft = true" />
        </div>
        <div class="p-sidebar-content p-[1rem]">
          <NuxtLink :active-class="linkActive" :class="link" to="/"><i class="pi pi-home"></i></NuxtLink>
          <NuxtLink :active-class="linkActive" :class="link" to="/orders"><i class="pi pi-id-card"></i></NuxtLink>
          <NuxtLink :active-class="linkActive" :class="link" to="/customers"><i class="pi pi-shopping-bag"></i>
          </NuxtLink>
          <NuxtLink :active-class="linkActive" :class="link" to="/employees"><i class="pi pi-user"></i>
          </NuxtLink>
          <NuxtLink :active-class="linkActive" :class="link" to="/objects"><i class="pi pi-building"></i></NuxtLink>

          <NuxtLink :active-class="linkActive" :class="link" to="/reports"><i class="pi pi-chart-line"></i></NuxtLink>
        </div>
      </div>
      <Sidebar :modal="false" v-model:visible="visibleLeft" class="p-sidebar-sm bg-[#060E28]">
        <Navbar />
      </Sidebar>

    </div>

    <main class="p-4">
      <slot />
    </main>
  </div>
</template>

<style>
/* sidebar__названиеблока */
.sidebar {

  background-color: #060E28;

}
</style>


