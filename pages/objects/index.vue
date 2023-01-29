<script lang="ts" setup>

import ObjectCard from '~~/components/objects/ObjectCard.vue'
import { getObjects } from '~~/services/objects';

definePageMeta({ title: 'Home', layout: 'main' })

const router = useRouter()

const redirectToCreateObjectPage = () => {
  router.push('/objects/create')
}


onMounted(() => {
  console.log(objects)
})
var objects = await getObjects();




</script>


<template>
  <div class="w-93% m-auto">

    <div class="flex justify-end">
      <Button icon="pi pi-plus" label="Создать объект"
        class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
        @click="redirectToCreateObjectPage" />
    </div>

    <div class="flex flex-wrap">
      <ObjectCard v-for="object in objects" :customer='object["customerName"]' :photoLink='object["photoLink"]'
        :address='object["address"]' :objectID='object.uid' :objectName='object["name"]'
        :plan='object["requiredWorkerAmount"]' />

    </div>



  </div>
</template>
