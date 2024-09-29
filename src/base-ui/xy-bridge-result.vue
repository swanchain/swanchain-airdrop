<template>
  <div class="xy-result flex-column flex-ai-center">
    <div class="success text-center">
      <svg v-if="props.parentMessage" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2343" width="64" height="64"><path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m249.7 380.7L454.3 688.1c-6.2 6.2-16.4 6.2-22.6 0L262.3 518.7c-6.2-6.2-6.2-16.4 0-22.6l23-23c5.6-5.6 14.4-6.3 20.7-1.6l126.7 92.4c6 4.4 14.2 4.1 19.9-0.8l265.1-228c6.3-5.5 15.8-5.1 21.7 0.8l22.2 22.2c6.3 6.2 6.3 16.4 0.1 22.6z" p-id="2344" fill="#43b85c"></path></svg>
      <svg v-else class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3404" width="64" height="64"><path d="M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z" fill="#E84335" p-id="3405"></path></svg>
      <div class="font-14 mt-10">{{ props.parentMessage ? 'Successed' : 'Failed'}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timeout } from '@/utils/common';

const props = withDefaults(
  defineProps<{
    parentMessage?: boolean
  }>(),
  {
    parentMessage: false
  }
)

const emits = defineEmits(['handIcon'])
onMounted(async () => {
  await timeout(3000)
  emits('handIcon', false)
})
</script>

<style lang="less" scoped>
.xy-result {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0.32rem;
  background-color: var(--color-black);
  transform: translate(-50%, -50%);
  border-radius: 0.16rem;
  box-shadow: 0 0 0.12rem var(--color-light-opacity-24);
  z-index: 9;
  svg {
    width: 40px;
    height: 40px;
    margin: auto;
  }
}
</style>
