import {
  CLEAR_SESSION,
  SET_SESSION,
  RESTORE_SESSION,
  SAVE_SESSION
} from '../constants/actionTypes'
import cognitoUtils from '../lib/cognitoUtils'
import { loadState, saveState, clearState } from '../actions/localStorage'
import service from '../api/api'

export function clearSession () {
  console.log('in clsearrr 1')
  return function (dispatch) {
    clearState()
    // if (session !== undefined) {
    //   console.log('session111', session)
    //   service.setToken(session.credentials.accessToken, session.credentials.idToken, session.credentials.refreshToken)
    dispatch({ type: CLEAR_SESSION })
  }
}
// export const  = () => {
//   console.log('in CLear')
//   localStorage.clear()
//   return {

//     type: CLEAR_SESSION
//   }
// }

// Initialise the Cognito sesson from a callback href
export function initSessionFromCallbackURI (callbackHref) {
  return function (dispatch) {
    return cognitoUtils
      .parseCognitoWebResponse(callbackHref) // parse the callback URL
      .then(() => cognitoUtils.getCognitoSession()) // get a new session
      .then((session) => {
        dispatch({ type: SET_SESSION, session })
        saveState(session)
      })
  }
}

export function restorSession () {
  console.log('in restore 1')
  return function (dispatch) {
    const session = loadState()
    if (session !== undefined) {
      console.log('session111', session)
      service.setToken(session.credentials.accessToken, session.credentials.idToken, session.credentials.refreshToken)
      dispatch({ type: SET_SESSION, session })
    }
  }
}

export const setSession = (session) => ({
  type: SET_SESSION,
  session
})
