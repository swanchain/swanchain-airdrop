<template>
  <section :class="`sign-out`">
    <div class="flex flex-ai-center" v-if="metaAddress">
      <div class="user-content mlr-20">
        <div class="font-18 font-weight-4">{{ hiddAddress(metaAddress) ?? '-' }}</div>
      </div>
      <svg @click="signOut" class="pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.1062 13.2722C12.018 13.2255 11.9441 13.1546 11.8926 13.0673C11.841 12.9801 11.8138 12.8799 11.8139 12.7778V10.5554H8.03909C7.89607 10.5554 7.75891 10.4968 7.65778 10.3926C7.55665 10.2884 7.49984 10.1471 7.49984 9.99977C7.49984 9.85241 7.55665 9.7111 7.65778 9.6069C7.75891 9.50271 7.89607 9.44417 8.03909 9.44417H11.8139V7.22178C11.814 7.11976 11.8413 7.01972 11.8929 6.93266C11.9446 6.84559 12.0185 6.77485 12.1065 6.72819C12.1946 6.68153 12.2934 6.66076 12.3922 6.66815C12.491 6.67554 12.5858 6.7108 12.6664 6.77008L16.4412 9.54807C16.5109 9.59949 16.5677 9.66729 16.6069 9.74585C16.6461 9.8244 16.6665 9.91145 16.6665 9.99977C16.6665 10.0881 16.6461 10.1751 16.6069 10.2537C16.5677 10.3322 16.5109 10.4 16.4412 10.4515L12.6664 13.2295C12.5753 13.2973 12.4656 13.3337 12.3531 13.3334C12.2673 13.3331 12.1827 13.3122 12.1062 13.2722Z" fill="white"/>
        <path d="M3.33333 0H11.6667C11.8877 0 12.0996 0.0877974 12.2559 0.244078C12.4122 0.400358 12.5 0.61232 12.5 0.833333C12.5 1.05435 12.4122 1.26631 12.2559 1.42259C12.0996 1.57887 11.8877 1.66667 11.6667 1.66667H3.33333C3.11232 1.66667 2.90036 1.75446 2.74408 1.91074C2.5878 2.06702 2.5 2.27899 2.5 2.5V17.5C2.5 17.721 2.5878 17.933 2.74408 18.0893C2.90036 18.2455 3.11232 18.3333 3.33333 18.3333H11.6667C11.8877 18.3333 12.0996 18.4211 12.2559 18.5774C12.4122 18.7337 12.5 18.9457 12.5 19.1667C12.5 19.3877 12.4122 19.5996 12.2559 19.7559C12.0996 19.9122 11.8877 20 11.6667 20H3.33333C2.67029 20 2.03441 19.7366 1.56557 19.2678C1.09672 18.7989 0.833332 18.163 0.833332 17.5V2.5C0.833332 1.83696 1.09672 1.20107 1.56557 0.732233C2.03441 0.263392 2.67029 0 3.33333 0Z" fill="white"/>
      </svg>
    </div>
    <div class="flex" v-else>
      <web3-modal />
    </div>
  </section>
</template>

<script setup lang="ts">
import web3Modal from "@/components/web3-modal.vue"
import { hiddAddress } from '@/utils/common';
import { addWalletStatus, clearMetaAddress, getMetaAddress, metaAddress, token } from '@/utils/storage'
import { getAccount, disconnect } from '@wagmi/core'
import config from '@/utils/config.js'

const user = ref(getMetaAddress())
async function signOut() {
  try {
    const account = getAccount(config.config)
    if (account?.address) await disconnect(config.config)
  } catch { console.error }
  clearMetaAddress()
}

watch(() => addWalletStatus.value, () => {
  user.value = getMetaAddress()
})
</script>

<style lang="less" scoped>
.sign-out{
  min-width: 1.12rem;
}

.user-icon{
  :Deep(.el-avatar){
    width: 0.4rem;
    height: 0.4rem;
    background: #c0c4cc url(https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png) no-repeat center;
    background-size: 1.2rem;
    border-radius: 5rem;
  }
}
</style>