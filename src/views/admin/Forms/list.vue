<script setup>


const props = defineProps(
    ['content'],
);

defineEmits([
    'editForm',
])
</script>

<template>

    <table class="table table-striped  small" style="height: 1px">
        <thead>
        <tr>
            <th>Name</th>
            <th></th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="form in content.list" style="height: 40px;">
            <td>{{ form.name }}</td>
            <td v-on:click="$emit('editForm',form.id)"
                class="bi-pencil  cursor-pointer profileListButton"
            >
            </td>
        </tr>
        </tbody>
    </table>

</template>
