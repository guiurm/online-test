<script setup lang="ts">
import { getUserExams } from '@/composables/apiComposable'
import { buildDatatableCell, buildDatatableRows, CDatatable, CDatatableCellHeader, CDatatableHeader, type TRowProps } from '@guiurm/bit-craft'
import { h, ref, type Component } from 'vue'

import { PencilSquareIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'

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
                    cells: [
                        buildDatatableCell({ value: cE.id }),
                        buildDatatableCell({ value: cE.name }),
                        buildDatatableCell({ value: cE.questions.length }),
                        buildDatatableCell({
                            value: {
                                node: h(
                                    RouterLink,
                                    { to: { name: 'dashboard.exam.edit', params: { examId: cE.id } }, class: 'btn btn-sm w-fit' },
                                    {
                                        default: () => [h(PencilSquareIcon, { class: 'size-5' })]
                                    }
                                )
                            }
                        })
                    ]
                }))
            )
        )
    }
})
getList(undefined)

const slideHeadGenerator = (text: string, icon: Component) => {
    return h('div', { class: 'btn btn-sm w-fit' }, [h('div', { class: 'mr-2' }, [text]), h(icon, { class: 'size-5' })])
}
</script>
<template>
    <h1 class="mb-4 text-2xl font-bold">Lista de examenes</h1>
    <h4 class="mb-4 text-lg">Todos los exámenes creados por:</h4>

    <c-datatable :rows="rows" :cols="4">
        <template #header>
            <c-datatable-header :cols="4">
                <c-datatable-cell-header>Id</c-datatable-cell-header>
                <c-datatable-cell-header>Nombre</c-datatable-cell-header>
                <c-datatable-cell-header>Número de preguntas</c-datatable-cell-header>
            </c-datatable-header>
        </template>
    </c-datatable>
</template>
