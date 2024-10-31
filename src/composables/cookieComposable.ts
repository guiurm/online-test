export const getCookies = () => {
    const cookies: Record<string, string> = {}
    document.cookie.split('; ').map((c) => {
        const [k, v] = c.split('=')
        cookies[k] = v
    })
    return cookies
}

export const getCookie = (name: string) => {
    return getCookies()[name] ?? null
}
