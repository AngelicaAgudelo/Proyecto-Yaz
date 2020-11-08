<template>
  <div class="divMainLogin">
    <!-------- Div to center the v-card ----------->
    <div class="divCenter">
      <!-------- V-card ----------->
      <v-card width="600px" height="600px" shaped>
        <v-col xs12 md12>
          <!-------- Image Yaz ----------->
          <div class="imageyaz">
            <v-img :src="require('@/assets/yaz.png')"></v-img>
          </div>
          <div class="divInformation">
            <!-------- V-form component to validate user input ----------->
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-------- Email input ----------->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
              ></v-text-field>
              <!-------- Password input ----------->
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                label="Contraseña"
                outlined
              ></v-text-field>
              <!-------- Error card ----------->
              <v-dialog v-model="bolError" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span>
                      <v-icon>{{ warningIcon }}</v-icon>
                      {{ error }}
                      <v-icon>{{ warningIcon }}</v-icon>
                    </span>
                    <v-spacer></v-spacer>
                    <v-menu bottom left></v-menu>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      class="ma-2"
                      outlined
                      :elevation="3"
                      color="black"
                      @click="bolError = false"
                      >cerrar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-overlay :value="overlayError">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
              <!-------- Button to start session ----------->
              <v-layout>
                <router-link :to="'/' + path" tag="span">
                  <v-btn
                    class="ma-2"
                    tile
                    outlined
                    color="black"
                    :elevation="3"
                    @click="validateSession"
                    >Inicio Sesion</v-btn
                  >
                </router-link>
                <v-spacer></v-spacer>
                <!-------- Button to register ----------->
                <router-link to="/register" tag="span">
                  <v-btn class="ma-2" tile :elevation="3">Registrarse</v-btn>
                </router-link>
              </v-layout>
            </v-form>
          </div>
        </v-col>
      </v-card>
    </div>
  </div>
</template>

<script>
// Import of the object that allows to manipulate Store functions
import { mapMutations } from "vuex";
// Statement of Store methods
import { mapState } from "vuex";
// Import of the login warning icon
import { mdiAlert } from "@mdi/js";
import UsersService from "../services/UsersService";

export default {
  data() {
    return {
      // Email field validations to ensure its integrity
      emailRules: [
        (v) => !!v || "Se requiere Email",
        (v) => /.+@.+/.test(v) || "El email no es valido",
      ],
      // Password field validations to ensure its integrity
      passwordRules: [
        (v) => !!v || "Se requiere una contraseña",
        (v) =>
          (v && v.length <= 32) ||
          "La contraseña no puede pasar de los 32 digitos",
      ],
      // Variable to validate that all registry data is correct
      valid: true,
      // Password
      password: "",
      // Email
      email: "",
      // validation of the password input point format
      show1: false,
      // Variable to change the route depending on whether you log in or get an error
      path: "login",
      // Variable that stores the type of error when trying to login
      error: "",
      // Variable that handles the error card
      bolError: false,
      // Variable that saves the previously imported icon
      warningIcon: mdiAlert,
      overlayError: false,
    };
  },
  methods: {
    ...mapMutations(["setHideMenu", "setActiveUser"]),
    // Method that verifies if the user exists, and if it exists
    async validateSession() {
      try {
        this.overlayError = true;
        const response = await UsersService.getUserByEmail(this.email);
        if (response.data != "") {
          if (response.data.data.user_password == this.password) {
            this.setActiveUser({
              user_name: response.data.data.user_name,
              user_type: response.data.data.user_type,
              user_photo: response.data.data.user_photo,
              user_password: response.data.data.user_password,
              user_email: response.data.data.user_email,
              user_phone: response.data.data.user_phone,
              user_address: response.data.data.user_address,
            });
            this.setHideMenu(true);
            this.overlayError = false;
            this.$router.go(-1);
          } else {

            this.bolError = true;
            this.error = "La contraseña es incorrecta";
            this.overlayError = false;
          }
        } else {
          this.bolError = true;
          this.error = "El usuario no existe";
          this.overlayError = false;
        }
      } catch (error) {
        console.log(error);
      }
      this.overlayError = false;
    },
  },
  computed: {
    ...mapState(["isClient", "paymentProcess"]),
  },
};
</script>

<style scoped>
.divCenter {
  height: 890px;
  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imageyaz {
  height: 30px;
  width: 400px;
  margin: 0px auto;
  margin-bottom: 200px;
}
.divInformation {
  margin-top: 10px;
}
.divMainLogin {
  background-image: url("~@/assets/flores.gif");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  height: 100%;
}
</style>