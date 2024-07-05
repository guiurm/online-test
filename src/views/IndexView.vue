<script setup lang="ts"></script>
<template>
  <main class="md:container md:mx-auto mt-4 p-4 rounded-md bg-white">
    <h1 class="text-5xl mb-3 font-bold">Generador de test en linea!</h1>
    <hr class="-mx-4" />
    <section>
      <p class="font-medium text-lg mt-10">¡Bienvenido a nuestra plataforma de pruebas en línea!</p>
      <p class="font-medium text-lg my-3">
        ¿Estás listo para poner a prueba tus conocimientos? Explora un nuevo enfoque educativo con
        nuestra herramienta de tests personalizados. Carga tu JSON, resuelve cuestionarios
        divertidos y mejora tus habilidades de manera interactiva.
      </p>
    </section>
    <section class="mt-12">
      <h2 class="text-3xl font-bold">¿Cómo generar un test?</h2>
      <p class="font-medium text-lg mt-4 mb-10">
        Bienvenido a nuestra plataforma de generación de tests online. ¡Aquí puedes crear tus
        propias preguntas y mantener el control de la información de forma anónima! Sigue estos
        sencillos pasos:
      </p>
      <h4 class="text-xl mt-4 mb-3 font-semibold">
        Crea un archivo JSON con el siguiente formato:
      </h4>
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
      <div class="tes-lg mb-4 text-2xl pb-2 mx-auto w-fit border-b-2 border-gray-200">
        ¡Generar test!
      </div>

      <router-link
        to="/exam"
        class="w-fit block bg-blue-500 mx-auto text-white px-3 py-2 rounded-md cursor-pointer hover:bg-blue-400 active:bg-blue-600 select-none"
      >
        Generar
      </router-link>
    </section>
  </main>
</template>
