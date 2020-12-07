<template>
  <div class="calendarDiv">
    <v-flex>
      <!-- Middle area between the navbar and the calendar -->
      <v-layout align-center justify-center>
        <v-btn fab text color="grey darken-2" @click="prev">
          <v-icon x-large>{{ arrowLeft }}</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">{{
          $refs.calendar.title
        }}</v-toolbar-title>
        <div id="divCenter">
          <v-btn fab text color="grey darken-2" @click="next">
            <v-icon x-large>{{ arrowRight }}</v-icon>
          </v-btn>
        </div>
      </v-layout>
      <!-- Calling the changeEvent component -->
      <changeEvent ref="childComponent" @getService="getEvents" />
      <v-sheet height="100%">
        <!-- Calendar component -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          type="category"
          first-interval="6"
          category-show-all
          :categories="categories"
          :events="listEvents"
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
              <v-toolbar :color="selectedEvent.color" max-height="58px" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  @click="updateEvent"
                  outlined
                  small
                  min-height="32px"
                  :elevation="7"
                  >Finalizar evento</v-btn
                >
              </v-toolbar>
              <v-card-text>
                <h2>
                  {{ selectedEvent.description }}
                </h2>
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
                    >Cancelar</v-btn
                  >
                </v-card-actions>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn
                    text
                    color="black"
                    tile
                    outlined
                    :elevation="5"
                    @click="editEvent"
                    >Editar</v-btn
                  >
                </v-card-actions>
              </v-layout>
            </v-card>
          </v-menu>
        </div>
      </v-sheet>
    </v-flex>
  </div>
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
import EventsService from "../services/EventsService";
import UsersService from "../services/UsersService";

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
    listEvents: [],
    categories: [],
  }),
  mounted() {
    // Method that creates the categories from the users
    this.mountCategory();
  },
  computed: {
    ...mapState(["events", "activeEvent", "category", "activeUser"]),
  },
  created() {
    this.getEvents();
    this.getCategories();
  },
  methods: {
    ...mapMutations([
      "setActiveEvent",
      "mountCategory",
      "setEvent",
      "setSelectedEvent",
      "setEditEvent",
    ]),
    async deleteEvent() {
      const response = await EventsService.deleteEvent(
        this.selectedEvent.id_event
      )
        .then((response) => {
          this.getEvents();
          this.selectedOpen = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async addEvent(data) {
      const response = await EventsService.addEvent(data);
    },
    async getCategories() {
      const response = await UsersService.getWorkers()
        .then((response) => {
          for (var i = 0; i < response.data.data.length; i++) {
            this.categories.push(response.data.data[i].user_name);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async updateEvent(){
      console.log(this.selectedEvent)
      var service = {
        client_name: this.selectedEvent.client_name,
        worker_name: this.selectedEvent.category,
        service_date_start: this.selectedEvent.start,
        service_date_end: this.selectedEvent.end,
        service_color: "#8E8E8E",
        service_name: this.selectedEvent.name,
        service_description: this.selectedEvent.description,
        service_price: parseFloat(this.selectedEvent.price),
        service_status: "Completed",
      }
      console.log(this.serviceUpdate)
      const response = await EventsService.updateEvent(this.selectedEvent.id_event, service).then((response) => {
        console.log(response)
        this.getEvents()
      }).catch((e) => {

      })
    },
    async getEvents() {
      this.listEvents = []
      const response = await EventsService.getEvents()
        .then((response) => {
          if (response.data != "") {
            this.listEvents = response.data.data.map((item) => {
              return {
                id_event: item.id_service,
                client_name: item.client_name,
                category: item.worker_name,
                start: item.service_date_start,
                end: item.service_date_end,
                color: item.service_color,
                name: item.service_name,
                description: item.service_description,
                price: item.service_price,
                status: item.service_status,
              };
            });
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    },
    // Function that returns the color of the selected event
    getEventColor(event) {
      return event.color;
    },
    // Function that shows the ChangeEvent component
    editEvent() {
      this.setEditEvent(true);
      this.$refs.childComponent.setVariables();
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
      if (!this.enter && this.activeUser.user_type != 2) {
        var start = this.calculateMinute(nativeEvent.time);
        if (start.substring(3, 5) == "0") {
          start = start + "0";
        }
        var event = {
          name: "",
          price: 0,
          client_name: "",
          description: "",
          start: nativeEvent.date + " " + start,
          end: nativeEvent.date + " " + this.calculateHour(start),
          color: "#1F32BB",
          category: this.targetCategory,
        };
        this.setEditEvent(false);
        this.setSelectedEvent(event);
        this.$refs.childComponent.setVariables();
        this.setActiveEvent(true);
      }
    },
    calculateMinute(minute) {
      var result = "";
      var val = 0;
      var newMinute = "";
      if (
        minute.substring(3, 5) == "00" ||
        minute.substring(3, 5) == "15" ||
        minute.substring(3, 5) == "30" ||
        minute.substring(3, 5) == "45"
      ) {
        result = minute;
      } else {
        val = parseInt(minute.substring(3, 5));
        if (val > 0 && val < 15) {
          result = minute.substring(0, 3) + this.intervalMinute(val, 0, 15);
        } else if (val > 15 && val < 30) {
          result = minute.substring(0, 3) + this.intervalMinute(val, 15, 30);
        } else if (val > 30 && val < 45) {
          result = minute.substring(0, 3) + this.intervalMinute(val, 30, 45);
        } else if (val > 45 && val < 52) {
          result = minute.substring(0, 3) + this.intervalMinute(val, 45, 0);
        } else {
          var advanceHour = parseInt(minute.substring(1, 2)) + 1;
          if (minute.substring(1, 2) == "9") {
            result =
              advanceHour +
              minute.substring(2, 3) +
              this.intervalMinute(val, 45, 0);
          } else {
            result =
              minute.substring(0, 1) +
              advanceHour +
              minute.substring(2, 3) +
              this.intervalMinute(val, 45, 0);
          }
        }
      }
      return result;
    },
    intervalMinute(value, bottom, top) {
      var result = "";
      if (value < bottom + 7) {
        result = bottom;
      } else {
        result = top;
      }
      return result;
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
      if (this.activeUser.user_type != 2) {
        const open = () => {
          this.selectedEvent = event;
          this.setSelectedEvent(event);
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
      }
    },
  },
};
</script>
<style scoped>
#divCenter {
  margin-right: -37px;
}
.calendarDiv {
  margin-top: 75px;
}
</style>
        