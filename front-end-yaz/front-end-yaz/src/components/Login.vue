<template>
  <v-app class="back">
    <!-------- Div para centrar el v-card ----------->
    <div class="centro">
      <!-------- Div del V-card ----------->
      <v-card width="600px" height="600px" shaped>
        <v-col xs12 md12>
          <!-------- Div del String "Sign in" ----------->
          <div class="signin">
            <div class="image">
              <v-img :src="require('@/assets/yaz.png')"></v-img>
            </div>
          </div>
          <div class="datos">
            <!-------- Componente V-form para validar las entradas del usuario ----------->
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-------- Entrada de la identificacion ----------->
              <v-text-field v-model="email" :rules="emailRules" label="Email" required outlined></v-text-field>
              <!-------- Entrada de la contraseña ----------->
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                label="Contraseña"
                required
                outlined
              ></v-text-field>
              <!-------- Tarjeta de error de inicio ----------->
              <v-dialog v-model="bolError" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span>
                      <v-icon>{{warningIcon}}</v-icon>
                      {{error}}
                      <v-icon>{{warningIcon}}</v-icon>
                    </span>
                    <v-spacer></v-spacer>
                    <v-menu bottom left></v-menu>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      class="ma-2"
                      tile
                      outlined
                      color="black"
                      text
                      @click="bolError = false"
                    >cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-------- Boton para iniciar sesion ----------->
              <router-link :to=" '/'+path" tag="span">
                <v-btn
                  class="ma-2"
                  tile
                  outlined
                  color="black"
                  :elevation="3"
                  @click="validateSession"
                >Inicio Sesion</v-btn>
              </router-link>
            </v-form>
          </div>
        </v-col>
      </v-card>
    </div>
  </v-app>
</template>
../assets/maquillaje.png

<script>
// Import del objeto que me permite manipular funciones del Store
import { mapMutations } from "vuex";
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";
// Import del icono de warning de inicio se sesion
import { mdiAlert } from "@mdi/js";
export default {
  data() {
    return {
      // validaciones del campo Identificacion para garantizar su integridad
      emailRules: [
        (v) => !!v || "Se requiere Email",
        (v) => /.+@.+/.test(v) || "El email no es valido",
      ],
      // validaciones del campo Contraseña para garantizar su integridad
      passwordRules: [
        (v) => !!v || "Se requiere una contraseña",
        (v) =>
          (v && v.length <= 15) ||
          "La contraseña no puede pasar de los 15 digitos",
      ],
      // Variable para validar que todos los datos del registro esten correctos
      valid: true,
      // Variable donde se guarda la contraseña
      password: "",
      // Variable donde se guarda la el email
      email: "",
      // validacion del formato punto del input contraseña
      show1: false,
      // Variable para cambiar la ruta dependiendo si se logea o le sale error
      path: "",
      // Variable que guarda el tipo de error al iniciar sesion
      error: "",
      // Variable que maneja la tarjeta de error
      bolError: false,
      // Variable que guarda el icono previamente importado
      warningIcon: mdiAlert,
    };
  },
  methods: {
    // Declaracion de los metodos de la Store
    ...mapMutations(["isUser", "setEsconderMenu"]),
    // Metodo que verifica si el usuario existe, y si existe, lo direcciona al menu principal
    validateSession() {
      var emailPass = {
        email: this.email,
        password: this.password,
      };
      this.isUser(emailPass);
      var nume = this.isClient;
      if (nume == 0) {
        this.path = "menu";
        this.setEsconderMenu(true);
      } else if (nume == 1) {
        this.bolError = true;
        this.error = "La contraseña es incorrecta";
      } else {
        this.bolError = true;
        this.error = "El usuario no existe";
      }
    },
  },
  computed: {
    // Declaracion de las variables de la Store
    ...mapState(["isClient"]),
  },
};
</script>

<style scoped>
.centro {
  height: 890px;
  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.central {
  /*background-image: url('~@/assets/yaz.png');*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.signin {
  margin-top: 50px;
}
.image {
  height: 30px;
  width: 400px;
  margin: 0px auto;
  margin-bottom: 200px;
}
.datos {
  margin-top: 10px;
}
.back {
  background-image: url("~@/assets/yazBlue.png");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
}
</style>