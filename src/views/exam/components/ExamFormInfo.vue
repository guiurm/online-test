<script setup lang="ts">
import type { ICreateExam } from '@/composables/apiTypes'
import { computed, ref } from 'vue'

const props = defineProps<{ modelValue: ICreateExam }>()
const emits = defineEmits<{
    'update:modelValue': [exam: ICreateExam]
}>()

const examRef = ref(props.modelValue)

const name = computed({
    get() {
        return props.modelValue.name
    },
    set(n: string) {
        examRef.value.name = n
        emits('update:modelValue', examRef.value)
    }
})

const description = computed({
    get() {
        return props.modelValue.description
    },
    set(n: string) {
        examRef.value.description = n
        emits('update:modelValue', examRef.value)
    }
})
</script>
<template>
    <div class="mb-3">
        <label class="block text-sm font-medium">
            Nombre
            <div class="mt-2">
                <input type="text" v-model="name" class="bg-gray-600 block w-full rounded-md border-0 py-1.5 px-3 outline-none shadow-sm sm:text-sm" required />
            </div>
        </label>
    </div>

    <div class="mb-3">
        <label class="block text-sm font-medium">
            Descripción
            <div class="mt-2">
                <textarea
                    v-model="description"
                    rows="4"
                    class="bg-gray-600 block w-full rounded-md border-0 py-1.5 px-3 outline-none shadow-sm sm:text-sm"
                    required
                ></textarea>
            </div>
        </label>
    </div>
</template>
