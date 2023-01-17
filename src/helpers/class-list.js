const removeClass = (el, className) => el.classList.remove(className)

const addClass = (el, className) => el.classList.add(className)

const containsClass = (el, className) => el.classList.contains(className)

export {
  removeClass,
  addClass,
  containsClass
}
