<script setup lang="ts">
import CarrouselCard from '@/components/carrousel/CarrouselCard.vue'
import CarrouselComponent from '@/components/carrousel/CarrouselContainer.vue'
import DropZone from '@/components/DropZone.vue'
import ExamCard from '@/components/exam/ExamCard.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useExamStore } from '@/stores/examStore'
import type { TQuestion } from '@/types'

const exam = useExamStore()

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
            exam.addQuestions(JSON.parse(s.toString()) as TQuestion[])
        } catch (error) {
            console.log('Error parsing file')
            console.log(error)
        }
    }
    reader.readAsText(files[0])
}
</script>
<template>
    <main class="w-full h-full">
        <navbar-component />
        <section class="max-w-5xl mx-auto py-6">
            <h2 class="mb-4 text-2xl font-semibold tracking-tight text-center leading-none md:text-3xl lg:text-4xl text-white">Selecciona tu archivo JSON</h2>
            <p class="mt-6 mb-20 text-lg text-center font-medium text-white-300 md:text-xl">Suelta un archivo o haz click</p>
            <drop-zone v-if="exam.questions.length === 0" @drop="generateQuestions" :multiple="false" :accept="['.txt', '.json']" />

            <template v-if="exam.questions.length !== 0">
                <CarrouselComponent>
                    <CarrouselCard v-for="c in exam.questions" :key="c.title">
                        <exam-card :question="c"></exam-card>
                    </CarrouselCard>
                </CarrouselComponent>
            </template>
        </section>
    </main>
</template>
