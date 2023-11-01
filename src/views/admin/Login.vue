<script setup>
import loginFormTemplate from './Login/Form.vue'

const props = defineProps(
    ['appProps'],
);
</script>
<script>
import {axiosPost} from '../.././lib/ajax.js'
import {userLogin, userGet} from '../../lib/user.js'

export default {
    name: "adminLogin",
    data() {
        return {
            loginForm: {},
        }
    },

    methods: {

        postLoginForm() {
            axiosPost(
                this,
                '/api/login',
                this.loginForm,
                userGet(this),
                'loginResponse'
            )
        },

        loginResponse(response) {
            if (response.data.success) {
                userLogin(this, response);
                let user = userGet(this);
                this.appProps.userData = user;

                switch(user.role) {
                    case 'professional':
                        this.$router.push('/professional_profile');
                        break;
                    case 'admin':
                        this.$router.push('/admin/dashboard');
                        break;
                    default:
                        this.$router.push('/company_profile');
                }
            } else {
                this.appProps.messages = {
                    messages: {"message": response.data.message},
                    type: 'error'
                }
            }
        }
    }
}
</script>
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col"></div>
            <loginFormTemplate
                    class="col"
                    :loginForm="loginForm"
                    @postLoginForm="postLoginForm"
            />
            <div class="col"></div>
        </div>

        <div class="row">
            <div class="col"></div>
            <div class="col mt-3">
                You can try this demo by the credentials below:
                <table class="table table-sm small mt-4">
                    <tr>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                    <tr>
                        <td>Admin</td>
                        <td>testAdmin@test.nx</td>
                        <td>123</td>
                    </tr>
                </table>
            </div>
            <div class="col"></div>
        </div>

    </div>
</template>
