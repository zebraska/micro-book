import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LivreDetail from './views/LivreDetail.vue';
import EmpruntLivre from './views/EmpruntLivre.vue';
import GestionEmprunt from './views/GestionEmprunt.vue'
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
    {path: '/emprunt/:id', name: 'borrowBook', component: EmpruntLivre, props: true},
    {path: '/emprunts/:id', name: 'gererEmprunt', component: GestionEmprunt, props: true}
  ],
});
