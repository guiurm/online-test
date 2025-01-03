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
export interface ICreateExamQuestion {
    body: string
    options: IExamQuestionOption[]
    title: string
}

export interface IExamQuestionOption {
    correct: boolean
    examQuestionId: number
    id: number
    reason: null | string
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
export type TSignupResponseBody = { token: string; user: IApiUser }

export type TSignInRequestBody = { email: string; password: string }
export type TSignInResponseBody = { token: string; user: IApiUser }
export type TUserProfileResponseBody = { name: string; email: string }

//user
export interface IApiUser {
    email: string
    keycode: null
    name: string
    password: string
    register: Date
}

// question
export interface IAPIQuestion {
    body: string
    creation: Date
    difficultyId: number
    id: number
    keycode: null | string
    title: string
    topics: IAPITopic[]
    options: IAPIQuestionOption[]
    userId: number
}

export interface IAPITopic {
    color: string
    description: string
    id: number
    name: string
}

export interface IAPIQuestionOption {
    correct: boolean
    examQuestionId: number
    id: number
    reason: null
    text: string
}
