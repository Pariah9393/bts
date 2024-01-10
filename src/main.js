import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { store } from './store';
import VueRouter from 'vue-router';
import axios from 'axios';
import Routes from './routes';

Vue.prototype.axios = axios;
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
});

new Vue({
  vuetify,
  render: (h) => h(App),
  store,
  router: router,
}).$mount('#app');
