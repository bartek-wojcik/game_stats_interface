<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column">
        <player-search/>
      </div>
      <div class="column">
        <game-selector/>
      </div>
      <div class="column">
        <player-search player-type="comparePlayer"/>
      </div>
    </div>
  </section>
</template>

<script>
  import PlayerSearch from "./PlayerSearch";
  import GameSelector from "./GameSelector";
  export default {
    name: "CompareTab",
    components: {GameSelector, PlayerSearch}
  }
</script>

<style scoped>

</style>
