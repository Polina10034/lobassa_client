import React, { Component } from 'react'
import api from '../../api/api'

class GetPayPalLink extends Component {
  _isMounted = false

  constructor (props) {
    super(props)
    this.state = {
      redirectURL: '',
      redirect: false
    }
  }

  componentDidMount () {
    const { productId } = this.props.location.state
    const { transactionId } = this.props.location.state
    this._isMounted = true
    try {
      api.getPayPalLink(transactionId, productId).then(response => {
        this.setState({
          redirectURL: response.PayPalLink,
          redirect: true
        })
        console.log(response)
      })
    } catch (error) {
      console.log(`error on get paypal link for approval: ${error}`)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  setRedirect = () => {
    this.setState({
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return window.location.replace(this.state.redirectURL)
    }
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
      </div>

    )
  }
}

export default GetPayPalLink
