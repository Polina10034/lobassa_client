import React, { Component, useState, useEffect } from 'react'
import './Home.css'
import { connect } from 'react-redux'
import appConfig from '../../../config/app-config.json'
import {
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core'

const mapStateToProps = state => {
  return { session: state.session }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { apiStatus: 'Not called' }
  }

  render () {
    console.log(this.props.session)
    return (
      <div className="Home">
        <AppBar position="static">
          <Typography>Home Page</Typography>
        </AppBar>
        <div className="Home-details">

        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
