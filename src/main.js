import { createApp } from "vue";
import App from "./App.vue";
import AdminApp from "./AdminApp.vue";
import router from "./router";
import VueCookies from 'vue-cookies';
import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';

// Note: Javascript for Bootstrap configuration is in index.html
import "./assets/external/bootstrap5/bootstrap.min.css";
import './assets/scss/style.scss'

let uri = window.location.pathname;

if(uri.startsWith('/admin')) {
    // Admin App
    const app = createApp(AdminApp);
    app.use(router);
    app.use(VueCookies);
    app.use(Vue3ConfirmDialog);
    app.mount("#app");
}
else {
    // Front End App
    const app = createApp(App);
    app.use(router);
    app.use(VueCookies);
    app.use(Vue3ConfirmDialog);
    app.mount("#app");
}

