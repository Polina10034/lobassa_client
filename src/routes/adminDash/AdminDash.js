import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import './App.css'
import Dashboard from '../components/dashboard/Dashboard'

function AdminDash() {

  const state = useSelector(state => state)
  const session = useSelector(state => state.session)
  console.log('Current Session: ', session)

<<<<<<< HEAD
  const useMountEffect = (fun) => useEffect(fun, [])

  useMountEffect(function () {
    axios.get('https://api.lobassa.com/statistics')
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
=======
  // if (!session.isLoggedIn) {
  //   return <Redirect to="/" />
  // }
>>>>>>> 9c93aed73b73f7cdcb004a38af858501bf61def5

  return (
    <div className="App">
      <Dashboard></Dashboard>
    </div>
  )

}

export default AdminDash
