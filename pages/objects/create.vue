<script lang="ts" setup>
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { createObject, objectImageUpload } from '~~/services/objects';
import { getCustomers } from '~~/services/customers';

definePageMeta({ title: 'Home', layout: 'main' })


const name = ref('')
const address = ref('')

const additionalInformation = ref('')
const requiredWorkerAmount = ref('')
const isActive = ref(true)
const photoLink = ref('')
const image = ref('')
const imageLoaded = ref(false)

const router = useRouter()

var customers = await getCustomers();
const selectedCustomer = ref(customers[0])

const handleImageUpload = (e: any) => {
    imageLoaded.value = true
    const file = e.target.files[0]
    const filename = file.name.split('.').pop() + '-' + Date.now().toString() + Math.random()

    objectImageUpload(file, filename)
        .then(() => {
            image.value = `https://firebasestorage.googleapis.com/v0/b/scour-test.appspot.com/o/objects%2F${filename}?alt=media`
        })
    imageLoaded.value = false
}

const createNewObject = async () => {
    const object = {
        name: name.value,
        address: address.value,
        customerID: selectedCustomer.value.uid,
        customerName: selectedCustomer.value["nameOfCompany"],
        additionalInformation: additionalInformation.value,
        requiredWorkerAmount: parseInt(requiredWorkerAmount.value),
        isActive: isActive.value,
        photoLink: image.value
    }
    await createObject(object)
    router.push('/objects')

}

</script>

<template>
    <div>
        <h2 class="text-md">Создание нового объекта</h2>
        <div class="mt-4">

            <div class="customer_logo m-t-10 flex w-40% flex-col items-center">
                <div>
                    <img class="w-40" :src="image != '' ? image : '../../assets/images/build_empty.png'" alt="">
                </div>
            </div>

            <div class="object_photoLink">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-camera text-[#060E28]"></i>
                    </span>
                    <InputText id="choose_image" class="h-90%" placeholder="Ссылка на url photo объекта" type="file"
                        accept="image/*" @change="handleImageUpload" />
                </div>
            </div>

            <div class="object_name m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Название объекта" v-model="name" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Адрес" v-model="address" />
                </div>
            </div>

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите заказчика</h5>
                <Dropdown class="m-t-1 w-100%" v-model="selectedCustomer" :options="customers"
                    optionLabel="nameOfCompany" placeholder="Select a Customer" />

            </div>

            <div class="object_plan m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-users text-[#060E28]"></i>
                    </span>
                    <InputText mode="decimal" placeholder="Необходимое количество тех персонала на объекте"
                        v-model="requiredWorkerAmount" />
                </div>
            </div>

            <div class="customer_additional_information m-t-5 ">
                <h5 class="p-mt-3">Дополнительная информация об объекте</h5>
                <Textarea class="w-40% h-20" v-model="additionalInformation" :autoResize="true" rows="5" cols="30" />
            </div>


            <Button label="Создать" class="bg-[#060E28] b-[#060E28] m-t-5" @click="createNewObject" />



        </div>
    </div>
</template>