<script setup>
const props = defineProps(
    ['loginForm'],
);

const emit = defineEmits([
    'postLoginForm'
])

</script>

<template>
    <form class=" w-100  border rounded pt-3 pl-3 pb-3  pr-1 justify-content-center ">
        <div>
            <table class="small">
                <tr>
                    <td>
                        <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                            Email:&nbsp;
                        </div>

                    </td>
                    <td class="">
                        <input class="mt-1" v-model="loginForm.email">
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="w-100 pt-1 pb-1 bg-mt-dark rounded text-light text-right">
                            &nbsp;Password:&nbsp;
                        </div>
                    </td>
                    <td>
                        <input class="mt-1" v-model="loginForm.password" type="password"><br>
                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                        <button type="button cursor-pointer"
                                class="btn btn-primary pt-0 pl-1 pr-1 pb-0 small mt-1"
                                style="font-size: small"
                                @click.prevent="$emit('postLoginForm')">Login
                        </button>
                    </td>
                </tr>
            </table>
        </div>

    </form>
</template>