import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './App.css'
import Dashboard from '../components/dashboard/Dashboard'

const AdminDash = () => {
  const session = useSelector(state => state.session)

  if (!session.isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="App">
      <Dashboard></Dashboard>
    </div>
  )
}

export default AdminDash
