<template>
    <div class="flex flex-col">
        <div class="text-white text-sm text-center justify-center items-center uppercase p-3 font-semibold flex">
            <span class="text-bg" :class="props.color">•</span> <input @change="emits('setName', $event.target['value'])" class="bg-transparent border-none active:border-none" type="text" :value="props.name">
        </div>
        <div class="flex-auto flex flex-col rounded-lg bg-slate-700">
            <div class="m-2 w-auto rounded-lg bg-slate-800 h-32 border-4 flex text-white p-2 border-none" v-for="task in props.tasks" :key="task.id">
                <input @change="emits('changeTask', {
                    ...task,
                    name: $event.target.value
                })" :value="task.name" class="bg-transparent h-8 font-semibold rounded-lg focus-visible:border-none" id=""  />
            </div>
            <button @click="emits('setTask')" class="m-2 border-dashed w-auto rounded-lg border-slate-800 h-32 border-4 flex justify-center items-center text-9xl text-slate-800 hover:border-slate-900 hover:text-slate-900">+</button>

        </div>
    </div>
</template>

<script setup lang="ts">
import { KanbanTask } from "../main";


const props = defineProps<{
  name: string;
  color: string;
  tasks: (KanbanTask & {subTasks?: KanbanTask[]})[]
}>();
const emits = defineEmits(['setName', 'setTask', 'changeTask'])


</script>

<style>

</style>