import { moonBlock } from '@verno.digital/moon-block'
import { setAsyncProperty } from './helpers/set-async-property'
import { addClass, containsClass, removeClass } from './helpers/class-list'
import { getPadding } from './helpers/get-padding'

class MoonAccordion {
  #bufferHandlerClick
  #options

  #accordion = ({block, others}) => {
    let timeout = undefined

    const areaClicked = block.querySelector(this.#options.clickArea.selector)
    const flexing = block.querySelector(this.#options.flexing.selector)

    const setOpenHeight = () => {
      setAsyncProperty(flexing, {
        key: 'height',
        value: `${flexing.scrollHeight + getPadding(block)}px`
      })
    }

    const setCloseHeight = () => {
      const heightInner = flexing.offsetHeight

      setAsyncProperty(flexing, {
        key: 'height',
        value: `${heightInner}px`
      })

      setAsyncProperty(flexing, {
        key: 'height',
        value: 0
      })
    }

    const isOpen = () => {
      return containsClass(block, this.#options.accordion.active)
    }

    const open = () => {
      addClass(block, this.#options.accordion.active)
      setOpenHeight()

      timeout = setTimeout(() => flexing.style.height = 'auto', this.#options.timeout)
    }

    const close = () => {
      setCloseHeight()
      removeClass(block, this.#options.accordion.active)
      clearTimeout(timeout)
    }

    const closeOthers = () => {
      others.forEach((inst) => inst.close())
    }

    const handlerClick = () => {
      isOpen() ? close() : open()
      closeOthers()
    }

    areaClicked.addEventListener('click', handlerClick)

    this.#addHandlerBuffer({
      handler: handlerClick,
      dom: areaClicked
    })

    return {
      close
    }
  }

  constructor(options) {
    this.#options = options
    this.#init()
  }

  destroy () {
    (this.#bufferHandlerClick ?? []).forEach(({ dom, handler }) => {
      dom.removeEventListener('click', handler)
    })
  }

  #init() {
    moonBlock(this.#options.accordion.selector, this.#accordion)
  }

  #addHandlerBuffer(handler) {
    this.#bufferHandlerClick = [
      ...(this.#bufferHandlerClick ?? []),
      handler
    ]
  }
}

export { MoonAccordion }
