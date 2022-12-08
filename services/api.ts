import axios, { AxiosInstance } from 'axios'

export interface Api {
  get(url: string, config?: any): Promise<any>
  post(url: string, data?: any, config?: any): Promise<any>
  put(url: string, data?: any, config?: any): Promise<any>
  delete(url: string, config?: any): Promise<any>
}

export const api: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:9000/',
  headers: {
    'Content-type': 'application/json',
  },
})
