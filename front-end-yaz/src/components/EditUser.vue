<template>
  <div class="divMainEdit">
    <!-------- Div to center the v-card ----------->
    <div class="divCenter">
      <!-------- V-card ----------->
      <v-card width="600px" height="860px" shaped>
        <v-toolbar height="58%" elevation="3" color="#3c5dc9" dark>
          <div class="text-toolbar">Editar perfil</div>
        </v-toolbar>
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
              <v-avatar id="icon" size="150%" class="profile">
                <img :src="url" />
              </v-avatar>
            </div>
            <div class="divInformation">
              <!-------- V-form component to validate user input ----------->
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-------- Image input ----------->
                <v-file-input
                  @change="clickImage($event)"
                  v-model="photo"
                  accept="image/*"
                  label="Foto de perfil"
                ></v-file-input>
                <!-------- Email input ----------->
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
                  :counter="64"
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
                <!-------- Button to create user ----------->
                <v-row>
                  <v-btn
                    class="ma-2"
                    :disabled="!valid"
                    tile
                    outlined
                    :elevation="3"
                    color="black"
                    @click="validate"
                    >Actualizar perfil</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-------- Button to log in ----------->
                  <v-btn class="ma-2" tile :elevation="3" @click="cancel"
                    >Cancelar</v-btn
                  >
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
import sha256 from "crypto-js/sha256";

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
          (v && v.length <= 64) || "El email no puede exceder los 64 dígitos",
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
      url: null,
      type: 0,
    };
  },
  methods: {
    // Statement of Store methods
    ...mapMutations(["setHideMenu", "setActiveUser"]),
    mount() {
      this.email = this.activeUser.user_email;
      this.name = this.activeUser.user_name;
      this.type = this.activeUser.user_type;
      this.phone = this.activeUser.user_phone;
      this.address = this.activeUser.user_address;
      this.url = this.activeUser.user_photo;
    },
    // Function to validate the input data, create the user and return to the previous route
    validate() {
      this.overlayError = true;
      if (this.$refs.form.validate()) {
        if (this.photo == null) {
          this.photo = this.url;
          this.getIdUser();
        } else {
          this.sendImage();
        }
      }
    },
    clickImage(e) {
      try {
        this.url = URL.createObjectURL(this.photo);
        this.image = e;
      } catch (e) {
        console.log(e);
        this.url = "";
      }
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
            this.getIdUser();
          });
      });
    },
    cancel() {
      this.setHideMenu(true);
      this.$router.go(-1);
    },
    async getIdUser() {
      const response = await UsersService.getUserByEmail(
        this.activeUser.user_email
      ).then((response) => {
        this.updateUser(response.data.data.id_user);
      });
    },
    async updateUser(id) {
      var data = {
        user_name: this.name,
        user_type: 2,
        user_photo: this.photo,
        user_type: this.type,
        user_password: sha256(this.password).toString(),
        user_email: this.email,
        user_phone: this.phone,
        user_address: this.address,
      };
      const response = await UsersService.updateUser(id, data)
        .then((response) => {
          this.overlayError = false;
          this.setActiveUser(data);
          this.setHideMenu(true);
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.overlayError = false;
          this.bolError = true;
          if (error.response.data.message == "user_name must be unique") {
            this.error = "El nombre de usuario ingresado ya existe";
          } else if (
            error.response.data.message == "user_email must be unique"
          ) {
            this.error = "El Email ingresado ya existe";
          } else {
            this.error = "Error 404";
          }
        });
    },
  },
  created() {
    this.mount();
  },
  computed: {
    // Declaration of Store variables
    ...mapState(["paymentProcess", "activeUser"]),
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
.divMainEdit {
  background-image: url("~@/assets/flores.gif");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #464646;
  height: 100%;
}
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
.imageyaz {
  height: 140px;
  width: 140px;
  margin: 0px auto;
  margin-bottom: 20%;
}
#icon {
  top: 3%;
  left: -20%;
}
#titleDiv {
  margin-top: 3%;
  margin-left: 44.2%;
}
.text-toolbar {
  margin-left: 43%;
}
</style>