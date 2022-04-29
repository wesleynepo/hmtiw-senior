import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const axiosSenior: AxiosInstance = axios.create({
  baseURL: 'https://platform.senior.com.br/'
})
