<script setup lang="ts">
import { deleteObject } from '~~/services/objects';
import { p } from '@unocss/preset-mini/dist/utilities-d1833377';

defineProps<{
    customer: string
    objectName: string
    objectID: string
    address: string
    plan: number
    photoLink: string
    deleteFunction: (objectId: string) => void
}>()
const router = useRouter()


const redirectToCreateOrderPage = (objectID) => {
    router.push(`/orders/create/${objectID}`)
}


</script>

<template>
    <div class="card p-10 p-t-6 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">

        <div class="flex justify-end">
            <div class="flex w-45% justify-between">
                <Button class="text-green b-green b-1  bg-white" icon="pi pi-plus-circle"
                    @click="() => redirectToCreateOrderPage(objectID)" />
                <Button class="text-[#060E28] b-[#060E28] b-1  bg-white" icon="pi pi-pencil" />
                <Button class="text-red b-red b-1  bg-white" icon="pi pi-trash"
                    @click="() => deleteFunction(objectID)" />
            </div>
        </div>

        <div class="flex flex-col items-center m-t-5 h-64">
            <img class="object-fit object-center h-full w-full" :src="photoLink" alt="">
        </div>
        <div class="flex justify-center card-header m-t-3">
            <h3>{{ objectName }}</h3>
        </div>
        <div class="card-body m-t-5">
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Заказчик:</span> {{ customer }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Адрес:</span> {{ address }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">План:</span> {{ plan }} тех-персонала</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
        </div>

    </div>
</template>