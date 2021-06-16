<template >
  <div class="container-xl col-11 login">
    <div
      class="d-flex justify-content-center align-items-center max-height-100"
      style="height: 100vh"
    >
      <div class="card col-12 col-sm-8 col-md-6 p-2">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <img
            class="p-2"
            src="@/assets/images/danime.png"
            style="height: 200px"
            alt="..."
          />
        </div>
        <div class="card-body col-8 align-self-center">
          <form @submit.prevent="Login">
            <div class="form-group">
              <input
                type="email"
                class="required form-control"
                placeholder="Email"
                v-model="email"
              />
              <div
                class="text-danger"
                style="font-size: 12px"
                :class="validEmail(email) && checked ? '' : 'invalid-feedback'"
              >
                {{ validEmail(email) }}
              </div>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
              <div
                style="font-size: 12px"
                class="text-danger"
                :class="
                  validPassword(password) && checked ? '' : 'invalid-feedback'
                "
              >
                {{ validPassword(password) }}
              </div>
            </div>
            <div class="text-center">
              <button
                v-if="!validEmail(email) && !validPassword(password)"
                class="btn btn-primary"
                value="Login"
                type="submit"
                @click="checked = true"
              >
                <i class="fas fa-sign-in-alt"></i>
                Login
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click="checked = true"
              >
                <i class="fas fa-sign-in-alt"></i>
                Login
              </button>
            </div>
          </form>
          <div class="col-12 text-center mt-2">
            <p>
              New into Danime.com?
              <router-link to="/register">Sign Up Here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import swal from "sweetalert";
export default {
  methods: {
    validPassword(value) {
      if (!value) return "Please enter your password";
      else if (!this.checkPassword(value))
        return "Your password is badly formed";

      return null;
    },
    validEmail(value) {
      if (!value) return "Enter the email you use for Danime";
      else if (!this.checkEmail(value))
        return "Enter the email you use for Danime";

      return null;
    },
    checkPassword(num) {
      var re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
      return re.test(num);
    },
    checkEmail(email) {
      var re =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      return re.test(email);
    },
  },
  setup() {
    const checked = ref(false);
    const email = ref("");
    const password = ref("");
    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {})
        .catch((err) => {
          if (err.code == "auth/user-not-found") {
            swal({
              title: "User not found",
              icon: "warning",
              button: "OK",
            });
          } else {
            swal({
              title: "Wrong password",
              icon: "warning",
              button: "OK",
            });
          }
        });
    };
    return {
      Login,
      email,
      checked,
      password,
    };
  },
};
</script>

<style>
</style>