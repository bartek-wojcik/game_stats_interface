<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <game-selector/>
      </div>
      <div class="column">
        <date-selector/>
      </div>
    </div>
    <game-stats-plot/>
  </section>
</template>

<script>
  import GameSelector from "./GameSelector";
  import DateSelector from "./DateSelector";
  import GameStatsPlot from "./GameStatsPlot";
  export default {
    name: "GameStats",
    components: {GameStatsPlot, DateSelector, GameSelector}
  }
</script>

<style scoped>

</style>
