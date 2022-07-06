<template>
    <div class="flex flex-row h-full w-100 bg-slate-700">
        <div class="flex-none w-64 overflow-y-auto overflow-x-hidden text-left p-4 border-r-2 border-r-slate-600">
            <div class="text-sm uppercase text-gray-400 p-3 font-semibold">
                all board
            </div>
            <router-link
                active-class="bg-purple-700 text-white rounded-md" :to="{
                    name: 'kanban',
                    params: {
                        id: tab.id
                    }
                }"  v-for="tab in tabs" :key="tab.id"
                class="text-gray-400 capitalize p-3 text-sm font-semibold hover:cursor-pointer block">
                 {{ tab.name }}
            </router-link>
        </div>
        <div class="flex-auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
export interface Tab {
    name: string;
    id: number;
}

const tabs = ref<Tab[]>([
    {
        name: 'Perform Lauch',
        id: 1
    },
    {
        name: 'Marketing Place',
        id: 2
    }
]);
const selected =  ref(tabs.value[0].id);
function selectTab(tab: Tab) {
    selected.value = tab.id
}
</script>

<style>

</style>