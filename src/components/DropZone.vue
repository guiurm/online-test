<script setup lang="ts">
import useCssClassTranslator from '@/composables/cssClassTranslator'
import useDrag from '@/composables/dragComposable'
import { ref, type Ref } from 'vue'

const props = defineProps<{ disabled?: boolean; multiple?: boolean; accept?: string }>()
const emit = defineEmits<{ drop: [files: File[]] }>()

const { css, ...modifyCss } = useCssClassTranslator([
  'cursor-pointer',
  'transition-shadow',
  'hover:shadow-md',
  'border',
  'border-dashed',
  'px-4',
  'py-8',
  'flex',
  'items-center',
  'justify-center'
])

const { fns } = useDrag({
  onDragenter: () => {
    modifyCss.addCss('bg-red-500')
  },
  onDragexit: () => {
    modifyCss.addCss({ 'bg-red-500': false })
  },
  onDragover: (e) => {
    e.preventDefault()
  },
  onDrop: (e) => {
    e.preventDefault()

    modifyCss.addCss({ 'bg-red-500': false })
    setFiles()
  }
})

const inputRef = ref() as Ref<HTMLInputElement>
const files = ref([]) as Ref<File[]>

const setFiles = () => {
  const dragedFiles = inputRef.value.files
  if (!dragedFiles || dragedFiles.length === 0) return
  files.value.push(...Array.from(dragedFiles))
  emit('drop', files.value)
}
</script>
<template>
  <div v-bind="{ ...fns, onClick: () => inputRef.click(), onChange: setFiles }" :class="css">
    <slot>
      <span class="opacity-80">Suelta un archivo o haz click</span>
    </slot>
    <input
      ref="inputRef"
      :disabled="disabled"
      :accept="accept"
      :multiple="multiple"
      type="file"
      class="hidden"
    />
  </div>
</template>
