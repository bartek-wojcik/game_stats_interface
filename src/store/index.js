import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

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
      state.currentTab = newTab
    },
    updateCurrentPlayer (state, newPlayer) {
      state.currentPlayer = newPlayer
    },
    updateComparePlayer (state, newPlayer) {
      state.comparePlayer = newPlayer
    },
    updateDates (state, newDates) {
      state.dates = newDates
    },
    updateGames (state, newGames) {
      state.games = newGames;
    },
    updateCurrentGame (state, newGame) {
      state.currentGame = newGame
    },
    updateCurrentGameById (state, id) {
      state.currentGame = state.games.find(game => game.id === id)
    },
    updateAchievements (state, achievements) {
      state.achievements = achievements
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
    currentGame: state => state.currentGame,
    games: state => state.games,
    dates: state => state.dates,
    currentPlayer: state => state.currentPlayer,
    comparePlayer: state => state.comparePlayer,
    currentTab: state => state.currentTab,
  }
})
