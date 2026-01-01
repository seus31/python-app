import React from 'react'
import { Navigate } from 'react-router-dom'
import Dashboard from '../presenters/Dashboard'
import { useAuth } from '../../providers/AuthContext'

const DashboardContainer = () => {
  const { token, logout } = useAuth()

  if (!token) {
    logout()
    return <Navigate to="/login" />
  }

  return (
    <Dashboard />
  )
}

export default DashboardContainer
