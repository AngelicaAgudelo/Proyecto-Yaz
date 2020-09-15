<template>
  <v-row>
    <v-col>
      <v-sheet height="800">
        <v-toolbar flat color="white">
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-calendar
          ref="calendar"
          v-model="focus"
          :categories="category"
          category-show-all
          :events="events"
          :event-color="getEventColor"
          type="category"
          first-interval="6"
          @click:event="showEvent"
        ></v-calendar>
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
              <v-btn @click="erase">
                <v-icon dark left>mdi-minus_circle</v-icon>Erase
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
// Import del objeto que me permite traer variables del Store
import { mapState } from "vuex";
// Import del objeto que me permite manipular funciones del Store
import { mapMutations } from "vuex";
export default {
  components: {},
  data: () => ({
    events: [
      {
        id: 0,
        name: "carlos",
        start: "2020-09-08 09:00",
        end: "2020-09-08 10:00",
        category:"alejandro",
        color: "blue"
      },
      {
        id: 1,
        name: "Thomas' Birthday",
        start: "2020-09-10 3:00",
        end: "2020-09-10 12:00",
        category:"duque",
        color: "blue"
      },
      {
        id: 1,
        name: "Thomas' Birthday",
        start: "2020-09-10 3:00",
        end: "2020-09-10 12:00",
        category: "angelica",
        color: "blue"
      },
      {
        id: 2,
        name: "Mash Potatoes",
        start: "2020-09-09 12:30",
        end: "2020-09-09 15:30",
        category: "sebastian",
        color: "blue"
      },
      {
        id: 3,
        name: "carlos cor",
        start: "2020-09-09 8:30",
        end: "2020-09-09 10:30",
        category: "alejandro",
        color: "blue"
      },
      {
        id: 4,
        name: "linas",
        start: "2020-09-07 11:30",
        end: "2020-09-07 15:30",
        category: "duque",
        color: "blue"
      },
    ],
    diag: false,
    name: null,
    details: null,
    start: null,
    end: null,
    focus: "",
    color: "#1976D2", // default event color
    timeStart: null,
    timeEnd: null,
    idCount: 4,
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

  }),
  mounted() {
    this.mountCategory();
  },
  computed: {
    // Declaracion de las variables de la Store
    ...mapState(["category"]),
  },
  methods: {
    // Declaracion de los metodos de la Store
    ...mapMutations(["mountCategory"]),
    async getSelect() {
      this.vari = "fdsfsfsfsfdfs";

      console.log(this.hola);
    },
    getEventColor(event) {
      return event.color;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    addEvent() {
      var star = this.start.concat(" ", this.timeStart);
      var en = this.end.concat(" ", this.timeEnd);
      this.idCount++;
      var ad = {
        id: this.idCount,
        name: this.name,
        start: star,
        end: en,
      };
      console.log(ad);
      this.even.push(ad);
    },
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
    erase() {
      console.log(this.selectedEvent.id);
      let busqueda = this.selectedEvent.id;
      let indice = this.events.findIndex((indic) => indic.id === busqueda);
      this.events.splice(indice, 1);
      this.selectedOpen = false;
    },
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>