<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import { getUserExams } from '@/composables/apiComposable'
import { buildDatatableCell, buildDatatableRows, CDatatable, type TRowProps } from '@guiurm/bit-craft'
import { ref } from 'vue'

const rows = ref<TRowProps[]>([])
const {
    call: getList,
    loading,
    error
} = getUserExams({
    onSuccess: (list) => {
        rows.value.length = 0
        console.log('b')

        list.forEach((e) => {
            console.log(e)
        })
        rows.value.push(
            ...buildDatatableRows(
                list.map((cE) => ({
                    cells: [buildDatatableCell({ value: cE.id }), buildDatatableCell({ value: cE.name }), buildDatatableCell({ value: cE.questions.length })]
                }))
            )
        )
    }
})
getList(undefined)
</script>
<template>
    <main class="w-full h-full">
        <navbar-component />
        <div class="container mx-auto px-4 py-2 pt-6">
            <h1 class="mb-4 text-2xl font-bold">Lista de examenes</h1>
            <h4 class="mb-4 text-lg">Todos los exámenes creados por:</h4>
            <!--
                
                <p class="mb-6 text-sm">
                    Complete todos los campos necesarios para crear un nuevo examen. Asegúrese de agregar las preguntas y opciones correspondientes para que los
                    participantes puedan responder correctamente. Puede agregar tantas preguntas como desee.
                </p>
                
            -->
            <c-datatable :rows="rows" :cols="3" />
        </div>
    </main>
</template>
