<template>
    <div class="flex flex-col">
        <div class="text-white text-sm text-center justify-center items-center uppercase p-3 font-semibold flex">
            <span class="text-bg" :class="props.color">•</span> <input @change="emits('setName', $event.target['value'])" class="bg-transparent border-none active:border-none" type="text" :value="props.name">
        </div>
        <div  class="flex-auto flex flex-col rounded-lg bg-slate-700">
            <draggable v-model="tasks" item-key="id">
                <template #item="task">
                    <div class="m-2 w-auto rounded-lg bg-slate-800 h-32 border-4 flex flex-col text-white p-2 border-none justify-center" >
                        <input @change="emits('changeTask', {
                            ...task.element,
                            name: $event.target.value
                        })" :value="task.element.name" class="bg-transparent h-8 font-semibold rounded-lg focus-visible:border-none" id=""  />
                        <div @click="emits('selectTask', task)" class="flex-auto text-sm text-gray-500 font-semibold">{{task.element.subTasks.filter(s => s.checked).length}} of {{task.element.subTasks.length}} subtasks </div>
                    </div>
                </template>
            </draggable>
            <!-- <div class="" v-for="task in props.tasks" :key="task.id">
                
            </div> -->
            <button @click="emits('setTask')" class="m-2 border-dashed w-auto rounded-lg border-slate-800 h-32 border-4 flex justify-center items-center text-9xl text-slate-800 hover:border-slate-900 hover:text-slate-900">+</button>

        </div>
    </div>
</template>

<script setup lang="ts">
import { KanbanTask } from "../main";
import draggable from "vuedraggable";
import { computed, ref, watch } from "@vue/runtime-core";


const props = defineProps<{
  name: string;
  color: string;
  tasks: KanbanTask[]
}>();

const tasks = ref([]);
const emits = defineEmits(['setName', 'setTask', 'changeTask', 'selectTask']);
watch(() => props.tasks, (_tasks) => {
    tasks.value = _tasks;
})


</script>

<style>

</style>