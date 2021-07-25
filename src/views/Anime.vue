<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="anime container-xl">
    <Navbar />

    <div class="d-flex justify-content-center px-3">
      <div class="fondo col-12 rounded">
        <div
          class="rounded text-white opacity2 row d-flex justify-content-center"
        >
          <nav
            class="mt-3 col-12"
            style="--bs-breadcrumb-divider: '>'"
            aria-label="breadcrumb"
          >
            <ol class="breadcrumb bg-dark">
              <li class="breadcrumb-item">
                <router-link replace :to="'/'">Home</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ anime.attributes.canonicalTitle }}
              </li>
            </ol>
          </nav>

          <div class="col-12 col-sm-8 col-md-6 rounded-0 mt-0 rounded-start">
            <div class="d-flex justify-content-center mx-5 mt-3 mb-4 px-lg-4">
              <img
                v-if="anime.attributes.posterImage"
                class="w-100 shadow-lg rounded border border-secondary"
                :src="anime.attributes.posterImage.original"
              />
            </div>
          </div>
          <div class="col-12 col-lg-6 rounded pt-3 pb-5 px-3">
            <div class="d-flex p-0 justify-content-between align-items-center">
              <h4 class="font-weight-bold p-0 col-10">
                {{ anime.attributes.canonicalTitle }}
              </h4>
              <button
                class="btn btn-outline-danger"
                :class="isFavorite ? 'active' : 'unactive'"
                @click="Favorite"
              >
                <i class="fas fa-heart p-2"></i>
              </button>
            </div>

            <p class="m-0">
              Type:
              <span class="font-weight-bold">{{
                anime.attributes.subtype
              }}</span>
            </p>

            <p class="m-0">
              Date:
              <span class="font-weight-bold">{{
                anime.attributes.startDate
              }}</span>
            </p>

            <p class="m-0">
              Status:
              <span v-if="anime.attributes.status == 'finished'">
                <span class="rounded-pill bg-danger px-2 font-weight-bold">{{
                  anime.attributes.status
                }}</span></span
              >
              <span v-else-if="anime.attributes.status == 'current'"
                ><span class="rounded-pill bg-success px-2 font-weight-bold">{{
                  anime.attributes.status
                }}</span></span
              ><span v-else
                ><span class="rounded-pill bg-secondary px-2 font-weight-bold">
                  unreleased</span
                ></span
              >
            </p>

            <div class="mb-3">
              Rating:
              <span
                v-if="anime.attributes.averageRating"
                class="font-weight-bold"
              >
                {{ anime.attributes.averageRating }}</span
              >
              <span v-else class="font-weight-bold"> Unrated </span>

              <i class="fas fa-star text-warning"></i>
            </div>
            <p>
              {{ anime.attributes.synopsis }}
            </p>
            <div class="mb-3">
              <div class="mb-3">
                <span
                  v-for="elem in listGenres"
                  :key="elem"
                  class="badge rounded-pill bg-primary m-1 py-1 px-2"
                  >{{ elem }}</span
                >
              </div>
            </div>

            <div class="d-flex justify-content-center">
              <button
                v-if="link != null"
                type="button"
                @click="link = anime.attributes.youtubeVideoId"
                class="btn btn-danger font-weight-bold"
                data-toggle="modal"
                data-target="#staticBackdrop"
              >
                View Trailer
              </button>
              <div
                class="modal fade"
                id="staticBackdrop"
                data-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content bg-secondary rounded">
                    <div class="d-flex justify-content-end mx-3 my-2">
                      <a
                        type="button"
                        @click="link = ''"
                        class="close text-light"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </a>
                    </div>
                    <div class="d-flex justify-content-center">
                      <div
                        v-if="link == null"
                        class="
                          text-light
                          m-3
                          d-flex
                          flex-column
                          align-items-center
                          pb-5
                        "
                      >
                        <h4>Sorry, we don't have the trailer available</h4>
                        <img
                          src="@/assets/images/sorry.gif"
                          class="w-100 rounded"
                        />
                      </div>
                      <iframe
                        v-else
                        class="ratio ratio-16x9 shadow-lg rounded w-100"
                        width="727"
                        height="409"
                        :src="'https://www.youtube.com/embed/' + link"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="anime.attributes.episodeCount">
      <h3 class="p-4"><i class="fas fa-play mr-2"></i>Chapters</h3>
      <div class="px-3 list-group">
        <div
          v-for="(cap, index) in anime.attributes.episodeCount"
          :key="index + 1"
          class="list-group-item list-group-item-action d-flex"
        >
          <a
            :href="'/anime/' + anime.id + '/play/' + (index + 1)"
            class="d-flex align-items-center text-decoration-none col-12"
          >
            <i class="fas fa-play-circle"></i>
            <div class="col-4 col-md-2 d-flex justify-content-center">
              <img
                class="w-75 rounded"
                :src="anime.attributes.posterImage.original"
                alt=""
              />
            </div>
            <div class="d-flex align-items-center text-dark">
              <p class="m-0">
                <span class="font-weight-bold">{{
                  anime.attributes.canonicalTitle
                }}</span>
                <br />
                Chapter {{ index + 1 }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import Footer from "../components/Footer.vue";
import firebase from "firebase";
import Navbar from "@/components/Navbar.vue";
import Load from "@/components/Load.vue";

export default {
  components: { Load, Footer, Navbar },
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
    const listGenres = [];
    const anime = ref([]);
    const isFavorite = ref(false);
    var link = ref({});
    var date = "";
    const route = useRoute();

    const user = firebase.auth().currentUser;
    const Favorite = () => {
      if (isFavorite.value == true) {
        const animeID = {
          id: anime.value.id,
          fav: false,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("animes")
          .doc(anime.value.id)
          .update(animeID)
          .then(() => {
            isFavorite.value = false;
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      } else {
        const animeID = {
          id: anime.value.id,
          fav: true,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("animes")
          .doc(anime.value.id)
          .set(animeID)
          .then(() => {
            isFavorite.value = true;
          })
          .catch(() => {});
      }
    };

    onBeforeMount(() => {
      function primerFetch(anime) {
        fetch(anime.value.relationships.categories.links.related)
          .then((response) => response.json())
          .then((data) => {
            var i = 0;

            data.data.forEach((elemento) => {
              listGenres.push(elemento.attributes.title);
              i = i + 1;
            });
          })
          .catch();
      }

      function segundoFetch(callback) {
        setTimeout(function () {
          fetch(`https://kitsu.io/api/edge/anime/${route.params.id}`)
            .then((response) => response.json())
            .then((data) => {
              anime.value = data.data;
              callback(anime);
              link.value = anime.value.attributes.youtubeVideoId;
            })
            .catch();
        }, 500);
      }
      function tercerFetch() {
        setTimeout(function () {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("animes")
            .doc(anime.value.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                if (doc.data().fav == true) {
                  isFavorite.value = true;
                } else {
                  isFavorite.value = false;
                }
              } else {
                isFavorite.value = false;
              }
            })
            .catch();
        }, 2000);
      }
      tercerFetch();
      segundoFetch(primerFetch);
    });

    return {
      anime,
      link,
      date,
      Favorite,
      listGenres,
      isFavorite,
    };
  },
};
</script>
<style scoped>
.fondo {
  background-image: url("../assets/images/background.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.opacity2 {
  background-color: rgba(33, 37, 41, 0.7);
}
</style>