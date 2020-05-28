import CustomElements from './CustomElements'
import ButtonElement from './ButtonElement'
import { GLOBAL_EVENT } from './enum'

let modal = require('./style/modal.css')

const MAX_HRIGHT = 500

export class ModalMask extends CustomElements {
  appendEl: HTMLElement
  constructor(el?: HTMLElement) {
    super()
    this.appendEl = el || document.body
    this.el = document.createElement('div')
    this.addClass(modal.mask)
    this.appendEl.appendChild(this.el)
    this.addClass(modal.show)
    this.addListener('click', () => {
      this.$emit(GLOBAL_EVENT.CANCEL_SELECT)
    })
  }
  dispose() {
    this.addClass(modal.hide)
    this.children.forEach(element => {
      element.dispose()
    })
    this.appendEl.removeChild(this.el)
  }
}

export class ModalDialog extends CustomElements {
  dialogHeight: number
  containerHeight: number
  header: CustomElements
  container: CustomElements
  footer: CustomElements
  constructor(title: string) {
    super()
    this.addClass(modal.dialog)
    let screenHeight = document.documentElement.clientHeight
    this.dialogHeight = screenHeight > MAX_HRIGHT ? MAX_HRIGHT : screenHeight
    this.header = new ModalDialogHeader(title)
    this.container = new CustomElements()
    this.containerHeight = this.dialogHeight - 30 -50
    this.container.addStyle({
      height: this.containerHeight + 'px'
    })
    this.container.addClass(modal.container)
    this.footer = new ModalDialogFooter()
    this.append(this.header, this.container, this.footer)
    this.addStyle({
      height: this.dialogHeight + 'px'
    })
    this.addListener('click', e => {
      e.stopPropagation()
    })
  }
  appendToContent(el: CustomElements) {
    this.container.append(el)
  }
}

class ModalDialogHeader extends CustomElements {
  constructor(title: string) {
    super()
    this.addClass(modal.header)
    let html = `<span class=${modal.title}>${title}</span>`
    this.html(html)
    this.append(new CloseIcon())
  }
}

class CloseIcon extends CustomElements {
  constructor() {
    super('img')
    let img = require('./img/close.png')
    console.log(img)
    this.attr('src', img.default)
    this.addClass(modal.closeIcon)
    this.addListener('click', () => {
      this.$emit(GLOBAL_EVENT.CANCEL_SELECT)
    })
  }
}

class ModalDialogFooter extends CustomElements {
  constructor() {
    super()
    this.addClass(modal.footer)
    let confirmButton = new ButtonElement('确认')
    confirmButton.setType(0)
    confirmButton.addListener('click', () => {
      this.$emit(GLOBAL_EVENT.GET_RESULT)
    })
    this.append(confirmButton)
    let cancelButton = new ButtonElement('取消')
    cancelButton.setType(1)
    cancelButton.addListener('click', () => {
      this.$emit(GLOBAL_EVENT.CANCEL_SELECT)
    })
    this.append(cancelButton)
  }
}