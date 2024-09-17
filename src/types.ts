export type TQuestionOption = { text: string; correct: boolean }
export type TExamQuestionOption = { text: string; correct: boolean; selected: boolean }
export type TQuestion = {
    title: string
    subtitle: string
    options: TQuestionOption[]
    reason?: string
}

export type TExamQuestion = TQuestion & {
    id: string
    correctAnswer: boolean | null
    answered: boolean
    reason: string
    options: TExamQuestionOption[]
}
