<template>
  <body>
    <div>
      <h1
        id="accountTitle"
        class="d-flex justify-content-between align-items-center"
      >
        Product
        <div class="admin">
          <b-icon icon="person-circle"></b-icon>
          Admin
        </div>
      </h1>
      <br />
      <b-button v-b-modal.modal-center variant="danger"
        ><b-icon icon="plus"></b-icon> Add Product</b-button
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
          <span class="headline" v-if="adding == true">Add Product</span>
          <span class="headline" v-else>Edit Product</span>
        </b-card-title>
        <b-container>
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="tag-fill" style="color: #ffb19d"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              style="background-color: #fff5f1"
              v-model="form.product_name"
              placeholder="Product name"
              required
              autofocus
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="tag-fill" style="color: #ffb19d"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              style="background-color: #fff5f1"
              v-model="form.desc"
              placeholder="Product Description"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="archive-fill" style="color: #ffb19d"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              style="background-color: #fff5f1"
              v-model="form.stock"
              placeholder="Stock"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b style="color: #ffb19d">Rp</b>
            </b-input-group-prepend>
            <b-form-input
              style="background-color: #fff5f1"
              v-model="form.price"
              placeholder="Price"
              required
              number
            ></b-form-input>
          </b-input-group>

          <b-form-file
            v-model="form.file1"
            class="mt-3"
            placeholder="Choose a file or drop it here..."
          ></b-form-file>
        </b-container>
        <br /><br />
        <b-button
          v-if="adding == true"
          @click="save"
          text
          style="background-color: #ffb19d; font-weight: bold"
          class="mr-1"
        >
          Save
        </b-button>
        <b-button
          v-else
          @click="edit"
          style="background-color: #ffb19d; font-weight: bold"
          text
          class="mr-1"
        >
          Save
        </b-button>
        <b-button
          variant="light"
          style="color: #ffb19d; font-weight: bold"
          @click="cancel"
          class="mr-1"
          >Cancel</b-button
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

      <b-alert
        v-model="snackbar"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000"
        variant="success"
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
      dialog: false,
      dialogdel: false,
      snackbar: false,
      error_message: "",
      color: "",
      busy: true,
      file1: null,
      fields: [
        { key: "product_name" },
        { key: "stock" },
        { key: "price" },
        { key: "action" },
        { key: "created_at", thClass: "d-none", tdClass: "d-none" },
      ],
      item: new FormData(),
      items: [],
      form: {
        product_name: null,
        desc: null,
        stock: null,
        price: null,
        file1: null,
        id: null,
      },
      detail: {
        product_name: null,
        desc: null,
        stock: null,
        price: null,
        file1: null,
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
      var url = this.$api + "/product";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.items = response.data.data;
          console.log(this.items);
        });
    },
    save() {
      this.item = new FormData();
      this.item.append("product_name", this.form.product_name);
      this.item.append("desc", this.form.desc);
      this.item.append("stock", this.form.stock);
      this.item.append("price", this.form.price);
      this.item.append("product_img", this.form.file1);

      var url = this.$api + "/product";
      this.load = true;
      this.$http
        .post(url, this.item, {
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
      var url = this.$api + "/product/" + this.deleteId;
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
      this.form.product_name = item.product_name;
      this.form.stock = item.stock;
      this.form.price = item.price;
      this.form.desc = item.desc;
      this.form.id = item.id;
      this.dialog = true;
      this.edititem = item;
    },
    edit() {
      let newData = {
        product_name: this.form.product_name,
        desc: this.form.desc,
        stock: this.form.stock,
        price: this.form.price,
      };

      var url = this.$api + "/product/" + this.form.id;
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

      let item = new FormData();
      item.append("product_img", this.form.file1);
      console.log(item);
      url = this.$api + "/product/product_img/" + this.form.id;
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

          this.close();
          this.readData();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });

      this.cancel();
    },
    resetForm() {
      this.form = {
        product_name: null,
        stock: null,
        price: null,
        file1: null,
      };
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style scoped>
.iconStyle {
  margin: 5px;
}
</style>

<style scoped>
body {
  background-color: #f3f1f0 !important;
  padding-left: 12%;
  padding-right: 3%;
}
</style>

<style scoped>
body {
  background-color: #f3f1f0 !important;
  padding-left: 12%;
  padding-right: 3%;
}
</style>