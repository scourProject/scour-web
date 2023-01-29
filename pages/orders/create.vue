<script lang="ts" setup>
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import { createOrder } from '~~/services/orders';
import { getCustomers } from '~~/services/customers';
import { getObjects } from '~~/services/objects';

definePageMeta({ title: 'Home', layout: 'main' })


var customers = await getCustomers();
// var objects = (await getObjects()).map(x => x["customerID"] == selectedCustomer.value.uid)
var objects = await getObjects()

const additionalInformation = ref('')
const selectedCustomer = ref(customers[0])
const objectsByCustomers = ref(objects.filter(x => x["customerID"] == selectedCustomer.value.uid))
const selectedObject = ref(objects[0])

const router = useRouter()

const createNewOrder = async (objectID: string) => {
    const order = {
        objectID: objectID,
        deadline: "13.12.2022",
        status: 'Создана'
    }
    await createOrder(order)
    router.push('/orders')
}

</script>

<template>
    <div>
        <h2 class="text-md">Создание новой заявки</h2>
        <div class="mt-4">

            <div class="customer_logo m-t-10 flex w-40% flex-col items-center">
                <div>
                    <img class="w-40" src="~/assets/images/build_empty.png" alt="">
                </div>
            </div>

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите заказчика</h5>
                <Dropdown class="m-t-1 w-100%" v-model="selectedCustomer" :options="customers"
                    optionLabel="nameOfCompany" placeholder="Select a Customer" />

            </div>

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите объект</h5>
                <Dropdown class="m-t-1 w-100%" v-model="selectedObject" :options="objectsByCustomers" optionLabel="name"
                    placeholder="Select an object" />

            </div>

            <div class="customer_logo m-t-5">
                <h5 class="p-mt-3">Фотографии места уборки</h5>
                <div class="m-t-2">
                    <FileUpload name="demo[]" url="/upload" accept="image/*" :maxFileSize="1000000" />
                </div>
            </div>

            <div class="customer_additional_information m-t-5 ">
                <h5 class="p-mt-3">Дополнительная информация по заявке</h5>
                <Textarea class="w-40% h-20" v-model="additionalInformation" :autoResize="true" rows="5" cols="30" />
            </div>



            <Button label="Создать" class="bg-[#060E28] b-[#060E28] m-t-5" @click="() => createNewOrder('1')" />



        </div>
    </div>
</template>