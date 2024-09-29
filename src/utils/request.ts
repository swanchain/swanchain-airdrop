import axios, { type AxiosRequestConfig } from 'axios'
import { clearLoginInfo, connectFaild, token } from './storage'
import globalConfig from '@/config'
import { timeout, urlClear, messageTip, throttleLast } from './common'

const instance = axios.create({
  baseURL: '',
  timeout: globalConfig.api_timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    // config.url = (config.base || import.meta.env.VITE_BASEAPI) + config.url
    return config
  },
  (error) => {
    console.error('request error', error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    const { code, message, data, status } = res.data
    switch (res.status) {
      case 200:
        if (code == 0 || status === 'success' || status === 200) {
          return res.data
        }
        messageTip('error', message)
        throw res.data
      // case 401:
      //   ElMessage.error({ message: '401' })
      //   break
      default:
        messageTip('error', message)
        break
    }
    throw res.data
  },
  async (err) => {
    console.error('response error', err)
    if (err?.response?.data) {
      const { message, msg, error } = err.response.data
      const { status } = err.response
      const m = message || msg || error
      if (status === 401) {
        // await timeout(2000)
        // urlClear()
        const time = await throttleLast()
        if (time) {
          messageTip('error', m)
          clearLoginInfo()
        }
      } else if (status === 403 && m.indexOf('for login') > -1) {
        const time = await throttleLast()
        if (time) {
          messageTip('error', m)
          connectFaild.value = true
        }
      } else messageTip('error', m)
    }
    return Promise.reject(err.response.data)
  }
)

type Req = <R = { status: number; data: any; message: string }>(config: AxiosRequestConfig<any>) => Promise<R>

export const request: Req = instance
