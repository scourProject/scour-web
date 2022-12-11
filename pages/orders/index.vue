<script lang="ts" setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import OrderCard from '~~/components/orders/OrderCard.vue'
import { getOrders } from '~~/services/orders';

definePageMeta({ title: 'Home', layout: 'main' })

const router = useRouter()

const redirectToCreateOrderPage = () => {
    router.push('/orders/create')
}


var orders = await getOrders();

</script>


<template>
    <div class="w-93% m-auto">
        <div class="m-b-5">
            <h2>Страница заявок</h2>
        </div>
        <TabView>
            <TabPanel header="Созданные заявки">
                <div class="flex flex-wrap">
                    <div v-for="order in orders" class="100%">
                        <OrderCard v-if="order['status'] == 'Создана'" :objectName='order["objectName"]'
                            :address='order["objectAddress"]' :plan='order["requiredWorkerAmount"]'
                            :status='order["status"]' :deadline='order["deadline"]' />
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
