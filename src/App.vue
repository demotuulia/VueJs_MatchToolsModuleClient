<script setup>
import {RouterView} from "vue-router";
import navBar from "./views/components/app/navBar.vue";
import ajaxSpinner from "./views/components/app/ajaxSpinner.vue";
import messageBox from "@/views/components/app/messageBox.vue";
import footerTemplate from "@/views/components/app/footer.vue";
import {userGet} from "./lib/user.js";
</script>
<script>

export default {
    name: "App",
    components: {
        messageBox,
        navBar,
    },
    data() {
        return {
            appProps: {
                showAjaxSpinner: 0,
                messages: {
                    messages: {},
                    type: ''
                },
                userData: {},
            },
            navBarProps: {
                searchTerm: '',
                userData: {},
            },
        };
    },
    mounted() {
        let userData = userGet(this);
        this.appProps.userData = userData;
        this.navBarProps.userData = userData;
    },
    updated() {
        this.navBarProps.searchTerm = this.$route.query.term;
    }
};
</script>

<template>
    <header>
        <navBar :navBarProps="navBarProps"/>
    </header>

    <main role="main" class="container">

        <div class="row">
            <div class="col">
                <messageBox v-if="Object.keys(appProps.messages.messages).length !=0" :message="appProps.messages"/>
            </div>
        </div>

        <router-view :appProps="appProps"/>

    </main>

    <footer class="footer">
        <footerTemplate/>
    </footer>

    <ajaxSpinner v-if="appProps.showAjaxSpinner != 0"/>
</template>