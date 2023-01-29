const defaultOptions = {
  dispatch: {
    update: 'ma:update'
  }
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
