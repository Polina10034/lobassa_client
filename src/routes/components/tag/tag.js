import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import appConfig from '../../../config/app-config.json'
import {
  Button,
  Typography,
  AppBar,
  Card
} from '@material-ui/core'
import api from '../../../api/api'


const Tag = (props) => {
  // const dispatch = useDispatch()

//   const state = useSelector(state => state)
//   const isLoggedIn = useSelector(state => state.session.isLoggedIn)
//   console.log('Is logged?', isLoggedIn)

console.log("requesting", api.getAll())

  return (
    <div className="Header">
        <Typography>Tags page</Typography>
    </div>
  )
}

// export default connect(mapStateToProps)(Header)

export default Tag