import { createApp } from "vue";
import App  from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import './index.css'

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    {
        path: '',
        component: Dashboard,
        children: [
            {
                path: '/kanban/:id',
                name: 'kanban',
                component: KanbanBoard
            }
        ]
    }
  ], // short for `routes: routes`
});

// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount('#app');