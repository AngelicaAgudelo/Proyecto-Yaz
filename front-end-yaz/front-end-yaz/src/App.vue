 <template>
  <v-app>
    <!-------- Inicio del componente superior (Navbar) ----------->
    <v-app-bar
      v-show="esconderMenu"
      :elevation="5"
      fade-img-on-scroll
      height="75px"
      max-height="75px"
    >
      <v-layout>
        <v-btn
          class="iconMenu"
          outlined
          fab
          color="black"
          :elevation="5"
          @click.stop="menu = !menu"
        >
          <v-icon large>{{menuHamburger}}</v-icon>
        </v-btn>
      </v-layout>
      <v-layout>
        <div>
          <v-img class="imgYaz" extended src="./assets/yaz.png" max-height="95" max-width="170"></v-img>
        </div>
      </v-layout>
    </v-app-bar>
    <!-- Objeto que muestra la ruta seleccionada -->
    <router-view />
    <!-------- Final del componente superior (Inicio sesion) ----------->
    <!-------- Inicio del componente del Menu (Menu desplegable lateral) ----------->
    <v-navigation-drawer v-model="menu" absolute temporary color="#f5f5f5">
      <v-flex cols="1">
        <v-layout column align-center>
          <v-avatar id="icon_worker" size="110px">
            <img :src="require('@/assets/' + activeUser.user_photo)" alt="John" />
          </v-avatar>
          <div id="name_worker">
            <h2>{{activeUser.user_name}}</h2>
          </div>
          <div class="shop">
            <router-link to="/shop" tag="span">
              <v-btn class="ma-2" tile outlined color="black" :elevation="7">
                <v-icon center x-large>{{storeButton}}</v-icon>Tienda
              </v-btn>
            </router-link>
          </div>
          <div class="calendar">
            <router-link to="/calendar" tag="span">
              <v-btn class="ma-2" tile outlined color="black" :elevation="7">
                <v-icon center x-large>{{calendarButton}}</v-icon>Calendario
              </v-btn>
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <div id="inicio">
            <router-link to="/register" tag="span">
              <v-btn
                class="ma-2"
                tile
                outlined
                color="black"
                min-width="50px"
                :elevation="7"
                @click="setEsconderMenu(false)"
              >
                <v-icon center x-large>{{newUserIcon}}</v-icon>Crear cuenta
              </v-btn>
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <div class="changeUser">
            <router-link to="/" tag="span">
              <v-btn
                class="ma-2"
                tile
                outlined
                color="black"
                :elevation="3"
                @click="setEsconderMenu(false)"
              >
                <v-icon center x-large>{{changeUser}}</v-icon>Cambiar de sesion
              </v-btn>
            </router-link>
          </div>
        </v-layout>
      </v-flex>
    </v-navigation-drawer>
    <!-------- Final del componente del Menu ----------->
  </v-app>
</template>
  <script>
// Import del icono de calendario del menu
import { mdiCalendarMonth } from "@mdi/js";
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";
// Import del objeto que me permite manipular funciones del Store
import { mapMutations } from "vuex";
// Import de icono de la tienda
import { mdiStore } from "@mdi/js";
// Import de icono de cambio de sesion
import { mdiAccount } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";
import { mdiMenu } from "@mdi/js";

export default {
  data() {
    return {
      // Variable que permite manejar el open and close del menu
      menu: null,
      // Iconos del menu
      calendarButton: mdiCalendarMonth,
      storeButton: mdiStore,
      changeUser: mdiAccount,
      newUserIcon: mdiAccountPlus,
      menuHamburger: mdiMenu,
    };
  },
  methods: {
    // Declaracion de los metodos de la Store
    ...mapMutations(["setEsconderMenu"]),
  },
  mounted() {},
  computed: {
    // Declaracion de las variables de la Store
    ...mapState(["esconderMenu", "activeUser"]),
  },
};
</script>

<style>
#changeUser {
  margin-top: 115px;
}
#men {
  margin: 55px;
}
#icon_worker {
  margin-top: 70px;
  margin-bottom: 20px;
}
#name_worker {
  margin-bottom: 50px;
}
.divImg {
  top: 25px;
  margin-left: 50px;
}
#shop {
  margin-right: 610px;
}
.imgYaz {
}
.iconMenu {
  align-self: center;
  align-content: center;
}
</style>