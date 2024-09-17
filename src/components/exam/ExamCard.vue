<script lang="ts" setup>
import { useExamStore } from '@/stores/examStore'
import type { TExamQuestion } from '@/types'
import { ref, type Ref } from 'vue'

const props = defineProps<{ question: TExamQuestion }>()
const exam = useExamStore()
const answer = ref(null) as Ref<null | number>

const manageOption = (optionIndex: number) => {
    //if (props.question.answered) return
    exam.answerQuestion(props.question.id, optionIndex)
    answer.value = optionIndex
}
</script>

<template>
    <a class="block p-6 bg-white border border-primary-600 rounded-lg shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">{{ question.title }}</h5>
        <p class="font-normal mb-4 text-gray-700 dark:text-gray-400">
            {{ question.subtitle }}
        </p>

        <div
            v-for="(option, index) in question.options"
            :key="index"
            class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 cursor-pointer hover:bg-white-500/20 transition-colors"
            :class="{
                // 'bg-red-700 text-white-50': question.answered && !question.correctAnswer,
                // 'bg-green-500 text-white-50': question.answered && question.correctAnswer,
                // 'bg-white-500 text-white-50': question.answered && answer !== index
            }"
        >
            <span class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center" @click="manageOption(index)">
                <span class="material-symbols-outlined mr-4 text-base" :class="{ ' text-transparent': answer !== index }"> radio_button_checked </span>
                {{ option.text }}
            </span>
        </div>
    </a>
</template>
