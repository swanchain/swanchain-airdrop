<script setup>
import { createWeb3Modal } from '@web3modal/wagmi/vue'
import { reconnect, disconnect } from '@wagmi/core'
import { useStore } from "vuex"
import {
  computed,
  getCurrentInstance,
  reactive,
} from 'vue'
import { getAccount, watchAccount } from '@wagmi/core'
import configJS from './../utils/config'

const system = getCurrentInstance().appContext.config.globalProperties
const store = useStore()
const metaAddress = computed(() => (store.state.metaAddress))
const signature = computed(() => (store.state.signature))

const projectId = configJS.projectId
const config = configJS.config
reconnect(config)
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#4881FC',
    '--w3m-accent': '#1c1d22',
    '--w3m-color-mix': '#ffffff',
    // '--w3m-color-mix-strength': 50,
    // '--w3m-font-family': 'gilroy-Regular',
    '--w3m-font-size-master': '12',
    // '--wcm-text-small-regular-weight': 'normal',
    // '--wcm-text-small-regular-letter-spacing': '3px',
  }
})

let lastTime = 0
async function throttle () {
  // Prevent multiple signatures
  let now = new Date().valueOf()
  if (lastTime > 0 && now - lastTime <= 2000) return false
  lastTime = now
  return true
}

let account = reactive(getAccount(config))

async function login2 () {
  // console.log('here')
  // console.log(account)
  const time = await throttle()
  if (!time) return false
  system.$commonFun.Init(async (addr) => {
    console.log(addr)
    if(addr) store.dispatch('setMetaAddress', addr)
    await system.$commonFun.timeout(500)
    system.$commonFun.login(config)
  })
}

async function signout2 () {
  await system.$commonFun.signOutFun('disconnect')
  // console.log("in signout function")
  // window.location.reload()
}

watchAccount(config, {
  async onChange (account, prevAccount) {
    // account = getAccount(config)
    try {
      // console.log('watch', account)
      // console.log('prev', prevAccount)
      // console.log("changed", account ?.isConnected)
      if (account?.isConnected && signature.value === '' && metaAddress.value === '' && fristOpen > 0) {
        console.log("prompted")
        if(account?.address) store.dispatch('setMetaAddress', account?.address)
        login2()
      } else if (!account?.isConnected && prevAccount?.isConnected) {
        console.log('clear')
        signout2()
      }
    } catch{ }
  },
})

let beginTime = 0; 

window.onbeforeunload = function () {
  beginTime = new Date().getTime();
}

window.onunload = function () {
  let differTime = new Date().getTime() - beginTime;
  if (differTime <= 5) {
    disconnect(config)
  }
}

let fristOpen = 0
async function test () {
  fristOpen = 1
}
</script>

<template>
  <div class="flex-row">
    <w3m-button balance="hide" size="sm" @click="test" />
    <el-button type="primary" @click="login2" v-if="metaAddress !== '' && signature === ''" class="m-button">Login</el-button>
  </div>
</template>

<style lang="less" scoped>
.m-button {
  height: auto;
  padding: 12px 15px;
  margin: 0;
  background-color: @white-color;
  font-family: inherit;
  font-size: 14px;
  line-height: 1;
  color: @theme-color;
  border-radius: 9px;
  transition: all 0.2s;
  border: 0;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    padding: 18px 22px;
  }
  @media screen and (max-width: 600px) {
    padding: 24px 30px;
  }
  &:hover {
    background-color: @theme-color;
    color: @white-color;
  }
}
</style>
