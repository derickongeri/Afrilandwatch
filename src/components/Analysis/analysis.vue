<template>
  <div class="q-px-none q-ml-sm q-py-none" style="border-radius: 20px;">
    <q-tabs v-model="tab" dense inline-label class="text-grey-9 q-px-sm" no-caps active-color="orange"
      indicator-color="orange" align="justify" narrow-indicator style="width: 100%">
      <div class="bg-grey-11 q-px-none q-mx-sm q-my-sm" style="border-radius: 20px">
        <q-tab name="sdg" label="SDG" icon="mdi-earth" />
      </div>
      <div class="bg-grey-11 q-px-none q-mx-sm q-my-sm" style="border-radius: 20px">
        <q-tab name="Forest" label="Forest" icon="mdi-tree-outline" />
      </div>
      <div class="bg-grey-11 q-px-none q-mx-sm q-my-sm" style="border-radius: 20px">
        <q-tab name="Soil" label="Soil" icon="landslide" />
      </div>
      <div class="bg-grey-11 q-px-none q-mx-sm q-my-sm" style="border-radius: 20px">
        <q-tab name="Desertification" label="Desertification" icon="mdi-cactus" />
      </div>
      <div class="bg-grey-11 q-px-none q-mx-sm q-my-sm" style="border-radius: 20px">
        <q-tab name="Coastal" label="Coastal" icon="mdi-water" />
      </div>
    </q-tabs>

    <q-tab-panels class="bg-white text-grey-9" style="border-radius:15px;" v-model="tab" animated>
      <q-tab-panel name="sdg">
        <sdgTab />
      </q-tab-panel>
      <q-tab-panel name="Forest">
        <forestTab />
      </q-tab-panel>
      <q-tab-panel name="Soil">
        <soilTab />
      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    sdgTab: require("./Modals/sdg.vue").default,
    forestTab: require("./Modals/Forest.vue").default,
    soilTab: require("./Modals/soil_erossion.vue").default,
  },

  setup() {
    return {
      tab: ref("sdg"),
    };
  },
});
</script>

<style lang="scss">
.chart-card {
  background: none;
}
</style>
