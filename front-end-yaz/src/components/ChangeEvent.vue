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
              v-model="name_user"
              type="text"
              label="Cliente"
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
            <!-------- Price input ----------->
            <v-text-field
              v-model="price"
              type="text"
              label="Precio"
              :rules="phoneRules"
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
import EventsService from "../services/EventsService"

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
      name_user: "",
      // Variable to edit the label of confirm Button
      confirmButton: "",
      // Variable to show or hide the alert component
      activeAlert: false,
      price: "0",
      status: "",
      phoneRules: [
        (v) => !isNaN(parseFloat(v)) || "Solo se permite números"
      ],
      id: 0,
    };
  },
  // Connection with parent component
  created() {},
  methods: {
    ...mapMutations(["setActiveEvent", "setEvent", "verifyEmail"]),
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
      var service = {
        client_name: this.name_user,
        worker_name: this.selectEvent.category,
        service_date_start: this.selectEvent.start,
        service_date_end: this.date + " " + this.timeEnd,
        service_color: this.color,
        service_name: nameEvent,
        service_description: detailsEvent,
        service_price: parseFloat(this.price),
        service_status: this.status
      }
      if (this.editEvent) {
          this.updateEvent(service);
          this.setActiveEvent(false);
        } else {
          this.addEvent(service);
          this.setActiveEvent(false);
        }
        /*
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
      this.verifyEmail(this.name_user);
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
      */
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
      this.id= this.selectEvent.id_event;
      this.name = this.selectEvent.name;
      this.name_user = this.selectEvent.client_name;
      this.color = this.selectEvent.color;
      this.details = this.selectEvent.description;
      this.price = this.selectEvent.price;
      this.timeStart = this.selectEvent.start.split(" ")[1];
      this.timeEnd = this.selectEvent.end.split(" ")[1];
      this.date = this.selectEvent.end.split(" ")[0];
    },
    async addEvent(event){
      const response = await EventsService.addEvent(event);
      this.$emit('getService');
    },
    async updateEvent(event){
      var id = this.id;
      const response = await EventsService.updateEvent(id, event);
      this.$emit('getService');
    },
  },
  computed: {
    ...mapState(["activeEvent", "selectEvent", "editEvent", "checkEmail"]),
  },
};
</script>