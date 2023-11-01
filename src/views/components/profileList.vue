<script setup>
import {computed} from 'vue'

const props = defineProps(
    [
        'profileListProps'
    ],
);

defineEmits([
    'getProfilesListFromApi',
    'getProfileDetailsFromApi',
    'getProfileMatchesFromApi',
    'getProfileFormFromApi',
    'deleteProfile',

])

const nextPage = computed(() => {
    let nextPage = props.profileListProps.meta.page + 1;
    if (nextPage > props.profileListProps.meta.number_of_pages) {
        nextPage = 0;
    }
    return nextPage;
})

const previousPage = computed(() => {
    let previousPage = props.profileListProps.meta.page - 1;
    return previousPage;
})

</script>
<template>
    <div class="container">
        {{ profileListProps.meta.total_count }} &nbsp;
        <span v-if="profileListProps.profiles[0] != undefined">
      <span v-if="profileListProps.profiles[0].is_professional=1">vacancies</span><span v-else>profiles</span>
    </span>
        found.&nbsp;

        <div class="float-right border rounded bg-mt-light mt-2 mb-2 pr-1 pl-1 small">
            <span v-if="previousPage" v-on:click="$emit('getProfilesListFromApi',previousPage)"
              class="bi-caret-left cursor-pointer">
            </span>
           Page: {{ profileListProps.meta.page }}/ {{ profileListProps.meta.number_of_pages }}
            <span v-if="nextPage" v-on:click="$emit('getProfilesListFromApi',nextPage)"
                  class="bi-caret-right cursor-pointer">
         </span>
        </div>


        <table class="table table-striped table-sm small  ">
            <thead>
            <th>Name</th>
            <th v-if="profileListProps.columns.score != undefined">
                Score(%)
            </th>
            <th v-if="profileListProps.columns.view != undefined"></th>
            <th v-if="profileListProps.columns.edit != undefined"></th>
            <th v-if="profileListProps.columns.viewMatches != undefined"></th>
            </thead>
            <tbody>
            <tr v-for="profile in profileListProps.profiles">

                <td class="w-25"> {{ profile.name }}</td>
                <td v-if="profileListProps.columns.score != undefined">{{ profile.score }}</td>

                <td v-on:click="$emit('getProfileDetailsFromApi',profile.id)"
                    v-if="profileListProps.columns.view != undefined"
                    class="bi-eye  cursor-pointer profileListButton"
                >
                </td>
                <td v-on:click="$emit('getProfileFormFromApi',profile.id)"
                    v-if="profileListProps.columns.edit != undefined"
                    class="bi-pencil  cursor-pointer profileListButton"
                >
                </td>
                <td v-on:click="$emit('getProfileMatchesFromApi', 1,profile.id)"
                    v-if="profileListProps.columns.viewMatches != undefined"
                    class="bi-bullseye  cursor-pointer profileListButton"
                >
                </td>

                <td v-on:click="$emit('deleteProfile',profile.id,  profile.name)"
                    v-if="profileListProps.columns.delete != undefined"
                    class="bi-trash  cursor-pointer profileListButton"
                >
                </td>
            </tr>
            </tbody>
        </table>
        <span class="border rounded  p-1 mt-0">
           Pages:
        <span v-for="pageindex in profileListProps.meta.number_of_pages">
          <span v-on:click="$emit('getProfilesListFromApi',pageindex)"
                class ="cursor-pointer"
          >
              {{ pageindex }}&nbsp;&nbsp;
          </span>
        </span>
       </span>

    </div>
</template>