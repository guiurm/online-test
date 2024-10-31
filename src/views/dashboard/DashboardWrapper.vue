<script setup lang="ts">
import UserLayout from '@/layouts/UserLayout.vue'
import { RouterView } from 'vue-router'
</script>
<template>
    <user-layout>
        <router-view />
    </user-layout>
</template>
