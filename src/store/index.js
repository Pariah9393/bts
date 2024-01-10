import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    profiles: [],
  },
  mutations: {
    setProfiles(state, payload) {
      state.profiles = payload;
    },
  },
  getters: {
    getProfiles(state) {
      return state.profiles;
    },
  },
  actions: {
    fetchProfiles(context) {
      axios
        .get(process.env.VUE_APP_BASE_URL)
        .then((response) => context.commit('setProfiles', response.data));
    },
    fetchProfilesWithPagination(context, options) {
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            `?_page=${options.page}&_limit=${options.limit}`
        )
        .then((response) => context.commit('setProfiles', response.data));
    },
    fetchProfilesWithSearch(context, options) {
      axios
        .get(process.env.VUE_APP_BASE_URL + `?firstName=${options.value}`)
        .then((response) => context.commit('setProfiles', response.data));
    },
    deleteProfile(context, options) {
      axios
        .delete(process.env.VUE_APP_BASE_URL + `/${options.id}`)
        .then(() => location.reload());
    },
  },
});
