import type { IApiUser } from '@/composables/apiTypes'
import { TOKEN } from '@/globals'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUser = defineStore('userStore', () => {
    const user = ref<null | IApiUser>(null)
    const token = ref<string>(TOKEN)

    return { user, token }
})
