<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Calendar from 'primevue/calendar';

import { createOrder } from '~~/services/orders'
import { getCustomers } from '~~/services/customers'
import { getObjects } from '~~/services/objects'

import { useRouter } from 'vue-router'

const router = useRouter()

const customers = ref()
const objects = ref()

const selectedCustomer = ref()
const selectedObject = ref()
const objectsByCustomers = ref()
const deadlineDate = ref()
const deadlineTime = ref()
const additionalInformation = ref('')

function toTimestamp(dateStr, timeStr) {
  console.log()
  const [day, month, year] = dateStr.split('.');
  const [hours, minutes, seconds] = timeStr.split(':');
  return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
}

const createNewOrder = async () => {
  const order = {
    objectID: selectedObject.value.uid,
    objectName: selectedObject.value.name,
    objectAddress: selectedObject.value.address,
    requiredWorkerAmount: selectedObject.value.requiredWorkerAmount,
    deadline: toTimestamp(deadlineDate.value.toLocaleDateString(), deadlineTime.value.toLocaleTimeString()),
    status: 'Создана',
  }
  await createOrder(order)
  router.push('/orders')
}

const handleCustomerSelect = () => {
  objectsByCustomers.value = objects.value.filter((x) => x['customerID'] == selectedCustomer.value.uid)
}

onMounted(() => {
  // initialize objects
  getObjects().then((data) => {
    objects.value = data
  })
  //   initialize customers
  getCustomers().then((data) => {
    customers.value = data
  })

  //   objectsByCustomers.value = objects.value.filter((x) => x['customerID'] == selectedCustomer.value.uid)
})

definePageMeta({ title: 'Home', layout: 'main' })
</script>

<template>
  <div>
    <h2 class="text-md">Создание новой заявки</h2>
    <div class="mt-4">
      <div class="customer_logo m-t-10 flex w-40% flex-col items-center">
        <div>
          <img class="w-40" src="~/assets/images/build_empty.png" alt="" />
        </div>
      </div>

      <div class="order_customer m-t-5 w-40%">
        <h5 class="m-t-3">Выберите заказчика</h5>
        <Dropdown class="m-t-1 w-100%" v-model="selectedCustomer" @change="handleCustomerSelect" :options="customers"
          optionLabel="nameOfCompany" placeholder="Select a Customer" />
      </div>

      <div class="order_object m-t-5 w-40%">
        <h5 class="m-t-3">Выберите объект</h5>
        <Dropdown class="m-t-1 w-100%" v-model="selectedObject" :options="objectsByCustomers" optionLabel="name"
          placeholder="Select an object" />
      </div>

      <div class="order_deadline m-t-5 w-40%">
        <h5 class="m-t-3">Укажите дедлайн</h5>
        <div class="flex w-80% justify-between">
          <Calendar v-model="deadlineDate" :showButtonBar="true" placeholder="Дата" dateFormat="dd.mm.yy" />
          <Calendar v-model="deadlineTime" :showTime="true" :timeOnly="true" placeholder="Время" />
        </div>
      </div>

      <div class="customer_logo m-t-5">
        <h5 class="m-t-3">Фотографии места уборки</h5>
        <div class="m-t-2">
          <FileUpload name="demo[]" url="/upload" accept="image/*" :maxFileSize="1000000" />
        </div>
      </div>

      <div class="customer_additional_information m-t-5">
        <h5 class="p-mt-3">Дополнительная информация по заявке</h5>
        <Textarea class="w-40% h-20" v-model="additionalInformation" :autoResize="true" rows="5" cols="30" />
      </div>

      <Button label="Создать" class="bg-[#060E28] b-[#060E28] m-t-5" @click="() => createNewOrder()" />
    </div>
  </div>
</template>
