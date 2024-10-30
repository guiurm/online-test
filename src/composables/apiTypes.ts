// exam
export interface IExam {
    creation: Date
    description: string
    id: number
    name: string
    questions: IExamQuestionOnExamRelation[]
    userId: number
}

export interface IExamQuestionOnExamRelation {
    examId: number
    question: IExamQuestion
    questionId: number
}

export interface IExamQuestion {
    body: string
    creation: Date
    difficultyId: number
    id: number
    options: IExamQuestionOption[]
    title: string
    userId: number
}

export interface IExamQuestionOption {
    correct: boolean
    examQuestionId: number
    id: number
    reason: null
    text: string
}

export interface ICreateExamOption {
    text: string
    correct: boolean
}
export interface ICrateExamQuestion {
    title: string
    body: string
    options: ICreateExamOption[]
}
export interface ICreateExam {
    name: string
    description: string
    questions: ICrateExamQuestion[]
}

export type TSignupRequestBody = { name: string; email: string; password: string }
export type TSignupResponseBody = { name: string; email: string }

export type TSignInRequestBody = { email: string; password: string }
export type TSignInResponseBody = { token: string }
export type TUserProfileResponseBody = { name: string; email: string }
