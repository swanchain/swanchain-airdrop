<template>
  <div class="wrapper" id="wrapper" ref="area">
    <el-container>
      <el-header>
        <v-head @hardClose="hardClose"></v-head>
      </el-header>
      <el-main>
        <div class="content">
          <router-view v-slot="{ Component }" @hardClose="hardClose">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
          <el-backtop :right="20" :bottom="50" />
        </div>
      </el-main>
    </el-container>

    <pop-ups v-if="claimShow && metaAddress === ''" :claimShow="claimShow" @hardClose="hardClose"></pop-ups>
    <table-popups v-if="claimShow && metaAddress" :claimShow="claimShow" @hardClose="hardClose"></table-popups>
  </div>
</template>

<script>
import vHead from './Header.vue'
import popUps from "@/components/popups"
import tablePopups from "@/components/tablePopups"
import { defineComponent, computed, onMounted, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { ElBacktop, ElContainer, ElHeader, ElMain } from "element-plus"
export default defineComponent({
  setup () {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth < 992)
    const system = getCurrentInstance().appContext.config.globalProperties
    const metaAddress = computed(() => (store.state.metaAddress))
    const route = useRoute()
    const router = useRouter()
    const claimShow = ref(false)

    function hardClose (dialog) {
      claimShow.value = dialog
    }
    onMounted(() => { })
    return {
      system,
      metaAddress,
      claimShow,
      hardClose
    }
  },
  components: {
    vHead, ElBacktop, ElContainer, ElHeader, ElMain, popUps, tablePopups
  }
})
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  .content {
    :deep(.el-backtop) {
      background-color: @white-color;
      color: #231f20;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.35);
      @media screen and (max-width: 768px) {
        width: 80px;
        height: 80px;
      }
      @media screen and (max-width: 600px) {
        width: 110px;
        height: 110px;
      }
      .el-icon,
      svg {
        @media screen and (max-width: 768px) {
          width: 50px;
          height: 50px;
        }
        @media screen and (max-width: 600px) {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  .el-container {
    .el-header,
    .el-footer,
    .el-main {
      width: 100%;
      height: auto;
      padding: 0;
    }
    .el-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
      font-family: "Gilroy-Medium";
      // background-color: #0f1010;
    }
  }
}
</style>

<style lang="less">
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.3s;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }

.mt-border {
  margin: 30px auto;
  border-top: 1px solid #8c878d;
}
.lang-max {
  width: 75.5%;
  max-width: 1450px;
  padding: 0;
  margin: auto;
  @media screen and (min-width: 2160px) {
    width: 100%;
    max-width: 1580px;
  }
  @media screen and (min-width: 2664px) {
    max-width: 1780px;
  }
  @media screen and (min-width: 4090px) {
    max-width: 2020px;
  }
  @media screen and (min-width: 5120px) {
    max-width: 2260px;
  }
  @media screen and (max-width: 1200px) {
    width: calc(100% - 64px);
    padding: 0 32px;
  }
}

.img {
  display: block;
  width: 100%;
}

.picture-mit {
  max-width: 170px;
  margin: auto;
}

.menu-width-mit {
  width: calc(100% - 230px);
  @media screen and (max-width: 540px) {
    width: calc(100% - 200px);
  }
}

.el-loading-spinner .path {
  stroke: #4b66fc;
}
.el-loading-spinner .el-loading-text {
  margin: 15px 0;
  font-size: 20px;
  color: #4b66fc;
  @media screen and (min-width: 2160px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
  @media screen and (max-width: 600px) {
    font-size: 60px;
  }
}
</style>

