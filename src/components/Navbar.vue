<template>
  <b-navbar>
    <template slot="brand">
      <a class="navbar-item">
        <b-tag
          type="is-primary"
          size="is-medium"
        >GAME STATS</b-tag>
      </a>
    </template>
    <template slot="end">
      <a class="navbar-item" href="https://github.com/anewil" target="_blank">
        <button class="button is-dark">
          <b-icon icon="github-box" size="is-medium"/>
          <span>Github</span>
        </button>
      </a>
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
