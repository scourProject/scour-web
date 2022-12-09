<script lang="ts" setup>
import { computed } from 'vue'

const link = computed(() => {
  return 'decoration-none block w-full text-white px-6 py-4 rounded-md text-sm font-medium'
})

const linkActive = computed(() => {
  return 'bg-white text-black'
})
</script>

<template>
  <div class="flex flex-col items-center justify-start w-full ">
    <img src="~/assets/images/scour_logo.png" alt="logo" class="w-30 p-b-15" />
    <NuxtLink :active-class="linkActive" :class="link" to="/"><i class="pi pi-home p-r-5"></i> Главная</NuxtLink>
    <NuxtLink :active-class="linkActive" :class="link" to="/orders"><i class="pi pi-id-card p-r-5"></i> Заявки
    </NuxtLink>
    <NuxtLink :active-class="linkActive" :class="link" to="/customers"> <i class="pi pi-shopping-bag p-r-5"></i>
      Заказчики
    </NuxtLink>
    <NuxtLink :active-class="linkActive" :class="link" to="/employees"><i class="pi pi-user p-r-5"></i> Сотрудники
    </NuxtLink>
    <NuxtLink :active-class="linkActive" :class="link" to="/objects"><i class="pi pi-building p-r-5"></i> Объекты
    </NuxtLink>

    <NuxtLink :active-class="linkActive" :class="link" to="/reports"><i class="pi pi-chart-line p-r-5"></i> Отчеты
    </NuxtLink>
  </div>

</template>
