<template>
  <div v-if="group" class="h-full bg-slate-800 flex flex-col">
    <div class="w-full h-16 flex-none flex bg-slate-700 items-center p-2">
      <div class="font-semibold text-bg flex-auto text-white">
        <input
          type="text"
          class="bg-transparent rounded-lg"
          :value="group.name"
          @change="
            store.commit('editGroup', {
              id: group?.id,
              name: $event.target?.value,
            })
          "
        />
      </div>
    </div>
    <div class="flex flex-nowrap overflow-x-auto flex-auto">
      <div
        class="flex flex-col w-64 ml-6"
        :key="item.id"
        v-for="item in tickets"
        :name="item.name"
      >
        <div
          class="text-white text-sm text-center justify-center items-center uppercase p-3 font-semibold flex"
        >
          <span class="text-bg">•</span>
          <input
            @change="
              store.commit('editTicket', {
                ...item,
                name: $event.target.value,
              })
            "
            class="bg-transparent border-none active:border-none"
            type="text"
            :value="item.name"
          />
        </div>
        <div class="flex-auto flex flex-col rounded-lg bg-slate-700">
          <draggable v-model="item.tasks" item-key="id" group="people" @change="change($event)">
            <template #item="task">
              <div
                class="m-2 w-auto rounded-lg bg-slate-800 h-32 border-4 flex flex-col text-white p-2 border-none justify-center"
              >
                <input
                  @change="
                    store.commit('editTask', {
                      ...task.element,
                      name: $event.target.value,
                    })
                  "
                  :value="task.element.name"
                  class="bg-transparent h-8 font-semibold rounded-lg focus-visible:border-none"
                  id=""
                />
                <div
                  @click="selectedTask = task.element"
                  class="flex-auto text-sm text-gray-500 font-semibold"
                >
                  {{ task.element.subTasks.filter((s) => s.checked).length }}
                  of {{ task.element.subTasks.length }} subtasks
                </div>
              </div>
            </template>
          </draggable>
          <!-- <div class="" v-for="task in props.tasks" :key="task.id">
                        
                    </div> -->
          <button
            @click="store.commit('addTask', item.id)"
            class="m-2 border-dashed w-auto rounded-lg border-slate-800 h-32 border-4 flex justify-center items-center text-9xl text-slate-800 hover:border-slate-900 hover:text-slate-900"
          >
            +
          </button>
        </div>
      </div>
      <!-- <tasks-col @selectTask="selectedTask = $event" :tasks="item.tasks" @changeTask="store.commit('editTask', $event)" @setTask="store.commit('addTask', item.id)" @setName="store.commit('editTicket', {
                ...item,
                name: $event
            })" :key="item.id" v-for="item in tickets" :name="item.name"  class="w-64 ml-6" color="text-blue-500"></tasks-col> -->
      <button
        @click="store.commit('addTicket', group?.id)"
        class="border-dashed w-64 m-2 mt-6 rounded-lg border-slate-700 h-full border-4 flex justify-center items-center text-9xl text-slate-700 hover:border-slate-900 hover:text-slate-900"
      >
        +
      </button>
    </div>
  </div>
  <task-dialog
    @close="selectedTask = null"
    :groupTask="tickets"
    :task="selectedTask"
  ></task-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { KanbanTask, State } from "../main";
import draggable from "vuedraggable";

import TasksCol from "./TasksCol.vue";
import TaskDialog from "./TaskDialog.vue";

const store = useStore<State>();
const route = useRoute();
const groups = computed(() => store.state.groups);

const group = computed(() =>
  groups.value.find((g) => g.id === parseInt(route.params.id.toString()))
);
const tickets = computed(() =>
  store.state.tickets
    .filter((ticket) => ticket.groupId === group.value.id)
    .map((ticket) => ({
      ...ticket,
      tasks: store.state.tasks.filter((task) => task.groupId === ticket.id),
    }))
);
function change(params: { added: { element: any; newIndex: number;} }) {
    console.log(params);
    
    if (params.added && params.added.element) {
        
        store.commit('editTask', {
            ...params.added.element,
            groupId: tickets.value[params.added.newIndex].id
        })

    }
}
const selectedTask = ref<KanbanTask>(null);
</script>

<style></style>
