import React, { Component } from 'react'
import './Home.css'
import { connect } from 'react-redux'
// import appConfig from '../../../config/app-config.json'
import {
  Typography,
  AppBar
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
        <div>
          <img
            src="../images/logo2.png"
            alt="logo"
            style={{ height: 100, marginTop: 50 }}
          />
        </div>
        <div className="Home-details">
          <Typography>Please Sign In</Typography>

        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
