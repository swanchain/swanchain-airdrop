import { EStorage } from '@/constant/storage'
import { urlClear } from './common'

export const token = ref(getToken())
export const metaAddress = ref(getMetaAddress())
export const userInformation = ref(getUserInformation())
export const dailyComboStatus = ref(false)
export const nextComboRefresh = ref('-')
export const taskRefresh = ref('-')
export const dailyOperate = ref(true)
export const isLogin = computed(() => !!token.value)
export const currentNetwork = ref('Mainnet')
export const addCollateral = ref(false)
export const addWalletStatus = ref(false)
export const connectFaild = ref(false)

export function removeStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearStorage() {
  token.value = ''
  localStorage.clear()
}

export function clearLoginInfo() {
  token.value = ''
  removeStorage(EStorage.TOKEN)
  urlClear()
}

export function setToken(tok: string) {
  token.value = tok
  localStorage.setItem(EStorage.TOKEN, tok)
}

export function getToken() {
  return localStorage.getItem(EStorage.TOKEN) ?? ''
}

export function setMetaAddress(tok: string) {
  metaAddress.value = tok
  localStorage.setItem(EStorage.METAMASK, tok)
}

export function getMetaAddress() {
  return localStorage.getItem(EStorage.METAMASK) ?? ''
}

export async function clearMetaAddress() {
  metaAddress.value = ''
  removeStorage(EStorage.METAMASK)
}

export function setUserInformation(userInformation: { x_screen_name: string; profile_image: string, public_address: string }) {
  localStorage.setItem(EStorage.USER_INFORMATION, JSON.stringify(userInformation))
}

export function getUserInformation() {
  const user = localStorage.getItem(EStorage.USER_INFORMATION)
  return user ? JSON.parse(user) : { x_screen_name: '', profile_image: '', public_address: '' }
}

export function setAccountInfo(accountInfo: { account: string; password: string }) {
  localStorage.setItem(EStorage.ACCOUNT_INFO, JSON.stringify(accountInfo))
}

export function getAccountInfo() {
  const accountInfo = localStorage.getItem(EStorage.ACCOUNT_INFO)
  return accountInfo ? JSON.parse(accountInfo) : { account: '', password: '' }
}
