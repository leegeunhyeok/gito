const THEMES = {
  default: {
    color: [
      '#ebedf0',
      '#c6e48b',
      '#7bc96f',
      '#239a3b',
      '#196127'
    ]
  }
}

export default theme => {
  return THEMES[theme]
}
