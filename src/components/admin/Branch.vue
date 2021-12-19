<template>
  <body>
    <div>
      <h1
        id="accountTitle"
        class="d-flex justify-content-between align-items-center"
      >
        Branch
        <div class="admin">
          <b-icon icon="person-circle"></b-icon>
          Admin
        </div>
      </h1>
      <br />
      <b-button v-b-modal.modal-center variant="danger"
        ><b-icon icon="plus"></b-icon>Add Branch</b-button
      >
      <br /><br />

      <b-table
        class="tabelUser"
        striped
        hover
        :items="items"
        :fields="fields"
        :borderless="borderless"
      >
        <template #cell(action)="items">
          <b-button
            variant="link"
            class="iconEdit"
            @click="editItem(items.item)"
            v-b-modal.modal-center
          >
            <b-icon icon="pencil-fill"></b-icon>
          </b-button>

          <b-button
            variant="link"
            class="iconDelete"
            @click="deleteItem(items.item)"
            v-b-modal.modal-delete
          >
            <b-icon icon="X"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-modal
        v-model="dialog"
        hide-footer
        hide-header
        id="modal-center"
        centered
      >
        <b-card-title class="titleProduct">
          <span class="headline" v-if="adding == true">Add Branch</span>
          <span class="headline" v-else>Edit Branch</span>
        </b-card-title>
        <b-container>
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt-fill" style="color: #ffb19d"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              style="background-color: #fff5f1"
              v-model="form.branch_name"
              placeholder="Branch Name"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="globe2" style="color: #ffb19d"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              style="background-color: #fff5f1"
              v-model="form.location"
              placeholder="Location"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b style="color: #ffb19d"></b>
            </b-input-group-prepend>
            <b-form-input
              style="background-color: #fff5f1"
              v-model="form.manager"
              placeholder="Manager Name"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b style="color: #ffb19d"></b>
            </b-input-group-prepend>
            <b-form-input
              style="background-color: #fff5f1"
              v-model="form.contact"
              placeholder="Contact (email/telp)"
              required
            ></b-form-input>
          </b-input-group>

          <b-button
            v-if="adding == true"
            @click="save"
            style="background-color: #ffb19d; font-weight: bold"
            class="mr-1"
          >
            Save
          </b-button>
          <b-button
            v-else
            @click="edit"
            style="background-color: #ffb19d; font-weight: bold"
            class="mr-1"
          >
            Save
          </b-button>
          <b-button
            variant="light"
            style="color: #ffb19d"
            @click="cancel"
            class="mr-1"
            >Cancel</b-button
          >
        </b-container>
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

      <b-alert
        v-model="snackbar"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000"
        variant="Success"
        dismissible
        >{{ error_message }}</b-alert
      >
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      adding: true,
      edititem: null,
      dialog: false,
      dialogdel: false,
      snackbar: false,
      error_message: null,
      variant: null,
      busy: true,
      fields: [
        { key: "branch_name", label: "Branch Name" },
        { key: "location", label: "Location" },
        { key: "manager", label: "Manager Name" },
        { key: "contact", label: "Contact" },
        { key: "action", label: "Action" },
      ],
      item: new FormData(),
      items: [],
      form: {
        id: null,
        branch_name: null,
        location: null,
        manager: null,
        contact: null,
      },
      detail: {
        branch_name: null,
        location: null,
        manager: null,
        contact: null,
      },
      deleteId: "",
      editId: "",
      borderless: true,
    };
  },
  beforeMount() {
    this.readData();
  },
  methods: {
    readData() {
      var url = this.$api + "/branch";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.items = response.data.data;
        });
    },
    save() {
      this.item = new FormData();
      this.item.append("branch_name", this.form.branch_name);
      this.item.append("location", this.form.location);
      this.item.append("manager", this.form.manager);
      this.item.append("contact", this.form.contact);

      var url = this.$api + "/branch";
      this.load = true;
      this.$http
        .post(url, this.item, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.variant = "Success";
          this.snackbar = true;
          this.load = false;
          this.readData();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.variant = "Danger";
          this.snackbar = true;
        });

      this.cancel();
    },
    cancel() {
      this.resetForm();
      this.dialog = false;
      this.edititem = null;
      this.adding = true;
      this.dialogdel = false;
      this.$bvModal.hide("modal-center");
    },
    deleteItem(item) {
      this.dialogdel = true;
      this.deleteId = item.id;
    },
    confirmdelete() {
      var url = this.$api + "/branch/" + this.deleteId;
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
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
      this.dialogdel = false;
    },
    editItem(item) {
      this.adding = false;
      this.form.branch_name = item.branch_name;
      this.form.location = item.location;
      this.form.manager = item.manager;
      this.form.contact = item.contact;
      this.dialog = true;
      this.form.id = item.id;
    },
    edit() {
      let newData = {
        branch_name: this.form.branch_name,
        location: this.form.location,
        manager: this.form.manager,
        contact: this.form.contact,
      };

      var url = this.$api + "/branch/" + this.form.id;
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
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });

      this.cancel();
    },
    resetForm() {
      this.form.branch_name = null;
      this.form.location = null;
      this.form.manager = null;
      this.form.contact = null;
    },
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