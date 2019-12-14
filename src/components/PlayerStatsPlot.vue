<template>
  <GChart
    v-if="playerStats.length"
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import {mapGetters} from "vuex";
  import moment from 'moment'

  export default {
    name: "PlayerStatsPlot",
    data() {
      return {
        playerStats: [],
        chartOptions: {
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
      }
    },
    methods: {
      getPlayerStats: function () {
        if (this.currentPlayer && this.currentGame && this.currentPlayer.id && this.currentGame.id ) {
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
