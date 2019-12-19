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
    <player-achievements/>
  </section>
</template>

<script>
  import PlayerSearch from "./PlayerSearch";
  import DateSelector from "./DateSelector";
  import GameSelector from "./GameSelector";
  import PlayerStats from "./PlayerStats";
  import PlayerAchievements from "./PlayerAchievements";

  export default {
    name: "PlayerTab",
    components: {PlayerAchievements, PlayerStats, GameSelector, DateSelector, PlayerSearch}
  }
</script>

<style scoped>

</style>
