<template>
  <div id="app">
    <navbar/>
    <section class="section">
      <div class="columns">
        <div class="column">
          <game-selector/>
        </div>
        <div class="column">
          <date-selector/>
        </div>
      </div>
      <test-plot/>
      <player-search/>
      <player-search player-type="comparePlayer"/>
      <player-stats-plot/>
    </section>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import TestPlot from "./components/GameStatsPlot";
  import DateSelector from "./components/DateSelector";
  import GameSelector from "./components/GameSelector";
  import PlayerSearch from "./components/PlayerSearch";
  import PlayerStatsPlot from "./components/PlayerStatsPlot";

  export default {
    name: 'app',
    components: {
      PlayerStatsPlot,
      PlayerSearch,
      GameSelector,
      DateSelector,
      TestPlot,
      Navbar,
    },
    beforeMount() {
      this.$store.dispatch('getGames')
    }
  }
</script>

<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #8c67ef;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
