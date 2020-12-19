declare module '*.vue' {
  // 直し方調査中のため、一旦ignore
  // eslint-disable-next-line prettier/prettier
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}
