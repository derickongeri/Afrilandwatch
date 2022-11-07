<template>
  <q-card flat class="chart-card">
    <q-card-section>
      <q-card flat class="chart-card" style="background: #f8f9f4">
        <q-card-section>
          <div class="row q-px-md q-gutter-sm justify-center items-center">
            <div class="col">
              <strong> SDG 15.3.1 Indicator 2021</strong>
            </div>

            <div class="col">
              <div class="row chart-btns q-gutter-xs">
                <q-space />
                <q-btn
                  style="background: #838c48"
                  round
                  dense
                  size="xs"
                  color=""
                  icon="mdi-cog"
                  @click="switchChart()"
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
                          />
                        </div>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
                <q-btn
                  style="background: #838c48"
                  round
                  dense
                  size="xs"
                  color=""
                  icon="swap_horiz"
                  @click="switchChart()"
                />
                <q-btn
                  style="background: #838c48"
                  round
                  dense
                  type="submit"
                  size="xs"
                  color=""
                  icon="file_download"
                  @click="exportChart"
                />
                <q-btn
                  round
                  dense
                  outline
                  size="xs"
                  color="grey-9"
                  icon="share"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-px-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          </div>
        </q-card-section>
        <q-card-section
          ><div class="q-py-none">
            <pieChart />
            <barChart /></div
        ></q-card-section>
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
    barChart: require("../../../../charts/barChart.vue").default,
  },

  setup() {
    return {
      value: ref(true),

      model: ref(null),

      options: ["2015", "2016", "2017", "2018", "2019"],
    };
  },
};
</script>

<style></style>
