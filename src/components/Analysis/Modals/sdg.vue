<template>
  <q-tabs v-model="tab" inline-label class="text-grey-9 q-px-none q-mb-sm" no-caps active-color="orange"
    indicator-color="orange" align="left" narrow-indicator style="width: 100%">
    <q-tab name="sdg"><strong style="font-size: 1em">SDG Indicator</strong></q-tab>
    <q-tab :name="productivityTab" class="q-pa-none">
      <q-btn-dropdown auto-close stretch flat no-caps split @click="tab = 'Land Productivity'">
        <template v-slot:label>
          <div v-if="
            tab === 'Land Productivity' ||
            tab === 'Productivity State' ||
            tab === 'Productivity Trajectory' ||
            tab === 'Productivity Performance'
          " class="text-orange" style="font-size: 1em">
            <strong> {{ tab }} </strong>
          </div>
          <div v-else class="text-grey-9" style="font-size: 1em">
            <strong> Land Productivity </strong>
          </div>
        </template>

        <q-list>
          <q-item clickable @click="tab = 'Productivity State'; setProductivityTab()">
            <q-item-section>Productivity State</q-item-section>
          </q-item>

          <q-item clickable @click="tab = 'Productivity Trajectory'">
            <q-item-section>Productivity Trajectory</q-item-section>
          </q-item>

          <q-item clickable @click="tab = 'Productivity Performance'">
            <q-item-section>Productivity Performance</q-item-section>
          </q-item>

          <!-- <q-item clickable @click="tab = 'Land Productivity'">
            <q-item-section>Land Productivity</q-item-section>
          </q-item> -->
        </q-list>
      </q-btn-dropdown>
    </q-tab>

    <q-tab name="Land Cover" class="q-pa-none">
      <q-btn-dropdown auto-close stretch flat no-caps>
        <template v-slot:label>
          <div v-if="
            tab === 'Land Cover' ||
            tab === 'Land Cover Change' ||
            tab === 'Land Cover Change Drivers'
          " class="text-grey-7" style="font-size: 1em">
            <strong style="color: orange"> {{ tab }} </strong>
          </div>
          <div v-else class="text-grey-9" style="font-size: 1em">
            <strong> Land Cover </strong>
          </div>
        </template>

        <q-list>
          <q-item clickable @click="tab = 'Land Cover Change';">
            <q-item-section>Land Cover Change</q-item-section>
          </q-item>

          <q-item clickable @click="tab = 'Land Cover Change Drivers'">
            <q-item-section>Land Cover Change Drivers</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-tab>
    <q-tab name="mails"><strong style="font-size: 1em">Carbon Stocks</strong></q-tab>
  </q-tabs>

  <div class="analysis-box" style="height: 75vh">
    <div class="scroll analysis-content q-my-none q-py-none bg-grey-11" visible style="
      height: 100%;
        border-radius: 15px 15px 15px 15px;
      ">
      <q-tab-panels class="bg-grey-11" style="border-radius: 15px" v-model="tab" animated>
        <q-tab-panel name="sdg" class="q-pa-none">
          <sdgindicator />
        </q-tab-panel>

        <q-tab-panel name="Land Productivity" class="q-pa-none">
          <landProductivity />
        </q-tab-panel>

        <q-tab-panel name="Land Cover" class="q-pa-none">
          <landCover />
        </q-tab-panel>
      </q-tab-panels>
    </div>
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

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";

export default {
  components: {
    sdgindicator: require("../Modals/sdg/sdg.vue").default,
    landProductivity: require("../Modals/sdg/Productivity/productivity.vue")
      .default,
    landCover: require("../Modals/sdg/Landcover.vue").default,
  },

  setup() {
    const tab = ref("Land Cover");
    const productivityTab = ref("Land Productivity");

    const setProductivityTab = function () {
      let tabsList = [
        "Land Productivity",
        "Productivity State",
        "Productivity Trajectory",
        "Productivity Performance",
      ];
      if (tabsList.includes(tab.value)) {
        productivityTab.value = tab.value;
      }
    };

    return {
      value: ref(true),

      model: ref(null),

      tab,

      productivityTab,

      setProductivityTab,

      options: ["2015", "2016", "2017", "2018", "2019"],

      thumbStyle: {
        right: "0px",
        borderRadius: "7px",
        backgroundColor: "orange",
        width: "4px",
        opacity: 1,
      },

      barStyle: {
        right: "0px",
        borderRadius: "9px",
        backgroundColor: "black",
        width: "4px",
        opacity: 0.2,
      },
    };
  },
};
</script>

<style lang="scss">
.chart-card {
  background: #818669;
}

.arrow-up {
  position: absolute;
  left: 44%;
  top: 6%;
  width: 12px;
  height: 12px;
  // z-index: 1;
  // border-left: 9px solid transparent;
  // border-right: 9px solid transparent;
  // border-bottom: 9px solid #f5f5f5;
  // box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  background: #f5f5f5;
  border-left-color: #f5f5f5;
  border-right: none;
  transform-origin: 0 0;
  transform: rotate(-45deg);
  border-bottom-color: #f5f5f5;
  box-shadow: 1px -2px 3px 0 rgb(85 85 85 / 15%);
}

.menu-card {
  background: rgba(255, 255, 255, 0);
  box-shadow: none;
}

.menu-content {
  box-shadow: 0 -1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 20%),
    0 3px 1px -2px rgb(0 0 0 / 14%);
}

.analysis-box {
  height: 70%;
}

// .analysis-box .row.analysis-content {
//   flex: 1 1 auto;
//   min-height: 100%;
// }

::-webkit-scrollbar {
  right: 4px;
  width: 4px;
  background-color: #F5F5F5;
  opacity: 0.0;
}

::-webkit-scrollbar-track {
  right: 4px;
  // box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
  opacity: 0.0;
}

::-webkit-scrollbar-thumb {
  right: 4px;
  border-radius: 4px;
  background-color: orange;
}
</style>
