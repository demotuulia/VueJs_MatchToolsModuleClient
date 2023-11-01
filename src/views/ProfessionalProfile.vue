<script setup>
import ProfileList from "@/views/components/profileList.vue";
import ProfileForm from "@/views/components/profileForm.vue";
import {axiosGet, axiosPut} from '../lib/ajax.js'
import {userGet} from "@/lib/user";
import {modalOpen, modalClose} from "@/lib/modal";

const props = defineProps(
    ['appProps'],
);

</script>
<script>



import profileList from './components/profileList.vue';
import Modal from './components/modal.vue';

export default {
    name: "profileListParent",
    data() {
        return {
            matchesList : {
                profiles: [],
                columns: {
                    view: true,
                    score: true
                },
                meta: [],
            },
            noProfilesFound: false,

            profileDetails_: {},

            profileForm_: {},

        }
    },

    mounted() {
        this.getProfileFormFromApi();
        this.getProfilesListFromApi(1)
    },

    methods: {

        // ------------------------------------------------------------------------------------------------------
        // Profile Form

        getProfileFormFromApi() {
            this.profileDetails_ = {};
            // by profile id 0, we get the profile of the current user
            axiosGet(
                this,
                '/api/matches/profiles/0',
                {},
                userGet(this),
                'renderFormResponseFromApi'
            )
        },

       renderFormResponseFromApi(response) {
            if (response.data.meta.status == '200') {
                this.profileForm_ = response.data.data[0];
            }
        },

        putProfileToApi() {
            modalClose('profileFromModal');
            // you are not allowed  to send these:
            delete (this.profileForm_.user_id);
            delete (this.profileForm_.is_professional);
            let id = this.profileForm_.id;
            axiosPut(
                this,
                '/api/matches/profiles/' + id,
                this.profileForm_,
                userGet(this),
                'putProfileToApiResponse'
            )
        },

        putProfileToApiResponse(response) {
            this.getProfilesListFromApi(1);
            if (response.data.meta.status == '200') {
                this.appProps.messages = {
                    messages: {"message": "Your data is updated."},
                    type: 'success'
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------
        // Profile Matches List

        // Get from API
        getProfilesListFromApi(page) {
            this.matchesList.profiles = {};
            this.noProfilesFound = false;
            axiosGet(
                this,
                '/api/matches/search?page=' + page,
                {},
                userGet(this),
                'renderProfilesFromApiResponse'
            )
        },
        
        renderProfilesFromApiResponse(response) {
            if (response.data.meta.status == '200') {
                if (response.data.data != undefined) {
                    this.matchesList.profiles = response.data.data;
                    this.matchesList.meta = response.data.meta;
                } else {
                    this.noProfilesFound = true;
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------
        // Profile Details (form matches list)
        
        getProfileDetailsFromApi(id) {
            this.profileDetails_ = [];
            axiosGet(
                this,
                '/api/matches/profiles/' + id,
                {},
                userGet(this),
                'renderMatchDetailsFromApiResponse'
            )
        },

        renderMatchDetailsFromApiResponse(response) {
            modalOpen('profileDetailsModal');
            if (response.data.meta.status == '200') {
                this.profileDetails_ = response.data.data[0];
            }
        },
    }
}
</script>


<template>
    <div class="container">
        <div class="row mt-1">
            <h4 class="float-left col ml-0 pl-2 text-mt-dark">{{ profileForm_.name }}</h4>
            <div class="col">
                <button
                        type="button"
                        class="btn btn-primary float-right"
                        v-on:click="modalOpen('profileFromModal');"
                >
                    Edit your profile
                </button>
            </div>

        </div>

        <div class="row">
            <div v-if="noProfilesFound">No profiles found</div>
        </div>
    </div>

  <!--- Profile list for matches --->
    <profileList
            v-if="matchesList.profiles.length"
            :profileListProps="matchesList"
            @getProfilesListFromApi="getProfilesListFromApi"
            @getProfileDetailsFromApi="getProfileDetailsFromApi"
    />

  <!--- Profile form --->
    <Modal modalId="profileFromModal"
           :title='"Edit: " + profileForm_.name'
           :content="profileForm_"
           @putProfileToApi="putProfileToApi"
    />


  <!--- Profile details --->
    <Modal modalId="profileDetailsModal"
           :title='profileDetails_.name'
           :content="profileDetails_"
    />

</template>
