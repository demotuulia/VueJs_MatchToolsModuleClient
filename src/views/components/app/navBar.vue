<script setup>
import {ref, onMounted} from 'vue'


</script>
<script>
export default {
    name: "navBar",
    props: {
        navBarProps: {},
    },

    methods: {
        menuItems() {
            switch (this.navBarProps.userData.role) {
                case 'professional':
                    return [
                        {name: 'Home', link: '/'},
                        {name: 'Logout', link: '/logout'},
                        {name: 'Matches', link: '/professional_profile'},

                    ];
                    break;
                case 'company':
                    return [
                        {name: 'Home', link: '/'},
                        {name: 'Logout', link: '/logout'},
                        {name: 'Matches', link: '/company_profile'},
                    ];

                default:
                    return [
                        {name: 'Home', link: '/'},
                        {name: 'Login', link: '/Login'},
                        {name: 'Register', link: '/register'},
                        {name: 'Admin', link: '/admin'},
                    ];
            }
        },

        search(e) {
            e.preventDefault();
            window.location.href = '/search?term=' + this.navBarProps.searchTerm;
        }
    }
}

</script>

<template>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top rounded  ms-navbar d-flex align-items-end  ">
        <img src="../../../assets/icons/logo.png" id="logo" class="rounded">
        <div class="collapse navbar-collapse bg-mt-dark rounded" id="navbarCollapse">
                <span v-if="navBarProps.userData.name != undefined" class="text-light small pl-1">
            &nbsp;Welcome {{ navBarProps.userData.name }}&nbsp;
        </span>
            <ul class="navbar-nav mr-auto " style="z-index: 1000" v-for="linkItem in menuItems() ">
                <li class="nav-item active pl-1">
                    <a class="nav-link" v-bind:href="linkItem.link">
                        {{ linkItem.name }}
                    </a>
                </li>

            </ul>

            <form class="form-inline mt-2 mt-md-0" @submit.prevent="search">
                <input class="form-control mr-sm-2 w-50 navBarSearchInput"
                       type="text"
                       placeholder="Search"
                       aria-label="Search"
                       v-model="navBarProps.searchTerm"
                >
                <button class="btn btn-outline-light my-2 my-sm-0 bi-search border-0" type="submit"></button>
            </form>
        </div>

        <!-- hamburger -->
        <button class="navbar-toggler btn-primary  bg-mt-dark border-0 p-3"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="bi-list text-light lead  bg-mt-dark"></span>
        </button>
    </nav>


</template>
