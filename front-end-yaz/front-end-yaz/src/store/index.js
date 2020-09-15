import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Booleando para manejar el menu inicial
    esconderMenu: false,
    // Lista de usuarios que proviene de la base de datos
    users: [
      {
        user_name: "alejandro",
        user_type: 1,
        user_photo: "",
        user_password: "al",
        user_email: "a@a",
        user_cell_phone: 552,
        user_address: ""
      },
      {
        user_name: "duque",
        user_type: 1,
        user_photo: "",
        user_password: "du",
        user_email: "d@d",
        user_cell_phone: 342,
        user_address: ""
      },
      {
        user_name: "angelica",
        user_type: 1,
        user_photo: "",
        user_password: "an",
        user_email: "an@an",
        user_cell_phone: 324,
        user_address: ""
      },
      {
        user_name: "sebastian",
        user_type: 1,
        user_photo: "",
        user_password: "se",
        user_email: "se@se",
        user_cell_phone: 234,
        user_address: ""
      }
    ],
    // La sesion del usuario abierta
    activeUser: {
      id_user: 0,
      user_name: "",
      user_type: 0,
      user_photo: "null.png",
      user_password: "",
    },
    // Lista de items de la tienda
    items: [
      {
        id_item: 0,
        item_name: "maquillaje",
        src: require("../assets/maquillaje.png"),
        item_quantify: 5,
        item_description: "Maquillaje semi-profesional",
        item_price: 23422,
      },
      {
        id_item: 1,
        item_name: "peluca",
        src: require("../assets/peluca.png"),
        item_quantify: 10,
        item_description: "Peluca a base de seda",
        item_price: 233300,
      },
      {
        id_item: 2,
        item_name: "labial St",
        src: require("../assets/labial.png"),
        item_quantify: 2,
        item_description: "labial marca sout para piel sensible",
        item_price: 50000,
      },
      {
        id_item: 3,
        item_name: "labial Dt",
        src: require("../assets/labial.png"),
        item_quantify: 2,
        item_description: "labial marca Dtooh para piel grasa",
        item_price: 45000,
      },
      {
        id_item: 4,
        item_name: "labial Ms",
        src: require("../assets/labial.png"),
        item_quantify: 2,
        item_description: "labial marca Bloodsm",
        item_price: 32000,
      },
      {
        id_item: 5,
        item_name: "tinte",
        src: require("../assets/tinte.png"),
        item_quantify: 4,
        item_description: "tinte rojo berbet semi-plus",
        item_price: 65443,
      },
      {
        id_item: 6,
        item_name: "blondor",
        src: require("../assets/blondon.png"),
        item_quantify: 5,
        item_description: "blondor marca sout",
        item_price: 65443,
      },
    ],
    category:[]
  },
  mutations: {
    // Metodo para cambiara el estado de la variable que maneja el menu
    setEsconderMenu(state, bol) {
      state.esconderMenu = bol;
    },
    // Metodo para agregar un usuario
    addUser(state, user) {
      state.users.push(user);
    },
    // Metodo para cambiar la sesion de usuario
    setActiveUser(state, user) {
      state.activeUser = user;
    },
    mountCategory(state){
      console.log("entre aqui")
      for(var i= 0 ; i < state.users.length; i++){
        if(state.users[i].user_type == 1){
          state.category.push(state.users[i].user_name);

        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
