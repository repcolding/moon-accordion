const setAsyncProperty = (el, { key, value }) => {
  el.style[key] = value
  return getComputedStyle(el)[key]
}

export {
  setAsyncProperty
}
