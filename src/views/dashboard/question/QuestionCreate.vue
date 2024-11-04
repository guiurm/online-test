<script setup lang="ts">
import { createQuestion } from '@/composables/apiComposable'
import type { ICreateExamQuestion } from '@/composables/apiTypes'
import { ref } from 'vue'
import QuestionForm from './components/QuestionForm.vue'

const question = ref<ICreateExamQuestion>({ body: '', options: [], title: '' })

const add = () => {
    question.value.difficultyId = 2
    createQuestion({
        onError(e) {
            console.log(e)
        },
        onSuccess(data) {
            console.log(data)
        }
    }).call(question.value)
}
</script>
<template>
    <h1 class="mb-4 text-2xl font-bold">Lista de preguntas creadas</h1>
    <h4 class="mb-4 text-lg">Preguntas generadas y utilizadas como batería para preguntas</h4>
    <div class="btn" @click="add">Crear</div>
    <p class="mb-6 text-sm">En este apartado puedes gestionar todas tus pregutnas creadas en la plataforma.</p>
    <question-form v-model="question" />
</template>
