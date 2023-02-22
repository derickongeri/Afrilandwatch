<template>
  <div class="col q-pa-sm box" style="height: 100%; border-radius: 20px">
    <div class="row map-selection q-pb-sm q-px-none" style="">
      <div
        class="q-pt-none"
        style="
          position: relative;
          width: fit-content;
          background-color: none;
          border-radius: 20px;
        "
      >
        <areaSelection />
      </div>
    </div>

    <div
      class="row map-content"
      id="mapid"
      style="width: 100%; border-radius: 15px 15px 15px 15px"
    >
      <div
        class="bg-white q-pa-md"
        style="
          position: absolute;
          z-index: 3000;
          bottom: 7.5vh;
          left: 1%;
          max-width: 400px;
          border-radius: 10px;
        "
      >
        <Maplegend
          @mouseover="map.dragging.disable()"
          @mouseout="map.dragging.enable()"
          @pointerover="map.dragging.disable()"
          @pointerout="map.dragging.enable()"
        />

        <div class="col bg-grey-1">
          <div>
            <span>Layer Opacity</span>
          </div>
          <div class="row">
            <q-slider
              :min="1"
              :max="10"
              :step="1"
              v-model="opacityValue"
              color="lime-9"
              thumb-size="12px"
              class="row"
              @mouseenter="handle_opacity"
            />
          </div>
        </div>
      </div>

      <div class="zoom-controls q-gutter-xs q-py-sm" style="width: fit-content">
        <div class="q-pa-none q-gutter-sm">
          <q-btn
            size="sm"
            flat
            rounded
            no-caps
            align="between"
            class="bg-white btn-fixed-width q-px-md"
            color="lime-9"
            label="Map"
            icon="mdi-tune-vertical"
          >
            <q-menu flat auto-close class="q-pa-sm menu-card" :offset="[0, 0]">
              <div class="">
                <div
                  class="menu-content bg-grey-2 q-pa-sm q-ma-sm"
                  style="border-radius: 5px"
                >
                  <div class="arrow-up q-ma-xs" style="left: 10%"></div>
                  <span
                    class="q-mx-sm"
                    style="font-size: 0.75em; font-color: #838c48"
                    >Select Base Map</span
                  >
                  <q-separator />
                  <div class="q-my-sm q-mx-sm" style="min-width: 150px">
                    <div class="map-selection q-pa-xs" style="">
                      <q-list class="row" style="min-width: 100px">
                        <q-item
                          class="col q-px-none"
                          clickable
                          v-ripple
                          @click="change_base_map('OSM')"
                        >
                          <q-item-section class="row q-px-sm">
                            <q-avatar rounded>
                              <img
                                src="https://res.cloudinary.com/dv3id0zrx/image/upload/v1649099828/Screenshot_from_2022-04-04_22-14-36_z8raar.png"
                              />
                            </q-avatar>
                            <div
                              class="row justify-center"
                              style="font-size: 0.75em"
                            >
                              Mapbox
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item
                          class="col q-px-none"
                          clickable
                          @click="change_base_map('satellite')"
                        >
                          <q-item-section class="q-px-sm">
                            <q-avatar rounded>
                              <img
                                src="https://res.cloudinary.com/dv3id0zrx/image/upload/v1649099830/Screenshot_from_2022-04-04_22-14-04_tnx5m7.png"
                              />
                            </q-avatar>
                            <div
                              class="row justify-center"
                              style="font-size: 0.75em"
                            >
                              Satellite
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item
                          class="col q-px-none"
                          clickable
                          @click="change_base_map('darkMap')"
                        >
                          <q-item-section class="q-px-sm">
                            <q-avatar rounded>
                              <img
                                src="https://res.cloudinary.com/dv3id0zrx/image/upload/v1649099827/Screenshot_from_2022-04-04_22-16-08_mu5dfk.png"
                              />
                            </q-avatar>
                            <div
                              class="row justify-center"
                              style="font-size: 0.75em"
                            >
                              dark
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                  <q-separator />
                  <span class="text-grey-9 q-mx-sm" style="font-size: 0.75em"
                    >Map Labels</span
                  >
                  <div class="q-my-sm q-mx-sm" style="min-width: 150px">
                    <q-toggle
                      dense
                      size="sm"
                      v-model="setLabels"
                      color="lime-9"
                      label="Show Map Labels"
                      left-label
                    />
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            size="sm"
            flat
            rounded
            no-caps
            align="between"
            class="bg-white btn-fixed-width q-px-md"
            color="lime-9"
            label="Share/Print"
            icon="mdi-share-variant"
          >
            <q-menu
              flat
              auto-close
              class="q-pa-sm menu-card"
              :offset="[120, 0]"
            >
              <div class="">
                <div
                  class="menu-content bg-grey-2 q-pa-sm q-ma-sm"
                  style="border-radius: 5px"
                >
                  <div class="arrow-up q-ma-xs" style="left: 45%"></div>
                  <span class="text-lime-9 q-mx-sm" style="font-size: 0.75em"
                    >Copy Link</span
                  >
                  <q-separator />
                  <div class="q-my-sm q-mx-sm" style="min-width: 150px">
                    <div class="map-selection q-pa-xs" style="">
                      <span
                        class="row text-grey-9 q-mx-sm"
                        style="font-size: 0.75em"
                        >Anyone with this URL will be able to access this
                        map.</span
                      >
                      <q-btn-group outlined rounded flat>
                        <q-btn
                          align="between"
                          class="btn-fixed-width"
                          no-caps
                          outline
                          color="lime-9"
                          ><span>http://78.141.234.158/spa/#/</span></q-btn
                        >
                        <q-btn rounded color="lime-9" label="Copy" />
                      </q-btn-group>
                    </div>
                  </div>
                  <q-separator />
                  <span class="text-lime-9 q-mx-sm" style="font-size: 0.75em"
                    >Print Map</span
                  >
                  <span
                    class="row text-grey-9 q-mx-sm"
                    style="font-size: 0.75em"
                    >Open a print version of this map</span
                  >
                  <div class="q-my-sm q-mx-sm" style="min-width: 150px">
                    <q-btn color="lime-9" label="Print" />
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            size="sm"
            flat
            rounded
            no-caps
            align="between"
            class="bg-white btn-fixed-width q-px-md"
            color="lime-9"
            label="Help"
            icon="mdi-help-circle-outline"
          >
            <q-menu
              flat
              auto-close
              class="q-pa-sm menu-card"
              :offset="[150, 0]"
            >
              <div class="">
                <div
                  class="menu-content bg-grey-2 q-pa-sm q-ma-sm"
                  style="border-radius: 5px"
                >
                  <div class="arrow-up q-ma-xs" style="left: 60%"></div>
                  <span class="text-lime-9 q-mx-sm" style="font-size: 0.75em"
                    >What would you like to do?</span
                  >
                  <q-separator />
                  <div class="q-my-none q-mx-none" style="min-width: 150px">
                    <div class="map-selection q-pa-xs" style="">
                      <div class="q-my-sm" style="max-width: 250px">
                        <q-btn
                          flat
                          align="left"
                          color="lime-9"
                          no-caps
                          class="q-py-xs full-width"
                          label="Show Welcome Message"
                        />
                        <q-btn
                          flat
                          align="left"
                          color="lime-9"
                          no-caps
                          class="q-py-xs full-width"
                          label="Visit Documentation"
                        />
                        <q-btn
                          flat
                          align="left"
                          color="lime-9"
                          no-caps
                          class="q-py-xs full-width"
                          label="Take a Tour"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            size="sm"
            flat
            rounded
            no-caps
            align="between"
            class="bg-white btn-fixed-width q-px-md"
            color="lime-9"
            label="Feedback"
            icon="mdi-comment-quote-outline"
          />
        </div>

        <div class="q-gutter-sm q-py-md" id="#v-step-1">
          <div class="row">
            <q-space />
            <div
              class="bg-white q-pa-none q-ma-none"
              style="border-radius: 20px"
            >
              <div>
                <q-btn
                  class="bg-white"
                  size="sm"
                  round
                  flat
                  color="lime-9"
                  icon="add"
                  @click="zoom_in"
                />
              </div>

              <q-separator />
              <div>
                <q-btn
                  class="bg-white"
                  size="sm"
                  round
                  flat
                  color="lime-9"
                  icon="mdi-refresh"
                  @click="resetZoomLevel"
                />
              </div>
              <q-separator />

              <div>
                <q-btn
                  class="bg-white"
                  size="sm"
                  round
                  flat
                  color="lime-9"
                  icon="remove"
                  @click="zoom_out"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <q-space />
            <q-btn
              class="bg-white"
              size="sm"
              round
              flat
              color="lime-9"
              icon="mdi-select-drag"
              @click="toggleDrawingTools"
            />
          </div>
          <div class="row">
            <q-space />
            <q-btn
              class="bg-white"
              size="sm"
              round
              flat
              color="lime-9"
              icon="mdi-chart-bar"
              @click="openCloseStats"
            />
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
import "leaflet/dist/leaflet.css";
// import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw-src";
import "leaflet-draw/dist/leaflet.draw-src.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "./Modals/mask";
import "./Modals/smoothWheelZoom";
import "./WMTS";
import { Loading, QSpinnerOval, QSpinnerFacebook } from "quasar";
import baselayers from "./Modals/baselayers";

import setSelectedVect from "./Modals/fetchVectors";
import Legend from "./Modals/legend.vue";
import { axios } from "src/boot/axios.js";

export default defineComponent({
  components: {
    selectionTab: require("components/Layerselections.vue").default,
    analysisTab: require("components/Analysis/analysis.vue").default,
    areaSelection: require("../Map/Modals/selectArea.vue").default,
    Maplegend: require("./Modals/legend.vue").default,
    socials: require("components/socials/shareNetwork.vue").default,
  },

  setup() {
    const store = useVectorStore();
    const { selectedVect, convertToWKT } = setSelectedVect();

    const rightDrawerOpen = ref(false);
    const map = ref(null),
      statisticsPanel = ref(false),
      center = ref([1, 10]), // set initial map center
      baseMaps = ref([]),
      current_top_base_layer = ref(null), //holds the top tile layer on the map
      showBaseMapList = ref(false), //show or hide base layers
      base_map_ctrl_cliked = ref(false),
      opacityValue = ref(10),
      currentRasterLayer = ref(null),
      currentVectLayer = ref(null),
      // editableLayer = ref(null),
      customGeometry = ref(null),
      currentFeatureLayer = ref(null),
      rasterYear = ref(null);

    let drawingTools = ref(false);

    let setLabels = ref(false);
    let mapLabels = ref(null);
    let selectedPopupFeature = ref(null);

    const setLeafletMap = async function () {
      const { osmTiles, darkMap, satellite, USGS_Imagery } = baselayers;

      console.log(osmTiles);

      baseMaps.value = {
        OSM: osmTiles,
        satellite: satellite,
        darkMap: darkMap,
        imagery: USGS_Imagery,
      };

      map.value = L.map("mapid", {
        zoomControl: false,
        layersControl: true,
        center: center.value,
        zoom: 3.5,
        zoomAnimation: true,
        fadeAnimation: true,
        scrollWheelZoom: false,
        smoothWheelZoom: true,
        smoothSenesitivity: 0.5,
        minZoom: 3,
        maxZoom: 17,
        layers: [satellite],
      });

      map.value.scrollWheelZoom = true;

      L.control.layers(baseMaps.value).addTo(map.value);

      current_top_base_layer.value = "satellite";

      // L.control
      //   .attribution({
      //     position: "bottomleft",
      //   })
      //   .addTo(map.value);
      // L.control.scale({ position: "bottomleft" }).addTo(map.value);
      // ///////////////////hide layers control
      let layerControl = document.getElementsByClassName(
        "leaflet-control-layers"
      );
      layerControl[0].style.visibility = "hidden";
      // statisticsPanel.value = true;
      setUpGeoman();
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
      const selected_base_map = baseMaps.value[basemap];
      map.value.addLayer(selected_base_map);
      selected_base_map.bringToFront();
      currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    const setUpGeoman = function () {
      let editableLayer = new L.FeatureGroup();
      map.value.addLayer(editableLayer);

      // Initialise the draw control and pass it the FeatureGroup of editable layers
      map.value.addControl(
        new L.Control.Draw({
          position: "topright",
          draw: {
            polygon: {
              allowIntersection: false, // Restricts shapes to simple polygons
              drawError: {
                color: "#e1e100", // Color the shape will turn when intersects
                message:
                  "<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)", // Message that will show when intersect
              },
              shapeOptions: {
                fillOpacity: 0,
                fillColor: "#424242",
                weight: 1.5,
                color: "#484c4d",
              },
            },
            rectangle: {
              shapeOptions: {
                color: "#bada55",
              },
            },
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false,
          },
          edit: {
            featureGroup: editableLayer, //REQUIRED!!
            // remove: true,
          },
        })
      );

      map.value.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
          layer = e.layer;

        if (type === "polygon") {
          layer.bindPopup("A popup!");
        }

        const geojson = JSON.stringify(
            layer.toGeoJSON().geometry
          )

        store.setCustomGeometryData(geojson)
        //add area in ha to the draw polygon
        editableLayer.addLayer(layer);
        drawCustomPolygon(layer);
        setRasterLayer();
      });

      map.value.on("draw:deleted", function (e) {
        map.value.removeLayer(currentRasterLayer.value);
        map.value.removeLayer(customGeometry.value);
        customGeometry.value = null;
        store.setCustomGeometryData()
        setCurrentVector();
        setRasterLayer();
      });
    };

    const toggleDrawingTools = function () {
      const box = document.getElementsByClassName(
        "leaflet-top leaflet-right"
      )[0];
      if (box.style.display === "none") {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    };

    const drawCustomPolygon = function (layer) {
      if (currentVectLayer.value) map.value.removeLayer(currentVectLayer.value);
      if (customGeometry.value) customGeometry.value = null;
      if (currentRasterLayer) map.value.removeLayer(currentRasterLayer.value);
      const geojson = JSON.stringify(layer.toGeoJSON().geometry);
      console.log(geojson);
      customGeometry.value = layer;
      // customGeometry.value.addTo(map.value).bringToFront();
      map.value.fitBounds(customGeometry.value.getBounds(), {
        setZoom: 2,
      });
    };

    const setCurrentVector = async function () {
      try {
        customGeometry.value = null;
        if (currentVectLayer.value) {
          map.value.removeLayer(currentVectLayer.value);
        }

        let vectLayer = await selectedVect(); //await axios.get(wfsURL);

        currentVectLayer.value = L.geoJSON([vectLayer], {
          style: {
            fillOpacity: 0,
            fillColor: "#424242",
            weight: 1.5,
            color: "#484c4d",
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

        currentVectLayer.value.addTo(map.value);
        map.value.fitBounds(currentVectLayer.value.getBounds(), {
          // paddingBottomRight: [0, 0],
          setZoom: 2,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const resetZoomLevel = function () {
      if (customGeometry.value) {
        map.value.fitBounds(customGeometry.value.getBounds(), {
          //
          setZoom: 2,
        });
      } else {
        map.value.fitBounds(currentVectLayer.value.getBounds(), {
          // paddingBottomRight: [600, 0],
          setZoom: 2,
        });
      }
    };

    const handle_opacity = function () {
      if (currentRasterLayer.value)
        currentRasterLayer.value.options.opacity = opacityValue.value / 10;
      if (currentRasterLayer.value)
        map.value.removeLayer(currentRasterLayer.value);
      currentRasterLayer.value.addTo(map.value); //add layer to map
      currentRasterLayer.value.bringToFront();
      currentVectLayer.value.bringToFront();
    };

    const setRasterLayer = async function () {
      try {
        Loading.show({
          spinner: QSpinnerFacebook,
          spinnerSize: "xl",
          message: "Loading map data...",
        });

        if (currentRasterLayer.value) {
          map.value.removeLayer(currentRasterLayer.value);
        }

        let vectName = null;
        let adminLevel = null;
        let countryName = null;

        if (store.getselectedSubRegion) {
          vectName = store.getselectedSubRegion;
          adminLevel = 1;
          countryName = store.getselectedCountry;
        } else if (store.getselectedCountry) {
          vectName = store.getselectedCountry;
          adminLevel = 0;
        } else {
          vectName = store.getselectedRegion;
          adminLevel = null;
        }

        let sldRequest = null;

        if (!customGeometry.value) {
          sldRequest = await axios.get(
            `http://78.141.234.158:3000/api/rasters/lulc/crop/shape?vectID=${vectName}&adminID=${adminLevel}&admin0ID=${countryName}`
          );
        } else {
          sldRequest = await axios.post(
            "http://127.0.0.1:3000/api/rasters/lulc/cropcustom",
            store.customGeojson,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        const wmsURL = "http://78.141.234.158/geoserver/Mislanddata/wms";

        rasterYear.value = store.getYearSelected;

        currentRasterLayer.value = L.tileLayer.wms(wmsURL, {
          layers: `Mislanddata:Landcover${rasterYear.value}`,
          format: "image/png",
          transparent: "true",
          opacity: 1,
          tilematrixSet: "EPSG:4326",
          styles: `Mislanddata:${sldRequest.data[0].sldName}`,
          crs: L.CRS.EPSG4326,
        });

        currentRasterLayer.value.addTo(map.value).bringToFront();

        currentRasterLayer.value.on("load", () => {
          Loading.hide();
        });
      } catch (error) {
        console.log(error);
      }
    };

    const addLabels = function (val) {
      if (val) {
        mapLabels.value = L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            //maxZoom: 20,
          }
        );
        mapLabels.value.addTo(map.value).bringToFront();
        //console.log("layer added");
      } else {
        map.value.removeLayer(mapLabels.value);
        //console.log("layer removed");
      }
    };

    watch(setLabels, () => {
      //console.log(setLabels.value);
      addLabels(setLabels.value);
    });

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
      setRasterLayer();
    });

    watch(customGeometry.value, () => {
      setRasterLayer();
    });

    const setRasterYear = computed(() => {
      return store.getYearSelected;
    });

    watch(setRasterYear, () => {
      console.log(`year changed to ${store.getYearSelected}`);
      setRasterLayer();
    });

    onMounted(() => {
      setLeafletMap();
      setCurrentVector();
      setRasterLayer();
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
      drawCustomPolygon,
      toggleDrawingTools,
      value: ref(true),
      resetZoomLevel,
      handle_opacity,
      setLabels,
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

.leaflet-right .leaflet-control {
  float: right;
}

.leaflet-control {
  position: relative;
  bottom: 50%;
  z-index: 800;
  pointer-events: visiblePainted;
  pointer-events: auto;
}

// overwrite the leaflet top control
.leaflet-top {
  margin: 170px 6px;
  display: none;
}

//
.custom-map-tools-section {
  position: absolute;
  right: 0;
  margin: 50px 20px 0px 0px;
  z-index: 500;
  border-radius: 10px;
  padding: 10px;
}

//custom draw button
.custom-tool {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  border-radius: 10px;
  padding: 7px;
  background-color: white;
  cursor: pointer;
}
</style>
