<script setup lang="ts">
import { getQuestion, updateQuestion } from '@/composables/apiComposable'
import type { ICreateExamQuestion } from '@/composables/apiTypes'

import { createToast } from '@guiurm/bit-craft'
import { ref } from 'vue'
import QuestionForm from './components/QuestionForm.vue'

const props = defineProps<{ questionKeycode: string }>()
const question = ref<ICreateExamQuestion>({ body: '', options: [], title: '' })

getQuestion({
    onSuccess({ body, options, title }) {
        question.value.body = body
        question.value.options = options
        question.value.title = title
    },
    onError(e) {
        createToast({ message: e.message, liveTime: -1, type: 'error' })
    }
}).call(props.questionKeycode)

const update = () => {
    updateQuestion({
        onError: (e) => createToast({ message: e.message, liveTime: -1, type: 'error' }),
        onSuccess: () => createToast({ message: 'Pregunta actualizada correctamente', liveTime: 4000, type: 'success' })
    }).call(props.questionKeycode, question.value as any)
}
</script>

<template>
    <h1 class="mb-4 text-2xl font-bold">Lista de preguntas creadas</h1>
    <h4 class="mb-4 text-lg">Preguntas generadas y utilizadas como batería para preguntas</h4>

    <div class="btn" @click="update">Actualizar</div>
    <p class="mb-6 text-sm">En este apartado puedes gestionar todas tus pregutnas creadas en la plataforma.</p>
    <question-form v-model="question" />
</template>
