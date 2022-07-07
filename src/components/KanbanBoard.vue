<template>
    <div v-if="group" class="h-full bg-slate-800 flex flex-col">
        <div class="w-full h-16 flex-none flex bg-slate-700 items-center p-2">
            <div  class="font-semibold text-bg flex-auto text-white">
                <input type="text" class="bg-transparent" :value="group.name" @change="store.commit('editGroup', {
                    id: group?.id,
                    name: $event.target['value']
                })">
            </div>
        </div>
        <div class="flex flex-nowrap overflow-x-auto flex-auto">
            <tasks-col :tasks="item.tasks" @setTask="store.commit('addTask', item.id)" @setName="store.commit('editTicket', {
                ...item,
                name: $event
            })" :key="item.id" v-for="item in tickets" :name="item.name"  class="w-64 ml-6" color="text-blue-500"></tasks-col>
            <button @click="store.commit('addTicket', group.id)" class="border-dashed w-64 m-2 mt-6 rounded-lg border-slate-700 h-full border-4 flex justify-center items-center text-9xl text-slate-700 hover:border-slate-900 hover:text-slate-900">+</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { State } from '../main';
import TasksCol from './TasksCol.vue';
const store = useStore<State>();
const route = useRoute();
const groups = computed(() => store.state.groups);

const group = computed(() => groups.value.find(g => g.id === parseInt(route.params.id.toString())));
const tickets = computed(() => store.state.tickets.filter(ticket => ticket.groupId === group.value.id).map(ticket => ({
    ...ticket,
    tasks: store.state.tasks.filter(task => task.groupId === ticket.id)
})));
</script>

<style>

</style>