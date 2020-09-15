<template>
  <v-flex>
    <!-- Zona intermedia entre el navbar y el calendario -->
    <v-layout align-center justify-center>
      <v-btn fab text color="grey darken-2" @click="prev">
        <v-icon x-large>{{arrowLeft}}</v-icon>
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
      <div id="cent">
        <v-btn fab text color="grey darken-2" @click="next">
          <v-icon x-large>{{arrowRight}}</v-icon>
        </v-btn>
      </div>
    </v-layout>
    <v-btn
      class="ma-2"
      v-show="isClient"
      tile
      outlined
      color="black"
      @click="setActiveEvent(true)"
    >Solicitar evento</v-btn>
    <!-- Llamando al componente Event -->
    <changeEvent :edEvent="selectedEvent" ref="childComponent" />
    <v-sheet height="890">
      <!-- Componente del calendario -->
      <v-calendar
        ref="calendar"
        v-model="focus"
        type="category"
        first-interval="6"
        category-show-all
        :categories="categori"
        :events="events"
        category-hide-dynamic
        :event-color="getEventColor"
        event-text-color="white"
        @click:event="showEvent"
        @mouseenter:time-category="intervalCategory"
        @click:time="createEvent"
        @mouseleave:event="leaveEvent"
        @mouseenter:event="EnterEvent"
      ></v-calendar>
      <div data-app>
        <!-- Menu al presionar un evento -->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                @click="borrar"
                tile
                outlined
                small
                min-height="38px"
                :elevation="7"
              >Finalizar evento</v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-layout>
              <v-card-actions>
                <v-btn
                  text
                  color="black"
                  tile
                  outlined
                  :elevation="5"
                  @click="selectedOpen = false"
                >Cancelar</v-btn>
              </v-card-actions>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn text color="black" tile outlined :elevation="5" @click="editEvent">Editar</v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
        </v-menu>
        <v-dialog v-model="open" width="300px">
          <v-time-picker v-model="picker" ampm-in-title :min="startTime" max="20:00"></v-time-picker>
          <v-btn elevation="15" color="#008cff" @click="setEvnt">Poner Hora</v-btn>
        </v-dialog>
      </div>
    </v-sheet>
  </v-flex>
</template>
<script>
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";
// Import del componente de crear evento
import changeEvent from "./ChangeEvent";
// Import del objeto que me permite manipular funciones del Store
import { mapMutations } from "vuex";
// Import de iconos de moverse entre los dias
import { mdiChevronRight, mdiDogSide } from "@mdi/js";
import { mdiChevronLeft } from "@mdi/js";

export default {
  components: {
    // Componente para cambiar el evento
    changeEvent,
  },
  data: () => ({
    // Variable puntero del componente calendario
    focus: "",
    // Variable que almacena cada categoria (Trabajador) de la pagina
    copyCategories: [],
    // Variable que almacena el puntero que retorna el evento click:event
    selectedEvent: {},
    // Variable que almacena el puntero que retorna el evento click:event
    selectedElement: null,
    // Variable que maneja el menu de los eventos
    selectedOpen: null,
    // iconos de las flechas
    arrowRight: mdiChevronRight,
    arrowLeft: mdiChevronLeft,
    // Variable para validar que tipo de usuario accede al calendario
    isClient: false,
    // Variable que almacena el puntero que retorna el event mouseenter:time-category
    targetCategory: null,
    // Variable que valida si el mouse esta adentro de un evento
    enter: null,
    // Variable que valida si el mouse esta fuera de un evento
    close: null,
    // Variable que maneja el menu de tiempo
    open: null,
    // Variable que almacena el tiempo que retorna el componente picker
    picker: null,
    // variable que almacena la ultima hora clickeada
    startTime: null,
    // variable que almacena la ultima fecha clickeada
    lastDate: null,
    // Variable que almacena el ultimo evento creado
    lastEvent: null,
    newEvent: null,
  }),
  mounted() {
    // Metodo que crea las categorias a partir de los usuario
    this.mountCategory();
    // Metodo que valida que tipo de usuario accede al calendario
    this.valideTypeUser();
  },
  computed: {
    // Objeto que trate los datos del store
    ...mapState(["events", "activeEvent", "categori", "activeUser"]),
  },
  methods: {
    // Objeto que trae los metodos del store
    ...mapMutations([
      "setActiveEvent",
      "mountCategory",
      "addEvent",
      "setEvent",
      "eraseEvent",
    ]),
    // Metodo que retorna el color del evento seleccionado
    getEventColor(event) {
      return event.color;
    },
    editEvent() {
      this.$refs.childComponent.mostrar();
      this.setActiveEvent(true);
    },
    // Metodo que cambia el dia del calendario
    setToday() {
      this.focus = "";
    },
    // Metodo que guarda la categoria que retorna el evento mouseenter:time-category
    intervalCategory(nativeEvent, event) {
      this.targetCategory = nativeEvent.category;
    },
    // Metodo que llama el setEvent del store para cambiar un metodo
    setEvnt() {
      try {
        this.lastEvent.end = this.lastDate + " " + this.picker;
        this.setEvent(this.lastEvent);
        this.startTime = null;
        this.lastEvent = null;
        this.open = false;
      } catch (error) {
        console.log(error);
      }
    },
    // Metodo pra crear evento
    createEvent(nativeEvent, event) {
      if (!this.enter) {
        // Temporal
        this.lastDate = nativeEvent.date;
        this.startTime = nativeEvent.time;
        // ----------
        var end = this.calculateHour(nativeEvent.time);
        var mayor = 0;
        // Temporal
        for (var i = 0; i < this.events.length; i++) {
          if (this.events[i].id >= mayor) {
            mayor = this.events[i].id;
          }
        }
        var evntId = mayor + 1;
        //  -------
        var evntEvent = {
          id: evntId,
          name: "(Sin nombrar)",
          details: "(Sin informacion)",
          start: nativeEvent.date + " " + nativeEvent.time,
          end: nativeEvent.date + " " + end,
          color: "#1F32BB",
          category: this.targetCategory,
        };
        this.lastEvent = evntEvent;
        this.addEvent(evntEvent);
        //this.open = true;
        //this.setActiveEvent(true);
      }
    },
    // Metodo para calcular 1 hora despues de la hora ingresada
    calculateHour(hour) {
      var result = "";
      var val = 0;
      if (hour.substring(0, 1) == "0") {
        if (hour.substring(1, 2) == "9") {
          result = "10:" + hour.substring(3, 5);
        } else {
          val = 1 + parseInt(hour.substring(1, 2));
          result = "0" + val + ":" + hour.substring(3, 5);
        }
      } else if (hour.substring(0, 1) == "1") {
        if (hour.substring(1, 2) == "9") {
          result = "20:" + hour.substring(3, 5);
        } else {
          val = 1 + parseInt(hour.substring(1, 2));
          result = hour.substring(0, 1) + val + ":" + hour.substring(3, 5);
        }
      } else if (hour.substring(0, 1) == "2") {
        val = 1 + parseInt(hour.substring(1, 2));
        result = hour.substring(0, 1) + val + ":" + hour.substring(3, 5);
      }
      return result;
    },
    // Metodo que cambia el bool de enter si el mouse sale de un evento
    leaveEvent() {
      this.enter = false;
    },
    // Metodo que cambia el bool de enter si el mouse entra a un evento
    EnterEvent() {
      this.enter = true;
    },
    // Metodo que valida que tipo de usuario accede al calendario
    valideTypeUser() {
      if (this.activeUser.user_type == 2) {
        this.isClient = true;
      } else {
        this.isCliente = false;
      }
    },
    // Metodo que se mueve para la izquierda en el calendario
    prev() {
      this.$refs.calendar.prev();
    },
    // Metodo que se mueve para la izquierda en el calendario
    next() {
      this.$refs.calendar.next();
    },
    // Metodo que guarda en variables los punteros que retorna el evento showEvent
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    showEvente(nativeEvent, event){
      console.log(nativeEvent)
    },
    // Metodo para borrar el evento
    borrar() {
      var busqueda = this.selectedEvent.id;
      var num = 0;
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].id == busqueda) {
          num = i;
          this.eraseEvent(num);
        }
      }
      if (num == 0) {

      }
      this.selectedOpen = false;
    },

  },
};
</script>
<style scoped>
#cent {
  margin-right: -37px;
}
</style>
        