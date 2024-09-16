<script lang="ts" setup>
import { computed, inject, onUnmounted, ref } from 'vue'
import { CARROUSEL_ACTIONS, type TCarrouselCardInjection } from './carrouselConstants'
import CarrouselSubscriber, { type TCarrouselCardPosition } from './CarrouselSubscriber'

const addCard = inject(CARROUSEL_ACTIONS) as TCarrouselCardInjection
const subscriber = new CarrouselSubscriber()

subscriber.on((d) => {
    position.value = d
})

const position = ref('hidden' as TCarrouselCardPosition)

const css = computed(() => {
    return { 'hidden order-0': position.value === 'hidden', 'order-first hidden': position.value === 'left', 'order-last hidden': position.value === 'right' }
})

addCard({ id: parseInt(Date.now() * 0.01 * Math.random() + '').toString(16), subscriber })
onUnmounted(() => subscriber.clear())
</script>
<template>
    <div class="w-full flex-shrink-0" :class="css">
        <slot />
    </div>
</template>
