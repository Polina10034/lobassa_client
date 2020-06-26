import { CLEAR_SESSION, SET_SESSION } from '../constants/actionTypes'
import api from '../api/api'

const initialState = {
  isLoggedIn: false,
  type: 'user',
  labelsData: [],
  aSession: []
}
//  load from local storage
const session = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      // const aSesion
      return Object.assign({},
        action.session,
        { isLoggedIn: true,
          type: action.session.user.type[0],
          labelsData: api.getAll() })

    case CLEAR_SESSION:
      return initialState

    default:
      return state
  }
}

export default session
