  <template>
  <div>
    <v-dialog v-model="alert" transition="fade-transition">
      <!-- Alerta cuando se completo una compra -->
      <v-alert type="success">La compra se ha realizado con exito</v-alert>
    </v-dialog>
    <v-footer color="gray" app padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" color="black" text rounded class="my-2">{{ link }}</v-btn>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
export default {
  data() {
    return {
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    };
  },
  computed: {
    // Declaration of Store variables
    ...mapState(["alert"]),
  },
};
</script>

<style scopet>
</style>