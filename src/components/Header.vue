<template>
  <section id="container-header">
    <div class="header lang-max flex-row space-between font-14">
      <img :src="swanLogo" class="logo-img mit" alt='swan' @click="goMain" />
      <el-button v-if="metaAddress === ''" round @click="clickQuery">Log in</el-button>
      <div v-else class="wallet flex-row">
        <div class="address flex-row font-20">
          <img :src="metaLogo" alt="" class="image" />
          <div class="font-14">{{system.$commonFun.hiddAddress(metaAddress)}}</div>
        </div>
        <div class="connect flex-row font-14">
          <el-dropdown @command="handleSelect" class="sign-popper" popper-class="menu-popper" placement="bottom" :teleported="true">
            <div class="el-dropdown-link flex-row">
              <span></span>
              Connected
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  <span class="font-16">Logout</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent, computed, onMounted, onBeforeUnmount, nextTick, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
// import {} from '@element-plus/icons-vue'
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus"
export default defineComponent({
  components: { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu },
  setup (props, context) {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth < 992)
    const metaAddress = computed(() => (store.state.metaAddress))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const swanLogo = require("@/assets/images/logo.png")
    const metaLogo = require("@/assets/images/metamask.png")
    const prevType = ref(true)

    async function handleSelect (key, keyPath) {
      // console.log(key, keyPath) //  
      switch (key) {
        case 'logout':
          store.dispatch('setMetaAddress', '')
          break;
      }
    }
    function clickQuery (dialog) {
      context.emit('hardClose', true)
    }
    function fn () {
      document.addEventListener('visibilitychange', function () {
        prevType.value = !document.hidden
      })
      if (typeof window.ethereum === 'undefined') return
      system.$commonFun.providerInit.on('chainChanged', async function (accounts) {
        if (!prevType.value) return false
        const chainId = await system.$commonFun.web3Init.eth.net.getId()
        if (chainId !== Number(process.env.VUE_APP_CHAINID)) store.dispatch('setMetaAddress', '')
      })
    }
    onMounted(() => fn())
    watch(route, (to, from) => { })
    return {
      system,
      swanLogo,
      metaLogo,
      metaAddress,
      clickQuery, handleSelect
    }
  }
})
</script>
<style lang="less" scoped>
#container-header {
  :deep(.header) {
    flex-wrap: nowrap;
    margin: auto;
    padding: 12px 0;
    @media screen and (min-width: 2160px) {
      padding: 6px 0;
    }
    @media screen and (max-width: 600px) {
      padding: 24px 0;
    }
    .logo-img,
    .mit-body {
      height: 40px;
      cursor: pointer;
      @media screen and (min-width: 2160px) {
        height: 50px;
      }
      @media screen and (min-width: 3000px) {
        height: 60px;
      }
      @media screen and (min-width: 4600px) {
        height: 70px;
      }
      @media screen and (min-width: 5120px) {
        height: 80px;
      }
      @media screen and (min-width: 6000px) {
        height: 90px;
      }
      @media screen and (max-width: 768px) {
        height: 35px;
      }
    }
    .el-input {
      max-width: 386px;
      margin: 0 30px;
      @media screen and (max-width: 1260px) {
        max-width: 500px;
      }
      @media screen and (max-width: 768px) {
        max-width: 600px;
      }
      @media screen and (max-width: 767px) {
        max-width: 100%;
      }
      .el-input__wrapper {
        height: auto;
        padding: 4px 12px 4px 45px;
        background: transparent url(../assets/images/icon_1.png) no-repeat 12px
          center;
        background-size: 20px;
        border-radius: 15px;
        border-color: #d4d4d8;
        color: @white-color;
        line-height: 1;
        @media screen and (max-width: 1260px) {
          padding: 8px 12px 8px 50px;
          background-size: 25px;
          border-radius: 20px;
        }
        @media screen and (max-width: 768px) {
          padding: 12px 20px 12px 55px;
          background-size: 27px;
          background-position-x: 15px;
          border-radius: 30px;
        }
        @media screen and (max-width: 767px) {
          height: 100px;
          padding: 0 20px 0 100px;
          background-size: 45px;
          background-position-x: 30px;
          line-height: 100px;
          border-radius: 100px;
        }
        .el-input__inner {
          color: inherit;
        }
      }
      .el-input__prefix {
        padding: 0;
        .el-icon {
          svg {
            width: 22px;
            height: 22px;
            color: #9ea5b3;
          }
        }
      }
    }
    .el-button {
      height: auto;
      padding: 12px 15px;
      margin: 0;
      background-color: @white-color;
      font-family: inherit;
      font-size: inherit;
      line-height: 1;
      color: @theme-color;
      border-radius: 9px;
      transition: all 0.2s;
      border: 0;
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
    .wallet {
      color: @white-color;
      line-height: 1;
      .address {
        .image {
          width: 28px;
          height: auto;
          margin: -2px 10px 0 0;
          @media screen and (max-width: 1260px) {
            width: 32px;
          }
          @media screen and (max-width: 1024px) {
            width: 35px;
          }
          @media screen and (max-width: 992px) {
            width: 40px;
          }
          @media screen and (max-width: 768px) {
            width: 45px;
          }
          @media screen and (max-width: 600px) {
            width: 65px;
            margin: -4px 20px 0 0;
          }
          @media screen and (max-width: 540px) {
            width: 75px;
            margin: -10px 20px 0 0;
          }
        }
      }
      .connect {
        color: @white-color;
        .el-dropdown {
          .el-dropdown-link {
            padding: 9px 22px 9px 15px;
            margin: 0 0 0 24px;
            background-color: #717172;
            border-radius: 50px;
            color: @white-color;
            span {
              width: 10px;
              height: 10px;
              margin: 0 8px 0 0;
              background-color: #0ff71a;
              border-radius: 20px;
            }
          }
        }
        // .sign-popper {
        //   * {
        //     outline: none !important;
        //   }
        //   .el-dropdown-link {
        //     padding: 4px;
        //     color: @white-color;
        //     background-color: @theme-color;
        //     border-radius: 64px;
        //     * {
        //       cursor: pointer;
        //     }
        //     .width-icon {
        //       fill: @white-color;
        //     }
        //     &:focus-visible {
        //       outline: none !important;
        //     }
        //   }
        // }
      }
    }
  }
}
</style>