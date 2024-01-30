<template>
  <div class="pop-up flex-row" v-show="props.claimShow">
    <div class="connect-area">
      <div class="close" @click="closeHandle">
        <el-icon>
          <Close />
        </el-icon>
      </div>
      <div class="connect-wallet">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date">
            <template #header>
              <div class="font-22 weight-5">Date</div>
            </template>
            <template #default="scope">
              <div class="font-16">{{scope.row.date}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="campaign">
            <template #header>
              <div class="font-22 weight-5">Campaign</div>
            </template>
            <template #default="scope">
              <div class="font-16">{{scope.row.campaign}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="amount">
            <template #header>
              <div class="font-22 weight-5">Amount</div>
            </template>
            <template #default="scope">
              <div class="font-16">{{scope.row.amount}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="detail">
            <template #header>
              <div class="font-22 weight-5">Rewards Details</div>
            </template>
            <template #default="scope">
              <div class="font-16">{{scope.row.detail}}</div>
            </template>
          </el-table-column>
        </el-table>
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
import spookyABI from '@/utils/abi/SpookyProxy.json'
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
    const tableData = ref([
      {
        date: '2022.02.25',
        campaign: 'Electron testnet',
        amount: '',
        detail: ''
      },
      {
        date: '2022.02.25',
        campaign: 'Electron testnet',
        amount: '',
        detail: ''
      }
    ])

    function closeHandle () {
      context.emit('hardClose', false)
    }

    onMounted(() => { })
    return {
      system,
      bodyWidth,
      props,
      tableData,
      closeHandle
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
      padding: 30px 0 15px;
      @media screen and (max-width: 768px) {
        padding: 60px 0 30px;
      }
      @media screen and (max-width: 600px) {
        padding: 90px 0 45px;
      }
      .el-table {
        font-family: inherit;
        border-radius: 15px;
        tr {
          th,
          td {
            padding: 17px 40px;
            font-family: inherit;
            font-weight: normal;
            line-height: 1;
            color: @white-color;
            border-color: rgba(206, 207, 209, 0.2);
            .cell {
              padding: 0;
              line-height: 1;
            }
          }
          th {
            background-color: #5580e9;
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
    }
  }
}
</style>
