<template>
  <div v-if="task" class="h-full w-full  backdrop-opacity-60 fixed top-0 left-0 backdrop-blur-sm flex justify-center items-center">
    <div class="bg-slate-800 text-white w-3/5 h-3/3 rounded-md p-6 shadow-md">
      <div class="text-lg font-bold pb-6 flex">
        <div class="flex-auto">Edit Task</div>
        <button @click="closeDialog(index)" class="bg-transparent  border-none">
          <i  class="fa fa-remove  cursor-pointer" aria-hidden="true"></i>
        </button>
      </div>
      <label for="name" class="font-semibold block pt-4">Title</label>
      <input v-model="task.name" type="text" class="rounded-lg bg-transparent w-full">
      <label for="description" class="font-semibold block pt-4">Description</label>
      <textarea v-model="task.description" type="text" class="rounded-lg bg-transparent w-full" rows="3"></textarea>
      <label for="subTask" class="font-semibold block pt-4">SubTasks</label>
      <div class="flex items-center mb-3" v-for="(subTask, index) in task.subTasks" :key="index">
        <input v-model="subTask.checked" name="subTask" type="checkbox" class="rounded-lg bg-transparent m-3">
        <input v-model="subTask.name" name="subTask" type="text" class="rounded-lg bg-transparent flex-auto">
        <button @click="removeTask(index)" class="bg-transparent  border-none">
          <i  class="fa fa-remove p-3 cursor-pointer" aria-hidden="true"></i>
        </button>
      </div>
      <button @click="addTask()" class="rounded-full bg-white text-slate-800 w-full p-3 font-semibold hover:bg-slate-400 ">Add New Subtasks</button>
      <label for="name" class="font-semibold block pt-4">Status</label>
      <select v-model="task.groupId" type="text" class="rounded-lg bg-transparent w-full">
        <option class="bg-slate-800 p-3 m-3" v-for="group in props.groupTask" :key="group.id" :value="group.id">{{group.name}}</option>
      </select>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { KanbanTask, KanbanTiket } from '../main';
const props = defineProps<{
  task: KanbanTask,
  groupTask: KanbanTiket[]
}>()
const task = ref(props.task);
const emits = defineEmits(['close'])
watch(() => props.task, (pTask) => {
  task.value = pTask;
});
function addTask() {
  task.value.subTasks = [
    ...task.value.subTasks,
    {
      name: '',
      checked: false
    }
  ] 
}

function removeTask(index: number) {  
  task.value.subTasks = task.value.subTasks.filter((_, jindex) => jindex !== index);
}

function closeDialog() {
  task.value = null;
  emits('close');
}
</script>

<style>

</style>