<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="advanced-search container-xl">
    <Navbar />
    <div class="bg-light col-12 rounded">
      <h3 class="p-3 d-flex align-items-center">
        <i class="fas fa-search mr-1"></i>
        Advanced Search
      </h3>
      <div class="column">
        <div class="d-flex justify-content-around">
          <form class="search-box col-12" @submit.prevent="HandleSearch">
            <div class="input-group">
              <input
                type="search"
                class="shadow form-control rounded"
                placeholder="Search one anime..."
                v-model="search_query"
              />
              <button
                type="submit"
                class="btn btn-primary rounded"
                value="HandleSearch"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>

            <div class="d-flex flex-column">
              <div>
                <h6 class="mt-4">Type</h6>
                <div class="col-12 d-flex flex-wrap align-items-center">
                  <input
                    type="radio"
                    id="type"
                    name="type"
                    class="custom-control-input"
                    @click="type('')"
                  />
                  <label class="custom-control-label mx-4" for="type">
                    Clean
                  </label>
                  <div
                    v-for="(item, index) in typeList"
                    :key="index"
                    class="
                      custom-control custom-radio custom-control-inline
                      d-flex
                      flex-row
                      my-2
                    "
                  >
                    <input
                      type="radio"
                      :id="'type' + index"
                      name="type"
                      class="custom-control-input"
                      @click="type('&filter[subtype]=' + item)"
                    />
                    <label class="custom-control-label" :for="'type' + index">
                      {{ item }}
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h6 class="mt-2">Genre</h6>
                <div class="col-12 d-flex flex-wrap align-items-center">
                  <input
                    type="radio"
                    id="genre"
                    name="genre"
                    class="custom-control-input"
                    @click="genre('')"
                  />
                  <label class="custom-control-label mx-4" for="genre">
                    Clean
                  </label>
                  <div
                    v-for="(item, index) in genresList"
                    :key="index"
                    class="
                      custom-control custom-radio custom-control-inline
                      d-flex
                      flex-row
                      my-2
                    "
                  >
                    <input
                      type="radio"
                      :id="'genre' + index"
                      name="genre"
                      class="custom-control-input"
                      @click="genre('&filter[categories]=' + item)"
                    />
                    <label class="custom-control-label" :for="'genre' + index">
                      {{ item }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div v-if="animelist.length > 0">
          <div class="row p-3">
            <router-link
              replace
              :to="'/anime/' + anime.id"
              v-for="anime in animelist"
              :key="anime"
              class="
                card
                col-4 col-md-3 col-lg-2
                text-center
                mb-3
                bg-light
                border-0
                text-decoration-none text-secondary
              "
              style="height: 72%"
            >
              <img
                :src="anime.attributes.posterImage.original"
                :alt="anime.attributes.canonicalTitle + ' Poster '"
                class="w-100 rounded mb-2"
              />
              <span class="font-weight-bold">{{
                anime.attributes.canonicalTitle
              }}</span>
            </router-link>
          </div>
        </div>
        <div class="no_results p-3 text-center" v-else>
          <h3>Sorry, we don't have results...</h3>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from "firebase";

import { ref } from "vue";

import Load from "@/components/Load.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Footer,
    Load,
    Navbar,
  },
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
    const typeList = ["TV serie", "Movie", "OVA", "OVA"];
    const genresList = [
      "Comedy",
      "Fantasy",
      "Maid",
      "Magic",
      "Supernatural",
      "Thriller",
      "Violence",
      "Psychological",
      "Horror",
      "Sports",
      "Romance",
      "Shounen",
      "Demon",
      "Angst",
      "Swordplay",
      "School Life",
      "Violence",
      "Japan",
      "Historical",
      "Drama",
      "Alternative Present",
      "Plot Continuity",
      "Super Power",
      "Superhero",
    ];
    var filter = ref("");
    var filter2 = ref("");
    const search_query = ref("");
    const search_query2 = ref("");
    const animelist = ref([]);
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then()
        .catch((err) => alert(err.message));
    };
    function type(value) {
      filter.value = value;
    }
    function genre(value) {
      filter2.value = value;
    }
    const HandleSearch = async () => {
      if (search_query.value) {
        search_query2.value = "filter[text]=" + search_query.value;
      }
      animelist.value = [];
      if (search_query.value || filter2.value != "" || filter.value != "") {
        await fetch(
          `https://kitsu.io/api/edge//anime?${search_query2.value}${filter.value}${filter2.value}&page[limit]=20`
        )
          .then((res) => res.json())
          .then((data) => {
            animelist.value = data.data;
            if (data.links.next) {
              fetch(data.links.next)
                .then((res) => res.json())
                .then((data) => {
                  var list = [];
                  for (let index = 0; index < 16; index++) {
                    list[index] = data.data[index];
                  }
                  list.forEach((element) => {
                    animelist.value.push(element);
                  });
                });
            }
          });
        animelist.value.sort(compare);
      }
      function compare(a, b) {
        const titleA = a.attributes.canonicalTitle.toUpperCase();
        const titleB = b.attributes.canonicalTitle.toUpperCase();
        let comparison = 0;
        if (titleA > titleB) {
          comparison = 1;
        } else if (titleA < titleB) {
          comparison = -1;
        }
        return comparison;
      }
    };

    return {
      filter,
      search_query,
      animelist,
      HandleSearch,
      Logout,
      type,
      genre,
      genresList,
      typeList,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0 8px;
  margin-bottom: 16px;

  img {
    box-shadow: 0px 4px 8px rgb(211, 156, 127);
    transition: 0.4s;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
    span {
      transition: 0.4s;
      color: rgb(255, 68, 0);
    }
  }
}
</style>