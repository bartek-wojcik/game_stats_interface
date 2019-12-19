import Vue from 'vue'
import App from './App.vue'
import 'buefy/dist/buefy.css'
import Buefy from 'buefy'
import '@mdi/font/css/materialdesignicons.css'
import VueGoogleCharts from 'vue-google-charts'
import store from './store'
import axios from 'axios'
import VueLodash from 'vue-lodash'
import moment from 'moment'
moment.defaultFormat = "DD.MM.YYYY HH:mm";



Vue.use(VueLodash);
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});
Vue.config.productionTip = false;


const base = axios.create({
  baseURL: 'https://gamestats.bwojcik.pl/api/v1'
});

Vue.prototype.$http = base;
Vue.prototype.moment = moment;

Vue.use(VueGoogleCharts);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
