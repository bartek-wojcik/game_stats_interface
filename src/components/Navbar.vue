<template>
  <b-navbar>
    <template slot="brand">
      <a class="navbar-item">
        <b-tag
          type="is-primary"
          size="is-medium"
        >GAME STATS</b-tag>
      </a>
      <a class="navbar-item" href="https://github.com/anewil" target="_blank">
        <b-icon icon="github-box" size="is-medium"/>
      </a>
    </template>
    <template slot="end">
      <b-navbar-item href="#">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped>

</style>
