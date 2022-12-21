<template>
  <q-card flat bordered class="chart-card">
    <q-card-section>
      <div class="row q-py-sm">
        <div class="q-pa-sm">
          <strong>Wind Erosion Sensitivity 2020</strong>
        </div>
        <q-space />
        <div class="q-py-sm">
          <q-btn unelevated rounded color="grey-9" size="sm" label="Remove Layer" />
        </div>
      </div>
      <div class="row">
        <div class="q-gutter-sm" style="min-width: 150px">
          <q-select rounded outlined dense :options="options" label="Reporting Year" stack-label />
        </div>
        <q-space />
        <div class="q-gutter-sm">
          <q-btn round dense size="sm" color="grey-9" icon="map">
            <q-tooltip class="bg-grey-9">add layer to map</q-tooltip>
          </q-btn>
          <q-btn round dense size="sm" color="grey-9" icon="mdi-compare">
            <q-tooltip class="bg-grey-9">Compare</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-card flat bordered class="chart-card">
        <q-card-section>
          <div class="row q-pa-md q-gutter-sm">
            <div>
              <strong> Wind Erosion Sensitivity 2020</strong>
            </div>
            <q-space />
            <div class="row chart-btns q-gutter-sm q-ma-none">
              <q-btn round dense outline size="9px" color="grey-9" icon="swap_horiz" @click="switchChart()" />
              <q-btn round dense outline type="submit" size="9px" color="grey-9" icon="file_download"
                @click="exportChart" />
              <q-btn round dense outline size="9px" color="grey-9" icon="share" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-py-md">
            <pieChart :chartData="piechartData"></pieChart>
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
    <q-card-section>
      <q-card flat bordered class="chart-card">
        <div class="row q-pa-md">
          <div class="q-gutter-sm" style="min-width: 50%">
            <q-select rounded outlined dense :options="options" label="Start Year" stack-label />
          </div>
          <q-space />
          <div class="q-gutter-sm" style="min-width: 50%">
            <q-select rounded outlined dense :options="options" label="End Year" stack-label />
          </div>
        </div>
        <div class="row q-pa-md q-gutter-sm">
          <div>
            <strong> Wind Erosion Sensitivity 2015 - 2020</strong>
          </div>
          <q-space />
          <div class="row chart-btns q-gutter-sm q-ma-none">
            <q-btn round dense outline size="9px" color="grey-9" icon="swap_horiz" @click="switchChart()" />
            <q-btn round dense outline type="submit" size="9px" color="grey-9" icon="file_download"
              @click="exportChart" />
            <q-btn round dense outline size="9px" color="grey-9" icon="share" />
          </div>
        </div>
        <div class="q-py-md">
          <stackedBarChart :chartData="timeSeriesData" v-if="defaultChart" />
          <lineChart :chartData="lineData" v-else />
        </div>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";

export default {
  components: {
    stackedBarChart: require("../../../../charts/stackedBar.vue").default,
    pieChart: require("../../../../charts/pieChart.vue").default,
    lineChart: require("../../../../charts/lineChart.vue").default,
  },

  setup() {
    const defaultChart = ref(true);
    const piechartData = ref(null);
    const timeSeriesData = ref(null);
    const lineData = ref(null);

    const switchChart = function () {
      defaultChart.value = !defaultChart.value;
    };

    piechartData.value = {
      labels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      datasets: [
        {
          backgroundColor: [
            "#267300",
            "#808080",
            //"#55ff0000",
            // "#ffebaf",
            // "#ff7f7f",
          ],
          borderColor: [],
          borderRadius: {
            outerEnd: [0, 20],
            outerStart: [20, 0],
            innerStart: [20, 0],
            innerEnd: [0, 20]
          },
          borderAlign: 'center',
          borderWidth: 0,
          spacing: 0,
          cutout: "98",
          rotation: 180,
          circumference: 290,
          radius: "75%",
          data: [75, 30,],
        },
      ],
    };

    lineData.value = {
      labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          backgroundColor: "#267300",
          borderColor: "#267300",
          data: [19, 19, 19, 19, 19, 19],
          label: "Very Low",
          tension: 0.1,
        },
        {
          backgroundColor: "#a8a800",
          borderColor: "#a8a800",
          data: [21, 21, 21, 21, 21, 21],
          label: "Low",
          tension: 0.1,
        },
        {
          backgroundColor: "#55ff00",
          borderColor: "#55ff00",
          data: [25, 25, 25, 25, 25, 25],
          label: "Moderate",
          tension: 0.1,
        },
        {
          backgroundColor: "#ffebaf",
          borderColor: "#ffebaf",
          data: [15, 15, 15, 15, 15, 15],
          label: "High",
          tension: 0.1,
        },
        {
          backgroundColor: "#ff7f7f",
          borderColor: "#ff7f7f",
          data: [10, 10, 10, 10, 10, 10],
          label: "Very High",
          tension: 0.1,
        },
      ],
    };

    timeSeriesData.value = {
      labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          backgroundColor: "#267300",
          data: [19, 19, 19, 19, 19, 19],
          label: "Very Low",
        },
        {
          backgroundColor: "#a8a800",
          data: [21, 21, 21, 21, 21, 21],
          label: "Low",
        },
        {
          backgroundColor: "#55ff00",
          data: [25, 25, 25, 25, 25, 25],
          label: "Moderate",
        },
        {
          backgroundColor: "#ffebaf",
          data: [15, 15, 15, 15, 15, 15],
          label: "High",
        },
        {
          backgroundColor: "#ff7f7f",
          data: [10, 10, 10, 10, 10, 10],
          label: "Very High",
        },
      ],
    };

    return {
      value: ref(true),
      model: ref(null),
      piechartData,
      timeSeriesData,
      lineData,
      defaultChart,
      switchChart,
      options: ["2015", "2016", "2017", "2018", "2019"],
    };
  },
};
</script>

<style lang="scss">
.chart-card {
  border-color: #21ba45;
}
</style>
