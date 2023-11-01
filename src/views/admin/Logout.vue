<script setup>
const props = defineProps(
    ['appProps'],
);

</script>
<script>
import {axiosGet, axiosPost} from '../../lib/ajax.js'
import {userLogout, userGet} from '../../lib/user.js'

export default {
    name: "Logout",
    data() {
        return {
        }
    },

    mounted() {
        this.logout();
    },

    methods: {
        logout() {
            axiosGet(
                this,
                '/api/logout',
                {},
                userGet(this),
                'logoutResponse'
            )
        },
        logoutResponse(response) {
            this.appProps.userData = {};
            userLogout(this, response);
            this.$router.push('/admin');
        }
    }
}

</script>


<template>
</template>
