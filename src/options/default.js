const defaultOptions = {
  dispatch: {
    update: 'ma:update'
  },
  cssVarPadding: '--ma-padding'
}

const getOptions = (options) => {
  return {
    ...defaultOptions,
    ...options
  }
}

export {
  getOptions
}
