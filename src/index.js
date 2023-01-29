import { moonBlock } from '@verno.digital/moon-block'
import { setAsyncProperty } from './helpers/set-async-property'
import { addClass, containsClass, removeClass } from './helpers/class-list'
import { getOptions } from './options/default'

class MoonAccordion {
  #bufferHandlerClick
  #options

  #accordion = ({block, others}) => {
    let timeout = undefined

    const areaClicked = block.querySelector(this.#options.clickArea.selector)
    const flexing = block.querySelector(this.#options.heightArea.selector)

    const setOpenHeight = () => {
      const height = `${flexing.scrollHeight + this.#getCssPadding(block)}px`

      setAsyncProperty(flexing, {
        key: 'height',
        value: height
      })

      this.#dispatch(block, height)
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

      this.#dispatch(block, 0)
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

    const handlerClick = () => {
      this.#isOpen(block) ? close() : open()
      this.#closeOthers(others)
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
    this.#options = getOptions(options)
    this.#bufferHandlerClick = []
    this.#init()
  }

  destroy () {
    this.#bufferHandlerClick.forEach(({ dom, handler }) => {
      dom.removeEventListener('click', handler)
    })
  }

  #isOpen(block) {
    return containsClass(block, this.#options.accordion.active)
  }

  #closeOthers(others) {
    others.forEach((inst) => inst.close())
  }

  #init() {
    moonBlock(this.#options.accordion.selector, this.#accordion)
  }

  #addHandlerBuffer(handler) {
    this.#bufferHandlerClick.push(handler)
  }

  #dispatch (accordion, height) {
    accordion.dispatchEvent(
      new CustomEvent(this.#options.dispatch.update, { bubbles: true, detail: { height } })
    )
  }

  #getCssPadding (accordion) {
    return parseInt(
      getComputedStyle(accordion).getPropertyValue(this.#options.cssVarPadding)
    )
  }
}

export { MoonAccordion }
