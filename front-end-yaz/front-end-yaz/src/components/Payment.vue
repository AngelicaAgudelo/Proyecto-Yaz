<template>
  <!----- Main div     ----->
  <div class="mainDiv">
    <div class="centralDiv">
      <!----- Choice Table    ----->
      <v-tabs
        v-model="tab"
        class="elevation-8"
        dark
        :centered="false"
        :grow="true"
        :vertical="false"
        :right="false"
        :icons-and-text="false"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="i in data" :key="i">{{ i }}</v-tab>
        <v-tab-item v-for="i in data" :key="i">
          <!----- QR payment cart ----->
          <v-card v-if="i == code" height="800px">I am in QR payment mode</v-card>
          <!----- cash cart ----->
          <v-card v-if="i == cash" height="800px">I am in cash payment mode</v-card>
        </v-tab-item>
      </v-tabs>
      <router-link to="/shop" tag="span">
        <v-btn class="ma-2" tile :elevation="3" @click="returnShop">Regresar tienda</v-btn>
      </router-link>
    </div>
  </div>
</template>
<script>
// Import of the object that allows to manipulate Store functions
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // Variable V-model of tab
      tab: null,
      // Variable that stores the string "Codigo QR"
      code: "Codigo QR",
      // Variable that stores the string "Efectivo"
      cash: "Efectivo",
      // Variable that represent the number of tabs
      tabs: 2,
      // Array that store the label of tabs
      data: ["Codigo QR", "Efectivo"],
    };
  },
  methods: {
    ...mapMutations(["setHideMenu"]),
    // Function to return to the shop component
    returnShop() {
      this.setHideMenu(true);
    },
  },
};
</script>
<style>
.mainDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
.centralDiv {
  margin-top: 40px;
  width: 1200px;
}
</style>