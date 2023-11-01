<script setup>
import contactData from './profileDetails/contactData.vue';
import matches from './profileDetails/matches.vue';
import description from './profileDetails/description.vue';
import ContactData from "@/views/components/profileDetails/contactData.vue";
import Matches from "@/views/components/profileDetails/matches.vue";
import Description from "@/views/components/profileDetails/description.vue";

const props = defineProps(
    [
        'profile'
    ],
);

</script>
<template>

    <div class="small ml-1 mr-1">
        <div class="row">
            <div v-if="profile.user != undefined"
                 class="float-left bg-mt-dark w-100 small text-light pl-2 pt-1 pb-1 font-italic rounded"
            >
                <contactData :profile="profile"/>
            </div>
        </div>
        <div class="row">
            <div class="border mt-1 pl-1 pr-1 pt-1 pb-1  font-italic rounded">
                <description :profile="profile"/>
            </div>
        </div>
        <div class="row">
            <div class="border mt-1 pl-1 pr-1 pt-1 pb-1 rounded w-100">
                <matches :profile="profile"/>
            </div>
        </div>
    </div>


</template>