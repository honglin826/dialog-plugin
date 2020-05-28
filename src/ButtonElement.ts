import CustomElements from './CustomElements'

let buttonStyle = require('./style/button.css')

class ButtonElement extends CustomElements {
  constructor(text: string) {
    super('button')
    this.html(text)
    this.addClass(buttonStyle.btn)
  }
  setType(type: number) {
    if (type === 0) {
      this.addClass(buttonStyle.primary)
    } else {
      this.addClass(buttonStyle.info)
    }
  }
}

export default ButtonElement