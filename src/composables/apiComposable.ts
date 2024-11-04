import { API_BASE_URL, TOKEN } from '@/globals'
import { reactiveAsyncCallback } from '@guiurm/bit-craft'
import { Axios, type Method } from 'axios'
import type {
    IAPIQuestion,
    ICreateExam,
    ICreateExamQuestion,
    IExam,
    TSignInRequestBody,
    TSignInResponseBody,
    TSignupRequestBody,
    TSignupResponseBody
} from './apiTypes'

const axios = new Axios({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    }
})

type TGenConf<Request, Response> = Pick<Parameters<typeof useApiCall<Request, Response>>[0], 'onError' | 'onSuccess'>

const useApiCall = <TRequest, TResponse>(conf: { method: Method; url: string; onSuccess?: (data: TResponse) => void; onError?: (error: Error) => void }) => {
    const { method, url, onError, onSuccess } = conf
    return reactiveAsyncCallback(
        async (data: TRequest) => {
            const response = await axios.request({ method, url, data: JSON.stringify(data) })
            const dataParsed = JSON.parse(response.data)

            if (response.status >= 400) throw new Error(`Error: ${dataParsed.message.toString()}`)

            return dataParsed as TResponse
        },
        {
            autoCall: false,
            onError,
            onSuccess
        }
    )
}

// AUTH
export const signup = (conf: TGenConf<TSignupRequestBody, TSignupResponseBody> = {}) => {
    return useApiCall<TSignupRequestBody, TSignupResponseBody>({
        method: 'POST',
        url: '/auth/signup',
        ...conf
    })
}

export const signin = (conf: TGenConf<TSignInRequestBody, TSignInResponseBody> = {}) => {
    return useApiCall<TSignInRequestBody, TSignInResponseBody>({
        method: 'POST',
        url: '/auth/signin',
        ...conf
    })
}

export const signinWithToken = (conf: TGenConf<{ token: string }, TSignInResponseBody> = {}) => {
    return useApiCall<{ token: string }, TSignInResponseBody>({
        method: 'POST',
        url: '/auth/signin/t',
        ...conf
    })
}

// USER
export const userProfile = () => {
    return reactiveAsyncCallback(
        async (id: number) => {
            return (await axios.get(`/user/${id}`)).data
        },
        {
            autoCall: false
        }
    )
}

// EXAM
export const createExam = (conf: TGenConf<ICreateExam, ICreateExam> = {}) => {
    return useApiCall<ICreateExam, ICreateExam>({
        method: 'POST',
        url: '/exam/new',
        ...conf
    })
}

export const editExam = (examId: number, conf: TGenConf<ICreateExam, ICreateExam> = {}) => {
    return useApiCall<ICreateExam, ICreateExam>({
        method: 'PUT',
        url: `/exam/edit/${examId}`,
        ...conf
    })
}

export const getUserExams = (conf: TGenConf<undefined, IExam[]> = {}) => {
    return useApiCall<undefined, IExam[]>({
        method: 'GET',
        url: '/exam/list',
        ...conf
    })
}

export const getExam = (conf: TGenConf<undefined, IExam> = {}) => {
    return reactiveAsyncCallback(
        async (id: number) => {
            const response = await axios.get(`/exam/list/${id}`)
            const dataParsed = JSON.parse(response.data)

            if (response.status >= 400) throw new Error(`Error: ${dataParsed.message.toString()}`)

            return dataParsed as IExam
        },
        {
            autoCall: false,
            ...conf
        }
    )
}

// QUESTION
export const getUserQuestions = (conf: TGenConf<undefined, IAPIQuestion[]> = {}) => {
    return useApiCall({ method: 'GET', url: '/question/by-user', ...conf })
}

export const getQuestion = (conf: TGenConf<undefined, IAPIQuestion> = {}) => {
    return reactiveAsyncCallback(
        async (keycode: string) => {
            const response = await axios.get(`/question/${keycode}`)
            const dataParsed = JSON.parse(response.data)

            if (response.status >= 400) throw new Error(`Error: ${dataParsed.message.toString()}`)

            return dataParsed as IAPIQuestion
        },
        {
            autoCall: false,
            ...conf
        }
    )
}

export const updateQuestion = (conf: TGenConf<IAPIQuestion, IAPIQuestion> = {}) => {
    return reactiveAsyncCallback(
        async (keycode: string, data: IAPIQuestion) => {
            const response = await axios.put(`/question/${keycode}`, JSON.stringify(data))
            const dataParsed = JSON.parse(response.data)

            if (response.status >= 400) throw new Error(`Error: ${dataParsed.message.toString()}`)

            return dataParsed as IAPIQuestion
        },
        {
            autoCall: false,
            ...conf
        }
    )
}

export const createQuestion = (conf: TGenConf<ICreateExamQuestion, ICreateExamQuestion> = {}) => {
    return useApiCall<ICreateExamQuestion, ICreateExamQuestion>({
        method: 'POST',
        url: '/question/add',
        ...conf
    })
}
