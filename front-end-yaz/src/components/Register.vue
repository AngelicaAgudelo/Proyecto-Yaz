<template>
  <div class="divMainRegister">
    <!-------- Div to center the v-card ----------->
    <div class="divCenter">
      <!-------- V-card ----------->
      <v-card width="600px" height="800px" shaped>
        <div class="divCentral">
          <v-col cols="10">
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
            <!-------- Image Yaz ----------->
            <div class="imageyaz">
              <v-img :src="require('@/assets/yaz.png')"></v-img>
            </div>
            <div class="divInformation">
              <!-------- V-form component to validate user input ----------->
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-------- ID input ----------->
                <v-text-field
                  v-model="email"
                  :counter="64"
                  :rules="emailRules"
                  label="Email"
                  required
                  outlined
                ></v-text-field>
                <!-------- Name input ----------->
                <v-text-field
                  v-model="name"
                  :counter="32"
                  :rules="nameRules"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>
                <!-------- Password input ----------->
                <v-text-field
                  v-model="password"
                  :counter="32"
                  :rules="passwordRules"
                  :type="show1 ? 'text' : 'password'"
                  label="Contraseña"
                  required
                  outlined
                ></v-text-field>
                <!-------- phone input ----------->
                <v-text-field
                  v-model="phone"
                  :counter="10"
                  :rules="phoneRules"
                  label="Teléfono"
                  outlined
                ></v-text-field>
                <!-------- Address input ----------->
                <v-text-field
                  v-model="address"
                  :counter="64"
                  :rules="addressRules"
                  label="Dirección"
                  outlined
                ></v-text-field>
                <!-------- Image input ----------->
                <v-file-input
                  @change="clickImage($event)"
                  v-model="photo"
                  accept="image/*"
                  label="Foto de perfil"
                ></v-file-input>
                <!-------- Button to create user ----------->
                <v-row>
                  <router-link :to="'/' + path" tag="span">
                    <v-btn
                      class="ma-2"
                      :disabled="!valid"
                      tile
                      outlined
                      :elevation="3"
                      color="black"
                      @click="validate"
                      >Crear Usuario</v-btn
                    >
                  </router-link>
                  <v-spacer></v-spacer>
                  <!-------- Button to log in ----------->
                  <router-link to="/login" tag="span">
                    <v-btn class="ma-2" tile :elevation="3"
                      >¿ya tienes cuenta?</v-btn
                    >
                  </router-link>
                </v-row>
              </v-form>
            </div>
          </v-col>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
// Import from object that allows to fetch variables from the Store
import { mapState } from "vuex";
// Import of the object that allows manipulating Store functions
import { mapMutations } from "vuex";
import UsersService from "../services/UsersService";
// Import firebase to be able to upload images
import { storage } from "../services/firebase";
const ref = storage.ref();
// Import of the login warning icon
import { mdiAlert } from "@mdi/js";
// Import the library to encrypt passwords
import sha256 from 'crypto-js/sha256';

export default {
  data() {
    return {
      // Variable to validate that all registry data is correct
      valid: true,
      // Name field validations to ensure its integrity
      nameRules: [
        (v) => !!v || "Se requiere un nombre",
        (v) =>
          (v && v.length <= 32) ||
          "El nombre no puede exceder los 32 caracteres",
      ],
      // Password field validations to ensure its integrity
      passwordRules: [
        (v) => !!v || "Se requiere una contraseña",
        (v) =>
          (v && v.length <= 64) ||
          "La contraseña no puede exceder los 64 dígitos",
      ],
      // Email field validations to ensure its integrity
      emailRules: [
        (v) => !!v || "Se requiere un email",
        (v) => /.+@.+/.test(v) || "El email no es válido",
        (v) =>
          (v && v.length <= 64) ||
          "La contraseña no puede exceder los 64 dígitos",
      ],
      // ID
      id: "",
      // Name
      name: "",
      // Password
      password: "",
      // validation of the password input point format
      show1: false,
      // Variable where the address of the photo is saved
      photo: null,
      images: [],
      image: [],
      // Variable to change the route depending on whether you log in or get an error
      path: "register",
      email: "",
      phone: "",
      address: "",
      bolError: false,
      error: "",
      // Variable that saves the previously imported icon
      warningIcon: mdiAlert,
      overlayError: false,
    };
  },
  methods: {
    // Statement of Store methods
    ...mapMutations(["addUser", "activeUser", "setHideMenu", "setActiveUser"]),
    // Function to validate the input data, create the user and return to the previous route
    validate() {
      this.overlayError = true;
      if (this.$refs.form.validate()) {
        var user = {
          user_name: this.name,
          user_photo: this.photo,
          user_password: this.password,
          user_email: this.email,
          user_type: 2,
          user_phone: this.phone,
          user_address: this.address,
        };
        if (this.photo == null) {
          this.photo =
            "https://firebasestorage.googleapis.com/v0/b/yaz-85eb7.appspot.com/o/Users%2Fnull.png?alt=media&token=22b0ab1c-e1ea-4e90-9e66-3ccb11b78768";
          this.createUser();
        } else {
          this.sendImage();
        }

        this.addUser(user);
      }
    },

    async createUser() {
      var data = {
        user_name: this.name,
        user_type: 2,
        user_photo: this.photo,
        user_password: sha256(this.password).toString(),
        user_email: this.email,
        user_phone: this.phone,
        user_address: this.address,
      };
      const response = await UsersService.addUser(data)
        .then((response) => {
          this.setActiveUser(data);
          if (this.paymentProcess == false) {
            this.setHideMenu(true);
            this.overlayError = false;
            this.$router.push("/");
          } else {
            this.setHideMenu(false);
            this.overlayError = false;
            this.$router.push("/payment");
          }
        })
        .catch((e) => {
          this.overlayError = false;
          this.bolError = true;
          if (e.response.data.message == "user_name must be unique") {
            this.error = "El nombre de usuario ingresado ya existe";
          } else if (e.response.data.message == "user_email must be unique") {
            this.error = "El Email ingresado ya existe";
          } else {
            this.error = "Error 500";
          }
        });
    },
    clickImage(e) {
      this.image = e;
    },
    sendImage() {
      const refImg = ref.child("Users/" + this.image.name);
      const metaData = { contentType: "jpeg" };
      refImg.put(this.image, metaData).then((e) => {
        ref
          .child("Users/" + this.image.name)
          .getDownloadURL()
          .then((url) => {
            this.photo = url;
            this.createUser();
          });
      });
    },
  },
  created() {},
  computed: {
    // Declaration of Store variables
    ...mapState(["paymentProcess"]),
    // Validations of the Identification field to guarantee its integrity
    phoneRules() {
      const rules = [];
      if (this.phone != "") {
        const rule = (v) => !isNaN(parseFloat(v)) || "Solo se permite números";
        rules.push(rule);
      }
      if (this.phone != "") {
        const rule = (v) =>
          (v >= 0 && v <= 9999999999) ||
          "El teléfono no puede exceder los 10 Dígitos";
        rules.push(rule);
      }
      return rules;
    },
    // Address field validations to ensure its integrity
    addressRules() {
      const rules = [];
      if (this.address != "") {
        const rule = (v) =>
          (v && v.length <= 64) ||
          "La dirección no puede exceder los 64 caracteres";
        rules.push(rule);
      }
      return rules;
    },
  },
};
</script>
<style scoped>
.divCenter {
  height: 890px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.divCentral {
  display: flex;
  justify-content: center;
  align-items: center;
}
.signup {
  margin-top: 90px;
  margin-left: 94px;
  font-size: 33px;
}
.divInformation {
  margin-top: 90px;
}
.divMainRegister {
  background-image: url("~@/assets/flores.gif");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #464646;
  height: 100%;
}

.imageyaz {
  height: 30px;
  width: 400px;
  margin: 0px auto;
  margin-bottom: 200px;
}
</style>