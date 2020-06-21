import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import cognitoUtils from '../../../lib/cognitoUtils'

import {
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core'
import api from '../../../api/api'

function Header () {
//   const dispatch = useDispatch()
//   const { state } = props
 // const handleLogout = () => dispatch(logout());
  const state = useSelector(state => state)
  const isLoggedIn = useSelector(state => state.session.isLoggedIn)
  console.log('Is logged?', isLoggedIn)

  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  return (
    <div className="Header">
      <AppBar position="fixed" >
        <Toolbar>
          <Typography variant="h6" href="/tags" > LoBassa </Typography>
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
