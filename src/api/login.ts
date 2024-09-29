import { request } from '@/utils/request'

export function userProfile() {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'user_profile',
        method: 'get'
    })
}

export function userPoint() {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'user_points',
        method: 'get'
    })
}

export function userXP() {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'user_xp',
        method: 'get'
    })
}

export function xAccountLogin(data: any) {
  return request({
      headers: {
          "Content-Type": "form-data"
      },
      url: import.meta.env.VITE_BASEAPI + 'x_account_login',
      method: 'post',
      data,
  })
}

export function referralCreate() {
  return request({
      headers: {},
      url: import.meta.env.VITE_BASEAPI + 'referral/create_referral_key',
      method: 'post'
  })
}

export function referralAdd(data: any) {
  return request({
      headers: {
        "Content-Type": "form-data"
      },
      url: import.meta.env.VITE_BASEAPI + 'referral/add_referral',
      method: 'post',
      data
  })
}

export function referralVerify(params: any) {
  return request({
      headers: {},
      url: import.meta.env.VITE_BASEAPI + 'referral/verify_referral_key?',
      method: 'get',
      params
  })
}

export function getReferral() {
  return request({
      headers: {},
      url: import.meta.env.VITE_BASEAPI + 'referral/get_referral_key',
      method: 'get'
  })
}
