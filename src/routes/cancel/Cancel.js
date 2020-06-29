import React, { Component } from 'react'
import '../Approval/Approval.css'
import { connect } from 'react-redux'
// import { ReactComponent as Logo } from '../../routes/lobassaLogo.svg'
import {
  Typography,
  AppBar,
  Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return { session: state.session }
}

class Cancel extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="Approval">
        <div className="Approval-header">
          <AppBar className="Approval-text" position="static" >
            <Typography variant='h6' > Transaction Cancellation </Typography>
          </AppBar >
        </div>
        <div className="Approval-content" >
          <div className="Approval-Title" >
            <p> Something went wrong </p>
          </div>
          <div className="Approval-centerContent" >
            <p>
                Hey You, < br />
                we are sorry to inform you that <br />
                something went wrong with <br />
                your transaction. <br />
                please check your details and try again
            </p>
          </div>
          <div className="Approval-bottomContent" >
            <p>
                            We are glad to help you < br />
                            LoBassa Team.
            </p>
          </div >
          <div className="Approval-logo" >
            <img
              src="../images/logo2.png"
              alt="logo"
              style={{width: '180px'}}
            />
          </div>
          <div className="Approval-home">
            <Link to="/tags" style={{ textDecoration: 'none' }}>
              <Button style={{ backgroundColor: '#01A39D', borderRadius: 22, color: '#FFFFFF' }}>Comeback Home</Button>
            </Link>
          </div>
        </div >
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cancel)
