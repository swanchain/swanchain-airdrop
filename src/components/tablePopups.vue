<template>
  <div class="pop-up flex-row" v-show="props.claimShow">
    <!-- <div class="close" @click="closeHandle">
            <el-icon>
              <Close />
            </el-icon>
          </div> -->
    <div class="connect-area">
      <div class="connect-wallet">
        <div class="flex-row center button font-16 weight-6">
          <span class="button font-16 weight-6" @click="claimAirdrop">TEST AIRDROP CLAIM</span>
          <span @click="closeHandle">CANCEL</span>
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
  Close
} from '@element-plus/icons-vue'
import { ElIcon, ElTable, ElTableColumn } from "element-plus"
import { showLoading, hideLoading } from '@/plugins/loading'
import airdropABI from '@/utils/abi/Airdrop.json'
export default defineComponent({
  name: 'Popup',
  components: {
    Close, ElIcon, ElTable, ElTableColumn
  },
  props: {
    claimShow: { type: Boolean, default: false }
  },
  setup (props, context) {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth <= 768 ? 30 : 50)
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const tableData = ref([])
    const airdropData = reactive({
      amount: 0,
      signature: ''
    })

    function closeHandle () {
      context.emit('hardClose', false)
    }
    async function init () {
      showLoading()
      try {
        const providerRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}claim_reward_list?wallet_address=${store.state.metaAddress}`, 'get')
        tableData.value = providerRes && providerRes.data.length > 0 ? providerRes.data : []
      } catch {
        tableData.value = []
      }
      hideLoading()
    }
    async function claimAirdrop() {
      showLoading()
      try {
        const airdropRes = await system.$commonFun.sendRequest(`${process.env.VUE_APP_BASELOGINAPI}signature/airdrop`, 'get')
        if (airdropRes?.status !== 'success') return false
        airdropData.amount = airdropRes?.data?.amount ?? 0
        airdropData.signature = airdropRes?.data?.signature ?? ''

        const amount = system.$commonFun.web3Init.utils.toWei(String(airdropData.amount), 'ether')
        const claimContract = new system.$commonFun.web3Init.eth.Contract(airdropABI, process.env.VUE_APP_ARIDROP_CONTACT_ADDRESS)
        const claimFunction = claimContract.methods.claim(amount, airdropData.signature)
        const gasLimit = await claimFunction.estimateGas({ from: store.state.metaAddress })
        const tx = await claimFunction.send({ from: store.state.metaAddress, gasLimit: gasLimit })
          .on('transactionHash', (transactionHash) => {
            console.log(transactionHash)
          })
      } catch (err) {
        console.log('errerr:', err, err.message)
        const errMessage = err?.message ?? ''
        if (errMessage) system.$commonFun.messageTip('error', errMessage)
      } finally {
        hideLoading()
      }
    }
    onMounted(() => {
      init()
    })
    return {
      system,
      bodyWidth,
      props,
      tableData,
      closeHandle, claimAirdrop
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
  :deep(.connect-area) {
    position: relative;
    width: 59%;
    padding: 0 0 100px;
    @media screen and (max-width: 1260px) {
      width: 64%;
    }
    @media screen and (max-width: 768px) {
      width: 79%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
    @media screen and (max-width: 540px) {
      width: 94%;
    }
    .close {
      position: absolute;
      left: 50%;
      width: 32px;
      height: 32px;
      bottom: 0;
      padding: 15px;
      margin-left: -32px;
      // font-size: 30px;
      font-weight: 600;
      color: @white-color;
      border: 1px solid @white-color;
      border-radius: 100px;
      cursor: pointer;
      z-index: 100;
      .el-icon,
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .connect-wallet {
      padding: 28px 25px;
      background-color: #30333d;
      border-radius: 20px;
      @media screen and (max-width: 768px) {
        padding: 60px 0 30px;
      }
      @media screen and (max-width: 600px) {
        padding: 90px 0 45px;
      }
      .el-table {
        background-color: #30333d;
        font-family: inherit;
        border-radius: 10px;
        tr {
          th,
          td {
            padding: 12px 4px;
            font-family: inherit;
            font-weight: normal;
            line-height: 1;
            color: @white-color;
            border-color: #676971;
            text-align: center;
            word-break: break-word;
            .cell {
              padding: 0;
              line-height: 1;
              .claim-btn {
                padding: 0.04rem 0;
                background-color: #5580e9;
                border-radius: 0.08rem;
                color: #fff;
                cursor: pointer;
                transition: all 0.2s;
                &:hover {
                  background-color: #fff;
                  color: #5580e9;
                }
              }
            }
          }
          th {
            background-color: #5580e9;
            text-transform: capitalize;
          }
          td {
            background-color: #30333d;
          }
        }
      }
      .el-table--border .el-table__inner-wrapper::after,
      .el-table--border::after,
      .el-table--border::before,
      .el-table__inner-wrapper::before,
      .el-table__border-left-patch {
        // display: none;
        background-color: rgba(206, 207, 209, 0.1);
      }
      .tip {
        padding: 10px 0;
        color: #898989;
      }
      .button {
        span {
          padding: 6px 20px;
          margin: 0 10px;
          background-color: #6d6d6d;
          color: #fff;
          border: 1px solid #949599;
          border-radius: 15px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
