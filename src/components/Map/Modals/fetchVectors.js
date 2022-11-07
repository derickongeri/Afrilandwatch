import { useVectorStore } from "../../../stores/vector_store/index.js";
import { axios } from "src/boot/axios";

export default function setSelectedVect() {
  const store = useVectorStore();

  const selectedVect = async function() {

      let region = store.getselectedRegion;
      let country = store.getselectedCountry;
      let subRegion = store.getselectedSubRegion;

      const regionsWfsURL =
        "http://78.141.234.158/geoserver/Misland/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Misland%3AAfrica_countries&maxFeatures=50&outputFormat=application%2Fjson&";
      const subRegionsURL =
        "http://78.141.234.158/geoserver/Misland/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Misland%3AAfrica_adm_1&maxFeatures=950&outputFormat=application%2Fjson&";

      let wfsURL = "";

      if (subRegion) {
        wfsURL =
          subRegionsURL +
          "CQL_FILTER=NAME_1" +
          "='" +
          subRegion.replace(/'/g, "%27").replace(/ /g, "%20") +
          "'" + "AND NAME_0" + "='" +
          country.replace(/'/g, "%27").replace(/ /g, "%20") +
          "'";
      } else if (country) {
        wfsURL =
          subRegionsURL +
          "CQL_FILTER=NAME_0" +
          "='" +
          country.replace(/'/g, "%27").replace(/ /g, "%20") +
          "'";
      } else {
        region = region.replace(/'/g, "%27").replace(/ /g, "%20");

        wfsURL =
          regionsWfsURL + "CQL_FILTER=RegionName" + "='" + region + "'";
      }

      let response = await axios.get(wfsURL);

      let vectLayer = response.data;

      return vectLayer;
  };

  return {
    selectedVect
  }
}

