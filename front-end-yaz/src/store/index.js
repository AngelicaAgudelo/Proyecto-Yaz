import Vue from 'vue'
import Vuex from 'vuex'
// Import firebase to be able to upload images
import { storage } from "../services/firebase";
const ref = storage.ref();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Boolean to handle the initial menu
    hideMenu: true,
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
        start: "2020-09-25 09:00",
        end: "2020-09-25 10:00",
        color: "green",
        category: "juan duque",
      },
      {
        id: 1,
        name: "laura",
        user_email: "duque@du",
        details: "cepillado",
        start: "2020-10-01 07:00",
        end: "2020-10-01 09:00",
        color: "red",
        category: "angelica",
      },
      {
        id: 2,
        name: "kevin",
        user_email: "angelica@an",
        details: "tinturacion de pelo",
        start: "2020-10-01 08:00",
        end: "2020-10-01 09:00",
        color: "blue",
        category: "juan duque",
      },
      {
        id: 3,
        name: "daniela",
        user_email: "alejo@al",
        details: "rizos",
        start: "2020-10-01 12:00",
        end: "2020-10-01 15:00",
        color: "#7986CB",
        category: "angelica",
      },
      {
        id: 4,
        name: "camilo",
        user_email: "sebastian@se",
        details: "rizos",
        start: "2020-10-01 07:00",
        end: "2020-10-01 08:00",
        color: "#7986CB",
        category: "sebastian",
      },
      {
        id: 5,
        name: "camilo",
        user_email: "duque@du",
        details: "ssss",
        start: "2020-10-01 10:00",
        end: "2020-10-01 13:00",
        color: "orange",
        category: "sebastian",
      },
    ],
    // Open user session
    activeUser: {
      user_name: "",
      user_type: 0,
      user_photo: "https://firebasestorage.googleapis.com/v0/b/yaz-85eb7.appspot.com/o/Users%2Fnull.png?alt=media&token=22b0ab1c-e1ea-4e90-9e66-3ccb11b78768",
      user_password: "",
      user_email: "",
      user_phone: "",
      user_address: ""
    },
    // boolean that says the user type
    isClient: 0,
    // boolean that handless the ChangeEvent component
    activeEvent: false,
    // event categories (workers)
    category: [],
    // Shopping car of shop
    shoppingCar: [],
    // boolean that handless the payment alert 
    alert: false,
    // boolean that represents if the user is in the process of payment
    paymentProcess: false,
    // Variable that store the event selected
    selectEvent: {},
    // Boolean that identify if the selected event will be edited or created
    editEvent: false,
    // Boolean that says if the email exists or not
    checkEmail: false
  },
  putImage(){
    ref.child('Users/'+ this.activeUser.user_photo)
    .then( (url) => {
      this.activeUser.user
    })
  },
  mutations: {
    // set variable editEvent
    setEditEvent(state, bol) {
      state.editEvent = bol;
    },
    // set variable selectEvent
    setSelectedEvent(state, selectedEvent) {
      state.selectEvent = selectedEvent;
    },
    // Function to check if the email entered exist
    verifyEmail(state, email) {
      var notFound = false;
      for (var i = 0; i < state.users.length; i++) {
        if (state.users[i].user_email == email) {
          notFound = true;
        }
      }
      if (notFound) {
        state.checkEmail = true;
      } else {
        state.checkEmail = false;
      }
    },
    // Function that show the payment alert for 2 second
    showAlert(state) {
      state.alert = true;
      window.setInterval(() => {
        state.alert = false;
      }, 2000)
    },
    // Function to change the state of the variable that handles the menu
    setHideMenu(state, bol) {
      state.hideMenu = bol;
    },
    setShoppingCar(state, car) {
      state.shoppingCar = car;
    },
    // Function that handles the ChangeEvent component
    setActiveEvent(state, bol) {
      state.activeEvent = bol;
    },
    // Function that update the shoppingCar
    updateShoppingCar(state, update) {
      for (var i = 0; i < state.shoppingCar.length; i++) {
        if (state.shoppingCar[i].item.id_item == update.id) {
          state.shoppingCar[i] = update.item;
        }
        if (state.shoppingCar[i].quantity == 0) {
          state.shoppingCar.splice(i, 1)
        }
      }
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
      if (user.user_photo == null) {
        user.user_photo = "null.png"
      }
      if (user.user_address == null) {
        user.user_address = "";
      }
      if (user.user_phone == null) {
        user.user_phone = "";
      }
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
    setEvent(state, event) {
      var ind = 0;
      for (var i = 0; i < state.events.length; i++) {
        if (state.events[i].id == event.id) {
          state.events[i].category = event.category;
          state.events[i].color = event.color;
          state.events[i].details = event.details;
          state.events[i].end = event.end;
          state.events[i].name = event.name;
          state.events[i].start = event.start;
          state.events[i].user_email = event.user_email;
          i = state.events.length
        }
      }
    },
    // Function that change the variale paymentProcess
    setPaymentProcess(state, bol) {
      state.paymentProcess = bol;
    }
  },
  actions: {
  },
  modules: {
  }
})