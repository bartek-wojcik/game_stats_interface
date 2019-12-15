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
    <game-stats/>
  </section>
</template>

<script>
  import GameSelector from "./GameSelector";
  import DateSelector from "./DateSelector";
  import GameStats from "./GameStats";
  export default {
    name: "GlobalTab",
    components: {GameStats, DateSelector, GameSelector}
  }
</script>

<style scoped>

</style>
