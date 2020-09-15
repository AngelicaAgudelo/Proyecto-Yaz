 <template>
  <v-app>
    <!-------- Inicio del componente del Menu (Menu desplegable lateral) ----------->
    <v-navigation-drawer v-model="menu" absolute temporary>
      <v-flex cols="1">
        <v-avatar id="av" size="110px">
          <img :src="require('@/assets/' + activeUser.user_photo)" alt="John" />
        </v-avatar>
        <div id="name_worker">
          <h2>{{activeUser.user_name}}</h2>
        </div>
        <router-link to="/shop" tag="span">
          <v-btn class="ma-2" tile outlined color="black">tienda</v-btn>
        </router-link>
        <router-link to="/calendar" tag="span">
          <v-btn class="ma-2" tile outlined color="black">
            <v-icon center>{{calendarButton}}</v-icon>
          </v-btn>
        </router-link>
      </v-flex>
    </v-navigation-drawer>
    <!-------- Final del componente del Menu ----------->

    <!-------- Inicio del componente superior (Navbar) ----------->
    <v-app-bar v-show="esconderMenu" max-height="70px">
      <v-layout>
        <router-link to="/register" tag="span">
          <div id="inicio">
            <v-btn
              class="ma-2"
              tile
              outlined
              color="black"
              @click="setEsconderMenu(false)"
            >Iniciar Sesion</v-btn>
          </div>
        </router-link>
        <div id="menu">
          <v-btn class="ma-2" outlined color="black" @click.stop="menu = !menu">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </div>
        <div id="crearSesion">
          <v-btn class="ma-2" tile outlined color="black">Crear cuenta</v-btn>
        </div>
      </v-layout>
    </v-app-bar>
    <router-view />
  </v-app>
  <!-------- Final del componente superior (Inicio sesion) ----------->
</template>
  <script>
// Import del icono de calendario del menu
import { mdiCalendarMonth } from "@mdi/js";
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";
// Import del objeto que me permite manipular funciones del Store
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // Variable que permite manejar el open and close del menu
      menu: null,
      // Variable que aloja el icono de calendario importado previamente
      calendarButton: mdiCalendarMonth,
    };
  },
  methods: {
    // Declaracion de los metodos de la Store
    ...mapMutations(["setEsconderMenu"]),
  },
  mounted() {},
  computed: {
    // Declaracion de las variables de la Store
    ...mapState([
      "esconderMenu",
      "activeUser",
    ]),
  },
};
</script>

<style >
#inicio {
  margin: 25px;
}
#crearSesion {
  margin: 25px;
}
#av {
  margin-bottom: 10px;
}
#name_worker {
  margin-left: 20px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
}
</style>
