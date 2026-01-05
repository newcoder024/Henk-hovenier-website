import { createRouter, createWebHistory } from 'vue-router';
import Custom from '../components/Custom.vue';
import Bestellingen from '../components/Bestellingen.vue';
import Orderform from '../components/Orderform.vue';

const routes = [
  { path: '/', component: Custom },
  { path: '/bestellingen', component: Bestellingen },
  { path: '/custom', component: Custom },
  { path: '/orderform', component: Orderform },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
