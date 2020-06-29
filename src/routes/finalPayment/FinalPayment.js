import React, { Component } from 'react'
import './finalPayment.css'
import { connect } from 'react-redux'
// import { ReactComponent as Logo } from '../../routes/lobassaLogo.svg'
import { Typography, AppBar, Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import api from '../../api/api'
import CircularProgress from '@material-ui/core/CircularProgress'

const mapStateToProps = (state) => {
  return { session: state.session }
}

class FinalPayment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmationNum: undefined,
      resStatus: undefined,
      isLoading: true
    }
    this.getQuery = this.getQuery.bind(this)
  }

  componentDidMount () {
    const { transactionId } = this.props.location.state
    const { productId } = this.props.location.state
    this.setState({ confirmationNum: transactionId })
    this.getQuery(transactionId, productId)
    console.log(this.state.resStatus)
  }

  reportTransComplit (id) {
    var body = {
      productId: id,
      status: 'complited'
    }
    try {
      api.reportTagComplited(body).then((response) => {
        console.log('complited: ' + response)
        this.setState({ isLoading: false })
      })
    } catch (err) {
      console.error('error fetching...:', err)
    }
  }

  getQuery (id, pId) {
    try {
      api.executeTransaction(id).then(response => {
        console.log(`execute: ${JSON.stringify(response)}`) // need to check this response
        if (response.statusCode === 200) {
          alert(`Payment is confirmed`)
          // this.setState({resStatus: response.statusCode })
          this.reportTransComplit(pId)
        } else if (response.statusCode === 400) {
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
        <div className="Approval-content" >
          {this.state.isLoading ? <CircularProgress />
            : <div>
              <div className="Approval-centerContent">
                <p>Your payment sent succesfully. Thank You!</p>
              </div>
              <div className="Approval-bottomContent">
                <p>
              We are glad to help you <br />
              LoBassa Team.
                </p>
              </div> </div>}
          <div className="Approval-logo">
            <img
              src="../images/logo2.png"
              alt="logo"
              style={{ width: '180px' }}
            />
          </div>
          {/* {this.getQuery()} */}
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
