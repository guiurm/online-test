<script lang="ts" setup>
import { getExam } from '@/composables/apiComposable'
import type { ICreateExam } from '@/composables/apiTypes'
import { CarouselCard, CarouselContainer } from '@guiurm/bit-craft'
import { ref } from 'vue'

const props = defineProps<{ examId: string }>()

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
const answers = ref<Record<number, number>>({})
const showCorrection = ref(false)
</script>

<template>
    <carousel-container v-if="exam.questions.length !== 0 && !showCorrection">
        <template #default>
            <carousel-card v-for="(cQuestion, questionIndex) in exam.questions" :key="cQuestion.id">
                <div class="pr-8">
                    <div class="flex flex-col border border-primary-500 p-4 rounded-md">
                        <span class="h5">{{ cQuestion.title }}</span>
                        <p class="h6 mt-2 mb-6">{{ cQuestion.body }}</p>
                        <div class="flex flex-col">
                            <div
                                class="flex items-center ps-4 my-1 border rounded cursor-pointer hover:bg-primary-900/20 transition-colors"
                                :class="{ 'bg-primary-800': answers[questionIndex] === optionIndex }"
                                v-for="(cOption, optionIndex) in cQuestion.options"
                                :key="cOption.id"
                                @click="() => (answers[questionIndex] = optionIndex)"
                            >
                                {{ cOption.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </carousel-card>
        </template>
    </carousel-container>
    <div class="flex mt-6 justify-end" v-if="!showCorrection">
        <div class="btn w-fit" v-if="Object.keys(answers).length === exam.questions.length" @click="() => (showCorrection = true)">Corregir</div>
        <div class="p-2 bg-primary-300 rounded-md cursor-not-allowed w-fit" v-else>Corregir</div>
    </div>

    <template v-if="showCorrection">
        <div class="h2">
            Nota total:
            {{ Object.keys(answers).filter((index) => exam.questions[Number(index)].options[answers[Number(index)]].correct).length }} /
            {{ exam.questions.length }}
        </div>
        <div class="my-6 flex flex-col" v-for="(question, questionIndex) in exam.questions" :key="questionIndex">
            <h5>{{ question.title }}</h5>
            <p>{{ question.body }}</p>
            <div
                class="flex items-center ps-4 my-1 border rounded transition-colors"
                :class="{
                    'bg-green-500': option.correct,
                    'bg-red-500': answers[questionIndex] === optionIndex && !option.correct
                }"
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
            >
                {{ option.text }}
            </div>
        </div>
    </template>
</template>
