import axios from 'axios'

const service = axios.create({
  baseURL: 'https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta',
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

  setToken (accessToken, idToken, refreshToken) {
    service.defaults.headers.common['Authorization'] = idToken
  }
}