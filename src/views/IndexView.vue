<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import InfoCard from '@/components/index/InfoCard.vue'
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
            <div class="py-24 px-4 flex flex-wrap justify-between relative">
                <div class="max-w-3xl mx-auto xl:mx-0">
                    <h1 class="text-5xl font-sans font-bold leading-tight">Crea y comparte exámenes académicos de tipo test en un instante.</h1>
                    <p class="mt-6 text-lg font-medium text-white-300 md:text-xl">
                        Diseña exámenes académicos de tipo test fácilmente. La web corrige automáticamente y otorga puntos. Comparte tus tests con un enlace y
                        desafía a tus amigos.
                    </p>
                    <div class="btn mt-6 w-fit">Más información</div>
                </div>
                <div class="mx-auto xl:mx-0 mt-6">
                    <img class="xl:max-w-[350px] max-w-[500px]" src="/img/undraw_setup_wizard_re_nday.svg" alt="Logo" />
                </div>
            </div>
        </section>
        <section class="max-w-7xl mx-auto">
            <info-card>
                <template #title>Facilidad de Uso y Importación de Exámenes</template>
                Diseña exámenes de manera rápida y sencilla gracias a nuestra interfaz intuitiva. Además, puedes importar tus exámenes en formato JSON,
                facilitando la transferencia de contenido.
            </info-card>

            <info-card reverse>
                <template #title>Corrección Automática</template>
                La plataforma se encarga de corregir los exámenes de forma automática, permitiéndote recibir resultados inmediatos. Obtén tus puntuaciones sin
                complicaciones y ahorra tiempo.
            </info-card>

            <info-card>
                <template #title>Personalización de Tests</template>
                Adapta cada examen a tus necesidades específicas. Puedes personalizar el número de preguntas, el formato y las opciones correctas, asegurando
                que cada test sea único y pertinente.
            </info-card>

            <info-card reverse>
                <template #title>Compartir con Facilidad</template>
                Comparte tus exámenes de manera sencilla a través de un enlace único. Invita a amigos y compañeros a participar y a poner a prueba sus
                conocimientos de forma efectiva.
            </info-card>

            <info-card>
                <template #title>Análisis de Resultados</template>
                Obtén estadísticas detalladas sobre el rendimiento de los participantes. Analiza los resultados para identificar áreas de mejora y ajustar tus
                tests según sea necesario.
            </info-card>

            <info-card reverse>
                <template #title>Accesibilidad en Línea</template>

                Accede a la plataforma desde cualquier dispositivo con conexión a Internet. Crea, realiza y corrige exámenes sin importar dónde te encuentres.
            </info-card>
        </section>
    </main>
</template>
