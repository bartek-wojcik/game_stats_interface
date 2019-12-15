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
    <player-stats-plot/>
  </section>
</template>

<script>
  import PlayerSearch from "./PlayerSearch";
  import DateSelector from "./DateSelector";
  import GameSelector from "./GameSelector";
  import PlayerStatsPlot from "./PlayerStatsPlot";

  export default {
    name: "PlayerStats",
    components: {PlayerStatsPlot, GameSelector, DateSelector, PlayerSearch}
  }
</script>

<style scoped>

</style>
