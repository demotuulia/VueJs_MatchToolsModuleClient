<script setup>
import loginFormTemplate from './components/Login/Form.vue';
import loginContent from './components/Login/Content.vue';
import {axiosPost} from '../lib/ajax.js'
import {userLogin, userGet} from '../lib/user.js'

const props = defineProps(
    ['appProps'],
);

</script>
<script>


export default {
    name: "Login",
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

    <div class="container">
        <div class="row justify-content-center mt-4 mb-2">
            <div class="col-auto text-center ">
                <img class="w-50 rounded-circle " src="src/assets/img/login.jpg">
            </div>
        </div>
        <div class="row justify-content-center ">
            <div class="col-auto mt-2">
                <h5 class="text-primary">Log in to Match Tools</h5>
                <loginFormTemplate
                        :loginForm="loginForm"
                        @postLoginForm="postLoginForm"
                />
            </div>
        </div>
        <loginContent/>

    </div>
</template>
