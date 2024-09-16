<script setup lang="ts">
import useCssClassTranslator from '@/composables/cssClassTranslator'
import useDrag from '@/composables/dragComposable'
import { ref, type Ref } from 'vue'

const props = defineProps<{ disabled?: boolean; multiple?: boolean; accept?: string[] }>()
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
    <div class="flex items-center justify-center w-full">
        <label
            v-bind="{ ...fns, onClick: () => inputRef.click(), onChange: setFiles }"
            :class="css"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
        >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                </svg>
                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500">{{ accept?.map((t) => t.toUpperCase()).join(', ') }} (MAX. 800x400px)</p>
            </div>
            <input ref="inputRef" :disabled="disabled" :accept="accept?.join(',')" :multiple="multiple" type="file" class="hidden" />
        </label>
    </div>
</template>
