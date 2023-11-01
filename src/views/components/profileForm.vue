<script setup>
import {ref} from 'vue'
import profileData from './profileForm/profileData.vue';
import matches from './profileForm/matches.vue';

const props = defineProps(
    ['profile'],
);


</script>
<template>
    <div class="small ml-1 mr-1">
        <form>
            <div class="row">
                <div class="border mt-1 pl-1 pr-1 pt-1 pb-1 rounded w-100">
                    <profileData :profile="profile"/>
                </div>
            </div>
            <div class="row">
                <div class="border mt-1 pl-1 pr-1 pt-1 pb-1 rounded w-100">
                    <matches :profile="profile"/>
                </div>
            </div>
        </form>
    </div>
</template>