<template>
  <el-container>
    <el-main class="module-container main-body">
      <header-index></header-index>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import HeaderIndex from '@/components/header/header-index.vue'
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: hidden;
  position: relative;
  .el-main {
    background: none;
    padding: 0;
    position: relative;
  }
}
</style>
