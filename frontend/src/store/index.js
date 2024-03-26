import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  // Define your initial state here
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
