<script setup lang="ts">
import useDrag from '@/composables/dragComposable'

const { fns } = useDrag({
  onDrag: () => {
    console.log('onDrag')
  },
  onDragend: () => {
    console.log('onDragend')
  },
  onDragenter: () => {
    console.log('onDragenter')
  },
  onDragstart: () => {
    console.log('onDragstart')
  }
})
</script>
<template>
  <main class="md:container md:mx-auto mt-4 p-4 rounded-md bg-white">
    <div class="my-4 text-2xl font-semibold">Selecciona tu archivo JSON</div>

    <div
      v-bind="fns"
      class="cursor-pointer transition-shadow hover:shadow-md border border-dashed px-4 py-8 flex items-center justify-center"
    >
      <span class="opacity-80">Suelta un archivo o haz click</span>
    </div>
  </main>
</template>
