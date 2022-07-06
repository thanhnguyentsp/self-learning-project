<template>
    <div class="h-full bg-slate-800 flex flex-col">
        <div class="w-full h-16 flex-none flex bg-slate-700 items-center p-2">
            <div class="text-bg flex-auto text-white">
                Perform Launch
            </div>
            <div>
                <button class="bg-indigo-600 rounded-full text-white p-2 hover:bg-indigo-800 text-sm font-semibold">+ Add New Task</button>
            </div>
        </div>
        <div class="flex flex-nowrap overflow-x-auto flex-auto">
            <tasks-col class="w-64 pl-6" name="Todo" color="text-blue-500"></tasks-col>
            <tasks-col class="w-64 pl-6" name="In Development" color="text-blue-500"></tasks-col>
            <tasks-col class="w-64 pl-6" name="Code Review" color="text-blue-500"></tasks-col>
            <tasks-col class="w-64 pl-6" name="Done" color="text-blue-500"></tasks-col>
        </div>
    </div>
</template>

<script setup lang="ts">
import TasksCol from './TasksCol.vue';
</script>

<style>

</style>