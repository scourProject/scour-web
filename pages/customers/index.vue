<script lang="ts" setup>
import { getCustomers } from '~~/services/customers';

definePageMeta({ title: 'Home', layout: 'main' })

const router = useRouter()

const redirectToCreateCustomerPage = () => {
  router.push('/customers/create')
}

var customers = await getCustomers();
</script>


<template>
  <div class="w-93% m-auto">

    <div class="flex justify-end">
      <Button icon="pi pi-plus" label="Создать заказчика"
        class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
        @click="redirectToCreateCustomerPage" />
    </div>

    <div class="mt-4 m-t-5">
      <DataTable :value="customers" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]" :responsive="true">
        <Column field="nameOfCompany" header="Название заказчика" />
        <Column field="website" header="Вебсайт заказчика" />
        <Column field="email" header="Email заказчика" />
        <Column field="isVIP" header="VIP">
          <template #body="slotProps">
            <i v-if="slotProps.data.isVIP === true" class="pi pi-check"></i>
          </template>
        </Column>
        <Column field="uid" header="">
          <template #body="slotProps">
            <div class="flex justify-between w-90%">
              <Button class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
                icon="pi pi-ellipsis-h" />
              <Button class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]" icon="pi pi-pencil" />
              <Button class="b-[#FF0000] bg-white color-[#FF0000] font-medium hover:bg-[#FF0000]" icon="pi pi-trash" />
            </div>

          </template>
        </Column>
      </DataTable>
    </div>


  </div>
</template>

