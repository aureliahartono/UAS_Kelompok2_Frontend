<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop width="500px" id="listHam"
      ><b-icon icon="list"></b-icon
    ></b-button>
    <b-sidebar
      id="sidebar-backdrop"
      aria-labelledby="sidebar-no-header-title"
      no-header
      backdrop-variant="transparent"
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <div class="sidebar">
          <div class="daebak">
            <img
              style="position: relative"
              src="../assets/logo.png"
              width="50"
              height="50"
            />
            Daebak ______________
          </div>
          <br /><br /><br /><br />

          <nav class="DatMas">
            <b-nav-item to="/adminuser" @click="hide">
              <div class="warnaDL">
                <b-icon icon="person-fill"></b-icon>
                <span style="color: #ffb19d">______</span>User
              </div> </b-nav-item
            ><br />
            <b-nav-item to="/adminproducts" @click="hide">
              <div class="warnaDL">
                <b-icon icon="archive-fill"></b-icon>
                <span style="color: #ffb19d">______</span>Product
              </div> </b-nav-item
            ><br />
            <b-nav-item to="/admintransaction" @click="hide">
              <div class="warnaDL">
                <b-icon icon="cart-3" flip-h></b-icon>
                <span style="color: #ffb19d">____</span>Transaction
              </div> </b-nav-item
            ><br />
            <b-nav-item to="/adminbranch" @click="hide">
              <div class="warnaDL">
                <b-icon icon="geo-alt-fill"></b-icon>
                <span style="color: #ffb19d">_______</span>Branch
              </div> </b-nav-item
            ><br />
          </nav>

          <br /><br /><br /><br /><br /><br />
          <nav class="logout">
            <b-nav-item to="/login" @click="logout()">
              <div class="warnaDL">
                <b-icon icon="box-arrow-in-right"></b-icon>
                Logout
              </div>
            </b-nav-item>
          </nav>
        </div>
      </template>
    </b-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      drawer: true,
      items: [
        { name: "adminuser", to: "/adminuser", icon: "person-fill" },
        { name: "adminproducts", to: "/adminproducts" },
        { name: "admintransaction", to: "/admintransaction" },
        { name: "adminbranch", to: "/adminbranch" },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
.warnaDL {
  color: white;
}

.daebak {
  font-weight: bold;
  font-size: 30px;
  color: white;
  padding-top: 80px;
  padding-left: 70px;
}
</style>