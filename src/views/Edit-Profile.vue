<template>
  <div v-if="!load"><Load /></div>
  <div v-if="load" class="container-xl col-11 edit-profile">
    <div
      class="d-flex justify-content-center align-items-center max-height-100"
      style="height: 100vh"
    >
      <div class="card col-12 col-sm-8 col-md-6 p-2">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div class="col-7 mt-4">
            <my-upload
              field="img"
              class="text-primary"
              @crop-success="cropSuccess"
              v-model="show"
              :width="300"
              :height="300"
              img-format="png"
              langType="en-EN"
            ></my-upload>

            <div class="bg-dark" style="cursor: pointer" @click="toggleShow">
              <img class="w-100 bg-light rounded-circle" :src="image" />
            </div>
          </div>
        </div>
        <div class="card-body col-8 align-self-center">
          <div
            class="d-flex justify-content-center align-items-center flex-column"
          >
            <h2 class="font-weight-bold">{{ name }}</h2>
            <button @click="edit()" class="mt-2 btn btn-success">
              <i class="fas fa-pen mr-2"> </i>
              Change your username
            </button>
          </div>
          <form>
            <div class="text-center p-3">
              <router-link
                class="btn btn-primary px-4"
                value="Edit"
                type="submit"
                @click="checked = true"
                :to="'/profile'"
              >
                <i class="fas fa-edit"></i>
                Save
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
import myUpload from "vue-image-crop-upload";
import swal from "sweetalert";

export default {
  components: { "my-upload": myUpload, Load },
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
    cropSuccess(imgDataUrl) {
      this.image = null;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ image: imgDataUrl });
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => (this.image = doc.data().image));
    },
    edit() {
      var id = firebase.auth().currentUser.uid;
      swal({
        text: "Nombre:",
        content: "input",
        button: {
          text: "Editar",
          closemodal: false,
        },
      }).then((name) => {
        if (!name) {
          swal(":(", "El nombre es requerido", "error");
          return false;
        }
        this.name = name;
        var data = { name: name };
        firebase
          .firestore()
          .collection("users")
          .doc(id)
          .update(data)
          .then(() => {
            swal("Nice!", "Edited username", "success");
          });
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