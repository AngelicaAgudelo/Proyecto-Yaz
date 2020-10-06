<template>
  <div>
    <v-dialog v-model="activeEvent" persistent max-width="500">
      <!-------- V-card ----------->
      <v-card>
        <v-alert v-model="activeAlert" max-height="50px" type="error"
          >El correo del usuario no existe</v-alert
        >
        <v-container>
          <v-form @submit.prevent="addEvent">
            <v-layout align-center justify-center>
              <v-card-title id="cardTitle">
                <h2>{{ title }}</h2>
              </v-card-title>
            </v-layout>
            <!-------- Name input ----------->
            <v-text-field
              v-model="name"
              type="text"
              label="Nombre evento"
            ></v-text-field>
            <!-------- details input ----------->
            <v-text-field
              v-model="details"
              type="text"
              label="Detalles"
            ></v-text-field>
            <!-------- User input ----------->
            <v-text-field
              v-model="email"
              type="text"
              label="Email"
            ></v-text-field>
            <!-------- Time start ----------->
            <v-text-field
              :disabled="true"
              v-model="timeStart"
              type="time"
              label="Hora Inicio"
              value="12:30:00"
              suffix="PST"
            ></v-text-field>
            <!-------- Time input ----------->
            <v-text-field
              v-model="timeEnd"
              type="time"
              label="Hora fin"
              value="12:30:00"
              suffix="PST"
            ></v-text-field>
            <v-radio-group v-model="color" row>
              <v-radio label="Rojo" color="red" value="red"></v-radio>
              <v-radio label="Azul" color="blue" value="blue"></v-radio>
              <v-radio label="Indigo" color="#7986CB" value="#7986CB"></v-radio>
              <v-radio label="Verde" color="green" value="green"></v-radio>
              <v-radio label="Naranja" color="orange" value="orange"></v-radio>
            </v-radio-group>
            <v-row>
              <!-------- Button to cancel ----------->
              <v-btn
                class="ma-2"
                tile
                outlined
                :elevation="3"
                color="black"
                @click="setActiveEvent(false)"
                >Cancelar</v-btn
              >
              <v-spacer></v-spacer>
              <!-------- Edit event button ----------->
              <v-btn
                class="ma-2"
                tile
                outlined
                color="black"
                :elevation="3"
                @click="addEventComponent"
                >{{ confirmButton }}</v-btn
              >
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
// Statement of Store methods
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      // Time start
      timeStart: "13:00",
      // Time end
      timeEnd: "13:00",
      // Name
      name: "",
      // Details
      details: "",
      // Time start
      start: "",
      // Date
      date: "",
      // Color
      color: "",
      // Title
      title: "",
      // Email
      email: "",
      // Variable to edit the label of confirm Button
      confirmButton: "",
      // Variable to show or hide the alert component
      activeAlert: false,
    };
  },
  // Connection with parent component
  created() {},
  methods: {
    ...mapMutations(["setActiveEvent", "setEvent", "addEvent", "verifyEmail"]),
    // Function to edit the event
    addEventComponent() {
      var nameEvent = this.name;
      var detailsEvent = this.details;
      if (this.name == "") {
        nameEvent = "(Sin nombrar)";
      }
      if (this.details == "") {
        detailsEvent = "(Sin informacion)";
      }
      var event = {
        category: this.selectEvent.category,
        color: this.color,
        details: detailsEvent,
        end: this.date + " " + this.timeEnd,
        id: this.selectEvent.id,
        name: nameEvent,
        start: this.selectEvent.start,
        user_email: this.email,
      };
      this.verifyEmail(this.email);
      if (this.checkEmail) {
        if (this.editEvent) {
          this.setEvent(event);
        } else {
          this.addEvent(event);
        }
        this.setActiveEvent(false);
        this.verifyEmail("null");
      } else {
        this.activeAlert = true;
        setTimeout(() => {
          this.activeAlert = false;
        }, 1500);
      }
    },
    // Function to show component
    setVariables() {
      if (this.editEvent) {
        this.title = "Editor de Evento";
        this.confirmButton = "Editar evento";
      } else {
        this.title = "Creador de Evento";
        this.confirmButton = "Crear evento";
      }
      this.name = this.selectEvent.name;
      this.email = this.selectEvent.user_email;
      this.color = this.selectEvent.color;
      this.details = this.selectEvent.details;
      this.timeStart = this.selectEvent.start.split(" ")[1];
      this.timeEnd = this.selectEvent.end.split(" ")[1];
      this.date = this.selectEvent.end.split(" ")[0];
    },
  },
  computed: {
    ...mapState(["activeEvent", "selectEvent", "editEvent", "checkEmail"]),
  },
};
</script>