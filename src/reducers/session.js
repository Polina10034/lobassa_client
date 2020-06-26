import { CLEAR_SESSION, SET_SESSION, RESTORE_SESSION, SAVE_SESSION } from '../constants/actionTypes'
import api from '../api/api'
import { loadState, saveState } from '../actions/localStorage'
const initialState = {
  isLoggedIn: false,
  type: 'user'
}
//  load from local storage
const session = (state = initialState, action) => {
  console.log('state', state)
  switch (action.type) {
    case SET_SESSION:
      // const aSesion
      return Object.assign({}, action.session, {
        isLoggedIn: true,
        type: action.session.user.type[0],
        // labelsData: api.getAll()
      })

    case CLEAR_SESSION:
      return initialState

    case SAVE_SESSION:
      saveState(state)
      return state

    case RESTORE_SESSION:
      console.log("restore_session")
      const crrState = loadState()
      return crrState

    default:
      return state
  }
}

export default session
