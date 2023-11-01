<script setup>
const props = defineProps(
    ['match'],
);
</script>
<template>
      <input type ="number"  v-model.number="match.values[0].value">
</template>