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
  timeout: number
}

declare class MoonAccordion {
  constructor (options: options)
}

export {
  MoonAccordion
}
