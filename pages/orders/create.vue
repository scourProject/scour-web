<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

import { createOrder, orderImageUpload } from '~~/services/orders'
import { getCustomers } from '~~/services/customers'
import { getObjects } from '~~/services/objects'
import { useToast } from "primevue/usetoast";
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
const photosOfComplaintsModel = ref([])
const photosOfComplaints = ref([])
const toastRef = ref(null);

const isCreating = ref(false)

function toTimestamp(dateStr, timeStr) {
  console.log()
  const [day, month, year] = dateStr.split('.');
  const [hours, minutes, seconds] = timeStr.split(':');
  return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
}

const handleImageUpload = (file: any) => {
  const filename = file.name.split('.').pop() + '-' + Date.now().toString() + Math.random()

  orderImageUpload(file, filename)
    .then(() => {
      photosOfComplaints.value.push(`https://firebasestorage.googleapis.com/v0/b/scour-test.appspot.com/o/orders%2F${filename}?alt=media`)
    })
}

const showToast = () => {
  console.log(toastRef.value)
  nextTick(() => {
    toastRef.value.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
  });
};
const createNewOrder = async () => {
  isCreating.value = true
  photosOfComplaintsModel.value.forEach(file => {
    handleImageUpload(file)
  });
  const order = {
    objectID: selectedObject.value.uid,
    objectName: selectedObject.value.name,
    objectAddress: selectedObject.value.address,
    requiredWorkerAmount: selectedObject.value.requiredWorkerAmount,
    deadline: toTimestamp(deadlineDate.value.toLocaleDateString(), deadlineTime.value.toLocaleTimeString()),
    status: '??????????????',
    photosOfComplaints: photosOfComplaints.value,
  }
  await createOrder(order)
  showToast()
  isCreating.value = false
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

const handleUploadPhotos = (event) => {
  const response = event.xhr.response;
  photosOfComplaintsModel.value = event.files
  console.log(photosOfComplaintsModel.value)
}



definePageMeta({ title: 'Home', layout: 'main' })
</script>

<template>
  <div>
    <h2 class="text-md">???????????????? ?????????? ????????????</h2>
    <div class="mt-4">
      <div class="customer_logo m-t-10 flex w-40% flex-col items-center">
        <div>
          <img class="w-40" src="~/assets/images/build_empty.png" alt="" />
        </div>
      </div>

      <div class="order_customer m-t-5 w-40%">
        <h5 class="m-t-3">???????????????? ??????????????????</h5>
        <Dropdown class="m-t-1 w-100%" v-model="selectedCustomer" @change="handleCustomerSelect" :options="customers"
          optionLabel="nameOfCompany" placeholder="Select a Customer" />
      </div>

      <div class="order_object m-t-5 w-40%">
        <h5 class="m-t-3">???????????????? ????????????</h5>
        <Dropdown class="m-t-1 w-100%" v-model="selectedObject" :options="objectsByCustomers" optionLabel="name"
          placeholder="Select an object" />
      </div>

      <div class="order_deadline m-t-5 w-40%">
        <h5 class="m-t-3">?????????????? ??????????????</h5>
        <div class="flex w-80% justify-between">
          <Calendar v-model="deadlineDate" :showButtonBar="true" placeholder="????????" dateFormat="dd.mm.yy" />
          <Calendar v-model="deadlineTime" :showTime="true" :timeOnly="true" placeholder="??????????" />
        </div>
      </div>

      <div class="customer_logo m-t-5">
        <h5 class="m-t-3">???????????????????? ?????????? ????????????</h5>
        <div class="m-t-2">
          <FileUpload name="demo[]" url="./upload" :maxFileSize="10000000" :multiple="true"
            @upload="handleUploadPhotos" />
        </div>
      </div>

      <div class="customer_additional_information m-t-5">
        <h5 class="p-mt-3">???????????????????????????? ???????????????????? ???? ????????????</h5>
        <Textarea class="w-40% h-20" v-model="additionalInformation" :autoResize="true" rows="5" cols="30" />
      </div>
      <ProgressSpinner :size="5" v-if="isCreating" />
      <Button label="??????????????" class="bg-[#060E28] b-[#060E28] m-t-5" @click="() => createNewOrder()" />

    </div>
    <Toast ref="toastRef" position="top-right" />
</div>
</template>
<style>
@keyframes p-progress-spinner-color {

  100%,
  0% {
    stroke: #060E28;
  }

  40% {
    stroke: #060E28;
  }

  66% {
    stroke: #060E28;
  }

  80%,
  90% {
    stroke: #060E28;
  }
}
</style>