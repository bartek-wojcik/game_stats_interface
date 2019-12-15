<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <game-selector/>
      </div>
      <div class="column">
        <date-selector/>
      </div>
      <div class="column">
        <player-search/>
      </div>
    </div>
    <player-stats/>
  </section>
</template>

<script>
  import PlayerSearch from "./PlayerSearch";
  import DateSelector from "./DateSelector";
  import GameSelector from "./GameSelector";
  import PlayerStats from "./PlayerStats";

  export default {
    name: "PlayerTab",
    components: {PlayerStats, GameSelector, DateSelector, PlayerSearch}
  }
</script>

<style scoped>

</style>
