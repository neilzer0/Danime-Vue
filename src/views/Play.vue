<template>
  <div v-if="!load"><Load /></div>

  <div v-if="load" class="play container-xl">
    <Navbar />

    <section
      class="container-xl bg-light col-12 rounded pb-3"
      v-if="anime.attributes"
    >
      <nav
        class="pt-3"
        style="--bs-breadcrumb-divider: '>'"
        aria-label="breadcrumb"
      >
        <ol class="breadcrumb bg-transparent">
          <li class="breadcrumb-item">
            <router-link replace :to="'/'">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link replace :to="'/anime/' + id">{{
              anime.attributes.canonicalTitle
            }}</router-link>
          </li>
          <li
            v-if="anime.attributes.subtype == 'movie'"
            class="breadcrumb-item active"
            aria-current="page"
          >
            Movie
          </li>
          <li
            v-else-if="anime.attributes.subtype == 'TV'"
            class="breadcrumb-item active"
            aria-current="page"
          >
            Chapter {{ $route.params.cap }}
          </li>
          <li v-else class="breadcrumb-item active" aria-current="page">
            {{ anime.attributes.subtype }}
          </li>
        </ol>
      </nav>
      <div class="px-3">
        <div
          v-if="'um-tFlVamOI' == link"
          class="text-light m-3 d-flex flex-column align-items-center pb-5"
        >
          <h4 class="text-primary">Sorry, we don't have the video available</h4>
          <img src="@/assets/images/sorry.gif" class="w-50 rounded" />
        </div>
        <div
          v-else-if="!link"
          class="text-light m-3 d-flex flex-column align-items-center pb-5"
        >
          <h4 class="text-primary">Sorry, we don't have the video available</h4>
          <img src="@/assets/images/sorry.gif" class="w-50 rounded" />
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

      <h3 class="p-3 d-flex justify-content-between align-items-center">
        <div><i class="fas fa-comment-dots mr-1"></i>Comments</div>

        <button
          class="btn btn-outline-danger"
          :class="isViewed ? 'active' : 'unactive'"
          @click="Viewed"
        >
          <i class="far fa-eye m-2"></i>
        </button>
      </h3>

      <div class="list-group mx-3 mb-3">
        <span
          v-for="(comment, index) in commentList"
          :key="index"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="d-flex w-100 justify-content-between">
            <p class="mb-1 font-weight-bold">{{ comment.text }}</p>
          </div>
          <small>{{ comment.user }}</small>
        </span>
        <span
          v-for="comment in commentTemp"
          :key="comment"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="d-flex w-100 justify-content-between">
            <p class="mb-1 font-weight-bold">{{ comment.text }}</p>
          </div>
          <small>{{ comment.user }}</small>
        </span>
      </div>
      <div class="form-floating mb-4 mx-3">
        <form action="" @submit.prevent="Comment">
          <div class="input-group">
            <textarea
              type="search"
              v-model="text"
              class="form-control shadow rounded"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style="height: 100px"
            />
            <button
              v-if="text != ''"
              type="submit"
              class="col-12 mt-2 btn btn-primary rounded"
              value="HandleSearch"
            >
              Comment the chapter
            </button>
            <button
              v-else
              type="button"
              class="col-12 mt-2 btn btn-primary rounded"
            >
              Comment the chapter
            </button>
          </div>
        </form>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import firebase from "firebase";

import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import Load from "@/components/Load.vue";
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
    const route = useRoute();
    const count = ref(0);
    const link = ref("");
    const isViewed = ref(false);
    const id = ref("");
    const cap = ref("");
    const anime = ref([]);
    const commentList = ref([]);
    var commentTemp = ref([]);
    const text = ref("");

    const Viewed = () => {
      const user = firebase.auth().currentUser;
      if (isViewed.value == true) {
        const viewF = {
          id: id.value + " - " + cap.value,
          state: false,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("chapters")
          .doc(cap.value)
          .update(viewF)
          .then(() => {
            isViewed.value = false;
          })
          .catch(() => {});
      } else {
        const viewT = {
          id: id.value + " - " + cap.value,
          state: true,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("chapters")
          .doc(cap.value)
          .set(viewT)
          .then(() => {
            isViewed.value = true;
          })
          .catch(() => {});
      }
    };

    const Comment = () => {
      const user = firebase.auth().currentUser;
      var hoy = new Date();
      var fecha =
        hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
      var hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      var fechaYHora = fecha + " " + hora;

      const comment = {
        id: id.value + " - " + cap.value,
        user: user.email,
        text: text.value,
        date: fechaYHora,
      };
      firebase
        .firestore()
        .collection("animes")
        .doc(id.value)
        .collection("chapters")
        .doc(cap.value)
        .collection(cap.value)
        .add(comment)
        .then(() => {
          commentTemp.value.push(comment);
        });
      text.value = "";
    };

    onBeforeMount(() => {
      function primerFetch() {
        setTimeout(function () {
          firebase
            .firestore()
            .collection("animes")
            .doc(id.value)
            .collection("chapters")
            .doc(cap.value)
            .collection(cap.value)
            .get()
            .then((doc) => {
              doc.forEach((element) => {
                var info = {
                  date: element.data().timestamp,
                  text: element.data().text,
                  user: element.data().user,
                };

                commentList.value.push(info);
              });
            })
            .catch();
        }, 2000);
      }
      function tercerFetch() {
        setTimeout(function () {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("chapters")
            .doc(cap.value)
            .get()
            .then((doc) => {
              if (doc.exists) {
                if (doc.data().state) isViewed.value = true;
              }
            })
            .catch(() => {});
        }, 2000);
      }

      function segundoFetch() {
        fetch(`https://kitsu.io/api/edge/anime/${route.params.id}`)
          .then((response) => response.json())
          .then((data) => {
            anime.value = data.data;
            count.value = data.data.attributes.episodeCount;
            link.value = anime.value.attributes.youtubeVideoId;
          })
          .catch();
      }

      tercerFetch();
      segundoFetch();
      primerFetch();

      id.value = route.params.id;
      cap.value = route.params.cap;
    });

    return {
      link,
      id,
      text,
      count,
      anime,
      Comment,
      Viewed,
      commentList,
      commentTemp,
      isViewed,
    };
  },
};
</script>
