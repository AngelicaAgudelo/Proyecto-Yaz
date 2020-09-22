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
          <v-card v-if="i == code" height="800px">
            <v-img src="../assets/QRCode.png" contain height="750"></v-img>
          </v-card>
          <!----- cash cart ----->
          <v-card v-if="i == cash" height="800px">
            <div class="purchaseSummaryDiv">
              <v-expansion-panels :popout="true">
                <v-expansion-panel>
                  <v-expansion-panel-header
                    v-ripple="{ center: true }"
                    class="text-center elevation-2 pa-3 headline"
                  >Resumen de compra</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <purchaseSummary />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-card>
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
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
import purchaseSummary from "./PurchaseSummary";
export default {
  components: {
    // PurchaseSummary component
    purchaseSummary,
  },
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
  computed: {
    // Declaration of Store variables
    ...mapState(["shoppingCar"]),
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
  margin-top: 12px;
  width: 1200px;
}
.purchaseSummaryDiv {
  margin-top: 25px;
}
</style>