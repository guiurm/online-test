import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const cuestions = ref(0)

  return { cuestions }
})
