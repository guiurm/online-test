<script setup lang="ts">
defineSlots<{ title: {}; default: {} }>()
defineProps<{ reverse?: boolean }>()
</script>
<template>
    <article class="grid grid-cols-12 my-6 px-8 py-6 rounded-md bg-dark-950">
        <div class="col-span-5" :class="{ 'order-2': reverse }">
            <img src="/img/choose.svg" alt="qqq" />
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
</template>
