<script setup lang="ts">
import { computed } from 'vue'

defineSlots<{ title: {}; default: {} }>()
const props = defineProps<{ reverse?: boolean; img: { src: string; alt: string } }>()

const src = computed(() => `${props.img.src}`) //import.meta.env.DEV === true ? props.img.src : `/online-test${props.img.src}`))
</script>
<template>
    <a
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
        <img class="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg p-8 md:p-3" :src="src" :alt="img.alt" />
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight">
                <slot name="title" />
            </h5>
            <p class="mb-3 font-normal text-white-300">
                <slot />
            </p>
        </div>
    </a>
</template>
