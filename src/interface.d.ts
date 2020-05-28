type NODE_TYPE_SCHOOL = 'school'
type NODE_TYPE = NODE_TYPE_SCHOOL | 'PROVINCE' | 'TOWN'
type RESULT_NODE_TYPE = 'school' | 'grade' | 'class'

interface studentConfigData {
  type: string,
  id: string
}
interface config {
  title: string,
  roleId?: string,
  role?: string,
  ajaxHeaders?: object,
  clickModelClose?: boolean,
  data?: studentConfigData[]
}
interface StylesObject {
  [key: string]: string
}
// 自定义属性
interface CustomElement {
  el: HTMLElement,
  name?: string,
  children: Array<CustomElement>,
  $on: Function,
  $emit: Function,
  $remove: Function,
  $clear: Function,
  addClass(...cls: string[]): void,
  removeClass(...cls: string[]): void,
  attr(key: string, val: string): void,
  html(html: string): void,
  addStyle(styles: StylesObject): void,
  append(...elements: any[]): void,
  // ??
  addListener<K extends keyof HTMLElementEventMap>(key: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void,
  dispose(): void
}