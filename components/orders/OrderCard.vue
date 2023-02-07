<script setup lang="ts">

defineProps<{
    objectName: string
    address: string
    plan: number
    status: string
    deadline: Date
}>()

</script>

<template>
    <div class="card p-10 shadow-xl p-10 flex flex-col m-3 rounded-md ">

        <div class="card-body">
            <div class="card-body__item m-t-2">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Объект:</span> {{ objectName }}</p>
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
            <div class="card-body__item">
                <div class="card-body__item__title m-b-3">
                    <p><span class="font-bold">Дедлайн:</span> {{ deadline.toLocaleDateString() }} {{
                        deadline.toLocaleTimeString()
                    }}</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Статус:</span> {{ status }} </p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
        </div>

    </div>
</template>