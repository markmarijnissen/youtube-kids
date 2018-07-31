import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
// import VueMDCAdapter from "vue-mdc-adapter";

Vue.config.productionTip = false;
// Vue.use(VueMDCAdapter);

new Vue({
  render: h => h(App)
}).$mount("#app");
