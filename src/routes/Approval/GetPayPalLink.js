import React, { Component } from 'react'
import Loader from '../components/dashboard/loader/index'
import CircularProgress from '@material-ui/core/CircularProgress'
import api from '../../api/api'

class GetPayPalLink extends Component {
    _isMounted = false

    constructor (props) {
      super(props)
      this.state = {
        redirectURL: '',
        redirect: false,
        isLoading: true
      }
    }

    componentDidMount () {
      const { productId } = this.props.location.state
      const { transactionId } = this.props.location.state
      this._isMounted = true
      api.getPayPalLink(transactionId, productId).then(response => {
        // this.setState({
        //   redirectURL: data.PayPalLink,
        //   redirect: true
        // })
        console.log(response)
      })
      // // this.funcCall()
      // const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      // const URL = `https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta/payment/paypallogin?transactionId=${transactionId}&productId=${productId}`
      // fetch(proxyurl + URL, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (this._isMounted) {
      //       console.log(data)
            // this.setState({
            //   redirectURL: data.PayPalLink,
            //   redirect: true
            // })
      //       this.setState({ isLoading: false })
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //   })
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
      // return (
      //   loading ? <Loader /> : renderDone()
      // )
      return (
        this.state.isLoading
          ? <div style={{ alignItems: 'center' }}><Loader style={{ marginRight: '50%' }}/> </div>
          : <div>
            {console.log(this.state.redirectURL)}
            {this.renderRedirect()}

          </div>

      )
    }
}

export default GetPayPalLink
