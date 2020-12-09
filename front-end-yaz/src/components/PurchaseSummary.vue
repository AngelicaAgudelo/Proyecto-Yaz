<template>
  <!--  Table with the elements of shopping cart   -->
  <v-data-table :headers="headers" :items="items" :footer-props="props" item-key="name">
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn @click="removeQuantity(item)" icon>
        <v-icon>{{minusButton}}</v-icon>
      </v-btn>
      <v-btn @click="addQuantity(item)" icon>
        <v-icon>{{plusButton}}</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
[`item.actions`]
<script>
// Import the plus icon
import { mdiPlusThick } from "@mdi/js";
// Import the menus icon
import { mdiMinus } from "@mdi/js";
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
// Import of the object that allows to manipulate Store functions
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // Props of v-data-table
      headers: [
        {
          text: "Producto",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Cantidad", value: "quantity" },
        { text: "Valor unitario", value: "uniqueValue" },
        { text: "Valor total", value: "totalValue" },
        { text: "Editar Carrito", value: "actions", sortable: false },
      ],
      // Array with the elements of shopping cart
      items: [],
      // Props of v-data-footer
      props: {
        "items-per-page-options": [5],
      },
      // Icons to edit the elements of shopping cart
      plusButton: mdiPlusThick,
      minusButton: mdiMinus,
    };
  },
  mounted() {
    this.improveShoppingCar();
  },
  methods: {
    ...mapMutations(["setShoppingCar", "updateShoppingCar"]),
    // Function to add C/U of element the shopping cart
    addQuantity(item) {
      for (var i = 0; i < this.shoppingCar.length; i++) {
        if (this.shoppingCar[i].item.id_item == item.id) {
          var updateTotal =
            this.shoppingCar[i].item.item_price *
            (this.shoppingCar[i].quantity + 1);
          var updateItem = {
            item: this.shoppingCar[i].item,
            quantity: this.shoppingCar[i].quantity + 1,
            total: updateTotal,
          };
          var updateCar = {
            id: this.shoppingCar[i].item.id_item,
            item: updateItem,
          };
          this.updateShoppingCar(updateCar);
        }
      }
      this.improveShoppingCar();
      this.$emit("clickButton");
    },
    // Function to remove C/U of element the shopping cart
    removeQuantity(item) {
      for (var i = 0; i < this.shoppingCar.length; i++) {
        if (this.shoppingCar[i].item.id_item == item.id) {
          var updateTotal =
            this.shoppingCar[i].item.item_price *
            (this.shoppingCar[i].quantity - 1);
          var updateItem = {
            item: this.shoppingCar[i].item,
            quantity: this.shoppingCar[i].quantity - 1,
            total: updateTotal,
          };
          var updateCar = {
            id: this.shoppingCar[i].item.id_item,
            item: updateItem,
          };
          this.updateShoppingCar(updateCar);
        }
      }
      this.improveShoppingCar();
      this.$emit("clickButton");
    },
    // Function to convert shopping cart items to v-data-table items
    improveShoppingCar() {
      var itemsCar = [];
      for (var i = 0; i < this.shoppingCar.length; i++) {
        itemsCar.push({
          id: this.shoppingCar[i].item.id_item,
          name: this.shoppingCar[i].item.item_name,
          quantity: this.shoppingCar[i].quantity,
          uniqueValue: this.shoppingCar[i].item.item_price,
          totalValue: this.shoppingCar[i].total,
        });
      }
      this.items = itemsCar;
    },
  },
  computed: {
    // Declaration of Store variables
    ...mapState(["shoppingCar"]),
  },
};
</script>