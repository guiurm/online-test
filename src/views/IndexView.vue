<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import InfoCard from '@/components/index/InfoCard.vue'
import { cardsData } from '@/static/indexCardsData'

cardsData
</script>
<template>
    <!--
    <main class="md:container md:mx-auto mt-4 p-4 rounded-md bg-white">
        <h1 class="text-5xl mb-3 font-bold">Generador de test en linea!</h1>
        <hr class="-mx-4" />
        <section>
            <p class="font-medium text-lg mt-10">¡Bienvenido a nuestra plataforma de pruebas en línea!</p>
            <p class="font-medium text-lg my-3">
                ¿Estás listo para poner a prueba tus conocimientos? Explora un nuevo enfoque educativo con nuestra herramienta de tests personalizados. Carga tu
                JSON, resuelve cuestionarios divertidos y mejora tus habilidades de manera interactiva.
            </p>
        </section>
        <section class="mt-12">
            <h2 class="text-3xl font-bold">¿Cómo generar un test?</h2>
            <p class="font-medium text-lg mt-4 mb-10">
                Bienvenido a nuestra plataforma de generación de tests online. ¡Aquí puedes crear tus propias preguntas y mantener el control de la información
                de forma anónima! Sigue estos sencillos pasos:
            </p>
            <h4 class="text-xl mt-4 mb-3 font-semibold">Crea un archivo JSON con el siguiente formato:</h4>
            <p class="mb-4">Crea un archivo JSON con el siguiente formato:</p>
            <div class="bg-gray-900 pr-12 rounded-lg w-fit mx-auto">
                <pre class="text-white font-mono w-fit">
          <code>
          [
            {
              "title": "Título de la pregunta",
              "subtitle": "Descripción de la pregunta",
              "questions": [
                {
                    "text": "Opción 1",
                    "correct": true
                    }
                ]
            }
          ]
          </code>
        </pre>
            </div>
        </section>

        <section class="my-10">
            <div class="tes-lg mb-4 text-2xl pb-2 mx-auto w-fit border-b-2 border-gray-200">¡Generar test!</div>

            <router-link
                to="/exam"
                class="w-fit block bg-blue-500 mx-auto text-white px-3 py-2 rounded-md cursor-pointer hover:bg-blue-400 active:bg-blue-600 select-none"
            >
                Generar
            </router-link>
        </section>
    </main>
    -->
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
                    <div class="flex mt-6">
                        <a class="btn w-fit" href="#info">Más información</a>
                        <router-link :to="{ name: 'exam.editor' }" class="ml-6 btn-outline w-fit">Crear test</router-link>
                    </div>
                </div>
                <div class="mx-auto xl:mx-0 mt-6">
                    <img class="xl:max-w-[350px] max-w-[500px]" src="/img/undraw_setup_wizard_re_nday.svg" alt="Logo" />
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
