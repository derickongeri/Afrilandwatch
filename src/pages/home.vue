<template>
  <div class="col" style="height: 80vh">
    <div class="jumbotron" id="hero" style="height: 80vh">
      <div
        class="row"
        style="
          position: relative;
          top: 0%;
          height: 98px;
          width: 66vw;
          left: 17%;
        "
      >
        <div class="col-2 brand" style="width: 150px">
          <img
            src="~/src/assets/misland.ecd2c45b.png"
            alt=""
            style="width: 100px"
          />
        </div>
        <q-space />
        <div class=""><sitenav /></div>
      </div>
      <div class="row justify-center items-center">
        <!-- <img src="~/src/assets/africa.png" alt="" style="width: 35vw" /> -->
      </div>
    </div>
    <div
      class="col content-card text-justify q-gutter-xs"
      style="
        position: absolute;
        width: 60vw;
        height: 100vh;
        left: 20%;
        top: 72vh;
      "
    >
      <div class="q-ma-none" style="width: 100%; position: relative">
        <q-tabs
          v-model="tab"
          align="justify"
          no-caps
          class="bg-grey-10 text-white"
        >
          <q-tab name="mails" label="Applications" />
          <q-tab name="alarms" label="Services & Products" />
          <q-tab name="movies" label="Coverage" />
        </q-tabs>
      </div>
      <div
        class="row q-px-md q-py-lg q-gutter-lg justify-center items-center"
        style="position: relative; left: -7%"
      >
        <div class="col-6 q-pa-md">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
            style="max-height: 30vh; width: 100%"
          />
        </div>
        <div class="col-5 q-pa-md">
          <h6 class="q-pa-none q-my-lg">Some very logn and detailed Title</h6>
          <p>
            The Monitoring Integrated System for Land Degradation Monitoring
            MISLAND was developed by a collaboration between the OSS and
            LocateIT under the GMES and Africa programme as a Decision Support
            System(DSS) utilizing earth observation data to deliver information,
            promote awareness and, aid in decision making toward realizing Land
            Degradation Neutrality (LDN) in six OSS North Africa action zone
            countries: Algeria, Egypt, Libya, Tunisia, Morocco, and Mauritania.
            At the very core, the service provided information to monitor SDG
          </p>
        </div>
      </div>
      <div
        class="row q-px-md q-py-xl q-gutter-lg justify-center items-center"
        style="width: 100%; position: relative; left: 13%"
      >
        <div class="col">
          <video width="750" controls autoplay>
            <source
              src="https://res.cloudinary.com/dv3id0zrx/video/upload/v1639495393/Presentation1_egnwzn.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 80vh">
    <div class=""></div>
  </div>
  <div class="bg-grey-10" style="height: 90vh">
    <div
      class="col content-card text-justify q-gutter-xs"
      style="
        position: relative;
        width: 60vw;
        height: 100vh;
        left: 20%;
        top: 80vh;
      "
    >
      <div class="row q-gutter-md justify-center items-center">
        <div class="col-6">
          <img src="~/src/assets/gmes.png" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div style="height: 80vh">
    <div class=""></div>
  </div>

  <div style="height: 80vh">
    <div class="jumbotron"></div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
    sitenav: require("components/Website/navigation.vue").default,
  },
  setup() {
    return {
      slide: ref(3),
      tab: ref("mails"),
    };
  },
};
</script>

<style>
/* *{
  box-sizing: border-box;
  outline: 3px solid limegreen !important;
} */

#hero {
  background-image: url("~/src/assets/homebg.png")
}

.jumbotron {
  height: 80vh;
  background-size: cover;
  background-color: rgb(51, 51, 51, 0.1);
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.1);
}

.content-card {
  height: 80vh;
  background-size: cover;
  background: #ffffff;
  box-shadow: 0 0 3rem 0 rgb(0 0 0 / 10%);
}
</style>
