<script setup>
const props = defineProps(
    ['match'],
);

</script>
<template>
    <select v-model="match.values[0].value">
        <option v-for="option in match.options" :value="option.id">
            {{ option.value }}
        </option>
    </select>
</template>