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
    <compare-players/>
  </section>
</template>

<script>
  import PlayerSearch from "./PlayerSearch";
  import GameSelector from "./GameSelector";
  import ComparePlayers from "./ComparePlayers";

  export default {
    name: "CompareTab",
    components: {ComparePlayers, GameSelector, PlayerSearch}
  }
</script>

<style scoped>

</style>
