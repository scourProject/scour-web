<template>
    <ConfirmDialog :closable="false" :draggable="false" contentClass="text-500"
        :style="{ width: '50vw', alignItems: 'center', backgroundColor: 'white' }"></ConfirmDialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
defineProps({
    openDialog: {
        type: Function,
        default: () => { },
    },
});
const confirmData = useConfirm();
const openDialog = ({
    message = 'defaultMessage',
    header = 'Confirmation',
    acceptLabel = 'Proceed',
    rejectLabel = 'Cancel',
    accept = () => false,
    reject = () => true,
} = {}) =>
    confirmData.require({
        message,
        header,
        acceptLabel: rejectLabel, // reversed so initial focus is on 'reject'
        rejectLabel: acceptLabel,
        rejectClass: 'p-button-outlined',
        accept,
        reject,
    });
defineExpose({
    openDialog,
});
</script>
