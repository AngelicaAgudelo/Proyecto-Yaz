<template>
  <div class="appDiv">
    <!----- Main div     ----->
    <div class="mainDiv">
      <v-card class="centralDiv" shaped min-height="550" elevation="5">
        <v-card-title id="cardTitle">
          <span class="title font-weight-light">Resumen de compra</span>
        </v-card-title>
        <v-flex>
          <!----- PurchaseSummary Component ------>
          <purchaseSummary @clickButton="totalPayment" />
          <v-card class="d-flex flex-row-reverse" outlined min-height="50">
            <div class="total">{{ totalLabel }} {{ total }}</div>
            <div class="subTotal">{{ subTotalLabel }} {{ subTotal }}</div>
          </v-card>
          <div class="radioGroupDiv">
            <v-radio-group v-model="radioGroup">
              <!----- radioGroup button ------>
              <v-row justify="space-around">
                <v-radio
                  :label="data[0]"
                  @click="qrCodeDialog = true"
                ></v-radio>
                <v-radio :label="data[1]"></v-radio>
              </v-row>
            </v-radio-group>
          </div>
        </v-flex>
        <div class="separateDiv"></div>
        <v-card-actions>
          <!----- route /shop button ------>
          <router-link to="/shop" tag="span">
            <v-btn
              class="ma-2"
              tile
              :elevation="3"
              outlined
              @click="setHideMenu"
              >Regresar tienda</v-btn
            >
          </router-link>
          <v-spacer></v-spacer>
          <!----- route /menu button ------>
          <router-link to="/" tag="span">
            <v-btn
              class="ma-2"
              tile
              outlined
              :elevation="3"
              @click="paymentItems"
              >Finalizar comprar</v-btn
            >
          </router-link>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="qrCodeDialog" max-width="500">
        <!----- QR code image  ------>
        <v-card>
          <v-img src="../assets/QRCode.png" contain height="490"></v-img>
        </v-card>
      </v-dialog>
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
      // Variable of radiogroup v-model
      radioGroup: 1,
      // Variable that represent the cost total of everything shopping cart
      total: 0,
      // Variable that represent the cost total of everything shopping cart without the iva
      subTotal: 0,
      // Variable of the qr code image inside the v-dialog
      qrCodeDialog: false,
      // Variable that represent the label "Total"
      totalLabel: "Total:  ",
      // Variable that represent the label "subtotal"
      subTotalLabel: "Subtotal:  ",
    };
  },
  mounted() {
    this.totalPayment();
  },
  methods: {
    ...mapMutations(["setHideMenu", "showAlert"]),
    // Function to calculate the total and subTotal of shopping cart
    totalPayment() {
      this.total = 0;
      this.subTotal = 0;
      for (var i = 0; i < this.shoppingCar.length; i++) {
        this.total += this.shoppingCar[i].total;
      }
      this.subTotal = Math.floor(this.total - this.total * 0.19);
      if (this.subTotal < 0) {
        this.subTotal = 0;
      }
    },
    // Function to finish the buy and return to menu
    paymentItems() {
      this.setHideMenu(true);
      this.showAlert();
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
  margin-top: 133px;
  width: 1080px;
}
.total {
  margin-top: 13px;
  margin-right: 120px;
}
.subTotal {
  margin-top: 13px;
  margin-right: 120px;
}
.radioGroupDiv {
  margin-top: 70px;
}
.appDiv {
  height: 937px;
  background-image: url("~@/assets/flores.gif");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
}
#cardTitle {
  margin-bottom: 20px;
}
.separateDiv {
  height: 35px;
}
</style>