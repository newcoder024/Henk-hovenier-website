import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import router from './js/index.js';

createApp(App)
  .use(router)
  .mount('#app');