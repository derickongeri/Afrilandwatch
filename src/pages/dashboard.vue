<template>
  <!-- <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    :width="200"
    :breakpoint="500"
    class="bg-grey-10"
  >
    <q-scroll-area class="fit text-grey-3">
      <q-avatar class="q-pa-xs">
        <img src="~/src/assets/misland.ecd2c45b.png" />
      </q-avatar>
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="home" color="grey-3" />
          </q-item-section>

          <q-item-section> Home </q-item-section>
        </q-item>

        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="mdi-information" color="grey-3" />
          </q-item-section>

          <q-item-section> About </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="mdi-magnify" color="grey-3" />
          </q-item-section>

          <q-item-section> Search </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="mdi-account" color="grey-3" />
          </q-item-section>

          <q-item-section> User </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer> -->

  <q-page>
    <q-header bordered class="bg-white text-lime-9">
      <q-toolbar>
        <div class="q-pa-xs">
          <img src="~/src/assets/logoipsum-285.svg" />
        </div>
      </q-toolbar>
    </q-header>

    <div class="row bg-white" style="height: 94vh">
      <div
        class="col q-pa-sm box"
        :key="mapKey"
        style="height: 100%; border-radius: 20px"
      >
        <mappanel />
      </div>
      <div
        class="col-6 stats-panell text-grey-9"
        style="width: 45vw; height: 100%"
        
      >
        <div
          class="q-mx-xs"
          style="position: relative; top: 0%; width: 96%; height: 100%"
        >
          <analysisTab />
        </div>
      </div>
    </div>

    <!-- <div
      class="col-6 stats-panell text-grey-9"
      style="width: 45vw; height: 100%"
      v-if="statisticsPanel"
    >
      <div
        class="q-mx-xs"
        style="position: relative; top: 0%; width: 96%; height: 100%"
      >
        <analysisTab />
      </div>
    </div> -->
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  name: "my-tour",
  components: {
    mappanel: require("components/Map/Map.vue").default,
    analysisTab: require("components/Analysis/analysis.vue").default,
  },
  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    };
  },
};
</script>

<style></style>
