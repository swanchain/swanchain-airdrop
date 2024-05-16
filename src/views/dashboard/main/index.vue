<template>
  <section id="container-main">
    <div class="module lang-max text-center font-27">
      <h1 class="font-68 font-bold">
        <span>SWAN CHAIN </span>
      </h1>
      <h2 class="font-65 weight-4">THE DEPIN BUILT FOR AI</h2>
      <h3 class="font-20 weight-4">Click below to claim your reward.</h3>
      <div class="flex-row center claim-content">
        <el-button round @click="clickQuery">CLAIM</el-button>
        <el-select v-model="saturnValue" placeholder=" " class="font-20" popper-class="claim-list font-18">
          <el-option v-for="item in saturnOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>

    <ul class="media flex-row">
      <li v-for="m in mediaData" :key="m">
        <img :src="m.img" @click="system.$commonFun.goLink(m.link)" />
      </li>
    </ul>
  </section>
</template>

<script>
import { defineComponent, computed, onMounted, watch, ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import {
  CircleCheck
} from '@element-plus/icons-vue'
import { ElButton, ElSelect, ElOption } from "element-plus"
export default defineComponent({
  components: {
    CircleCheck, ElButton, ElSelect, ElOption
  },
  setup (props, context) {
    const store = useStore()
    const bodyWidth = ref(document.body.clientWidth <= 768 ? 30 : 50)
    const metaAddress = computed(() => (store.state.metaAddress))
    const system = getCurrentInstance().appContext.config.globalProperties
    const route = useRoute()
    const router = useRouter()
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
    const saturnValue = ref('Zealy')
    const saturnOptions = ref([
      {
        value: 'Zealy',
        label: 'Zealy saturn mission',
      },
      {
        value: 'Galxe',
        label: 'Galxe saturn testent',
      },
      {
        value: 'SAO',
        label: 'SWAN x SAO Partners',
      },
      {
        value: 'AMA',
        label: 'AMA saturn Winners',
      },
      {
        value: 'kol',
        label: 'SWAN saturn kol',
      },
      {
        value: 'UBI',
        label: 'CP UBI Rewards',
      },
      {
        value: 'Contribution',
        label: 'CP Contribution Rewards',
      },
      {
        value: 'Regional',
        label: 'Regional Computing Dao Pilot Rewards',
      },
      {
        value: 'Ambassador',
        label: 'Ambassador Stage 1',
      }
    ])

    function clickQuery (dialog) {
      context.emit('hardClose', true, metaAddress.value ? true : false, saturnValue.value)
    }
    onMounted(() => { })
    return {
      system,
      metaAddress,
      bodyWidth,
      mediaData,
      saturnValue,
      saturnOptions,
      clickQuery
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
  line-height: 1.1;
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
    h3 {
      padding: 22px 0 15px;
      line-height: 1.5;
    }
    :deep(.claim-content) {
      .el-button {
        height: auto;
        padding: 14px 35px;
        margin: 0 20px 0 0;
        background-color: @theme-color;
        font-family: inherit;
        font-size: inherit;
        line-height: 30px;
        color: @white-color;
        border-radius: 100px;
        transition: all 0.2s;
        border: 0;
        &:hover {
          background-color: @white-color;
          color: @theme-color;
        }
      }
      .el-select {
        width: auto;
        .el-select__wrapper {
          padding: 14px 45px;
          font-family: inherit;
          font-size: inherit;
          border-radius: 100px;
          transition: all 0.2s;
          border: 0;
          line-height: 30px;
          .el-select__placeholder {
            position: relative;
            top: auto;
            height: auto;
            transform: none;
            font-family: inherit;
            font-size: inherit;
            color: #447dff;
            line-height: 30px;
          }
          .el-select__caret {
            margin: 0 0 0 10px;
            font-size: inherit;
            font-weight: bolder;
            color: #447dff;
          }
        }
      }
    }
  }
}
</style>
