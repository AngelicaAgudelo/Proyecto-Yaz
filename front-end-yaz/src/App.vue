 <template>
  <v-app>
    <!-------- Navbar ----------->
    <v-app-bar
      v-show="hideMenu"
      :elevation="2"
      color="white"
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
          <v-icon large>{{ menuHamburger }}</v-icon>
        </v-btn>
      </v-layout>
      <v-layout>
        <div>
          <v-img
            class="imgYaz"
            extended
            src="./assets/yaz.png"
            max-height="95"
            max-width="170"
          ></v-img>
        </div>
      </v-layout>
    </v-app-bar>
    <!-- Object showing the selected path -->
    <router-view />
    <!-------- Side drop-down menu ----------->
    <v-navigation-drawer v-model="menu" absolute temporary color="#f5f5f5">
      <v-flex cols="1">
        <v-layout column align-center>
          <div class="divChangeUser">
            <router-link to="/login" tag="span">
              <v-btn
                class="ma-2"
                tile
                min-width="258"
                min-height="50"
                :elevation="3"
                @click="setHideMenu(false)"
              >
                <v-icon center x-large>{{ changeUser }}</v-icon>
                {{ loginLabel }}
              </v-btn>
            </router-link>
          </div>
          <v-avatar id="icon_worker" size="110px">
            <img
              :src="require('@/assets/' + activeUser.user_photo)"
              alt="John"
            />
          </v-avatar>
          <div id="name_worker">
            <h2>{{ activeUser.user_name }}</h2>
          </div>
          <div class="divShop">
            <router-link to="/shop" :disabled="valideActiveUser" tag="span">
              <v-btn
                class="ma-2"
                tile
                outlined
                color="black"
                :elevation="7"
                min-width="258"
                min-height="80"
              >
                <v-icon center x-large>{{ storeButton }}</v-icon
                >Tienda
              </v-btn>
            </router-link>
          </div>
          <div class="divCalendar">
            <router-link :to="'/' + pathCalendar" tag="span">
              <v-btn
                class="ma-2"
                tile
                outlined
                :disabled="valideActiveUser"
                color="black"
                :elevation="7"
                min-width="258"
                min-height="80"
              >
                <v-icon center x-large>{{ calendarButton }}</v-icon
                >Calendario
              </v-btn>
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <div class="divRegister">
            <router-link to="/register" tag="span">
              <v-btn
                class="ma-2"
                tile
                outlined
                color="black"
                min-width="258"
                min-height="80"
                :elevation="7"
                @click="setHideMenu(false)"
              >
                <v-icon center x-large>{{ newUserIcon }}</v-icon
                >Crear cuenta
              </v-btn>
            </router-link>
          </div>
        </v-layout>
      </v-flex>
    </v-navigation-drawer>
  </v-app>
</template>
  <script>
// Import calendar Icon
import { mdiCalendarMonth } from "@mdi/js";
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
// Statement of Store methods
import { mapMutations } from "vuex";
// Import store Icono
import { mdiStore } from "@mdi/js";
// Import change session icon
import { mdiAccount } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";
import { mdiMenu } from "@mdi/js";

export default {
  data() {
    return {
      // Variable that allows handling the open and close of the menu
      loginLabel: "Iniciar Sesion",
      menu: null,
      pathCalendar: "",
      // Menu icons
      calendarButton: mdiCalendarMonth,
      storeButton: mdiStore,
      changeUser: mdiAccount,
      newUserIcon: mdiAccountPlus,
      menuHamburger: mdiMenu,
    };
  },
  methods: {
    ...mapMutations(["setHideMenu"]),
  },
  mounted() {},
  computed: {
    // Declaration of Store variables
    ...mapState(["hideMenu", "activeUser"]),
    valideActiveUser() {
      if (this.activeUser.user_email == "null") {
        return true;
      } else {
        this.loginLabel = "Cambiar de sesion";
        this.pathCalendar = "calendar";
        return false;
      }
    },
  },
};
</script>

<style>
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
.divShop {
  margin-top: 60px;
}
.divCalendar {
  margin-top: 60px;
}
.divRegister {
  margin-top: 60px;
}
</style>