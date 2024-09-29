<template>
  <div :class="`header flex flex-ai-center flex-jc-center ${abs ? 'abs' : ''}`" :style="{ background: bgColor }">
    <div class="header-container flex flex-ai-center flex-jc-between">
      <header-logo :light="isLight"></header-logo>
      <header-sign-out :light="isLight"></header-sign-out>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderLogo from './header-logo.vue'
import HeaderSignOut from './header-signOut.vue'

const ROUTE_WHITE = ref<any[]>([])
const isLight = ref(false)
const abs = computed(() => !isLight.value)
const route = useRoute()
if (ROUTE_WHITE.value.includes(route.path)) {
  isLight.value = true
}
const router = useRouter()
router.beforeEach(to => {
  if (ROUTE_WHITE.value.includes(to.path)) {
    isLight.value = true
  } else {
    isLight.value = false
  }
})

const bgColor = ref('')
// onMounted(() => {
//   const main = document.getElementsByTagName('main')?.[0]
//   main?.addEventListener('scroll', function () {
//     bgColor.value = `RGBA(35, 42, 146, ${main.scrollTop / 1000})`
//   })
// })
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  z-index: 999;
  top: 0;
  padding: 0.13rem 1.28rem;
  background: linear-gradient(180deg, #000, transparent);
  @media screen and (max-width: 768px) {
    padding: 0.12rem 0.6rem;
  }
  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
  &-container {
    width: 80%;
    width: 1184px;
    max-width: 1184px;
    min-width: 640px;
    @media screen and (max-width: 992px) {
      width: 80%;
    }
    @media screen and (max-width: 600px) {
      flex-wrap: wrap;
      width: 100%;
      min-width: 320px;
    }
  }
}
.header.abs {
  position: fixed;
}
</style>
