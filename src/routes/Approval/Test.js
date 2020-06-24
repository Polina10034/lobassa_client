import React, { Component } from 'react'

class Test extends Component {
    _isMounted = false

    constructor (props) {
      super(props)
      this.state = {
        redirectURL: '',
        redirect: false
      }
    }

    componentDidMount () {
      this._isMounted = true
      const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      const URL = 'https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta/payment/paypallogin?transactionId=88&productId=4'
      fetch(proxyurl + URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (this._isMounted) {
            console.log(data)
            this.setState({
              redirectURL: data.PayPalLink,
              redirect: true
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
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
          {console.log(this.state.redirectURL)}
        </div>
      )
    }
}

export default Test
