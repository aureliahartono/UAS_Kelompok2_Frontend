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
        <b-navbar-brand href="#"
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
            <b-nav-item href="/products" class="pr-3" active
              >Products</b-nav-item
            >
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
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

    <b-container>
      <div id="productList">
        <h1 class=""><b>Our Products</b></h1>
        <b-row class="py-5">
          <b-col
            md="3"
            sm="6"
            cols="12"
            class="mb-4"
            v-for="product in products"
            :key="product.product_name"
          >
            <b-card
              class="
                h-100
                no-gutters
                border-0
                shadow
                rounded
                overflow-hidden
                mr-0
              "
              v-bind:img-src="'' + product.product_img"
              style="max-width: 255px"
            >
              <b-link
                @click="toDetail(product)"
                class="stretched-link"
                style="text-decoration: none; color: inherit"
              >
                <b-card-body class="p-0">
                  <b-card-text>
                    <h6 class="font-weight-bold">{{ product.product_name }}</h6>
                    <h6 class="font-weight-bold">Rp{{ product.price }}</h6>
                    Stok: {{ product.stock }}
                  </b-card-text>
                </b-card-body>
              </b-link>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>

    <div id="footer" class="pt-5">
      <footer
        class="footer static p-4 text-white"
        style="background-color: #ffb19d; bottom: 0"
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
  name: "Products",
  data() {
    return {
      id: null,
      token: null,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      foods: [
        {
          name: "Yoforia",
          price: 9000,
          stock: 40,
          image: "yoforia.png",
        },
        {
          name: "Banana Milk",
          price: 10000,
          stock: 50,
          image: "bananamilk.png",
        },
        {
          name: "Greenfields Yoghurt",
          price: 8000,
          stock: 25,
          image: "green.png",
        },
        {
          name: "Samyang",
          price: 12000,
          stock: 40,
          image: "samyang.png",
        },
        {
          name: "Tok-Poki",
          price: 12000,
          stock: 40,
          image: "tokpoki.png",
        },
      ],
      product: new FormData(),
      products: [],
      user: new FormData(),
      users: [],
      form: {
        id: null,
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
    readDataUser() {
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
    readData() {
      var url = this.$api + "/product";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.products = response.data.data;
          console.log(this.products);
        });
    },
    toDetail(product) {
      localStorage.setItem("id_product", product.id);
      console.log(localStorage.getItem("id_product"));
      this.$router.push({
        name: "detailProducts",
      });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push({
        name: "home",
      });
      console.log(localStorage.getItem("id"));
      console.log(localStorage.getItem("token"));
    },
  },
  mounted() {
    this.readDataUser();
    this.readData();
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 1rem !important;
}
.card {
  margin: 0;
  transition: 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
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