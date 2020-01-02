<template>
  <b-field label="Select a game">
    <b-select
      expanded
      v-model="currentGameId"
      placeholder="Click to select...">
      <option
        v-for="game in games"
        :value="game.id"
        :key="game.id">
        {{ game.name}}
      </option>
    </b-select>
  </b-field>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "GameSelector",
    computed: {
      currentGameId: {
        get () {
          return this.$store.state.currentGame.id
        },
        set (value) {
          this.$store.dispatch('updateGameAndAchievements', value);
        }
      },
      ...mapGetters([
        'games',
        'currentPlayer',
      ]),
    },
  }
</script>

<style scoped>

</style>
