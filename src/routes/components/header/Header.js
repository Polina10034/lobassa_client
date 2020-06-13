import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import cognitoUtils from '../../../lib/cognitoUtils'
import request from 'request'
import appConfig from '../../../config/app-config.json'
import {
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core'
import api from '../../../api/api'

const mapStateToProps = state => {
  return { session: state.session }
}
function Header () {
  const dispatch = useDispatch()
  //   const { state } = props

  const state = useSelector(state => state)
  const isLoggedIn = useSelector(state => state.session.isLoggedIn)
  console.log('Is logged?', isLoggedIn)
  
  // const handleLogout = () => dispatch(logout());

  //   onSignOut = (e) => {
  //     e.preventDefault()
  //     cognitoUtils.signOutCognitoSession()
  //   }

  return (
    <div className="Header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ marginRight: '60%' }}> LoBassa </Typography>
          { isLoggedIn ? (
            <Typography style={{ flex: 1, justifyContent: 'flex-end' }} >Hi, {state.session.user.userName}</Typography>
          )
            : (
              <div style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button ><a className="MuiButtonBase-root " href={cognitoUtils.getCognitoSignInUri()}>Sign in</a></Button>
              </div>
            )}
        </Toolbar>
        {/* { this.props.session.isLoggedIn ? (

            <div>
              <p>You are logged in as user {this.props.session.user.userName} ({this.props.session.user.email}).</p>
              <p></p>
              <div>
                <div>API status: {this.state.apiStatus}</div>
                <div className="Home-api-response">{this.state.apiResponse}</div>
              </div>
              <p></p>
              <a className="Home-link" href="#" onClick={this.onSignOut}>Sign out</a>
            </div>
          ) : (
            <div>
              <p>You are not logged in.</p>
              <a className="Home-link" href={cognitoUtils.getCognitoSignInUri()}>Sign in</a>
            </div>
          )} */}
      </AppBar>
      <div className="Home-details">

      </div>

    </div>
  )
}

// export default connect(mapStateToProps)(Header)

export default Header
