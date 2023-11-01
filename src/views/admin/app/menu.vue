<script setup>
const props = defineProps(
    ['appProps'],
);
</script>
<script>
export default {
    methods: {

        menuItems() {
            switch (this.appProps.userData.role) {
                case 'admin':
                    return [
                        {name: 'Dashboard', link: '/admin/dashboard'},
                        {name: 'Forms', link: '/admin/forms'},
                        {name: 'Professionals', link: '/admin/professionals'},
                        {name: 'Companies', link: '/admin/companies'},
                        {name: 'Logout', link: '/admin/logout'},
                        {name: 'Frontend', link: '/'},
                    ];
                    break;
                default:
                    return [
                        {name: 'Login', link: '/admin/'},
                        {name: 'Frontend', link: '/'},
                    ];
            }
        }
    }
}
</script>
<template>
    <ul v-for="linkItem in menuItems() ">
        <li class="">
            <a :class="{ selected :this.$route.path ==linkItem.link }"
               v-bind:href="linkItem.link"
            >
                {{ linkItem.name }}
            </a>
        </li>
    </ul>
</template>