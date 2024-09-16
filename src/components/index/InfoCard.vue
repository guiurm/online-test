<script setup lang="ts">
defineSlots<{ title: {}; default: {} }>()
defineProps<{ reverse?: boolean; img: { src: string; alt: string } }>()
</script>
<template>
    <!--
    <article class="grid grid-cols-12 my-6 px-8 py-6 rounded-md bg-dark-950">
        <div class="col-span-5" :class="{ 'order-2': reverse }">
            <img class="object-cover w-72" :src="img.src" :alt="img.alt" />
        </div>
        <div class="col-span-7 flex flex-col" :class="{ 'order-1': reverse }">
            <h2 class="text-3xl mb-8 mt-12 font-sans font-semibold leading-tight">
                <slot name="title" />
            </h2>
            <p class="text-lg max-w-[60ch] font-medium text-white-300 md:text-xl">
                <slot />
            </p>
        </div>
    </article>
    -->

    <a
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
        <img class="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg p-8 md:p-3" :src="img.src" :alt="img.alt" />
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
