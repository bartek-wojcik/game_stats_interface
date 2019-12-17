<template>
  <div>
    <div class="columns" v-if="playerStats.length">
      <div class="column is-four-fifths">
        <GChart
          v-if="currentTab === 1"
          type="LineChart"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      <div class="column is-one-fifth" v-if="lastStats">
        <b-table
          :data="lastStats"
          :paginated="true"
          :per-page="perPage"
          :current-page.sync="currentPage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page">

          <template slot-scope="props">
            <b-table-column field="name" label="Statistic" sortable>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="value" label="Value" sortable>
              {{ props.row.value }}
            </b-table-column>

          </template>
        </b-table>
      </div>
      <div class="column is-one-fifth" v-else>
        <b-message title="No data" type="is-info" has-icon :closable="false">
          No addtional data for this player
        </b-message>
      </div>
    </div>

    <b-message v-if="!currentPlayer.id" title="Player not selected" type="is-warning" has-icon :closable="false">
      To show data choose a player
    </b-message>
    <b-message v-if="currentPlayer.id && !playerStats.length" title="No data for this player" type="is-warning" has-icon
               :closable="false">
      {{currentPlayer.nickname}} has no data for {{currentGame.name}}
    </b-message>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import moment from 'moment'

  export default {
    name: "PlayerStats",
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        playerStats: [],
        chartOptions: {
          chartArea: {
            top: '5%',
          },
          height: 700,
          title: 'Date vs Playtime',
          trendlines: {
            0: {
              type: 'linear',
              color: 'red',
              visibleInLegend: true,
              labelInLegend: 'Trend',
              tooltip: false,
            }
          },
        },
      }
    },
    computed: {
      ...mapGetters([
        'currentGame',
        'currentPlayer',
        'currentTab',
        'dates',
      ]),
      chartData: function () {
        const data = this.playerStats.map(
          record => [new Date(record.date), moment.duration(record.time).asMinutes()]
        ).filter(
          record => record[0] >= this.dates[0] && record[0] <= this.dates[1]
        );
        if (!data.length) {
          return []
        }
        return [['Date', 'Playtime']].concat(data);
      },
      lastStats: function () {
        const statistics = this.playerStats.map(playerStats => playerStats.stats).reverse().find(stats => stats.length)
        if (statistics) {
          return statistics.map(stat => { stat.name = stat.name.split('_').join(' '); return stat });
        }
        return null
      }
    },
    methods: {
      getPlayerStats: function () {
        if (this.currentPlayer.id && this.currentGame.id) {
          this.$http.get(`playerstats?game=${this.currentGame.id}&player=${this.currentPlayer.id}`).then((response) => this.playerStats = response.data)
        }
      }
    },
    watch: {
      'currentGame.id': function () {
        this.getPlayerStats();
      },
      'currentPlayer.id': function () {
        this.getPlayerStats();
      }
    },
  }
</script>

<style scoped>

</style>
