<script lang="ts" setup>
definePageMeta({ title: 'Home', layout: 'main' })

const router = useRouter()

const toCreateCustomerPage = () => {
  router.push('/customers/create')
}
</script>


<template>
  <div class="w-93% m-auto">
    <div class="flex justify-end">
      <Button icon="pi pi-plus" label="Создать заказчика"
        class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]" @click="toCreateCustomerPage" />
    </div>

    <div class="mt-4"></div>
  </div>
</template>

