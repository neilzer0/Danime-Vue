<template>
  <header></header>
  <router-view />
</template>
<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";

export default {
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "register") {
          router.replace("/");
        }
      });
    });
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {})
        .catch(() => {});
    };
    return {
      Logout,
    };
  },
};
</script>


<style lang="scss">
#app {
  font-family: Nunito;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #6c757d;
}
</style>
