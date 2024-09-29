import type { Router } from 'vue-router'

export function openPage(url: string) {
  if(url) window.open(url, '_blank')
}

export function toPage(router: Router, path: string) {
  // router.push(path)
}

export function toLogin(router: Router) {
  //toPage(router, '/login')
}

export function toHome(router: Router) {
  toPage(router, '/index')
}
