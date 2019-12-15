<template>
  <GChart
    v-if="gameStats.length && currentTab === 0"
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "GameStats",
    data() {
      return {
        gameStats: [],
        chartOptions: {
          chartArea: {
            width: '100%',
          },
          height: 700,
          title: 'Date vs Users',
          curveType: 'function',
          trendlines: {
            0: {
              type: 'linear',
              color: 'red',
              visibleInLegend: true,
              labelInLegend: 'Trend',
              tooltip: false,
            }
          },
          vAxis: {
            viewWindow: {
              min: 0,
            },
          },
        },
      }
    },
    computed: {
      ...mapGetters([
        'currentGame',
        'dates',
        'currentTab',
      ]),
      chartData: function () {
        const data = this.gameStats.map(
          record => [new Date(record.date), record.users]
        ).filter(
          record => record[0] >= this.dates[0] && record[0] <= this.dates[1]
        );
        if (!data.length) {
          return []
        }
        return [['Date', 'Users']].concat(data);
      }
    },
    methods: {
      getGameStats: function () {
        if (this.currentGame && this.currentGame.id) {
          this.$http.get(`globalstats?game=${this.currentGame.id}`).then((response) => this.gameStats = response.data)
        }
      }
    },
    watch: {
      'currentGame.id': function () {
        this.getGameStats();
      }
    }
  }
</script>

<style scoped>

</style>