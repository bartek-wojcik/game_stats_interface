import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dates: [moment().subtract(1, 'weeks').toDate(), moment().toDate()],
    games: [],
    currentGame: {},
    currentPlayer: {},
    comparePlayer: {},
  },
  mutations: {
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
    }
  },
  actions: {
    getGames(context)  {
      this._vm.$http.get('games').then((response) => {
        context.commit('updateGames', response.data);
        if (response.data.length > 0) {
          context.commit('updateCurrentGame', response.data[0])
        }
      })
    }
  },
  getters: {
    currentGame: state => state.currentGame,
    games: state => state.games,
    dates: state => state.dates,
    currentPlayer: state => state.currentPlayer,
    comparePlayer: state => state.comparePlayer,
  }
})
