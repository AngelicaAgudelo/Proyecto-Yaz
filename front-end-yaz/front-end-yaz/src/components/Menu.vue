  <template>
  <div>
    <!-------- Inicio del componente del Menu ----------->
    <v-navigation-drawer v-model="menu" absolute temporary color="black"></v-navigation-drawer>
    <!-------- Final del componente del Menu ----------->

    <!-------- Inicio del componente superior (Inicio sesion) ----------->
    <v-app-bar apps>
      <v-row>
        <v-spacer></v-spacer>
        <div id="inicio">
          <v-btn class="ma-2" tile outlined color="black">Iniciar Sesion</v-btn>
        </div>
        <div id="crearSesion">  
           <v-btn to="/Shop" class="ma-2" tile outlined color="black">Crear cuenta</v-btn>      
        </div>
        <div id="menu">
          <v-btn class="ma-2" outlined fab color="black" @click.stop="menu = !menu">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>
  </div>
  <!-------- Final del componente superior (Inicio sesion) ----------->
</template>

<script>
export default {
  data() {
    return {
      menu: null,
    };
  },
  methods:{
      shop(){

      }
  }
};
</script>

<style scopet>
#inicio {
  margin: 25px;
}
#crearSesion {
  margin: 25px;
}
#menu {
  margin: 15px;
}
</style>