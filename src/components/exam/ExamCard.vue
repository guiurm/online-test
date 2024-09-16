<script lang="ts" setup>
import type { TQuestion } from '@/types'
import { ref, type Ref } from 'vue'

const props = defineProps<{ question: TQuestion }>()

const answer = ref(null) as Ref<null | number>

const manageOption = (optionIndex: number) => {
    if (answer.value !== null) return
    const option = props.question.options[optionIndex]
    if (!option) throw 'Invalid option index'

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
            class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
            :class="{
                'bg-red-700 text-white-50': answer !== null && answer === index && option.correct === false,
                'bg-green-500 text-white-50': answer !== null && answer === index && option.correct === true,
                'bg-white-500 text-white-50': answer !== null && answer !== index
            }"
        >
            <!--
            <label class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                <input
                    type="radio"
                    :value="index"
                    :name="question.title"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                {{ option.text }}
            </label>
            -->

            <span class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" @click="manageOption(index)">
                {{ option.text }}
            </span>
        </div>
    </a>
</template>
