  <template>
  <div>
    <v-dialog v-model="alert" transition="fade-transition">
      <!-- Alerta cuando se completo una compra -->
      <v-alert type="success">La compra se ha realizado con exito</v-alert>
    </v-dialog>
    <div>
      <div class="backGroundDiv"></div>
      <div class="carousselDiv">
        <carousel-3d>
          <slide v-for="(slide, i) in images" :index="i" :key="i">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
              <v-img
                contai
                :data-index="index"
                :class="{
                  current: isCurrent,
                  onLeft: leftIndex >= 0,
                  onRight: rightIndex >= 0,
                }"
                :src="slide.slide"
                height="270"
              >
              </v-img>
            </template>
          </slide>
        </carousel-3d>
      </div>
    </div>
    <v-footer color="gray" app padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="black"
          text
          rounded
          class="my-2"
          >{{ link }}</v-btn
        >
      </v-row>
    </v-footer>
  </div>
</template>

<script>
// Import of the object that allows to fetch variables from the Store
import { mapState } from "vuex";
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
      images: [
        { i: 1, slide: require("../assets/imageCarousels/image1.jpg") },
        { i: 2, slide: require("../assets/imageCarousels/image2.jpg") },
        { i: 3, slide: require("../assets/imageCarousels/image3.jpg") },
        { i: 4, slide: require("../assets/imageCarousels/image4.jpg") },
        { i: 5, slide: require("../assets/imageCarousels/image5.jpg") },
        { i: 6, slide: require("../assets/imageCarousels/image6.jpg") },
        { i: 7, slide: require("../assets/imageCarousels/image7.jpg") },
      ],
    };
  },
  computed: {
    // Declaration of Store variables
    ...mapState(["alert"]),
  },
};
</script>
<style scopet>
.backGroundDiv {
  margin-top: 70px;
  background-color: #35618a;
  background-image: url("~@/assets/yazBlanco.png");
  background-position: center center;
  height: 47vh;
  
}
.carousselDiv {
  height: 43%;
}
</style>