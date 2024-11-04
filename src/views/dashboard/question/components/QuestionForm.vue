<script setup lang="ts">
import type { ICreateExamOption, ICreateExamQuestion } from '@/composables/apiTypes'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { reactive, watch } from 'vue'

const props = defineProps<{ modelValue: ICreateExamQuestion }>()

const question = reactive(props.modelValue)

const updateCorrectness = (selectedIndex: number) => {
    if (!question) return
    question.options.forEach((option, index) => {
        option.correct = index === selectedIndex
    })
}
const removeOption = (option: ICreateExamOption) => {
    if (!question) return
    question.options = question.options.filter((o) => o !== option)
}
const addOption = () => {
    question.options.push({ correct: false, reason: '', text: '' })
}

watch(question, (n) => {
    console.log('change')
    console.log(n)
})
</script>
<template>
    <div class="w-full flex items-center justify-between mb-2">
        <h6 class="w-fit">Contenido</h6>
        <a @click="addOption" class="text-sm text-primary-500 hover:text-primary-400 cursor-pointer">Añadir</a>
    </div>
    <div class="p-4 rounded-md bg-gray-600 text">
        <label class="block h6 mb-4">
            Titulo de pregunta
            <input
                type="text"
                v-model="question.title"
                placeholder="Respuesta"
                class="mt-2 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </label>
        <label class="block h6 mb-4">
            Enunciado de pregunta
            <input
                type="text"
                v-model="question.body"
                placeholder="Respuesta"
                class="mt-2 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </label>

        <span> Opciones para la pregunta </span>
        <form @submit.prevent="() => void 0">
            <div v-for="(cOption, index) in question.options" :key="index" class="items-center p-4 rounded-md hover:bg-gray-500 flex">
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
    </div>
</template>
