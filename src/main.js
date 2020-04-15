import 'babel-polyfill'
import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import "./plugins/vee-validate";
import vuetify from './plugins/vuetify';
import moment from 'moment';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import JsonExcel from 'vue-json-excel'
 
Vue.component('downloadExcel', JsonExcel)
Vue.use(VueSweetalert2);

moment.locale('es');
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
