<template>
  <section class="section">
    <div class="columns">
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
    name: "ComparePlayers",
    components: {GameSelector, PlayerSearch}
  }
</script>

<style scoped>

</style>
