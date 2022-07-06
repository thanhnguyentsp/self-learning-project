<template>
    <div class="flex flex-col">
        <div class="text-white text-sm text-center justify-center items-center uppercase p-3 font-semibold">
            <span class="text-bg" :class="props.color">•</span> {{props.name}}
        </div>
        <div class="flex-auto rounded-lg bg-slate-700">
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  name: string;
  color: string;
}>()


</script>

<style>

</style>