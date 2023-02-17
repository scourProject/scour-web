<script lang="ts" setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import OrderCard from '~~/components/orders/OrderCard.vue'
import { getOrders } from '~~/services/orders';
import { ref, computed } from 'vue';

definePageMeta({ title: 'Home', layout: 'main' })

var orders = await getOrders();

const router = useRouter()
const redirectToCreateOrderPage = () => {
    router.push('/orders/create')
}

const filteredOrders = computed(() => {
    return (status: string) => {
        return orders.filter((item) => item["status"] === status);
    };
});

const createdOrders = filteredOrders.value('Создана');
const inProcessOrders = filteredOrders.value('На выполнении');
const inWaitingOrders = filteredOrders.value('Ждет подтверждения');
const completedOrders = filteredOrders.value('Завершена');
const overdueOrders = filteredOrders.value('Просрочена');
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
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="order in createdOrders">
                        <OrderCard :uid="order.uid" :objectName='order["objectName"]' :address='order["objectAddress"]'
                            :plan='order["requiredWorkerAmount"]' :status='order["status"]'
                            :deadline='new Date(order["deadline"].seconds * 1000)' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="На выполнении">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="order in inProcessOrders">
                        <OrderCard :uid="order.uid" :objectName='order["objectName"]' :address='order["objectAddress"]'
                            :plan='order["requiredWorkerAmount"]' :status='order["status"]'
                            :deadline='new Date(order["deadline"].seconds * 1000)' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Ждут подтверждения">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="order in inWaitingOrders">
                        <OrderCard :uid="order.uid" :objectName='order["objectName"]' :address='order["objectAddress"]'
                            :plan='order["requiredWorkerAmount"]' :status='order["status"]'
                            :deadline='new Date(order["deadline"].seconds * 1000)' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Завершены">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="order in completedOrders">
                        <OrderCard :uid="order.uid" :objectName='order["objectName"]' :address='order["objectAddress"]'
                            :plan='order["requiredWorkerAmount"]' :status='order["status"]'
                            :deadline='new Date(order["deadline"].seconds * 1000)' />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Просрочены">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="order in overdueOrders">
                        <OrderCard :uid="order.uid" :objectName='order["objectName"]' :address='order["objectAddress"]'
                            :plan='order["requiredWorkerAmount"]' :status='order["status"]'
                            :deadline='new Date(order["deadline"].seconds * 1000)' />
                    </div>
                </div>
            </TabPanel>
        </TabView>


</div>
</template>
