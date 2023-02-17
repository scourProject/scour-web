<script lang="ts" setup>

import ObjectCard from '~~/components/objects/ObjectCard.vue'
import { getObjects, deleteObject } from '~~/services/objects';
import ProgressSpinner from 'primevue/progressspinner';

definePageMeta({ title: 'Home', layout: 'main' })

const router = useRouter()

const redirectToCreateObjectPage = () => {
  router.push('/objects/create')
}
var objects = ref([]);
var isDownloading = ref(false);

const downloadObjectsHandle = async () => {
  isDownloading.value = true;
  objects.value = await getObjects();

}

onMounted(async () => {
  await downloadObjectsHandle();
  isDownloading.value = false
})



const deleteObjectHandle = async (objectID) => {
  await deleteObject(objectID).then(() => {
    objects.value = objects.value.filter((x) => x.uid != objectID)
  }).catch((error) => {
    console.log(error)
  })
}
</script>


<template>
  <div class="w-93% m-auto">

    <div class="flex justify-end">
      <Button icon="pi pi-plus" label="Создать объект"
        class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]" @click="redirectToCreateObjectPage" />
    </div>
    <div v-if="isDownloading" class="flex justify-center items-center">
      <ProgressSpinner />
    </div>
    <div class="flex flex-wrap">
      <ObjectCard v-for="object in objects" :customer='object["customerName"]' :photoLink='object["photoLink"]'
        :address='object["address"]' :objectID='object.uid' :objectName='object["name"]'
        :plan='object["requiredWorkerAmount"]' :deleteFunction="deleteObjectHandle" />
    </div>
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