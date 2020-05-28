let listeners = new Map<String, Set<Function>>()

export default {
  $on (key: string, callback: Function) {
    let listenerSet = listeners.get(key)
    if (!listenerSet) {
      listenerSet = new Set()
      listenerSet.add(callback)
      listeners.set(key, listenerSet)
    } else {
      listenerSet.add(callback)
    }
  },
  $emit(key: string, ...val: any[]) {
    let listenerSet = listeners.get(key)
    if (listenerSet) {
      listenerSet.forEach((listener: Function) => {
        listener.call(this, ...val)
      })
    }
  },
  $remove(key: string, val?: any) {
    let listenerSet = listeners.get(key)
    if(!listenerSet) return
    if(!val) {
      listeners.delete(key)
      listenerSet.clear()
    } else {
      listenerSet.delete(val)
    }
  },
  $clear() {
    listeners.clear()
  }
}