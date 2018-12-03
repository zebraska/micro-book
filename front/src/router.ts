import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LivreDetail from './views/LivreDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {path: '/livre', name: 'livre', component: LivreDetail},
    {path: '/livre/:id', name: 'livreWithID', component: LivreDetail, props: true},
  ],
});
