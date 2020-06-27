export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}

export const clearState = () => {
  try {
    // const serializedState = JSON.stringify(state)
    localStorage.clearItem('state')
    localStorage.clear()
  } catch {
    // ignore write errors
  }
}
