<template>
  <div class="home-header flex flex-wrap flex-jc-center flex-ai-end">
    <div class="w-100">
      <div class="font-64 font-bold plr-30 w-100 text-center">INTRODUCING THE $SWAN TOKEN</div>
      <div class="home-header-connect w-100 text-center">
        <div class="title font-20">
          Claim Time: <span class="font-text">Before June 6th, 6 PM HKT / 10 AM UTC / 6 AM EST</span>
        </div>
        <template v-for="(connect, c) in connectList" :key="c">
          <div class="home-header-connect-list flex flex-ai-center flex-wrap mt-8 ptb-10 color-light">
            <div class="index font-16 font-text flex flex-ai-center flex-jc-center mr-16">{{ c + 1 }}</div>
            <div class="cont font-20 text-left">{{ connect.title }}</div>
          </div>
        </template>
        <div class="font-16 mtb-10 text-left w-100">By checking your eligibility and claiming $SWAN, you agree to the <span class="l font-text pointer">Airdrop Terms & Conditions</span> and <span class="l font-text pointer">Privacy policy</span>.</div>
        <div class="flex flex-ai-center flex-jc-center" v-if="metaAddress === ''">
          <web3-modal />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import web3Modal from "@/components/web3-modal.vue"
import { updatePublicAddress } from '@/api/connect'
import web3Init, { Init, throttle, sign } from '@/utils/login';
import { messageTip, timeout } from '@/utils/common';
import { metaAddress, setMetaAddress, token } from '@/utils/storage';

const route = useRoute()
const connectList = ref([
  {
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  }
])

const emits = defineEmits(['handAddWallet'])
async function connectWallet(index: number) {
  const time = await throttle()
  if (!time) return false
  try{
    Init(async (addr: any) => {
      setMetaAddress(addr)
      timeout(500)
      const [signature, signErr] = await sign()
      if (!signature) return messageTip('error', signErr)
      const reqOpts = [addr, signature]
      const token = await updatePublicAddress(reqOpts)
      if(token?.message) messageTip('success', token?.message)
      emits('handAddWallet', true)
    })
  }catch{ console.error }
}

</script>

<style lang="less" scoped>
.home-header {
  width: 100%;
  min-height: calc(7.67rem + 0.64rem);
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 540px) {
    min-height: 60vh;
  }
  &-connect {
    width: 41%;
    width: 778px;
    min-width: 420px;
    padding: 0.28rem 0.14rem;
    margin: 0.85rem auto 0.64rem;
    background-color: var(--color-black-opacity);
    backdrop-filter: blur(74px);
    border-radius: 0.16rem;
    @media screen and (max-width: 992px) {
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      padding: 0.32rem;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
      min-width: 320px;
    }
    .title {
      display: inline-block;
      padding: 0.1rem 0.16rem;
      background-color: var(--color-light-opacity-16);
      border-radius: 0.08rem;
    }
    &-list {
      .index {
        width: 28px;
        height: 28px;
        border: 2px solid var(--color-light);
        border-radius: 1rem;
      }
      .cont {
        width: calc(100% - 32px - 0.16rem);
      }
    }
    .l {
      text-decoration: underline;
      text-underline-offset: 2px;
      text-decoration-skip-ink: none;
      text-decoration-thickness: from-font;
    }
  }
  &-btn {
    width: auto;
    padding: 0.08rem 0.46rem;
    background-color: var(--color-light);
    text-transform: capitalize;
    border-radius: 0.08rem;
    color: var(--color-dark);
    white-space: nowrap;
    &.p {
      padding: 0.08rem 0.16rem;
    }
    &:hover {
      color: var(--color-light);
    }
  }
}
</style>
