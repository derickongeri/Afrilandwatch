<template>
  <div
    class="q-px-md text-white text-right"
    style="min-width: fit-content"
  >
    <q-input dark v-model="text" :dense="dense">
      <template v-slot:append>
        <q-avatar>
          <q-icon name="mdi-magnify" color="white" />
        </q-avatar>
      </template>
    </q-input>
    <div>
      <q-splitter v-model="splitterModel" style="height: fit-content">
        <template v-slot:after>
          <q-tabs
            v-model="tab"
            dense
            vertical
            inline-label
            class="text-white text-right"
          >
            <q-tab name="products" class="text-right" content-class="tab-content">
              <div class="text-right">Products & Services</div>
            </q-tab>
            <q-tab name="alarms" class="text-right">
              <div class="text-right">Applications</div>
            </q-tab>
            <q-tab name="movies"><div class="text-right">Training</div>
            </q-tab>
          </q-tabs>
        </template>

        <template v-slot:before>
          <q-tab-panels
            v-model="tab"
            animated
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
            class="bg-grey-10 text-left"
          >
            <q-tab-panel name="products">
              <div class="text-h6">products</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("products"),
      splitterModel: ref(50),
    };
  },
};
</script>

<style>

</style>
