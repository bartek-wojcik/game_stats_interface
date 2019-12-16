<template>
  <b-field label="Search player">
    <b-autocomplete
      v-model="searchValue"
      placeholder="player nickname"
      :data="players"
      field="nickname"
      @input="refreshPlayers"
      @select="option => player = option">

      <template slot-scope="props">
        <div class="media">
          <div class="media-left">
            <img width="32" :src="props.option.avatar">
          </div>
          <div class="media-content">
            {{ props.option.nickname }}
          </div>
        </div>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>

  export default {
    name: "PlayerSearch",
    props: {
      playerType: {
        type: String,
        default: 'currentPlayer'
      }
    },
    data: () => {
      return {
        searchValue: '',
        players: [],
      }
    },
    methods: {
      refreshPlayers: function () {
        if (this.searchValue.length) {
          this.getPlayersByNickname()
        }
      },
      getPlayersByNickname: function () {
        this.$http.get(`players?search=${this.searchValue}`).then((response) => this.players = response.data)
      }
    },
    computed: {
      player: {
        get () {
          return this.$store.state[this.playerType]
        },
        set (value) {
          if (this.playerType === 'comparePlayer') {
            this.$store.commit(`updateComparePlayer`, value)
          } else {
            this.$store.commit(`updateCurrentPlayer`, value)
          }
        }
      },
    },
  }
</script>

<style scoped>

</style>
