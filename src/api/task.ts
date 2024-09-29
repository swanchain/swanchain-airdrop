import { request } from '@/utils/request'

export function getAllTask() {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'task/get_all_tasks',
        method: 'get'
    })
}

export function getCompletedTask(params:any) {
  return request({
      headers: {},
      url: import.meta.env.VITE_BASEAPI + 'task/get_all_completed_tasks',
      method: 'get',
      params
  })
}

export function getVerifyingTask(params:any) {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'task/get_all_verifying_tasks',
        method: 'get',
        params
    })
}

export function completionTask(data: any) {
  return request({
      headers: {
          "Content-Type": "form-data"
      },
      url: import.meta.env.VITE_BASEAPI + 'task/completion_verification',
      method: 'post',
      data,
  })
}

export function daliyCombo(data: any) {
  return request({
      headers: {
          "Content-Type": "form-data"
      },
      url: import.meta.env.VITE_BASEAPI + 'task/daily_combo',
      method: 'post',
      data,
  })
}

export function getSpecialTask(params:any) {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'task/get_all_tasks_with_category',
        method: 'get',
        params
    })
}