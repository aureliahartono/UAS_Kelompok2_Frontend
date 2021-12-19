<template>
  <div id="app">
    <b-navbar
      class="p-4"
      toggleable="lg"
      type="light"
      style="background-color: #f3f1f0"
      sticky
      v-b-scrollspy="{ offset: 100, method: 'auto' }"
    >
      <b-container>
        <b-navbar-brand href="#"
          ><img
            src="../assets/logo.png"
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
            <b-nav-item href="#title" class="pr-3" active>Home</b-nav-item>
            <b-nav-item href="/products" class="pr-3">Products</b-nav-item>
            <b-nav-item href="#aboutus" class="pr-3">About Us</b-nav-item>
            <b-button
              v-if="id === null"
              class="my-3 my-sm-0 px-3 font-weight-bold border-0"
              to="/login"
              style="background-color: #ffb19d"
              >Login</b-button
            >
            <b-nav-item-dropdown right v-else>
              <template #button-content>
                {{ form.name }}
              </template>
              <b-dropdown-group>
                <b-dropdown-item href="/profile" class="text-center">
                  <h6 class="text-center font-weight-bold">
                    {{ form.name }}
                  </h6>
                  <p>{{ form.email }}</p>
                </b-dropdown-item>
              </b-dropdown-group>
              <b-dropdown-item href="/shoppingcart" class="text-center"
                >Cart</b-dropdown-item
              >
              <b-dropdown-item href="/editprofile" class="text-center"
                >Edit Profile</b-dropdown-item
              >
              <b-dropdown-item
                href="#"
                @click="logout"
                class="text-center text-danger"
                >Logout</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <div id="title">
      <b-container>
        <b-row align-v="center">
          <b-col lg="5" md="5">
            <h1 style="font-weight: 900; font-size: 3.3rem">
              Shop Everytime, Everywhere
            </h1>
            <h6>
              <p></p>
              We have the best products for you!
            </h6>
          </b-col>
          <b-col lg="7" md="7">
            <img
              class="title-img"
              src="../assets/home2.jpg"
              alt="home2img"
              width="550px"
              height="400px"
              style="margin-top: 40px; border-radius: 10px"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div id="aboutus">
      <b-container>
        <b-row class="justify-content-md-center" style="padding-top: 15%">
          <h1 align="center" class="pb-5 font-weight-bolder">What about us?</h1>
        </b-row>

        <b-row>
          <b-col class="pt-8">
            <p>
              Welcome to Daebak Supermarket, your number one source for all
              things. <br />We're dedicated to giving you the best of our
              products, with a focus on three characteristics, <br />ie:
              dependability, customer service and uniqueness.
              <br /><br />Founded in 2021. <br />We now serve customers all over
              place: Yogyakarta, Solo, Muntilan and many other places, <br />and
              are thrilled to be a part of the eco-friendly wing of the product
              industry. <br />We hope you enjoy our products as much as we enjoy
              offering them to you.
            </p>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div id="packaging">
      <b-container>
        <h1 style="text-align: center; font-weight: bold; padding-top: 15%">
          Our Team
        </h1>
        <b-col class="align-middle">
          <b-row class="pb-3 no-gutters"> </b-row>
        </b-col>
        <b-col class="align-middle">
          <b-row class="pb-3 no-gutters"> </b-row>
        </b-col>
        <b-col class="align-middle">
          <b-row class="pb-3 no-gutters">
            <b-col cols="4">
              <b-row class="pb-3 no-gutters">
                <img
                  src="../assets/aurelia.jpg"
                  style="
                    border-radius: 20px;
                    width: 150px;
                    height: 170px;
                    margin-left: 120px;
                  "
                />
              </b-row>
              <b-row class="pb-3 no-gutters">
                <h3><b>Aurelia Catherine</b></h3>
                <p class="mb-0">190710113</p></b-row
              >
            </b-col>
            <b-col cols="4">
              <b-row class="pb-3 no-gutters">
                <img
                  src="../assets/steven.jpg"
                  style="
                    border-radius: 20px;
                    width: 150px;
                    height: 170px;
                    margin-left: 120px;
                  "
                />
              </b-row>
              <b-row class="pb-3 no-gutters">
                <h3><b>Steven Dita</b></h3>
                <p class="mb-0">190710177</p></b-row
              >
            </b-col>
            <b-col cols="4">
              <b-row class="pb-3 no-gutters">
                <img
                  src="../assets/stelly.jpg"
                  style="
                    border-radius: 20px;
                    width: 150px;
                    height: 170px;
                    margin-left: 120px;
                  "
                />
              </b-row>
              <b-row class="pb-3 no-gutters">
                <h3><b>Stelly Alison</b></h3>
                <p class="mb-0">190710180</p></b-row
              >
            </b-col>
          </b-row>
        </b-col>
      </b-container>
    </div>

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
  data() {
    return {
      fields: ["first_name", "last_name", "age"],
      id: null,
      token: null,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
      ],
      user: new FormData(),
      users: [],
      form: {
        name: null,
        email: null,
        password: null,
        newPassword: null,
        confirmPassword: null,
        image: null,
      },
      deleteId: "",
      editId: "",
    };
  },
  methods: {
    readData() {
      this.id = localStorage.getItem("id");
      console.log(this.id);
      this.token = localStorage.getItem("token");
      console.log(this.token);
      var url = this.$api + "/user/" + this.id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data.data;
          this.form.name = this.users.name;
          this.form.email = this.users.email;
          this.form.image = this.users.image;
        });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      location.reload();
      console.log(localStorage.getItem("id"));
      console.log(localStorage.getItem("token"));
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 1rem !important;
}
#productList {
  padding-top: 7%;
  padding-bottom: 8%;
}
::v-deep .dropdown-menu {
  border: none !important;
  border-radius: 0.5rem !important;
  background-color: #f3f1f0 !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
::v-deep .dropdown-item {
  color: #ffb19d;
}
::v-deep .dropdown-item:hover {
  background-color: #f8e8e1 !important;
}
</style>
