<script setup>
import ProfileList from "@/views/components/profileList.vue";
import profileList from './components/profileList.vue';
import profileDetails from './components/profileDetails.vue';

const props = defineProps(
    ['appProps'],
);
</script>

<script>
import Modal from './components/modal.vue';
import {modalClose, modalOpen} from "@/lib/modal";
import {axiosDelete, axiosPost, axiosGet, axiosPut} from "@/lib/ajax";
import {userGet} from "@/lib/user";
import {confirm} from "@/lib/confirm";

export default {
    name: "profileListParent",
    data() {
        return {

            profileListContent: {
                profiles: [],
                columns: {
                    viewMatches: true,
                    edit: true,
                    delete: true,
                },
                meta: [],
                noItemsFound: false,
            },

            matchDetails: {},

            profileMatchesContent: {
                profiles: [],
                meta: [],
                columns: {
                    view: true,
                    'score': true
                },
                noProfilesMatchesFound: false,
            },

            profileFormContent: {},

            user: {},
        }
    },

    mounted() {
        this.getProfilesListFromApi(1)
        this.user = userGet(this);
    },

    methods: {

        // ------------------------------------------------------------------------------------------------------
        // profilesList

        getProfilesListFromApi(page) {
            this.profileListContent.profiles = {};
            this.profileListContent.noItemsFound = false;
            let user = userGet(this);
            axiosGet(
                this,
                '/api/matches/profiles?user_id=' + user.id + '&page=' + page,
                {},
                userGet(this),
                'renderProfilesList'
            )
        },

        renderProfilesList(response) {
            if (response.data.meta.status == '200') {
                if (response.data.data != undefined) {
                    this.profileListContent.profiles = response.data.data;
                    this.profileListContent.meta = response.data.meta;
                } else {
                    this.profileListContent.noItemsFound = true;
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------
        // Profile Match Details

        // Get from API
        getProfileDetailsFromApi(id) {
            this.matchDetails = [];
            axiosGet(
                this,
                '/api/matches/profiles/' + id,
                {},
                userGet(this),
                'renderProfileDetailsFromResponse'
            )
        },


        renderProfileDetailsFromResponse(response) {
            modalClose('profileListModal')
            modalOpen('profileDetailsModal');
            if (response.data.meta.status == '200') {
                this.matchDetails = response.data.data[0];
            }
        },

        // ------------------------------------------------------------------------------------------------------
        // ProfileMatches

        getProfileMatchesFromApi(page, profileId) {

            this.profileMatchesContent.profiles = {};
            this.profileMatchesContent.noProfilesMatchesFound = false;
            this.profileMatchesContent.profileIdToGetMatches = profileId;
            axiosGet(
                this,
                '/api/matches/search?profile_id=' + profileId + '&page=' + page,
                {},
                userGet(this),
                'renderProfileMatchesFromApi'
            )
        },

        renderProfileMatchesFromApi(response) {
            modalOpen('profileListModal');
            if (response.data.meta.status == '200') {
                if (response.data.data != undefined) {
                    this.profileMatchesContent.profiles = response.data.data;
                    this.profileMatchesContent.meta = response.data.meta;
                } else {
                    this.profileMatchesContent.noProfilesMatchesFound = true;
                }
            }
        },

        // ------------------------------------------------------------------------------------------------------
        // Profile Form

        getProfileFormFromApi(id) {
            this.profileFormContent = {};
            // by profile id 0, we get the profile of the current user
            axiosGet(
                this,
                '/api/matches/profiles/' + id,
                {},
                userGet(this),
                'renderFormResponseFromApi'
            )
        },

        renderFormResponseFromApi(response) {
            modalOpen('profileFromModal');
            if (response.data.meta.status == '200') {
                this.profileFormContent = response.data.data[0];
                delete (this.profileFormContent.user_id);
                delete (this.profileFormContent.is_professional);
            }
        },

        putProfileToApi() {
            modalClose('profileFromModal');
            let id = this.profileFormContent.id;
            axiosPut(
                this,
                '/api/matches/profiles/' + id,
                this.profileFormContent,
                userGet(this),
                'putProfileToApiResponse'
            )
            this.profileFormContent = {}

        },

        putProfileToApiResponse(response) {
            if (response.data.meta.status == '200') {
                this.appProps.messages = {
                    messages: {"message": "Your data is updated."},
                    type: 'success'
                }
            }
            this.getProfilesListFromApi(1);
        },

        // ------------------------------------------------------------------------------------------------------
        // Add Profile

        addProfile() {
            let user = userGet(this);
            this.profileFormContent = {};
            axiosPost(
                this,
                '/api/matches/profiles/',
                {
                    user_id: user.id,
                    is_professional: 0,
                    matches_form_id: import.meta.env.VITE_MATCHES_FORM_ID,
                    name: 'New Vacancy'
                },
                user,
                'addProfileResponse'
            )
        },

        addProfileResponse(response) {
            this.getProfileFormFromApi(response.data.data[0].id);
        },

        // ------------------------------------------------------------------------------------------------------
        // Delete Profile

        confirmDeleteProfile(id, name) {
            confirm(
                this, 'Are you sure you want to delete the vacancy"' + name + '"?',
                'deleteProfile',
                id
            );
        },

        deleteProfile(id, name) {
            axiosDelete(
                this,
                '/api/matches/profiles/' + id,
                this.profileFormContent,
                userGet(this),
                'deleteProfileResponse'
            )
            this.profileFormContent = {}
        },

        deleteProfileResponse(response) {
            if (response.data.meta.status == '200') {
                this.appProps.messages = {
                    messages: {"message": "The vacancy is deleted."},
                    type: 'success'
                }
            }
            this.getProfilesListFromApi(1);
        },
    },
}

</script>


<template>

    <div class="row mt-1">
        <h4 class="float-left col ml-0 pl-4 text-mt-dark">{{ user.company }}</h4>
        <div class="col">
            <button
                    type="button"
                    class="btn btn-primary float-right"
                    v-on:click="addProfile"
            >
                Add vacancy
            </button>
        </div>

    </div>

    <div v-if="profileListContent.noItemsFound">No profiles found</div>

  <!--- Profile list for the current company--->
    <profileList
            v-if="profileListContent.profiles.length"
            :profileListProps="profileListContent"
            @getProfilesListFromApi="getProfilesListFromApi"
            @getProfileDetailsFromApi="getProfileDetailsFromApi"
            @getProfileMatchesFromApi="getProfileMatchesFromApi"
            @getProfileFormFromApi="getProfileFormFromApi"
            @deleteProfile="confirmDeleteProfile"
    />

    <Modal modalId="profileListModal"
           title='Matches'
           :content="profileMatchesContent"
           @getProfileDetailsFromApi="getProfileDetailsFromApi"
           @getProfileMatchesFromApi="getProfileMatchesFromApi"
    />


  <!--- Profile details --->
    <Modal modalId="profileDetailsModal"
           parentModalId="profileListModal"
           :title="matchDetails.name"
           :content="matchDetails"
    />

  <!--- Profile form --->
    <Modal modalId="profileFromModal"
           :title='profileFormContent.name'
           :content="profileFormContent"
           @putProfileToApi="putProfileToApi"
    />

    <vue3-confirm-dialog></vue3-confirm-dialog>
</template>
