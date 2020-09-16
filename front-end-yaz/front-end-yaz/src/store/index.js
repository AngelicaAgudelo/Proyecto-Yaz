import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Boolean to handle the initial menu
    hideMenu: false,
    // List of users coming from the database
    users: [
      {
        id_user: 1,
        user_email: "duque@du",
        user_name: "juan duque",
        user_type: 1,
        user_photo: "jaz.png",
        user_password: "duque",
      },
      {
        id_user: 2,
        user_email: "angelica@an",
        user_name: "angelica",
        user_type: 1,
        user_photo: "maquillaje.png",
        user_password: "angelica",
      },
      {
        id_user: 3,
        user_email: "sebastian@se",
        user_name: "sebastian",
        user_type: 1,
        user_photo: "peluca.png",
        user_password: "sebastian",
      },
      {
        id_user: 4,
        user_email: "alejo@al",
        user_name: "alejandro",
        user_type: 1,
        user_photo: "peluca.png",
        user_password: "alejandro",
      },
      {
        id_user: 5,
        user_email: "",
        user_name: "pruebas",
        user_type: 1,
        user_photo: "jaz.png",
        user_password: "",
      },
    ],
    // Calendar events
    events: [
      {
        id: 0,
        name: "alejo",
        details: "peluqueado",
        start: "2020-09-08 09:00",
        end: "2020-09-08 10:00",
        color: "green",
        category: "juan duque",
      },
      {
        id: 1,
        name: "laura",
        details: "cepillado",
        start: "2020-09-08 07:00",
        end: "2020-09-08 09:00",
        color: "red",
        category: "angelica",
      },
      {
        id: 2,
        name: "kevin",
        details: "tinturacion de pelo",
        start: "2020-09-08 08:00",
        end: "2020-09-08 09:00",
        color: "pink",
        category: "juan duque",
      },
      {
        id: 3,
        name: "daniela",
        details: "rizos",
        start: "2020-09-08 12:00",
        end: "2020-09-08 15:00",
        color: "pink",
        category: "angelica",
      },
      {
        id: 4,
        name: "camilo",
        details: "rizos",
        start: "2020-09-08 07:00",
        end: "2020-09-08 08:00",
        color: "black",
        category: "sebastian",
      },
      {
        id: 5,
        name: "camilo",
        details: "ssss",
        start: "2020-09-08 10:00",
        end: "2020-09-08 13:00",
        color: "blue",
        category: "sebastian",
      },
    ],
    // Open user session
    activeUser: {
      id_user: 0,
      user_email: "",
      user_name: "",
      user_type: 0,
      user_photo: "null.png",
      user_password: "",
    },
    // List of store items
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
    // boolean that says the user type
    isClient: 0,
    // boolean that handles the ChangeEvent component
    activeEvent: false,
    // event categories (workers)
    category: [],
  },
  mutations: {
    // Function to change the state of the variable that handles the menu
    setHideMenu(state, bol) {
      state.hideMenu = bol;
    },
    // Function that handles the ChangeEvent component
    setActiveEvent(state, bol) {
      state.activeEvent = bol;
    },
    // Function to add a user
    addUser(state, user) {
      state.users.push(user);
    },
    // Function to create the category array from the user
    mountCategory(state) {
      var copy = []
      for (var i = 0; i < state.users.length; i++) {
        if (state.users[i].user_type < 2) {
          copy.push(state.users[i].user_name)
        }
      }
      state.category = copy;
    },
    // Function that deletes an event according to its index
    eraseEvent(state, num) {
      state.events.splice(num, 1);

    },
    // Function to change user session
    setActiveUser(state, user) {
      state.activeUser = user;
    },
    // Function to validate that the user entered if it exists
    isUser(state, emailPass) {
      var num = 4;
      var num2 = 0;
      for (let i = 0; i < state.users.length; i++) {
        if (num != 0) {
          if (emailPass.email == state.users[i].user_email) {
            if (emailPass.password == state.users[i].user_password) {
              num = 0
              //this.setActiveUser()
              state.activeUser = state.users[i];
            } else {
              num2 = 1
            }
          }
          else {
            num = 2
            if (num2 == 1) {
              num = num2;
            }
          }
        }
      }
      state.isClient = num;
    },
    // Function to add an event
    addEvent(state, event) {
      state.events.push(event);
    },
    // Function that changes an entire element of the events array
    setEvent(state, eveent) {
      var ind = 0;
      for (var i = 0; i < state.events.length; i++) {
        if (state.events[i].id == eveent.id) {
          state.events[i].category = eveent.category;
          state.events[i].color = eveent.color;
          state.events[i].details = eveent.details;
          state.events[i].end = eveent.end;
          state.events[i].name = eveent.name;
          state.events[i].start = eveent.start;
          i = state.events.length
        }
      }
    },
  },
  actions: {
  },
  modules: {
  }
})