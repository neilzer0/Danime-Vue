<template>
  <footer class="navbar navbar-expand-lg navbar-dark">
    <div class="container-xl d-flex justify-content-around">
      <router-link replace :to="'/'" class="navbar-brand"
        >Danime.com</router-link
      >
      <router-link replace :to="'/conditions'" class="navbar-brand">
        Terms and Conditions</router-link
      >
      <router-link replace :to="'/privacy'" class="navbar-brand">
        Privacy Policy</router-link
      >
      <router-link replace :to="'/delete-account'" class="navbar-brand">
        Delete account
      </router-link>
    </div>
  </footer>
</template>
