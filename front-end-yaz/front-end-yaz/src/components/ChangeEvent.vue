<template>
  <div>
    <v-dialog v-model="activeEvent" persistent max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent="addEvent">
            <v-text-field v-model="name" type="text" label="Nombre evento (required)"></v-text-field>
            <v-text-field v-model="details" type="text" label="Detalles"></v-text-field>
            <v-text-field
              v-model="timeEnd"
              type="time"
              label="Hora fin"
              value="12:30:00"
              suffix="PST"
            ></v-text-field>
            <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
            <v-row>
              <v-btn
                class="ma-2"
                tile
                outlined
                color="black"
                :elevation="3"
                @click="addEventComponent"
              >Editar Evento</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="ma-2"
                tile
                outlined
                :elevation="3"
                color="black"
                @click="setActiveEvent(false)"
              >Cancelar</v-btn>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
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
      timeEnd: "13:00",
      name: "",
      details: "",
      start: "",
      color: "#2ed33c",
      date:""
    };
  },
  props: ["edEvent"],
  created() {
  },
  methods: {
    ...mapMutations(["setActiveEvent", "setEvent"]),
    addEventComponent() {
    
      var event={
          category: this.edEvent.category,
          color: this.color,
          details: this.details,
          end: this.date+" "+this.timeEnd,
          id: this.edEvent.id,
          name: this.name,
          start: this.edEvent.start
        }
        this.setEvent(event)
        this.setActiveEvent(false)
    },
    mostrar() {
        this.name = this.edEvent.name;
        this.details = this.edEvent.details;
        this.timeEnd = this.edEvent.end.split(" ")[1]
        console.log(this.timeEnd)
        this.date = this.edEvent.end.split(" ")[0]
        
    },
  },
  computed: {
    ...mapState(["activeEvent"]),
  },
};
</script>