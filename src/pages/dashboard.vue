<template>
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
