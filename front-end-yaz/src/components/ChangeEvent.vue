<template>
  <div>
    <v-dialog v-model="activeEvent" persistent max-width="500">
      <!-------- V-card ----------->
      <v-card>
        <!-------- Error card ----------->
        <v-dialog v-model="bolError" max-width="500px">
          <v-card>
            <v-card-title>
              <span>
                <v-icon>{{ warningIcon }}</v-icon>
                {{ error }}
                <v-icon>{{ warningIcon }}</v-icon>
              </span>
              <v-spacer></v-spacer>
              <v-menu bottom left></v-menu>
            </v-card-title>
            <v-card-actions>
              <v-btn
                class="ma-2"
                outlined
                :elevation="3"
                color="black"
                @click="bolError = false"
                >cerrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-overlay :value="overlayError">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
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
                @click="verifyNameClient"
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
import EventsService from "../services/EventsService";
import UsersService from "../services/UsersService";
import serviceRequests from "../services/serviceRequestsService";
// Import of the login warning icon
import { mdiAlert } from "@mdi/js";

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
      status: "Start",
      phoneRules: [(v) => !isNaN(parseFloat(v)) || "Solo se permite números"],
      id: 0,
      bolError: false,
      overlayError: false,
      error: "",
      warningIcon: mdiAlert,
    };
  },
  // Connection with parent component
  created() {},
  methods: {
    ...mapMutations(["setActiveEvent", "setEvent", "verifyEmail"]),
    // Function to edit the event
    async verifyNameClient() {
      this.overlayError = true;
      const response = await UsersService.getClients()
        .then((response) => {
          var verify = false;
          for (var i = 0; i < response.data.data.length; i++) {
            if (this.name_user == response.data.data[i].user_name) {
              verify = true;
              i = response.data.data.lenght;
            }
          }
          if (verify) {
            this.addEventComponent();
          } else {
            this.overlayError = false;
            this.error = "El cliente no ha sido encontrado";
            this.bolError = true;
          }
        })
        .catch((e) => {});
    },
    async addEventComponent() {
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
        service_status: this.status,
      };
      if (this.editEvent) {
        this.updateEvent(service);
        this.overlayError = false;
        this.setActiveEvent(false);
      } else {
        this.addEvent(service);
        this.overlayError = false;
        this.setActiveEvent(false);
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
      this.id = this.selectEvent.id_event;
      this.name = this.selectEvent.name;
      this.name_user = this.selectEvent.client_name;
      this.color = this.selectEvent.color;
      this.details = this.selectEvent.description;
      this.price = this.selectEvent.price;
      this.timeStart = this.selectEvent.start.split(" ")[1];
      this.timeEnd = this.selectEvent.end.split(" ")[1];
      this.date = this.selectEvent.end.split(" ")[0];
    },
    async addEvent(event) {
      const user = await UsersService.getUserByName(event.worker_name)
        .then((user) => {
          const response = serviceRequests
            .addEvent(user.data.data.id_user, event)
            .then((response) => {
              console.log(response);
              this.$emit("getService");
            })
            .catch((e) => {
              console.log(e.response);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async updateEvent(event) {
      var id = this.id;
      const response = await EventsService.updateEvent(id, event);
      this.$emit("getService");
    },
  },
  computed: {
    ...mapState(["activeEvent", "selectEvent", "editEvent", "checkEmail"]),
  },
};
</script>