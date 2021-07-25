<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      text-left
      d-flex
      justify-content-between
    "
  >
    <div class="navbar-brand">
      <img style="height: 50px" src="@/assets/images/danimeNavbar.png" />
    </div>
    <button
      class="text-light nav-link logout btn btn-danger"
      role="button"
      @click="Logout"
    >
      <i class="fas fa-sign-out-alt mr-1"></i>
      Log Out
    </button>
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
      function primerFetch() {
        uid.value = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(uid.value)
          .get()
          .then(() => {})
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