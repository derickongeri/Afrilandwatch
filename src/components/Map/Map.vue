<template>
  <div class="row bg-white" style="height: 94vh">
    <div class="col q-pa-sm box" :key="mapKey" style="height: 100%; border-radius: 20px">
      <div class="row map-selection q-pb-sm q-px-none">
        <areaSelection />
      </div>
      <div class="row map-content" id="mapid" style="width: 100%; border-radius: 15px 15px 15px 15px">
        <div style="
            position: absolute;
            z-index: 3000;
            top: 1vh;
            left: 1%;
            max-width: 400px;
          ">

          <Maplegend
            @mouseover="map.dragging.disable()"
            @mouseout="map.dragging.enable()"
            @pointerover="map.dragging.disable()"
            @pointerout="map.dragging.enable()"
          />

        </div>
        <div class="zoom-controls col q-gutter-xs q-py-sm" style="width: fit-content">
          <div class="col q-gutter-sm" id="#v-step-1">
            <div class="row">
              <q-space />
              <q-btn class="bg-white" size="sm" round flat color="lime-9" icon="add" @click="zoom_in" />
            </div>
            <div class="row">
              <q-space />
              <q-btn class="bg-white" size="sm" round flat color="lime-9" icon="remove" @click="zoom_out" />
            </div>
            <div class="row">
              <q-space />
              <q-btn class="bg-white" size="sm" round flat color="lime-9" icon="layers"
                @mouseover="showBaseMapList = true" @mouseleave="handle_base_layers">
                <q-menu class="base-map-list" :offset="[109, -24]" v-model="showBaseMapList" @mouseover="
                  (showBaseMapList = true), (base_map_ctrl_cliked = true)
                " @mouseleave="
                  (showBaseMapList = false), (base_map_ctrl_cliked = false)
                ">
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup v-for="basemap in Object.keys(baseMaps)" :key="basemap"
                      @click="change_base_map(basemap)">
                      <q-item-section>{{ basemap }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
            <div class="row">
              <q-space />
              <q-btn class="bg-white" size="sm" round flat color="lime-9" icon="mdi-chart-bar"
                @click="openCloseStats" />
            </div>
          </div>
        </div>
        <!-- <div class="" style="
            position: absolute;
            z-index: 3000;
            bottom: 1.5vh;
            right: 1%;
            width: fit-content;
          ">
          <img src="~/src/assets/logos.svg" alt="" />
        </div> -->
      </div>
    </div>
    <div class="col-6 stats-panell text-grey-9" style="
        width: 45vw;
        height: 100%;
      " v-if="statisticsPanel">
      <!-- <div
        class="q-pt-none"
        style="
          position: relative;
          width: fit-content;
          background-color: none;
          border-radius: 20px;
        "
      >
        <areaSelection />
      </div> -->

      <div class="q-mx-xs" style="position: relative; top: 0%; width: 96%; height:100%">

        <analysisTab />

      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  getCurrentInstance,
} from "vue";
import { useVectorStore } from "../../stores/vector_store/index.js";
import L from "leaflet";
// import "leaflet/dist/images/marker-icon-2x.png";
import "./Modals/mask";
import "leaflet/dist/leaflet.css";
//import "leaflet-draw/dist/leaflet.draw-src.css";

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";
// import { axios } from "src/boot/axios";
//import "leaflet-draw";
//import "leaflet-side-by-side";

import baselayers from "./Modals/baselayers";
//import { labeledStatement } from "@babel/types";

import setSelectedVect from "./Modals/fetchVectors";
import Legend from "./Modals/legend.vue";

export default defineComponent({
  components: {
    selectionTab: require("components/Layerselections.vue").default,
    analysisTab: require("components/Analysis/analysis.vue").default,
    areaSelection: require("../Map/Modals/selectArea.vue").default,
    Maplegend: require("./Modals/legend.vue").default
  },

  setup() {
    const store = useVectorStore();
    const { selectedVect } = setSelectedVect();

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const map = ref(null),
      mapKey = ref(0),
      map2 = ref(null),
      statisticsPanel = ref(false),
      center = ref([1, 10]), // set initial map center
      baseMaps = ref([]),
      current_top_base_layer = ref(null), //holds the top tile layer on the map
      showBaseMapList = ref(false), //show or hide base layers
      base_map_ctrl_cliked = ref(false),
      opacityValue = ref(10),
      currentRasterLayer = ref(null),
      currentVectLayer = ref(null),
      currentFeatureLayer = ref(null),
      subRegionBoundaries = ref(null);

    let setLabels = ref(false);
    let mapLabels = ref(null);
    let selectedPopupFeature = ref(null);

    const setLeafletMap = function () {
      const { osmTiles, darkMap, satellite } = baselayers;

      baseMaps.value = {
        OSM: osmTiles,
        satellite: satellite,
        darkMap: darkMap,
      };

      map.value = L.map("mapid", {
        zoomControl: false,
        layersControl: false,
        attributionControl: false,
        //maxBounds: bounds,
        minZoom: 3,
        maxZoom: 17,
      }).setView(center.value, 3);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

          id: "mapbox/satellite-v9",
          accessToken:
            "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
        }
      ).addTo(map.value);

      L.control.layers(baseMaps.value).addTo(map.value);

      current_top_base_layer.value = "satellite";

      L.control
        .attribution({
          position: "bottomleft",
        })
        .addTo(map.value);
      L.control.scale({ position: "bottomleft" }).addTo(map.value);
      ///////////////////hide layers control
      let layerControl = document.getElementsByClassName(
        "leaflet-control-layers"
      );
      layerControl[0].style.visibility = "hidden";
      statisticsPanel.value = true;
    };

    const zoom_in = function () {
      map.value.setZoom(map.value.getZoom() + 1);
    };

    const zoom_out = function () {
      map.value.setZoom(map.value.getZoom() - 1);
    };

    const showListofBaseMaps = function () {
      return (showBaseMapList.value = !showBaseMapList.value);
    };

    const handle_base_layers = function () {
      setTimeout(() => {
        if (base_map_ctrl_cliked.value === false) showBaseMapList.value = false;
      }, 3000);
    };

    //get the base map object of leaflet according to the selection clicked
    const change_base_map = function (basemap) {
      const index = Object.keys(baseMaps.value).indexOf(basemap);

      let layerControlElement = document.getElementsByClassName(
        "leaflet-control-layers"
      )[0];
      layerControlElement.getElementsByTagName("input")[index].click();
      currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    const setCurrentVector = async function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });

        if (currentVectLayer.value) {
          map.value.removeLayer(currentVectLayer.value);
        }

        let vectLayer = await selectedVect(); //await axios.get(wfsURL);

        currentVectLayer.value = L.mask(vectLayer, {
          fillOpacity: 0.7,
          fillColor: "#424242",
          color: "#484c4d",
        });

        currentVectLayer.value.addTo(map.value);

        Loading.hide();
      } catch (error) {
        console.log(error);
        Loading.hide();
      }
    };

    const setRegionsWithin = async function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });

        let vectLayer = await selectedVect();

        if (currentFeatureLayer.value) {
          map.value.removeLayer(currentFeatureLayer.value);
        }

        currentFeatureLayer.value = L.geoJSON([vectLayer], {
          style: {
            weight: 0,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0,
          },
          onEachFeature: function (feature, layer) {
            feature = layer
              .bindPopup(
                "<br><strong>" +
                (store.getselectedCountry
                  ? feature.properties.NAME_1
                  : feature.properties.CountryNam) +
                ",</strong><br> region <strong>" +
                (store.getselectedCountry
                  ? feature.properties.ENGTYPE_1
                  : feature.properties.RegionName) +
                "</strong><br><br> <button id='pop-up-selector' class='pop-up-btn'>Analyze</button>"
              )
              .on("popupopen", function () {
                store.slectedCountry
                  ? (selectedPopupFeature.value =
                    feature.feature.properties.NAME_1)
                  : (selectedPopupFeature.value =
                    feature.feature.properties.CountryNam);

                map.value._popup._closeButton.addEventListener(
                  "click",
                  (event) => {
                    event.preventDefault();
                  }
                );
              });
          },
        });

        currentFeatureLayer.value.addTo(map.value);
        map.value.fitBounds(currentFeatureLayer.value.getBounds(), {
          paddingBottomRight: [550, 0],
          setZoom: 2,
        });

        Loading.hide();
      } catch (error) {
        console.log(error);
        Loading.hide();
      }
    };

    const setRasterLayer = function () {
      try {
        Loading.show({
          spinner: QSpinnerOval,
          spinnerSize: "xl",
          message: "Loading...",
        });

        const wmsURL = "http://78.141.234.158/geoserver/Mislanddata/wms";

        currentRasterLayer.value = L.tileLayer
          .wms(wmsURL, {
            layers: "Mislanddata:Landcover2000",
            "layer-type": "overlay",
            // CQL_FILTER: "layer = " + "'" + region + "'",
            format: "image/png",
            transparent: "true",
            opacity: 1,
            // crs:L.CRS.EPSG4326,
            // env: 'cropShape:POLYGON((36.60924206010921 0.5323032302736124, 36.60924206010921 -1.7062098171759033, 38.54372792153049 -1.7062098171759033, 38.54372792153049 0.5323032302736124, 36.60924206010921 0.5323032302736124))'
          })
          .addTo(map.value);

        Loading.hide();
      } catch (error) {
        console.log(error);
        Loading.hide();
      }
    };

    const setPopuFeature = computed(() => {
      return selectedPopupFeature.value;
    });

    watch(setPopuFeature, () => {
      let el = document.getElementById("pop-up-selector");

      el.addEventListener("click", () => {
        store.slectedCountry
          ? store.setSubRegionSelected(selectedPopupFeature.value)
          : store.setCountrySelected(selectedPopupFeature.value);
        map.value.closePopup();
      });
    });

    const selecteVector = computed(() => {
      if (store.selectedSubregion) {
        return store.getselectedSubRegion;
      } else if (store.slectedCountry) {
        return store.getselectedCountry;
      } else {
        return store.getselectedRegion;
      }
    });

    watch(selecteVector, () => {
      setCurrentVector();
      setRegionsWithin();
    });

    onMounted(() => {
      //leafletRouting();
      setLeafletMap();
      // setSubRegions();
      // setCurrentRaster();
      setCurrentVector();
      setRegionsWithin();
      setRasterLayer();
      //addLabels();
    });

    const openCloseStats = function () {
      statisticsPanel.value = !statisticsPanel.value;
    };

    return {
      map,
      statisticsPanel,
      rightDrawerOpen,
      openCloseStats,
      showBaseMapList,
      zoom_in,
      zoom_out,
      showListofBaseMaps,
      handle_base_layers,
      change_base_map,
      opacityValue,
      baseMaps,
      mapKey,
    };
  },
});
</script>

<style lang="scss">
// * {
//   box-sizing: border-box;
//   outline: 3px solid limegreen !important;
// }

.scroll-area::-webkit-scrollbar {
  width: 2px;
  /* width of the entire scrollbar */
  min-height: 200px;
}

.scroll-area::-webkit-scrollbar-track {
  background: rgb(255, 166, 0, 0.1);
  /* color of the tracking area */
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: rgb(219, 250, 43);
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 3px solid rgba(255, 166, 0, 0);
  /* creates padding around scroll thumb */
}

.header {
  background-color: #000000c9;
  backdrop-filter: blur(7px);
}

.zoom-controls {
  position: absolute;
  // background: rgb(153, 150, 150);
  z-index: 2000;
  //width: 300px;
  // height: 20px;
  right: 1vw;
  top: 2vh;
  width: fit-content;
}

.pop-up-btn {
  background: #dca257;
  color: white;
  text-align: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  border-width: 0px;
}

.pop-up-btn:hover {
  background-color: #dca2578a;
  /* Green */
  color: white;
}

.leaflet-popup-content-wrapper {
  background: #f1f8e9;
  color: #333;
  box-shadow: 0 3px 14px rgb(0 0 0 / 40%);
  border-radius: 0%;
  min-width: 200px;
}

.leaflet-popup-tip {
  background: #f1f8e9;
}

.box {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.box .row.map-selection {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.map-content {
  flex: 1 1 auto;
}
</style>
