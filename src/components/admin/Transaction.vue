<template>
  <body>
    <div>
      <h1
        id="accountTitle"
        class="d-flex justify-content-between align-items-center"
      >
        Transaction
        <div class="admin">
          <b-icon icon="person-circle"></b-icon>
          Admin
        </div>
      </h1>
      <br />
      <br /><br />

      <b-table
        class="tabelUser"
        striped
        hover
        :items="transaction"
        :fields="fields"
        :borderless="borderless"
      >
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
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
      dialognote: false,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      heading: "Daebak's Transaction History",
      fields: [
        "no",
        { key: "product_name", label: "Product Name" },
        { key: "sold_items", label: "Sold Items" },
        { key: "total", label: "Total(Rp)" },
      ],
      transaction: [],
      form: {
        product_name: null,
        sold: null,
        total: null,
      },
      deleteId: "",
      editId: "",
      borderless: true,
    };
  },
  methods: {
    save() {
      this.items.push(this.form);
      this.cancel();
    },
    cancel() {
      this.resetForm();
      this.dialog = false;
      this.edititem = null;
      this.adding = true;
      this.dialogdel = false;
      this.dialognote = false;
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
      var url = this.$api + "/transaction";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.transaction = response.data.data;
          console.log(this.transaction);
        });
    },
  },
  computed: {},
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