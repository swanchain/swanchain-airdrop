import { useColorMode, type BasicColorSchema } from '@vueuse/core'

export const theme = ref<BasicColorSchema>('dark')

export function setTheme(themeMode: BasicColorSchema) {
  const mode = useColorMode()
  theme.value = themeMode
  mode.value = themeMode
}
