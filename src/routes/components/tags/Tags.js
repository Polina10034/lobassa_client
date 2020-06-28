import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Typography
} from '@material-ui/core'

function Tags () {
  const state = useSelector(state => state)

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
