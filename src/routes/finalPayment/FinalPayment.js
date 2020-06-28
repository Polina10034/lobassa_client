import React, { Component } from 'react'
import './finalPayment.css'
import { connect } from 'react-redux'
import { ReactComponent as Logo } from '../../routes/lobassaLogo.svg'
import { Typography, AppBar, Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import api from '../../api/api'

const mapStateToProps = (state) => {
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
    const { productId } = this.props.location.state
    this.setState({ confirmationNum: transactionId })
    this.getQuery(transactionId)
    // if (resStatus.statusCode === 200) {
    //   this.reportTransComplit(productId)
    // }
  }

  // reportTransComplit (id) {
  //   var body = {
  //     productId: id
  //   }
  //   try {
  //     api.reportTagComplited(body).then((response) => {
  //       console.log('complited: ' + response)
  //     })
  //   } catch (err) {
  //     console.error('error fetching...:', err)
  //   }
  // }

  getQuery () {
    try {
      api.executeTransaction(this.state.confirmationNum).then(response => {
        console.log(`execute: ${JSON.stringify(response)}`) // need to check this response
        if (response.statusCode === 200) alert(`Payment is confirmed`)
        else if (response.statusCode === 400) {
          return (
            alert(`Something went wrong with the transaction, please make sure the details are correct`)
          )
        } else if (response.statusCode === 500) {
          return (
            <Redirect to='/Cancel' />
          )
        }
      })
    } catch (error) {
      console.log(`Error on executing transaction:${error}`)
    }
  }

  render () {
    return (
      <div className="Approval">
        <div className="Approval-header">
          <AppBar className="Approval-text" position="static">
            <Typography variant="h6"> Payment Complete </Typography>
          </AppBar>
        </div>
        <div className="Approval-content">
          <div className="Approval-Title">
            {/* <p> Confirmation Number: {this.state.props.confirmationNum} </p> */}
          </div>
          <div className="Approval-centerContent">
            <p>Your payment sent succesfully. Thank You!</p>
          </div>
          <div className="Approval-bottomContent">
            <p>
              We are glad to help you <br />
              LoBassa Team.
            </p>
          </div>
          <div className="Approval-logo">
            <Logo />
          </div>
          {this.getQuery()}
          <div className="Approval-home">
            <Link to="/tags" style={{ textDecoration: 'none' }}>
              <Button
                style={{
                  backgroundColor: '#3A69B0',
                  borderRadius: 22,
                  width: '80px',
                  color: '#FFFFFF'
                }}
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FinalPayment)
