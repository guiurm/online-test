import type { TExamQuestion, TExamQuestionOption, TQuestion } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useExamStore = defineStore('exam', () => {
    const exam = ref(new Examn())

    const addQuestions = (...args: Parameters<InstanceType<typeof Examn>['addQuestions']>) => {
        exam.value.addQuestions(...args)
    }

    const answerQuestion = (...args: Parameters<InstanceType<typeof Examn>['answerQuestion']>) => {
        exam.value.answerQuestion(...args)
    }

    const questions = computed(() => exam.value.questions)
    const allAnswered = computed(() => exam.value.allAnswered)
    const totalFailed = computed(() => exam.value.totalFailed)
    const totalAnswered = computed(() => exam.value.totalAnswered)

    return { questions, addQuestions, answerQuestion, allAnswered, totalFailed, totalAnswered }
})

export default class Examn {
    private _questions: TExamQuestion[]

    constructor(questions: TQuestion[] = []) {
        this._questions = [] // questions.map((q) => ({ ...q, id: generarUUID(), correctAnswer: null, answered: false, reason: q.reason ?? '' }) as TExamQuestion)
        this.addQuestions(questions)
    }

    public addQuestions(questions: TQuestion[]) {
        this._questions.push(
            ...questions.map(
                (q) =>
                    ({
                        ...q,
                        id: generarUUID(),
                        correctAnswer: null,
                        answered: false,
                        reason: q.reason ?? 'No se ha definido una explicación para esta respuesta',
                        options: q.options.map((o) => ({ ...o, selected: false }) as TExamQuestionOption) as TExamQuestionOption[]
                    }) as TExamQuestion
            )
        )

        return this
    }

    public answerQuestion(questionUUID: string, optionIndex: number) {
        const question = this._questions.find((q) => q.id === questionUUID)
        const option: TExamQuestionOption | null = !question ? null : question.options[optionIndex]
        if (option === null || !question) throw 'Option not found'
        question.options.forEach((o) => ((o as TExamQuestionOption).selected = false))
        question.answered = true
        question.correctAnswer = option.correct
        option.selected = true
        return this
    }

    public get totalAnswered(): number {
        return this._questions.filter((q) => q.answered).length
    }

    public get totalFailed(): number {
        return this._questions.filter((q) => q.correctAnswer === false).length
    }

    public get questions() {
        return this._questions
    }

    public get allAnswered() {
        return this.totalAnswered === this._questions.length
    }
}

function generarUUID(): string {
    // Generar un número aleatorio de 128 bits
    const randomBits: number = Math.random() * 0xfffffffffffff

    // Convertir a hexadecimal
    const hexUUID: string = randomBits.toString(16).padStart(32, '0')

    // Insertar guiones
    const uuid: string = `${hexUUID.slice(0, 8)}-${hexUUID.slice(8, 12)}-${hexUUID.slice(12, 16)}-${hexUUID.slice(16, 20)}-${hexUUID.slice(20)}`

    // Ajustar la versión (en este caso, versión 4)
    const uuidConVersion: string = uuid.slice(0, 14) + '4' + uuid.slice(15)

    // Ajustar la variante (esto es opcional)
    const uuidFinal: string = uuidConVersion.slice(0, 19) + '8' + uuidConVersion.slice(20)

    return uuidFinal
}

// Generar y mostrar un UUID
console.log(generarUUID())
