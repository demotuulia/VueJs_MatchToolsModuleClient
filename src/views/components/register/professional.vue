<script setup>

const props = defineProps(
    ['professionalForm'],
);

const emit = defineEmits([
    'postProfessionalForm'
])

</script>

<template>
    <div class="mb-2">
        <img src="../../../../src/assets/icons/icons8-businessman-100.png">
        <img src="../../../../src/assets/icons/icons8-businesswoman-100.png">
    </div>
    <form>
        <table class="small w-100 text-left">
            <tr>
                <td>
                    <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                        First Name:&nbsp;
                    </div>
                </td>
                <td class="small">
                    <input v-model="professionalForm.name">
                </td>
            </tr>
            <tr>
                <td>
                    <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                        Prefix:&nbsp;
                    </div>
                </td>
                <td class="small">
                    <input v-model="professionalForm.prefix" class=" w-50">
                </td>
            </tr>
            <tr>
                <td>
                    <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                        &nbsp;Familyname:&nbsp;
                    </div>
                </td>
                <td class="small">
                    <input v-model="professionalForm.familyName">
                </td>
            </tr>
            <tr>
                <td>
                    <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                        Email:&nbsp;
                    </div>
                </td>
                <td class="small">
                    <input v-model="professionalForm.email">
                </td>
            </tr>
            <tr>
                <td>
                    <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                        Password:&nbsp;
                    </div>
                </td>
                <td class="small">
                    <input v-model="professionalForm.password" type="password">
                </td>
            </tr>
            <tr>
                <td>
                    <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                        Password:&nbsp;
                    </div>
                </td>
                <td class="small">
                    <input v-model="professionalForm.c_password" type="password"><br>
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td class="text-left">
                    <button type="button cursor-pointer "
                            class="btn btn-primary pt-0 pl-1 pr-1 pb-0 ml-2 small mt-1"
                            style="font-size: small"
                            @click.prevent="$emit('postProfessionalForm')">Registrate
                    </button>

                </td>
            </tr>
        </table>
    </form>
</template>