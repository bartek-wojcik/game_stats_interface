<template>
  <div v-if="joinedAchievements.length">
    <div class="columns is-multiline">
      <div class="column is-narrow" v-for="achievement in joinedAchievements" :key="achievement.name">
        <b-tooltip class="full-width" :label="achievement.description" top multilined>
          <figure class="image is-64x64">
          <img :class="{grey: !achievement.achieved}" :src="achievement.icon"/>
          </figure>
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
      joinedAchievements: function () {
        return this._.zipWith(this.playerAchievements, this.achievements, this.merge)
      }
    },
    methods: {
      merge: (obj1, obj2) => ({...obj1, ...obj2}),
      updatePlayerAchievements: function () {
        // eslint-disable-next-line no-console
        console.log(this.currentGame.id);
        // eslint-disable-next-line no-console
        console.log(this.player.id);
        if (this.currentGame.id && this.player.id) {
          this.$http.get(`playerachievements?game=${this.currentGame.id}&player=${this.player.id}`).then((response) => {
            this.playerAchievements = response.data
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
