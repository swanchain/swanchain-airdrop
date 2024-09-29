<template>
  <div class="w-100">
    <div class="body">
      <home-header @handAddWallet="handAddWallet"></home-header>
      <home-claim></home-claim>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './pages/home-header.vue'
import HomeClaim from './pages/home-claim.vue'
import { userProfile, xAccountLogin } from '@/api/login'
import { addWalletStatus, connectFaild, setToken, setUserInformation, token } from '@/utils/storage'
import { timeUpdate } from '@/utils/common'
const route = useRoute()
const paramOauthToken = route.query.oauth_token || ''
const paramOauthVerifier = route.query.oauth_verifier || ''
const pageLoad = ref(false)
const userPofile = ref<Record<string, any>>({})
async function getToken() {
  if (pageLoad.value || token.value) return
  try {
    pageLoad.value = true
    let formData = new FormData()
    formData.append('oauth_token', paramOauthToken.toString())
    formData.append('oauth_verifier', paramOauthVerifier.toString())
    const res = await xAccountLogin(formData)
    if (res?.data?.access_token) setToken(res.data.access_token)
    getUserData()
    pageLoad.value = false
  } catch {
    pageLoad.value = false
  }
}

async function getUserData() {
  if(!token.value) return false
  const userRes = await userProfile()
  if (userRes?.data) {
    userPofile.value = userRes.data
    setUserInformation(userPofile.value)
    if (userRes?.data?.public_address && userRes?.data?.x_id && userRes?.data?.invited_by) connectFaild.value = false
    addWalletStatus.value = !addWalletStatus.value

    if(userRes?.data?.next_combo_refresh) timeUpdate(userRes?.data?.next_combo_refresh, 'combo')
    if(token.value) setMedia()
  }
}

function handAddWallet(status: boolean) {
  getUserData()
}
onMounted(() => {
  getUserData()
  if (paramOauthToken && paramOauthVerifier) getToken()



  // setToken('')
  // setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNTg5MjE2MCwianRpIjoiMzIzYzExNmEtYTJlZi00ODE4LWE1YTYtNjZhYjgyZjk0ODc0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE1MjM0ODE1ODc2NDc5NDI2NTYiLCJuYmYiOjE3MjU4OTIxNjAsImNzcmYiOiI0NzBmNTUyNy03NzEzLTQ5MWEtOGVmYi1iYjdkNmJmYjhkMTgiLCJleHAiOjE3Mjg0ODQxNjB9.McAn0RBc79Q6TrurfRjgr7YhMQtNgQpBOS-FO6f5QTI')
})
</script>

<style lang="less" scoped>
.body {
  min-height: 100vh;
}
</style>
