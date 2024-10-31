<script lang="ts" setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { editExam, getExam } from '@/composables/apiComposable'
import type { ICreateExam } from '@/composables/apiTypes'
import { createToast } from '@guiurm/bit-craft'
import { provide, ref } from 'vue'
import ExamForm from './components/ExamForm.vue'

const props = defineProps<{ examId: string }>()
console.log(props)

const { call, error, loading } = getExam({
    onSuccess: ({ description, id, name, questions }) => {
        //@ts-ignore
        exam.value = { description, name, id, questions: [] }
        exam.value.questions = questions.map(({ question }) => {
            const { body, difficultyId, options, title, id } = question
            return {
                body,
                difficultyId,
                options: options.map(({ correct, id, text }) => ({ correct, id, text })),
                title,
                id
            }
        })
    }
})
call(Number(props.examId))

const exam = ref<ICreateExam>({
    name: '',
    description: '',
    questions: []
})
provide('exam', exam)

const editExamAPI = () => {
    editExam(exam.value.id as number, {
        onError(e) {
            createToast({ message: e.message, liveTime: -1, type: 'error', showLifeTime: false })
        },
        onSuccess(d) {
            createToast({ message: `${d.name} actualizado`, liveTime: 5000, type: 'success', showLifeTime: true })
        }
    }).call(exam.value)
}
</script>

<template>
    <navbar-component />
    <div class="container mx-auto px-4 py-2 pt-6">
        <h1 class="mb-4 text-2xl font-bold">Crear nuevo examen</h1>
        <h4 class="mb-4 text-lg">Ingrese los detalles del examen a continuación:</h4>

        <p class="mb-6 text-sm">
            Complete todos los campos necesarios para crear un nuevo examen. Asegúrese de agregar las preguntas y opciones correspondientes para que los
            participantes puedan responder correctamente. Puede agregar tantas preguntas como desee.
        </p>
        <template v-if="!loading && !error">
            <exam-form>
                <div class="btn" @click="editExamAPI">Editar</div>
            </exam-form>
        </template>
    </div>
</template>
