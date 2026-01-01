import React, { ChangeEvent, useState } from 'react'
import RegisterForm from '../presenters/RegisterForm'
import axios from 'axios'
import { useApi } from '../../providers/ApiContext'
import { useAuth } from '../../providers/AuthContext'
import { Navigate } from 'react-router-dom'

const RegisterContainer = () => {
  const apiUrl = useApi()
  const apiEndpoint = apiUrl + '/register'
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { token, login } = useAuth()

  if (token) {
    return <Navigate to="/Dashboard" />
  }

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await axios.post(apiEndpoint, {
        'user_name': userName,
        'email': email,
        'password': password,
        'password_confirm': passwordConfirm
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      login(response.data.access_token)
    } catch (error) {
      alert('User register failed')
    }
  }

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
  }

  return (
    <RegisterForm
      handleRegister={handleRegister}
      handleUserNameChange={handleUserNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handlePasswordConfirmChange={handlePasswordConfirmChange}
    />
  )
}

export default RegisterContainer
