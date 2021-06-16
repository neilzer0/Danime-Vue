<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load && auth" class="home container-xl">
    <Navbar />
    <section class="bg-light col-12 rounded">
      <h3 class="p-3 d-flex align-users-center">
        <i class="fas fa-fire mr-1"></i> Top rated
      </h3>
      <div class="row d-flex px-3">
        <article
          class="col-6 col-md-3 col-lg-2 text-center mb-3"
          v-for="anime in evaluated"
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

      <h3 class="p-3 d-flex align-users-center">
        <i class="fas fa-certificate mr-1"></i>Popular this week
      </h3>

      <div class="row d-flex justify-content-around">
        <article
          class="row col-12 col-md-6 col-lg-4 mb-3 hoverTitle"
          v-for="anime in populars"
          :key="anime"
        >
          <div class="col-6">
            <router-link
              :to="'/anime/' + anime.id"
              class="bg-secondary rounded"
            >
              <img
                class="w-100 rounded border border-secondary"
                :src="anime.attributes.posterImage.original"
                :alt="anime.attributes.canonicalTitle + ' Poster '"
              />
            </router-link>
          </div>
          <div class="col-6 mt-2 mt-md-0 px-3 px-md-0 mb-5">
            <div class="mx-0">
              <router-link
                class="text-decoration-none text-secondary"
                :to="'/anime/' + anime.id"
              >
                <h5 style="font-weight: bolder; cursor: pointer" class="mb-1">
                  {{ anime.attributes.canonicalTitle }}
                </h5></router-link
              >
              <div class="align-users-center d-flex mb-1">
                <p class="p-0 m-0" v-if="anime.attributes.averageRating">
                  {{ anime.attributes.averageRating }}
                </p>
                <p class="p-0 m-0" v-else>Unrated</p>

                <i class="fas fa-star text-warning mb-1"></i>
              </div>
              <p
                style="max-height: 190px; width: 100%; overflow: hidden"
                class="mb-2"
              >
                {{ anime.attributes.synopsis }}
              </p>
            </div>
            <div class="text-center">
              <router-link class="btn btn-primary" :to="'/anime/' + anime.id">
                Show more</router-link
              >
            </div>
          </div>
        </article>
      </div>
      <h3 class="p-3 d-flex align-users-center">
        <i class="fas fa-bell mr-1"></i>Latest releases
      </h3>
      <div class="row d-flex px-3">
        <article
          class="col-6 col-md-3 col-lg-2 text-center mb-3"
          v-for="anime in news"
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
    </section>
    <Footer />
  </div>
  <div v-if="load && !auth" class="home container-xl">
    <NavbarAdmin />
    <section class="bg-light col-12 rounded">
      <h3 class="p-3 d-flex"><i class="fas fa-user mr-1"></i> Admin Panel</h3>
      <div class="row d-flex px-3">
        <div v-if="users.length == 0" class="col-12 text-center mb-3">
          <h2 class="m-3 font-weight-bold">
            Sorry, we have no users available for now
          </h2>
        </div>
        <div
          class="col-12 text-center mb-3"
          v-for="user in users"
          :key="user.id"
        >
          <div class="bg-secondary rounded p-3 d-flex justify-content-around">
            <span class="col-4">{{ user.name }} - {{ user.email }} </span>
            <span class="col-4" v-if="user.state">({{ user.state }})</span>
            <span class="col-4" v-if="!user.state">(active)</span>
            <div class="col-4">
              <i
                style="cursor: pointer"
                class="fas fa-pen btn btn-success mr-4"
                @click="edit(user)"
              ></i
              ><i
                style="cursor: pointer"
                class="fas fa-times-circle btn btn-danger"
                @click="remove(user)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { onBeforeMount, ref } from "vue";
import swal from "sweetalert";
import firebase from "firebase";
import Load from "@/components/Load.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import NavbarAdmin from "@/components/NavbarAdmin.vue";
export default {
  components: { Footer, Navbar, NavbarAdmin, Load },
  mounted() {
    setTimeout(() => {
      this.load = true;
      if (localStorage.uid) this.uid = localStorage.uid;
      this.listUsers();
    }, 2000);
  },
  data() {
    return {
      load: false,
      users: [],
    };
  },
  watch: {
    uid(newUid) {
      localStorage.uid = newUid;
    },
  },
  methods: {
    listUsers() {
      firebase
        .firestore()
        .collection("users")
        .where("role", "==", "user")
        .get()
        .then((doc) => {
          doc.forEach((ele) => this.users.push(ele.data()));
        })
        .catch();
    },
    edit(user) {
      swal({
        text: "Username:",
        content: "input",
      }).then((name) => {
        if (!name) {
          swal(":(", "Username required", "error");
          return false;
        }
        var data = { name: name };
        firebase
          .firestore()
          .collection("users")
          .doc(user.id)
          .update(data)
          .then(() => {
            swal("Nice!", "Edited username", "success");
            this.users = [];
            this.listUsers();
          });
      });
    },
    remove(user) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .collection("chapters")
            .get()
            .then((doc) => {
              doc.forEach((elem) => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(user.id)
                  .collection("chapters")
                  .doc(elem.id)
                  .delete()
                  .then(() => {});
              });
            }).catch;
          firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .collection("animes")
            .get()
            .then((doc) => {
              doc.forEach((elem) => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(user.id)
                  .collection("animes")
                  .doc(elem.id)
                  .delete()
                  .then(() => {});
              });
            }).catch;
          firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .delete()
            .then(() => {});
          swal("Poof! User has been deleted!", {
            icon: "success",
          });
          this.users = [];
          this.listUsers();
        } else {
          swal("The operation has been negate");
        }
      });
    },
  },
  setup() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const añoActual = hoy.getFullYear();
    var mes;
    switch (hoy.getMonth() + 1) {
      case 12:
      case 1:
      case 2:
        mes = "spring";
        break;

      case 3:
      case 4:
      case 5:
        mes = "summer";
        break;

      case 6:
      case 7:
      case 8:
        mes = "fall";
        break;
      case 9:
      case 10:
      case 11:
        mes = "winter";
        break;
    }
    const auth = ref(false);
    const news = ref([]);
    const populars = ref([]);
    const evaluated = ref([]);
    onBeforeMount(() => {
      function check() {
        var user = firebase.auth().currentUser;
        if (user) {
          auth.value = false;
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.data()) {
                if (doc.data().role == "user") {
                  auth.value = true;
                }
              }
            })
            .catch();
        }
      }

      check();
      function primerFetch() {
        fetch(`https://kitsu.io/api/edge/trending/anime`)
          .then((response) => response.json())
          .then((data) => {
            for (let index = 0; index < 6; index++) {
              populars.value[index] = data.data[index];
            }
          })
          .catch();
      }

      function segundoFetch(callback) {
        setTimeout(function () {
          fetch(
            `https://kitsu.io/api/edge/anime?filter[seasonYear]=${añoActual}&filter[season]=${mes}&page[limit]=12&sort=-averageRating`
          )
            .then((response) => response.json())
            .then((data) => {
              news.value = data.data;
              news.value.sort(compare);

              callback();
            })
            .catch();
        }, 500);
      }
      function compareName(a, b) {
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
      function compare(a, b) {
        const titleA = a.attributes.canonicalTitle.length;
        const titleB = b.attributes.canonicalTitle.length;
        let comparison = 0;
        if (titleA > titleB) {
          comparison = 1;
        } else if (titleA < titleB) {
          comparison = -1;
        }
        return comparison;
      }
      function tercerFetch() {
        setTimeout(function () {
          fetch(
            `https://kitsu.io/api/edge/anime?page[limit]=12&sort=-averageRating`
          )
            .then((response) => response.json())
            .then((data) => {
              evaluated.value = data.data;
              evaluated.value.sort(compareName);
            })
            .catch();
        }, 500);
      }

      segundoFetch(primerFetch);
      tercerFetch();
    });

    return {
      auth,
      news,
      populars,
      evaluated,
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