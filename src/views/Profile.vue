<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="profile container-xl">
    <Navbar />
    <section class="container-xl bg-light pb-2 col-12 rounded">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="pl-3 pt-3">
          <i class="fas fa-user mr-1"></i>Welcome {{ name }}
        </h3>

        <router-link
          replace
          :to="'/edit-profile'"
          class="m-3 pr-2 btn btn-danger"
        >
          <i class="fas fa-user-edit"></i> Edit Profile
        </router-link>
      </div>
      <div
        class="
          row
          d-flex
          justify-content-around
          m-3
          p-2
          bg-secondary
          text-light
          rounded
        "
      >
        <div class="row col-8 col-md-9 p-3">
          <div class="col-12 col-md-6 mb-1">
            <h5 class="mb-md-3">Next level:</h5>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width:' + percentage(porcentaje) + '%'"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ percentage(porcentaje) }}%
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <h5 class="mb-md-2 mb-0">Watched chapters</h5>
            <small>{{ porcentaje }}</small>
          </div>
          <div class="col-12 col-md-2">
            <h5 class="mb-md-2 mb-0">Level:</h5>
            <span class="badge rounded-pill bg-primary"
              >{{ level(porcentaje) }} <i class="fas fa-star ms-1"></i
            ></span>
          </div>
        </div>

        <div class="col-4 col-md-3 col-lg-2 p-3">
          <img class="w-100 bg-light rounded-circle" :src="image" />
        </div>
      </div>
      <div>
        <div class="row d-flex px-3" v-if="favorite.length != 0">
          <h3 class="col-12 py-3 d-flex align-items-center">
            <i class="fas fa-heart mr-1"></i>Saved ({{ favorite.length }})
          </h3>
          <article
            class="col-6 col-md-3 col-lg-2 text-center mb-3"
            v-for="anime in favorite"
            :key="anime.id"
          >
            <router-link
              replace
              :to="'/anime/' + anime.id"
              class="text-decoration-none text-dark hoverTitle"
            >
              <div class="bg-secondary rounded">
                <img
                  class="w-100 opacity rounded border border-secondary"
                  :src="anime.image"
                  :alt="anime.title + ' Poster '"
                />
              </div>
              <span class="font-weight-bold">{{ anime.title }}</span>
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
import firebase from "firebase";
import Footer from "@/components/Footer.vue";
import Load from "@/components/Load.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Footer, Navbar, Load },
  mounted() {
    setTimeout(() => {
      this.load = true;
      if (localStorage.uid) this.uid = localStorage.uid;
    }, 2000);
  },
  data() {
    return {
      progressbar: 0,
      load: false,
    };
  },
  watch: {
    uid(newUid) {
      localStorage.uid = newUid;
    },
  },
  methods: {
    level(num) {
      return Math.trunc(num / 10 + 1);
    },
    percentage(num) {
      num *= 10;
      while (num > 100) {
        num -= 100;
      }
      return num;
    },
  },
  setup() {
    const porcentaje = ref(0);
    const name = ref("");
    const image = ref("");
    const uid = ref("");
    const favorite = ref([]);
    const idList = ref([]);

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;

      function primerFetch() {
        if (user) {
          uid.value = user.uid;
          firebase
            .firestore()
            .collection("users")
            .doc(uid.value)
            .get()
            .then((doc) => {
              name.value = doc.data().name;
              image.value = doc.data().image;
            });
        }
        setTimeout(function () {
          firebase
            .firestore()
            .collection("users")
            .doc(uid.value)
            .collection("animes")
            .where("fav", "==", true)
            .get()
            .then((doc) => {
              doc.forEach((element) => {
                var id = element.data().id;
                idList.value.push({ id: id });
              });
              idList.value.forEach((el) => listFetch(el.id));
            })
            .catch();
        }, 2000);
      }

      async function listFetch(id) {
        await fetch("https://kitsu.io/api/edge/anime/" + id)
          .then((response) => response.json())
          .then((data) => {
            favorite.value.push({
              id: data.data.id,
              image: data.data.attributes.posterImage.original,
              title: data.data.attributes.canonicalTitle,
            });
          })
          .catch();
        favorite.value.sort(compare);
      }
      function compare(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        let comparison = 0;
        if (titleA > titleB) {
          comparison = 1;
        } else if (titleA < titleB) {
          comparison = -1;
        }
        return comparison;
      }

      function segundoFetch() {
        if (user) {
          uid.value = user.uid;
          firebase
            .firestore()
            .collection("users")
            .doc(uid.value)
            .get()
            .then((doc) => {
              name.value = doc.data().name;
            });
        }

        firebase
          .firestore()
          .collection("users")
          .doc(uid.value)
          .collection("chapters")
          .where("state", "==", true)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data()) {
                porcentaje.value = parseInt(porcentaje.value) + 1;
              }
            });
          })
          .catch();
      }

      primerFetch();

      segundoFetch();
    });

    return {
      name,
      uid,
      idList,
      porcentaje,
      favorite,
      image,
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