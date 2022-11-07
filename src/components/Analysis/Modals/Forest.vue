<template>
  <q-card flat bordered class="q-pa-md q-my-md chart-card">
    <q-card-section>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil,
      </div>
      <div>
        <q-toggle v-model="value" label="On Right" />
      </div>
    </q-card-section>
  </q-card>
  <q-card flat bordered class="chart-card">
    <q-card-section>
      <div class="row q-py-sm">
        <div class="q-pa-sm">
          <strong>Forest Loss</strong>
        </div>
        <q-space />
        <div class="q-py-sm">
          <q-btn
            unelevated
            rounded
            color="grey-9"
            size="sm"
            label="Remove Layer"
          />
        </div>
      </div>
      <div class="row">
        <div class="q-gutter-sm" style="min-width: 150px">
          <q-select
            rounded
            outlined
            dense
            :options="options"
            label="Reporting Year"
            stack-label
          />
        </div>
        <q-space />
        <div class="q-gutter-sm">
          <q-btn round dense size="sm" color="grey-9" icon="map"
            ><q-tooltip class="bg-grey-9">add layer to map</q-tooltip></q-btn
          >
          <q-btn round dense size="sm" color="grey-9" icon="mdi-compare"
            ><q-tooltip class="bg-grey-9">Compare</q-tooltip></q-btn
          >
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-card flat bordered class="chart-card">
        <div class="row q-pa-md">
          <div class="q-gutter-sm" style="min-width: 50%">
            <q-select
              rounded
              outlined
              dense
              :options="options"
              label="Start Year"
              stack-label
            />
          </div>
          <q-space />
          <div class="q-gutter-sm" style="min-width: 50%">
            <q-select
              rounded
              outlined
              dense
              :options="options"
              label="End Year"
              stack-label
            />
          </div>
        </div>
        <div class="row q-pa-md q-gutter-sm">
          <div>
            <strong> Forest Loss 2000 - 2020</strong>
          </div>
          <q-space />
          <div class="row chart-btns q-gutter-sm q-ma-none">
            <q-btn
              round
              dense
              outline
              size="9px"
              color="grey-9"
              icon="swap_horiz"
              @click="switchChart()"
            />
            <q-btn
              round
              dense
              outline
              type="submit"
              size="9px"
              color="grey-9"
              icon="file_download"
              @click="exportChart"
            />
            <q-btn round dense outline size="9px" color="grey-9" icon="share" />
          </div>
        </div>
        <div class="q-py-md">
          <stackedBarChart />
          <!-- <pieChart/> -->
          <lineChart />
        </div>
      </q-card>
    </q-card-section>
  </q-card>
  <q-card flat bordered class="q-my-md chart-card">
    <q-card-section>
      <div class="row q-py-sm">
        <div class="q-pa-sm">
          <strong>Forest Carbon Emission</strong>
        </div>
        <q-space />
        <div class="q-py-sm">
          <q-btn
            unelevated
            rounded
            color="grey-9"
            size="sm"
            label="Remove Layer"
          />
        </div>
      </div>
      <div class="row">
        <div class="q-gutter-sm" style="min-width: 150px">
          <q-select
            rounded
            outlined
            dense
            :options="options"
            label="Reporting Year"
            stack-label
          />
        </div>
        <q-space />
        <div class="q-gutter-sm">
          <q-btn round dense size="sm" color="grey-9" icon="map"
            ><q-tooltip class="bg-grey-9">add layer to map</q-tooltip></q-btn
          >
          <q-btn round dense size="sm" color="grey-9" icon="mdi-compare"
            ><q-tooltip class="bg-grey-9">Compare</q-tooltip></q-btn
          >
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-card flat bordered class="chart-card">
        <div class="row q-pa-md">
          <div class="q-gutter-sm" style="min-width: 50%">
            <q-select
              rounded
              outlined
              dense
              :options="options"
              label="Start Year"
              stack-label
            />
          </div>
          <q-space />
          <div class="q-gutter-sm" style="min-width: 50%">
            <q-select
              rounded
              outlined
              dense
              :options="options"
              label="End Year"
              stack-label
            />
          </div>
        </div>
        <div class="row q-pa-md q-gutter-sm">
          <div>
            <strong> Forest Carbon Emissions 2015 - 2020</strong>
          </div>
          <q-space />
          <div class="row chart-btns q-gutter-sm q-ma-none">
            <q-btn
              round
              dense
              outline
              size="9px"
              color="grey-9"
              icon="swap_horiz"
              @click="switchChart()"
            />
            <q-btn
              round
              dense
              outline
              type="submit"
              size="9px"
              color="grey-9"
              icon="file_download"
              @click="exportChart"
            />
            <q-btn round dense outline size="9px" color="grey-9" icon="share" />
          </div>
        </div>
        <div class="q-py-md">
          <stackedBarChart />
          <!-- <pieChart/> -->
          <lineChart />
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
    stackedBarChart: require("../../charts/stackedBar.vue").default,
    pieChart: require("../../charts/pieChart.vue").default,
    lineChart: require("../../charts/lineChart.vue").default,
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

<style lang="scss">
.chart-card {
  border-color: #21ba45;
}
</style>
