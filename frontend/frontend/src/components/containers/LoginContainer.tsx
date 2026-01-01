import React, { ChangeEvent, useState } from 'react'
import LoginForm from '../presenters/LoginForm'
import axios from 'axios'
import { useApi } from '../../providers/ApiContext'
import { useAuth } from '../../providers/AuthContext'
import { Navigate } from 'react-router-dom'

const LoginContainer = () => {
  const apiUrl = useApi()
  const apiEndpoint = apiUrl + '/login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, login } = useAuth()

  if (token) {
    return <Navigate to="/Dashboard" />
  }

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await axios.post(apiEndpoint, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      login(response.data.access_token)
    } catch (error) {
      alert('Login failed')
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <LoginForm handleLogin={handleLogin} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} />
  )
}

export default LoginContainer
