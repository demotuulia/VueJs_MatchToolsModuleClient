<script setup>
import loginFormTemplate from './Login/Form.vue'

const props = defineProps(
    ['appProps'],
);
</script>
<script>
import {axiosGet, axiosPost} from '../.././lib/ajax.js'
import {userLogin, userGet} from '../../lib/user.js'

export default {
    name: "adminDashboard",
    data() {
        return {
            charts: [],
        }
    },
    mounted() {
        this.appProps.title = 'Dashboard'
        this.getPies();
    },

    updated: function () {
        this.renderPies();
    },

    methods: {
        getPies() {
            this.charts = [];
            axiosGet(
                this,
                '/api/matches/dashboard',
                {},
                userGet(this),
                'getPiesResponse'
            )
        },

        getPiesResponse(response) {
            this.charts = response.data.data.statistics;
        },

        renderPies() {
            if (this.charts.length < 1) {
                return;
            }
            let numberOfPies = this.charts.length;
            let pies = [];
            let index = 0;

            for (index = 0; index < numberOfPies; index++) {
                let handler  = this;
                ['companies', 'professionals'].forEach(
                    function (group)   {
                        let pieElement = document.getElementById(group + '_pie_' + index);//.getContext('2d');
                        if (pieElement != null) {
                            pies[index] = pieElement.getContext('2d');
                           if (handler.charts[index].values !== undefined) {
                               handler.rendePie(index, pies[index], group);
                            }
                        }
                    }
                );
            }
        },

        rendePie(index, pie, group) {

            if (this.charts[index].values[group] == undefined) {
                return;
            }

            const chart = new Chart(pie, {
                type: "pie",
                data: {
                    labels: this.charts[index].values[group].labels,
                    datasets: [{
                        data: this.charts[index].values[group].data,
                        backgroundColor: [
                            "#1E3E82", "#2F298A", "#5D3591", "#884198", "#A04C90", "#A7587A", "#AE6468", "#B58670",
                            "#BCA97C", "#BEC388", "#B1CA94", "#A8D0A0", "#ADD7B6",
                        ],
                        borderColor: "transparent"
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive:true,
                    cutoutPercentage: 15,
                    legend: {
                        position: 'left',
                        fullWidth: false,
                        labels: {
                            padding: 5,
                            boxWidth: 15
                        }
                    },
                }
            });
        },
    }
}


</script>
<template>
    <div class="container ">
        <div class="row " v-for="chart, index in charts">
            <p class="w-100 text-mt-dark rounded bg-mt-light mt-2 pl-1 mb-1">{{ chart.name }}</p>

            <div class="w-50 p-2">
                <p class="small m-0 p-0 mb-2 ">Companies</p>
                <div class="card chart-container border-0 dashboardPie w-100">
                    <canvas :id="'companies_pie_'+ index"></canvas>
                </div>
            </div>

            <div class="w-50 p-2">
                <p class="small m-0 p-0 mb-2 ">Professionals</p>
                <div class="card chart-container border-0  dashboardPie  w-100">
                    <canvas :id="'professionals_pie_'+ index"></canvas>
                </div>
            </div>
        </div>
        
    </div>
</template>
