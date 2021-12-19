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
            <b-nav-item href="/products" class="pr-3">Products</b-nav-item>
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-nav-item-dropdown right>
              <template #button-content>
                {{ form.name }}
              </template>
              <b-dropdown-group>
                <b-dropdown-item to="/profile" class="text-center">
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

    <div id="profile">
      <b-container class="align-self-center">
        <b-card
          class="rounded shadow-lg border-0 px-4 container"
          style="width: 70%"
        >
          <div class="d-flex flex-wrap">
            <b-img
              :src="'' + form.image"
              width="200"
              class="mr-3 rounded-circle"
              v-if="form.image != null"
            ></b-img>
            <b-img
              :src="require('../../assets/user.png')"
              width="200"
              v-else
              class="mr-3 rounded-circle"
            ></b-img>

            <b-button
              id="btnChangePassword"
              v-b-modal="'modalPassword'"
              class="py-3 px-4 mx-4 align-self-center border-0 font-weight-bold"
              style="border-radius: 0.5rem"
            >
              <b-icon class="mr-3" icon="lock-fill"></b-icon>Change Password
            </b-button>

            <b-button
              id="btnEditProfile"
              to="/editprofile"
              class="py-3 px-4 align-self-center border-0 font-weight-bold"
              style="border-radius: 0.5rem"
            >
              <b-icon class="mr-3" icon="pencil-fill"></b-icon>Edit Profile
            </b-button>
          </div>
          <h1 class="pt-3">
            <b> {{ form.name }} </b>
          </h1>
          <h5 class="pt-3">
            <b>Email</b>
          </h5>
          <p>{{ form.email }}</p>
          <h5><b>Phone</b></h5>
          <p>{{ form.telp }}</p>
          <h5><b>Address</b></h5>
          <p>{{ form.address }}</p>
        </b-card>
      </b-container>
    </div>

    <b-modal
      id="modalPassword"
      modal-class="border-0 rounded"
      ref="modal"
      hide-header
      hide-footer
      centered
    >
      <div class="px-4">
        <h3 class="py-5 text-center"><b>Change Password</b></h3>
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="state"
            invalid-feedback="Old password is required"
            class="pb-1 border-0"
          >
            <b-input-group class="">
              <b-input-group-prepend is-text class="text">
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                placeholder="Old Password"
                v-model="formPassword.password"
                :state="state"
                min="8"
                required
                type="password"
                class="border-0"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <br />
          <b-form-group
            :state="state"
            invalid-feedback="New password is required"
          >
            <b-input-group>
              <b-input-group-prepend is-text class="text">
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                placeholder="New Password"
                v-model="formPassword.newPassword"
                :state="state"
                min="8"
                required
                type="password"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <br />
          <b-form-group
            :state="state"
            invalid-feedback="Confirm password is required"
          >
            <b-input-group>
              <b-input-group-prepend is-text class="text">
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                placeholder="Confirm Password"
                v-model="formPassword.confirmPassword"
                :state="state"
                min="8"
                required
                type="password"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-row class="pt-5 pb-3 float-right">
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
              @click="updatePassword"
              class="text-center py-2 px-5 font-weight-bold"
              style="background-color: #ffb19d; border-radius: 0.5rem"
            >
              Save
            </b-button>
          </b-form-row>
        </b-form>
      </div>
    </b-modal>

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
  name: "Profile",
  data() {
    return {
      id: null,
      token: null,
      name: "",
      email: "aaa@gmail.com",
      phone: "081234567890",
      address: "Jalan Yuk",
      password: "a1b2c3d4",
      oldPassword: "",
      newPassword: "",
      state: null,
      users: [],
      user: new FormData(),
      form: {
        name: "",
        email: "",
        telp: "",
        address: "",
        image: null,
      },
      formPassword: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    readData() {
      this.id = localStorage.getItem("id");
      console.log(this.id);
      var url = this.$api + "/user/" + this.id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data.data;
          console.log(this.user);
          this.form.name = this.users.name;
          this.form.email = this.users.email;
          this.form.telp = this.users.telp;
          this.form.address = this.users.address;
          this.form.image = this.users.image;
        });
    },
    updatePassword() {
      console.log(this.formPassword);
      let newData = {
        password: this.formPassword.password,
        newPassword: this.formPassword.newPassword,
        confirmPassword: this.formPassword.confirmPassword,
      };
      console.log(newData);
      this.id = localStorage.getItem("id");
      var url = this.$api + "/changepassword/" + this.id;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readData();
          this.resetModal();
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
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.state = valid;
      return valid;
    },
    resetModal() {
      this.formPassword.password = "";
      this.formPassword.newPassword = "";
      this.formPassword.confirmPassword = "";
      this.$bvModal.hide("modalPassword");
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.password = this.newPassword;
      this.$nextTick(() => {
        this.$bvModal.hide("modalPassword");
      });
    },
    hideModal() {
      this.resetModal();
      this.$bvModal.hide("modalPassword");
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style scoped>
#profile {
  padding-top: 10%;
  padding-bottom: 10%;
}
.card-body {
  margin-top: -16%;
}
.rounded {
  border-radius: 1rem !important;
}
#profile .d-flex #btnChangePassword {
  background-color: #ff7278;
}
#profile .d-flex #btnChangePassword:hover {
  background-color: #c63f43 !important;
}
#profile .d-flex #btnEditProfile {
  background-color: #ffb19d;
}
.form-row .cancel:hover {
  background-color: #ffff !important;
  color: #9b9ecb !important;
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
.form-row .cancel:hover {
  background-color: #ffff !important;
  color: #c4c8e5 !important;
}
</style>