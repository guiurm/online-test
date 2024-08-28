<script setup lang="ts">
import DropZone from '@/components/DropZone.vue'
import type { TQuestion, TQuestionOption } from '@/types'
import { ref, type Ref } from 'vue'

const questions = ref([]) as Ref<TQuestion[]>
const correct = ref(0)

const generateQuestions = (files: File[]) => {
    console.log(files[0])
    const reader = new FileReader()
    reader.onload = (evt) => {
        const s = evt.target?.result
        if (!s) {
            console.log(s, evt)
            throw new Error('No text found')
        }
        try {
            const a = JSON.parse(s.toString()) as TQuestion[]
            questions.value.push(...a)
        } catch (error) {
            console.log('Error parsing file')
            console.log(error)
        }
    }
    reader.readAsText(files[0])
}

const manageOption = (e: MouseEvent, option: TQuestionOption) => {
    const d = e.target as HTMLDivElement
    if (option.correct) {
        d.classList.add('bg-green-500', 'text-white')
        correct.value++
    } else d.classList.add('bg-red-500')
}
</script>
<template>
    <main class="md:container md:mx-auto mt-4 p-4 rounded-md bg-white">
        <div class="my-4 text-2xl font-semibold">Selecciona tu archivo JSON</div>

        <drop-zone @drop="generateQuestions" :multiple="false">
            <span class="opacity-80">Suelta un archivo o haz click</span>
        </drop-zone>

        <template v-if="questions.length !== 0">
            <span class="block my-3 text-2xl">Recuento:</span> <span>{{ correct }}</span
            >/<span>{{ questions.length }}</span>
            <div v-for="c in questions" :key="c.title" class="flex flex-col my-4">
                <div class="text-xl">{{ c.title }}</div>
                <div class="text-lg opacity-55">{{ c.subtitle }}</div>
                <div class="flex flex-col px-2">
                    <div
                        class="w-full px-2 py-1 rounded-md cursor-pointer mb-3 border border-gray-300 bg-white"
                        v-for="q in c.options"
                        :key="q.text"
                        @click="(e) => manageOption(e, q)"
                    >
                        {{ q.text }}
                    </div>
                </div>
            </div>
        </template>
    </main>
</template>
