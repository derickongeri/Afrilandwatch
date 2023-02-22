import { useVectorStore } from "../../../stores/vector_store/index.js";
import { axios } from "src/boot/axios";

export default function setSelectedRaster() {
  const store = useVectorStore()

  const setRasterLayer = async function () {

      let vectData = null;
      let sldRequest = null;
      let rasterName = null;
      let rasterYear = store.getYearSelected;

      store.getselectedSubRegion? vectData = {name: store.getselectedSubRegion, adminLevel: 1, country: store.getselectedCountry}
      : store.getselectedCountry? vectData = {name: store.getselectedCountry, adminLevel: 0, country: null}
      : {name: store.getselectedRegion, adminLevel: null, country: null}



      if (!customGeometry.value) {
        sldRequest = await axios.get(
          `http://78.141.234.158:3000/api/rasters/crop/shape?vectID=${vectData.name}&adminID=${vectData.adminLevel}&admin0ID=${vectData.country}`
        );
      } else {
        sldRequest = await axios.post(
          "http://127.0.0.1:3000/api/rasters/cropcustom",
          store.customGeojson,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      const wmsURL = "http://78.141.234.158/geoserver/Mislanddata/wms";


      currentRasterLayer.value = L.tileLayer.wms(wmsURL, {
        layers: `Mislanddata:${rasterName}+${rasterYear.value}`,
        // "layer-type": "overlay",
        // CQL_FILTER: "layer = " + "'" + region + "'",
        format: "image/png",
        transparent: "true",
        opacity: 1,
        tilematrixSet: "EPSG:4326",
        styles: `Mislanddata:${sldRequest.data[0].sldName}`,
        crs: L.CRS.EPSG4326,
      });

    }
  };


