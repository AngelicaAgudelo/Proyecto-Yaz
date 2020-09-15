<template>
  <div>
    <div>
      <!-------- Div para centrar el v-card ----------->
      <div class="centro">
        <!-------- Div del V-card ----------->
        <v-card width="600px" height="860px" shaped>
          <div class="central">
            <v-flex cols="2">
              <!-------- Div del String "Sign up" ----------->
              <div class="signup">
                <h2>Sign up</h2>
              </div>
              <div class="datos">
                <!-------- Componente V-form para validar las entradas del usuario ----------->
                  <!-------- Entrada de la identificacion ----------->
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    outlined
                  ></v-text-field>
                  <!-------- Entrada de la contraseña ----------->
                  <v-text-field
                    v-model="password"
                    :type="show1 ? 'text' : 'password'"
                    label="Contraseña"
                    required
                    outlined
                  ></v-text-field>
                  <!-------- Boton para crear usuario ----------->
                  <router-link to="/" tag="span">
                    <v-btn class="ma-2" tile outlined color="black" @click="validate">Inicio sesion</v-btn>
                  </router-link>
              </div>
            </v-flex>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
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