<script setup>
import equals from './formDetails/equals.vue';
import smallerThan from './formDetails/smallerThan.vue';
import biggerThan from './formDetails/biggerThan.vue';
import multipleChoose from './formDetails/multipleChoose.vue';
import selectMenuValue from './formDetails/menu.vue';
import dateFrom from './formDetails/dateFrom.vue';

const props = defineProps(
    ['profile'],
);
</script>

<template>
    <h6 class="font-weight-bold text-primary">Matches</h6>
    <table class="table-striped">
        <tr v-for="match,index in profile.matches">
            <td class="align-top text-right bg-mt-dark text-light "
                :class="{
                    'rounded-top' : index === 0 ,
                    'rounded-bottom' : index ==profile.matches.length -1
                }"
            >
                {{ match.label }}:&nbsp;
            </td>
            <td class=" mt-0 pt-0 pb-0">&nbsp;
                <span v-if="match.match_type === 'EQUAL'"><equals :match="match"/></span>
                <span v-if="match.match_type === 'SMALLER_THAN'"><smallerThan :match="match"/></span>
                <span v-if="match.match_type === 'BIGGER_THAN'"><biggerThan :match="match"/></span>
                <span v-if="match.match_type === 'MULTIPLE_CHOOSE'"><multipleChoose :match="match"/></span>
                <span v-if="match.match_type === 'MENU'"><selectMenuValue :match="match"/></span>
                <span v-if="match.match_type === 'DATE_FROM'"><dateFrom :match="match"/></span>
            </td>
        </tr>
    </table>


</template>
