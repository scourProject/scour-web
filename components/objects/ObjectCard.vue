<script setup lang="ts">
import { stringLength } from '@firebase/util';
import { createOrder } from '~~/services/orders';
import { p } from '@unocss/preset-mini/dist/utilities-d1833377';

defineProps<{
    customer: string
    objectName: string
    objectID: string
    address: string
    plan: number
    photoLink: string
}>()
const router = useRouter()

const createNewOrder = async (objectID: string, objectName: string, objectAddress: string, requiredWorkerAmount: number) => {
    const order = {
        objectID: objectID,
        objectName: objectName,
        objectAddress: objectAddress,
        requiredWorkerAmount: requiredWorkerAmount,
        deadline: "13.12.2022",
        status: 'Создана'
    }
    await createOrder(order)
    router.push('/orders')

}
</script>

<template>
    <div class="card p-10 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">

        <div class="flex justify-end">
            <div class="flex w-45% justify-between">
                <Button class="text-green b-green b-1  bg-white" icon="pi pi-plus-circle"
                    @click="() => createNewOrder(objectID, objectName, address, plan)" />
                <Button class="text-[#060E28] b-[#060E28] b-1  bg-white" icon="pi pi-pencil" />
                <Button class="text-red b-red b-1  bg-white" icon="pi pi-trash" />
            </div>
        </div>

        <div class="flex flex-col items-center m-t-5">
            <img class="w-100%" :src="photoLink" alt="">
            <div class="card-header m-t-3">
                <h3>{{ objectName }}</h3>
            </div>
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