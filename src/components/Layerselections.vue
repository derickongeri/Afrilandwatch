<template>
  <div class="q-pa-xs">
    <q-card class="my-card">
      <q-card-section class="q-py-none bg-grey-11 text-grey-9">
        <div class="row items-center">
          <span>Legend</span>
          <q-space></q-space>
          <q-btn
            flat
            @click="selection = !selection"
            round
            dense
            icon="mdi-chevron-down"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none" v-if="selection" style="max-width:250px">
        <q-tabs dense v-model="tab" inline-label class="text-teal">
          <q-tab label="Legend" icon="mdi-map-marker-path" name="one" />
          <q-tab label="Layers" icon="mdi-layers" name="two" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <div class="q-pa-none q-gutter-xs">
              <q-list flat class="q-ma-none rounded-borders" style="max-width: 100%">
                <!-- <q-item-label header>Google Inbox style</q-item-label> -->

                <q-item class="q-pa-none">
                  <q-item-section left top class="col-1">
                    <q-icon name="mdi-dots-grid" color="black" size="12px" />
                  </q-item-section>

                  <q-item-section left top class="col-6">
                    <q-item-label class="text-weight-bold text-grey-9">
                      <span class="cursor-pointer">Land Productivity (combined)</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <div class="row text-grey-6 q-gutter-sm">
                      <q-btn
                        class="col gt-xs"
                        size="8px"
                        flat
                        dense
                        round
                        icon="mdi-opacity"
                      />
                      <q-btn
                        class="col gt-xs"
                        size="8px"
                        flat
                        dense
                        round
                        icon="mdi-cog"
                      />
                      <q-btn
                        class="col gt-xs"
                        size="8px"
                        flat
                        dense
                        round
                        icon="mdi-eye"
                      />
                      <q-btn class="col gt-xs" size="8px" flat dense round icon="mdi-close" />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-tab-panel>

          <q-tab-panel name="two">
            <!-- <div class="bg-grey-7 q-pa-none q-ma-none" style="width:30vw; height: 75vh;"></div> -->
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useVectorStore } from "../stores/vector_store/index.js";

export default {
  setup() {
    const store = useVectorStore();

    const selection = ref(true),
      filterOptions = ref([]),
      filterOptions2 = ref([]),
      selectedRegion = ref(null),
      selectedCountry = ref(null);

    const regionNameOptions = computed(() => {
      let regionList = [];
      let regionName = store.regionNames;

      regionName.map((d) => {
        regionList.push(d);
      });
      return regionList.sort();
    });

    const filterFn1 = function (val, update) {
      update(() => {
        selectedCountry.value = "";
        if (val === "") {
          filterOptions.value = regionNameOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterOptions.value = regionNameOptions.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    onMounted(() => {
      store.fetchRegionNames();
      //store.getCountryNames();
    });

    onUnmounted(() => {
      store.regionNames = [];
      //store.regionNames = [];
    });

    const getselectedRegion = function (val) {
      val = selectedRegion.value;
      store.setRegionSelected(val);
      //store.setCountrySelected("");
      //selection.value = !selection.value;
    };

    return {
      selection,
      filterOptions,
      filterOptions2,
      filterFn1,
      selectedRegion,
      getselectedRegion,
      tab: ref("one"),
    };
  },
};
</script>
