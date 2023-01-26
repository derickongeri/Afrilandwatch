<template>
  <div class="q-pa-md">
    <q-card flat class="chart-card" style="background: #f8f9f4">
      <q-card-section>
        <div class="row q-px-md q-gutter-md justify-center items-center">
          <div class="col">
            <!-- <strong> SDG 15.3.1 Indicator 2021</strong> -->
            <div style="min-width: 150px; max-width: 250px">
              <q-select
                style="max-width: 75%"
                color="lime-9"
                v-model="selectedYear"
                rounded
                outlined
                dense
                :options="options"
                @update:model-value="getSelectedYear"
                label="Reporting Year"
                stack-label
              />
            </div>
          </div>
          <div class="col">
            <div class="row chart-btns q-gutter-sm q-ma-none q-pa-none">
              <q-space />
              <!-- <q-btn style="background: #838c48" unelevated rounded color="" size="xs" label="Remove Layer" /> -->
              <q-btn
                style="background: #838c48"
                unelevated
                round
                size="xs"
                color=""
                icon="mdi-cog"
              >
                <q-menu
                  flat
                  class="q-pa-sm menu-card"
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 0]"
                >
                  <div class="">
                    <div
                      class="menu-content bg-grey-2 q-pa-sm q-ma-sm"
                      style="border-radius: 5px"
                    >
                      <div class="arrow-up q-ma-xs"></div>
                      <span
                        class="text-grey-9 q-mx-sm"
                        style="font-size: 0.75em"
                        >Reporting Year</span
                      >
                      <div class="q-my-sm q-mx-sm" style="min-width: 150px">
                        <q-select
                          class="q-my-none q-py-none"
                          rounded
                          outlined
                          dense
                          options-dense
                          :options="options"
                        />
                      </div>
                      <span
                        class="text-grey-9 q-mx-sm"
                        style="font-size: 0.75em"
                        >Reporting Year</span
                      >
                      <div class="q-my-sm q-mx-sm" style="min-width: 150px">
                        <q-select
                          class="q-my-none q-py-none"
                          rounded
                          outlined
                          dense
                          options-dense
                          :options="options"
                          @update:model-value="getSelectedYear"
                        />
                      </div>
                    </div>
                  </div>
                </q-menu>
              </q-btn>
              <!-- <q-btn round dense size="sm" color="grey-9" icon="map">
                  <q-tooltip class="bg-grey-9">add layer to map</q-tooltip>
                </q-btn> -->
              <q-btn
                style="background: #838c48"
                unelevated
                round
                size="xs"
                color=""
                @click="icon = true"
                icon="mdi-information-outline"
              >
                <q-tooltip class="bg-grey-9">More Information</q-tooltip>
              </q-btn>
              <q-dialog v-model="icon">
                <q-card>
                  <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Close icon</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                  </q-card-section>
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum repellendus sit voluptate voluptas eveniet porro.
                    Rerum blanditiis perferendis totam, ea at omnis vel numquam
                    exercitationem aut, natus minima, porro labore.
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="q-px-md q-mt-none text-justify">
          Explore interactive charts and maps that summarize the yearly
          Landcover. Landcover Data is obtained from Esa CCI Landcover and
          reclassified into 6 IPCC classes and Includes Water.
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-py-none">
          <div class="row items-center q-gutter-sm q-px-xl q-mb-md">
            <div class="col q-my-none q-mx-none">
              <strong> SDG 15.3.1 Indicator 2021</strong>
            </div>
            <q-space />
            <div id="chart-btns">
              <q-btn
                unelevated
                round
                flat
                dense
                size="9px"
                :color="activeBtn[0]"
                icon="mdi-chart-donut"
                @click="changeCharttype('pie')"
              >
                <q-tooltip
                  class="bg-grey-9"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[5, 5]"
                  >switch to pie chart</q-tooltip
                >
              </q-btn>
              <q-btn
                style="transform: rotate(90deg)"
                unelevated
                round
                flat
                dense
                size="9px"
                :color="activeBtn[1]"
                icon="mdi-poll"
                @click="changeCharttype('bar')"
              >
                <q-tooltip
                  class="bg-grey-9"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[5, 5]"
                  >switch to bar chart</q-tooltip
                >
              </q-btn>
              <q-btn
                unelevated
                round
                flat
                dense
                type="submit"
                size="9px"
                color="grey-7"
                icon="crop"
                @click="exportChart"
              >
                <q-tooltip
                  class="bg-grey-9"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[5, 5]"
                  >download chart image</q-tooltip
                >
              </q-btn>
              <q-btn
                unelevated
                round
                flat
                dense
                type="submit"
                size="9px"
                color="grey-7"
                icon="mdi-download"
                @click="exportChart"
              >
                <q-tooltip
                  class="bg-grey-9"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[5, 5]"
                  >download csv data
                </q-tooltip>
              </q-btn>
              <q-btn
                unelevated
                round
                flat
                dense
                size="9px"
                color="grey-7"
                icon="share"
                @click="share = true"
              >
                <q-dialog v-model="share">
                  <socials />
                </q-dialog>
              </q-btn>
            </div>
          </div>
          <barChart
            id="chart-canvas"
            ref="chartRef"
            v-if="chartType === 'bar'"
            :chartData="barchartData"
          />
          <pieChart
            id="chart-canvas"
            ref="chartRef"
            v-if="chartType === 'pie'"
            :chartData="piechartData"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
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

import { useVectorStore } from "../../../../stores/vector_store/index.js";

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";
import setChartMethods from "../../../../composables/chartMethods.js";

export default {
  components: {
    stackedBarChart: require("../../../charts/stackedBar.vue").default,
    pieChart: require("../../../charts/pieChart.vue").default,
    lineChart: require("../../../charts/lineChart.vue").default,
    barChart: require("../../../charts/barChart.vue").default,
    socials: require("../../../../components/socials/shareNetwork.vue").default,
  },

  setup() {
    const store = useVectorStore();
    const { stackBarChart } = setChartMethods();

    const chartType = ref("bar");
    const tsChartType = ref("bar-stacked");
    const selectedChartID = ref("stackedBar");
    const activeBtn = ref(["grey-7", "orange", "grey-7", "orange"]);
    const chartRef = ref(null);
    const stackedBarChartOptions = ref(stackBarChart(false));
    const stackedOption = ref(false);

    const piechartData = ref(null);
    const timeSeriesData = ref(null);
    const lineData = ref(null);
    const barchartData = ref(null);
    const selectedYear = ref(2010);

    piechartData.value = {
      labels: [
        "Water",
        "Bare land",
        "Artificial areas",
        "Wetland",
        "Cropland",
        "Grassland",
        "Forest",
      ],
      datasets: [
        {
          backgroundColor: [
            "#0046c8",
            "#fff5d7",
            "#d7191c",
            "#33e9f6",
            "#f2fc83",
            "#f7ba02",
            "#007300",
          ],
          borderColor: "rgba(0, 0, 0, 0)",
          borderRadius: 10,
          borderWidth: 0,
          spacing: 0,
          cutout: "75",
          radius: "80%",
          data: [10, 30, 3, 7, 30, 60, 40],
        },
      ],
    };

    barchartData.value = {
      labels: [
        "Water",
        "Bare land",
        "Artificial areas",
        "Wetland",
        "Cropland",
        "Grassland",
        "Forest",
      ],
      datasets: [
        {
          backgroundColor: [
            "#0046c8",
            "#fff5d7",
            "#d7191c",
            "#33e9f6",
            "#f2fc83",
            "#f7ba02",
            "#007300",
          ],
          data: [10, 15, 3, 7, 30, 60, 40],
          barPercentage: 0.5,
          categoryPercentage: 0.75,
        },
      ],
    };

    const stackChart = function () {
      stackedOption.value = !stackedOption.value;
      stackedBarChartOptions.value = stackBarChart(stackedOption);
    };

    const changeCharttype = function (val) {
      chartType.value = val;
      chartType.value === "pie"
        ? (activeBtn.value = [
            "orange",
            "grey-7",
            activeBtn.value[2],
            activeBtn.value[3],
          ])
        : (activeBtn.value = [
            "grey-7",
            "orange",
            activeBtn.value[2],
            activeBtn.value[3],
          ]);
    };

    const switchTimeSieriesCharttype = function (val) {
      tsChartType.value = val;
      tsChartType.value === "line"
        ? (activeBtn.value = [
            activeBtn.value[0],
            activeBtn.value[1],
            "orange",
            "grey-7",
          ])
        : (activeBtn.value = [
            activeBtn.value[0],
            activeBtn.value[1],
            "grey-7",
            "orange",
          ]);
    };

    const exportChart = (val) => {
      let elementIdname = val;
      chartType.value === "pie"
        ? (elementIdname = "pie-chart")
        : (elementIdname = "bar-chart");
      let chart = document.getElementById(elementIdname).toDataURL("image/png");
      let a = document.createElement("a");
      a.href = chart;
      a.download = "image-export.png";
      a.click();
      a = null;
    };

    const getSelectedYear = function (val) {
      val = selectedYear.value;
      console.log(selectedYear.value);
      store.setSelectedYear(val);
    };

    return {
      value: ref(true),
      icon: ref(false),
      share: ref(false),
      activeBtn,
      chartType,
      tsChartType,
      model: ref("2015"),
      options: ["2000","2015", "2016", "2017", "2018", "2019", "203"],
      changeCharttype,
      switchTimeSieriesCharttype,
      chartRef,
      selectedChartID,
      exportChart,
      stackedBarChartOptions,
      stackChart,
      barchartData,
      piechartData,
      getSelectedYear,
      selectedYear,
    };
  },
};
</script>

<style></style>
