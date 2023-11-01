<script setup>
import {computed} from "vue";
import Home from "@/views/Home.vue";
import {modalOpen} from "@/lib/modal";
import {ref} from 'vue';

const props = defineProps(
    ['form'],
);

defineEmits([
    'saveEditForm',
    'closeEditForm',
])

const addMatch = () => {
    let newIndex = props.form.form.data[0].matches.length;
    let ordering = props.form.form.data[0].matches[newIndex - 1].ordering + 1;

    props.form.form.data[0].matches[newIndex] = {
        "label": "New Match",
        "match_type": "",
        "ordering": ordering,
        "options": []
    };
}
const deleteMatch = (index) => {
    let text = 'Are you sure you want to delete the match "' + props.form.form.data[0].matches[index].label + '"?';
    if (confirm(text)) {
        props.form.form.data[0].matches.splice(index, 1);
    }

}
const addOption = (index, matchId) => {
    let newIndex = props.form.form.data[0].matches[index]['options'].length;
    props.form.form.data[0].matches[index]['options'][newIndex] = {
        "value": "new option",
        'matches_id': matchId,
        'order': 1,
    }
}

const deleteOption = (index, optionIndex) => {
    let text = 'Are you sure you want to delete the option "' +
        props.form.form.data[0].matches[index].options[optionIndex].value + '"?';
    if (confirm(text)) {
        props.form.form.data[0].matches[index]['options'].splice(optionIndex, 1);
    }
}
const move = (index, direction) => {

    let moveDir = direction == 'up' ? -1 : 1;
    let swapDir = direction == 'up' ? 1 : -1;
    let swapIndex = index + moveDir;

    props.form.form.data[0].matches[index].ordering =
        parseInt(props.form.form.data[0].matches[index].ordering) + moveDir;
    props.form.form.data[0].matches[swapIndex].ordering =
        parseInt(props.form.form.data[0].matches[swapIndex].ordering) + swapDir;

    let tmp = props.form.form.data[0].matches[swapIndex];
    props.form.form.data[0].matches[swapIndex] = props.form.form.data[0].matches[index];
    props.form.form.data[0].matches[index] = tmp;
}

</script>

<template>
    <div class="mb-4 w-100">
        <button
                class="btn btn-primary small pb-0 pt-0 pl-1 pr-1"
                v-on:click="$emit('saveEditForm')">
            Save
        </button>
        <button
                class="btn btn-primary small pb-0 pt-0 pl-1 pr-1 ml-2"
                v-on:click="addMatch">
            &nbsp;&nbsp;+&nbsp;&nbsp;
        </button>
        <button
                class="btn btn-primary small pb-0 pt-0 pl-1 pr-1 ml-2 float-right"
                v-on:click="$emit('closeEditForm');">
            Close
        </button>
    </div>

    <form class="w-100 small">
        Name:
        <input v-model="form.form.data[0].name" class="w-50 mb-2">

        <table class="table table-striped table-sm ">
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Options</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="match, index in form.form.data[0].matches">
                <td>{{ form.form.data[0].matches[index].ordering }}</td>
                <td>
                    <input v-model="form.form.data[0].matches[index].label" class="w-75">
                </td>
                <td>
                    <span v-if="match.id != undefined">
                        {{ form.form.data[0].matches[index].match_type }}
                    </span>
                    <span v-else>
                         <select
                                 class="border-dark"
                                 v-model="form.form.data[0].matches[index].match_type"
                         >
                        <option v-for="matchType in form.form.data[0].matchTypes">
                            {{ matchType }}
                        </option>
                    </select>
                    </span>
                </td>

                <td v-if="form.form.data[0].matches[index].match_type == 'MENU' ||
                          form.form.data[0].matches[index].match_type == 'MULTIPLE_CHOOSE' "
                >
                    <ul class="m-0 p-0">
                        <li
                                class="text-dark w-100"
                                v-for="option, optionIndex in form.form.data[0].matches[index].options"
                        >
                            <span
                                    v-on:click="deleteOption(index, optionIndex)"
                                    class="bi-dash-circle  cursor-pointer mr-1 text-danger">

                            </span>
                            <input v-model="form.form.data[0].matches[index].options[optionIndex].value" class="w-50">

                        </li>
                    </ul>
                    <span v-on:click="addOption(index, match['id'])"
                          class="bi-plus-circle text-success cursor-pointer ">
                    </span>
                </td>
                <td v-else></td>


                <td>
                    <div v-on:click="deleteMatch(index)" class="bi-trash  text-danger cursor-pointer "></div>
                    <div v-if="form.form.data[0].matches[index].ordering > 1"
                         v-on:click="move(index, 'up')"
                         class="bi-arrow-up-circle mt-2  cursor-pointer ">
                    </div>
                    <div v-if="form.form.data[0].matches[index].ordering < form.form.data[0].matches.length -1 "
                         v-on:click="move(index, 'down')"
                         class="bi-arrow-down-circle mt-2  cursor-pointer "
                    >
                    </div>
                </td>

            </tr>
            </tbody>
        </table>
    </form>
</template>
