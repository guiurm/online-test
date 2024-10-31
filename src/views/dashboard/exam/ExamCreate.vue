<script lang="ts" setup>
import { createExam } from '@/composables/apiComposable'
import type { ICreateExam } from '@/composables/apiTypes'
import { provide, ref } from 'vue'
import ExamForm from './components/ExamForm.vue'

const exam = ref<ICreateExam>({
    name: '',
    description: '',
    questions: []
})
provide('exam', exam)

const createNewExam = () => {
    const create = createExam()
    create.call(exam.value)
}
</script>

<template>
    <h1 class="mb-4 text-2xl font-bold">Crear nuevo examen</h1>
    <h4 class="mb-4 text-lg">Ingrese los detalles del examen a continuación:</h4>

    <p class="mb-6 text-sm">
        Complete todos los campos necesarios para crear un nuevo examen. Asegúrese de agregar las preguntas y opciones correspondientes para que los
        participantes puedan responder correctamente. Puede agregar tantas preguntas como desee.
    </p>
    <exam-form>
        <div class="btn" @click="createNewExam">Crear</div>
    </exam-form>
</template>
