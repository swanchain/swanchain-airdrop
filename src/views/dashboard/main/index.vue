<template>
  <section id="container-main">
    <div class="module lang-max text-center font-27">
      <h1 class="font-68 font-bold">Check Your
        <span>Reward History</span>
      </h1>
      <h2 class="font-20 weight-4">Connect your wallet to view the rewards you've earned in the Swan Network. <br />See a detailed history of your achievements and prizes.</h2>
      <el-button round @click="claimShow=true">Click Query</el-button>
    </div>

    <!-- <ul class="media flex-row">
      <li v-for="m in mediaData" :key="m">
        <img :src="m.img" @click="system.$commonFun.goLink(m.link)" />
      </li>
    </ul> -->

    <pop-ups v-if="claimShow && metaAddress === ''" :claimShow="claimShow" @hardClose="hardClose"></pop-ups>
    <table-popups v-if="claimShow && metaAddress" :claimShow="claimShow" @hardClose="hardClose"></table-popups>
  </section>
</template>

<script>
import { defineComponent, computed, onMounted, watch, ref, reactive, getCurrentInstance } from 'vue'
import popUps from "@/components/popups"
import tablePopups from "@/components/tablePopups"
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  CircleCheck
} from '@element-plus/icons-vue'
import { ElButton } from "element-plus"
export default defineComponent({
  components: {
    CircleCheck, popUps, tablePopups, ElButton
  },
  setup () {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth <= 768 ? 30 : 50)
    const metaAddress = computed(() => (store.state.metaAddress))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
    const claimShow = ref(false)
    const mediaData = ref([
      {
        img: require('@/assets/images/media-01.png'),
        link: process.env.VUE_APP_BASE_T_LINK
      },
      {
        img: require('@/assets/images/media-02.png'),
        link: process.env.VUE_APP_BASE_TWITTER_LINK
      },
      {
        img: require('@/assets/images/media-03.png'),
        link: process.env.VUE_APP_BASE_DISCORD_LINK
      },
      {
        img: require('@/assets/images/media-04.png'),
        link: process.env.VUE_APP_BASE_GITHUB_LINK
      }
    ])

    function hardClose (dialog) {
      claimShow.value = dialog
    }
    onMounted(() => { })
    return {
      system,
      metaAddress,
      bodyWidth,
      claimShow,
      hardClose,
      mediaData
    }
  }
})
</script>

<style lang="less" scoped>
#container-main {
  position: relative;
  height: 100vh;
  font-size: 18px;
  letter-spacing: 1px;
  word-break: break-word;
  line-height: 1;
  .media {
    position: absolute;
    right: 80px;
    bottom: 28px;
    z-index: 9;
    li {
      width: 32px;
      margin: 0 0 0 18px;
      img {
        width: 100%;
        cursor: pointer;
      }
    }
  }
  .module {
    padding: 250px 0 0;
    @media screen and (max-width: 768px) {
      padding: 375px 0 0;
    }
    @media screen and (max-width: 600px) {
      padding: 500px 0 0;
    }
    h1 {
      span {
        color: @theme-color;
      }
    }
    h2 {
      padding: 22px 0 35px;
      line-height: 1.5;
    }
    .el-button {
      height: auto;
      padding: 17px 35px;
      margin: 0 auto;
      background-color: @theme-color;
      font-family: inherit;
      font-size: inherit;
      line-height: 1;
      color: @white-color;
      border-radius: 100px;
      transition: all 0.2s;
      border: 0;
      &:hover {
        background-color: @white-color;
        color: @theme-color;
      }
    }
  }
}
</style>
