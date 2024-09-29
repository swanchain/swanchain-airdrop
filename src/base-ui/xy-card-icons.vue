<template>
  <div>
    <div v-if="title" class="font-32 font-bold color-black text-center mb-32">{{ title }}</div>
    <el-row>
      <template v-for="item in list" :key="item.title">
        <el-col :span="24 / col" :xs="24" class="item flex-column flex-ai-center" :class="{ line }" :style="{ paddingLeft: gutter }">
          <div class="icon flex flex-center">
            <img :src="item.icon" class="wh-100" />
          </div>
          <div v-if="item.title" :class="'font-24 font-bold color-dark text-center mb-16 ' + (titleClassName ?? '')">
            {{ item.title }}
          </div>
          <div v-if="item.desc" :class="'font-18 color-dark text-center line-3 stats-desc ' + (descClassName ?? '')">
            {{ item.desc }}
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
interface Item {
  icon: string
  title?: string
  desc?: string
}

withDefaults(
  defineProps<{
    list: Item[]
    title?: string
    col?: number
    line?: boolean
    titleClassName?: string
    descClassName?: string
    gutter?: string
  }>(),
  {
    col: 2,
    line: false,
    titleClassName: 'font-28',
    descClassName: 'font-20',
    gutter: ''
  }
)
</script>

<style scoped lang="less">
.item {
  @media screen and (max-width: 767px) {
    padding: 0.6rem 0 !important;
  }
}
.item:first-child {
  padding-left: 0 !important;
}
.item.line {
  padding: 0 0.6rem;
  @media screen and (max-width: 767px) {
    padding: 0.6rem 0 !important;
  }
}
.item.line:not(:first-child) {
  border-left: 0.01rem solid var(--color-light-grey);
  @media screen and (max-width: 767px) {
    border: 0;
  }
}
.icon {
  margin-bottom: 0.16rem;
  background-color: var(--color-light);
  border-radius: 0.32rem;
  width: 2rem;
  height: 2rem;
}
.title {
  color: var(--color-dark);
  text-align: center;
}
.desc {
  color: var(--color-dark);
  text-align: center;
}
</style>
