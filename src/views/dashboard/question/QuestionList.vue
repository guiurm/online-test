<script setup lang="ts">
import { CDatatable, CDatatableCellHeader, CDatatableHeader } from '@guiurm/bit-craft'
</script>
<template>
    <h1 class="mb-4 text-2xl font-bold">Lista de preguntas creadas</h1>
    <h4 class="mb-4 text-lg">Preguntas generadas y utilizadas como batería para preguntas</h4>

    <p class="mb-6 text-sm">En este apartado puedes gestionar todas tus pregutnas creadas en la plataforma.</p>
    <c-datatable :cols="3">
        <template #header>
            <c-datatable-header :cols="3">
                <c-datatable-cell-header>ID</c-datatable-cell-header>
                <c-datatable-cell-header>Titulo</c-datatable-cell-header>
                <c-datatable-cell-header>Nº opciones</c-datatable-cell-header>
            </c-datatable-header>
        </template>
    </c-datatable>
</template>
