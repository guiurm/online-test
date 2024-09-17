<script setup lang="ts">
import CarrouselCard from '@/components/carrousel/CarrouselCard.vue'
import CarrouselComponent from '@/components/carrousel/CarrouselContainer.vue'
import DropZone from '@/components/DropZone.vue'
import ExamCard from '@/components/exam/ExamCard.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useExamStore } from '@/stores/examStore'
import type { TQuestion } from '@/types'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

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

const showCorrection = ref(false)
const correctTest = () => {
    if (exam.allAnswered) showCorrection.value = true
}
</script>
<template>
    <main class="w-full h-full">
        <navbar-component />
        <section class="max-w-5xl mx-auto py-6">
            <template v-if="exam.questions.length === 0">
                <h2 class="mb-4 text-2xl font-semibold tracking-tight text-center leading-none md:text-3xl lg:text-4xl text-white">
                    Selecciona tu archivo JSON
                </h2>
                <p class="mt-6 mb-20 text-lg text-center font-medium text-white-300 md:text-xl">Suelta un archivo o haz click</p>
                <drop-zone @drop="generateQuestions" :multiple="false" :accept="['.txt', '.json']" />
            </template>

            <template v-else-if="!showCorrection">
                <h2 class="mb-4 text-2xl font-semibold tracking-tight text-center leading-none md:text-3xl lg:text-4xl text-white">Rellena el cuestionario</h2>
                <p class="mt-6 mb-20 text-lg text-center font-medium text-white-300 md:text-xl">Tras completar el questionario haz click en corregir</p>
                <CarrouselComponent>
                    <CarrouselCard v-for="c in exam.questions" :key="c.title">
                        <exam-card :question="c"></exam-card>
                    </CarrouselCard>
                </CarrouselComponent>
                <div class="my-4 px-2 flex justify-end">
                    <div class="btn" @click="correctTest" :class="{ 'btn-disabled': !exam.allAnswered }">Corregir</div>
                </div>
            </template>
            <template v-else>
                <h2 class="mb-4 text-2xl font-semibold tracking-tight text-center leading-none md:text-3xl lg:text-4xl text-white">Resultados de evaluacion</h2>
                <p class="mt-6 mb-20 text-lg text-center font-medium text-white-300 md:text-xl">
                    El resultado total del test realizado es: {{ exam.totalAnswered - exam.totalFailed }} / {{ exam.totalAnswered }}
                </p>
                <div class="my-4 px-2 flex flex-col" v-for="(question, questionIndex) in exam.questions" :key="question.id">
                    <h3 class="mb-1 font-semibold">{{ questionIndex + 1 }} {{ question.title }}</h3>
                    <p class="text-white-300">{{ question.subtitle }}</p>
                    <p class="text-white-300 italic mb-2">¿Por qué es la respuesta correcta?: "{{ question.reason }}"</p>

                    <div
                        class="px-2 flex ps-4 border border-gray-600 rounded cursor-default"
                        v-for="option in question.options"
                        :key="option.text + question.id"
                    >
                        <!-- <span class="material-symbols-outlined mr-4 text-base"> radio_button_checked </span> -->
                        <span>
                            <icon icon="mdi:checkbox-marked-circle-outline" class="h-full mr-4 text-base text-green-500" v-if="option.correct" />
                        </span>
                        <span>
                            <icon icon="mdi:cross-circle-outline" class="h-full mr-4 text-base text-red-500" v-if="option.selected && !option.correct" />
                        </span>
                        <span :class="{ 'text-white-300': !option.selected }">
                            {{ option.text }}
                        </span>
                    </div>
                </div>
            </template>
        </section>
    </main>
</template>
