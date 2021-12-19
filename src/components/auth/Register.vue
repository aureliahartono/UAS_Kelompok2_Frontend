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
              href="/login"
              style="background-color: #ffb19d"
              >Login</b-button
            >
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <div id="register">
        <b-card class="border-0 shadow-lg p-0 rounded">
          <b-row
            class="justify-content-md-center"
            style="padding-top: 5%"
            align-v="center"
          >
            <b-col lg="7" md="7" style="padding: 0px"
              ><img
                :src="require('@/assets/grocery.jpg')"
                class="no-gutters"
                width="650px"
                height="500px"
                style="
                  padding: 0px;
                  margin-bottom: 50px;
                  margin-left: 25px;
                  border-radius: 10px;
                "
                alt="home1register"
            /></b-col>
            <b-col lg="5" md="5">
              <h1 class="text-center"><b>REGISTER</b></h1>
              <b-form class="px-5 pt-5">
                <b-form-row class="mb-3">
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon icon="person-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      placeholder="Your Full Name"
                      v-model="name"
                      required
                      max="60"
                    ></b-form-input>
                  </b-input-group>
                </b-form-row>

                <b-form-row class="mb-3">
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon icon="envelope-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="email"
                      placeholder="Email"
                      v-model="email"
                      required
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
                      v-b-tooltip
                      title="Password min. 8 characters"
                      v-model="password"
                      placeholder="Password"
                      minlength="8"
                      required
                    ></b-form-input>
                  </b-input-group>
                </b-form-row>

                <b-form-row class="mb-3">
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon icon="telephone-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="tel"
                      v-b-tooltip
                      title='Number must start with "08"'
                      v-model="telp"
                      placeholder="08XXXXXXXXXX"
                      pattern="^08[0-9]{8,10}"
                      minlength="10"
                      maxlength="12"
                    ></b-form-input>
                  </b-input-group>
                </b-form-row>

                <b-form-row class="py-2">
                  <p>
                    By register, you confirm that you accept our Terms of Use.
                  </p>
                </b-form-row>

                <b-form-row class="pt-2">
                  <b-button
                    class="py-2 font-weight-bold border-0"
                    block
                    style="background-color: #ffb19d; border-radius: 0.5rem"
                    @click="submit"
                    >Register</b-button
                  >
                </b-form-row>

                <b-form-row class="pt-2 pb-5">
                  <p>
                    Already have an account?
                    <b-link to="/login" style="text-decoration: none"
                      ><b>Login</b></b-link
                    >
                  </p>
                </b-form-row>
              </b-form></b-col
            >
          </b-row>
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
          ></b-container
        >
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      name: "",
      email: "",
      password: "",
      telp: "",
    };
  },
  methods: {
    submit() {
      console.log(this.email);
      this.load = true;
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
      console.log(this.telp);
      this.$http
        .post(this.$api + "/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          telp: this.telp,
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.$router.push({
            name: "unverified",
          });
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          localStorage.removeItem("token");
          this.load = false;
        });
    },
  },
};
</script>

<style scoped>
#register {
  padding-top: 7%;
  padding-bottom: 7%;
}
.rounded {
  border-radius: 1rem !important;
}
.card-img-left {
  border-top-right-radius: 0 !important;
  border-top-left-radius: 1rem !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 1rem !important;
}
</style>