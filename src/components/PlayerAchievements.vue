<template>
  <div v-if="playerAchievements.length">
    <div class="columns is-multiline">
      <div class="column is-narrow" v-for="achievement in playerAchievements" :key="achievement.id">
        <b-tooltip class="full-width" :label="achievement.description" top multilined>
          <img :class="{grey: !achievement.achieved}" :src="achievement.icon"/>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "PlayerAchievements",
    data: () => {
      return {
        playerAchievements: [],
      }
    },
    props: {
      playerType: {
        type: String,
        default: 'currentPlayer'
      }
    },
    computed: {
      ...mapGetters([
        'currentGame',
        'achievements',
      ]),
      player: {
        get() {
          return this.$store.state[this.playerType]
        },
      },
    },
    methods: {
      merge: (obj1, obj2) => ({...obj1, ...obj2}),
      updatePlayerAchievements: function () {
        if (this.currentGame.id && this.player.id) {
          this.$http.get(`playerachievements?game=${this.currentGame.id}&player=${this.player.id}`).then((response) => {
            this.playerAchievements = this._.zipWith(response.data, this.achievements, this.merge)
          });
        }
      }
    },
    beforeMount() {
      this.updatePlayerAchievements();
    },
    watch: {
      'currentGame.id': function () {
        this.updatePlayerAchievements();
      },
      'player.id': function () {
        this.updatePlayerAchievements();
      }
    }
  }
</script>

<style scoped>
  .grey {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
</style>
