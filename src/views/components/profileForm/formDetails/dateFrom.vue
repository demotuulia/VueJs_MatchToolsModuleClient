<script setup>
import {computed} from "vue";

const props = defineProps(
    ['match'],
);

const dateValueUpdater = computed(() => {
    let dateValueUpdater = props.match.values[0].valueLabel;
    props.match.values[0].value = props.match.values[0].valueLabel;
    return dateValueUpdater;
})


</script>
<template>
    <span class="d-none">{{dateValueUpdater}}</span>
    <input type="date" v-model="match.values[0].valueLabel">
</template>