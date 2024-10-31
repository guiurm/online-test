<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import { signup } from '@/composables/apiComposable'
import { COOKIE_TOKEN_KEY } from '@/globals'
import { useUser } from '@/stores/userStore'
import { createToast, ToastContainer } from '@guiurm/bit-craft'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUser()
const { call, loading } = signup({
    onError(e) {
        createToast({ message: e.message, type: 'error' }, 'registerToast')
    },
    onSuccess(data) {
        createToast({ message: 'Registrado con éxito' }, 'registerToast')
        userStore.user = data.user
        userStore.token = data.token
        localStorage.setItem(COOKIE_TOKEN_KEY, data.token)
        router.push({ name: 'dashboard.index' })
    }
})

const registerUser = () => {
    call({ email: email.value, name: username.value, password: password.value })
}
const username = ref('')
const email = ref('')
const password = ref('')
</script>
<template>
    <toast-container id="registerToast" />
    <NavbarComponent />
    <main class="w-full h-full">
        <section class="max-w-5xl mx-auto py-6">
            <div class="flex items-center justify-center min-h-screen">
                <div class="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">Registrar Usuario</h2>
                    <form @submit.prevent="registerUser">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-900" for="username">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="username"
                                v-model="username"
                                required
                                class="text-dark-900 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-900" for="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                v-model="email"
                                required
                                class="text-dark-900 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-900" for="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                v-model="password"
                                required
                                class="text-dark-900 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            :disabled="loading"
                            type="submit"
                            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Registrarse
                        </button>
                    </form>
                    <router-link class="mt-4 text-primary-500 block text-center" :to="{ name: 'auth.signin' }">Login</router-link>
                </div>
            </div>
        </section>
    </main>
</template>
