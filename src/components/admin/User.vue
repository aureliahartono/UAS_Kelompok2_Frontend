<template>
  <body>
    <div>
      <h1
        id="accountTitle"
        class="d-flex justify-content-between align-items-center"
      >
        User Account
        <div class="admin">
          <b-icon icon="person-circle"></b-icon>
          Admin
        </div>
      </h1>
      <br /><br /><br />

      <b-table
        class="tabelUser"
        striped
        hover
        :items="users"
        :fields="fields"
        :borderless="borderless"
      >
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(action)="item">
          <b-button
            variant="link"
            class="iconEdit"
            @click="editItem(item)"
            v-b-modal.modal-center
          >
            <b-icon icon="pencil-fill"></b-icon>
          </b-button>

          <b-button
            variant="link"
            class="iconDelete"
            @click="deleteItem(item)"
            v-b-modal.modal-delete
          >
            <b-icon icon="X"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-modal hide-footer hide-header id="modal-center" centered>
        <div class="editForm">Edit User Account</div>
        <b-icon icon="person-fill" class="iconForm"></b-icon>
        <b-form-input
          style="background-color: #fff5f1"
          type="text"
          v-model="form.name"
          placeholder="   Name"
          required
        >
        </b-form-input>

        <b-icon icon="envelope-fill" class="iconForm"></b-icon>
        <b-form-input
          v-model="form.email"
          placeholder="   Email"
          disabled
        ></b-form-input>
        <div style="color: #cdcfde">Can't change email</div>
        <b-icon icon="telephone-fill" class="iconForm"></b-icon>
        <b-form-input
          style="background-color: #fff5f1"
          v-model="form.telp"
          placeholder="   Phone"
          required
        ></b-form-input>

        <b-icon icon="credit-card2-front-fill" class="iconForm"></b-icon>
        <b-form-textarea
          style="background-color: #fff5f1"
          v-model="form.address"
          placeholder="   address"
          required
          no-resize
        >
        </b-form-textarea>
        <br />
        <b-button
          @click="save(form)"
          style="background-color: #ffb19d; font-weight: bold"
          class="mr-1"
          >save</b-button
        >
        <b-button
          variant="light"
          style="color: #ffb19d; font-weight: bold"
          @click="cancel"
          class="mr-1"
          >cancel</b-button
        >
      </b-modal>
      <b-modal
        v-model="dialogdel"
        hide-footer
        hide-header
        id="modal-delete"
        centered
      >
        <div class="modDel">
          <h1>Are you sure want to delete?</h1>
          <b-button
            variant="outline-danger"
            @click="confirmdelete"
            style="font-weight: bold"
            >Yes</b-button
          >
          <b-button
            variant="outline-light"
            @click="cancel"
            style="font-weight: bold; color: #ffb19d"
            >No</b-button
          >
        </div>
      </b-modal>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      edititem: null,
      dialog: false,
      dialogdel: false,
      busy: true,
      fields: [
        "no",
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "action", label: "Action" },
      ],
      items: [
        {
          no: 1,
          name: "JK",
          email: "jk@gmail.com",
          username: "JKlmnop1",
          action: "",
        },
        {
          no: 2,
          name: "Jin",
          email: "jin@gmail.com",
          username: "jin12345",
          action: "",
        },
      ],
      form: {
        name: null,
        email: null,
        password: null,
        telp: null,
        address: null,
        image: null,
      },
      users: [],
      user: new FormData(),
      detail: {
        name: null,
        email: null,
        password: null,
        telp: null,
        address: null,
        image: null,
      },
      deleteId: "",
      editId: "",
      borderless: true,
      id: null,
    };
  },
  methods: {
    cancel() {
      this.resetForm();
      this.dialog = false;
      this.edititem = null;
      this.adding = true;
      this.dialogdel = false;
      this.$bvModal.hide("modal-center");
    },
    deleteItem(item) {
      this.id = item.item.id;
      console.log(this.id);
      this.dialogdel = true;
      this.edititem = item;
    },
    confirmdelete() {
      var url = this.$api + "/user/" + this.id;
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.dialogdel = false;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readData();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editItem(item) {
      console.log(item);
      this.adding = false;
      this.id = item.item.id;
      (this.form.name = item.item.name),
        (this.form.email = item.item.email),
        (this.form.password = item.item.password),
        (this.form.telp = item.item.telp),
        (this.form.address = item.item.address),
        (this.dialog = true);
      this.edititem = item;
    },
    save(form) {
      console.log(form);
      let newData = {
        name: this.form.name,
        email: this.form.email,
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
          this.readData();
          this.resetForm();
          this.$bvModal.hide("modal-center");
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    resetForm() {
      this.form = {
        name: null,
        email: null,
        password: null,
        telp: null,
        address: null,
      };
    },
    readData() {
      var url = this.$api + "/user";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data.data;
          console.log(this.users);
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style scoped>
body {
  background-color: #f3f1f0 !important;
  padding-left: 12%;
  padding-right: 3%;
}
</style>