<template>
  <v-flex>
    <!-- Middle area between the navbar and the calendar -->
    <v-layout align-center justify-center>
      <v-btn fab text color="grey darken-2" @click="prev">
        <v-icon x-large>{{arrowLeft}}</v-icon>
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
      <div id="divCenter">
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
    <!-- Calling the changeEvent component -->
    <changeEvent :edEvent="selectedEvent" ref="childComponent" />
    <v-sheet height="890">
      <!-- Calendar component -->
      <v-calendar
        ref="calendar"
        v-model="focus"
        type="category"
        first-interval="6"
        category-show-all
        :categories="category"
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
        <!-- Menu when pressing an event -->
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
                @click="erase"
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
      </div>
    </v-sheet>
  </v-flex>
</template>
<script>
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
// Import Create event component
import changeEvent from "./ChangeEvent";
// Statement of Store methods
import { mapMutations } from "vuex";
// Import icons to move between days
import { mdiChevronRight, mdiDogSide } from "@mdi/js";
import { mdiChevronLeft } from "@mdi/js";

export default {
  components: {
    // ChangeEvent component
    changeEvent,
  },
  data: () => ({
    // Pointer variable of the day of the calendar component
    focus: "",
    // Variable that stores the pointer returned by the click:event event
    selectedEvent: {},
    // Variable that stores the pointer that the event returns click:event
    selectedElement: null,
    // Variable that handles the events menu
    selectedOpen: null,
    // Arrows icons
    arrowRight: mdiChevronRight,
    arrowLeft: mdiChevronLeft,
    // Variable to validate what type of user accesses the calendar
    isClient: false,
    // Variable that stores the pointer returned by the event mouseenter:time-category
    targetCategory: null,
    // Variable that validates if the mouse is inside an event
    enter: null,
    // Variable that validates if the mouse is outside an event
    close: null,
    // variable that stores the last time clicked
    startTime: null,
    // variable that stores the last clicked date
    lastDate: null,
    // Variable that stores the last event created
    lastEvent: null,
  }),
  mounted() {
    // Method that creates the categories from the users
    this.mountCategory();
    // Method that validates what type of user accesses the calendar ( TEMPORARY )
    this.valideTypeUser();
  },
  computed: {
    ...mapState(["events", "activeEvent", "category", "activeUser"]),
  },
  methods: {
    ...mapMutations([
      "setActiveEvent",
      "mountCategory",
      "addEvent",
      "setEvent",
      "eraseEvent",
    ]),
    // Function that returns the color of the selected event
    getEventColor(event) {
      return event.color;
    },
    // Function that shows the ChangeEvent component
    editEvent() {
      this.$refs.childComponent.show();
      this.setActiveEvent(true);
    },
    // Function that changes the calendar day
    setToday() {
      this.focus = "";
    },
    // Function that saves the category that the mouseenter event returns: time-category
    intervalCategory(nativeEvent, event) {
      this.targetCategory = nativeEvent.category;
    },
    // Function to create event
    createEvent(nativeEvent, event) {
      if (!this.enter) {
        // ( TEMPORARY )
        this.lastDate = nativeEvent.date;
        this.startTime = nativeEvent.time;
        // ----------
        var end = this.calculateHour(nativeEvent.time);
        var mayor = 0;
        // ( TEMPORARY )
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
      }
    },
    // Function to calculate 1 hour after the entered time
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
    // Function that changes the enter bool if the mouse exits an event
    leaveEvent() {
      this.enter = false;
    },
    // Function that changes the bool of enter if the mouse enters an event
    EnterEvent() {
      this.enter = true;
    },
    // Function that validates what type of user accesses the calendar ( TEMPORARY )
    valideTypeUser() {
      if (this.activeUser.user_type == 2) {
        this.isClient = true;
      } else {
        this.isCliente = false;
      }
    },
    // Function that moves the calendar to the left
    prev() {
      this.$refs.calendar.prev();
    },
    // Function that moves the calendar to the right
    next() {
      this.$refs.calendar.next();
    },
    // Function that saves the pointers returned by the showEvent event in variables
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
    showEvente(nativeEvent, event) {},
    // Function to delete the event
    erase() {
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
#divCenter {
  margin-right: -37px;
}
</style>
        