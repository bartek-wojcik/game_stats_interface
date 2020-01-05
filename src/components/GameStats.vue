<template>
  <section>
    <b-message v-if="currentGame.average_playtime" title="Average playtime" type="is-info" :closable="false">
      Average person spends {{duration}} on this game!
    </b-message>
    <GChart
      v-if="gameStats.length && currentTab === 0"
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
    />
    <div class="columns is-multiline" v-if="achievements.length">
        <div class="column is-narrow" v-for="item in achievements" :key="item.name">
          <achievement :item="item"/>
          <br>
        </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import Achievement from "./Achievement";
  import * as  humanizeDuration from "humanize-duration";

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
      },
      duration: function () {
        return humanizeDuration(this.moment.duration(this.currentGame.average_playtime));
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
