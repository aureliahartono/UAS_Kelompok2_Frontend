<template>
  <router-view> </router-view>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");
:root {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
}
body {
  font-family: "Open Sans", sans-serif;
  font-weight: normal;
  color: #ffb19d !important;
  background-color: #f3f1f0 !important;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  display: none;
}

::-webkit-scrollbar-thumb {
  background: #ffb19d;
}

::-webkit-scrollbar-thumb:hover {
  background: #d8907e;
  cursor: pointer;
}

.navbar-light .navbar-brand {
  color: #ffb19d !important;
}

.navbar-light .navbar-nav .nav-link.active {
  color: #ffb19d !important;
}

.btn:hover {
  background-color: #e48c71 !important;
  text-decoration: none;
}

a {
  transition: color 0.3s ease-in-out;
}

.input-group-text {
  color: #ffb19d;
  background-color: #fff5f1 !important;
  border-color: #fff5f1 !important;
  border-radius: 0.5rem 0 0 0.5rem !important;
}

input {
  color: #ffb19d;
  background-color: #fff5f1 !important;
  border: none !important;
}

.form-control {
  border: 1px solid #fff5f1;
  border-radius: 0 0.5rem 0.5rem 0 !important;
  background-color: #fff5f1 !important;
}

#page {
  background-color: #f3f1f0 !important;
  padding-left: 10%;
}

.DatMas {
  text-align: center;
  color: #ffb19d;
  font-size: 100%;
  font-weight: bold;
}

.sidebar {
  background-color: #ffb19d;
  border-radius: 0% 10% 10% 0%;
}

.iconForm {
  color: #ffb19d;
  position: relative;
  top: 30px;
}

.logout {
  text-align: center;
  color: #ffb19d;
  font-size: 100%;
  font-weight: bold;
}

#listHam {
  position: absolute;
  left: 0px;
  right: 0px;
  padding-bottom: 45%;
  padding-right: 5%;
  border-radius: 0% 10% 10% 0%;
  background-color: #ffb19d;
}

.titleProduct {
  text-align: center;
  font-weight: bold;
  color: #ffb19d;
  font-size: 30px;
}

.modDel {
  font-weight: 900;
  color: #ffb19d;
  text-align: center;
}

.admin {
  padding-right: 15%;
}

#accountTitle {
  color: #ffb19d;
  font-size: 200%;
  font-weight: bold;
  padding-top: 2%;
}

.tabelUser {
  color: #ffb19d;
}

.iconEdit {
  color: #c5e7b8;
}

.iconDelete {
  color: #d9534f;
}

.editForm {
  color: #ffb19d;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
}

.saveBtn {
  color: #ffb19d;
}
</style>
