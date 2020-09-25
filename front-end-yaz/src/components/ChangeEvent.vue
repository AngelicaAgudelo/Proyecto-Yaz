<template>
  <div>
    <v-dialog v-model="activeEvent" persistent max-width="500">
      <!-------- V-card ----------->
      <v-card>
        <v-container>
          <v-form @submit.prevent="addEvent">
            <h2>Editor de videos</h2>
            <!-------- Name input ----------->
            <v-text-field
              v-model="name"
              type="text"
              label="Nombre evento (required)"
            ></v-text-field>
            <!-------- details input ----------->
            <v-text-field
              v-model="details"
              type="text"
              label="Detalles"
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
                >Editar Evento</v-btn
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
      // Time
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
    };
  },
  // Connection with parent component
  props: ["edEvent"],
  created() {},
  methods: {
    ...mapMutations(["setActiveEvent", "setEvent"]),
    // Function to edit the event
    addEventComponent() {
      var event = {
        category: this.edEvent.category,
        color: this.color,
        details: this.details,
        end: this.date + " " + this.timeEnd,
        id: this.edEvent.id,
        name: this.name,
        start: this.edEvent.start,
      };
      this.setEvent(event);
      this.setActiveEvent(false);
    },
    // Function to show component
    setVariables() {
      this.name = this.edEvent.name;
      this.color = this.edEvent.color;
      this.details = this.edEvent.details;
      this.timeEnd = this.edEvent.end.split(" ")[1];
      this.date = this.edEvent.end.split(" ")[0];
    },
  },
  computed: {
    ...mapState(["activeEvent"]),
  },
};
</script>