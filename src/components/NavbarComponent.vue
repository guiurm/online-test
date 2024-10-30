<script setup lang="ts"></script>
<template>
    <header class="px-6 py-4 flex shadow-md sticky w-full bg-white/95 glass">
        <router-link to="/">
            <div class="flex">
                <div class="text-xl">Online test</div>
                <div class="ml-2 size-3 bg-blue-600 rounded-full"></div>
            </div>
        </router-link>
        <div class="ml-auto flex gap-8">
            <router-link class="hover:text-primary-500" to="/exam/editor">
                <div class="flex">
                    <div class="text-base">Crear test</div>
                </div>
            </router-link>

            <router-link class="hover:text-primary-500" to="/doc/ia">
                <div class="flex">
                    <div class="text-base">Generar JSON con ia</div>
                </div>
            </router-link>
        </div>
    </header>
</template>
