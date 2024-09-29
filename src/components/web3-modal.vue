<script setup lang="ts">
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/vue'
import { reconnect, disconnect, connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { getAccount, watchAccount } from '@wagmi/core'
import configJS from './../utils/config'
import { Init } from '@/utils/login';
import { clearMetaAddress, getMetaAddress, metaAddress, setMetaAddress, signature, token } from '@/utils/storage';
import { signOutFun, throttleLast, timeout } from '@/utils/common';

const projectId = configJS.projectId
const config = configJS.config
reconnect(config)
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#999',
    '--w3m-color-mix': '#e91e63',
    // '--w3m-color-mix-strength': 50,
    '--w3m-font-family': 'gilroy-Regular',
    // '--w3m-font-size-master': '14',
    // '--wcm-text-small-regular-weight': 'normal',
    // '--wcm-text-small-regular-letter-spacing': '3px',
  }
})

async function login2 () {
  const time = await throttleLast()
  if (!time) return false
  Init(async (addr:string) => {
    if(addr) setMetaAddress(addr)
    await timeout(500)
    // login(config)
  })
}

async function signout2() {
  clearMetaAddress()
  // await signOutFun('disconnect')
  // console.log("in signout function")
  // window.location.reload()
}

watchAccount(config, {
  onChange (account, prevAccount) {
    // account = getAccount(config)
    try {
      // console.log('watch', account)
      // console.log('prev', prevAccount)
      // console.log("changed", account ?.isConnected)
      if (account?.isConnected && metaAddress.value === '') {
        console.log("prompted")
        if (account?.address) setMetaAddress(account?.address)
        // login2()
      } else if (!account?.isConnected && prevAccount?.isConnected) {
        console.log('clear')
        signout2()
      }
    } catch{ console.error }
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
    console.log("close")
  } else {
    console.log("Refresh")
  }
}

const { open } = useWeb3Modal()
function connectMethod() {
  open()
}

onMounted(() => {})
</script>

<template>
  <div class="flex flex-ai-center">
    <!-- <w3m-button balance="hide" size="sm" /> -->
    <div @click="connectMethod" class="connect-btn font-20 font-text pointer">Connect Wallet</div>
    <!-- <div @click="login2" v-if="metaAddress !== '' && token === ''" class="button is-active ml-10">Login</div> -->
  </div>
</template>

<style lang="less" scoped>
.connect-btn {
  padding: 0.08rem 0.16rem;
  background-color: var(--color-light);
  border: 0.02rem solid var(--color-light);
  border-radius: 0.08rem;
  color: var(--color-dark);
  transition: all 0.2s;
  &:hover {
    background-color: transparent;
    color: var(--color-light);
  }
}
</style>