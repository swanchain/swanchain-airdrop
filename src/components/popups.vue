<template>
  <div class="pop-up flex-row" v-show="props.claimShow">
    <div class="connect-area">
      <div class="close" @click="closeHandle">
        <el-icon>
          <CircleClose />
        </el-icon>
      </div>
      <div class="connect-wallet" v-if="active === 'connect'">
        <div class="title font-24 weight-6">Connect Wallet</div>
        <div class="metamask flex-row" @click="isLogin">
          <img :src="metaLogo" alt="" class="image" />
          <div class="font-18">MetaMask</div>
        </div>
        <!-- <div class="agree text-center font-12">
          By connecting your wallet, you agree to our<br />
          <a>Terms of Service</a> and
          <a>Privacy Policy</a>
        </div> -->
      </div>

      <div class="connect-result flex-row" v-else-if="active === 'failed'">
        <div class="image"><img :src="promptFailed" alt="" class="image" /></div>
        <div class="content">
          <div class="title failed font-29">FAILED</div>
          <div class="font-18">You are not eligible for rewards currently. Please stay tuned for upcoming activities.</div>
        </div>
      </div>

      <div class="connect-result flex-row" v-else-if="active === 'success'">
        <div class="image"><img :src="promptSuccess" alt="" class="image" /></div>
        <div class="content">
          <div class="title success font-29">SUCCESSFUL</div>
          <div class="font-18">Reward successfully claimed! Check your NFT on
            <span @click="system.$commonFun.goLink(hash)">OpenSea</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  onMounted,
  onActivated,
  onDeactivated,
  watch,
  ref,
  reactive,
  getCurrentInstance,
  toRefs,
  nextTick
} from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  CircleClose
} from '@element-plus/icons-vue'
import { ElIcon } from "element-plus"
import { showLoading, hideLoading } from '@/plugins/loading'
import claimABI from '@/utils/abi/ClaimNFT.json'
export default defineComponent({
  name: 'Popup',
  components: {
    CircleClose, ElIcon
  },
  props: {
    claimShow: { type: Boolean, default: false },
    claimType: { type: String, default: 'Zealy' }
  },
  setup (props, context) {
    const store = useStore()
    const metaAddress = computed(() => (store.state.metaAddress))
    const bodyWidth = ref(document.body.clientWidth <= 768 ? 30 : 50)
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const metaLogo = require("@/assets/images/metamask.png")
    const promptSuccess = require("@/assets/images/prompt-success.png")
    const promptFailed = require("@/assets/images/prompt-failed.png")
    const active = ref('connect')
    const claimLoad = ref(false)
    const hash = ref('')
    const claimAddress = process.env.VUE_APP_CONTACT_ADDRESS
    const claimContract = new system.$commonFun.web3Init.eth.Contract(claimABI, claimAddress)

    function closeHandle () {
      context.emit('hardClose', false)
    }

    let lastTime = 0
    async function throttle () {
      // Prevent multiple signatures
      let now = new Date().valueOf();
      if (lastTime > 0 && (now - lastTime) <= 2000) return false
      lastTime = now
      return true
    }

    async function isLogin () {
      const time = await throttle()
      if (!time) return false
      system.$commonFun.Init(async (addr, chain) => {
        // console.log(addr, chain)
        closeHandle()
        active.value = ''
        // if (chain) claimMethod()
      })
    }

    async function claimMethod () {
      let gasLimit, tx
      showLoading()
      try {
        console.log(props.claimType)
        switch (props.claimType) {
          case 'Zealy':
            gasLimit = await claimContract.methods
              .claimOG()
              .estimateGas({ from: metaAddress.value })

            tx = await claimContract.methods
              .claimOG()
              .send({ from: metaAddress.value, gasLimit: gasLimit })
              .on('transactionHash', (transactionHash) => txHashMethod(transactionHash))
              .on('error', () => hideLoading())
            break;
          case 'Galxe':
            gasLimit = await claimContract.methods
              .claimGalxe()
              .estimateGas({ from: metaAddress.value })

            tx = await claimContract.methods
              .claimGalxe()
              .send({ from: metaAddress.value, gasLimit: gasLimit })
              .on('transactionHash', (transactionHash) => txHashMethod(transactionHash))
              .on('error', () => hideLoading())
            break;
          case 'SAO':
            gasLimit = await claimContract.methods
              .claim()
              .estimateGas({ from: metaAddress.value })

            tx = await claimContract.methods
              .claim()
              .send({ from: metaAddress.value, gasLimit: gasLimit })
              .on('transactionHash', (transactionHash) => txHashMethod(transactionHash))
              .on('error', () => hideLoading())
            break;
          case 'AMA':
            gasLimit = await claimContract.methods
              .claimAMA()
              .estimateGas({ from: metaAddress.value })

            tx = await claimContract.methods
              .claimAMA()
              .send({ from: metaAddress.value, gasLimit: gasLimit })
              .on('transactionHash', (transactionHash) => txHashMethod(transactionHash))
              .on('error', () => hideLoading())
            break;
          case 'kol':
            gasLimit = await claimContract.methods
              .claimKOL()
              .estimateGas({ from: metaAddress.value })

            tx = await claimContract.methods
              .claimKOL()
              .send({ from: metaAddress.value, gasLimit: gasLimit })
              .on('transactionHash', (transactionHash) => txHashMethod(transactionHash))
              .on('error', () => hideLoading())
            break;
        }
      } catch (err) {
        console.log('err', err)
        if (err && err.message) system.$commonFun.messageTip('error', err.message)
        active.value = 'failed'
        hideLoading()
      }
    }
    function txHashMethod (transactionHash) {
      console.log('transactionHash:', transactionHash)
      hash.value = `${process.env.VUE_APP_POLYGONBLOCKURL}/tx/${transactionHash}`
      active.value = 'success'
      hideLoading()
    }
    onMounted(() => {
      if (metaAddress.value) {
        active.value = ''
        // claimMethod()
      } else active.value = 'connect'
    })
    return {
      system,
      bodyWidth,
      props,
      metaLogo,
      active,
      hash,
      claimLoad,
      promptSuccess,
      promptFailed,
      closeHandle, isLogin
    }
  }
})
</script>

<style lang="less" scoped>
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  color: @white-color;
  line-height: 1;
  transition: all 0.2s;
  .connect-area {
    position: relative;
    width: calc(29% - 56px);
    min-height: 140px;
    padding: 0 14px;
    background-color: #30333d;
    border: 2px solid #3259a8;
    border-radius: 8px;
    @media screen and (max-width: 1260px) {
      width: 35%;
    }
    @media screen and (max-width: 768px) {
      width: 50%;
      border-radius: 20px;
    }
    @media screen and (max-width: 600px) {
      width: 70%;
      border-radius: 30px;
    }
    @media screen and (max-width: 540px) {
      width: 80%;
    }
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 25px;
      color: #4d7aff;
      cursor: pointer;
      z-index: 100;
      @media screen and (max-width: 1260px) {
        font-size: 30px;
      }
      @media screen and (max-width: 1024px) {
        font-size: 35px;
      }
      @media screen and (max-width: 992px) {
        top: 15px;
        right: 15px;
        font-size: 40px;
      }
      @media screen and (max-width: 768px) {
        top: 20px;
        right: 20px;
        font-size: 45px;
      }
      @media screen and (max-width: 600px) {
        top: 25px;
        right: 25px;
        font-size: 55px;
      }
      @media screen and (max-width: 540px) {
        font-size: 65px;
      }
    }
    .connect-wallet {
      padding: 30px 0 15px;
      @media screen and (max-width: 768px) {
        padding: 60px 0 30px;
      }
      @media screen and (max-width: 600px) {
        padding: 90px 0 45px;
      }
      .title {
        padding: 0 20px;
        font-weight: 600;
        // border-bottom: 1px solid #64666e;
        @media screen and (max-width: 992px) {
          padding: 0 0 22px;
        }
        @media screen and (max-width: 768px) {
          padding: 0 0 30px;
        }
      }
      .metamask {
        //   width: 490px;
        padding: 11px 20px;
        margin: 20px 15px;
        background-color: #1c1d22;
        border-radius: 8px;
        cursor: pointer;
        @media screen and (max-width: 992px) {
          padding: 33px 49px;
        }
        @media screen and (max-width: 768px) {
          padding: 22px 40px;
          margin: 40px 30px;
          border-radius: 20px;
        }
        @media screen and (max-width: 600px) {
          padding: 33px 60px;
          margin: 60px 45px;
          border-radius: 30px;
        }
        .image {
          width: 38px;
          height: auto;
          margin: -2px 20px 0 0;
          @media screen and (max-width: 1260px) {
            width: 42px;
          }
          @media screen and (max-width: 1024px) {
            width: 45px;
          }
          @media screen and (max-width: 992px) {
            width: 50px;
          }
          @media screen and (max-width: 768px) {
            width: 55px;
          }
          @media screen and (max-width: 600px) {
            width: 75px;
            margin: -4px 40px 0 0;
          }
          @media screen and (max-width: 540px) {
            width: 85px;
            margin: -10px 40px 0 0;
          }
        }
      }
      .agree {
        padding: 10px 40px 0;
        color: #70757a;
        border-top: 1px solid #64666e;
        line-height: 1.3;
        a {
          font-size: inherit;
          color: @white-color;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .connect-result {
      align-items: stretch;
      text-align: center;
      line-height: 1.2;
      .image {
        position: relative;
        width: 180px;
        margin: 0;
        img {
          position: absolute;
          left: 0;
          bottom: 20px;
          width: 105%;
          animation: floating-up 3.5s ease-in-out infinite;
        }
        @media screen and (max-width: 768px) {
          width: 280px;
        }
        @media screen and (max-width: 600px) {
          width: 380px;
        }
      }
      .content {
        width: calc(100% - 180px);
        padding: 46px 0;
        @media screen and (max-width: 768px) {
          width: calc(100% - 280px);
          padding: 69px 0;
        }
        @media screen and (max-width: 600px) {
          width: calc(100% - 380px);
          padding: 92px 0;
        }
        .title {
          padding: 0 0 15px;
          font-weight: 600;
          text-transform: uppercase;
          color: #37aa2e;
          @media screen and (max-width: 992px) {
            padding: 0 0 22px;
          }
          @media screen and (max-width: 768px) {
            padding: 0 0 30px;
          }
          &.failed {
            color: #f6555a;
          }
        }
        span {
          color: #4c66ff;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
