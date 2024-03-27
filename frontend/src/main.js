import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./api/axiosInterceptors";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./assets/main.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
