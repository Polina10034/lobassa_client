import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import appConfig from '../../../config/app-config.json'
import {
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core'
import api from '../../../api/api'

function Tags () {
  const state = useSelector(state => state)
  console.log(state)
  // const dispatch = useDispatch()

  //   const state = useSelector(state => state)
  //   const isLoggedIn = useSelector(state => state.session.isLoggedIn)
  //   console.log('Is logged?', isLoggedIn)

  if (!state.session.isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="Header">
      <Typography>Tags page</Typography>
    </div>
  )
}

// export default connect(mapStateToProps)(Header)

export default Tags
