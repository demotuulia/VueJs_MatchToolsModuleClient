<script setup>
import Professional from "@/views/components/register/professional.vue";
import Company from "@/views/components/register/company.vue";
import {axiosPost} from '../lib/ajax.js'
import professional from './components/register/professional.vue';
import company from './components/register/company.vue';
import {userGet} from "@/lib/user";

const props = defineProps(
    ['appProps'],
);

</script>

<script>

export default {
    name: "Register",
    data() {
        return {
            companyForm: {
                role: 'company',
            },
            professionalForm: {
                role: 'professional',
            },
        }
    },

    methods: {

        postCompanyForm() {
            this.postForm(
                this.companyForm
            )
        },

        postProfessionalForm() {
            this.postForm(
                this.professionalForm
            )
        },

        postForm(data) {
            axiosPost(
                this,
                '/api/register',
                data,
                {},
                'postFormResponse'
            )
        },

        postFormResponse(response) {
            if (response.data.success) {
                this.companyForm = {
                    role: 'company',
                };
                this.professionalForm ={
                    role: 'professional',
                };
                this.appProps.messages = {
                    messages: {"message": "You are registered. You can now log in with your e-mail"},
                    type: 'success'
                }
            } else {
                this.appProps.messages = {
                    messages:  response.data.errors,
                    type: 'error'
                }
            }
        }
    }
}

</script>


<template>
    <div class="container text-center">
        <img src="../assets/img/dartBoard.jpeg" class="w-25 mt-2 mb-2 rounded-circle ">
        <div class="mb-2">
            Hac habitasse platea dictumst. Pellentesque sit amet feugiat libero, vel eleifend
            sapien. Praesent sem urna, facilisis ut malesuada sit amet, ornare tincidunt nisl.
            Nulla non eros vitae nulla congue fringilla eget vel tellus.

        </div>
    </div>

    <div class="container">
        <div class="card-deck mb-3 text-center">
            <!-- professional form -->
            <div class="card mb-4 ">
                <div class="card-header bg-mt-dark text-light">
                    <h4 class="my-0 font-weight-normal">Professional</h4>
                </div>
                <div class="card-body">
                    <professional
                            :professional-form="professionalForm"
                            @postProfessionalForm="postProfessionalForm"
                    />
                </div>
            </div>

            <!-- company form -->
            <div class="card mb-4 ">
                <div class="card-header bg-mt-dark text-light">
                    <h4 class="my-0 font-weight-normal">Company</h4>
                </div>
                <div class="card-body">
                    <company
                            :companyForm="companyForm"
                            @postCompanyForm="postCompanyForm"
                    />
                </div>
            </div>

        </div>
    </div>
</template>
