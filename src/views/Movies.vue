<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="movies container-xl">
    <Navbar />
    <section class="container-xl bg-light col-12 rounded">
      <h3 class="p-3"><i class="fas fa-film mr-1"></i>Movie catalog</h3>
      <div class="row px-3">
        <div class="row d-flex px-3">
          <article
            class="col-6 col-md-3 col-lg-2 text-center mb-3"
            v-for="anime in movies"
            :key="anime"
          >
            <router-link
              replace
              :to="'/anime/' + anime.id"
              class="text-decoration-none text-dark hoverTitle"
            >
              <div class="bg-secondary rounded">
                <img
                  class="w-100 opacity rounded border border-secondary"
                  :src="anime.attributes.posterImage.original"
                  :alt="anime.attributes.canonicalTitle + ' Poster '"
                />
              </div>
              <span class="font-weight-bold">{{
                anime.attributes.canonicalTitle
              }}</span>
            </router-link>
          </article>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";

import Footer from "@/components/Footer.vue";
import Load from "@/components/Load.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Footer, Navbar, Load },
  mounted() {
    setTimeout(() => {
      this.load = true;
    }, 2000);
  },
  data() {
    return {
      load: false,
    };
  },
  setup() {
    const name = ref("");
    const movies = ref([]);
    const movies2 = ref([]);

    onBeforeMount(() => {
      function cuartoFetch(anime) {
        fetch(anime)
          .then((response) => response.json())
          .then((data) => {
            var animelist = [];
            for (let index = 0; index < 16; index++) {
              animelist[index] = data.data[index];
            }
            animelist.forEach((element) => {
              movies.value.push(element);
            });
          })
          .catch();
      }

      function tercerFetch(callback) {
        setTimeout(function () {
          fetch(
            `https://kitsu.io/api/edge/anime?filter[subtype]=movie&sort=-averageRating&page[limit]=20`
          )
            .then((response) => response.json())
            .then((data) => {
              movies.value = data.data;
              movies2.value = data.links;

              if (movies2.value.next) callback(movies2.value.next);
            })
            .catch();
        }, 500);
      }
      tercerFetch(cuartoFetch);
    });

    return {
      name,
      movies,
    };
  },
};
</script>

<style lang="scss" scoped>
.hoverTitle {
  &:hover {
    span,
    h5 {
      transition: 0.4s;
      color: rgb(255, 68, 0);
    }
  }
}
</style>