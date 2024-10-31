<script lang="ts" setup>
import DropZone from '@/components/DropZone.vue'
import type { ICrateExamQuestion, ICreateExam } from '@/composables/apiTypes'
import { BaseModal, createToast, TabMenu, TabSlide } from '@guiurm/bit-craft'
import { DocumentArrowUpIcon, NumberedListIcon } from '@heroicons/vue/24/solid'
import { h, inject, ref, type Component, type Ref } from 'vue'
import ExamFormInfo from './ExamFormInfo.vue'
import ExamFormQuestions from './ExamFormQuestions.vue'

const questionModal = ref(false)
const showQuestionModal = () => (questionModal.value = true)
const hideQuestionModal = () => (questionModal.value = false)

const exam = inject('exam') as Ref<ICreateExam>
const question = ref<ICrateExamQuestion>({
    body: '',
    options: [],
    title: ''
})

const addQuestion = () => {
    if (question.value.title.trim() === '' || question.value.body.trim() === '') return

    exam.value.questions.push({
        title: question.value.title,
        body: question.value.body,
        options: question.value.options
    })
    //selectedQuestion.value = question.value
    question.value = {
        body: '',
        options: [],
        title: ''
    }
    hideQuestionModal()
}

const slideHeadGenerator = (text: string, icon: Component) => {
    return {
        component: h('div', { class: 'flex justify-center items-center' }, [h('div', { class: 'mr-2' }, [text]), h(icon, { class: 'size-5' })]),
        binds: {}
    }
}

const manageDrop = (files: File[]) => {
    const reader = new FileReader()
    reader.onload = (evt) => {
        const s = evt.target?.result
        if (!s) {
            throw new Error('No text found')
        }
        try {
            const data = (JSON.parse(s.toString()) as ICrateExamQuestion[]).map(({ body, title, options }) => {
                return { body, options, title }
            })
            console.log(data)

            exam.value.questions.push(...data)
            createToast({ message: `Añadidas: ${data.length} preguntas`, liveTime: 2000, type: 'success' })
        } catch (error) {
            console.error(error)
        }
    }
    reader.readAsText(files[0])
}
</script>

<template>
    <exam-form-info v-model="exam" />
    <div class="flex justify-end">
        <slot />
    </div>

    <div class="w-5xl mx-auto mt-6">
        <tab-menu>
            <tab-slide :header="slideHeadGenerator('Preguntas', NumberedListIcon)">
                <exam-form-questions @show-modal="showQuestionModal" />
            </tab-slide>

            <tab-slide :header="slideHeadGenerator('Subit preguntas', DocumentArrowUpIcon)">
                <drop-zone class="mt-12" @drop="manageDrop" />
            </tab-slide>
        </tab-menu>
    </div>

    <div v-show="questionModal" class="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-950/50">
        <base-modal v-model:visible="questionModal" :closeOnClickOutside="false" modal-css="flex flex-col bg-gray-600 rounded-md w-[40rem] overflow-hidden">
            <template #header>
                <div class="bg-gray-700 p-4">
                    <h2 class="text-xl font-bold">Nueva pregunta</h2>
                </div>
            </template>
            <template #body>
                <div class="p-4">
                    <div class="mb-3">
                        <label class="block text-sm font-medium">
                            Nombre
                            <div class="mt-2">
                                <input
                                    type="text"
                                    v-model="question.title"
                                    class="bg-gray-600 block w-full rounded-md border-0 py-1.5 px-3 outline-none shadow-sm sm:text-sm"
                                    required
                                />
                            </div>
                        </label>
                    </div>

                    <div class="mb-3">
                        <label class="block text-sm font-medium">
                            Descripción
                            <div class="mt-2">
                                <textarea
                                    v-model="question.body"
                                    rows="4"
                                    class="bg-gray-600 block w-full rounded-md border-0 py-1.5 px-3 outline-none shadow-sm sm:text-sm"
                                    required
                                ></textarea>
                            </div>
                        </label>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end p-4">
                    <button @click="hideQuestionModal" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition mr-2">Cerrar</button>
                    <button @click="addQuestion" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Acción</button>
                </div>
            </template>
        </base-modal>
    </div>
</template>
