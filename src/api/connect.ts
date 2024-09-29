import { request } from '@/utils/request'

export function oauthLogin(params:any) {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'oauth_login_referral',
        method: 'get',
        params
    })
}

export function performSignin(data:any) {
  return request({
    headers: {},
    url: import.meta.env.VITE_BASEAPI + 'add_public_address',
    method: 'post',
    data
  })
}

export function updatePublicAddress(data:any) {
  return request({
    headers: {},
    url: import.meta.env.VITE_BASEAPI + 'update_public_address',
    method: 'post',
    data
  })
}

export function removePublicAddress(data:any) {
  return request({
    headers: {},
    url: import.meta.env.VITE_BASEAPI + 'remove_public_address',
    method: 'post',
    data
  })
}

export function verifyDiscordAccount(data:any) {
  return request({
    headers: {
        "Content-Type": "form-data"
    },
    url: import.meta.env.VITE_BASEAPI + 'verify_discord_account',
    method: 'post',
    data
  })
}

export function removeDiscordAccount() {
  return request({
    headers: {},
    url: import.meta.env.VITE_BASEAPI + 'remove_discord',
    method: 'post'
  })
}

export function verifyTelegramAccount(params:any) {
    return request({
        headers: {},
        url: import.meta.env.VITE_BASEAPI + 'verify_telegram_account',
        method: 'post',
        params
    })
}

export function removeTelegramAccount() {
  return request({
    headers: {},
    url: import.meta.env.VITE_BASEAPI + 'remove_telegram',
    method: 'post'
  })
}
