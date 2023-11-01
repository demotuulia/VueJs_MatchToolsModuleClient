<script setup>

import ProfileList from "@/views/components/profileList.vue";
import {axiosGet, axiosPut} from '../lib/ajax.js'
import {userGet} from "@/lib/user";
import {modalOpen, modalClose} from "@/lib/modal";
import profileList from './components/profileList.vue';
import Modal from "@/views/components/modal.vue";
import {computed} from "vue";

const props = defineProps(
    ['appProps'],
);

</script>

<script>


export default {
    name: "Search",
    data() {
        return {
            searchResultsContent: {
                profiles: [],
                meta: [],
                columns: {
                    view: true,
                },
                noItemsFound: false,
            },

            matchDetails: {},
        }
    },
    mounted() {
        this.getProfilesListFromApi(1)
    },
    methods: {
        // ------------------------------------------------------------------------------------------------------
        // profilesList
        getProfilesListFromApi(page) {

            this.searchResultsContent.profiles = {};
            this.searchResultsContent.noItemsFound = false;
            let user = userGet(this);
            axiosGet(
                this,
                '/api/matches/profiles?page=' + page + '&search=' + this.$route.query.term,
                {},
                userGet(this),
                'profilesListResponse'
            )
        },

        profilesListResponse(response) {

            if (response.data.meta.status == '200') {
                if (response.data.data != undefined) {
                    this.searchResultsContent.profiles = response.data.data;
                    this.searchResultsContent.meta = response.data.meta;
                } else {
                    this.searchResultsContent.noItemsFound = true;
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------
        // Profile Match Details
        getProfileDetailsFromApi(id) {
            this.matchDetails = [];
            axiosGet(
                this,
                '/api/matches/profiles/' + id,
                {},
                userGet(this),
                'profileDetailsResponse'
            )
        },

        profileDetailsResponse(response) {
           modalOpen('profileDetailsModal');
            if (response.data.meta.status == '200') {
                this.matchDetails = response.data.data[0];
            }
        },
    }
}

</script>

<template>
    <h6
        class="ml-3 text-mt-dark"
    >
        <span v-if="searchResultsContent.profiles.length">
          Search results for : {{ this.$route.query.term }}
        </span>
        <span v-else >
          No results found for : {{ this.$route.query.term }}
      </span>
    </h6>


    <profileList
            v-if="searchResultsContent.profiles.length"
            :profileListProps="searchResultsContent"
            @getProfilesListFromApi="getProfilesListFromApi"
            @getProfileDetailsFromApi="getProfileDetailsFromApi"
    />

  <!--- Profile details --->
    <Modal modalId="profileDetailsModal"
           :title="matchDetails.name"
           :content="matchDetails"
    />

</template>
