import { createApp } from "vue";
import App  from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import './index.css'
import { createStore } from "vuex";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { openDialog } from 'vue3-promise-dialog';

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

export interface Group {
  id: number;
  name: string;
}

export interface KanbanTiket {
  id: number;
  name: string;
  groupId: number;
}

export interface KanbanTask {
  id: number;
  name: string;
  groupId: number;
  subTaskIds?: number[]; 
  done?: boolean;
}

export interface State {
  groups: Group[],
  tickets: KanbanTiket[],
  tasks: KanbanTask[],
}
export const store = createStore<State>({
  state() {
    return {
      groups: [] ,
      tickets: [],
      tasks: []
    }
  },
  mutations: {
    addGroup(state) {      
      state.groups =  [
        ...state.groups,
        {
          name: `New Board ${new Date().getTime()}`,
          id: new Date().getTime()
        }
      ]
    },
    editGroup(state, group: {
      id: number
    } & Partial<Group>) {
      state.groups = state.groups.map(item => item.id === group.id ? {
        ...item,
        ...group
      } : item);
    },
    removeGroup(state, id: number) {
      state.groups = state.groups.filter(group => group.id === id)
    },
    addTicket(state, groupId: number) {
      state.tickets =  [
        ...state.tickets,
        {
          name: `New Col ${new Date().getTime()}`,
          id: new Date().getTime(),
          groupId
        }
      ];
    },
    editTicket(state, ticket: {
      id: number
    } & Partial<KanbanTiket>) {
      state.tickets = state.tickets.map(item => item.id === ticket.id ? {
        ...item,
        ...ticket
      } : item);
    },
    removeTicket(state, id: number) {
      state.tickets = state.tickets.filter(ticket => ticket.id === id)
    },
    addTask(state, groupId: number) {      
      state.tasks =  [
        ...state.tasks,
        {
          name: `New Task ${new Date().getTime()}`,
          id: new Date().getTime(),
          groupId
        }
      ];
    },
    editTask(state, task: {
      id: number
    } & Partial<KanbanTiket>) {
      state.tasks = state.tasks.map(item => item.id === task.id ? {
        ...item,
        ...task
      } : item);
    },
    removeTask(state, id: number) {
      state.tasks = state.tasks.filter(task => task.id === id)
    },
    
  },
  
})


// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);
app.use(store);

app.mount('#app');