<template>
  <div class="container-xl col-11 register">
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
          <form @submit.prevent="Register">
            <div class="form-group">
              <input
                type="Text"
                class="required form-control"
                placeholder="Username"
                v-model="name"
              />
              <div
                class="text-danger"
                style="font-size: 12px"
                :class="validText(name) && checked ? '' : 'invalid-feedback'"
              >
                {{ validText(name) }}
              </div>
            </div>
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
                placeholder="Confirm Password"
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
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                v-model="password2"
              />
              <div
                style="font-size: 12px"
                class="text-danger"
                :class="
                  validPassword2(password2, password) && checked
                    ? ''
                    : 'invalid-feedback'
                "
              >
                {{ validPassword2(password2, password) }}
              </div>
            </div>
            <div class="text-center">
              <button
                v-if="
                  !validText(name) &&
                  !validEmail(email) &&
                  !validPassword(password) &&
                  !validPassword2(password2, password)
                "
                class="btn btn-primary"
                value="Register"
                type="submit"
                @click="checked = true"
              >
                <i class="fas fa-sign-in-alt"></i>
                Sign Up
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click="checked = true"
              >
                <i class="fas fa-sign-in-alt"></i>
                Sign Up
              </button>
            </div>
          </form>
          <div class="col-12 text-center mt-2">
            <p>
              Have an account?
              <router-link to="/login">Log In Here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import { ref } from "vue";
import firebase from "firebase";
export default {
  methods: {
    validText(value) {
      if (!value) return "Please enter your username";
      return null;
    },
    validPassword(value) {
      if (!value) return "Please enter your password";
      else if (!this.checkPassword(value))
        return "Your password is badly formed (Must be between 8 and 16 characters, uppercase and lowercase letters)";

      return null;
    },
    validPassword2(value, value2) {
      if (!value) return "Please enter your password again";
      else if (value != value2) return "Your password doesn't match";

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
    const name = ref("");
    const password = ref("");
    const password2 = ref("");
    const Register = () => {
      if (email.value && name.value && password.value && password2.value) {
        if (password.value == password2.value) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((userData) => {
              var user = {
                id: userData.user.uid,
                email: email.value,
                name: name.value,
                role: "user",
              };
              firebase
                .firestore()
                .collection("users")
                .doc(userData.user.uid)
                .set(user)
                .then(() => {});
              setTimeout('location.href="/login"', 500);
            })
            .catch((err) => {
              if (err.code == "auth/email-already-in-use") {
                swal({
                  title: "User already in use",
                  icon: "warning",
                  button: "OK",
                });
              }
            });
        }
      }
    };
    return {
      Register,
      email,
      password,
      password2,
      name,
      checked,
    };
  },
};
</script>

<style>
</style>