import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
moment.defaultFormat = "DD.MM.YYYY HH:mm";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dates: [moment().subtract(1, 'weeks').toDate(), moment().toDate()],
    games: [],
    achievements: [],
    currentGame: {},
    currentPlayer: {},
    comparePlayer: {},
    currentTab: 0,
  },
  mutations: {
    updateCurrentTab(state, newTab) {
      state.currentTab = newTab;
    },
    updateCurrentPlayer (state, newPlayer) {
      state.currentPlayer = newPlayer;
    },
    updateComparePlayer (state, newPlayer) {
      state.comparePlayer = newPlayer;
    },
    updateDates (state, newDates) {
      state.dates = newDates;
    },
    updateGames (state, newGames) {
      newGames.forEach(game => game.peak_date = moment(game.peak_date).format());
      state.games = newGames;
    },
    updateCurrentGame (state, newGame) {
      state.currentGame = newGame;
    },
    updateCurrentGameById (state, id) {
      state.currentGame = state.games.find(game => game.id === id);
    },
    updateAchievements (state, achievements) {
      state.achievements = achievements.filter(achievement => achievement.global_percent !== 0);
    }
  },
  actions: {
    getGames({commit, dispatch})  {
      this._vm.$http.get('games').then((response) => {
        commit('updateGames', response.data);
        if (response.data.length > 0) {
          dispatch('updateGameAndAchievements', response.data[0].id)
        }
      })
    },
    updateGameAndAchievements({commit}, value) {
      commit('updateCurrentGameById', value);
      this._vm.$http.get(`achievements?game=${value}`).then((response) => {
        commit('updateAchievements', response.data);
      })
    },
  },
  getters: {
    achievements: state => state.achievements,
    currentGame: state => state.currentGame,
    games: state => state.games,
    dates: state => state.dates,
    currentPlayer: state => state.currentPlayer,
    comparePlayer: state => state.comparePlayer,
    currentTab: state => state.currentTab,
  }
})
