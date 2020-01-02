<template>
  <section>
    <nav class="level">
      <div class="level-item" v-show="currentPlayer.id">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="currentPlayer.avatar">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <strong>{{currentPlayer.nickname}}</strong>
              <br>
              <div @click="openSteam(currentPlayer.id)">
                <b-taglist attached>
                  <b-tag type="is-dark">Steam profile</b-tag>
                  <b-tag type="is-info">
                    <b-icon
                      icon="steam"
                      size="is-small">
                    </b-icon>
                  </b-tag>
                </b-taglist>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="level-item" v-show="comparePlayer.id">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <strong>{{comparePlayer.nickname}}</strong>
              <br>
              <div @click="openSteam(comparePlayer.id)">
                <b-taglist attached>
                  <b-tag type="is-dark">Steam profile</b-tag>
                  <b-tag type="is-info">
                    <b-icon
                      icon="steam"
                      size="is-small">
                    </b-icon>
                  </b-tag>
                </b-taglist>
              </div>
            </div>
          </div>
          <figure class="media-right">
            <p class="image is-64x64">
              <img :src="comparePlayer.avatar">
            </p>
          </figure>
        </article>
      </div>
    </nav>
    <b-table
      v-if="comparedStats.length"
      :data="comparedStats"
      :paginated="true"
      :per-page="perPage"
      :current-page.sync="currentPage"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column field="currentPlayer" :label="`Value (${currentPlayer.nickname})`" sortable centered :class="props.row.currentColor">
          {{ props.row.currentPlayer }}
        </b-table-column>

        <b-table-column field="name" label="Name" sortable centered>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="comparePlayer" :label="`Value (${comparePlayer.nickname})`" sortable centered :class="props.row.compareColor">
          {{ props.row.comparePlayer }}
        </b-table-column>

      </template>
    </b-table>
    <div class="columns">
      <div class="column">
        <player-achievements/>
      </div>
      <div class="column">
        <player-achievements player-type="comparePlayer"/>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import PlayerAchievements from "./PlayerAchievements";

  export default {
    name: "ComparePlayers",
    components: {PlayerAchievements},
    data: () => {
      return {
        comparedStats: [],
        currentPage: 1,
        perPage: 10,
      }
    },
    computed: {
      ...mapGetters([
        'currentGame',
        'currentPlayer',
        'comparePlayer',
      ]),
    },
    methods: {
      merge: (obj1, obj2) => ({...obj1, ...obj2}),
      openSteam: function (id) {
        window.open(`https://steamcommunity.com/profiles/${id}`, "_blank");
      },
      getPlayersStats: async function () {
        if (this.currentGame.id) {
          let stats = {};

          for (const playerType of ['currentPlayer', 'comparePlayer']) {
            const data = await this.getPlayerStats(playerType);
            if (data.time) {
              if (!stats['playtime']) {
                stats['playtime'] = {}
              }
              stats['playtime'][playerType] = data.time
            }
            if (data.stats) {
              data.stats.forEach(stat => {
                if (!stats[stat.name]) {
                  stats[stat.name] = {}
                }
                stats[stat.name][playerType] = stat.value
              })
            }
          }
          this.comparedStats = Object.keys(stats).map(key => {
            const stat = stats[key];
            if (stat.currentPlayer > stat.comparePlayer) {
              stat.currentColor = 'has-text-success';
              stat.compareColor = 'has-text-danger';
            }
            if (stat.comparePlayer > stat.currentPlayer) {
              stat.compareColor = 'has-text-success';
              stat.currentColor = 'has-text-danger';
            }
            stat.name = key.split('_').join(' ');
            return stat;
          });
        }
      },
      getPlayerStats: async function (playerType = 'currentPlayer') {
        if (this[playerType].id) {
          return await this.$http.get(`playerstats?game=${this.currentGame.id}&player=${this[playerType].id}&last=True`).then(response => response.data)
        } else {
          return {}
        }
      }
    },
    watch: {
      'currentGame.id': function () {
        this.getPlayersStats();
      },
      'currentPlayer.id': function () {
        this.getPlayersStats();
      },
      'comparePlayer.id': function () {
        this.getPlayersStats();
      }
    },
  }
</script>

<style scoped>

</style>
