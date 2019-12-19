<template>
  <section>
    <GChart
      v-if="gameStats.length && currentTab === 0"
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
    />
    <div class="columns" v-if="achievements.length">
      <div class="column" v-for="(column, index) in columns" :key="index">
        <div v-for="item in column" :key="item.name">
          <achievement :item="item"/>
          <br>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import Achievement from "./Achievement";

  export default {
    name: "GameStats",
    components: {Achievement},
    data() {
      return {
        cols: 4,
        gameStats: [],
        chartOptions: {
          height: 700,
          series: {
            0: {tooltip: true},
            1: {tooltip: false, enableInteractivity: false},
          },
          title: 'Date vs Users',
          curveType: 'function',
          colors: ['blue', 'green'],
          trendlines: {
            0: {
              type: 'linear',
              color: 'red',
              visibleInLegend: true,
              labelInLegend: 'Trend',
              tooltip: false,
              enableInteractivity: false
            },
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
        'achievements',
      ]),
      columns: function () {
        let columns = [];
        let mid = Math.ceil(this.achievements.length / this.cols);
        for (let col = 0; col < this.cols; col++) {
          columns.push(this.achievements.slice(col * mid, col * mid + mid))
        }
        return columns
      },
      chartData: function () {
        const data = this.gameStats.map(
          record => [new Date(record.date), record.users, this.currentGame.max_users]
        ).filter(
          record => record[0] >= this.dates[0] && record[0] <= this.dates[1]
        );
        if (!data.length) {
          return []
        }
        return [['Date', 'Users', `Peak ${this.currentGame.peak_date} \n ${this.currentGame.max_users} users`]].concat(data);
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
