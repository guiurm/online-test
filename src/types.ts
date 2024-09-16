export type TQuestionOption = { text: string; correct: boolean }
export type TQuestion = {
    title: string
    subtitle: string
    options: TQuestionOption[]
}

export type TExamQuestion = TQuestion & {
    id: string
    correctAnswer: boolean | null
    answered: boolean
}
