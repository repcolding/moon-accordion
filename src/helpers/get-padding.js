const getPadding = (el) => {
  const string = getComputedStyle(el).getPropertyValue('--moon-accordion-flex-padding')
  const listing = string.replaceAll(' ', '').split(',').map(value => parseInt(value))

  const res = listing.reduce((acc, number) => acc + number)
  console.log(res)

  return res
}

export {
  getPadding
}
