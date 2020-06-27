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
  }
}
