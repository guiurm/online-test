<script setup lang="ts">
import { getUserQuestions } from '@/composables/apiComposable'
import { buildDatatableCell, buildDatatableRows, CDatatable, CDatatableCellHeader, CDatatableHeader, type TRowProps } from '@guiurm/bit-craft'
import { PencilSquareIcon } from '@heroicons/vue/24/solid'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'

const rows = ref<TRowProps[]>([])
const { call, error, loading } = getUserQuestions({
    onSuccess: (r) => {
        rows.value = buildDatatableRows(
            r.map((q) => ({
                cells: [
                    buildDatatableCell({ value: q.id }),
                    buildDatatableCell({ value: q.title }),
                    buildDatatableCell({ value: q.options.length }),
                    buildDatatableCell({
                        value: {
                            node: h(
                                RouterLink,
                                { to: { name: 'dashboard.question.edit', params: { questionKeycode: q.keycode } }, class: 'btn btn-sm h-fit' },
                                {
                                    default: () => [h(PencilSquareIcon, { class: 'size-5' })]
                                }
                            )
                        }
                    })
                ]
            }))
        )
    }
})
const gridTemplate = '1fr 1fr 1fr 1fr'

call(undefined)
</script>
<template>
    <h1 class="mb-4 text-2xl font-bold">Lista de preguntas creadas</h1>
    <h4 class="mb-4 text-lg">Preguntas generadas y utilizadas como batería para preguntas</h4>

    <p class="mb-6 text-sm">En este apartado puedes gestionar todas tus pregutnas creadas en la plataforma.</p>
    <c-datatable v-if="!error && !loading" :cols="4" :rows="rows" :custom-template-column="gridTemplate">
        <template #header>
            <c-datatable-header :cols="4" :custom-template-column="gridTemplate">
                <c-datatable-cell-header>ID</c-datatable-cell-header>
                <c-datatable-cell-header>Titulo</c-datatable-cell-header>
                <c-datatable-cell-header>Nº opciones</c-datatable-cell-header>
            </c-datatable-header>
        </template>
    </c-datatable>
</template>
