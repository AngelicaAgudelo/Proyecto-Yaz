<template>
  <div>
    <!-------- Div para centrar el v-card ----------->
    <div class="centro">
      <!-------- Div del V-card ----------->
      <v-card width="900px" height="860px" shaped>
        <div class="central">
          <v-col cols="5">
            <!-------- Div del String "Sign up" ----------->
            <div class="signup">
              <h2>Sign up</h2>
            </div>
            <div class="datos">
              <!-------- Componente V-form para validar las entradas del usuario ----------->
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-------- Entrada de la identificacion ----------->
                <v-text-field
                  v-model="id"
                  :counter="9"
                  :rules="idRules"
                  label="Identificacion"
                  required
                  outlined
                ></v-text-field>
                <!-------- Entrada del Nombre ----------->
                <v-text-field
                  v-model="name"
                  :counter="12"
                  :rules="nameRules"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>
                <!-------- Entrada de la contraseña ----------->
                <v-text-field
                  v-model="password"
                  :counter="15"
                  :rules="passwordRules"
                  :type="show1 ? 'text' : 'password'"
                  label="Contraseña"
                  required
                  outlined
                ></v-text-field>
                <!-------- Entrada del tipo de usuario ----------->
                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  label="Tipo cuenta"
                  required
                  outlined
                ></v-select>
                <!-------- Entrada de la imagen ----------->
                <v-file-input v-model="photo" accept="image/*" label="File input"></v-file-input>
                <!-------- Boton para crear usuario ----------->
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
              </v-form>
            </div>
          </v-col>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";
// Import del objeto que me permite manipular funciones del Store
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      // Variable para validar que todos los datos del registro esten correctos
      valid: true,
      // validaciones del campo Nombre para garantizar su integridad
      nameRules: [
        (v) => !!v || "Se requiere un nombre",
        (v) =>
          (v && v.length <= 12) ||
          "El nombre no puede pasar de los 12 caracteres",
      ],
      // validaciones del campo Contraseña para garantizar su integridad
      passwordRules: [
        (v) => !!v || "Se requiere un nombre",
        (v) =>
          (v && v.length <= 15) ||
          "La contraseña no puede pasar de los 15 digitos",
      ],
      // validaciones del campo Identificacion para garantizar su integridad
      idRules: [
        (v) => !!v || "Se requiere una identificacion",
        (v) => !isNaN(parseFloat(v)) || "Solo se permite numeros",
        (v) =>
          (v >= 0 && v <= 999999999) ||
          "La identificacion es maximo de 9 Digitos",
      ],
      // Datos del combobox para elegir el tipo de usuario
      items: ["Usuario", "Trabajador"],
      // Variable donde se guarda la id
      id: "",
      // Variable donde se guarda el nombre
      name: "",
      // Variable donde se guarda la contraseña
      password: "",
      // validacion del formato punto del input contraseña
      show1: false,
      // Variable donde se guarda el tipo de usuario 
      select: null,
      // Variable donde se guarda la direccion de la foto
      photo: null,
    };
  },
  methods: {
    // Declaracion de los metodos de la Store
    ...mapMutations([
      "addUser",
      "activeUser",
      "setEsconderMenu",
      "setActiveUser",
    ]),
    // Funcion para validar los datos de los input, crear el usuario y volver a la ruta anterior
    validate() {
      var tipo = 0;
      var foto = null;
      if (this.$refs.form.validate()) {
        if (this.select === "Trabajador") {
          tipo = 1;
        } else {
          tipo = 2;
        }
        if (this.photo == null) {
          foto = "null.png";
        } else {
          foto = this.photo.name;
        }
        var user = {
          id_user: this.id,
          user_name: this.name,
          user_type: tipo,
          user_photo: foto,
          user_password: this.password,
        };
        this.addUser(user);
        this.setEsconderMenu(true);
        this.setActiveUser(user);
      }
    },
  },
  computed: {
    // Declaracion de las variables de la Store
    ...mapState([]),
  },
};
</script>
<style scoped>
.centro {
  height: 890px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.central {
  display: flex;
  justify-content: center;
  align-items: center;
}
.signup {
  margin-top: 90px;
  margin-left: 94px;
  font-size: 33px;
}
.datos {
  margin-top: 90px;
}
</style>