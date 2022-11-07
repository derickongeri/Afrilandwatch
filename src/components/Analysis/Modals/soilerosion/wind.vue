<template>
  <q-card flat bordered class="q-my-md chart-card">
    <q-card-section>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil,
      </div>
      <div>
        <q-toggle v-model="value" label="On Right" />
      </div>
    </q-card-section>
  </q-card>
  <ilswe/>
  <ce/>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";

import { Loading, QSpinnerFacebook, QSpinnerIos, QSpinnerOval } from "quasar";

export default {
  components: {
    ilswe: require("./Modals/winderosionsensitivity.vue").default,
    ce: require("./Modals/climateerosivity.vue").default,

  },

  setup() {
    return {
      value: ref(true),
      model: ref(null),
      options: ["2015", "2016", "2017", "2018", "2019"],
    };
  },
};
</script>

<style lang="scss">
.chart-card {
  border-color: #21ba45;
}
</style>
