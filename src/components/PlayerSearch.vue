<template>
  <div>
    <b-field>
      <template slot="label">
        Search Player
        <span class="has-text-info is-italic" @click="showAddPlayer = true">
        Can't find your nickname?
        <b-tooltip type="is-dark" label="Help text here for explanation">
          <b-icon size="is-small" icon="gesture-tap"></b-icon>
        </b-tooltip>
      </span>
      </template>
      <b-autocomplete
        v-model="search"
        placeholder="player nickname"
        :data="players"
        field="nickname"
        @input="refreshPlayers"
        @select="selectPlayer">
        expanded
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
    <b-modal :active.sync="showAddPlayer">
      <add-player/>
    </b-modal>
  </div>
</template>

<script>

  import {mapGetters} from "vuex";
  import AddPlayer from "./AddPlayer";

  export default {
    name: "PlayerSearch",
    components: {AddPlayer},
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
        showAddPlayer: false,
      }
    },
    methods: {
      selectPlayer: function (option) {
        if (option) {
          this.player = option
        }
        return this.player
      },
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
      ...mapGetters([
        'currentGame',
      ]),
      search: {
        get() {
          if (this.player.id) {
            return this.player.nickname;
          }
          return this.searchValue
        },
        set(value) {
          this.searchValue = value
        }
      },
      player: {
        get() {
          return this.$store.state[this.playerType]
        },
        set(value) {
          value.playerType = this.playerType;
          this.$store.dispatch('updatePlayer', value);
        }
      },
    },
  }
</script>

<style scoped>

</style>
