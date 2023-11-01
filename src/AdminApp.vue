<script setup>
import {RouterView} from "vue-router";
import Menu from "@/views/admin/app/menu.vue";
import Footer from "@/views/admin/app/footer.vue";
import messageBox from "@/views/admin/app/messageBox.vue";
import ajaxSpinner from "./views/components/app/ajaxSpinner.vue";
</script>
<script>
import {userGet} from "./lib/user.js";

export default {
    name: "App",
    components: {},
    data() {
        return {
            appProps: {
                showAjaxSpinner: 0,
                messages: {
                    messages: {},
                    type: ''
                },
                userData: {},
                title: '',
            },
        };
    },
    mounted() {
        this.appProps.userData = userGet(this);
    },
};
</script>


<template>

    <div class="w-100 m-0 p-0" id="admin-wrapper">
        <nav id="adminSidebar">
            <div class="p-0">
                <Menu :appProps="appProps"/>
                <Footer :appProps="appProps"/>
            </div>
        </nav>

        <div
                v-if="appProps.title !=''"
                class="row"
                id="adminTitle"
        >
            <div class="col bg-mt-light rounded mt-2 "
            >
                <h5 class="mt-2 mb-2">{{ appProps.title }}</h5>
            </div>
        </div>

        <div class="row"
             id="adminMessageBox"
        >
            <messageBox class="col  mt-2 "
                        v-if="Object.keys(appProps.messages.messages).length !=0"
                        :message="appProps.messages"
            />
        </div>
        <div id="adminContent" class="row">
            <router-view :appProps="appProps"/>
        </div>
    </div>
    <ajaxSpinner v-if="appProps.showAjaxSpinner != 0"/>
</template>