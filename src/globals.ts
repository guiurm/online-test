export const COOKIE_TOKEN_KEY = 'O7SgvRgYFJJE0jJ'
export const TOKEN = localStorage.getItem(COOKIE_TOKEN_KEY) ?? ''
export const API_BASE_URL = import.meta.env.VITE_API_URL