<template>
  <GChart
    v-if="gameStats.length"
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "GameStatsPlot",
    data() {
      return {
        gameStats: [],
        chartOptions: {
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
      ]),
      chartData: function () {
        const header = [['Date', 'Users']];
        return header.concat(this.gameStats.filter(
          record => record.game === this.currentGame.id
        ).map(
          record => [new Date(record.date), record.users])
        );
      }
    },
    methods: {
      getGameStats: function () {
        this.$http.get('globalstats').then((response) => this.gameStats = response.data)
      }
    },
    beforeMount() {
      this.getGameStats();
    }
  }
</script>

<style scoped>

</style>
