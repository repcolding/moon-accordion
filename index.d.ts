interface options {
  accordion: {
    selector: string,
    active: string
  },
  clickArea: {
    selector: string
  },
  heightArea: {
    selector: string
  },
  timeout: number,
  dispatch?: {
    update?: string
  },
  cssVarPadding?: string
}

declare class MoonAccordion {
  constructor (options: options)
}

export {
  MoonAccordion
}
