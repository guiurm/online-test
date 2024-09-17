<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import InfoCard from '@/components/index/InfoCard.vue'
import { cardsData } from '@/static/indexCardsData'

cardsData
</script>
<template>
    <main class="w-full h-full">
        <navbar-component />

        <section class="max-w-7xl mx-auto">
            <div class="py-24 px-4 flex flex-wrap justify-between relative text-center">
                <div class="max-w-3xl mx-auto xl:mx-0">
                    <h1 class="mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Crea tests online</h1>
                    <p class="mt-6 text-lg font-medium text-white-300 md:text-xl">
                        Diseña exámenes académicos de tipo test fácilmente. La web corrige automáticamente y otorga puntos. Comparte tus tests con un enlace y
                        desafía a tus amigos.
                    </p>
                    <div class="flex flex-col md:flex-row gap-4 md:gap-0 mt-6">
                        <a class="btn w-full md:w-fit" href="#info">Más información</a>
                        <router-link :to="{ name: 'exam.editor' }" class="xl:ml-6 ml-auto btn-outline w-full md:w-fit">Crear test</router-link>
                    </div>
                </div>
                <div class="mx-auto xl:mx-0 mt-6">
                    <img class="xl:max-w-[350px] xs:max-w-full md:max-w-[500px]" src="/img/undraw_setup_wizard_re_nday.svg" alt="Logo" />
                </div>
            </div>
        </section>
        <section class="max-w-5xl mx-auto py-6" id="info">
            <h2 class="mb-4 text-2xl font-semibold tracking-tight text-center leading-none md:text-3xl lg:text-4xl text-white">¿Qué es online-test?</h2>
            <p class="mt-6 mb-20 text-lg text-center font-medium text-white-300 md:text-xl">
                En esta plataforma encontrarás todo lo necesario para crear tus test
            </p>
            <div class="flex flex-col items-center gap-10">
                <info-card v-for="({ body, img, title, reverse }, index) in cardsData" :reverse="reverse" :img="img" :key="index">
                    <template #title>{{ title }}</template>
                    <template #default> {{ body }}</template>
                </info-card>
            </div>
        </section>
    </main>
</template>
