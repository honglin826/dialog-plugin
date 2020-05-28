import GlobalEvent from './GlobalEvent'

class CustomElements implements CustomElement {
  el: HTMLElement
  children: Array<CustomElement>
  $on: Function
  $emit: Function
  $remove: Function
  $clear: Function
  listeners: Map<string, Set<Function>>
  constructor(tag: string = 'div') {
    this.el = document.createElement(tag)
    this.children = []
    this.$on = GlobalEvent.$on
    this.$emit = GlobalEvent.$emit
    this.$remove = GlobalEvent.$remove
    this.$clear = GlobalEvent.$clear
    this.listeners = new Map<string, Set<Function>>()
  }
  addClass(...cls: string[]) {
    let className = this.el.className
    let classes = new Set()
    if (className) {
      classes = new Set(className.split(' '))
    }
    for (let c of cls) {
      classes.add(c)
    }
    this.el.className = Array.from(classes).join(' ')
  }
  removeClass(...cls: string[]) {
    let className = this.el.className
    if (className) {
      let classes = new Set(className.split(' '))
      for(let c of cls) {
        classes.delete(c)
      }
      this.el.className = Array.from(classes).join(' ')
    }
  }
  attr(key: string, val: string) {
    this.el.setAttribute(key, val)
  }
  removeAttr(key: string) {
    this.el.removeAttribute(key)
  }
  html(html: string) {
    this.el.innerHTML = html
  }
  addStyle(styles: StylesObject) {
    for (let s in styles) {
      Reflect.set(this.el.style, s, styles[s])
    }
  }
  append(...elements: any[]) {
    for (let element of elements) {
      if (element instanceof CustomElements) {
        this.el.appendChild(element.el)
        this.children.push(element)
      }
      if (element instanceof HTMLElement) {
        this.el.appendChild(element)
      }
    }
  }
  remove(element: CustomElement) {
    for(let i = this.children.length - 1; i >= 0; i --) {
      let currentElement = this.children[i]
      if (currentElement.el === element.el) {
        this.el.removeChild(currentElement.el)
        this.children.splice(i, 1)
        currentElement.dispose()
      }
    }
  }
  addListener<K extends keyof HTMLElementEventMap>(key: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any) {
    this.el.addEventListener(key, listener)
  }
  on (key: string, callback: Function) {
    let listenerSet = this.listeners.get(key)
    if (!listenerSet) {
      listenerSet = new Set()
      listenerSet.add(callback)
      this.listeners.set(key, listenerSet)
    } else {
      listenerSet.add(callback)
    }
  }
  emit(key: string, ...val: any[]) {
    let listenerSet = this.listeners.get(key)
    if (listenerSet) {
      listenerSet.forEach((listener: Function) => {
        listener.call(this, ...val)
      })
    }
  }
  clear() {
    this.listeners.clear()
  }
  dispose() {
    this.clear()
  }
}

export default CustomElements