import { CLEAR_SESSION, SET_SESSION } from '../constants/actionTypes'

const initialState = {
  isLoggedIn: false,
  type: 'user'
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return Object.assign({},
        action.session,
        { isLoggedIn: true,
          type: action.session.user.type[0] })

    case CLEAR_SESSION:
      return initialState

    default:
      return state
  }
}

export default session
