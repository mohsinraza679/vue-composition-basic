<template>
  <ErrorAlert  />
  <div class="login-page">
    <div class="form">
      <v-form
        class="login-form"
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent
      >
       
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="email*"
          required
        ></v-text-field>
      
        <v-text-field
          type="password"
          v-model="password"
          :rules="passwordRules"
          label="password*"
          required
        ></v-text-field>
        <button @click="login">login</button>
        <p class="message">
          Not registered? <span @click="registerFun">Create an account</span>
        </p>
      </v-form>
    </div>
  </div>
</template>
  
  <script>
import { useUserStore } from "../stores/user";
import { ref, computed } from "vue";
import router from "../router";
import ErrorAlert from "../components/ErrorAlert.vue";
export default {
  name: "Login",
  components: { ErrorAlert },
  setup() {
    const userStore = useUserStore();
    const password = ref("");
    const email = ref("");
    const valid = ref(true);

    const login = () => {
      if (email.value && password.value) {
        userStore.login(email.value, password.value);
        router.push("/dashboard");
      }else{
        validate()
      }
    };
    const registerFun = () => {
      router.push("register");
      userStore.errorMessage = "";
      userStore.errorMessageAlert = false;
    };
    const errorMessage = computed(() => userStore.errorMessage);
    const errorMessageAlert = computed(() => userStore.errorMessageAlert);
    const emailRules = computed(() => [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "email must be valid",
    ]);
    const passwordRules = computed(() => [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be at least 8 characters long",
    ]);
    const form = ref(null);
    const validate = () => {
      form.value.validate();
    };
    return {
      password,
      email,
      login,
      registerFun,
      errorMessage,
      errorMessageAlert,
      emailRules,
      passwordRules,
      form,
      valid,
      validate,
    };
  },
};
</script>
  <style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.v-messages .message {
  text-align: start !important;
  margin-bottom: 20px !important;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message span {
  color: #4caf50;
  cursor: pointer;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141, 194, 111);
  background: linear-gradient(
    90deg,
    rgba(141, 194, 111, 1) 0%,
    rgba(118, 184, 82, 1) 50%
  );
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
  