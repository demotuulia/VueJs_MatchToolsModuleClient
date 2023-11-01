<script setup>
import formList from './Forms/list.vue'
import formEdit from './Forms/edit.vue'

const props = defineProps(
    ['appProps'],
);
</script>
<script>
import {axiosGet, axiosPut} from '/src/lib/ajax.js'
import {userLogin, userGet} from '/src/lib/user.js'
import {modalClose} from "@/lib/modal";

export default {
    name: "adminDashboard",

    data() {
        return {
            formListContent: {
                list: [],
                meta: [],
                columns: {},
                noItemsFound: false,
            },
            editFormContent: {
                form: {}
            },
            currentSection: 'formList'
        }
    },

    mounted() {
        this.getFormsList()
        this.appProps.title = 'Forms'
    },

    methods: {

        //
        //  get list
        //
        getFormsList() {
            this.formListContent.list = {};
            this.formListContent.noItemsFound = false;
            axiosGet(
                this,
                '/api/matches/forms',
                {},
                userGet(this),
                'formListResponse'
            )
        },

        formListResponse(response) {

            if (response.data.meta.status == '200') {
                if (response.data.data != undefined) {
                    this.formListContent.list = response.data.data;
                    this.formListContent.meta = response.data.meta;
                } else {
                    this.formListContent.noItemsFound = true;
                }
            }
        },

        //
        // Open edit form
        //
        editForm(id) {
            this.appProps.messages = {
                messages: {},
                type: ''
            }
            axiosGet(
                this,
                '/api/matches/forms/' + id,
                {},
                userGet(this),
                'editFormResponse'
            )
        },

        editFormResponse(response) {
            this.currentSection = 'editForm';
            this.editFormContent.form = response.data;
        },

        closeEditForm() {
            this.currentSection = 'formList';
        },

        //
        // Save form
        //
        saveEditForm() {
            let id = this.editFormContent.form.data[0]['id'];

            axiosPut(
                this,
                '/api/matches/forms/' + id,
                this.editFormContent.form.data[0],
                userGet(this),
                'saveEditFormResponse'
            )
        },

        saveEditFormResponse(response) {

            if (response.data.meta.status == 200) {

                this.currentSection = 'formList';
                this.appProps.messages = {
                    messages: {"message": "Your data is updated."},
                    type: 'success'
                }
            } else {
                this.appProps.messages = {
                    messages: response.data.errors,
                    type: 'error'
                }
            }
        }
    }
}
</script>
<template>
    <div class="container ">
        <div class="row ">
    <formList
            v-if="currentSection=='formList'"
            :content="formListContent"
            @editForm="editForm"
    />

    <formEdit
            v-if="currentSection=='editForm'"
            :form="editFormContent"
            @saveEditForm="saveEditForm"
            @closeEditForm="closeEditForm"
    />
        </div>
    </div>

</template>
