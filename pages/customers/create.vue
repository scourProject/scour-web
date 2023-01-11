<script lang="ts" setup>
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import { createCustomer } from '~~/services/customers';
definePageMeta({ title: 'Home', layout: 'main' })

const isVIP = ref(false)
const additionalInformation = ref('')
const nameOfCompany = ref('')
const websiteOfCompany = ref('')
const emailOfCompany = ref('')

const router = useRouter()

const createNewCustomer = async () => {
    console.log('createNewCustomer')
    const customer = {
        nameOfCompany: nameOfCompany.value,
        website: websiteOfCompany.value,
        email: emailOfCompany.value,
        additionalInformation: additionalInformation.value,
        isVIP: isVIP.value,
        isActive: true
    }
    console.log(customer)
    await createCustomer(customer)
    router.push('/customers')

}

</script>

<template>
    <div>
        <h2 class="text-md">Создание нового заказчика</h2>
        <div class="mt-4">

            <div class="customer_logo m-t-10 flex w-40% flex-col items-center">
                <div>
                    <img class="w-40" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="">
                </div>
                <input type="file" name="" id="">
            </div>

            <div class="customer_name m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Название заказчика" v-model="nameOfCompany" />
                </div>
            </div>

            <div class="customer_website m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-globe text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Вебсайт заказчика" v-model="websiteOfCompany" />
                </div>
            </div>

            <div class="customer_email m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-at text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Email заказчика" v-model="emailOfCompany" />
                </div>
            </div>

            <div class="customer_additional_information m-t-5 ">
                <h5 class="p-mt-3">Дополнительная информация о заказчике</h5>
                <Textarea class="w-40% h-20" v-model="additionalInformation" :autoResize="true" rows="5" cols="30" />
            </div>

            <div class="is_vip_check_box m-t-5 w-40% flex ">
                <Checkbox v-model="isVIP" :binary="true" />
                <i class="pi pi-star p-l-3 color-yellow"></i>
                <label class="ml-2">VIP</label>
            </div>

            <div class="customer_logo m-t-5">
                <h5 class="p-mt-3">Договор с заказчиком</h5>
                <div class="m-t-2">
                    <FileUpload name="demo[]" url="/upload" accept="image/*" :maxFileSize="1000000" />
                </div>
            </div>

            <Button label="Создать" class="bg-[#060E28] b-[#060E28] m-t-5" @click="createNewCustomer" />



        </div>
    </div>
</template>