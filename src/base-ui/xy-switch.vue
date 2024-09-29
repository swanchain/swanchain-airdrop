<template>
  <div class="xy-switch flex">
    <div
      :class="{
        'xy-switch-active': true,
        left: innerActive === leftValue,
        right: innerActive === rightValue
      }"
      :style="{ background: activeBg }"
    ></div>
    <div
      class="xy-switch-text flex flex-center font-12 font-regular2"
      :style="{ color: innerActive === leftValue ? activeColor : defaultColor }"
      @click="handleSwitch('left')"
    >
      {{ leftText }}
    </div>
    <div
      class="xy-switch-text flex flex-center font-12 font-regular2"
      :style="{ color: innerActive === rightValue ? activeColor : defaultColor }"
      @click="handleSwitch('right')"
    >
      {{ rightText }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active?: number | string | boolean
    leftText?: string
    leftValue?: number | string | boolean
    rightText?: string
    rightValue?: number | string | boolean
    defaultColor?: string
    activeColor?: string
    activeBg?: string
  }>(),
  {
    active: false,
    leftText: '',
    leftValue: false,
    rightText: '',
    rightValue: true,
    defaultColor: 'var(--color-light-grey-dark)',
    activeColor: 'var(--color-dark)',
    activeBg: 'var(--color-light)'
  }
)

const emits = defineEmits(['update:active', 'change'])

const innerActive = computed({
  set(val) {
    emits('update:active', val)
    emits('change', val)
  },
  get() {
    return props.active
  }
})

function handleSwitch(type: 'left' | 'right') {
  switch (type) {
    case 'left':
      innerActive.value = props.leftValue
      break
    case 'right':
      innerActive.value = props.rightValue
      break
  }
}
</script>

<style scoped lang="less">
@keyframes left {
  0% {
    left: 50%;
  }
  100% {
    left: 0;
  }
}
@keyframes right {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
  }
}
.xy-switch {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(0, 0, 0, 0.64);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &-text {
    position: relative;
    width: 50%;
    padding: 0.08rem 0.12rem;
  }
  &-active {
    width: 50%;
    height: 100%;
    border-radius: 1rem;
    position: absolute;
    top: 0;
    cursor: default;
  }
  &-active.left {
    animation: left 0.5s forwards;
  }
  &-active.right {
    animation: right 0.5s forwards;
  }
}
</style>
