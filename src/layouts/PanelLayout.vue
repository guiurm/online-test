<script setup lang="ts">
defineSlots<{ nav: []; aside: []; body: [] }>()
</script>

<template>
    <div class="panel">
        <div class="panel-nav">
            <div class="">
                <slot name="nav"> a </slot>
            </div>
        </div>
        <div class="panel-aside">
            <slot name="aside"></slot>
        </div>
        <div class="panel-body">
            <div class="w-full mx-auto my-16 space-y-16 max-w-7xl">
                <main class="mx-6">
                    <slot name="body"></slot>
                </main>
            </div>
        </div>
        <!--
        <div class="i5">footer</div>
        -->
    </div>
</template>
