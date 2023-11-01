<script setup>
import {computed} from "vue";

const props = defineProps(
    ['message'],
);

const messageBoxClass = computed(() => {
    let messageBoxClass = '';
    switch (props.message.type) {
        case 'error':
            messageBoxClass = 'errorMessageBox';
            break;
        default:
            messageBoxClass = 'successMessageBox';
    }
    return messageBoxClass;
})

</script>

<template>
    <ul v-bind:class="messageBoxClass + ' rounded mt-2 pt-1 pb-1'">
        <li v-for="message in props.message.messages" class="text-dark">
            {{ message }}
        </li>
    </ul>
</template>
