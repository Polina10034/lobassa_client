import React, { Component } from 'react'
import './finalPayment.css'
import { connect } from 'react-redux'
import { ReactComponent as Logo } from '../../routes/lobassaLogo.svg'
import {
  Typography,
  AppBar,
  Button
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

const mapStateToProps = state => {
  return { session: state.session }
}

class FinalPayment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmationNum: undefined
    }
    this.getQuery = this.getQuery.bind(this)
  }

  componentDidMount () {
    const { transactionId } = this.props.location.state
    this.setState({ confirmationNum: transactionId })
    this.getQuery(transactionId)
  }

  getQuery (transactionId) {
    // const query = window.location.search
    // const params = query.split('&')
    // const toSend = `${params[0]}&${params[2]}&${params[4]}`
    // console.log(`to send:${toSend}`)
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    // console.log(`toSend:${toSend}`)
    const url = `https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta/payment/executepayment${transactionId}`
    fetch(proxyurl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode === 200) {
          alert('The transaction is confirmed')
        }
        if (data.statusCode === 500) {
          return (
            <Redirect to='/Cancel' />
          )
        }
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
            <Typography variant='h6' > Payment Complete </Typography>
          </AppBar >
        </div>
        <div className="Approval-content" >
          <div className="Approval-Title" >
            <p> Confirmation Number: XXXXX</p>
          </div>
          <div className="Approval-centerContent" >
            <p>
              Your payment sent succesfully.
              Thank You!
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

export default connect(mapStateToProps)(FinalPayment)
