import {
  CLEAR_SESSION,
  SET_SESSION
} from '../constants/actionTypes'
import cognitoUtils from '../lib/cognitoUtils'
import { loadState, saveState } from '../actions/localStorage'
import service from '../api/api'

export function clearSession () {
  return function (dispatch) {
    dispatch({ type: CLEAR_SESSION })
  }
}

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
  return function (dispatch) {
    const session = loadState()
    if (session !== undefined && session.credentials.accessToken !== undefined) {
      service.setToken(session.credentials.accessToken, session.credentials.idToken, session.credentials.refreshToken)
      dispatch({ type: SET_SESSION, session })
    }
  }
}

export const setSession = (session) => ({
  type: SET_SESSION,
  session
})
