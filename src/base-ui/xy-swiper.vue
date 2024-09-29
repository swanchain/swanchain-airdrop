<template>
  <swiper :modules="modules" slides-per-view="auto" :looped-slides="list.length + 2" :autoplay="autoplay" loop>
    <template v-for="(item, index) in list" :key="index">
      <swiper-slide class="swiper-slide" :style="{ width: itemWidth, height: itemHeight, left: itemLeft, margin: itemMargin }">
        <img :src="item.label" @click="handleClickItem(item)" />
      </swiper-slide>
    </template>
  </swiper>
</template>
<script setup lang="ts">
import { Autoplay } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css' 
import type { IOption } from 'types/common'

defineProps<{
  list: IOption[]
  itemWidth?: string
  itemHeight?: string
  itemMargin?: string
  itemLeft?: string
}>()
const emits = defineEmits(['click-item'])
const modules = ref([Autoplay])
const autoplay = reactive({
  delay: 2500, 
  stopOnLastSlide: false,
  // disableOnInteraction: false,
  // autoplayDisableOnInteraction:false
  // pauseOnMouseEnter: true
})
function handleClickItem(item: IOption) {
  emits('click-item', item)
}
</script>
<style lang="scss">
.swiper {
  width: 100%;
  .swiper-wrapper {
    transition-timing-function: linear !important;
  }
  .swiper-slide {
    width: 100%;
    padding: 0.24rem;
    margin: 0 0.16rem;
    background: linear-gradient(180deg, #0b0b0b, #272727);
    position: relative;
    user-select: none;
    // cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
