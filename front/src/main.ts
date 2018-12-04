import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faArrowCircleRight, faArrowCircleLeft, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faArrowCircleRight, faArrowCircleLeft, faExchangeAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)


import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
