import { reactiveAsyncCallback } from '@guiurm/bit-craft'
import { Axios, type Method } from 'axios'
import type { ICreateExam, IExam, TSignInRequestBody, TSignInResponseBody, TSignupRequestBody, TSignupResponseBody } from './apiTypes'

const baseUrl = 'http://localhost:3000/api'
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1aXVybUBnbWFpbC5jb20iLCJuYW1lIjoiTWFudSIsImlhdCI6MTczMDA2NDkyOCwiZXhwIjoxNzMwNjY5NzI4fQ.ig49ZaHvX37Vzn-MzEtz33MC__G1MdrlGmTDxsiqCTU'

const axios = new Axios({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${token}`,
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

export const signin = (conf: TGenConf<TSignInRequestBody, TSignInResponseBody> = {}) => {
    return useApiCall<TSignInRequestBody, TSignInResponseBody>({
        method: 'POST',
        url: '/auth/signin',
        ...conf
    })
}

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

export const signup = (conf: TGenConf<TSignupRequestBody, TSignupResponseBody> = {}) => {
    return useApiCall<TSignupRequestBody, TSignupResponseBody>({
        method: 'POST',
        url: '/user/signup',
        ...conf
    })
}

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
