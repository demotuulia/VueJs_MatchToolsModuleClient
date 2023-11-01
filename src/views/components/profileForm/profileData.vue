<script setup>
const props = defineProps(
    ['profile'],
);
</script>

<template>
    <table class="table-striped w-100">
        <tr>
            <td class="align-top text-right bg-mt-dark text-light rounded-top w-25 ">
                Name:&nbsp;
            </td>
            <td class>
                <input class="mb-1 ml-1 pl-0" v-model="profile.name">
            </td>
        </tr>
        <tr>
            <td class="align-top text-right bg-mt-dark text-light rounded-bottom">
                &nbsp;Description:&nbsp;
            </td>
            <td>
                <textarea class="form-control pt-0 pl-0 pr-0 pb-0"
                          style="font-size: small;  height: 14em; "
                          v-model="profile.description"
                ></textarea>
            </td>
        </tr>


    </table>
</template>