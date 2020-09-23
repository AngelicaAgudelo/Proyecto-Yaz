<template>
  <div class="divMainRegister">
    <!-------- Div to center the v-card ----------->
    <div class="divCenter">
      <!-------- V-card ----------->
      <v-card width="600px" height="760px" shaped>
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
                  v-model="id"
                  :counter="9"
                  :rules="idRules"
                  label="Identificacion"
                  required
                  outlined
                ></v-text-field>
                <!-------- Name input ----------->
                <v-text-field
                  v-model="name"
                  :counter="12"
                  :rules="nameRules"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>
                <!-------- Password input ----------->
                <v-text-field
                  v-model="password"
                  :counter="15"
                  :rules="passwordRules"
                  :type="show1 ? 'text' : 'password'"
                  label="Contraseña"
                  required
                  outlined
                ></v-text-field>
                <!-------- type user input ----------->
                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  label="Tipo cuenta"
                  required
                  outlined
                ></v-select>
                <!-------- Image input ----------->
                <v-file-input v-model="photo" accept="image/*" label="File input"></v-file-input>
                <!-------- Button to create user ----------->
                <v-row>
                  <router-link to="/" tag="span">
                    <v-btn
                      class="ma-2"
                      :disabled="!valid"
                      tile
                      outlined
                      :elevation="3"
                      color="black"
                      @click="validate"
                    >Crear Usuario</v-btn>
                  </router-link>
                  <v-spacer></v-spacer>
                  <!-------- Button to log in ----------->
                  <router-link to="/" tag="span">
                    <v-btn class="ma-2" tile :elevation="3">¿ya tienes cuenta?</v-btn>
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

export default {
  data() {
    return {
      // Variable to validate that all registry data is correct
      valid: true,
      // Name field validations to ensure its integrity
      nameRules: [
        (v) => !!v || "Se requiere un nombre",
        (v) =>
          (v && v.length <= 12) ||
          "El nombre no puede pasar de los 12 caracteres",
      ],
      // Password field validations to ensure its integrity
      passwordRules: [
        (v) => !!v || "Se requiere un nombre",
        (v) =>
          (v && v.length <= 15) ||
          "La contraseña no puede pasar de los 15 digitos",
      ],
      // Validations of the Identification field to guarantee its integrity
      idRules: [
        (v) => !!v || "Se requiere una identificacion",
        (v) => !isNaN(parseFloat(v)) || "Solo se permite numeros",
        (v) =>
          (v >= 0 && v <= 999999999) ||
          "La identificacion es maximo de 9 Digitos",
      ],
      // Combobox data to choose the type of user
      items: ["Usuario", "Trabajador"],
      // ID
      id: "",
      // Name
      name: "",
      // Password
      password: "",
      // validation of the password input point format
      show1: false,
      // Variable where the user type is saved
      select: null,
      // Variable where the address of the photo is saved
      photo: null,
    };
  },
  methods: {
    // Statement of Store methods
    ...mapMutations(["addUser", "activeUser", "setHideMenu", "setActiveUser"]),
    // Function to validate the input data, create the user and return to the previous route
    validate() {
      var type = 0;
      var photo = null;
      if (this.$refs.form.validate()) {
        if (this.select === "Trabajador") {
          type = 1;
        } else {
          type = 2;
        }
        if (this.photo == null) {
          photo = "null.png";
        } else {
          photo = this.photo.name;
        }
        var user = {
          id_user: this.id,
          user_name: this.name,
          user_type: type,
          user_photo: photo,
          user_password: this.password,
        };
        this.addUser(user);
        this.setHideMenu(true);
        this.setActiveUser(user);
      }
    },
  },
  computed: {
    // Declaration of Store variables
    ...mapState([]),
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
  background-size: cover;
  background-color: #464646;
}
.imageyaz {
  height: 30px;
  width: 400px;
  margin: 0px auto;
  margin-bottom: 200px;
}
</style>