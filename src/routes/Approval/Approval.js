import React, { Component } from 'react'
import './Approval.css'
import { connect } from 'react-redux'
import { ReactComponent as Logo } from '../../routes/lobassaLogo.svg'
import {
  Typography,
  AppBar,
  Button
} from '@material-ui/core'
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return { session: state.session }
}

class Approval extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getQuery () {
    const query = window.location.search
    console.log(`query:${query}`)
    const params = query.split('&')
    const toSend = `${params[0]}&${params[1]}&${params[3]}`
    console.log(toSend)
    // console.log(`to send:${toSend}`)
    // const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    // console.log(`toSend:${toSend}`)
    const url = `https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta/payment/paymentsuccess${toSend}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(`error:${error}`)
      })
  }

  render () {
    return (
      <div className="Approval">
        <div className="Approval-header">
          <AppBar className="Approval-text" position="static" >
            <Typography variant='h6' > Almost Complete </Typography>
          </AppBar >
        </div>
        <div className="Approval-content" >
          <div className="Approval-Title" >
            <p> We are ONE step away! </p>
          </div>
          <div className="Approval-centerContent" >
            <p>
              Hey You, < br />
                Now you just need to wait
                for your product gets to you, <br />
                that great news!
            </p>
          </div>
          <div className="Approval-bottomContent" >
            <p>
              We are glad to help you < br />
                LoBassa Team.
            </p>
          </div >
          <div className="Approval-logo" >
            <Logo />
          </div>
          {this.getQuery()}
          <div className="Approval-home">
            <Link to="/tags" style={{ textDecoration: 'none' }}>
              <Button style={{ backgroundColor: '#3A69B0', borderRadius: 22, width: '80px', color: '#FFFFFF' }}>Home</Button>
            </Link>
          </div>
        </div >
      </div>
    )
  }
}
export default connect(mapStateToProps)(Approval)