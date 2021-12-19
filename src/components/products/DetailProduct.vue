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
            <b-nav-item-dropdown right v-if="id != null" style="width: 10px">
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
        <b-row>
          <b-col md="6" sm="12" cols="12" class="mb-4 pr-5">
            <b-img
              fluid
              class="rounded"
              :src="'/Home' + products.product_img"
            ></b-img>
          </b-col>
          <b-col md="6" sm="12" cols="12" class="mb-4 pr-5">
            <b-row>
              <h1>
                <b>{{ products.product_name }}</b>
              </h1>
            </b-row>
            <b-row class="py-2">
              <h4>Rp. {{ products.price }}</h4>
            </b-row>
            <b-row>
              <p>{{ products.desc }}</p>
            </b-row>
            <b-row class="pt-4">
              <b-col md="6" sm="12" cols="12" class="mb-1 px-0"> </b-col>
            </b-row>

            <b-form>
              <b-row>
                <b-col md="6" sm="12" cols="12" class="mb-4 px-0">
                  <h5><b>Stocks</b></h5>
                  <h5>{{ products.stock }} pcs</h5>
                </b-col>
                <b-col md="6" sm="12" cols="12" class="mb-4 px-0 pr-5">
                  <h5><b>Quantity</b></h5>
                  <b-form-row>
                    <b-col md="2" sm="2" cols="2" class="mb-4 px-0">
                      <b-button @click="plus" class="py-1 px-1 border-0"
                        ><b-icon icon="caret-up-fill"></b-icon
                      ></b-button>
                    </b-col>
                    <b-col md="3" sm="2" cols="2" class="mb-4 px-1">
                      <b-form-input
                        v-model="quantity"
                        class="border-0"
                        readonly
                        value="1"
                        min="1"
                        max="3"
                        style="background-color: #f3f1f0"
                      ></b-form-input>
                    </b-col>
                    <b-col md="2" sm="2" cols="2" class="mb-4 px-0">
                      <b-button @click="minus" class="py-1 px-1 border-0"
                        ><b-icon icon="caret-down-fill"></b-icon
                      ></b-button>
                    </b-col>
                  </b-form-row>
                </b-col>
              </b-row>

              <b-row>
                <b-button
                  @click="cekAmount"
                  to=""
                  class="px-5 py-3 border-0 font-weight-bold"
                  style="background-color: #ffb19d; border-radius: 0.5rem"
                >
                  <b-icon icon="cart-plus-fill" class="mr-3"></b-icon>
                  Add to Cart
                </b-button>
              </b-row>
            </b-form>
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
import router from "@/router";

export default {
  name: "DetailProduct",
  data() {
    return {
      id: null,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      foods: {
        name: "Banana Milk",
        price: 10000,
        stock: 50,
        image: "bananamilk.png",
        desc: "Korean Banana Milk",
      },
      quantity: 1,
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
      product: new FormData(),
      products: [],
      placeorder: new FormData(),
      deleteId: "",
      editId: "",
    };
  },
  methods: {
    readData() {
      var id = localStorage.getItem("id_product");
      var url = this.$api + "/product/" + id;
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
    plus() {
      if (this.products.stock > this.quantity) {
        this.quantity++;
      }
    },
    cekAmount() {
      if (
        this.products.stock >= 1 &&
        this.products.stock >= this.quantity &&
        localStorage.getItem("id") != null
      ) {
        this.save();
        router.push({ name: "shoppingcart" });
        console.log(this.foods.stock);
      }
    },
    minus() {
      if (this.quantity > 1) this.quantity--;
    },
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
    save() {
      this.placeorder.append("product_name", this.products.product_name);
      this.placeorder.append("price", this.products.price);
      this.placeorder.append("quantity", this.quantity);
      this.placeorder.append("id_user", this.users.id);
      this.placeorder.append("id_product", this.products.id);
      console.log(this.placeorder);

      var url = this.$api + "/placeorder";
      this.load = true;
      this.$http
        .post(url, this.placeorder, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
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