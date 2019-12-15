<template>
  <b-tabs type="is-boxed" expanded>
    <b-tab-item label="Global stats" icon="earth">
      <game-stats/>
    </b-tab-item>
    <b-tab-item label="Player stats" icon="account">
      <player-stats/>
    </b-tab-item>
    <b-tab-item label="Compare stats" icon="compare">
      <compare-players/>
    </b-tab-item>
  </b-tabs>
</template>

<script>
  import GameStats from "./GameStats";
  import PlayerStats from "./PlayerStats";
  import ComparePlayers from "./ComparePlayers";
  export default {
    name: "Cards",
    components: {ComparePlayers, PlayerStats, GameStats}
  }
</script>

<style scoped>

</style>
