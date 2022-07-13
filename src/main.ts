import { createApp } from 'vue'
import App from './App.vue'
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faHatWizard } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue'

const routes = [
    {
      path: "/admin/dashboard",
      component: Dashboard,
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

library.add(faHatWizard);

// Vue.component('font-awesome-icon', FontAwesomeIcon)

createApp(App).use(router).mount('#app')
