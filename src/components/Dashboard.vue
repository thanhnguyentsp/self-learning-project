<template>
    <div class="flex flex-row h-full w-100 bg-slate-700">
        <div class="flex-none w-64 overflow-y-auto overflow-x-hidden text-left p-4 border-r-2 border-r-slate-600">
            <div class="text-sm uppercase text-gray-400 p-3 font-semibold">
                all boards
            </div>
            <router-link
                active-class="bg-slate-800 text-white rounded-md" :to="{
                    name: 'kanban',
                    params: {
                        id: group.id
                    }
                }"  v-for="group in groups" :key="group.id"
                class="text-gray-400 capitalize p-3 text-sm font-semibold hover:cursor-pointer block">
                 {{ group.name }}
            </router-link>
            <button @click="store.commit('addGroup')" class=" hover:opacity-80 bg-transparent rounded-lg text-white w-full p-2 mt-3 hover:bg-slate-800 text-sm font-semibold">+ Add New Board</button>
        </div>
        <div class="flex-auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { computed } from 'vue'

import { useStore } from 'vuex';
export interface Tab {
    name: string;
    id: number;
}
const store = useStore();
const groups = computed(() => store.state.groups);
</script>

<style>

</style>