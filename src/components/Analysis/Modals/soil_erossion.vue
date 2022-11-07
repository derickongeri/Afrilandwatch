<template>
  <div class="q-px-none">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey-6"
      active-color="orange"
      indicator-color="orange"
      align="justify"
      narrow-indicator
    >
      <q-tab name="Wind" label="Wind Erosion"  />
      <q-tab name="Water" label="Water Erosion" />
    </q-tabs>

    <q-card flat >
      <q-tab-panels class="bg-grey-4" v-model="tab" animated>
        <q-tab-panel name="Wind">
          <windTab />
        </q-tab-panel>
        <q-tab-panel name="Water">
          <windTab />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
  <!-- <div class="q-pa-md">
    <sdgTab />
  </div> -->
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    windTab: require("./soilerosion/wind.vue").default,
  },

  setup() {
    return {
      tab: ref("Wind"),
    };
  },
});
</script>

<style lang="scss">
.chart-card {
  background: none;
}
</style>
