<script lang="ts" setup>
import { inject, onUnmounted, ref, watch, type Ref } from 'vue'
import { CARROUSEL_ACTIONS, type TCarrouselCardInjection } from './carrouselConstants'
import CarrouselSubscriber, { type TCarrouselCardPosition } from './CarrouselSubscriber'

const { addCard, setContainerHeight } = inject(CARROUSEL_ACTIONS) as TCarrouselCardInjection
const subscriber = new CarrouselSubscriber()

const name = ref('')
const root = ref() as Ref<HTMLDivElement>
const id = parseInt(Date.now() * 0.01 * Math.random() + '').toString(16)
const position = ref('hidden' as TCarrouselCardPosition)

subscriber.on((newPosition) => {
    if (position.value === 'visible') {
        if (newPosition === 'left') {
            name.value = 'rl' //ok
        }
        if (newPosition === 'right') {
            name.value = 'lr' //ok
        }
    } else if (newPosition === 'visible') {
        if (position.value === 'left') {
            name.value = 'lr'
        }
        if (position.value === 'right') {
            name.value = 'rl' //@TODO solucion 1 click izq lr
        }
    } else if (newPosition === 'hidden') {
        if (position.value === 'left') {
            name.value = 'rl'
        }
        if (position.value === 'right') {
            name.value = 'rl'
        }
    }

    position.value = newPosition
})

watch(position, (v) => {
    if (v === 'visible') {
        setTimeout(() => {
            setContainerHeight(root.value.clientHeight)
        }, 0)
    }
})

addCard({ id, subscriber })
onUnmounted(() => subscriber.clear())
</script>
<template>
    <transition :name="name">
        <div ref="root" v-show="position === 'visible'" class="w-full flex-shrink-0 absolute">
            <slot />
        </div>
    </transition>
</template>

<style>
.lr-enter-active,
.lr-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.5s;
    transition-behavior: ease-in-out;
    /* opacity: 1; */
}

.lr-enter-from {
    /* opacity: 0; */
    transform: translateX(-100%);
}
.lr-leave-to {
    /* opacity: 0; */
    transform: translateX(100%);
}

.rl-enter-active,
.rl-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.5s;
    transition-behavior: ease-in-out;
    /* opacity: 1; */
}

.rl-enter-from {
    /*transform: translateY(100%);*/
    transform: translateX(100%);
}
.rl-leave-to {
    /*transform: translateY(-100%);*/
    transform: translateX(-100%);
}
</style>
