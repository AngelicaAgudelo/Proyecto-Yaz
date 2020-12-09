 <template>
  <v-app>
    <!-------- Navbar ----------->
    <v-app-bar
      app
      :elevation="2"
      color="white"
      fade-img-on-scroll
      height="75px"
      max-height="75px"
    >
      <router-link to="/" tag="span">
        <v-btn class="ma-2" text min-height="60">
          <v-col>
            <v-icon center x-large>{{ menus }}</v-icon>
            <div>Menu</div>
          </v-col>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>
      <div>
        <router-link :to="'/' + pathCalendar" tag="span">
          <v-btn
            v-show="loginUser"
            class="ma-2"
            text
            :disabled="valideActiveUser"
          >
            <v-icon center x-large>{{ calendarButton }}</v-icon
            >Calendario
          </v-btn>
        </router-link>
      </div>
      <div>
        <router-link to="/shop" :disabled="valideActiveUser" tag="span">
          <v-btn class="ma-2" text>
            <v-icon center x-large>{{ storeButton }}</v-icon
            >Tienda
          </v-btn>
        </router-link>
      </div>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon center large>{{ newUserIcon }}</v-icon
              >Contactenos
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline lighten-2">
              Contactenos
            </v-card-title>

            <div class="contactDiv">
              <div class="itemsDiv">
                <v-layout justify-center column>
                
                    <div class="phoneIcon">
                    <v-icon x-large>{{ phone }}</v-icon>
                    6681818
                    </div>
                  

                  <div class="mailIcon">
                    <v-icon x-large>{{ mail }}</v-icon>
                    peluqueriainternacional68@gmail.com
                    </div>
                </v-layout>
              </div>
            </div>

            <v-divider></v-divider>
          </v-card>
        </v-dialog>
      </div>
      <div>
        <router-link to="/register" tag="span">
          <v-btn v-show="!loginUser" text @click="setHideMenu(false)">
            <v-icon center large>{{ newUserIcon }}</v-icon
            >Crear cuenta
          </v-btn>
        </router-link>
      </div>
      <div class="divChangeUser">
        <router-link to="/login" tag="span">
          <v-btn v-show="!loginUser" text @click="setHideMenu(false)">
            <v-icon center large>{{ changeUser }}</v-icon>
            {{ loginLabel }}
          </v-btn>
        </router-link>
      </div>
      <v-btn
        v-show="loginUser"
        class="iconMenu"
        outlined
        fab
        @click.stop="menu = !menu"
      >
        <v-icon large>{{ changeUser }}</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Object showing the selected path -->
    <router-view />
    <!-------- Side drop-down menu ----------->
    <v-navigation-drawer
      v-model="menu"
      app
      right
      temporary
      color="#f5f5f5"
      width="17%"
    >
      <v-flex cols="1">
        <v-layout column align-center>
          <v-avatar id="icon_worker" size="80%">
            <img :src="activeUser.user_photo" />
          </v-avatar>
          <div id="name_worker">
            <h2>{{ activeUser.user_name }}</h2>
          </div>
          <div id="email_worker">
            <h2>{{ activeUser.user_email }}</h2>
          </div>
        </v-layout>
      </v-flex>

      <div class="signOffDiv">
        <router-link to="/editUser" tag="span">
          <v-btn
            class="ma-2"
            tile
            min-width="100%"
            min-height="60"
            :elevation="0"
            @click="setHideMenu(false)"
          >
            Editar Perfil
          </v-btn>
        </router-link>

        <v-btn
          class="ma-2"
          tile
          min-width="100%"
          min-height="60"
          :elevation="0"
          @click="signOff"
        >
          CERRAR SESION
        </v-btn>
      </div>
      <v-row justify="center"> </v-row>
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
import { mdiHome } from "@mdi/js";
import { mdiPhone } from "@mdi/js";
import { mdiGmail } from "@mdi/js";

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
      // Boolean that represents if the user has logged in
      loginUser: false,
      menus: mdiHome,
      dialog: false,
      phone: mdiPhone,
      mail: mdiGmail,
    };
  },
  methods: {
    ...mapMutations(["setHideMenu", "setActiveUser"]),
    signOff() {
      this.setActiveUser({
        user_name: "",
        user_type: 0,
        user_photo:
          "https://firebasestorage.googleapis.com/v0/b/yaz-85eb7.appspot.com/o/Users%2Fnull.png?alt=media&token=22b0ab1c-e1ea-4e90-9e66-3ccb11b78768",
        user_password: "",
        user_email: "",
        user_phone: "",
        user_address: "",
      });
      this.loginUser = false;
      this.menu = !this.menu;
      this.loginLabel = "INICIAR SESION";
    },
  },
  mounted() {},
  computed: {
    // Declaration of Store variables
    ...mapState(["hideMenu", "activeUser"]),
    valideActiveUser() {
      if (this.activeUser.user_email == "") {
        return true;
      } else {
        this.loginLabel = "Cambiar de sesion";
        this.pathCalendar = "calendar";
        this.loginUser = true;
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
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 0.73vw;
}
#email_worker {
  font-size: 0.73vw;
}
.divImg {
  top: 25px;
  margin-left: 50px;
}
#shop {
  margin-right: 610px;
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
.signOffDiv {
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
}
.contactDiv {
  margin-top: 1%;
  height: 100px;
}
.itemsDiv{
  margin-top: 2%;
  margin-left: 13%;
}
.phoneIcon{
  margin-left: 4%;
}
.mailIcon{
  margin-top: 2%;
  margin-left: 4%;
}
</style>