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
    // if (!state.idToken) return;

    // if (!state.idToken) return;
    console.log('saving');
    const serializedState = JSON.stringify(state)
    console.log(serializedState);
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}
