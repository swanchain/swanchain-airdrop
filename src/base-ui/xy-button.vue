<template>
  <div :class="innerClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary'
    plain?: boolean
    bgColor?: string
    fit?: boolean
    border?: boolean
    shadow?: boolean
  }>(),
  {
    type: 'default',
    plgin: false,
    bgColor: '',
    fit: false,
    border: false,
    shadow: false
  }
)

const innerClass = computed(() => {
  let className = `xy-button ${props.type}`
  if (props.fit) {
    className += ` fit`
  }
  if (props.border) {
    className += ` border`
  }
  if (props.plain) {
    className += ` plain`
  }
  if (props.shadow) {
    className += ` shadow`
  }
  return className
})
</script>

<style scoped lang="less">
.xy-button {
  cursor: pointer;
  text-align: center;
  border-radius: 0.16rem;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xy-button.fit {
  width: fit-content;
}
.xy-button.default {
  border: 0.01rem solid var(--color-light);
  background-color: var(--color-light);
  color: var(--color-primary);
}
.xy-button.plain {
  background-color: rgba(0, 0, 0, 0);
}
.xy-button.default.border {
  border-color: var(--color-primary);
}
.xy-button.default:hover {
  background-color: transparent;
  color: var(--color-light);
}
.xy-button.default.border:hover {
  background-color: var(--color-primary);
}
.xy-button.shadow.active {
  box-shadow: 0 0.16rem 0.32rem 0 rgba(64, 76, 251, 0.25);
}
</style>
