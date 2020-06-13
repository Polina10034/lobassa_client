import axios from 'axios'

const service = axios.create({
  baseURL: 'https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta',
  headers: {'Authorization': 'Bearer '+ '122121212'}
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

axios.defaults.headers.common['Authorization'] = 'Bearer 12312312312312';

export default {
  service: service,

  getAll () {
    return service.get('/tag/all').then(res => res.data).catch(errHandler)
  }
}