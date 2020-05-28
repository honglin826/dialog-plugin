import CustomElements from "./CustomElements";

const containerStyle = require('./style/panel.css')

export default class panelContainer extends CustomElements {
  loadElement: CustomElements
  innerElement: CustomElements
  constructor(height: number) {
    super()
    this.addClass(containerStyle.container)
    this.loadElement = new CustomElements()
    this.loadElement.html(`<div class="${containerStyle.loadingSpinner}">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path">
        </circle>
      </svg>
    </div>`)
    this.loadElement.addClass(containerStyle.loading, containerStyle.hide)
    this.innerElement = new CustomElements()
    this.innerElement.addClass(containerStyle.panelInner)
    let innerHeight = height - 30
    this.innerElement.addStyle({
      height: innerHeight + 'px'
    })
    this.innerElement.html('我是弹窗内容')
    this.append(this.loadElement, this.innerElement)
  }
}