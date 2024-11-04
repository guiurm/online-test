<script setup lang="ts">
import PanelLayout from '@/layouts/PanelLayout.vue'
import { useUser } from '@/stores/userStore'
import { ArrowRightEndOnRectangleIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'

import { CollapseComponent, DropdownComponent } from '@guiurm/bit-craft'

const userStore = useUser()
</script>

<template>
    <panel-layout>
        <template #nav>
            <header class="py-4">
                <nav class="px-4 text-sm flex justify-between items-center">
                    <a class="h5">
                        <router-link :to="{ name: 'dashboard.index' }"> Dashboard </router-link>
                    </a>
                    <ul class="flex gap-2">
                        <dropdown-component>
                            <template #header>
                                <li class="bg-background-dark cursor-pointer glow">{{ userStore.user?.name }}</li>
                            </template>
                            <template #default>
                                <div class="p-4 rounded-md mt-4 bg-background-dark border border-primary-900">
                                    <ul class="flex">
                                        <li class="glow cursor-pointer hover:text-primary-400">
                                            <router-link to="/">Inicio</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </dropdown-component>
                    </ul>
                </nav>
            </header>
        </template>
        <template #aside>
            <div class="h-full flex flex-col gap-[1px] justify-between bg-primary-500">
                <nav class="p-4 h-full bg-background-dark">
                    <ul class="flex flex-col">
                        <collapse-component>
                            <template #header>
                                <li class="glow mb-2 cursor-pointer hover:text-primary-400">Examenes</li>
                            </template>
                            <template #default>
                                <ul class="flex flex-col ml-2">
                                    <li class="glow mb-2 cursor-pointer text-white-400 hover:text-primary-400">
                                        <router-link :to="{ name: 'dashboard.exam.new', params: {} }"> crear examen </router-link>
                                    </li>
                                    <li class="glow mb-2 cursor-pointer text-white-400 hover:text-primary-400">
                                        <router-link :to="{ name: 'dashboard.exam.list', params: {} }">ver examenes </router-link>
                                    </li>
                                </ul>
                            </template>
                        </collapse-component>
                        <collapse-component>
                            <template #header>
                                <li class="glow mb-2 cursor-pointer hover:text-primary-400">Preguntas</li>
                            </template>
                            <template #default>
                                <ul class="flex flex-col ml-2">
                                    <li class="glow mb-2 cursor-pointer text-white-400 hover:text-primary-400">
                                        <router-link :to="{ name: 'dashboard.question.add', params: {} }">crear </router-link>
                                    </li>
                                    <li class="glow mb-2 cursor-pointer text-white-400 hover:text-primary-400">
                                        <router-link :to="{ name: 'dashboard.question.list', params: {} }">lista de preguntas </router-link>
                                    </li>
                                </ul>
                            </template>
                        </collapse-component>
                        <collapse-component>
                            <template #header>
                                <li class="glow mb-2 cursor-pointer hover:text-primary-400">Correcciones</li>
                            </template>
                            <template #default> </template>
                        </collapse-component>
                        <collapse-component> body </collapse-component>
                    </ul>
                </nav>
                <nav class="p-4 bg-background-dark">
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

        <template #body> <slot /> </template>
    </panel-layout>
</template>
