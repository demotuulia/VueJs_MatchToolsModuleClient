<script setup>
const props = defineProps(
    ['match'],
);
</script>
<template>
    <table class="table-striped mt-0 pt-0 mb-1 border-0 ">
        <tr v-for="option in match.options">
            <td class="pt-0 pl-0 pr-0 pb-0">
                &nbsp;{{ option.value }}
            </td>
            <td class="pt-0 pl-0 pr-0 pb-0">
                <input v-model="option.selected" type="checkbox">
            </td>
        </tr>
    </table>
</template>