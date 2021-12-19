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
      <div id="unverified">
        <b-card class="border-0 shadow-lg p-0 rounded">
          <div
            id="verification"
            style="padding-top: 5%; padding-bottom: 5%"
            align-v="center"
          >
            <h1 class="px-5 text-danger"><b>We're sorry...</b></h1>
            <p class="pt-3 px-5">
              Your account is not verified yet. Please verify your email by
              click on a link in your email.
            </p>
          </div>
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
  name: "Unverified",
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
    resend() {},
  },
};
</script>

<style scoped>
#unverified {
  padding-top: 7%;
  padding-bottom: 7%;
}
.rounded {
  border-radius: 1rem !important;
}
</style>