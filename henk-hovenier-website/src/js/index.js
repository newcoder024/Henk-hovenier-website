import { createRouter, createWebHistory } from 'vue-router';
import Custom from '../components/Custom.vue';
import Bestellingen from '../components/Bestellingen.vue';

const routes = [
  { path: '/', component: Custom },
  { path: '/bestellingen', component: Bestellingen },
  { path: '/custom', component: Custom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
