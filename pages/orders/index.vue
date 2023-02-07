<script lang="ts" setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import OrderCard from '~~/components/orders/OrderCard.vue'
import { getOrders } from '~~/services/orders';

definePageMeta({ title: 'Home', layout: 'main' })

var orders = await getOrders();

const router = useRouter()
const redirectToCreateOrderPage = () => {
    router.push('/orders/create')
}
</script>


<template>
    <div class="w-93% m-auto">
        <div class="m-b-5 flex items-center justify-between">
            <h2>Страница заявок</h2>
            <div class="flex justify-end">
                <Button icon="pi pi-plus" label="Создать заявку"
                    class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
                    @click="redirectToCreateOrderPage" />
            </div>
        </div>
        <TabView>
            <TabPanel header="Созданные заявки">
                <div class="flex flex-wrap">
                    <div v-for="order in orders" class="100%">
                        <OrderCard v-if="order['status'] == 'Создана'" :objectName='order["objectName"]'
                            :address='order["objectAddress"]' :plan='order["requiredWorkerAmount"]'
                            :status='order["status"]' :deadline='new Date(order["deadline"].seconds * 1000)' />
                    </div>

                </div>
            </TabPanel>
            <TabPanel header="На выполнении">
                <div class="flex flex-wrap">
                    <div v-for="order in orders">
                        <OrderCard v-if="order['status'] == 'На выполнении'" :objectName='order["objectName"]'
                            :address='order["objectAddress"]' :plan='order["requiredWorkerAmount"]'
                            :status='order["status"]' :deadline='order["deadline"]' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Ждут подтверждения">
                <div class="flex flex-wrap">
                    <div v-for="order in orders">
                        <OrderCard v-if="order['status'] == 'Ждут подтверждения'" :objectName='order["objectName"]'
                            :address='order["objectAddress"]' :plan='order["requiredWorkerAmount"]'
                            :status='order["status"]' :deadline='order["deadline"]' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Завершены">
                <div class="flex flex-wrap">
                    <div v-for="order in orders">
                        <OrderCard v-if="order['status'] == 'Завершены'" :objectName='order["objectName"]'
                            :address='order["objectAddress"]' :plan='order["requiredWorkerAmount"]'
                            :status='order["status"]' :deadline='order["deadline"]' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Просрочены">
                <div class="flex flex-wrap">
                    <div v-for="order in orders">
                        <OrderCard v-if="order['status'] == 'Просрочены'" :objectName='order["objectName"]'
                            :address='order["objectAddress"]' :plan='order["requiredWorkerAmount"]'
                            :status='order["status"]' :deadline='order["deadline"]' />
                    </div>
                </div>
            </TabPanel>
        </TabView>





    </div>
</template>
