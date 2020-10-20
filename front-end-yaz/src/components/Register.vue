<template>
  <div class="divMainRegister">
    <!-------- Div to center the v-card ----------->
    <div class="divCenter">
      <!-------- V-card ----------->
      <v-card width="600px" height="800px" shaped>
        <div class="divCentral">
          <v-col cols="10">
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
                  :counter="24"
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
                  :counter="24"
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

export default {
  data() {
    return {
      // Variable to validate that all registry data is correct
      valid: true,
      // Name field validations to ensure its integrity
      nameRules: [
        (v) => !!v || "Se requiere un Nombre",
        (v) =>
          (v && v.length <= 12) ||
          "El nombre no puede exceder de los 12 caracteres",
      ],
      // Password field validations to ensure its integrity
      passwordRules: [
        (v) => !!v || "Se requiere una Contraseña",
        (v) =>
          (v && v.length <= 24) ||
          "La contraseña no puede exceder de los 24 dígitos",
      ],
      // Email field validations to ensure its integrity
      emailRules: [
        (v) => !!v || "Se requiere un Email",
        (v) => /.+@.+/.test(v) || "El email no es válido",
        (v) =>
          (v && v.length <= 24) ||
          "La contraseña no puede exceder de los 24 dígitos",
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
      // Variable to change the route depending on whether you log in or get an error
      path: "register",
      email: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    // Statement of Store methods
    ...mapMutations(["addUser", "activeUser", "setHideMenu", "setActiveUser"]),
    // Function to validate the input data, create the user and return to the previous route
    validate() {
      var photo = null;
      if (this.$refs.form.validate()) {
        if (this.photo == null) {
          photo = "null.png";
        } else {
          photo = this.photo.name;
        }
        var user = {
          id_user: this.id,
          user_name: this.name,
          user_email: this.email,
          user_type: 2,
          user_photo: photo,
          user_password: this.password,
        };
        this.addUser(user);
        this.setActiveUser(user);
        this.createUser();
        if (this.paymentProcess == false) {
          this.setHideMenu(true);
          this.path = "";
        } else {
          this.setHideMenu(false);
          this.path = "payment";
        }
      }
    },
    async createUser() {
      var data = {
        user_name: this.name,
        user_type: 2,
        user_photo: this.photo.name,
        user_password: this.password,
        user_email: this.email,
        user_phone: "523",
        user_address: "cra 49",
      };
      const response = await UsersService.addUser(data);
      console.log(response);
    },
  },
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
          "La dirección no puede exceder de los 64 caracteres";
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
  height: 100vh;
}
.imageyaz {
  height: 30px;
  width: 400px;
  margin: 0px auto;
  margin-bottom: 200px;
}
</style>