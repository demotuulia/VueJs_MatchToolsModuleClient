<script>
import {modalOpen, modalClose} from "@/lib/modal";
import profileDetails from '../components/profileDetails.vue';
</script>

<script setup>
import {modalOpen} from "@/lib/modal";
import ProfileForm from "@/views/components/profileForm.vue";
import ProfileList from "@/views/components/profileList.vue";

const props = defineProps(
    [
        'content',
        'title',
        'modalId',
        'parentModalId', // when child is closed, the parent is opened
    ],
);
const emit = defineEmits([
    // Profile from
    'putProfileToApi',

    // profile List
    'getProfileDetailsFromApi',
    'getProfileMatchesFromApi'

])

const openModal = () => {
    modalOpen(props.modalId);
}
const closeModal = () => {
    modalClose(props.modalId);
    if (props.parentModalId !== undefined) {
        modalOpen(props.parentModalId);
    }
}
//
// Emits
//
const putProfileToApi = () => {
    emit('putProfileToApi');
}

const getProfileDetailsFromApi = (profileId) => {

    emit('getProfileDetailsFromApi', profileId);
}

const getProfileMatchesFromApi = (page) => {
    let profileId = props.content.profileIdToGetMatches;
    emit('getProfileMatchesFromApi', page, profileId);
}

</script>

<template>

    <div class="modal fade"
         v-bind:id="modalId"
         aria-modal="true"
         role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header pt-1 pb-2 pl-1">
                    <h5 class="modal-title text-mt-dark pl-0 ml-0">{{ props.title }}</h5>
                    <button type="button"
                            class="close text-mt-dark"
                            aria-label="Close"
                            v-on:click='closeModal()'
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">

                    <profileDetails
                            v-if="modalId == 'profileDetailsModal'"
                            :profile="props.content"
                    />

                    <profile-form
                            v-if="modalId == 'profileFromModal'"
                            :profile="props.content"
                            @putProfileToApi="putProfileToApi"
                    />

                    <profileList
                            v-if="modalId == 'profileListModal'"
                            :profileListProps="props.content"
                            @getProfileDetailsFromApi="getProfileDetailsFromApi"
                            @getProfilesListFromApi="getProfileMatchesFromApi"
                    />


                </div>
                <div class="modal-footer pt-1 pb-1">

                    <button
                            v-if="modalId == 'profileFromModal'"
                            style="font-size: small"
                            class="btn btn-primary small pb-0 pt-0 pl-1 pr-1"
                            v-on:click='putProfileToApi()'>
                        Save
                    </button>

                    <button type="button"
                            style="font-size: small"
                            class="btn btn-primary small pb-0 pt-0 pl-1 pr-1"
                            v-on:click='closeModal()'
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    </div>

    <div
            class="modal-backdrop fade show"
            v-bind:id="'backdrop_'+ modalId"
            id="backdrop"
            style="display: none;"
    >
    </div>
</template>