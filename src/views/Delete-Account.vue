<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="container-xl col-11 edit-profile">
    <div
      class="d-flex justify-content-center align-items-center max-height-100"
      style="height: 100vh"
    >
      <div class="card col-12 col-sm-8 col-md-6 p-2">
        <div class="d-flex justify-content-center align-items-center">
          <div class="col-7">
            <img class="w-100 bg-light rounded-circle" :src="image" />
          </div>
        </div>
        <div class="card-body col-8 align-self-center">
          <div
            class="d-flex justify-content-center align-items-center flex-column"
          >
            <h2 class="font-weight-bold">{{ name }}</h2>
            <button @click="remove()" class="mt-2 btn btn-danger">
              <i class="fas fa-times mr-2"> </i>
              Delete your account
            </button>
          </div>
          <form>
            <div class="text-center p-3">
              <router-link
                class="btn btn-primary px-4"
                value="Edit"
                type="submit"
                @click="checked = true"
                :to="'/'"
              >
                <i class="fas fa-arrow-left"></i>
                Go back
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import firebase from "firebase";
import Load from "@/components/Load.vue";
import swal from "sweetalert";

export default {
  components: { Load },
  mounted() {
    setTimeout(() => {
      this.load = true;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          this.name = doc.data().name;
        });
    }, 2000);
  },
  data() {
    return {
      load: false,
      show: false,
      name: "",
      imgDataUrl: this.image,
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },

    remove() {
      var user = firebase.auth().currentUser;
      var id = user.uid;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Yor account has been deleted!", {
            icon: "success",
          });
          firebase
            .firestore()
            .collection("users")
            .doc(id)
            .update({ state: "inactive" })
            .then(() =>{});
          firebase
            .auth()
            .currentUser.delete()
            .then(() => {})
            .catch(() => {});
        } else {
          swal("The operation has been negate");
        }
      });
    },
  },
  setup() {
    const checked = ref(false);
    const image = ref("");
    const uid = ref("");

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
              image.value = doc.data().image;
            });
        }
      }
      primerFetch();
    });
    return {
      image,
      checked,
    };
  },
};
</script>

<style>
</style>