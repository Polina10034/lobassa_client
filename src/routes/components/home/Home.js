import React, { Component } from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// import appConfig from '../../../config/app-config.json'
import {
  Typography
} from '@material-ui/core'
import { restorSession } from '../../../actions/session'

const mapStateToProps = state => {
  return { session: state.session }
}

function mapDispatchToProps (dispatch) {
  return {
    restorSession: () => dispatch(restorSession())
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { apiStatus: 'Not called' }
  }

  componentDidMount () {
    if (this.props.session.isLoggedIn === false) {
      this.props.restorSession()
    }
  }

  render () {
    // console.log(this.props.session)
    if (this.props.session.isLoggedIn === true) {
      return <Redirect to="/tags" />
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
