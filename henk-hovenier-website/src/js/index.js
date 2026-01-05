import { createRouter, createWebHistory } from 'vue-router';
import Custom from '../components/Custom.vue';
import Bestellingen from '../components/Bestellingen.vue';
import Orderform from '../components/Orderform.vue';
import Admin from '../components/Admin.vue';
import Overzicht from '../components/Overzicht.vue';

const routes = [
  { path: '/', component: Custom },
  { path: '/bestellingen', component: Bestellingen },
  { path: '/custom', component: Custom },
  { path: '/orderform', component: Orderform },
  { path: '/admin', component: Admin },
  { path: '/overzicht', component: Overzicht },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
