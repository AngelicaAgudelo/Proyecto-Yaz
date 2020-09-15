<template>
  <v-app id="app">
    <!-------- Inicio del componente del carrito de compra ----------->
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-card min-height="50px">
        <div id="total">
          <v-btn
            class="ma-2"
            tile
            outlined
            :elevation="3"
            color="black"
            enabled="false"
          >
            Pagar
            <v-icon center>{{PayIcon}}</v-icon>
          </v-btn>
          Total: ${{totalCarro}}
        </div>
      </v-card>
      <v-col v-for="car in carrito" :key="car.item.id_item">
        <v-card max-height="200px">
          <v-list-item-title class="headline">{{car.item.item_name}}</v-list-item-title>
          <v-list-item-subtitle>$ {{car.item.item_price}}</v-list-item-subtitle>
          <v-img
            :src="car.item.src"
            class="black--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100px"
          ></v-img>
          <v-card-actions>
            <div id="cantidad">cantidad: {{car.cantidad}}</div>
            <v-spacer></v-spacer>
            <v-btn icon @click="quitarCantidad(car)">
              <v-icon center>{{ quitar }}</v-icon>
            </v-btn>
            <v-btn icon @click="añadirCantidad(car)">
              <v-icon center>{{ añadir }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-navigation-drawer>
    <!-------- Final del componente del carrito de compra ----------->

    <!-------- Inicio del componente central (Items de compra) ----------->
    <v-container class="my-4">
      <v-row row grap>
        <v-flex xs12 sm6 md5 lg3 v-for="item in items" :key="item.id_item">
          <template>
            <div id="cartas">
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
                  <v-btn
                    color="black"
                    tile
                    outlined
                    :elevation="3"
                    @click="comprar(item)"
                  >Comprar</v-btn>
                  <v-spacer></v-spacer>
                  <div id="precio" color="green" text>$ {{item.item_price}}</div>
                </v-card-actions>
              </v-card>
            </div>
          </template>
        </v-flex>
      </v-row>
    </v-container>
    <!-------- Final del componente central (Items de compra) ----------->

    <!-------- Inicio del componente Inferior ( Boton de carrito de compra ) ----------->
    <v-footer app>
              <v-layout align-center justify-center>
      <v-badge :content="totalElementos" :value="totalElementos" color="green" overlap>
        <v-btn color="black" text @click.stop="drawer = !drawer">
          <v-icon center large>{{ IconCar }}</v-icon>
        </v-btn>
      </v-badge>
      </v-layout>
    </v-footer>
    <!-------- Final del componente Inferior ( Boton de carrito de compra ) ----------->
  </v-app>
</template>


<script>
// Import del icono del carrito de compra
import { mdiCart } from "@mdi/js";
// Import del icono del carrito bajando
import { mdiPlusThick } from "@mdi/js";
// Import del icono del carrito subiendo
import { mdiMinus } from "@mdi/js";
// Import del icono de pag
import { mdiCashUsdOutline } from "@mdi/js";
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      // Array que almacena todos los items que se presionaron para comprar ( Carrito de compra )
      carrito: [],
      // Icono de carrito
      IconCar: mdiCart,
      // Icono de pago
      PayIcon: mdiCashUsdOutline,
      // Variable para cambiar estado al componente drawer
      drawer: null,
      // Icono de carrito+
      añadir: mdiPlusThick,
      // Icono de carrito-
      quitar: mdiMinus,
      // Variable que representa el total de elementos en el carrito de compra ( c/u Item * Cantidad )
      totalElementos: 0,
      // Variable que representa el monto total en el carrito
      totalCarro: 0,
      // Variable que representa el boolean de abrir y cerrar menu
      menu: null,
    };
  },
  methods: {
    // Metodo para pasar el item al carrito de compra
    comprar(vari) {
      var val = false;
      for (var i = 0; i < this.carrito.length; i++) {
        if (this.carrito[i].item.id_item == vari.id_item) {
          this.carrito[i].cantidad++;
          this.carrito[i].total += vari.item_price;
          val = true;
        }
      }
      if (!val) {
        this.carrito.push({ item: vari, cantidad: 1, total: vari.item_price });
      }
      this.cantidadElementos();
      this.totalCarrito();
    },
    // Metodo para contar el dinero total de c/u * producto ( cada producto del carrito )
    totalCarrito() {
      var total = 0;
      for (var i = 0; i < this.carrito.length; i++) {
        total += this.carrito[i].total;
      }
      this.totalCarro = total;
    },
    // Metodo para eliminar una c/u de un producto del carrito de compra
    quitarCantidad(car) {
      let indice = this.carrito.findIndex(
        (indic) => indic.item.id_item === car.item.id_item
      );
      this.carrito[indice].cantidad--;
      this.carrito[indice].total -= car.item.item_price;
      if (this.carrito[indice].cantidad == 0) {
        this.carrito.splice(indice, 1);
      }
      this.cantidadElementos();
      this.totalCarrito();
    },
    // Metodo para agregar una c/u de un producto del carrito de compra
    añadirCantidad(car) {
      let indice = this.carrito.findIndex(
        (indic) => indic.item.id_item === car.item.id_item
      );
      this.carrito[indice].cantidad++;
      this.carrito[indice].total += car.item.item_price;
      this.cantidadElementos();
      this.totalCarrito();
    },
    // Metodo para contar la cantidad de elementos del carrito()
    cantidadElementos() {
      var total = 0;
      for (var i = 0; i < this.carrito.length; i++) {
        total += this.carrito[i].cantidad;
      }
      this.totalElementos = total;
      this.totalCarrito();
    },
  },
  computed: {
    // Declaracion de las variables de la Store
    ...mapState(["items"]),
  },
};
</script>>


<style>
#cartas {
  margin: 10px;
}
#precio {
  margin: 10px;
}
#inicios {
  margin: 25px;
}
#crearSesion {
  margin: 25px;
}
#menu {
  margin: 15px;
}
</style>