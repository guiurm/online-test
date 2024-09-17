<script lang="ts" setup>
import { inject, onUnmounted, ref } from 'vue'
import { CARROUSEL_ACTIONS, type TCarrouselCardInjection } from './carrouselConstants'
import CarrouselSubscriber, { type TCarrouselCardPosition } from './CarrouselSubscriber'

const addCard = inject(CARROUSEL_ACTIONS) as TCarrouselCardInjection
const subscriber = new CarrouselSubscriber()

const name = ref('')
subscriber.on((d) => {
    // console.log(position.value, d)

    if (position.value === 'visible') {
        if (d === 'left') {
            name.value = 'rl' //ok
            console.log('a')
        }
        if (d === 'right') {
            name.value = 'lr' //ok
            console.log('b')
        }
    } else if (d === 'visible') {
        if (position.value === 'left') {
            console.log('c')

            name.value = 'lr'
        }
        if (position.value === 'right') {
            name.value = 'rl' //@TODO solucion 1 click izq lr
            console.log('d')
        }
    } else if (d === 'hidden') {
        if (position.value === 'left') {
            console.log('e')

            name.value = 'rl'
        }
        if (position.value === 'right') {
            name.value = 'rl'
            console.log('f')
        }
    }

    position.value = d
})
const id = parseInt(Date.now() * 0.01 * Math.random() + '').toString(16)

const position = ref('hidden' as TCarrouselCardPosition)

addCard({ id, subscriber })
onUnmounted(() => subscriber.clear())
</script>
<template>
    <transition :name="name">
        <div v-show="position === 'visible'" class="w-full flex-shrink-0 absolute">
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
