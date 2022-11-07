<template>
  <div class="q-gutter-md row q-px-none" style="width: 40vw">
    <div class="col">
      <q-select
        dense
        bg-color="grey-11"
        hide-dropdown-icon
        rounded
        standout
        clear-icon="mdi-close"
        color="grey-9"
        input-class="input-option"
        options-selected-class="text-green-7"
        popup-content-class="selection-options"
        v-model="selectedRegion"
        :options="filterOptions"
        @filter="filterFn1"
        @update:model-value="getselectedRegion"
      >
        <template v-slot:prepend>
          <q-icon color="grey-9" name="arrow_drop_down" @click.stop />
        </template>
        <template v-slot:selected>
          <template class="input-option" v-if="selectedRegion">
            <div style="font-size: 1em" class="selection-content text-grey-9">
              {{ selectedRegion }}
            </div>
          </template>
          <template v-else>
            <div style="font-size: 1em" class="selection-content text-grey-9">
              Select Region
            </div>
          </template>
        </template>
      </q-select>
    </div>

    <div class="col">
      <q-select
        dense
        bg-color="grey-11"
        hide-dropdown-icon
        rounded
        standout
        clearable
        clear-icon="mdi-close"
        color="grey-9"
        input-class="input-option"
        options-selected-class="text-green-7"
        popup-content-class="selection-options"
        v-model="selectedCountry"
        :options="filterOptions2"
        @filter="filterFn2"
        @update:model-value="getselectedCountry"
      >
        <template v-slot:prepend>
          <q-icon color="grey-9" name="arrow_drop_down" @click.stop />
        </template>
        <template v-slot:selected>
          <template class="input-option" v-if="selectedCountry">
            <div
              style="font-size: 1em; max-width: 250px"
              class="selection-content text-grey-9"
            >
              {{ selectedCountry }}
            </div>
          </template>
          <template v-else>
            <div style="font-size: 1em" class="selection-content text-grey-9">Country</div>
          </template>
        </template>
      </q-select>
    </div>

    <div class="col">
      <q-select
        dense
        bg-color="grey-11"
        hide-dropdown-icon
        rounded
        standout
        clearable
        clear-icon="close"
        color="grey-9"
        input-class="input-option"
        options-selected-class="text-green-7"
        popup-content-class="selection-options"
        v-model="selectedSubRegion"
        :options="filterOptions3"
        @filter="filterFn3"
        @update:model-value="getselectedsubRegion"
      >
        <template v-slot:prepend>
          <q-icon color="grey-9" name="arrow_drop_down" @click.stop />
        </template>
        <template v-slot:selected>
          <template class="input-option" v-if="selectedSubRegion">
            <div style="font-size: 1em" class="text-grey-9">
              {{ selectedSubRegion }}
            </div>
          </template>
          <template v-else>
            <div style="font-size: 1em" class="text-grey-9">Sub-region</div>
          </template>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  defineComponent,
  watch,
} from "vue";
import { useVectorStore } from "src/stores/vector_store/index.js";

export default defineComponent({
  setup() {
    const store = useVectorStore();

    const selection = ref(true),
      filterOptions = ref([]),
      filterOptions2 = ref([]),
      filterOptions3 = ref([]),
      selectedRegion = ref(store.getselectedRegion),
      selectedCountry = ref(store.getselectedCountry),
      selectedSubRegion = ref(store.getselectedSubRegion);

    const regionNameOptions = computed(() => {
      let regionList = [];
      let regionName = store.regionNames;

      regionName.map((d) => {
        regionList.push(d);
      });
      return regionList.sort();
    });

    const countryNameOptions = computed(() => {
      let countryNames = [];
      let countryList = store.countryNames;

      let countriesWithin = countryList.filter((d) => {
        if (d.properties.RegionName === selectedRegion.value) return d;
      });

      // console.log(countriesWithin);

      countriesWithin.forEach((obj) => {
        countryNames.push(obj.properties.CountryNam);
      });

      return countryNames;
    });

    const subRegionNameOptions = computed(() => {
      let subRegionNames = [];
      let subRegionList = store.subRegionNames;

      let subRegionsWithin = subRegionList.filter((d) => {
        if (d.properties.NAME_0 === selectedCountry.value) return d;
      });

      console.log(subRegionsWithin);

      subRegionsWithin.forEach((obj) => {
        subRegionNames.push(obj.properties.NAME_1);
      });

      return subRegionNames;
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

    const filterFn2 = function (val, update) {
      update(() => {
        if (val === "") {
          filterOptions2.value = countryNameOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterOptions2.value = countryNameOptions.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    const filterFn3 = function (val, update) {
      update(() => {
        if (val === "") {
          filterOptions3.value = subRegionNameOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterOptions3.value = subRegionNameOptions.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    onMounted(() => {
      store.fetchRegionNames();
      store.fetchSubRegionNames();
    });

    const getselectedRegion = function (val) {
      val = selectedRegion.value;
      store.setRegionSelected(val);
    };

    const getselectedCountry = function (val) {
      val = selectedCountry.value;
      store.setCountrySelected(val);
      store.setSubRegionSelected("");
    };

    const getselectedsubRegion = function (val) {
      val = selectedSubRegion.value;
      store.setSubRegionSelected(val);
    };

    const fillSelection = computed(() => {
      if (store.selectedSubregion) {
        return store.getselectedSubRegion;
      } else if (store.slectedCountry) {
        return store.getselectedCountry;
      } else {
        return store.getselectedRegion;
      }
    });

    watch(fillSelection, () => {
      selectedRegion.value = store.getselectedRegion;
      selectedCountry.value = store.getselectedCountry;
      selectedSubRegion.value = store.getselectedSubRegion;
    });

    return {
      selection,
      filterOptions,
      filterOptions2,
      filterOptions3,
      filterFn1,
      filterFn2,
      filterFn3,
      selectedRegion,
      selectedCountry,
      selectedSubRegion,
      getselectedRegion,
      getselectedCountry,
      getselectedsubRegion,
      tab: ref("one"),
    };
  },
});
</script>

<style>
.selection-options::-webkit-scrollbar {
  width: 2px; /* width of the entire scrollbar */
  min-height: 200px;
}

.selection-options::-webkit-scrollbar-track {
  background: rgb(255, 166, 0, 0.1); /* color of the tracking area */
}

.selection-options::-webkit-scrollbar-thumb {
  background-color: rgb(219, 250, 43); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid rgba(255, 166, 0, 0); /* creates padding around scroll thumb */
}

.input-option {
  color: white;
  font-size: 2em;
  /* height: fit-content; */
  /*max-width: 300px;*/
}
.selected-option {
  color: white;
}

.selection-options{
  max-height: 350px;
}

.selection-content {
  font-size: 1em;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .q-field__marginal {
  height: 56px;
  color: rgb(255 255 255);
  font-size: 24px;
} */
</style>
