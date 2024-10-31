<script setup lang="ts">
import PanelLayout from '@/layouts/PanelLayout.vue'
import { ArrowRightEndOnRectangleIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'
</script>

<template>
    <panel-layout>
        <template #nav>
            <header class="py-4">
                <nav class="px-4 text-sm flex justify-between items-center">
                    <a class="h5">Logo</a>
                    <ul class="flex gap-2">
                        <li class="cursor-pointer">Account</li>
                    </ul>
                </nav>
            </header>
        </template>
        <template #aside>
            <div class="p-4 h-full flex flex-col justify-between">
                <nav class="">
                    <ul class="flex flex-col">
                        <li class="glow mb-2 cursor-pointer hover:text-primary-400">Examenes</li>
                        <li class="glow mb-2 cursor-pointer hover:text-primary-400">Preguntas</li>
                        <li class="glow mb-2 cursor-pointer hover:text-primary-400">Correcciones</li>
                    </ul>
                </nav>
                <nav class="">
                    <ul class="flex flex-col">
                        <li class="glow mb-2 cursor-pointer hover:text-primary-400">
                            <a class="flex items-center">
                                <cog6-tooth-icon class="size-5 mr-2" />
                                Ajustes
                            </a>
                        </li>
                        <li class="glow cursor-pointer hover:text-primary-400">
                            <a class="flex items-center">
                                <arrow-right-end-on-rectangle-icon class="size-5 mr-2" />
                                Desconectar
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </template>

        <template #body> body </template>
    </panel-layout>
</template>
