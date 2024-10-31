<script setup lang="ts">
import type { ICrateExamQuestion, ICreateExam, ICreateExamOption } from '@/composables/apiTypes'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { inject, ref, type Ref } from 'vue'

const emits = defineEmits<{ showModal: [] }>()

const selectedQuestion = ref<ICrateExamQuestion | null>(null)
const exam = inject('exam') as Ref<ICreateExam>

const showQuestionModal = () => {
    emits('showModal')
}
const removeOption = (option: ICreateExamOption) => {
    if (!selectedQuestion.value) return
    selectedQuestion.value.options = selectedQuestion.value.options.filter((o) => o !== option)
}
const removeQuestion = (question: ICrateExamQuestion) => {
    exam.value.questions = exam.value.questions.filter((q) => q !== question)
    if (selectedQuestion.value === question) selectedQuestion.value = null
}
const addOption = () => {
    if (!selectedQuestion.value) return
    selectedQuestion.value.options.push({ text: '', correct: false })
}
const updateCorrectness = (selectedIndex: number) => {
    if (!selectedQuestion.value) return
    selectedQuestion.value.options.forEach((option, index) => {
        option.correct = index === selectedIndex
    })
}
</script>
<template>
    <div class="flex gap-4 mt-12">
        <div class="w-1/3">
            <div class="w-full flex items-center justify-between mb-2">
                <h6 class="w-fit">Preguntas</h6>
                <a @click="showQuestionModal" class="text-sm text-primary-500 hover:text-primary-400 cursor-pointer">Añadir</a>
            </div>
            <div class="rounded-md bg-gray-600 overflow-auto max-h-[70vh]">
                <div
                    @click="() => (selectedQuestion = cQuestion)"
                    v-for="(cQuestion, index) in exam.questions"
                    :key="index"
                    class="p-4 flex"
                    :class="{ 'bg-primary-600': selectedQuestion === cQuestion, 'hover:bg-gray-500': selectedQuestion !== cQuestion }"
                >
                    <div class="mr-2">{{ index + 1 }}.</div>
                    <div class="mr-2 overflow-hidden leading-3 line-clamp-3">
                        {{ cQuestion.title }}
                    </div>
                    <trash-icon
                        @click.stop="() => removeQuestion(cQuestion)"
                        class="px-2.5 py-2 rounded-md cursor-pointer h-fit bg-red-500 min-w-4 max-w-4 ml-auto box-content"
                    />
                </div>
                <template v-if="exam.questions.length === 0"> </template>
            </div>
        </div>
        <div class="w-2/3">
            <div class="w-full flex items-center justify-between mb-2">
                <h6 class="w-fit">Contenido</h6>
                <a @click="addOption" class="text-sm text-primary-500 hover:text-primary-400 cursor-pointer">Añadir</a>
            </div>

            <div class="p-4 rounded-md bg-gray-600 text">
                <template v-if="selectedQuestion !== null">
                    <label class="block h6 mb-4">
                        Titulo de pregunta
                        <input
                            type="text"
                            v-model="selectedQuestion.title"
                            placeholder="Respuesta"
                            class="mt-2 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </label>
                    <label class="block h6 mb-4">
                        Enunciado de pregunta
                        <input
                            type="text"
                            v-model="selectedQuestion.body"
                            placeholder="Respuesta"
                            class="mt-2 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </label>

                    <span> Opciones para la pregunta </span>
                    <form @submit.prevent="() => void 0">
                        <div v-for="(cOption, index) in selectedQuestion.options" :key="index" class="items-center p-4 rounded-md hover:bg-gray-500 flex">
                            <input type="radio" :value="true" v-model="cOption.correct" name="correct" @change="updateCorrectness(index)" />
                            <input
                                v-model="cOption.text"
                                type="text"
                                placeholder="Respuesta"
                                class="ml-4 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <trash-icon @click="() => removeOption(cOption)" class="ml-2 size-5 cursor-pointer text-red-500" />
                        </div>
                    </form>
                </template>
                <template v-else> Seleccionar una pregunta </template>
            </div>
        </div>
    </div>
</template>
