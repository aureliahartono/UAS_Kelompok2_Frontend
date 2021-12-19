<template>
  <div id="app">
    <b-navbar
      class="p-4"
      toggleable="lg"
      type="light"
      style="background-color: #f3f1f0"
      sticky
    >
      <b-container>
        <b-navbar-brand to="/"
          ><img
            src="../../assets/logo.png"
            width="50"
            height="50"
            class="d-inline-block"
            alt="LogoDaebak"
          />
          <b class="pl-3"> Daebak Supermarket</b>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" class="border-0">
          <template #default="{ expanded }">
            <b-icon
              v-if="expanded"
              icon="x"
              style="color: #ffb19d; width: 30px; height: 30px"
            ></b-icon>
            <b-icon
              v-else
              icon="list"
              style="color: #ffb19d; width: 30px; height: 30px"
            ></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav style="flex-grow: 0">
          <b-navbar-nav class="ml-auto text-sm-center font-weight-bold">
            <b-nav-item to="/" class="pr-3">Home</b-nav-item>
            <b-nav-item href="/products" class="pr-3">Products</b-nav-item>
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-button
              class="my-3 my-sm-0 px-3 font-weight-bold border-0"
              href=""
              style="background-color: #ffb19d"
              >Login</b-button
            >
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <div id="login" style="padding-left: 30%">
        <b-card class="border-0 shadow-lg p-0 rounded" style="width: 500px">
          <b-row
            class="justify-content-md-center"
            style="padding-top: 18%"
            align-v="center"
          >
            <h1 class="text-center"><b>LOGIN</b></h1>
          </b-row>

          <b-form class="px-5 pt-5" ref="form">
            <b-form-row class="mb-3">
              <b-input-group>
                <b-input-group-prepend is-text class="text">
                  <b-icon icon="envelope-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="email"
                  v-model="email"
                  placeholder="Email"
                ></b-form-input>
              </b-input-group>
            </b-form-row>

            <b-form-row class="mb-3">
              <b-input-group>
                <b-input-group-prepend is-text class="text">
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="password"
                  placeholder="Password"
                  v-model="password"
                ></b-form-input>
              </b-input-group>
            </b-form-row>

            <b-form-row class="pt-5">
              <b-button
                class="py-2 font-weight-bold border-0"
                block
                @click="submit"
                style="background-color: #ffb19d; border-radius: 0.5rem"
                >Login</b-button
              >
            </b-form-row>

            <b-form-row class="py-3">
              <p>
                Don't have an account?
                <b-link to="/register" style="text-decoration: none"
                  ><b>Register</b></b-link
                >
              </p>
            </b-form-row>
          </b-form>
        </b-card>
      </div>
    </b-container>

    <div id="footer" class="pt-5">
      <footer
        class="footer static p-4 text-white"
        style="background-color: #ffb19d"
      >
        <b-container>
          <span class="d-inline-block align-middle pl-3"
            ><b>
              &copy; Made with
              <span style="font-size: 20px; color: #ffffff">&#10084;</span> by
              Daebak Team
            </b></span
          >
        </b-container>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      if (this.email === "daebaksupermarket2@gmail.com") {
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("token", response.data.access_token);
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.$router.push({
              name: "adminuser",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      } else {
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("token", response.data.access_token);
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.$router.push({
              name: "products",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
  },
};
</script>

<style scoped>
#login {
  padding-top: 7%;
  padding-bottom: 7%;
}
.rounded {
  border-radius: 1rem !important;
}
</style>