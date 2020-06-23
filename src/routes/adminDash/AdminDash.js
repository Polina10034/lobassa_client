import React, { useEffect, useState } from 'react'
import './App.css'
import Dashboard from '../components/dashboard/Dashboard'
import axios from 'axios'

function AdminDash () {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const useMountEffect = (fun) => useEffect(fun, [])

  useMountEffect(function () {
    axios.get('https://gexiqdyt1e.execute-api.eu-west-1.amazonaws.com/beta/statistics')
      .then(res => { setData(res.data.body); setLoading(false) })
  })

  function isLoading () {
    return (
      <div>
        <span>loading...</span>
      </div>
    )
  }

  function adminPage (data) {
    return (
      <div className="App">
        <Dashboard data={data}></Dashboard>
      </div>
    )
  }

  return (
    loading ? isLoading() : adminPage(data)
  )
}

export default AdminDash
