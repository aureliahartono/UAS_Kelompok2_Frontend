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
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto text-sm-center font-weight-bold">
            <b-nav-item to="/" class="pr-3">Home</b-nav-item>
            <b-nav-item href="/products" class="pr-3" active
              >Products</b-nav-item
            >
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-nav-item-dropdown right>
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

    <div id="cart" class="px-5 py-3">
      <h1 class=""><b>Your Shopping Cart</b></h1>
      <b-form>
        <b-row class="py-5">
          <b-col md="8" sm="8" cols="12" class="mb-4">
            <b-card class="border-0 shadow rounded px-4 py-3">
              <b-row>
                <b-table
                  responsive
                  hover
                  show-empty
                  borderless
                  :items="placeorder"
                  :fields="fields"
                >
                  <template #cell(price)="data">
                    Rp{{ formatPrice(data.value) }}
                  </template>
                  <template #cell(quantity)="data">
                    <b-input-group class="no-gutters">
                      <b-col cols="0">
                        <b-input-group-prepend class="mr-0">
                          <b-btn
                            @click="updateOrderMinus(data)"
                            variant="outline-info"
                            >-</b-btn
                          >
                        </b-input-group-prepend>
                      </b-col>
                      <b-col>
                        <b-form-input
                          type="number"
                          min="1"
                          size="sm"
                          class="mx-1 border-0"
                          readonly
                          v-model="data.value"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="5">
                        <b-input-group-append class="ml-0">
                          <b-btn
                            @click="updateOrderPlus(data)"
                            variant="outline-secondary"
                            >+</b-btn
                          >
                        </b-input-group-append>
                      </b-col>
                    </b-input-group>
                  </template>
                  <template #cell(total)="data">
                    <div hidden></div>
                    Rp{{ formatPrice(data.value) }}
                  </template>
                  <template #cell(actions)="data">
                    <b-button
                      id="btnDelete"
                      variant="outline-danger"
                      size="sm"
                      @click="deleteOrder(data)"
                      class="mr-1"
                    >
                      <b-icon icon="x" class="text-danger"></b-icon>
                    </b-button>
                  </template>
                </b-table>
              </b-row>
              <hr class="py-0 pt-2" />
              <b-row>
                <b-col md="3" sm="12" class="pr-3">
                  <b>Subtotal</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp{{ formatPrice(this.subtotal) }}
                </b-col>
              </b-row>

              <hr class="py-0 pt-2" />

              <b-row class="align-middle">
                <b-col md="3" sm="12" class="pr-5">
                  <b>Total Order</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5 pb-3">
                  <b>Rp{{ formatPrice(this.grantTotal) }}</b>
                </b-col>
                <b-col md="6" sm="12" class="">
                  <b-button
                    v-b-modal="'modalPayment'"
                    class="
                      float-right
                      py-2
                      px-4
                      btn-primary
                      border-0
                      font-weight-bold
                    "
                    style="background-color: #ffb19d; border-radius: 0.5rem"
                    >Checkout</b-button
                  >
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>

      <b-modal
        id="modalPayment"
        modal-class="border-0 rounded"
        hide-header
        hide-footer
      >
        <div class="px-4">
          <h3 class="py-5 text-center"><b>Payment Process</b></h3>
          <b-row class="pt-5 text-center justify-content-center"> </b-row>
          <b-row class="text-center justify-content-center">
            <b-col cols="6">
              <p><b>Do You Want to Process?</b></p>
            </b-col>
          </b-row>
          <b-row class="pt-5 pb-3 justify-content-center">
            <b-button
              @click="hideModal"
              class="cancel text-center py-2 px-5 border-0 font-weight-bold"
              style="
                background-color: white;
                text-decoration: none;
                color: #ffb19d;
              "
            >
              Cancel
            </b-button>
            <b-button
              @click="handleOk"
              class="text-center py-2 px-5 font-weight-bold"
              style="background-color: #ffb19d; border-radius: 0.5rem"
            >
              Yes
            </b-button>
          </b-row>
        </div>
      </b-modal>
    </div>

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
  name: "ShoppingCart",
  data() {
    return {
      kabupaten: null,
      id: null,
      token: null,
      load: false,
      snackbar: false,
      error_message: "",
      fields: [
        { key: "product_name", sortable: true },
        { key: "price", sortable: true },
        { key: "quantity", sortable: true },
        { key: "total", sortable: true },
        { key: "actions" },
      ],
      user: new FormData(),
      users: [],
      uOrder: new FormData(),
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
      foods: [],
      optionsPayment: [],
      i: 0,
      subtotal: 0,
      grantTotal: 0,
      totalArr: [],
      placeorder: [],
      placeorders: null,
      transaction: new FormData(),
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("modalPayment");
    },
    handleOk() {
      this.checkPayment();
    },
    readDataOrder() {
      var url = this.$api + "/orderuser/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.placeorder = response.data.data;
          this.setPrice(this.placeorder);
        });
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getTotal() {
      var i = 0;
      while (i < this.foods.length) {
        this.foods.totalPrice = this.foods.price * this.foods.quantity;
        this.totalArr.push({ items: this.foods.totalPrice[i] });
      }
      console.log(this.foods.length);
    },
    updateOrderMinus(data) {
      this.placeorders = data.item;
      if (this.placeorders.quantity > 1) {
        this.uOrder.append("product_name", this.placeorders.product_name);
        this.uOrder.append("price", this.placeorders.price);
        this.uOrder.append("quantity", -1);
        this.uOrder.append("id_user", this.placeorders.id_user);
        this.uOrder.append("id_product", this.placeorders.id_product);
        console.log(this.uOrder);

        var url = this.$api + "/placeorder";
        this.load = true;
        this.$http
          .post(url, this.uOrder, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.readDataOrder();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    updateOrderPlus(data) {
      this.placeorders = data.item;

      this.uOrder.append("product_name", this.placeorders.product_name);
      this.uOrder.append("price", this.placeorders.price);
      this.uOrder.append("quantity", 1);
      this.uOrder.append("id_user", this.placeorders.id_user);
      this.uOrder.append("id_product", this.placeorders.id_product);
      console.log(this.uOrder);

      var url = this.$api + "/placeorder";
      this.load = true;
      this.$http
        .post(url, this.uOrder, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readDataOrder();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
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
    setPrice(placeorder) {
      this.subtotal = 0;
      this.grantTotal = 0;
      for (let index = 0; index < placeorder.length; index++) {
        this.subtotal = placeorder[index].total + this.subtotal;
      }
      this.grantTotal = this.subtotal;
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push({
        name: "home",
      });
      console.log(localStorage.getItem("id"));
    },
    deleteOrder(data) {
      console.log(data);
      var url = this.$api + "/placeorder/" + data.item.id;

      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readDataOrder();
        })
        .catch((error) => {
          this.error_message = error.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    checkPayment() {
      console.log("test");
      this.transaction.append("id_user", localStorage.getItem("id"));
      console.log(this.transaction);

      var url = this.$api + "/transaction";
      this.load = true;
      this.$http
        .post(url, this.transaction, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
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
          this.load = false;
        });
    },
  },
  mounted() {
    this.readDataUser();
    this.readDataOrder();
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 1rem !important;
}
::v-deep table {
  color: #ffb19d;
}
.mr-n5,
.mx-n5 {
  margin-right: -8rem !important;
}
::v-deep .table td,
.table th {
  vertical-align: middle;
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