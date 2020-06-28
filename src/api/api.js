import axios from 'axios'

const service = axios.create({
  baseURL: 'https://api.lobassa.com',
  crossorigin: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  getAll () {
    console.log('calling function')
    return service.get('/tag/all').then(res => res.data).catch(errHandler)
  },

  addTag (body) {
    return service.post('/tag', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteTag (body) {
    return service
      .delete('/tag', { data: body })
      .then(res => res.data)
      .catch(errHandler)
  },

  updateTag (id, body) {
    return service
      .put('/tag', body)
      .then(res => res.data)
      .catch(errHandler)
  },
  reportTagLost (body) {
    console.log('reporting lost: ' + body.id)
    return service
      .put('/tag', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  setToken (accessToken, idToken, refreshToken) {
    service.defaults.headers.common['Authorization'] = idToken
    service.defaults.headers.common['accessToken'] = accessToken
  },

  // Transaction func
  getTransaction (body) {
    return service.get(`/transaction/${body}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  addTransaction (body) {
    return service.post('/transaction', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  updateTransaction (body) {
    return service
      .put('/tag', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addPhoto (body) {
    return service.post('/transaction/photo', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  getPayPalLink (transactionId, productId) {
    return service.get(`/payment/paypallogin?transactionId=${transactionId}&productId=${productId}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  approval (body, isApproved) {
    return service.get(`/payment/paymentsuccess${body}&isApproved=${isApproved}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  executeTransaction (body) {
    return service.get(`/payment/executepayment?transactionId=${body}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteTransaction () {
    return service.get(`/payment/paymentsuccess?isApproved=false`)
      .then(res => res.data)
      .catch(errHandler)
  }
}
