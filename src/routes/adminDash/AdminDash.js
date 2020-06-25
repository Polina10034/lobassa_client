import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import './App.css'
import Dashboard from '../components/dashboard/Dashboard'

function AdminDash() {

  const state = useSelector(state => state)
  const session = useSelector(state => state.session)
  console.log('Current Session: ', session)

  // if (!session.isLoggedIn) {
  //   return <Redirect to="/" />
  // }

  return (
    <div className="App">
      <Dashboard></Dashboard>
    </div>
  )

}

export default AdminDash
