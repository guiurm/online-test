<script lang="ts" setup>
import DropZone from '@/components/DropZone.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { createExam } from '@/composables/apiComposable'
import type { ICrateExamQuestion, ICreateExam, ICreateExamOption } from '@/composables/apiTypes'
import { BaseModal, createToast, TabMenu, TabSlide } from '@guiurm/bit-craft'
import { DocumentArrowUpIcon, NumberedListIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { h, ref, type Component } from 'vue'

const questionModal = ref(false)
const showQuestionModal = () => (questionModal.value = true)
const hideQuestionModal = () => (questionModal.value = false)

const exam = ref<ICreateExam>({
    name: '',
    description: '',
    questions: []
})
const question = ref<ICrateExamQuestion>({
    body: '',
    options: [],
    title: ''
})
const selectedQuestion = ref<ICrateExamQuestion | null>(null)
const updateCorrectness = (selectedIndex: number) => {
    if (!selectedQuestion.value) return
    selectedQuestion.value.options.forEach((option, index) => {
        option.correct = index === selectedIndex
    })
}

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

const addOption = () => {
    if (!selectedQuestion.value) return
    selectedQuestion.value.options.push({ text: '', correct: false })
}

const removeOption = (option: ICreateExamOption) => {
    if (!selectedQuestion.value) return
    selectedQuestion.value.options = selectedQuestion.value.options.filter((o) => o !== option)
}
const removeQuestion = (question: ICrateExamQuestion) => {
    exam.value.questions = exam.value.questions.filter((q) => q !== question)
    if (selectedQuestion.value === question) selectedQuestion.value = null
}

const createNewExam = () => {
    const create = createExam()
    create.call(exam.value)
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

            //exam.addQuestions(JSON.parse(s.toString()) as TQuestion[])
        } catch (error) {
            console.error(error)
        }
    }
    reader.readAsText(files[0])
}
</script>

<template>
    <navbar-component />
    <div class="container mx-auto px-4 py-2 pt-6">
        <div class="btn" @click="createNewExam">Crear</div>
        <h1 class="mb-4 text-2xl font-bold">Crear nuevo examen</h1>
        <h4 class="mb-4 text-lg">Ingrese los detalles del examen a continuación:</h4>

        <p class="mb-6 text-sm">
            Complete todos los campos necesarios para crear un nuevo examen. Asegúrese de agregar las preguntas y opciones correspondientes para que los
            participantes puedan responder correctamente. Puede agregar tantas preguntas como desee.
        </p>

        <div class="mb-3">
            <label class="block text-sm font-medium">
                Nombre
                <div class="mt-2">
                    <input
                        type="text"
                        v-model="exam.name"
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
                        v-model="exam.description"
                        rows="4"
                        class="bg-gray-600 block w-full rounded-md border-0 py-1.5 px-3 outline-none shadow-sm sm:text-sm"
                        required
                    ></textarea>
                </div>
            </label>
        </div>

        <div class="w-5xl mx-auto mt-6">
            <tab-menu>
                <tab-slide :header="slideHeadGenerator('Preguntas', NumberedListIcon)">
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
                                        <div
                                            v-for="(cOption, index) in selectedQuestion.options"
                                            :key="index"
                                            class="items-center p-4 rounded-md hover:bg-gray-500 flex"
                                        >
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
    </div>
</template>
