<script setup>

const props = defineProps(
    ['match'],
);
</script>
<template>
  {{ match.values[0].value }}
</template>