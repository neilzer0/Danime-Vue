<template>
  <nav class="navbar navbar-expand-lg navbar-dark text-left">
    <router-link class="navbar-brand" to="/">
      <img style="height: 50px" src="@/assets/images/sinlogo.png" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul
        class="
          navbar-nav
          align-items-lg-center
          justify-content-between
          col-12
          p-lg-0
        "
      >
        <li class="nav-item pl-lg-0 pl-3">
          <div class="d-flex flex-column flex-lg-row">
            <router-link
              class="nav-link d-lg-none"
              @click="this.anime = null"
              to="/profile"
            >
              <i class="fas fa-user mr-1"></i>
              Profile
            </router-link>
            <router-link class="nav-link" to="/movies">
              <i class="fas fa-film mr-1"></i>
              Movie catalog
            </router-link>
            <router-link class="nav-link" replace :to="'/advanced-search'">
              <i class="fas fa-search mr-1"></i>
              Advanced Search
            </router-link>
            <a class="nav-link d-lg-none logout" role="button" @click="Logout">
              <i class="fas fa-sign-out-alt mr-1"></i>
              Log Out
            </a>
          </div>
        </li>

        <li class="nav-item dropdown d-lg-flex justify-content-end d-none">
          <div
            class="nav-link col-3 rounded rounded-circle"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img class="w-100 rounded-circle" :src="image" />
          </div>

          <div
            class="
              dropdown-menu dropdown-menu-dark
              bg-dark
              dropdown-menu-right
              rounded-1
              p-1
            "
            aria-labelledby="navbarDropdownMenuLink"
          >
            <router-link
              :to="{ path: '/profile' }"
              replace
              @click="this.anime = null"
              class="text-light nav-link"
            >
              <i class="fas fa-user mr-1"></i>
              Profile
            </router-link>
            <a class="text-light nav-link logout" role="button" @click="Logout">
              <i class="fas fa-sign-out-alt mr-1"></i>
              Log Out
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import firebase from "firebase";
export default {
  setup() {
    const image = ref("");
    const uid = ref("");
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {})
        .catch(() => {});
    };

    onBeforeMount(() => {
      image.value =
        "data:image/png;base64,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";
      function primerFetch() {
        uid.value = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(uid.value)
          .get()
          .then((doc) => {
            if (doc.data()) {
              if (!doc.data().image) {
                firebase.firestore().collection("users").doc(uid.value).update({
                  image: image.value,
                });
              } else {
                image.value = doc.data().image;
              }
            }
          })
          .catch();
      }
      primerFetch();
    });
    return {
      image,
      Logout,
    };
  },
};
</script>