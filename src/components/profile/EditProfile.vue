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
                {{ users.name }}
              </template>
              <b-dropdown-group>
                <b-dropdown-item to="/profile" class="text-center">
                  <h6 class="text-center font-weight-bold">
                    {{ users.name }}
                  </h6>
                  <p>{{ users.email }}</p>
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

    <div id="editProfile">
      <b-container class="align-self-center">
        <b-card
          class="rounded shadow-lg border-0 px-4 container"
          style="width: 70%"
        >
          <div class="d-flex flex-wrap">
            <b-img
              :src="'/Home' + form.image"
              width="200"
              class="mr-3 rounded-circle"
            ></b-img>
            <div class="selectPhoto">
              <label
                id="changePicture"
                for="file-upload"
                class="btn btn-light py-2 px-3 shadow border-0"
                style="margin-top: 0"
              >
                <b-icon icon="pencil-fill" class="mr-3"></b-icon><b>Change</b>
              </label>
              <b-form-file
                id="file-upload"
                v-model="uploadImage"
                style="display: none"
              ></b-form-file>
              <label id="file-name"></label>
            </div>
          </div>
          <h1 class="py-4"><b> Edit Profile </b></h1>
          <b-form ref="form" @submit.stop.prevent="handleSubmit"
            >'

            <b-form-group
              :state="state"
              invalid-feedback="Name is required"
              class="pb-1 border-0"
            >
              <b-input-group class="">
                <b-input-group-prepend is-text class="text">
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  placeholder="Your Full Name"
                  v-model="form.name"
                  :state="state"
                  required
                  type="text"
                  class="border-0"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-row>
              <b-col md="6" class="">
                <br />
                <b-form-group description="Sorry, email can't be changed.">
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon
                        icon="envelope-fill"
                        style="color: #000000"
                      ></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      placeholder="Email"
                      v-model="form.email"
                      class="text-muted"
                      required
                      type="email"
                      disabled
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col md="6" class="">
                <br />
                <b-form-group
                  :state="state"
                  invalid-feedback="Phone number is required"
                >
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon icon="telephone-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      placeholder="Phone Number"
                      v-model="form.telp"
                      :state="state"
                      pattern="^08[0-9]{8,10}"
                      minlength="10"
                      maxlength="12"
                      required
                      type="text"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>

            <br />
            <b-form-group
              :state="state"
              invalid-feedback="Address is required"
              class="pb-1 border-0 mb-3"
            >
              <b-input-group class="">
                <b-input-group-prepend is-text class="text">
                  <b-icon icon="house-door-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-textarea
                  placeholder="Address"
                  v-model="form.address"
                  :state="state"
                  required
                  class="border-0"
                >
                </b-form-textarea>
              </b-input-group>
            </b-form-group>

            <b-form-row class="pt-5 pb-3 float-right">
              <b-button
                to="/profile"
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
                @click="update"
                class="text-center py-2 px-5 font-weight-bold"
                style="background-color: #ffb19d; border-radius: 0.5rem"
              >
                Save
              </b-button>
            </b-form-row>
          </b-form>
        </b-card>
      </b-container>
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
import router from "@/router";

export default {
  name: "EditProfile",
  data() {
    return {
      name: "Coba",
      email: "aaa@gmail.com",
      phone: "081234567890",
      address: "Jalan Yuk",
      password: "a1b2c3d45",
      state: null,
      id: null,
      token: null,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      user: new FormData(),
      users: [],
      form: {
        name: null,
        email: null,
        password: null,
        newPassword: null,
        confirmPassword: null,
        telp: null,
        address: null,
        image: null,
      },
      deleteId: "",
      editId: "",
      uploadImage: null,
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
          this.form = response.data.data;
          console.log(this.form);
        });
    },
    imageChanged(e) {
      console.log(e.target.files[0]);
      var fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e) => {
        this.uploadImage = e.target.result;
      };
      console.log(this.uploadImage);
    },
    update() {
      let newData = {
        name: this.form.name,
        email: this.form.email,
        image: this.uploadImage,
        telp: this.form.telp,
        address: this.form.address,
      };
      var url = this.$api + "/user/" + this.id;
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
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });

      let item = new FormData();
      item.append("image", this.uploadImage);
      console.log(item);
      url = this.$api + "/changeprofile/" + this.form.id;
      this.load = true;
      this.$http
        .post(url, item, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
      this.$router.push({
        name: "profile",
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
    save() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.resetForm();
      this.password = this.newPassword;
      this.$nextTick(() => {
        router.back();
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.state = valid;
      return valid;
    },
    resetForm() {
      this.oldPassword = "";
      this.newPassword = "";
      this.state = null;
    },
  },
  mounted() {
    this.readDataUser();
  },
};
</script>

<style scoped>
#editProfile {
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
::v-deep #modalPassword {
  border: none !important;
  border-radius: 1rem !important;
}
#editProfile #changePicture {
  color: #ffb19d !important;
  position: absolute;
  left: 163px;
  top: 47px;
  text-align: center;
  border-radius: 30px 30px 30px 30px;
  padding: 5px 10px;
  font-size: 13px;
}
#editProfile #changePicture:hover {
  background-color: #c4c8e5 !important;
}
</style>