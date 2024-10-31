import { signinWithToken } from '@/composables/apiComposable'
import { TOKEN } from '@/globals'
import { useUser } from '@/stores/userStore'
import type { NavigationGuardWithThis } from 'vue-router'

type TGuard = (...args: Parameters<NavigationGuardWithThis<undefined>>) => Promise<boolean>
export const authGuard: TGuard = async (to) => {
    return new Promise((resolve) => {
        if (!to.meta.requireLogin) resolve(true)

        const userstore = useUser()
        if (userstore.user) resolve(true)
        else {
            if (TOKEN === '') resolve(false)
            else
                signinWithToken({
                    onError(error) {
                        resolve(false)
                    },
                    onSuccess(data) {
                        userstore.user = data.user
                        userstore.token = data.token
                        resolve(true)
                    }
                }).call({ token: TOKEN })
        }
    })
}
