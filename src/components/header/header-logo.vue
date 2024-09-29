<template>
  <div class="header-logo">
    <img :src="logoLight" title="Ecosystem" class="mtb-26" @click="toHome(router)" />
  </div>
</template>

<script setup lang="ts">
import logoLight from '@/assets/img/logo-chain.png'
import { toHome } from '@/hooks/router'
const router = useRouter()

defineProps<{
  light?: boolean
}>()
</script>

<style lang="less" scoped>
.header-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    height: 0.48rem;
    min-height: 25px;
  }
}
</style>
