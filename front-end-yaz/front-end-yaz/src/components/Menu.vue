  <template>
  <div>
    <v-footer color="gray" app padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" color="black" text rounded class="my-2">{{ link }}</v-btn>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    };
  },
};
</script>

<style scopet>
</style>