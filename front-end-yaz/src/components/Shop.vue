<template>
  <v-app id="app">
    <!-------- Starting the shopping cart component ----------->
    <v-navigation-drawer v-model="drawer" app temporary right width="450">
      <v-card max-height="50px">
        <div id="total">
          <router-link :to=" '/'+path" tag="span">
            <v-btn
              class="ma-2"
              tile
              outlined
              :elevation="3"
              @click="payItems"
              color="black"
              :disabled="payButton"
            >
              Pagar
              <v-icon center>{{PayIcon}}</v-icon>
            </v-btn>
          </router-link>
          Total: ${{totalCar}}
        </div>
      </v-card>
      <div class="shoppingCarDiv">
        <v-row row grap>
          <v-flex lg5 v-for="car in shoopingCar" :key="car.item.id_item">
            <template>
              <div class="itemDiv">
                <v-card max-height="200px" max-width="200">
                  <v-list-item-title class="headline">{{car.item.item_name}}</v-list-item-title>
                  <v-list-item-subtitle>$ {{car.item.item_price}}</v-list-item-subtitle>
                  <v-img
                    :src="car.item.src"
                    class="black--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="100px"
                  ></v-img>
                  <v-card-actions>
                    <div id="quantity">cantidad: {{car.quantity}}</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="removeAmount(car)">
                      <v-icon center>{{ remove }}</v-icon>
                    </v-btn>
                    <v-btn icon @click="addAmount(car)">
                      <v-icon center>{{ add }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </template>
          </v-flex>
        </v-row>
      </div>
    </v-navigation-drawer>
    <!-------- Start of purchase items ----------->
    <v-container class="my-4">
      <v-row row grap>
        <v-flex xs12 sm6 md5 lg3 v-for="item in items" :key="item.id_item">
          <template>
            <div id="divCart">
              <v-card class="mx-auto" :elevation="3" max-width="350">
                <v-list-item-content>
                  <v-layout align-center justify-center>
                    <div>
                      <v-list-item-title class="headline" color="#000000">{{item.item_name}}</v-list-item-title>
                    </div>
                  </v-layout>
                </v-list-item-content>
                <v-img :src="item.src" class="black--text align-end" height="200px">
                  <div class="fill-height bottom-gradient"></div>
                </v-img>
                <v-card-subtitle class="pb-0">Make-up</v-card-subtitle>
                <v-card-text class="text--primary">
                  <div>{{ item.item_description }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="black" tile outlined :elevation="3" @click="buy(item)">Comprar</v-btn>
                  <v-spacer></v-spacer>
                  <div id="price" color="green" text>$ {{item.item_price}}</div>
                </v-card-actions>
              </v-card>
            </div>
          </template>
        </v-flex>
      </v-row>
    </v-container>
    <!-------- Button Component Home (Shopping Cart Button) ----------->
    <v-footer app>
      <v-layout align-center justify-center>
        <v-badge :content="totalElements" :value="totalElements" color="green" overlap>
          <v-btn color="black" text @click.stop="drawer = !drawer">
            <v-icon center large>{{ IconCar }}</v-icon>
          </v-btn>
        </v-badge>
      </v-layout>
    </v-footer>
  </v-app>
</template>


<script>
// Import from shopping cart icon
import { mdiCart } from "@mdi/js";
// Import the plus icon
import { mdiPlusThick } from "@mdi/js";
// Import the menus icon
import { mdiMinus } from "@mdi/js";
// Payment icon import
import { mdiCashUsdOutline } from "@mdi/js";
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
// Import of the object that allows to manipulate Store functions
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      // Array that stores all the items that are pressed to buy (Shopping cart)
      shoopingCar: [],
      // Cart icon
      IconCar: mdiCart,
      // Payment icon
      PayIcon: mdiCashUsdOutline,
      // Variable to change state to the drawer component
      drawer: null,
      // Cart icon +
      add: mdiPlusThick,
      // Cart icon -
      remove: mdiMinus,
      // Variable that represents the total number of items in the shopping cart (each Item * Quantity)
      totalElements: 0,
      // Variable that represents the total amount in the cart
      totalCar: 0,
      // Variable that represents the boolean of opening and closing menu
      menu: null,
      // Variable that represent the current path
      path: "shop",
      // Variable that represent boolean state of pay button
      payButton: true,
    };
  },
  mounted() {
    this.mountedFunction();
  },
  methods: {
    ...mapMutations(["setHideMenu", "setShoppingCar"]),
    // Function to transfer the item to the shopping cart
    buy(vari) {
      var val = false;
      for (var i = 0; i < this.shoopingCar.length; i++) {
        if (this.shoopingCar[i].item.id_item == vari.id_item) {
          this.shoopingCar[i].quantity++;
          this.shoopingCar[i].total += vari.item_price;
          val = true;
        }
      }
      if (!val) {
        this.shoopingCar.push({
          item: vari,
          quantity: 1,
          total: vari.item_price,
        });
      }
      this.quantifyElements();
      this.totalTrolley();
      this.payButton = false;
      this.setShoppingCar(this.shoopingCar);
    },
    // Function to count the total money of each * product (each product in the cart)
    totalTrolley() {
      var total = 0;
      for (var i = 0; i < this.shoopingCar.length; i++) {
        total += this.shoopingCar[i].total;
      }
      this.totalCar = total;
    },
    // Function to remove a quantity of a product from the shopping cart
    removeAmount(car) {
      let index = this.shoopingCar.findIndex(
        (indic) => indic.item.id_item === car.item.id_item
      );
      this.shoopingCar[index].quantity--;
      this.shoopingCar[index].total -= car.item.item_price;
      if (this.shoopingCar[index].quantity == 0) {
        this.shoopingCar.splice(index, 1);
      }
      if (this.shoopingCar.length == 0) {
        this.payButton = true;
      }
      this.quantifyElements();
      this.totalTrolley();
      this.setShoppingCar(this.shoopingCar);
    },
    // Function to add a quantity of a product from the shopping cart
    addAmount(car) {
      let index = this.shoopingCar.findIndex(
        (indic) => indic.item.id_item === car.item.id_item
      );
      this.shoopingCar[index].quantity++;
      this.shoopingCar[index].total += car.item.item_price;
      this.quantifyElements();
      this.totalTrolley();
      this.setShoppingCar(this.shoopingCar);
    },
    // Function to count the number of items in the cart
    quantifyElements() {
      var total = 0;
      for (var i = 0; i < this.shoopingCar.length; i++) {
        total += this.shoopingCar[i].quantity;
      }
      this.totalElements = total;
      this.totalTrolley();
    },
    // Function that redirect to payment Component
    payItems() {
      if (this.totalElements > 0) {
        this.setHideMenu(false);
        this.path = "payment";
      }
    },
    // Function that initializes with the component
    mountedFunction() {
      this.shoopingCar = this.shoppingCar;
      this.quantifyElements();
      this.totalTrolley();
      if (this.totalElements > 0) {
        this.payButton = false;
      }
    },
  },
  computed: {
    // Declaration of Store variables
    ...mapState(["items", "shoppingCar"]),
  },
};
</script>>


<style>
#divCart {
  margin: 10px;
}
#price {
  margin: 10px;
}
.itemDiv {
  margin: 9px;
}
.shoppingCarDiv {
  margin-left: 10px;
}
</style>