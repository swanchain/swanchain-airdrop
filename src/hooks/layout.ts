import { EWindowSize } from '@/constant/common'
import { throttle } from '@/utils/common'

export const windowSize = ref(getWindowSize())
window.onresize = throttle(() => {
  windowSize.value = getWindowSize()
}, 1000)

export function getWindowSize() {
  if (window.innerWidth < 768) {
    return EWindowSize.XS
  } else if (window.innerWidth < 992) {
    return EWindowSize.SM
  } else if (window.innerWidth < 1200) {
    return EWindowSize.MD
  } else if (window.innerWidth < 1920) {
    return EWindowSize.LG
  } else {
    return EWindowSize.XL
  }
}
