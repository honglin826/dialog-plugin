import {ModalMask, ModalDialog} from './Modal'
import panelContainer from './PanelContainer'
import GlobalEvent from './GlobalEvent'
import { GLOBAL_EVENT } from './enum'

const modal = require('./style/modal.css')

export class Select {
  mask: ModalMask
  dialog: ModalDialog
  container: panelContainer
  init (config: config = {title: '弹窗', role: 'ADMIN', clickModelClose: true}) {
    this.mask = new ModalMask()
    this.dialog = new ModalDialog(config.title)
    this.mask.append(this.dialog)
    this.createContainer(config)

    let ajaxParams = {
      roleId: config.roleId,
      filterRole: config.filterRole,
      filterId: config.filterId,
      rolemarks: config.rolemarks,
      limitUserSchoolId: config.limitUserSchoolId
    }
    return new Promise((resolve, reject) => {
      GlobalEvent.$on(GLOBAL_EVENT.GET_RESULT, () => {
        this.dialog.addClass(modal.dispose)
        this.close()
        resolve()
      })
      GlobalEvent.$on(GLOBAL_EVENT.CANCEL_SELECT, () => {
        this.dialog.addClass(modal.dispose)
        this.close()
        reject()
      })
    })
  }
  close() {
    this.mask.dispose()
    GlobalEvent.$clear()
  }
  createContainer(config: config) {
    let container = new panelContainer(this.dialog.containerHeight)
    this.dialog.appendToContent(container)
  }
}