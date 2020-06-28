import React from 'react'
import { useSelector } from 'react-redux'
import cognitoUtils from '../../../lib/cognitoUtils'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core'

function Header () {
  const state = useSelector(state => state)
  const isLoggedIn = useSelector(state => state.session.isLoggedIn)

  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  return (
    <div className="Header">
      <AppBar position="fixed" style={{ background: '#2d60adb3' }} >
        <Toolbar>
          { isLoggedIn ? (
            <NavLink to="/tags" exact>
              <img
                src="../images/logo2.png"
                alt="logo"
                style={{ height: 50, marginTop: 2 }}
              />
            </NavLink>)
            : (<NavLink to="/" exact>
              <img
                src="../images/logo2.png"
                alt="logo"
                style={{ height: 50, marginTop: 2 }}
              />
            </NavLink>)}
          { isLoggedIn ? (
            <Toolbar style={{ position: 'fixed', right: '10px' }}>
              <Typography >Hi, {state.session.user.userName}</Typography>
              <Button style={{ marginLeft: '30px' }}><a className="Home-link" href="#" onClick={onSignOut}>Sign out</a></Button>
            </Toolbar>
          )
            : (
              <Toolbar style={{ position: 'fixed', right: '10px' }}>
                <Button style={{ flex: 1, color: '#fffff' }}><a className="Home-link" href={cognitoUtils.getCognitoSignInUri()}>Sign in</a></Button>
              </Toolbar >
            )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
